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
import { mushroomIconStyle, toRgbCss, type ColorValue } from "../utils/color";
import { tr, haLang, weekdayShort } from "../utils/i18n";
import { bindActionHandler, type ActionHandlerCleanup } from "../utils/action-handler";
import { openScheduleEditDialog } from "./dialogs/schedule-edit-dialog";
import "./editors/schedule-card-editor";

/** Action config shape — mirrors HA's ActionConfig. */
interface ActionConfig {
  action?: string;
  navigation_path?: string;
  url_path?: string;
  service?: string;
  target?: Record<string, unknown>;
  service_data?: Record<string, unknown>;
  data?: Record<string, unknown>;
  confirmation?: unknown;
  [key: string]: unknown;
}

/** Custom action value for opening our Schedule edit dialog. */
const ACTION_SCHEDULE_EDIT = "powerpilz-schedule-edit";

// --- Types ---

type CardLayout = "horizontal" | "vertical";
type TimeWindow = "6" | "12" | "24";

interface ScheduleBlock {
  from: string; // "HH:MM:SS"
  to: string;   // "HH:MM:SS"
  data?: Record<string, unknown>;
}

interface ScheduleEvent {
  time: string; // "HH:MM:SS"
  data?: Record<string, unknown>;
}

type WeekBlocks = Record<string, ScheduleBlock[]>;
type WeekEvents = Record<string, ScheduleEvent[]>;

type ScheduleKind = "blocks" | "events";

// Map JS Date.getDay() (0 = Sunday) to the canonical weekday keys the
// Smart Schedule helper emits in its `week_blocks` attribute (Python's
// datetime.weekday() order, Monday=0).
const WEEKDAY_KEYS_BY_DAY_INDEX: readonly string[] = [
  "sunday",    // 0 — JS Sun
  "monday",    // 1
  "tuesday",   // 2
  "wednesday", // 3
  "thursday",  // 4
  "friday",    // 5
  "saturday",  // 6
];

interface PowerPilzScheduleCardConfig extends LovelaceCardConfig {
  type: "custom:power-pilz-schedule-card";
  /** The PowerPilz Smart Schedule helper entity (a
   *  `select.*` entity exposed by the Companion integration). All
   *  schedule blocks, target device and mode options come from its
   *  attributes — no extra entities are needed. */
  entity?: string;
  name?: string;
  subtitle?: string;
  icon?: string;
  icon_color?: ColorValue;
  card_layout?: CardLayout;
  time_window?: TimeWindow;
  active_color?: ColorValue;
  show_day_selector?: boolean;
  show_mode_control?: boolean;
  show_now_indicator?: boolean;
  show_time_labels?: boolean;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  /** When true (default) a long-press on the card opens the PowerPilz
   *  schedule edit dialog — unless `hold_action` is explicitly set to
   *  something else. */
  long_press_opens_editor?: boolean;
}

