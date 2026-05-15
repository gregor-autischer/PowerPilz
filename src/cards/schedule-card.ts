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
import { scheduleSharedStyles } from "./schedule-shared-styles";
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

type WeekBlocks = Record<string, ScheduleBlock[]>;

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
    // present (authoritative), else compute from today's blocks.
    const id = this._scheduleEntityId;
    const attrs = id ? this.hass?.states?.[id]?.attributes : undefined;
    if (typeof attrs?.schedule_active === "boolean") {
      return attrs.schedule_active as boolean;
    }

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

  // --- Render ---

  private renderTimeline(): TemplateResult {
    const config = this._config!;
    const { start, end } = this.resolvedTimeWindow();
    const range = end - start;
    const blocks = this.blocksForDay(this._selectedDay);
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
          ${blocks.map((block) => {
            const from = this.timeToMinutes(block.from);
            const to = this.timeToMinutes(block.to);
            const clampedFrom = Math.max(from, start);
            const clampedTo = Math.min(to, end);
            if (clampedTo <= clampedFrom) return nothing;
            const leftPct = ((clampedFrom - start) / range) * 100;
            const widthPct = ((clampedTo - clampedFrom) / range) * 100;
            return html`
              <div
                class="timeline-block"
                style=${styleMap({
                  left: `${leftPct}%`,
                  width: `${widthPct}%`,
                  "background-color": activeAlpha
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
    const modeIcon = norm === "on" ? "mdi:power" : norm === "off" ? "mdi:power-off" : "mdi:clock-outline";
    const modeLabel = this.modeLabel(mode);

    return html`
      <button type="button" class="mode-btn" @click=${this.handleModeChange} title="Mode: ${mode}">
        <ha-icon .icon=${modeIcon}></ha-icon>
        <span class="mode-label">${modeLabel}</span>
      </button>
    `;
  }

  /** Demo card for the dashboard card-picker preview (preview=true,
   *  no entity yet). Renders the regular layout with hardcoded mock
   *  blocks so users see what the card actually looks like. */
  private _renderDemo(): TemplateResult {
    const config = this._config!;
    const { start, end } = this.resolvedTimeWindow();
    const range = end - start;
    const activeColor = this.resolvedActiveColor();
    const activeAlpha = this.resolvedActiveColorAlpha(0.3);
    const nowMin = this.nowMinutes();
    const showNow = config.show_now_indicator !== false && nowMin >= start && nowMin <= end;
    const showLabels = config.show_time_labels !== false;
    const showDays = config.show_day_selector !== false;
    const isVertical = config.card_layout === "vertical";

    // Plausible demo: morning + evening heating window.
    const demoBlocks = [
      { startMin: 6 * 60, endMin: 8 * 60 + 30 },
      { startMin: 17 * 60, endMin: 22 * 60 },
    ];

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
                  <ha-icon .icon=${config.icon ?? "mdi:clock-outline"}></ha-icon>
                </div>
              </div>
              <div class="info">
                <div class="primary">${config.name || tr(lang, "schedule.default_name")}</div>
                <div class="secondary">${config.subtitle || "Auto"}</div>
              </div>
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
                ${demoBlocks.map((b) => {
                  const leftPct = ((b.startMin - start) / range) * 100;
                  const widthPct = ((b.endMin - b.startMin) / range) * 100;
                  return html`
                    <div class="timeline-block" style=${styleMap({
                      left: `${leftPct}%`,
                      width: `${widthPct}%`,
                      "background-color": activeAlpha
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

  protected render(): TemplateResult {
    if (!this._config) return html`<ha-card>${tr(haLang(this.hass), "common.invalid_config")}</ha-card>`;
    if (!this.hass) return html``;

    if (!this._scheduleEntityId) {
      if (this.preview) return this._renderDemo();
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

  static styles = [
    scheduleSharedStyles,
    css`
      /* Blocks-mode marker: filled rectangle spanning from/to. */
      .timeline-block {
        position: absolute;
        top: 6px;
        bottom: 6px;
        border-radius: 6px;
        pointer-events: none;
      }
    `,
  ];
}

if (!customElements.get("power-pilz-schedule-card")) {
  customElements.define("power-pilz-schedule-card", PowerPilzScheduleCard);
}

declare global {
  interface HTMLElementTagNameMap {
    "power-pilz-schedule-card": PowerPilzScheduleCard;
  }
}
