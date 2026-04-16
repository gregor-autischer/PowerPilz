import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import type {
  HassEntity,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  LovelaceCardEditor,
  LovelaceGridOptions,
  LovelaceLayoutOptions
} from "../types";
import { getEntity } from "../utils/entity";
import { mushroomIconStyle, toRgbCss, type ColorValue } from "../utils/color";
import "./editors/schedule-card-editor";

// --- Types ---

type CardLayout = "horizontal" | "vertical";
type TimeWindow = "6" | "12" | "24";

interface ScheduleBlock {
  from: string; // "HH:MM:SS"
  to: string;   // "HH:MM:SS"
}

interface ScheduleData {
  id: string;
  name: string;
  monday: ScheduleBlock[];
  tuesday: ScheduleBlock[];
  wednesday: ScheduleBlock[];
  thursday: ScheduleBlock[];
  friday: ScheduleBlock[];
  saturday: ScheduleBlock[];
  sunday: ScheduleBlock[];
  [key: string]: unknown;
}

const WEEKDAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"] as const;
const WEEKDAY_LABELS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface PowerPilzScheduleCardConfig extends LovelaceCardConfig {
  type: "custom:power-pilz-schedule-card";
  schedule_entity: string;
  switch_entity?: string;
  mode_entity?: string;
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
}

