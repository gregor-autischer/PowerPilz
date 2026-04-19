import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  LovelaceCardEditor,
  LovelaceGridOptions,
  LovelaceLayoutOptions
} from "../types";
import { getEntity } from "../utils/entity";
import { mushroomIconStyle, type ColorValue } from "../utils/color";
import { tr, haLang, weekdayShort } from "../utils/i18n";
import "./editors/timer-card-editor";

const PICKER_PORTAL_STYLE_ID = "power-pilz-timer-picker-portal-style";

interface PowerPilzTimerCardConfig extends LovelaceCardConfig {
  type: "custom:power-pilz-timer-card";
  // Companion mode (default for new cards): a single PowerPilz Smart
  // Timer `switch.*` entity that bundles target device + on/off times +
  // active flag. The card derives everything from its attributes and
  // uses `powerpilz_companion.set_timer` to update times.
  use_companion?: boolean;
  companion_entity?: string;
  // Manual mode (legacy): configure the four entities individually.
  switch_entity?: string;
  on_datetime_entity?: string;
  off_datetime_entity?: string;
  active_entity?: string;
  name?: string;
  subtitle?: string;
  icon?: string;
  icon_color?: ColorValue;
  active_color?: ColorValue;
}

const COMPANION_DOMAIN = "powerpilz_companion";

function parseIsoLike(value: string): Date | null {
  const d = new Date(value.includes("T") ? value : value.replace(" ", "T"));
  return isNaN(d.getTime()) ? null : d;
}

