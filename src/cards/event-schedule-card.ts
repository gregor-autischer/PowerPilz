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
import { openEventScheduleEditDialog } from "./dialogs/event-schedule-edit-dialog";
import { scheduleSharedStyles } from "./schedule-shared-styles";
import "./editors/event-schedule-card-editor";

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

const ACTION_EVENT_SCHEDULE_EDIT = "powerpilz-event-schedule-edit";

type CardLayout = "horizontal" | "vertical";
type TimeWindow = "6" | "12" | "24";

interface ScheduleEvent {
  time: string; // "HH:MM:SS"
  data?: Record<string, unknown>;
}

type WeekEvents = Record<string, ScheduleEvent[]>;

const WEEKDAY_KEYS_BY_DAY_INDEX: readonly string[] = [
  "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
];

interface PowerPilzEventScheduleCardConfig extends LovelaceCardConfig {
  type: "custom:power-pilz-event-schedule-card";
  /** The PowerPilz Smart Event Schedule helper entity (a `select.*`
   *  entity exposed by the Companion integration with schedule_kind=
   *  events). Weekly events, target device and mode options are read
   *  from its attributes. */
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
  show_trigger_button?: boolean;
  show_now_indicator?: boolean;
  show_time_labels?: boolean;
  tap_action?: ActionConfig;
  /** Default behaviour (when undefined): opens the inline event editor.
   *  Set `hold_action.action` to `"none"` to disable, or to any HA
   *  `ui_action` for a custom action. */
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

export class PowerPilzEventScheduleCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement("power-pilz-event-schedule-card-editor") as LovelaceCardEditor;
  }

  public static async getStubConfig(hass?: HomeAssistant): Promise<PowerPilzEventScheduleCardConfig> {
    const states = hass?.states ?? {};
    const entityIds = Object.keys(states);
    const entity = entityIds.find((id) => {
      if (!id.startsWith("select.")) return false;
      const attrs = states[id]?.attributes as Record<string, unknown> | undefined;
      return attrs?.schedule_kind === "events";
    });
    return {
      type: "custom:power-pilz-event-schedule-card",
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

  @state() private _config?: PowerPilzEventScheduleCardConfig;
  @state() private _selectedDay: number = new Date().getDay();
  @state() private _tick = 0;

  private _tickTimer?: number;
  private _actionCleanup?: ActionHandlerCleanup;

  public setConfig(config: PowerPilzEventScheduleCardConfig): void {
    this._config = {
      ...config,
      entity: config.entity ?? "",
      icon: config.icon ?? "mdi:bell-ring-outline",
      name: config.name ?? tr(haLang(this.hass), "event_schedule.default_name"),
      time_window: config.time_window ?? "24",
      show_day_selector: config.show_day_selector ?? true,
      show_mode_control: config.show_mode_control ?? true,
      show_trigger_button: config.show_trigger_button ?? true,
      show_now_indicator: config.show_now_indicator ?? true,
      show_time_labels: config.show_time_labels ?? true
    };
  }

  private get _scheduleEntityId(): string | undefined {
    return this._config?.entity || undefined;
  }

  private get _modeEntityId(): string | undefined {
    return this._scheduleEntityId;
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
    const defaultHold = !this._config?.hold_action?.action;
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

    if (kind === "tap" && (!actionConfig || !actionConfig.action)) {
      if (this._modeEntityId) {
        void this.handleModeChange(new Event("tap"));
      }
      return;
    }

    if (kind === "hold" && (!actionConfig || !actionConfig.action)) {
      actionConfig = { action: ACTION_EVENT_SCHEDULE_EDIT };
    }

    if (!actionConfig || !actionConfig.action || actionConfig.action === "none") {
      return;
    }

    if (actionConfig.action === ACTION_EVENT_SCHEDULE_EDIT) {
      this._openEditDialog();
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

  private _openEditDialog(): void {
    const entity = this._scheduleEntityId;
    if (!entity || !this.hass) return;
    openEventScheduleEditDialog({ hass: this.hass, scheduleEntityId: entity });
  }

  public connectedCallback(): void {
    super.connectedCallback();
    if (!this._tickTimer) {
      this._tickTimer = window.setInterval(() => {
        this._tick++;
      }, 5_000); // 5s — keep trigger button cool-down state fresh
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

  private isEditorPreview(): boolean {
    return this.preview || this.editMode;
  }

  private iconStyle(color?: ColorValue): Record<string, string> {
    return mushroomIconStyle(color);
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

  private dayKey(dayIndex: number): string {
    return WEEKDAY_KEYS_BY_DAY_INDEX[dayIndex] ?? "monday";
  }

  private eventsForDay(dayIndex: number): ScheduleEvent[] {
    const we = this._weekEvents();
    const events = we[this.dayKey(dayIndex)];
    return Array.isArray(events) ? (events as ScheduleEvent[]) : [];
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
    const domain = modeId.split(".")[0];
    await this.hass.callService(domain, "select_option", {
      entity_id: modeId,
      option: options[next]
    });
  };

  private handleTriggerNow = async (event: Event): Promise<void> => {
    event.stopPropagation();
    const id = this._scheduleEntityId;
    if (this.isEditorPreview() || !id) return;
    const attrs = this.hass?.states?.[id]?.attributes;
    if (attrs?.pulse_running === true) return;
    const blockedUntilRaw = attrs?.pulse_blocked_until;
    if (typeof blockedUntilRaw === "string") {
      const blockedUntilMs = Date.parse(blockedUntilRaw);
      if (Number.isFinite(blockedUntilMs) && blockedUntilMs > Date.now()) return;
    }
    await this.hass.callService("powerpilz_companion", "trigger_event_now", {
      entity_id: id
    });
  };

  private renderTimeline(): TemplateResult {
    const config = this._config!;
    const { start, end } = this.resolvedTimeWindow();
    const range = end - start;
    const events = this.eventsForDay(this._selectedDay);
    const activeColor = this.resolvedActiveColor();
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

    return html`
      <div class="timeline-container">
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
          ${events.map((ev) => {
            const min = this.timeToMinutes(ev.time);
            if (min < start || min > end) return nothing;
            const leftPct = ((min - start) / range) * 100;
            return html`
              <div
                class="timeline-pin"
                style=${styleMap({
                  left: `${leftPct}%`,
                  "background-color": activeColor
                })}
              ></div>
            `;
          })}
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
    const modeIcon = norm === "off" ? "mdi:power-off" : "mdi:clock-outline";
    const modeLabel = this.modeLabel(mode);
    return html`
      <button type="button" class="mode-btn" @click=${this.handleModeChange} title="Mode: ${mode}">
        <ha-icon .icon=${modeIcon}></ha-icon>
        <span class="mode-label">${modeLabel}</span>
      </button>
    `;
  }

  /** Demo card for the dashboard card-picker preview (preview=true,
   *  no entity yet). */
  private _renderDemo(): TemplateResult {
    const config = this._config!;
    const { start, end } = this.resolvedTimeWindow();
    const range = end - start;
    const activeColor = this.resolvedActiveColor();
    const nowMin = this.nowMinutes();
    const showNow = config.show_now_indicator !== false && nowMin >= start && nowMin <= end;
    const showLabels = config.show_time_labels !== false;
    const showDays = config.show_day_selector !== false;
    const isVertical = config.card_layout === "vertical";

    // Demo events at three plausible times of day.
    const demoEvents = [7 * 60 + 30, 12 * 60, 19 * 60 + 15];

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

    const today = new Date().getDay();
    const lang = haLang(this.hass);

    return html`
      <ha-card>
        <div class="container ${isVertical ? "vertical" : "horizontal"}">
          <div class="row row-header">
            <div class="state-item">
              <div class="icon-wrap">
                <div class="icon-shape" style=${styleMap(this.iconStyle(config.icon_color))}>
                  <ha-icon .icon=${config.icon ?? "mdi:bell-ring-outline"}></ha-icon>
                </div>
              </div>
              <div class="info">
                <div class="primary">${config.name || tr(lang, "event_schedule.default_name")}</div>
                <div class="secondary">${config.subtitle || "Auto"}</div>
              </div>
              <button type="button" class="trigger-now-btn" disabled>
                <ha-icon icon="mdi:play"></ha-icon>
              </button>
              <button type="button" class="mode-btn" disabled>
                <ha-icon icon="mdi:clock-outline"></ha-icon>
                <span class="mode-label">Auto</span>
              </button>
            </div>
          </div>
          ${showDays
            ? html`
                <div class="row row-days">
                  <div class="day-selector">
                    ${WEEKDAY_KEYS_BY_DAY_INDEX.map((_, idx) => html`
                      <button type="button" class="day-btn ${idx === today ? "active today" : ""}" disabled>
                        ${weekdayShort(lang, idx)}
                      </button>
                    `)}
                  </div>
                </div>
              `
            : nothing}
          <div class="row row-timeline">
            <div class="timeline-container">
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
                ${demoEvents.map((min) => {
                  if (min < start || min > end) return nothing;
                  const leftPct = ((min - start) / range) * 100;
                  return html`
                    <div class="timeline-pin" style=${styleMap({
                      left: `${leftPct}%`,
                      "background-color": activeColor
                    })}></div>
                  `;
                })}
                ${showNow
                  ? html`
                      <div class="now-indicator" style=${styleMap({
                        left: `${((nowMin - start) / range) * 100}%`,
                        "background-color": activeColor
                      })}></div>
                    `
                  : nothing}
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private renderTriggerNowButton(): TemplateResult {
    const id = this._scheduleEntityId;
    const attrs = id ? this.hass?.states?.[id]?.attributes : undefined;
    const pulseRunning = attrs?.pulse_running === true;
    const blockedUntilRaw = attrs?.pulse_blocked_until;
    const blockedUntilMs = typeof blockedUntilRaw === "string"
      ? Date.parse(blockedUntilRaw)
      : NaN;
    const inCoolDown = Number.isFinite(blockedUntilMs) && blockedUntilMs > Date.now();
    const disabled = pulseRunning || inCoolDown;

    const lang = haLang(this.hass);
    let title = tr(lang, "event_schedule.trigger_now");
    if (pulseRunning) {
      title = tr(lang, "event_schedule.trigger_now_blocked_running");
    } else if (inCoolDown) {
      const until = new Date(blockedUntilMs);
      const hh = String(until.getHours()).padStart(2, "0");
      const mm = String(until.getMinutes()).padStart(2, "0");
      const ss = String(until.getSeconds()).padStart(2, "0");
      title = tr(lang, "event_schedule.trigger_now_blocked_cooldown", {
        time: `${hh}:${mm}:${ss}`,
      });
    }

    return html`
      <button
        type="button"
        class="trigger-now-btn"
        ?disabled=${disabled}
        @click=${this.handleTriggerNow}
        title=${title}
      >
        <ha-icon icon="mdi:play"></ha-icon>
      </button>
    `;
  }

  protected render(): TemplateResult {
    if (!this._config) return html`<ha-card>${tr(haLang(this.hass), "common.invalid_config")}</ha-card>`;
    if (!this.hass) return html``;

    if (!this._scheduleEntityId) {
      if (this.preview) return this._renderDemo();
      const lang = haLang(this.hass);
      return html`
        <ha-card>
          <div class="placeholder">
            <ha-icon icon="mdi:bell-ring-outline"></ha-icon>
            <div class="placeholder-text">${tr(lang, "event_schedule.placeholder")}</div>
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
    const showTrigger = config.show_trigger_button !== false;
    const showTimeLabels = config.show_time_labels !== false;
    const isVertical = config.card_layout === "vertical";
    const compactInline = !isVertical && !showDays && !showMode && !showTrigger && !showTimeLabels;

    const iconStyle = this.iconStyle(config.icon_color);

    const headerContent = html`
      <div class="state-item">
        <div class="icon-wrap">
          <div class="icon-shape" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${config.icon ?? "mdi:bell-ring-outline"}></ha-icon>
          </div>
        </div>
        <div class="info">
          <div class="primary">${config.name || friendlyName || tr(haLang(this.hass), "event_schedule.default_name")}</div>
          <div class="secondary">${subtitle}</div>
        </div>
        ${showTrigger ? this.renderTriggerNowButton() : nothing}
        ${showMode ? this.renderModeButton() : nothing}
      </div>
    `;

    return html`
      <ha-card>
        <div class="container ${isVertical ? "vertical" : "horizontal"}${compactInline ? " compact-inline" : ""}">
          <div class="row row-header">${headerContent}</div>
          ${showDays
            ? html`<div class="row row-days">${this.renderDaySelector()}</div>`
            : nothing}
          <div class="row row-timeline">${this.renderTimeline()}</div>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    scheduleSharedStyles,
    css`
      /* Events-mode marker — small circle vertically centered in the
       * track, visually distinct from blocks-mode rectangles. */
      .timeline-pin {
        position: absolute;
        top: 50%;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        box-shadow: 0 0 0 2px var(--card-background-color, #fff);
      }

      /* Manual "trigger now" button — disabled while a pulse is
       * running or in cool-down. */
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
        transition: background-color 0.2s, opacity 0.2s;
        -webkit-tap-highlight-color: transparent;
        flex: none;
      }
      .trigger-now-btn[disabled] { opacity: 0.4; cursor: not-allowed; }
      .trigger-now-btn + .mode-btn { margin-left: 0; }
      .trigger-now-btn ha-icon { --mdc-icon-size: 18px; display: flex; line-height: 0; }
    `,
  ];
}

if (!customElements.get("power-pilz-event-schedule-card")) {
  customElements.define("power-pilz-event-schedule-card", PowerPilzEventScheduleCard);
}

declare global {
  interface HTMLElementTagNameMap {
    "power-pilz-event-schedule-card": PowerPilzEventScheduleCard;
  }
}