export class PowerPilzScheduleCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement("power-pilz-schedule-card-editor") as LovelaceCardEditor;
  }

  public static async getStubConfig(hass?: HomeAssistant): Promise<PowerPilzScheduleCardConfig> {
    const states = hass?.states ?? {};
    const entityIds = Object.keys(states);

    // Prefer a PowerPilz Smart Schedule select — distinguishable by
    // its `mode_names` + `week_blocks` attributes.
    const entity = entityIds.find((id) => {
      if (!id.startsWith("select.")) return false;
      const attrs = states[id]?.attributes as Record<string, unknown> | undefined;
      return !!attrs?.mode_names && attrs?.week_blocks !== undefined;
    });

    return {
      type: "custom:power-pilz-schedule-card",
      entity: entity ?? ""
    };
  }

  @property({ attribute: false })
  public hass!: HomeAssistant;

  @property({ type: Boolean })
  public preview = false;

  @property({ type: Boolean })
  public editMode = false;

  @property({ reflect: true, type: String })
  public layout: string | undefined;

  @state() private _config?: PowerPilzScheduleCardConfig;
  @state() private _selectedDay: number = new Date().getDay(); // 0=Sun
  @state() private _tick = 0; // bumped every minute for now-indicator

  private _tickTimer?: number;

  public setConfig(config: PowerPilzScheduleCardConfig): void {
    // Legacy: `companion_entity` → `entity`.
    const legacy = config as PowerPilzScheduleCardConfig & {
      companion_entity?: string;
    };
    const entity = config.entity || legacy.companion_entity || "";

    this._config = {
      ...config,
      entity,
      icon: config.icon ?? "mdi:clock-outline",
      name: config.name ?? tr(haLang(this.hass), "schedule.default_name"),
      time_window: config.time_window ?? "24",
      show_day_selector: config.show_day_selector ?? true,
      show_mode_control: config.show_mode_control ?? true,
      show_now_indicator: config.show_now_indicator ?? true,
      show_time_labels: config.show_time_labels ?? true
    };
  }

  // -------- Entity resolvers --------
  //
  // In v0.4+ the card only takes the Smart Schedule select entity; the
  // target device, mode list and weekly blocks all come from its
  // attributes. Legacy helpers that used to split this into three
  // entities are gone.

  private get _scheduleEntityId(): string | undefined {
    return this._config?.entity || undefined;
  }

  /** The Smart Schedule select is both the schedule source AND the
   *  mode selector. Kept as a separate getter for readability at call
   *  sites. */
  private get _modeEntityId(): string | undefined {
    return this._scheduleEntityId;
  }

  /** Target device that the helper drives — exposed on the select as
   *  the `target_entity` attribute. */
  private get _switchEntityId(): string | undefined {
    const id = this._scheduleEntityId;
    if (!id) return undefined;
    const target = this.hass?.states?.[id]?.attributes?.target_entity;
    return typeof target === "string" ? target : undefined;
  }

  public getCardSize(): number {
    return this._config?.show_day_selector !== false ? 3 : 2;
  }

  public getGridOptions(): LovelaceGridOptions {
    const showDays = this._config?.show_day_selector !== false;
    return {
      columns: 6,
      rows: showDays ? 3 : 2,
      min_columns: 3,
      min_rows: showDays ? 2 : 1,
      max_rows: showDays ? 4 : 3
    };
  }

  public getLayoutOptions(): LovelaceLayoutOptions {
    return { grid_columns: 2, grid_rows: this.getCardSize() };
  }

  private _actionCleanup?: ActionHandlerCleanup;

  protected firstUpdated(): void {
    this._bindActions();
  }

  protected updated(changedProps: Map<string, unknown>): void {
    if (!this._actionCleanup || changedProps.has("_config")) {
      this._bindActions();
    }
  }

  private _bindActions(): void {
    const target = this.renderRoot.querySelector<HTMLElement>("ha-card");
    if (!target) return;
    this._actionCleanup?.destroy();
    const explicitHold = !!this._config?.hold_action?.action
      && this._config.hold_action.action !== "none";
    const defaultHold = this._config?.long_press_opens_editor !== false
      && !this._config?.hold_action?.action;
    const hasHold = explicitHold || defaultHold;
    const hasDoubleTap = !!this._config?.double_tap_action
      && this._config.double_tap_action.action !== undefined
      && this._config.double_tap_action.action !== "none";
    this._actionCleanup = bindActionHandler(
      target,
      {
        onTap: () => this._fireAction("tap"),
        onHold: () => this._fireAction("hold"),
        onDoubleTap: () => this._fireAction("double_tap"),
      },
      { hasHold, hasDoubleTap }
    );
  }

  private _fireAction(kind: "tap" | "hold" | "double_tap"): void {
    if (this.isEditorPreview() || !this._config) return;
    const key = `${kind}_action` as const;
    let actionConfig = this._config[key];

    // Legacy fallback: a bare tap without tap_action cycles mode.
    if (kind === "tap" && (!actionConfig || !actionConfig.action)) {
      if (this._modeEntityId) {
        actionConfig = { action: "fire-dom-event" } as ActionConfig;
        void this.handleModeChange(new Event("tap"));
      }
      return;
    }

    // Default for hold: open the edit dialog.
    if (kind === "hold" && (!actionConfig || !actionConfig.action)) {
      if (this._config.long_press_opens_editor !== false) {
        actionConfig = { action: ACTION_SCHEDULE_EDIT };
      }
    }

    if (!actionConfig || !actionConfig.action || actionConfig.action === "none") {
      return;
    }

    if (actionConfig.action === ACTION_SCHEDULE_EDIT) {
      this._openScheduleEdit();
      return;
    }

    this.dispatchEvent(
      new CustomEvent("hass-action", {
        detail: { config: this._config, action: kind },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _openScheduleEdit(): void {
    const entity = this._scheduleEntityId;
    if (!entity || !this.hass) return;
    openScheduleEditDialog({ hass: this.hass, scheduleEntityId: entity });
  }

  public connectedCallback(): void {
    super.connectedCallback();
    if (!this._tickTimer) {
      this._tickTimer = window.setInterval(() => {
        this._tick++;
      }, 60_000);
    }
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._tickTimer) {
      clearInterval(this._tickTimer);
      this._tickTimer = undefined;
    }
    this._actionCleanup?.destroy();
    this._actionCleanup = undefined;
  }

  // --- Helpers ---

  private isEditorPreview(): boolean {
    return this.preview || this.editMode;
  }

  private iconStyle(color?: ColorValue): Record<string, string> {
    return mushroomIconStyle(color);
  }

  private _weekBlocks(): WeekBlocks {
    const id = this._scheduleEntityId;
    if (!id) return {};
    const attrs = this.hass?.states?.[id]?.attributes as Record<string, unknown> | undefined;
    const wb = attrs?.week_blocks;
    if (wb && typeof wb === "object" && !Array.isArray(wb)) {
      return wb as WeekBlocks;
    }
    return {};
  }

  private dayKey(dayIndex: number): string {
    return WEEKDAY_KEYS_BY_DAY_INDEX[dayIndex] ?? "monday";
  }

  private blocksForDay(dayIndex: number): ScheduleBlock[] {
    const wb = this._weekBlocks();
    const blocks = wb[this.dayKey(dayIndex)];
    return Array.isArray(blocks) ? (blocks as ScheduleBlock[]) : [];
  }

  private _weekEvents(): WeekEvents {
    const id = this._scheduleEntityId;
    if (!id) return {};
    const attrs = this.hass?.states?.[id]?.attributes as Record<string, unknown> | undefined;
    const we = attrs?.week_events;
    if (we && typeof we === "object" && !Array.isArray(we)) {
      return we as WeekEvents;
    }
    return {};
  }

  private eventsForDay(dayIndex: number): ScheduleEvent[] {
    const we = this._weekEvents();
    const events = we[this.dayKey(dayIndex)];
    return Array.isArray(events) ? (events as ScheduleEvent[]) : [];
  }

  private scheduleKind(): ScheduleKind {
    const id = this._scheduleEntityId;
    const attrs = id ? this.hass?.states?.[id]?.attributes : undefined;
    return attrs?.schedule_kind === "events" ? "events" : "blocks";
  }

  private timeToMinutes(timeStr: string): number {
    const parts = (timeStr || "").split(":");
    const h = parseInt(parts[0] ?? "0", 10);
    const m = parseInt(parts[1] ?? "0", 10);
    return (isNaN(h) ? 0 : h) * 60 + (isNaN(m) ? 0 : m);
  }

  private nowMinutes(): number {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }

  private resolvedTimeWindow(): { start: number; end: number } {
    const window = this._config?.time_window ?? "24";
    if (window === "24") return { start: 0, end: 1440 };
    const half = window === "12" ? 360 : 180;
    const now = this.nowMinutes();
    const start = Math.max(0, now - half);
    const end = Math.min(1440, now + half);
    return { start, end };
  }

  private resolvedActiveColor(): string {
    const rgb = toRgbCss(this._config?.active_color);
    if (rgb) return `rgb(${rgb})`;
    return "var(--primary-color, rgb(3, 169, 244))";
  }

  private resolvedActiveColorAlpha(alpha: number): string {
    const rgb = toRgbCss(this._config?.active_color);
    if (rgb) return `rgba(${rgb}, ${alpha})`;
    return `rgba(var(--rgb-primary-color, 3, 169, 244), ${alpha})`;
  }

  private isDeviceOn(): boolean {
    const mode = this.modeValue().toLowerCase();
    if (mode === "on") return true;
    if (mode === "off") return false;

    // Auto mode: read the helper's own schedule_active attribute if
    // present (authoritative). In events mode this reflects a running
    // pulse; in blocks mode the current schedule window.
    const id = this._scheduleEntityId;
    const attrs = id ? this.hass?.states?.[id]?.attributes : undefined;
    if (typeof attrs?.schedule_active === "boolean") {
      return attrs.schedule_active as boolean;
    }

    if (this.scheduleKind() === "events") return false;

    const todayIdx = new Date().getDay();
    const todaysBlocks = this.blocksForDay(todayIdx);
    const nowMin = this.nowMinutes();
    return todaysBlocks.some((b) => {
      const from = this.timeToMinutes(b.from);
      const to = this.timeToMinutes(b.to);
      return nowMin >= from && nowMin < to;
    });
  }

  /** Returns the *logical* mode ("on"/"off"/"auto") by reverse-mapping
   *  the helper's current display state via the `mode_names` attribute. */
  private modeValue(): string {
    const modeId = this._modeEntityId;
    if (!modeId) return "auto";
    const entity = getEntity(this.hass, modeId);
    const state = entity?.state ?? "auto";
    const modeNames = entity?.attributes?.mode_names;
    if (modeNames && typeof modeNames === "object") {
      for (const [key, disp] of Object.entries(modeNames as Record<string, unknown>)) {
        if (typeof disp === "string" && disp === state) return key;
      }
    }
    return state;
  }

  /** Maps a logical mode back to the user-facing display name from the
   *  helper's `mode_names` attribute. */
  private modeLabel(mode: string): string {
    const modeId = this._modeEntityId;
    if (modeId) {
      const entity = getEntity(this.hass, modeId);
      const modeNames = entity?.attributes?.mode_names;
      if (modeNames && typeof modeNames === "object") {
        const display = (modeNames as Record<string, unknown>)[mode.toLowerCase()];
        if (typeof display === "string" && display) return display;
      }
    }
    return mode;
  }

  // --- Event handlers ---

  private handleDaySelect = (event: Event): void => {
    event.stopPropagation();
    const target = event.currentTarget;
    if (!(target instanceof HTMLElement)) return;
    const day = parseInt(target.dataset.day ?? "0", 10);
    this._selectedDay = day;
  };

  private handleModeChange = async (event: Event): Promise<void> => {
    event.stopPropagation();
    const modeId = this._modeEntityId;
    if (this.isEditorPreview() || !modeId) return;

    const entity = getEntity(this.hass, modeId);
    if (!entity) return;
    const options = (entity.attributes?.options as string[]) ?? [];
    if (options.length === 0) return;

    const current = options.indexOf(entity.state);
    const next = (current + 1) % options.length;
    const nextOption = options[next];
    const domain = modeId.split(".")[0];
    await this.hass.callService(domain, "select_option", {
      entity_id: modeId,
      option: nextOption
    });
  };

  private handleTriggerNow = async (event: Event): Promise<void> => {
    event.stopPropagation();
    const id = this._scheduleEntityId;
    if (this.isEditorPreview() || !id) return;
    await this.hass.callService("powerpilz_companion", "trigger_event_now", {
      entity_id: id
    });
  };

  // --- Render ---

  private renderTimeline(): TemplateResult {
    const config = this._config!;
    const { start, end } = this.resolvedTimeWindow();
    const range = end - start;
    const kind = this.scheduleKind();
    const activeColor = this.resolvedActiveColor();
    const activeAlpha = this.resolvedActiveColorAlpha(0.3);
    // Reference _tick so we re-render when the minute changes.
    void this._tick;
    const nowMin = this.nowMinutes();
    const isToday = this._selectedDay === new Date().getDay();
    const showNow = config.show_now_indicator !== false && isToday && nowMin >= start && nowMin <= end;
    const showLabels = config.show_time_labels !== false;

    const hourLabels: { hour: number; pct: number }[] = [];
    if (showLabels) {
      const firstHour = Math.ceil(start / 60);
      const lastHour = Math.floor(end / 60);
      const step = range > 720 ? 6 : range > 360 ? 3 : 2;
      for (let h = firstHour; h <= lastHour; h += step) {
        const min = h * 60;
        if (min >= start && min <= end) {
          hourLabels.push({ hour: h >= 24 ? 0 : h, pct: ((min - start) / range) * 100 });
        }
      }
    }

    const markers: TemplateResult[] = kind === "events"
      ? this.eventsForDay(this._selectedDay).flatMap((ev) => {
          const min = this.timeToMinutes(ev.time);
          if (min < start || min > end) return [];
          const leftPct = ((min - start) / range) * 100;
          return [html`
            <div
              class="timeline-pin"
              style=${styleMap({
                left: `${leftPct}%`,
                "--pin-color": activeColor
              })}
            >
              <div class="pin-stem"></div>
              <div class="pin-head"></div>
            </div>
          `];
        })
      : this.blocksForDay(this._selectedDay).flatMap((block) => {
          const from = this.timeToMinutes(block.from);
          const to = this.timeToMinutes(block.to);
          const clampedFrom = Math.max(from, start);
          const clampedTo = Math.min(to, end);
          if (clampedTo <= clampedFrom) return [];
          const leftPct = ((clampedFrom - start) / range) * 100;
          const widthPct = ((clampedTo - clampedFrom) / range) * 100;
          return [html`
            <div
              class="timeline-block"
              style=${styleMap({
                left: `${leftPct}%`,
                width: `${widthPct}%`,
                "background-color": activeAlpha
              })}
            ></div>
          `];
        });

    return html`
      <div class="timeline-container ${kind === "events" ? "events" : "blocks"}">
        ${showLabels
          ? html`
              <div class="time-labels">
                ${hourLabels.map(
                  (l) => html`<span class="time-label" style=${styleMap({ left: `${l.pct}%` })}>${String(l.hour).padStart(2, "0")}</span>`
                )}
              </div>
            `
          : nothing}
        <div class="timeline-track">
          ${markers}
          ${showNow
            ? html`
                <div
                  class="now-indicator"
                  style=${styleMap({
                    left: `${((nowMin - start) / range) * 100}%`,
                    "background-color": activeColor
                  })}
                ></div>
              `
            : nothing}
        </div>
      </div>
    `;
  }

  private renderDaySelector(): TemplateResult {
    const today = new Date().getDay();
    return html`
      <div class="day-selector">
        ${WEEKDAY_KEYS_BY_DAY_INDEX.map((_, idx) => html`
          <button
            type="button"
            class="day-btn ${idx === this._selectedDay ? "active" : ""} ${idx === today ? "today" : ""}"
            data-day=${idx}
            @click=${this.handleDaySelect}
          >
            ${weekdayShort(haLang(this.hass), idx)}
          </button>
        `)}
      </div>
    `;
  }

  private renderModeButton(): TemplateResult {
    const mode = this.modeValue();
    const norm = mode.toLowerCase();
    const modeIcon = norm === "on" ? "mdi:power" : norm === "off" ? "mdi:power-off" : "mdi:clock-outline";
    const modeLabel = this.modeLabel(mode);

    return html`
      <button type="button" class="mode-btn" @click=${this.handleModeChange} title="Mode: ${mode}">
        <ha-icon .icon=${modeIcon}></ha-icon>
        <span class="mode-label">${modeLabel}</span>
      </button>
    `;
  }

  private renderTriggerNowButton(): TemplateResult {
    return html`
      <button
        type="button"
        class="trigger-now-btn"
        @click=${this.handleTriggerNow}
        title="Trigger event now"
      >
        <ha-icon icon="mdi:play"></ha-icon>
      </button>
    `;
  }

  protected render(): TemplateResult {
    if (!this._config) return html`<ha-card>${tr(haLang(this.hass), "common.invalid_config")}</ha-card>`;
    if (!this.hass) return html``;

    if (!this._scheduleEntityId) {
      const lang = haLang(this.hass);
      return html`
        <ha-card>
          <div class="placeholder">
            <ha-icon icon="mdi:clock-outline"></ha-icon>
            <div class="placeholder-text">${tr(lang, "schedule.placeholder_companion")}</div>
          </div>
        </ha-card>
      `;
    }

    const config = this._config;
    const friendlyName = getEntity(this.hass, this._scheduleEntityId)?.attributes?.friendly_name;
    const mode = this.modeValue();
    const subtitle = config.subtitle || this.modeLabel(mode);
    const showDays = config.show_day_selector !== false;
    const showMode = config.show_mode_control !== false && Boolean(this._modeEntityId);
    const isVertical = config.card_layout === "vertical";

    const isDeviceOn = this.isDeviceOn();
    const iconStyle = isDeviceOn
      ? this.iconStyle(config.icon_color)
      : this.iconStyle("disabled");

    const isEvents = this.scheduleKind() === "events";
    const headerContent = html`
      <div class="state-item">
        <div class="icon-wrap">
          <div class="icon-shape" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${config.icon ?? "mdi:clock-outline"}></ha-icon>
          </div>
        </div>
        <div class="info">
          <div class="primary">${config.name || friendlyName || tr(haLang(this.hass), "schedule.default_name")}</div>
          <div class="secondary">${subtitle}</div>
        </div>
        ${isEvents ? this.renderTriggerNowButton() : nothing}
        ${showMode ? this.renderModeButton() : nothing}
      </div>
    `;

    return html`
      <ha-card>
        <div class="container ${isVertical ? "vertical" : "horizontal"}">
          <div class="row row-header">${headerContent}</div>
          ${showDays
            ? html`<div class="row row-days">${this.renderDaySelector()}</div>`
            : nothing}
          <div class="row row-timeline">${this.renderTimeline()}</div>
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
      --card-primary-letter-spacing: var(--mush-card-primary-letter-spacing, 0.1px);
      --card-secondary-letter-spacing: var(--mush-card-secondary-letter-spacing, 0.4px);
      --control-border-radius: var(--mush-control-border-radius, 12px);
      --control-height: var(--mush-control-height, 42px);
      --control-spacing: var(--mush-control-spacing, 12px);
      --icon-size: var(--mush-icon-size, 36px);
      --icon-border-radius: var(--mush-icon-border-radius, 50%);
      --icon-symbol-size: var(--mush-icon-symbol-size, 0.667em);
      --icon-color: var(--primary-text-color);
      --shape-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
    }

    ha-card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      height: 100%;
      overflow: hidden;
      cursor: pointer;
    }

    .container {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      height: 100%;
      min-height: 0;
      justify-content: stretch;
    }

    .container > .row {
      flex: 1 1 0;
      min-height: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .container > .row-days,
    .container > .row-timeline {
      padding-left: var(--control-spacing);
      padding-right: var(--control-spacing);
    }

    .state-item {
      display: flex;
      align-items: center;
      gap: var(--spacing);
      padding: var(--spacing);
      min-width: 0;
    }

    .icon-wrap { position: relative; flex: none; }

    .icon-shape {
      width: var(--icon-size);
      height: var(--icon-size);
      font-size: var(--icon-size);
      border-radius: var(--icon-border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--shape-color);
      transition: background-color 280ms ease-out;
    }

    .icon-shape ha-icon {
      --mdc-icon-size: var(--icon-symbol-size);
      color: var(--icon-color);
      display: flex;
      line-height: 0;
    }

    .info { min-width: 0; flex: 1; display: flex; flex-direction: column; }

    .primary {
      font-weight: var(--card-primary-font-weight);
      font-size: var(--card-primary-font-size);
      line-height: var(--card-primary-line-height);
      letter-spacing: var(--card-primary-letter-spacing);
      color: var(--primary-text-color);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .secondary {
      font-weight: var(--card-secondary-font-weight);
      font-size: var(--card-secondary-font-size);
      line-height: var(--card-secondary-line-height);
      letter-spacing: var(--card-secondary-letter-spacing);
      color: var(--secondary-text-color);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .day-selector {
      display: flex;
      gap: 2px;
      border-radius: 8px;
      overflow: hidden;
      background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.04);
    }

    .day-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: none;
      padding: 4px 0;
      margin: 0;
      cursor: pointer;
      font-family: var(--paper-font-body1_-_font-family, inherit);
      font-size: 11px;
      font-weight: 500;
      color: var(--secondary-text-color);
      transition: background-color 0.2s, color 0.2s;
      -webkit-tap-highlight-color: transparent;
      border-radius: 6px;
    }

    .day-btn.today {
      font-weight: 700;
      color: var(--primary-text-color);
    }

    .day-btn.active {
      background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08);
      color: var(--primary-text-color);
    }

    .timeline-container { position: relative; }

    .time-labels {
      position: absolute;
      left: 0;
      right: 0;
      bottom: calc(100% + 2px);
      height: 14px;
      font-size: 10px;
      color: var(--secondary-text-color);
      user-select: none;
      pointer-events: none;
    }

    .time-label {
      position: absolute;
      transform: translateX(-50%);
      white-space: nowrap;
    }

    .timeline-track {
      position: relative;
      height: var(--icon-size);
      border-radius: var(--control-border-radius);
      background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
      overflow: hidden;
      cursor: pointer;
    }

    .timeline-block {
      position: absolute;
      top: 6px;
      bottom: 6px;
      border-radius: 6px;
      pointer-events: none;
    }

    /* Events-mode pin marker — vertical stem + circular head, sticks
     * up ~30% above the block track so events are visually distinct. */
    .timeline-container.events .timeline-track {
      overflow: visible;
    }

    .timeline-pin {
      position: absolute;
      top: -30%;
      bottom: 0;
      width: 0;
      transform: translateX(-50%);
      pointer-events: none;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .timeline-pin .pin-stem {
      width: 2px;
      flex: 1;
      background-color: var(--pin-color, var(--primary-color, #03a9f4));
      border-radius: 1px;
      opacity: 0.85;
    }

    .timeline-pin .pin-head {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--pin-color, var(--primary-color, #03a9f4));
      box-shadow: 0 0 0 2px var(--card-background-color, #fff);
      margin-top: -2px;
      flex: none;
    }

    .now-indicator {
      position: absolute;
      top: 2px;
      bottom: 2px;
      width: 2px;
      border-radius: 1px;
      transform: translateX(-1px);
      pointer-events: none;
      opacity: 0.9;
    }

    .mode-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      border: none;
      background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
      border-radius: calc(var(--control-border-radius) - 2px);
      height: var(--icon-size);
      min-width: var(--icon-size);
      padding: 0 10px;
      margin: 0 0 0 auto;
      box-sizing: border-box;
      cursor: pointer;
      color: var(--primary-text-color);
      font-family: var(--paper-font-body1_-_font-family, inherit);
      font-size: var(--card-secondary-font-size);
      font-weight: 500;
      white-space: nowrap;
      transition: background-color 0.2s;
      -webkit-tap-highlight-color: transparent;
      flex: none;
    }

    .mode-btn ha-icon {
      --mdc-icon-size: 18px;
      display: flex;
      line-height: 0;
      flex: none;
    }

    .mode-label {
      min-width: 28px;
      text-align: center;
    }

    .trigger-now-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
      border-radius: calc(var(--control-border-radius) - 2px);
      height: var(--icon-size);
      width: var(--icon-size);
      min-width: var(--icon-size);
      padding: 0;
      margin: 0 6px 0 auto;
      box-sizing: border-box;
      cursor: pointer;
      color: var(--primary-text-color);
      transition: background-color 0.2s;
      -webkit-tap-highlight-color: transparent;
      flex: none;
    }

    .trigger-now-btn + .mode-btn {
      margin-left: 0;
    }

    .trigger-now-btn ha-icon {
      --mdc-icon-size: 18px;
      display: flex;
      line-height: 0;
    }
  `;
}

export class PowerPilzScheduleCardV2 extends PowerPilzScheduleCard {}

if (!customElements.get("power-pilz-schedule-card")) {
  customElements.define("power-pilz-schedule-card", PowerPilzScheduleCard);
}
if (!customElements.get("power-pilz-schedule-card-v2")) {
  customElements.define("power-pilz-schedule-card-v2", PowerPilzScheduleCardV2);
}

declare global {
  interface HTMLElementTagNameMap {
    "power-pilz-schedule-card": PowerPilzScheduleCard;
    "power-pilz-schedule-card-v2": PowerPilzScheduleCardV2;
  }
}
