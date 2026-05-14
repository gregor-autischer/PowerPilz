import { LitElement, css, html, nothing, svg, type TemplateResult } from "lit";
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
import { buildSmoothPath, sampleSmoothCurve, type CurvePoint } from "../utils/curve-spline";
import { openHeatingCurveEditDialog } from "./dialogs/heating-curve-edit-dialog";
import "./editors/heating-curve-card-editor";

interface ActionConfig {
  action?: string;
  [key: string]: unknown;
}

const ACTION_CURVE_EDIT = "powerpilz-heating-curve-edit";

interface CurveStoredPoint {
  time: string; // "HH:MM:SS"
  value: number;
}

type WeekPoints = Record<string, CurveStoredPoint[]>;

const WEEKDAY_KEYS_BY_DAY_INDEX: readonly string[] = [
  "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
];

interface PowerPilzHeatingCurveCardConfig extends LovelaceCardConfig {
  type: "custom:power-pilz-heating-curve-card";
  entity?: string;
  name?: string;
  subtitle?: string;
  icon?: string;
  icon_color?: ColorValue;
  active_color?: ColorValue;
  show_day_selector?: boolean;
  show_mode_control?: boolean;
  show_now_indicator?: boolean;
  show_value_labels?: boolean;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  long_press_opens_editor?: boolean;
}

export class PowerPilzHeatingCurveCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement("power-pilz-heating-curve-card-editor") as LovelaceCardEditor;
  }

  public static async getStubConfig(hass?: HomeAssistant): Promise<PowerPilzHeatingCurveCardConfig> {
    const states = hass?.states ?? {};
    const entity = Object.keys(states).find((id) => {
      if (!id.startsWith("select.")) return false;
      const attrs = states[id]?.attributes as Record<string, unknown> | undefined;
      return !!attrs?.mode_names && attrs?.week_points !== undefined;
    });
    return {
      type: "custom:power-pilz-heating-curve-card",
      entity: entity ?? ""
    };
  }

  @property({ attribute: false })
  public hass!: HomeAssistant;

  @property({ type: Boolean })
  public preview = false;

  @property({ type: Boolean })
  public editMode = false;

  @state() private _config?: PowerPilzHeatingCurveCardConfig;
  @state() private _selectedDay: number = new Date().getDay();
  @state() private _tick = 0;

  private _tickTimer?: number;
  private _actionCleanup?: ActionHandlerCleanup;

  public setConfig(config: PowerPilzHeatingCurveCardConfig): void {
    this._config = {
      ...config,
      icon: config.icon ?? "mdi:chart-bell-curve-cumulative",
      name: config.name ?? tr(haLang(this.hass), "heating_curve.default_name"),
      show_day_selector: config.show_day_selector ?? true,
      show_mode_control: config.show_mode_control ?? true,
      show_now_indicator: config.show_now_indicator ?? true,
      show_value_labels: config.show_value_labels ?? true
    };
  }

  private get _entityId(): string | undefined {
    return this._config?.entity || undefined;
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

    if (kind === "tap" && (!actionConfig || !actionConfig.action)) {
      if (this._entityId) {
        void this.handleModeChange(new Event("tap"));
      }
      return;
    }

    if (kind === "hold" && (!actionConfig || !actionConfig.action)) {
      if (this._config.long_press_opens_editor !== false) {
        actionConfig = { action: ACTION_CURVE_EDIT };
      }
    }

    if (!actionConfig || !actionConfig.action || actionConfig.action === "none") return;

    if (actionConfig.action === ACTION_CURVE_EDIT) {
      this._openEdit();
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

  private _openEdit(): void {
    const entity = this._entityId;
    if (!entity || !this.hass) return;
    openHeatingCurveEditDialog({ hass: this.hass, curveEntityId: entity });
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

  private _entityAttrs(): Record<string, unknown> | undefined {
    const id = this._entityId;
    if (!id) return undefined;
    return this.hass?.states?.[id]?.attributes as Record<string, unknown> | undefined;
  }

  private _weekPoints(): WeekPoints {
    const attrs = this._entityAttrs();
    const wp = attrs?.week_points;
    if (wp && typeof wp === "object" && !Array.isArray(wp)) {
      return wp as WeekPoints;
    }
    return {};
  }

  private _sameForAll(): boolean {
    return this._entityAttrs()?.same_for_all_days === true;
  }

  private _valueRange(): { min: number; max: number } {
    const attrs = this._entityAttrs();
    const min = Number(attrs?.value_min);
    const max = Number(attrs?.value_max);
    return {
      min: Number.isFinite(min) ? min : 5,
      max: Number.isFinite(max) ? max : 30
    };
  }

  private _unit(): string {
    const u = this._entityAttrs()?.unit;
    return typeof u === "string" ? u : "°C";
  }

  private _dayKey(idx: number): string {
    if (this._sameForAll()) return "monday";
    return WEEKDAY_KEYS_BY_DAY_INDEX[idx] ?? "monday";
  }

  private _pointsForDay(idx: number): CurvePoint[] {
    const wp = this._weekPoints();
    const list = wp[this._dayKey(idx)];
    if (!Array.isArray(list)) return [];
    return list
      .map((p) => ({
        x: this._timeToMin(String(p.time ?? "00:00:00")),
        y: typeof p.value === "number" ? p.value : Number(p.value)
      }))
      .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y))
      .sort((a, b) => a.x - b.x);
  }

  private _timeToMin(timeStr: string): number {
    const parts = timeStr.split(":");
    const h = parseInt(parts[0] ?? "0", 10);
    const m = parseInt(parts[1] ?? "0", 10);
    return (isNaN(h) ? 0 : h) * 60 + (isNaN(m) ? 0 : m);
  }

  private _nowMin(): number {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }

  private _resolvedActiveColor(): string {
    const rgb = toRgbCss(this._config?.active_color);
    if (rgb) return `rgb(${rgb})`;
    return "var(--primary-color, rgb(3, 169, 244))";
  }

  private _modeValue(): string {
    const id = this._entityId;
    if (!id) return "auto";
    const entity = getEntity(this.hass, id);
    const state = entity?.state ?? "auto";
    const modeNames = entity?.attributes?.mode_names;
    if (modeNames && typeof modeNames === "object") {
      for (const [key, disp] of Object.entries(modeNames as Record<string, unknown>)) {
        if (typeof disp === "string" && disp === state) return key;
      }
    }
    return state;
  }

  private _modeLabel(mode: string): string {
    const id = this._entityId;
    if (id) {
      const entity = getEntity(this.hass, id);
      const modeNames = entity?.attributes?.mode_names;
      if (modeNames && typeof modeNames === "object") {
        const display = (modeNames as Record<string, unknown>)[mode.toLowerCase()];
        if (typeof display === "string" && display) return display;
      }
    }
    return mode;
  }

  private _isDeviceOn(): boolean {
    const mode = this._modeValue().toLowerCase();
    return mode !== "off";
  }

  private _currentValue(): number | null {
    const attrs = this._entityAttrs();
    const v = attrs?.current_value;
    return typeof v === "number" ? v : null;
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
    const id = this._entityId;
    if (this.isEditorPreview() || !id) return;

    const entity = getEntity(this.hass, id);
    if (!entity) return;
    const options = (entity.attributes?.options as string[]) ?? [];
    if (options.length === 0) return;

    const current = options.indexOf(entity.state);
    const next = (current + 1) % options.length;
    const domain = id.split(".")[0];
    await this.hass.callService(domain, "select_option", {
      entity_id: id,
      option: options[next]
    });
  };

  // --- Render ---

  private renderCurvePreview(): TemplateResult {
    const config = this._config!;
    void this._tick;
    const rawPoints = this._pointsForDay(this._sameForAll() ? 1 : this._selectedDay);
    const { min: vMin, max: vMax } = this._valueRange();
    const activeColor = this._resolvedActiveColor();
    const isToday = this._sameForAll() || this._selectedDay === new Date().getDay();
    const showNow = config.show_now_indicator !== false && isToday;
    const nowMin = this._nowMin();

    // Extend the curve to span 0–24h: before the first point and after
    // the last point the value is held constant (matches backend
    // semantics in curve.py).
    const points: CurvePoint[] = [];
    if (rawPoints.length > 0) {
      if (rawPoints[0].x > 0) points.push({ x: 0, y: rawPoints[0].y });
      points.push(...rawPoints);
      const last = rawPoints[rawPoints.length - 1];
      if (last.x < 1440) points.push({ x: 1440, y: last.y });
    }

    const W = 1000;
    const H = 80;
    const range = Math.max(0.0001, vMax - vMin);
    const toScreen = (p: CurvePoint) => ({
      x: (p.x / 1440) * W,
      y: (1 - (p.y - vMin) / range) * H
    });

    const pathD = buildSmoothPath(points, toScreen);
    const fillD = points.length >= 2
      ? `${pathD} L ${W} ${H} L 0 ${H} Z`
      : "";

    return html`
      <div class="curve-container">
        <svg
          viewBox="0 0 ${W} ${H}"
          preserveAspectRatio="none"
          class="curve-svg"
        >
          ${points.length >= 2 && fillD ? svg`
            <path d=${fillD} fill=${activeColor} fill-opacity="0.18" />
          ` : nothing}
          ${pathD ? svg`
            <path d=${pathD}
              fill="none"
              stroke=${activeColor}
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              vector-effect="non-scaling-stroke"
            />
          ` : nothing}
          ${showNow ? svg`
            <line
              x1=${(nowMin / 1440) * W}
              x2=${(nowMin / 1440) * W}
              y1="0" y2=${H}
              stroke=${activeColor}
              stroke-width="1.5"
              stroke-dasharray="3 3"
              vector-effect="non-scaling-stroke"
            />
          ` : nothing}
        </svg>
      </div>
    `;
  }

  private renderDaySelector(): TemplateResult | typeof nothing {
    if (this._sameForAll()) return nothing;
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
    const mode = this._modeValue();
    const norm = mode.toLowerCase();
    const modeIcon = norm === "on" ? "mdi:fire" : norm === "off" ? "mdi:power-off" : "mdi:chart-bell-curve-cumulative";
    return html`
      <button type="button" class="mode-btn" @click=${this.handleModeChange} title="Mode: ${mode}">
        <ha-icon .icon=${modeIcon}></ha-icon>
        <span class="mode-label">${this._modeLabel(mode)}</span>
      </button>
    `;
  }

  /** Demo card for the dashboard card-picker preview (preview=true,
   *  no entity yet). Renders a typical day-curve so users see what
   *  the card actually does. */
  private _renderDemo(): TemplateResult {
    const config = this._config!;
    const lang = haLang(this.hass);
    const activeColor = this._resolvedActiveColor();
    const showDays = config.show_day_selector !== false;
    const showMode = config.show_mode_control !== false;
    const today = new Date().getDay();

    // Demo curve: night low → morning peak → noon dip → evening peak.
    const demoPoints: CurvePoint[] = [
      { x: 0, y: 17 },
      { x: 6 * 60, y: 19 },
      { x: 8 * 60, y: 21.5 },
      { x: 12 * 60, y: 20 },
      { x: 17 * 60, y: 21 },
      { x: 22 * 60, y: 18.5 },
      { x: 1440, y: 17 },
    ];

    const W = 1000;
    const H = 80;
    const vMin = 15;
    const vMax = 23;
    const range = vMax - vMin;
    const toScreen = (p: CurvePoint) => ({
      x: (p.x / 1440) * W,
      y: (1 - (p.y - vMin) / range) * H,
    });
    const pathD = buildSmoothPath(demoPoints, toScreen);
    const fillD = `${pathD} L ${W} ${H} L 0 ${H} Z`;
    const nowMin = this._nowMin();
    const showNow = config.show_now_indicator !== false;

    return html`
      <ha-card>
        <div class="container">
          <div class="row row-header">
            <div class="state-item">
              <div class="icon-wrap">
                <div class="icon-shape" style=${styleMap(this.iconStyle(config.icon_color))}>
                  <ha-icon .icon=${config.icon ?? "mdi:chart-bell-curve-cumulative"}></ha-icon>
                </div>
              </div>
              <div class="info">
                <div class="primary">${config.name || tr(lang, "heating_curve.default_name")}</div>
                <div class="secondary">${config.subtitle || "21.0 °C · Auto"}</div>
              </div>
              ${showMode ? html`
                <button type="button" class="mode-btn" disabled>
                  <ha-icon icon="mdi:clock-outline"></ha-icon>
                  <span class="mode-label">Auto</span>
                </button>
              ` : nothing}
            </div>
          </div>
          ${showDays ? html`
            <div class="row row-days">
              <div class="day-selector">
                ${[0, 1, 2, 3, 4, 5, 6].map((idx) => html`
                  <button type="button" class="day-btn ${idx === today ? "active today" : ""}" disabled>
                    ${weekdayShort(lang, idx)}
                  </button>
                `)}
              </div>
            </div>
          ` : nothing}
          <div class="row row-curve">
            <div class="curve-container">
              <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" class="curve-svg">
                <path d=${fillD} fill=${activeColor} fill-opacity="0.18" />
                <path d=${pathD}
                  fill="none"
                  stroke=${activeColor}
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  vector-effect="non-scaling-stroke"
                />
                ${showNow ? svg`
                  <line
                    x1=${(nowMin / 1440) * W}
                    x2=${(nowMin / 1440) * W}
                    y1="0" y2=${H}
                    stroke=${activeColor}
                    stroke-width="1.5"
                    stroke-dasharray="3 3"
                    vector-effect="non-scaling-stroke"
                  />
                ` : nothing}
              </svg>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  protected render(): TemplateResult {
    if (!this._config) return html`<ha-card>${tr(haLang(this.hass), "common.invalid_config")}</ha-card>`;
    if (!this.hass) return html``;

    if (!this._entityId) {
      if (this.preview) return this._renderDemo();
      const lang = haLang(this.hass);
      return html`
        <ha-card>
          <div class="placeholder">
            <ha-icon icon="mdi:chart-bell-curve-cumulative"></ha-icon>
            <div class="placeholder-text">${tr(lang, "heating_curve.placeholder")}</div>
          </div>
        </ha-card>
      `;
    }

    const config = this._config;
    const friendlyName = getEntity(this.hass, this._entityId)?.attributes?.friendly_name;
    const mode = this._modeValue();
    const currentValue = this._currentValue();
    const unit = this._unit();
    const subtitle = config.subtitle
      || (currentValue !== null
        ? `${currentValue.toFixed(1)} ${unit} · ${this._modeLabel(mode)}`
        : this._modeLabel(mode));
    const showDays = config.show_day_selector !== false;
    const showMode = config.show_mode_control !== false;

    const isOn = this._isDeviceOn();
    const iconStyle = isOn
      ? this.iconStyle(config.icon_color)
      : this.iconStyle("disabled");

    return html`
      <ha-card>
        <div class="container">
          <div class="row row-header">
            <div class="state-item">
              <div class="icon-wrap">
                <div class="icon-shape" style=${styleMap(iconStyle)}>
                  <ha-icon .icon=${config.icon ?? "mdi:chart-bell-curve-cumulative"}></ha-icon>
                </div>
              </div>
              <div class="info">
                <div class="primary">${config.name || friendlyName || tr(haLang(this.hass), "heating_curve.default_name")}</div>
                <div class="secondary">${subtitle}</div>
              </div>
              ${showMode ? this.renderModeButton() : nothing}
            </div>
          </div>
          ${showDays ? html`<div class="row row-days">${this.renderDaySelector()}</div>` : nothing}
          <div class="row row-curve">${this.renderCurvePreview()}</div>
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
    .placeholder ha-icon { --mdc-icon-size: 28px; opacity: 0.6; flex: none; }
    .placeholder-text { font-size: 13px; line-height: 1.4; }

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
    .container > .row { flex: 1 1 0; min-height: 0; display: flex; flex-direction: column; justify-content: center; }
    .container > .row-days, .container > .row-curve {
      padding-left: var(--control-spacing);
      padding-right: var(--control-spacing);
    }

    .state-item { display: flex; align-items: center; gap: var(--spacing); padding: var(--spacing); min-width: 0; }
    .icon-wrap { position: relative; flex: none; }
    .icon-shape {
      width: var(--icon-size); height: var(--icon-size); font-size: var(--icon-size);
      border-radius: var(--icon-border-radius);
      display: flex; align-items: center; justify-content: center;
      background-color: var(--shape-color);
      transition: background-color 280ms ease-out;
    }
    .icon-shape ha-icon { --mdc-icon-size: var(--icon-symbol-size); color: var(--icon-color); display: flex; line-height: 0; }

    .info { min-width: 0; flex: 1; display: flex; flex-direction: column; }
    .primary {
      font-weight: var(--card-primary-font-weight);
      font-size: var(--card-primary-font-size);
      line-height: var(--card-primary-line-height);
      color: var(--primary-text-color);
      text-overflow: ellipsis; overflow: hidden; white-space: nowrap;
    }
    .secondary {
      font-weight: var(--card-secondary-font-weight);
      font-size: var(--card-secondary-font-size);
      line-height: var(--card-secondary-line-height);
      color: var(--secondary-text-color);
      text-overflow: ellipsis; overflow: hidden; white-space: nowrap;
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
      display: flex; align-items: center; justify-content: center;
      border: none; background: none; padding: 4px 0; margin: 0;
      cursor: pointer;
      font-family: var(--paper-font-body1_-_font-family, inherit);
      font-size: 11px; font-weight: 500;
      color: var(--secondary-text-color);
      transition: background-color 0.2s, color 0.2s;
      -webkit-tap-highlight-color: transparent;
      border-radius: 6px;
    }
    .day-btn.today { font-weight: 700; color: var(--primary-text-color); }
    .day-btn.active {
      background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08);
      color: var(--primary-text-color);
    }

    .curve-container { position: relative; }
    .curve-svg {
      width: 100%;
      height: var(--icon-size);
      border-radius: var(--control-border-radius);
      background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
      display: block;
    }

    .mode-btn {
      display: flex; align-items: center; justify-content: center;
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
    .mode-btn ha-icon { --mdc-icon-size: 18px; display: flex; line-height: 0; flex: none; }
    .mode-label { min-width: 28px; text-align: center; }
  `;
}

if (!customElements.get("power-pilz-heating-curve-card")) {
  customElements.define("power-pilz-heating-curve-card", PowerPilzHeatingCurveCard);
}

declare global {
  interface HTMLElementTagNameMap {
    "power-pilz-heating-curve-card": PowerPilzHeatingCurveCard;
  }
}

// Suppress unused warning — sampleSmoothCurve is exported for the dialog.
void sampleSmoothCurve;
