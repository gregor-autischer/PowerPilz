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
  switch_entity: string;
  on_datetime_entity: string;
  off_datetime_entity?: string;
  active_entity: string;
  name?: string;
  subtitle?: string;
  icon?: string;
  icon_color?: ColorValue;
  active_color?: ColorValue;
}

export class PowerPilzTimerCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement("power-pilz-timer-card-editor") as LovelaceCardEditor;
  }

  public static async getStubConfig(hass?: HomeAssistant): Promise<PowerPilzTimerCardConfig> {
    const states = hass?.states ?? {};
    const entityIds = Object.keys(states);
    const first = (domain: string): string | undefined =>
      entityIds.find((id) => id.startsWith(`${domain}.`));

    return {
      type: "custom:power-pilz-timer-card",
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
  @state() private _confirmingCancel = false;
  @state() private _pickDay = 0;
  @state() private _pickHour = 12;

  private _refreshTimer?: number;

  public setConfig(config: PowerPilzTimerCardConfig): void {
    if (!config.switch_entity || !config.on_datetime_entity || !config.active_entity) {
      throw new Error("switch_entity, on_datetime_entity and active_entity are required");
    }
    this._config = {
      ...config,
      icon: config.icon ?? "mdi:timer-outline",
      name: config.name ?? tr(haLang(this.hass), "timer.default_name")
    };
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

    const label = this._pickingOn ? tr(lang, "timer.turn_on_at") : tr(lang, "timer.turn_off_at_optional");
    const showSkip = this._pickingOff;
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
      skipBtn.textContent = tr(lang, "timer.only_on");
      skipBtn.addEventListener("click", () => { void this.handleSkipOff(); });
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
    return getEntity(this.hass, this._config?.active_entity)?.state === "on";
  }

  private switchIsOn(): boolean {
    return getEntity(this.hass, this._config?.switch_entity)?.state === "on";
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
    this._pickingOn = true;
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
    const domain = this._config.on_datetime_entity.split(".")[0];
    await this.hass.callService(domain, "set_datetime", {
      entity_id: this._config.on_datetime_entity,
      datetime
    });
    this._pickingOn = false;

    // If off_datetime_entity exists, ask for off time
    if (this._config.off_datetime_entity) {
      this._pickHour = Math.min(this._pickHour + 1, 23);
      this._pickingOff = true;
    } else {
      // No off time — just activate
      await this.activateTimer();
    }
  };

  private handleSetOff = async (): Promise<void> => {
    if (!this._config?.off_datetime_entity) return;
    const datetime = this.buildDatetime(this._pickDay, this._pickHour);
    const domain = this._config.off_datetime_entity.split(".")[0];
    await this.hass.callService(domain, "set_datetime", {
      entity_id: this._config.off_datetime_entity,
      datetime
    });
    this._pickingOff = false;
    await this.activateTimer();
  };

  private handleSkipOff = async (): Promise<void> => {
    this._pickingOff = false;
    await this.activateTimer();
  };

  private async activateTimer(): Promise<void> {
    if (!this._config) return;
    const domain = this._config.active_entity.split(".")[0];
    await this.hass.callService(domain, "turn_on", {
      entity_id: this._config.active_entity
    });
  }

  private async cancelTimer(): Promise<void> {
    if (!this._config) return;
    const domain = this._config.active_entity.split(".")[0];
    await this.hass.callService(domain, "turn_off", {
      entity_id: this._config.active_entity
    });
  }

  private handleCancelPick = (): void => {
    this._pickingOn = false;
    this._pickingOff = false;
    this._confirmingCancel = false;
  };

  // --- Render ---

  private buildSubtitle(active: boolean, deviceOn: boolean): string {
    const lang = haLang(this.hass);
    if (!active) return deviceOn ? tr(lang, "common.on") : tr(lang, "common.off");
    const onTime = this.parseDatetime(this._config?.on_datetime_entity);
    const offTime = this._config?.off_datetime_entity
      ? this.parseDatetime(this._config.off_datetime_entity)
      : null;

    const parts: string[] = [];
    if (onTime) parts.push(tr(lang, "timer.subtitle_on", { time: this.formatDatetime(onTime) }));
    if (offTime) parts.push(tr(lang, "timer.subtitle_off", { time: this.formatDatetime(offTime) }));
    if (parts.length === 0) return tr(lang, "timer.timer_active");
    return parts.join(" → ");
  }

  protected render(): TemplateResult {
    const lang = haLang(this.hass);
    if (!this._config) return html`<ha-card>${tr(lang, "common.invalid_config")}</ha-card>`;
    if (!this.hass) return html``;

    const config = this._config;
    const active = this.isActive();
    const deviceOn = this.switchIsOn();
    const iconStyle = mushroomIconStyle(deviceOn ? config.icon_color : "disabled");
    const friendlyName = getEntity(this.hass, config.switch_entity)?.attributes?.friendly_name;
    const subtitle = config.subtitle || this.buildSubtitle(active, deviceOn);
    const defaultName = tr(lang, "timer.default_name");

    return html`
      <ha-card>
        <div class="container">
          <div class="state-item">
            <div class="icon-wrap">
              <div class="icon-shape" style=${styleMap(iconStyle)}>
                <ha-icon .icon=${config.icon ?? "mdi:timer-outline"}></ha-icon>
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