export class PowerPilzScheduleCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement("power-pilz-schedule-card-editor") as LovelaceCardEditor;
  }

  public static async getStubConfig(hass?: HomeAssistant): Promise<PowerPilzScheduleCardConfig> {
    const states = hass?.states ?? {};
    const entityIds = Object.keys(states);
    const firstByDomain = (domain: string): string | undefined =>
      entityIds.find((id) => id.startsWith(`${domain}.`));

    return {
      type: "custom:power-pilz-schedule-card",
      schedule_entity: firstByDomain("schedule") ?? "schedule.my_schedule",
      switch_entity: firstByDomain("switch") ?? firstByDomain("input_boolean"),
      mode_entity: firstByDomain("input_select")
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
  @state() private _scheduleData?: ScheduleData;
  @state() private _selectedDay: number = new Date().getDay(); // 0=Sun

  private _fetchTimer?: number;
  private _lastFetchEntity?: string;
  private _lastEntityUpdated?: string;

  public setConfig(config: PowerPilzScheduleCardConfig): void {
    if (!config.schedule_entity) {
      throw new Error("Schedule entity is required");
    }
    this._config = {
      ...config,
      icon: config.icon ?? "mdi:clock-outline",
      name: config.name ?? "Schedule",
      time_window: config.time_window ?? "24",
      show_day_selector: config.show_day_selector ?? true,
      show_mode_control: config.show_mode_control ?? true,
      show_now_indicator: config.show_now_indicator ?? true,
      show_time_labels: config.show_time_labels ?? true
    };
  }

  public getCardSize(): number {
    const layout = this._config?.card_layout ?? "horizontal";
    return layout === "vertical" ? 3 : 2;
  }

  public getGridOptions(): LovelaceGridOptions {
    const layout = this._config?.card_layout ?? "horizontal";
    return layout === "vertical"
      ? { columns: 6, rows: 3, min_columns: 3, min_rows: 2, max_rows: 4 }
      : { columns: 6, rows: 2, min_columns: 4, min_rows: 1, max_rows: 3 };
  }

  public getLayoutOptions(): LovelaceLayoutOptions {
    return { grid_columns: 2, grid_rows: this.getCardSize() };
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.fetchSchedule();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._fetchTimer) {
      clearInterval(this._fetchTimer);
      this._fetchTimer = undefined;
    }
  }

  protected updated(changedProps: Map<string, unknown>): void {
    if (!changedProps.has("hass") || !this._config?.schedule_entity) return;
    const entity = this._config.schedule_entity;

    // Refetch when schedule entity changes
    if (entity !== this._lastFetchEntity) {
      this._lastFetchEntity = entity;
      this._lastEntityUpdated = undefined;
      this.fetchSchedule();
      return;
    }

    // Refetch when entity state changes (edited elsewhere)
    const stateObj = this.hass?.states?.[entity];
    const lastUpdated = stateObj?.attributes?.last_updated as string | undefined
      ?? stateObj?.state;
    if (lastUpdated && lastUpdated !== this._lastEntityUpdated) {
      this._lastEntityUpdated = lastUpdated;
      this.fetchSchedule();
    }
  }

  // --- Schedule data fetching ---

  private async fetchSchedule(): Promise<void> {
    if (!this.hass?.callWS || !this._config?.schedule_entity) return;
    try {
      const schedules: ScheduleData[] = await this.hass.callWS({ type: "schedule/list" });
      const objectId = this._config.schedule_entity.split(".")[1];
      this._scheduleData = schedules.find((s) => s.id === objectId);
    } catch {
      this._scheduleData = undefined;
    }
    // Auto-refresh every 60s for now-indicator and schedule changes
    if (!this._fetchTimer) {
      this._fetchTimer = window.setInterval(() => this.fetchSchedule(), 60000);
    }
  }

  // --- Helpers ---

  private isEditorPreview(): boolean {
    return this.preview || this.editMode;
  }

  private iconStyle(color?: ColorValue): Record<string, string> {
    return mushroomIconStyle(color);
  }

  private dayKey(dayIndex: number): string {
    return WEEKDAYS[dayIndex] ?? "monday";
  }

  private blocksForDay(dayIndex: number): ScheduleBlock[] {
    if (!this._scheduleData) return [];
    const key = this.dayKey(dayIndex);
    const blocks = this._scheduleData[key];
    return Array.isArray(blocks) ? blocks as ScheduleBlock[] : [];
  }

  private timeToMinutes(timeStr: string): number {
    const parts = timeStr.split(":");
    const h = parseInt(parts[0] ?? "0", 10);
    const m = parseInt(parts[1] ?? "0", 10);
    return h * 60 + m;
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
    // Check switch_entity first, then fall back to schedule entity state
    if (this._config?.switch_entity) {
      const sw = getEntity(this.hass, this._config.switch_entity);
      return sw?.state === "on";
    }
    const schedule = getEntity(this.hass, this._config?.schedule_entity);
    return schedule?.state === "on";
  }

  private modeValue(): string {
    if (!this._config?.mode_entity) return "Auto";
    const entity = getEntity(this.hass, this._config.mode_entity);
    return entity?.state ?? "Auto";
  }


  // --- Event handlers ---

  private handleCardTap = (event: Event): void => {
    // Only trigger if tapping the card itself (not buttons/timeline)
    const target = event.target as HTMLElement;
    if (target.closest(".mode-btn") || target.closest(".timeline-track") || target.closest(".day-btn")) return;
    if (this.isEditorPreview() || !this._config?.mode_entity) return;
    void this.handleModeChange(event);
  };

  private handleDaySelect = (event: Event): void => {
    const target = event.currentTarget;
    if (!(target instanceof HTMLElement)) return;
    const day = parseInt(target.dataset.day ?? "0", 10);
    this._selectedDay = day;
  };

  private handleModeChange = async (event: Event): Promise<void> => {
    event.stopPropagation();
    if (this.isEditorPreview() || !this._config?.mode_entity) return;

    const entity = getEntity(this.hass, this._config.mode_entity);
    if (!entity) return;
    const options = (entity.attributes?.options as string[]) ?? [];
    if (options.length === 0) return;

    const current = options.indexOf(entity.state);
    const next = (current + 1) % options.length;
    const nextOption = options[next];
    const domain = this._config.mode_entity.split(".")[0];
    await this.hass.callService(domain, "select_option", {
      entity_id: this._config.mode_entity,
      option: nextOption
    });

    // When switching to On/Off, also toggle the switch entity directly
    if (this._config.switch_entity) {
      const switchDomain = this._config.switch_entity.split(".")[0];
      const normalized = nextOption.toLowerCase();
      if (normalized === "on") {
        await this.hass.callService(switchDomain, "turn_on", {
          entity_id: this._config.switch_entity
        });
      } else if (normalized === "off") {
        await this.hass.callService(switchDomain, "turn_off", {
          entity_id: this._config.switch_entity
        });
      }
    }
  };

  private handleTimelineTap = async (event: MouseEvent): Promise<void> => {
    event.stopPropagation();
    if (this.isEditorPreview() || !this._scheduleData || !this._config?.schedule_entity) return;

    const track = (event.currentTarget as HTMLElement);
    const rect = track.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const pct = x / rect.width;

    const { start, end } = this.resolvedTimeWindow();
    const range = end - start;
    const tappedMinute = Math.round(start + pct * range);

    // Snap to 30min grid
    const snapped = Math.round(tappedMinute / 30) * 30;
    const dayKey = this.dayKey(this._selectedDay);
    const blocks = [...this.blocksForDay(this._selectedDay)];

    // Check if tap is inside an existing block
    const hitIndex = blocks.findIndex((b) => {
      const from = this.timeToMinutes(b.from);
      const to = this.timeToMinutes(b.to);
      return snapped >= from && snapped < to;
    });

    const objectId = this._config.schedule_entity.split(".")[1];

    if (hitIndex >= 0) {
      // Remove block
      blocks.splice(hitIndex, 1);
    } else {
      // Add 1-hour block centered on tap
      const blockStart = Math.max(0, snapped - 30);
      const blockEnd = Math.min(1440, snapped + 30);
      const fromStr = `${String(Math.floor(blockStart / 60)).padStart(2, "0")}:${String(blockStart % 60).padStart(2, "0")}:00`;
      const toStr = blockEnd >= 1440
        ? "24:00:00"
        : `${String(Math.floor(blockEnd / 60)).padStart(2, "0")}:${String(blockEnd % 60).padStart(2, "0")}:00`;

      // Check for overlap and skip if would conflict
      const conflicts = blocks.some((b) => {
        const bFrom = this.timeToMinutes(b.from);
        const bTo = this.timeToMinutes(b.to);
        return blockStart < bTo && blockEnd > bFrom;
      });
      if (!conflicts) {
        blocks.push({ from: fromStr, to: toStr });
        blocks.sort((a, b) => this.timeToMinutes(a.from) - this.timeToMinutes(b.from));
      }
    }

    try {
      if (!this.hass.callWS) return;
      await this.hass.callWS({
        type: "schedule/update",
        schedule_id: objectId,
        [dayKey]: blocks
      });
      await this.fetchSchedule();
    } catch {
      // Ignore errors silently
    }
  };

  // --- Render ---

  private renderTimeline(): TemplateResult {
    const config = this._config!;
    const { start, end } = this.resolvedTimeWindow();
    const range = end - start;
    const blocks = this.blocksForDay(this._selectedDay);
    const activeColor = this.resolvedActiveColor();
    const activeAlpha = this.resolvedActiveColorAlpha(0.3);
    const nowMin = this.nowMinutes();
    const isToday = this._selectedDay === new Date().getDay();
    const showNow = config.show_now_indicator !== false && isToday && nowMin >= start && nowMin <= end;
    const showLabels = config.show_time_labels !== false;

    // Generate hour labels
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
        <div class="timeline-track" @click=${this.handleTimelineTap}>
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
        ${WEEKDAYS.map((_, idx) => html`
          <button
            type="button"
            class="day-btn ${idx === this._selectedDay ? "active" : ""} ${idx === today ? "today" : ""}"
            data-day=${idx}
            @click=${this.handleDaySelect}
          >
            ${WEEKDAY_LABELS_SHORT[idx]}
          </button>
        `)}
      </div>
    `;
  }

  private renderModeButton(): TemplateResult {
    const mode = this.modeValue();
    const modeIcon = mode === "On" ? "mdi:power" : mode === "Off" ? "mdi:power-off" : "mdi:clock-outline";
    const modeLabel = mode.toLowerCase() === "auto" ? "Timer" : mode;

    return html`
      <button type="button" class="mode-btn" @click=${this.handleModeChange} title="Mode: ${mode}">
        <ha-icon .icon=${modeIcon}></ha-icon>
        <span class="mode-label">${modeLabel}</span>
      </button>
    `;
  }

  protected render(): TemplateResult {
    if (!this._config) return html`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass) return html``;

    const config = this._config;
    const friendlyName = getEntity(this.hass, config.schedule_entity)?.attributes?.friendly_name;
    const mode = this.modeValue();
    const subtitle = config.subtitle || (mode.toLowerCase() === "auto" ? "Timer" : mode);
    const showDays = config.show_day_selector !== false;
    const showMode = config.show_mode_control !== false && Boolean(config.mode_entity);
    const isVertical = config.card_layout === "vertical";

    // Icon color: show configured color when device is on, grey when off
    const isDeviceOn = this.isDeviceOn();
    const iconStyle = isDeviceOn
      ? this.iconStyle(config.icon_color)
      : this.iconStyle("disabled");

    return html`
      <ha-card @click=${this.handleCardTap}
        <div class="container ${isVertical ? "vertical" : "horizontal"}">
          <div class="header">
            <div class="state-item">
              <div class="icon-wrap">
                <div class="icon-shape" style=${styleMap(iconStyle)}>
                  <ha-icon .icon=${config.icon ?? "mdi:clock-outline"}></ha-icon>
                </div>
              </div>
              <div class="info">
                <div class="primary">${config.name || friendlyName || "Schedule"}</div>
                <div class="secondary">${subtitle}</div>
              </div>
              ${showMode ? this.renderModeButton() : nothing}
            </div>
          </div>
          <div class="body">
            ${showDays ? this.renderDaySelector() : nothing}
            ${this.renderTimeline()}
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
    }

    .container.vertical {
      justify-content: space-between;
    }

    .container.horizontal {
      justify-content: center;
    }

    /* --- Header --- */

    .header {
      flex: none;
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

    /* --- Body --- */

    .body {
      padding: 0 var(--control-spacing) var(--control-spacing);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* --- Day selector --- */

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

    /* --- Timeline --- */

    .timeline-container {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .time-labels {
      position: relative;
      height: 14px;
      font-size: 10px;
      color: var(--secondary-text-color);
      user-select: none;
    }

    .time-label {
      position: absolute;
      transform: translateX(-50%);
      white-space: nowrap;
    }

    .timeline-track {
      position: relative;
      height: var(--control-height);
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

    /* --- Mode button (header, matches wallbox play button size) --- */

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
