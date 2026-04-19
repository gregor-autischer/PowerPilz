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

interface PowerPilzScheduleCardConfig extends LovelaceCardConfig {
  type: "custom:power-pilz-schedule-card";
  // Companion mode (default on): point at a single PowerPilz Smart Schedule
  // helper (a `select.*` entity). The card derives the schedule, device and
  // mode entities from its attributes (`linked_schedule`, `target_entity`,
  // and the companion entity itself as the mode selector).
  use_companion?: boolean;
  companion_entity?: string;
  // Manual mode (use_companion: false): configure the three entities
  // individually as in older versions of the card.
  schedule_entity?: string;
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

    // Prefer a PowerPilz Companion Smart Schedule select entity: its
    // `linked_schedule` / `target_entity` attributes tell us it's one of
    // ours, and we can default to companion mode with just that one entity.
    const companion = entityIds.find((id) => {
      if (!id.startsWith("select.")) return false;
      const attrs = states[id]?.attributes as Record<string, unknown> | undefined;
      return typeof attrs?.linked_schedule === "string"
        && typeof attrs?.target_entity === "string";
    });

    if (companion) {
      return {
        type: "custom:power-pilz-schedule-card",
        use_companion: true,
        companion_entity: companion
      };
    }

    // Fallback: manual 3-entity mode.
    const firstByDomain = (domain: string): string | undefined =>
      entityIds.find((id) => id.startsWith(`${domain}.`));
    return {
      type: "custom:power-pilz-schedule-card",
      use_companion: false,
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
    // Default resolution:
    //   - Explicit `use_companion` in config → honor it
    //   - Otherwise: legacy cards with `schedule_entity` set default to
    //     manual mode so they don't break on load. Fresh cards default
    //     to companion mode.
    const useCompanion = config.use_companion !== undefined
      ? config.use_companion !== false
      : !config.schedule_entity;

    // Don't throw for missing entity — the card renders a soft
    // "please configure an entity" placeholder instead. Throwing here
    // makes HA's editor flash a red error banner while the user is
    // still filling in the form, which is too aggressive.
    this._config = {
      ...config,
      use_companion: useCompanion,
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
  // In companion mode the card takes its three entity IDs from the
  // attributes of the configured Smart Schedule `select.*` entity. In
  // manual mode they come directly from config. Always go through these
  // getters to stay mode-agnostic.

  private get _scheduleEntityId(): string | undefined {
    if (!this._config) return undefined;
    if (this._config.use_companion === false) {
      return this._config.schedule_entity;
    }
    const companion = this.hass?.states?.[this._config.companion_entity ?? ""];
    const linked = companion?.attributes?.linked_schedule;
    return typeof linked === "string" ? linked : undefined;
  }

  private get _switchEntityId(): string | undefined {
    if (!this._config) return undefined;
    if (this._config.use_companion === false) {
      return this._config.switch_entity;
    }
    const companion = this.hass?.states?.[this._config.companion_entity ?? ""];
    const target = companion?.attributes?.target_entity;
    return typeof target === "string" ? target : undefined;
  }

  private get _modeEntityId(): string | undefined {
    if (!this._config) return undefined;
    if (this._config.use_companion === false) {
      return this._config.mode_entity;
    }
    return this._config.companion_entity;
  }

  public getCardSize(): number {
    // 3 rows when day selector visible (header + days + timeline),
    // 2 rows otherwise (header + timeline).
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
    if (!changedProps.has("hass")) return;
    const entity = this._scheduleEntityId;
    if (!entity) return;

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
    const entity = this._scheduleEntityId;
    if (!this.hass?.callWS || !entity) return;
    try {
      const schedules: ScheduleData[] = await this.hass.callWS({ type: "schedule/list" });
      const objectId = entity.split(".")[1];
      // Match on the HA storage id (object_id of the slug). `schedule/list`
      // returns items with id keyed by their uuid, so also match by slug
      // via the `schedule.<slug>` entity_id stored in hass.states.
      this._scheduleData = schedules.find((s) => s.id === objectId)
        ?? schedules.find((s) => {
          const stateEntity = this.hass?.states?.[entity];
          const friendly = stateEntity?.attributes?.friendly_name;
          return typeof friendly === "string" && s.name === friendly;
        });
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
    const mode = this.modeValue().toLowerCase();

    // Manual override takes precedence
    if (mode === "on") return true;
    if (mode === "off") return false;

    // Auto mode: compute directly from the loaded schedule blocks for today
    // (same data source as the timeline, so it always matches visually)
    const todayIdx = new Date().getDay();
    const todaysBlocks = this.blocksForDay(todayIdx);
    const nowMin = this.nowMinutes();
    const inBlock = todaysBlocks.some((b) => {
      const from = this.timeToMinutes(b.from);
      const to = this.timeToMinutes(b.to);
      return nowMin >= from && nowMin < to;
    });
    if (inBlock) return true;

    // Secondary: schedule entity state (if the integration populated it)
    const schedule = getEntity(this.hass, this._scheduleEntityId);
    if (schedule?.state === "on") return true;

    // Fallback: switch entity state
    const switchId = this._switchEntityId;
    if (switchId) {
      const sw = getEntity(this.hass, switchId);
      return sw?.state === "on";
    }
    return false;
  }

  private modeValue(): string {
    const modeId = this._modeEntityId;
    if (!modeId) return "Auto";
    const entity = getEntity(this.hass, modeId);
    return entity?.state ?? "Auto";
  }

  private modeLabel(mode: string): string {
    const lang = haLang(this.hass);
    const normalized = mode.toLowerCase();
    if (normalized === "auto") return tr(lang, "schedule.timer_label");
    if (normalized === "on") return tr(lang, "common.on");
    if (normalized === "off") return tr(lang, "common.off");
    return mode;
  }


  // --- Event handlers ---

  private handleCardTap = (event: Event): void => {
    // Only trigger if tapping the card itself (not buttons/timeline)
    const target = event.target as HTMLElement;
    if (target.closest(".mode-btn") || target.closest(".timeline-track") || target.closest(".day-btn")) return;
    if (this.isEditorPreview() || !this._modeEntityId) return;
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

    // In manual mode, also poke the switch so On/Off reflects immediately.
    // In companion mode the integration's select entity already drives
    // the target device — no direct toggle needed.
    if (this._config?.use_companion === false) {
      const switchId = this._switchEntityId;
      if (switchId) {
        const switchDomain = switchId.split(".")[0];
        const normalized = nextOption.toLowerCase();
        if (normalized === "on") {
          await this.hass.callService(switchDomain, "turn_on", {
            entity_id: switchId
          });
        } else if (normalized === "off") {
          await this.hass.callService(switchDomain, "turn_off", {
            entity_id: switchId
          });
        }
      }
    }
  };

  private handleTimelineTap = async (event: MouseEvent): Promise<void> => {
    event.stopPropagation();
    if (this.isEditorPreview() || !this._scheduleData || !this._scheduleEntityId) return;

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

    const scheduleId = this._scheduleEntityId;
    if (!scheduleId) return;
    const objectId = scheduleId.split(".")[1];

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
            ${weekdayShort(haLang(this.hass), idx)}
          </button>
        `)}
      </div>
    `;
  }

  private renderModeButton(): TemplateResult {
    const mode = this.modeValue();
    const modeIcon = mode === "On" ? "mdi:power" : mode === "Off" ? "mdi:power-off" : "mdi:clock-outline";
    const modeLabel = this.modeLabel(mode);

    return html`
      <button type="button" class="mode-btn" @click=${this.handleModeChange} title="Mode: ${mode}">
        <ha-icon .icon=${modeIcon}></ha-icon>
        <span class="mode-label">${modeLabel}</span>
      </button>
    `;
  }

  protected render(): TemplateResult {
    if (!this._config) return html`<ha-card>${tr(haLang(this.hass), "common.invalid_config")}</ha-card>`;
    if (!this.hass) return html``;

    // Soft placeholder when no entity is configured yet — happens while the
    // user is still filling in the visual editor. We don't throw in
    // setConfig (that would flash a red "Konfigurationsfehler" banner),
    // we render a neutral hint here instead.
    if (!this._scheduleEntityId && !this._modeEntityId) {
      const lang = haLang(this.hass);
      const hint = this._config.use_companion !== false
        ? tr(lang, "schedule.placeholder_companion")
        : tr(lang, "schedule.placeholder_manual");
      return html`
        <ha-card>
          <div class="placeholder">
            <ha-icon icon="mdi:clock-outline"></ha-icon>
            <div class="placeholder-text">${hint}</div>
          </div>
        </ha-card>
      `;
    }

    const config = this._config;
    const friendlyName = getEntity(this.hass, this._scheduleEntityId)?.attributes?.friendly_name
      ?? getEntity(this.hass, this._modeEntityId)?.attributes?.friendly_name;
    const mode = this.modeValue();
    const subtitle = config.subtitle || this.modeLabel(mode);
    const showDays = config.show_day_selector !== false;
    const showMode = config.show_mode_control !== false && Boolean(this._modeEntityId);
    const isVertical = config.card_layout === "vertical";

    // Icon color: show configured color when device is on, grey when off
    const isDeviceOn = this.isDeviceOn();
    const iconStyle = isDeviceOn
      ? this.iconStyle(config.icon_color)
      : this.iconStyle("disabled");

    // In vertical mode render three sibling rows so each takes an equal
     // share of the card height (= each row matches a single-row
     // Mushroom card next to it when the card is 3 grid-rows tall).
     // In horizontal mode keep the legacy header/body structure.
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

    // Always render the 3-row structure. Each row gets an equal flex
    // share of the card height, so header / day-selector / timeline each
    // align visually with a single-row Mushroom card placed next to a
    // same-height neighbour — regardless of `card_layout`.
    return html`
      <ha-card @click=${this.handleCardTap}>
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
    }

    /* Three sibling rows share the card height equally, so each row
       looks like a single-row Mushroom card placed next to a same-
       height card. The row count is 2 when the day selector is hidden
       (header + timeline), otherwise 3.

       Applies to BOTH horizontal and vertical card_layout settings —
       the user-visible difference between those is now limited to
       minor details (they used to control spread-vs-center stacking,
       which the equal-rows layout replaces). */
    .container {
      justify-content: stretch;
    }

    .container > .row {
      flex: 1 1 0;
      min-height: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    /* Day-selector and timeline rows get only the horizontal padding
       the legacy body wrapper used to provide. NO vertical padding —
       that would shift the row's content off-center from the header's
       icon position. Each row must be symmetrically centerable. */
    .container > .row-days,
    .container > .row-timeline {
      padding-left: var(--control-spacing);
      padding-right: var(--control-spacing);
    }

    /* --- Header --- */

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

    /* --- Timeline ---
       The track is the visual reference point: it sits vertically
       centered inside the timeline row and always at the same position,
       whether hour labels are shown or not. Labels float above the
       track via absolute positioning so toggling them doesn't shift
       the track vertically. */

    .timeline-container {
      position: relative;
    }

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
      /* Match the icon circle height so the timeline lines up with a
         single-row card's icon when placed side-by-side. */
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