export class PowerPilzTimerCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement("power-pilz-timer-card-editor") as LovelaceCardEditor;
  }

  public static async getStubConfig(hass?: HomeAssistant): Promise<PowerPilzTimerCardConfig> {
    const states = hass?.states ?? {};
    const entityIds = Object.keys(states);

    // Prefer a PowerPilz Smart Timer switch (identified by its attributes).
    const companion = entityIds.find((id) => {
      if (!id.startsWith("switch.")) return false;
      const attrs = states[id]?.attributes as Record<string, unknown> | undefined;
      return typeof attrs?.target_entity === "string"
        && ("on_datetime" in (attrs ?? {}) || "off_datetime" in (attrs ?? {}));
    });
    if (companion) {
      return {
        type: "custom:power-pilz-timer-card",
        use_companion: true,
        companion_entity: companion,
        name: "Timer"
      };
    }

    // Fallback: legacy 4-entity mode.
    const first = (domain: string): string | undefined =>
      entityIds.find((id) => id.startsWith(`${domain}.`));
    return {
      type: "custom:power-pilz-timer-card",
      use_companion: false,
      switch_entity: first("switch") ?? first("input_boolean") ?? "switch.device",
      on_datetime_entity: first("input_datetime") ?? "input_datetime.sched_on",
      active_entity: first("input_boolean") ?? "input_boolean.sched_active",
      name: "Timer"
    };
  }

  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: Boolean }) public preview = false;
  @property({ type: Boolean }) public editMode = false;
  @property({ reflect: true, type: String }) public layout: string | undefined;

  @state() private _config?: PowerPilzTimerCardConfig;
  @state() private _pickingOn = false;
  @state() private _pickingOff = false;
  /** True if the user hit "skip on" in the first picker step. Prevents
   *  a later "skip off" from activating a timer with NO boundaries at
   *  all (which would just flip the switch to active with nothing to
   *  fire — a silent no-op bug). */
  @state() private _skippedOn = false;
  /** For select-target timers: per-activation option overrides the user
   *  picked in the picker. Initialised from the helper's configured
   *  on_option / off_option when the picker opens, then the user can
   *  change them for this activation. Empty string = use helper default. */
  @state() private _pickOnOption: string = "";
  @state() private _pickOffOption: string = "";
  @state() private _confirmingCancel = false;
  @state() private _pickDay = 0;
  @state() private _pickHour = 12;

  private _refreshTimer?: number;

  public setConfig(config: PowerPilzTimerCardConfig): void {
    // Default mode resolution (matches schedule-card pattern):
    //   - Explicit `use_companion` in config → honor it
    //   - Otherwise: legacy cards with `switch_entity` already filled in
    //     default to manual mode so they don't break on load. Fresh cards
    //     default to companion mode.
    const useCompanion = config.use_companion !== undefined
      ? config.use_companion !== false
      : !config.switch_entity;

    this._config = {
      ...config,
      use_companion: useCompanion,
      icon: config.icon ?? "mdi:timer-outline",
      name: config.name ?? tr(haLang(this.hass), "timer.default_name")
    };
    // Intentionally don't throw on missing entities — the card renders a
    // soft placeholder while the user is still filling in the editor.
  }

  // ---------- Mode-aware entity / datetime resolvers ----------

  private get _activeEntityId(): string | undefined {
    if (!this._config) return undefined;
    return this._config.use_companion === false
      ? this._config.active_entity
      : this._config.companion_entity;
  }

  private get _switchEntityId(): string | undefined {
    if (!this._config) return undefined;
    if (this._config.use_companion === false) return this._config.switch_entity;
    const companion = this.hass?.states?.[this._config.companion_entity ?? ""];
    const target = companion?.attributes?.target_entity;
    return typeof target === "string" ? target : undefined;
  }

  private _companionAttr(key: string): unknown {
    const id = this._config?.companion_entity;
    if (!id) return undefined;
    return this.hass?.states?.[id]?.attributes?.[key];
  }

  private _getOnDatetime(): Date | null {
    if (this._config?.use_companion !== false) {
      const raw = this._companionAttr("on_datetime");
      return typeof raw === "string" ? parseIsoLike(raw) : null;
    }
    return this.parseDatetime(this._config?.on_datetime_entity);
  }

  private _getOffDatetime(): Date | null {
    if (this._config?.use_companion !== false) {
      const raw = this._companionAttr("off_datetime");
      return typeof raw === "string" ? parseIsoLike(raw) : null;
    }
    return this.parseDatetime(this._config?.off_datetime_entity);
  }

  private _direction(): "on_only" | "both" | "off_only" {
    if (this._config?.use_companion !== false) {
      const raw = this._companionAttr("direction");
      if (raw === "on_only" || raw === "off_only") return raw;
      return "both";
    }
    // Manual mode infers direction from the configured entities: if no
    // off-datetime helper is configured, the card is effectively an
    // on-only timer. (Manual mode has no off-only variant.)
    return this._config?.off_datetime_entity ? "both" : "on_only";
  }

  private _hasOnSupport(): boolean {
    return this._direction() !== "off_only";
  }

  private _hasOffSupport(): boolean {
    const dir = this._direction();
    if (dir === "on_only") return false;
    if (this._config?.use_companion !== false) {
      return !!this._config?.companion_entity;
    }
    return !!this._config?.off_datetime_entity;
  }

  private _companionStateIcon(): string | undefined {
    if (this._config?.use_companion === false) return undefined;
    const icons = this._companionAttr("state_icons");
    if (!icons || typeof icons !== "object") return undefined;
    const key = this.isActive() ? "active" : "inactive";
    const value = (icons as Record<string, unknown>)[key];
    return typeof value === "string" && value ? value : undefined;
  }

  private _companionStateName(): string | undefined {
    if (this._config?.use_companion === false) return undefined;
    const names = this._companionAttr("state_names");
    if (!names || typeof names !== "object") return undefined;
    const key = this.isActive() ? "active" : "inactive";
    const value = (names as Record<string, unknown>)[key];
    return typeof value === "string" && value ? value : undefined;
  }

  /** For select-target Companion timers, the label the user configured
   *  for the start-boundary option (e.g. "On" or "Boost"). Returns
   *  undefined for non-select targets or manual-mode cards. */
  private _onOptionLabel(): string | undefined {
    if (this._config?.use_companion === false) return undefined;
    const value = this._companionAttr("on_option_label");
    return typeof value === "string" && value ? value : undefined;
  }

  /** Label for the end-boundary option. Same caveats as above. */
  private _offOptionLabel(): string | undefined {
    if (this._config?.use_companion === false) return undefined;
    const value = this._companionAttr("off_option_label");
    return typeof value === "string" && value ? value : undefined;
  }

  /** Raw stored on/off option values on the companion (logical keys for
   *  Smart-Schedule targets, display names for generic selects). */
  private _storedOnOption(): string {
    if (this._config?.use_companion === false) return "";
    const value = this._companionAttr("on_option");
    return typeof value === "string" ? value : "";
  }
  private _storedOffOption(): string {
    if (this._config?.use_companion === false) return "";
    const value = this._companionAttr("off_option");
    return typeof value === "string" ? value : "";
  }

  /** True if the target is a select/input_select whose options the
   *  user can pick from in the picker. */
  private _targetHasOptions(): boolean {
    if (this._config?.use_companion === false) return false;
    const targetId = this._switchEntityId;
    if (!targetId) return false;
    const state = this.hass?.states?.[targetId];
    const opts = state?.attributes?.options;
    return Array.isArray(opts) && opts.length > 0
      && (targetId.startsWith("select.") || targetId.startsWith("input_select."));
  }

  /** Resolve a stored option value (logical key or display name) into
   *  the user-facing display name using the target's option list.
   *  Falls back to the value itself if not found. */
  private _resolveOptionLabel(value: string): string {
    if (!value) return "";
    const opts = this._targetOptions();
    return opts.find((o) => o.value === value)?.label ?? value;
  }

  /** Returns the selectable option pairs as [value, label] where value
   *  is what gets sent to set_timer (logical key for Smart Schedule,
   *  display name for generic selects) and label is the UI text. */
  private _targetOptions(): Array<{ value: string; label: string }> {
    const targetId = this._switchEntityId;
    if (!targetId) return [];
    const state = this.hass?.states?.[targetId];
    if (!state) return [];
    const opts = state.attributes?.options;
    if (!Array.isArray(opts)) return [];

    const modeNames = state.attributes?.mode_names;
    if (modeNames && typeof modeNames === "object" && !Array.isArray(modeNames)) {
      // Smart Schedule: options list contains display names; map
      // display → logical key via reverse lookup of mode_names.
      const reverse = new Map<string, string>();
      for (const [key, disp] of Object.entries(modeNames as Record<string, unknown>)) {
        if (typeof disp === "string") reverse.set(disp, key);
      }
      return (opts as string[]).map((display) => ({
        value: reverse.get(display) ?? display,
        label: display,
      }));
    }
    // Generic select: value == label.
    return (opts as string[]).map((display) => ({
      value: display,
      label: display,
    }));
  }

  private _resolvedIcon(): string {
    return this._companionStateIcon()
      ?? this._config?.icon
      ?? "mdi:timer-outline";
  }

  private async _writeOnDatetime(iso: string, option?: string): Promise<void> {
    if (this._config?.use_companion !== false) {
      const id = this._config?.companion_entity;
      if (!id) return;
      const payload: Record<string, string> = {
        entity_id: id,
        on: iso,
      };
      if (option !== undefined) payload.on_option = option;
      await this.hass.callService(COMPANION_DOMAIN, "set_timer", payload);
      return;
    }
    const id = this._config.on_datetime_entity;
    if (!id) return;
    await this.hass.callService(id.split(".")[0], "set_datetime", {
      entity_id: id,
      datetime: iso
    });
  }

  private async _writeOffDatetime(iso: string, option?: string): Promise<void> {
    if (this._config?.use_companion !== false) {
      const id = this._config?.companion_entity;
      if (!id) return;
      const payload: Record<string, string> = {
        entity_id: id,
        off: iso,
      };
      if (option !== undefined) payload.off_option = option;
      await this.hass.callService(COMPANION_DOMAIN, "set_timer", payload);
      return;
    }
    const id = this._config.off_datetime_entity;
    if (!id) return;
    await this.hass.callService(id.split(".")[0], "set_datetime", {
      entity_id: id,
      datetime: iso
    });
  }

  /** Clear the on-boundary so it won't fire on the next activation.
   *  Companion: passes an empty string to `set_timer` which the
   *  integration interprets as "clear this field". Manual mode: no-op,
   *  since `input_datetime.set_datetime` doesn't accept an empty value
   *  (the user's existing on time stays and their bridging automation
   *  will still fire on that schedule). */
  private async _clearOnDatetime(): Promise<void> {
    if (this._config?.use_companion === false) return;
    const id = this._config?.companion_entity;
    if (!id) return;
    await this.hass.callService(COMPANION_DOMAIN, "set_timer", {
      entity_id: id,
      on: ""
    });
  }

  /** Clear the off-boundary so it won't fire on the next activation.
   *  See `_clearOnDatetime` for the manual-mode caveat. */
  private async _clearOffDatetime(): Promise<void> {
    if (this._config?.use_companion === false) return;
    const id = this._config?.companion_entity;
    if (!id) return;
    await this.hass.callService(COMPANION_DOMAIN, "set_timer", {
      entity_id: id,
      off: ""
    });
  }

  public getCardSize(): number { return 1; }

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 6, rows: 1, min_columns: 4, min_rows: 1, max_rows: 2 };
  }

  public getLayoutOptions(): LovelaceLayoutOptions {
    return { grid_columns: 2, grid_rows: 1 };
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._refreshTimer = window.setInterval(() => this.requestUpdate(), 60000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._refreshTimer) { clearInterval(this._refreshTimer); this._refreshTimer = undefined; }
    this.closePortal();
  }

  protected updated(): void {
    // When picker/confirm state changes, sync the portal
    if (this._pickingOn || this._pickingOff || this._confirmingCancel) {
      this.openPortal();
    } else {
      this.closePortal();
    }
  }

  // --- Portal management ---

  private _portal?: HTMLDivElement;
  private _portalBackdrop?: HTMLDivElement;
  private _portalScrollListener?: () => void;

  private ensurePortalStyles(): void {
    if (document.getElementById(PICKER_PORTAL_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = PICKER_PORTAL_STYLE_ID;
    style.textContent = `
      .pp-timer-portal-backdrop {
        position: fixed; inset: 0; z-index: 9999; background: transparent;
      }
      .pp-timer-portal {
        position: fixed; z-index: 10000;
        background: var(--ha-card-background, var(--card-background-color, #fff));
        border-radius: var(--mush-control-border-radius, 12px);
        border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color, rgba(0,0,0,0.12)));
        box-shadow: var(--ha-card-box-shadow, 0 8px 24px rgba(0,0,0,0.18));
        padding: 12px;
        box-sizing: border-box;
        display: flex; flex-direction: column; gap: 10px;
        font-family: var(--paper-font-body1_-_font-family, inherit);
        color: var(--primary-text-color);
      }
      .pp-timer-portal .pp-label { font-size: 12px; font-weight: 600; color: var(--primary-text-color); }
      .pp-timer-portal .pp-days { display: flex; gap: 4px; flex-wrap: wrap; }
      .pp-timer-portal .pp-day-btn {
        flex: 1; min-width: 56px; padding: 6px 4px; border: none; border-radius: 8px;
        background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
        font-family: inherit; font-size: 12px; font-weight: 500; color: var(--secondary-text-color);
        cursor: pointer; text-align: center; -webkit-tap-highlight-color: transparent;
      }
      .pp-timer-portal .pp-day-btn.active {
        background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.15);
        color: var(--primary-color, rgb(3, 169, 244)); font-weight: 600;
      }
      .pp-timer-portal .pp-hours {
        display: grid; grid-template-columns: repeat(8, 1fr); gap: 4px;
      }
      .pp-timer-portal .pp-hour-btn {
        padding: 6px 0; border: none; border-radius: 6px;
        background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
        font-family: inherit; font-size: 12px; font-weight: 500; color: var(--secondary-text-color);
        cursor: pointer; text-align: center; -webkit-tap-highlight-color: transparent;
      }
      .pp-timer-portal .pp-hour-btn.active {
        background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.15);
        color: var(--primary-color, rgb(3, 169, 244)); font-weight: 600;
      }
      .pp-timer-portal .pp-option-row {
        display: flex; align-items: center; gap: 10px;
        padding: 4px 0 2px;
      }
      .pp-timer-portal .pp-option-label {
        font-size: 12px; font-weight: 600;
        color: var(--primary-text-color);
      }
      .pp-timer-portal .pp-option-select {
        flex: 1; font: inherit; font-size: 12px; font-weight: 500;
        padding: 6px 8px; border-radius: 8px;
        border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
        background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
        color: var(--primary-text-color);
        cursor: pointer;
      }
      .pp-timer-portal .pp-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 4px; }
      .pp-timer-portal .pp-act {
        padding: 6px 16px; border: none; border-radius: 8px; font-family: inherit;
        font-size: 13px; font-weight: 600; cursor: pointer; -webkit-tap-highlight-color: transparent;
      }
      .pp-timer-portal .pp-act.cancel, .pp-timer-portal .pp-act.skip {
        background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08);
        color: var(--secondary-text-color);
      }
      .pp-timer-portal .pp-act.confirm {
        background: var(--primary-color, rgb(3, 169, 244)); color: white;
      }
      .pp-timer-portal .pp-act.danger {
        background: var(--error-color, rgb(219, 68, 55)); color: white;
      }
      .pp-timer-portal .pp-hint {
        font-size: 12px; color: var(--secondary-text-color); margin-top: -4px;
      }
    `;
    document.head.append(style);
  }

  private openPortal(): void {
    if (this._portal) {
      this.renderPortalContent();
      this.positionPortal();
      return;
    }
    this.ensurePortalStyles();

    const backdrop = document.createElement("div");
    backdrop.className = "pp-timer-portal-backdrop";
    backdrop.addEventListener("click", () => this.handleCancelPick());

    const portal = document.createElement("div");
    portal.className = "pp-timer-portal";
    portal.addEventListener("click", (e) => e.stopPropagation());

    document.body.append(backdrop);
    document.body.append(portal);
    this._portalBackdrop = backdrop;
    this._portal = portal;

    this._portalScrollListener = () => this.positionPortal();
    window.addEventListener("scroll", this._portalScrollListener, true);
    window.addEventListener("resize", this._portalScrollListener);

    this.renderPortalContent();
    this.positionPortal();
  }

  private closePortal(): void {
    if (this._portal) { this._portal.remove(); this._portal = undefined; }
    if (this._portalBackdrop) { this._portalBackdrop.remove(); this._portalBackdrop = undefined; }
    if (this._portalScrollListener) {
      window.removeEventListener("scroll", this._portalScrollListener, true);
      window.removeEventListener("resize", this._portalScrollListener);
      this._portalScrollListener = undefined;
    }
  }

  private renderPortalContent(): void {
    if (!this._portal) return;
    const lang = haLang(this.hass);
    this._portal.replaceChildren();

    // Confirmation dialog for cancelling an active timer
    if (this._confirmingCancel) {
      const msg = document.createElement("div");
      msg.className = "pp-label";
      msg.textContent = tr(lang, "timer.cancel_title");
      this._portal.append(msg);

      const hint = document.createElement("div");
      hint.className = "pp-hint";
      hint.textContent = tr(lang, "timer.cancel_hint");
      this._portal.append(hint);

      const actions = document.createElement("div");
      actions.className = "pp-actions";
      const keep = document.createElement("button");
      keep.type = "button";
      keep.className = "pp-act cancel";
      keep.textContent = tr(lang, "timer.keep_timer");
      keep.addEventListener("click", () => this.handleDismissConfirm());
      actions.append(keep);

      const confirm = document.createElement("button");
      confirm.type = "button";
      confirm.className = "pp-act danger";
      confirm.textContent = tr(lang, "timer.cancel_timer");
      confirm.addEventListener("click", () => { void this.handleConfirmCancel(); });
      actions.append(confirm);
      this._portal.append(actions);
      return;
    }

    // For select-target timers the on/off boundaries don't literally
    // "turn the device on/off" — they set a specific option (e.g.
    // "Auto" or "Boost"). Swap the hardcoded Einschalten/Ausschalten
    // wording for the actual option label when available.
    //
    // Labels reflect the picker's tentative selection (so changing the
    // Mode dropdown immediately updates the wording), falling back to
    // whatever the helper currently has stored.
    const onLabel = this._targetHasOptions()
      ? (this._resolveOptionLabel(this._pickOnOption) || this._onOptionLabel())
      : this._onOptionLabel();
    const offLabel = this._targetHasOptions()
      ? (this._resolveOptionLabel(this._pickOffOption) || this._offOptionLabel())
      : this._offOptionLabel();
    const pickingOnLabel = onLabel
      ? tr(lang, "timer.set_to_at", { option: onLabel })
      : tr(lang, "timer.turn_on_at");
    const pickingOffLabel = offLabel
      ? tr(lang, "timer.set_to_at", { option: offLabel })
      : tr(lang, "timer.turn_off_at_optional");
    const label = this._pickingOn ? pickingOnLabel : pickingOffLabel;
    // Show a skip button whenever the user can jump to the *other*
    // boundary — i.e. when both on and off are supported. Skipping
    // clears the skipped boundary in Companion mode so it won't fire
    // on the next activation.
    //
    // Exception: if the user already skipped the on-boundary and is now
    // on the off-picker, they must NOT be able to also skip off —
    // that would activate a timer with zero boundaries (a silent
    // no-op). Force them to either pick an off time or cancel.
    const showSkipOn = this._pickingOn && this._hasOffSupport() && this._hasOnSupport();
    const showSkipOff = this._pickingOff && this._hasOnSupport() && this._hasOffSupport() && !this._skippedOn;
    // The skip button label on the on-picker jumps straight to the
    // off-boundary, so it advertises what that off-boundary will do.
    // And vice versa on the off-picker.
    const skipLabel = this._pickingOn
      ? (offLabel
          ? tr(lang, "timer.only_option", { option: offLabel })
          : tr(lang, "timer.only_off"))
      : (onLabel
          ? tr(lang, "timer.only_option", { option: onLabel })
          : tr(lang, "timer.only_on"));
    const skipHandler = this._pickingOn ? this.handleSkipOn : this.handleSkipOff;
    const showSkip = showSkipOn || showSkipOff;
    const confirmHandler = this._pickingOn ? this.handleSetOn : this.handleSetOff;

    const days = this.next7Days();
    const hours = Array.from({ length: 24 }, (_, i) => i);

    const labelEl = document.createElement("div");
    labelEl.className = "pp-label";
    labelEl.textContent = label;
    this._portal.append(labelEl);

    const daysEl = document.createElement("div");
    daysEl.className = "pp-days";
    days.forEach((d) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = `pp-day-btn ${d.day === this._pickDay ? "active" : ""}`;
      b.textContent = d.label;
      b.addEventListener("click", () => {
        this._pickDay = d.day;
        this.renderPortalContent();
      });
      daysEl.append(b);
    });
    this._portal.append(daysEl);

    const hoursEl = document.createElement("div");
    hoursEl.className = "pp-hours";
    hours.forEach((h) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = `pp-hour-btn ${h === this._pickHour ? "active" : ""}`;
      b.textContent = String(h).padStart(2, "0");
      b.addEventListener("click", () => {
        this._pickHour = h;
        this.renderPortalContent();
      });
      hoursEl.append(b);
    });
    this._portal.append(hoursEl);

    // For select-target timers add an option dropdown so the user can
    // override, per activation, which option gets applied at this
    // boundary (defaults to whatever the helper is configured with).
    if (this._targetHasOptions()) {
      const optionRow = document.createElement("div");
      optionRow.className = "pp-option-row";

      const optionLabel = document.createElement("span");
      optionLabel.className = "pp-option-label";
      optionLabel.textContent = tr(lang, "timer.mode_label");
      optionRow.append(optionLabel);

      const optionSelect = document.createElement("select");
      optionSelect.className = "pp-option-select";
      const current = this._pickingOn ? this._pickOnOption : this._pickOffOption;
      for (const opt of this._targetOptions()) {
        const o = document.createElement("option");
        o.value = opt.value;
        o.textContent = opt.label;
        if (opt.value === current) o.selected = true;
        optionSelect.append(o);
      }
      optionSelect.addEventListener("change", () => {
        if (this._pickingOn) {
          this._pickOnOption = optionSelect.value;
        } else {
          this._pickOffOption = optionSelect.value;
        }
        // Re-render so the header label ("Auf 'X' setzen um:") and
        // the skip button label (which advertises the *other* option)
        // pick up the new selection.
        this.renderPortalContent();
      });
      optionRow.append(optionSelect);
      this._portal.append(optionRow);
    }

    const actions = document.createElement("div");
    actions.className = "pp-actions";
    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.className = "pp-act cancel";
    cancelBtn.textContent = tr(lang, "common.cancel");
    cancelBtn.addEventListener("click", () => this.handleCancelPick());
    actions.append(cancelBtn);

    if (showSkip) {
      const skipBtn = document.createElement("button");
      skipBtn.type = "button";
      skipBtn.className = "pp-act skip";
      skipBtn.textContent = skipLabel;
      skipBtn.addEventListener("click", () => { void skipHandler(); });
      actions.append(skipBtn);
    }

    const confirmBtn = document.createElement("button");
    confirmBtn.type = "button";
    confirmBtn.className = "pp-act confirm";
    confirmBtn.textContent = tr(lang, "common.set");
    confirmBtn.addEventListener("click", () => { void confirmHandler(); });
    actions.append(confirmBtn);

    this._portal.append(actions);
  }

  private positionPortal(): void {
    const portal = this._portal;
    if (!portal) return;
    const card = this.renderRoot?.querySelector("ha-card") as HTMLElement | null;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const viewportPadding = 8;
    const gap = 8;

    // Measure portal natural size
    portal.style.visibility = "hidden";
    portal.style.left = "0";
    portal.style.top = "0";
    portal.style.width = `${Math.max(280, rect.width)}px`;
    const portalH = portal.offsetHeight;
    const portalW = portal.offsetWidth;

    const spaceBelow = window.innerHeight - rect.bottom - viewportPadding;
    const spaceAbove = rect.top - viewportPadding;
    const openUp = spaceBelow < portalH + gap && spaceAbove > spaceBelow;

    let left = rect.left;
    left = Math.max(viewportPadding, Math.min(left, window.innerWidth - portalW - viewportPadding));

    let top = openUp ? rect.top - gap - portalH : rect.bottom + gap;
    top = Math.max(viewportPadding, Math.min(top, window.innerHeight - portalH - viewportPadding));

    portal.style.left = `${Math.round(left)}px`;
    portal.style.top = `${Math.round(top)}px`;
    portal.style.visibility = "visible";
  }

  // --- Helpers ---

  private isEditorPreview(): boolean { return this.preview || this.editMode; }

  private isActive(): boolean {
    return getEntity(this.hass, this._activeEntityId)?.state === "on";
  }

  private switchIsOn(): boolean {
    return getEntity(this.hass, this._switchEntityId)?.state === "on";
  }

  private parseDatetime(entityId?: string): Date | null {
    if (!entityId) return null;
    const entity = getEntity(this.hass, entityId);
    if (!entity) return null;

    // Primary: use year/month/day/hour/minute attributes (always present on input_datetime)
    const attrs = entity.attributes;
    const year = attrs?.year as number | undefined;
    const month = attrs?.month as number | undefined;
    const day = attrs?.day as number | undefined;
    const hour = attrs?.hour as number | undefined;
    const minute = attrs?.minute as number | undefined;

    if (typeof year === "number" && typeof month === "number" && typeof day === "number") {
      const d = new Date(year, month - 1, day, hour ?? 0, minute ?? 0, 0, 0);
      if (!isNaN(d.getTime())) return d;
    }

    // Fallback: parse state string (YYYY-MM-DD HH:MM:SS)
    const s = entity.state;
    if (typeof s === "string" && s.length > 10 && s !== "unknown" && s !== "unavailable") {
      const d = new Date(s.replace(" ", "T"));
      return isNaN(d.getTime()) ? null : d;
    }
    return null;
  }

  private formatDatetime(d: Date): string {
    const lang = haLang(this.hass);
    const day = weekdayShort(lang, d.getDay());
    const h = String(d.getHours()).padStart(2, "0");
    const m = String(d.getMinutes()).padStart(2, "0");
    return `${day} ${h}:${m}`;
  }

  private timeUntil(d: Date): string {
    const lang = haLang(this.hass);
    const diff = d.getTime() - Date.now();
    if (diff <= 0) return tr(lang, "timer.time_now");
    const hours = Math.floor(diff / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return tr(lang, "timer.time_in_dh", { d: days, h: hours % 24 });
    }
    if (hours > 0) return tr(lang, "timer.time_in_hm", { h: hours, m: mins });
    return tr(lang, "timer.time_in_m", { m: mins });
  }

  private next7Days(): { day: number; label: string; date: Date }[] {
    const lang = haLang(this.hass);
    const result: { day: number; label: string; date: Date }[] = [];
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() + i);
      d.setHours(0, 0, 0, 0);
      const label = i === 0
        ? tr(lang, "common.today")
        : i === 1
          ? tr(lang, "common.tomorrow")
          : weekdayShort(lang, d.getDay());
      result.push({ day: i, label, date: d });
    }
    return result;
  }

  private buildDatetime(dayOffset: number, hour: number): string {
    const d = new Date();
    d.setDate(d.getDate() + dayOffset);
    d.setHours(hour, 0, 0, 0);
    // Format as "YYYY-MM-DD HH:MM:SS" for input_datetime
    const y = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, "0");
    const da = String(d.getDate()).padStart(2, "0");
    return `${y}-${mo}-${da} ${String(hour).padStart(2, "0")}:00:00`;
  }

  // --- Actions ---

  private handleOpenPicker = (event: Event): void => {
    event.stopPropagation();
    if (this.isEditorPreview()) return;
    if (this._pickingOn || this._pickingOff) return;
    this._pickDay = 0;
    this._pickHour = new Date().getHours() + 1;
    if (this._pickHour > 23) { this._pickHour = 0; this._pickDay = 1; }
    this._skippedOn = false;
    // Pre-fill the per-activation option overrides from whatever the
    // helper currently has configured — the user can then tweak them
    // before confirming. Empty = use helper default.
    this._pickOnOption = this._storedOnOption();
    this._pickOffOption = this._storedOffOption();
    // Off-only timer skips the on-picker entirely.
    if (this._hasOnSupport()) {
      this._pickingOn = true;
    } else {
      this._pickingOff = true;
    }
  };

  private handleBadgeClick = (event: Event): void => {
    event.stopPropagation();
    if (this.isEditorPreview()) return;
    this._confirmingCancel = true;
  };

  private handleConfirmCancel = async (): Promise<void> => {
    this._confirmingCancel = false;
    await this.cancelTimer();
  };

  private handleDismissConfirm = (): void => {
    this._confirmingCancel = false;
  };

  private handleSetOn = async (): Promise<void> => {
    if (!this._config) return;
    const datetime = this.buildDatetime(this._pickDay, this._pickHour);
    // Pass on_option only if the target is a select (option is
    // meaningful). For switch-like targets, leave it off.
    const option = this._targetHasOptions() ? this._pickOnOption : undefined;
    await this._writeOnDatetime(datetime, option);
    this._skippedOn = false;
    this._pickingOn = false;

    if (this._hasOffSupport()) {
      this._pickHour = Math.min(this._pickHour + 1, 23);
      this._pickingOff = true;
    } else {
      await this.activateTimer();
    }
  };

  private handleSetOff = async (): Promise<void> => {
    if (!this._hasOffSupport()) return;
    const datetime = this.buildDatetime(this._pickDay, this._pickHour);
    const option = this._targetHasOptions() ? this._pickOffOption : undefined;
    await this._writeOffDatetime(datetime, option);
    this._skippedOn = false;
    this._pickingOff = false;
    await this.activateTimer();
  };

  /** Picking-on state: skip the on-boundary entirely and jump to the
   *  off-picker. In Companion mode this clears the on time so only off
   *  fires; in manual mode it leaves the existing on_datetime untouched
   *  (input_datetime helpers can't be "unset" via the standard service). */
  private handleSkipOn = async (): Promise<void> => {
    if (!this._hasOffSupport()) return;
    await this._clearOnDatetime();
    this._skippedOn = true;
    this._pickingOn = false;
    this._pickHour = Math.min(this._pickHour + 1, 23);
    this._pickingOff = true;
  };

  /** Picking-off state: skip the off-boundary and activate the timer.
   *  In Companion mode this clears the off time so only on fires;
   *  in manual mode it leaves the existing off_datetime untouched. */
  private handleSkipOff = async (): Promise<void> => {
    await this._clearOffDatetime();
    this._skippedOn = false;
    this._pickingOff = false;
    await this.activateTimer();
  };

  private async activateTimer(): Promise<void> {
    const id = this._activeEntityId;
    if (!id) return;
    // In companion mode the active entity is a switch; in manual mode
    // typically an input_boolean. `turn_on` works for both via their
    // respective domain.
    await this.hass.callService(id.split(".")[0], "turn_on", {
      entity_id: id
    });
  }

  private async cancelTimer(): Promise<void> {
    const id = this._activeEntityId;
    if (!id) return;
    await this.hass.callService(id.split(".")[0], "turn_off", {
      entity_id: id
    });
  }

  private handleCancelPick = (): void => {
    this._pickingOn = false;
    this._pickingOff = false;
    this._confirmingCancel = false;
    this._skippedOn = false;
  };

  // --- Render ---

  private buildSubtitle(active: boolean, deviceOn: boolean): string {
    const lang = haLang(this.hass);
    const stateName = this._companionStateName();

    if (!active) {
      return stateName ?? (deviceOn ? tr(lang, "common.on") : tr(lang, "common.off"));
    }

    const onTime = this._getOnDatetime();
    const offTime = this._getOffDatetime();
    const parts: string[] = [];
    if (onTime) parts.push(tr(lang, "timer.subtitle_on", { time: this.formatDatetime(onTime) }));
    if (offTime) parts.push(tr(lang, "timer.subtitle_off", { time: this.formatDatetime(offTime) }));
    const timeInfo = parts.join(" → ");

    if (stateName && timeInfo) return `${stateName} · ${timeInfo}`;
    if (stateName) return stateName;
    return timeInfo || tr(lang, "timer.timer_active");
  }

  protected render(): TemplateResult {
    const lang = haLang(this.hass);
    if (!this._config) return html`<ha-card>${tr(lang, "common.invalid_config")}</ha-card>`;
    if (!this.hass) return html``;

    // Soft placeholder when neither mode has enough config to resolve an
    // active entity — typically during editing.
    if (!this._activeEntityId) {
      const hint = this._config.use_companion !== false
        ? tr(lang, "timer.placeholder_companion")
        : tr(lang, "timer.placeholder_manual");
      return html`
        <ha-card>
          <div class="placeholder">
            <ha-icon icon="mdi:timer-outline"></ha-icon>
            <div class="placeholder-text">${hint}</div>
          </div>
        </ha-card>
      `;
    }

    const config = this._config;
    const active = this.isActive();
    const deviceOn = this.switchIsOn();
    const iconStyle = mushroomIconStyle(deviceOn ? config.icon_color : "disabled");
    const friendlyName = getEntity(this.hass, this._switchEntityId)?.attributes?.friendly_name
      ?? getEntity(this.hass, this._activeEntityId)?.attributes?.friendly_name;
    const subtitle = config.subtitle || this.buildSubtitle(active, deviceOn);
    const defaultName = tr(lang, "timer.default_name");

    return html`
      <ha-card>
        <div class="container">
          <div class="state-item">
            <div class="icon-wrap">
              <div class="icon-shape" style=${styleMap(iconStyle)}>
                <ha-icon .icon=${this._resolvedIcon()}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${config.name || friendlyName || defaultName}</div>
              <div class="secondary">${subtitle}</div>
            </div>
            ${active
              ? html`
                  <button type="button" class="action-btn active" @click=${this.handleBadgeClick} title=${tr(lang, "timer.cancel_timer")}>
                    <ha-icon icon="mdi:timer-sand"></ha-icon>
                    <span>${tr(lang, "common.active")}</span>
                  </button>
                `
              : html`
                  <button type="button" class="action-btn set" @click=${this.handleOpenPicker} title=${tr(lang, "common.set")}>
                    <ha-icon icon="mdi:timer-plus-outline"></ha-icon>
                    <span>${tr(lang, "common.set")}</span>
                  </button>
                `}
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    .placeholder {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      color: var(--secondary-text-color);
    }
    .placeholder ha-icon {
      --mdc-icon-size: 28px;
      opacity: 0.6;
      flex: none;
    }
    .placeholder-text {
      font-size: 13px;
      line-height: 1.4;
    }
    :host {
      display: block;
      container-type: inline-size;
      height: 100%;
      box-sizing: border-box;
      --spacing: var(--mush-spacing, 10px);
      --card-primary-font-size: var(--mush-card-primary-font-size, 14px);
      --card-secondary-font-size: var(--mush-card-secondary-font-size, 12px);
      --card-primary-font-weight: var(--mush-card-primary-font-weight, 500);
      --card-secondary-font-weight: var(--mush-card-secondary-font-weight, 400);
      --card-primary-line-height: var(--mush-card-primary-line-height, 20px);
      --card-secondary-line-height: var(--mush-card-secondary-line-height, 16px);
      --control-border-radius: var(--mush-control-border-radius, 12px);
      --control-spacing: var(--mush-control-spacing, 12px);
      --icon-size: var(--mush-icon-size, 36px);
      --icon-border-radius: var(--mush-icon-border-radius, 50%);
      --icon-symbol-size: var(--mush-icon-symbol-size, 0.667em);
      --icon-color: var(--primary-text-color);
      --shape-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
    }

    ha-card { display: flex; flex-direction: column; justify-content: center; box-sizing: border-box; height: 100%; overflow: hidden; }
    .container { display: flex; flex-direction: column; box-sizing: border-box; justify-content: center; height: 100%; min-height: 0; }

    /* Header */
    .state-item { display: flex; align-items: center; gap: var(--spacing); padding: var(--spacing); min-width: 0; }
    .icon-wrap { position: relative; flex: none; }
    .icon-shape {
      width: var(--icon-size); height: var(--icon-size); font-size: var(--icon-size);
      border-radius: var(--icon-border-radius); display: flex; align-items: center; justify-content: center;
      background-color: var(--shape-color); transition: background-color 280ms ease-out;
    }
    .icon-shape ha-icon { --mdc-icon-size: var(--icon-symbol-size); color: var(--icon-color); display: flex; line-height: 0; }
    .info { min-width: 0; flex: 1; display: flex; flex-direction: column; }
    .primary {
      font-weight: var(--card-primary-font-weight); font-size: var(--card-primary-font-size);
      line-height: var(--card-primary-line-height); color: var(--primary-text-color);
      text-overflow: ellipsis; overflow: hidden; white-space: nowrap;
    }
    .secondary {
      font-weight: var(--card-secondary-font-weight); font-size: var(--card-secondary-font-size);
      line-height: var(--card-secondary-line-height); color: var(--secondary-text-color);
      text-overflow: ellipsis; overflow: hidden; white-space: nowrap;
    }

    /* Action button (Set / Active) — matches wallbox play button size */
    .action-btn {
      display: flex; align-items: center; justify-content: center; gap: 6px;
      border: none; background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
      border-radius: calc(var(--control-border-radius) - 2px);
      height: var(--icon-size); min-width: var(--icon-size);
      padding: 0 10px; margin: 0 0 0 auto; box-sizing: border-box;
      font-family: inherit; font-size: var(--card-secondary-font-size);
      font-weight: 500; color: var(--primary-text-color); white-space: nowrap;
      cursor: pointer; -webkit-tap-highlight-color: transparent;
      transition: background-color 0.2s; flex: none;
    }
    .action-btn ha-icon { --mdc-icon-size: 18px; display: flex; line-height: 0; flex: none; }
    .action-btn.active {
      background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.15);
      color: var(--primary-color, rgb(3, 169, 244));
    }
  `;
}

export class PowerPilzTimerCardV2 extends PowerPilzTimerCard {}

if (!customElements.get("power-pilz-timer-card")) {
  customElements.define("power-pilz-timer-card", PowerPilzTimerCard);
}
if (!customElements.get("power-pilz-timer-card-v2")) {
  customElements.define("power-pilz-timer-card-v2", PowerPilzTimerCardV2);
}

declare global {
  interface HTMLElementTagNameMap {
    "power-pilz-timer-card": PowerPilzTimerCard;
    "power-pilz-timer-card-v2": PowerPilzTimerCardV2;
  }
}
