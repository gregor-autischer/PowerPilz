import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  LovelaceCardEditor,
  LovelaceGridOptions,
  LovelaceLayoutOptions
} from "../types";
import { readNumber, readUnit } from "../utils/entity";
import "./editors/graph-stack-card-editor";

const DEFAULT_DECIMALS = 1;
const DEFAULT_TIMEFRAME_HOURS = 24;
const TREND_REFRESH_MS = 5 * 60 * 1000;
const EPSILON = 0.01;
const GRAPH_SLOT_COUNT = 4;
const DEFAULT_TREND_COLOR = "rgb(var(--rgb-primary-text-color, 33, 33, 33))";
const COLOR_RGB_FALLBACK: Record<string, string> = {
  red: "244, 67, 54",
  pink: "233, 30, 99",
  purple: "156, 39, 176",
  "deep-purple": "103, 58, 183",
  indigo: "63, 81, 181",
  blue: "33, 150, 243",
  "light-blue": "3, 169, 244",
  cyan: "0, 188, 212",
  teal: "0, 150, 136",
  green: "76, 175, 80",
  "light-green": "139, 195, 74",
  lime: "205, 220, 57",
  yellow: "255, 235, 59",
  amber: "255, 193, 7",
  orange: "255, 152, 0",
  "deep-orange": "255, 87, 34",
  brown: "121, 85, 72",
  "light-grey": "189, 189, 189",
  grey: "158, 158, 158",
  "dark-grey": "97, 97, 97",
  "blue-grey": "96, 125, 139",
  black: "0, 0, 0",
  white: "255, 255, 255",
  disabled: "189, 189, 189"
};

type GraphLegendLayout = "row" | "column";
type GraphSlot = 1 | 2 | 3 | 4;
type GraphTimeframeHours = 6 | 12 | 24;

interface TrendPoint {
  ts: number;
  value: number;
}

interface TrendCoordinate {
  x: number;
  y: number;
  value: number;
}

interface TrendCanvasPoint {
  x: number;
  y: number;
  value: number;
}

interface TrendValueRange {
  min: number;
  max: number;
}

interface GraphSeriesEntry {
  slot: GraphSlot;
  entityId: string;
  name: string;
  secondary: string;
  unit: string;
  decimals: number;
  currentValue: number | null;
  icon: string;
  showIcon: boolean;
  iconStyle: Record<string, string>;
  trendColor: string;
}

interface GraphHoverState {
  slot: GraphSlot;
  x: number;
  y: number;
  value: number;
  color: string;
}

interface GraphDrawConfig {
  slot: GraphSlot;
  currentValue: number | null;
  color: string;
  lineWidth: number;
}

interface PowerSchwammerlGraphStackCardConfig extends LovelaceCardConfig {
  type: "custom:power-schwammerl-graph-stack-card";
  legend_layout?: GraphLegendLayout;
  timeframe_hours?: GraphTimeframeHours | number | string;
  unit?: string;
  decimals?: number;
  line_thickness?: number;
  clip_graph_to_labels?: boolean;
  hover_enabled?: boolean;
  fill_area_enabled?: boolean;
  normalize_stack_to_percent?: boolean;

  entity?: string;
  icon?: string;
  icon_color?: string | number[];
  trend_color?: string | number[];

  entity_1?: string;
  entity_1_enabled?: boolean;
  entity_1_icon?: string;
  entity_1_show_icon?: boolean;
  entity_1_icon_color?: string | number[];
  entity_1_trend_color?: string | number[];

  entity_2?: string;
  entity_2_enabled?: boolean;
  entity_2_icon?: string;
  entity_2_show_icon?: boolean;
  entity_2_icon_color?: string | number[];
  entity_2_trend_color?: string | number[];

  entity_3?: string;
  entity_3_enabled?: boolean;
  entity_3_icon?: string;
  entity_3_show_icon?: boolean;
  entity_3_icon_color?: string | number[];
  entity_3_trend_color?: string | number[];

  entity_4?: string;
  entity_4_enabled?: boolean;
  entity_4_icon?: string;
  entity_4_show_icon?: boolean;
  entity_4_icon_color?: string | number[];
  entity_4_trend_color?: string | number[];
}

@customElement("power-schwammerl-graph-stack-card")
export class PowerSchwammerlGraphStackCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement("power-schwammerl-graph-stack-card-editor") as LovelaceCardEditor;
  }

  public static async getStubConfig(hass?: HomeAssistant): Promise<PowerSchwammerlGraphStackCardConfig> {
    const states = hass?.states ?? {};
    const entityIds = Object.keys(states);
    const pick = (...candidates: string[]): string | undefined =>
      candidates.find((entityId) => entityId in states);
    const firstByDomain = (domain: string): string | undefined =>
      entityIds.find((entityId) => entityId.startsWith(`${domain}.`));

    const entity1 = pick("sensor.dev_home_power", "sensor.home_power")
      ?? firstByDomain("sensor")
      ?? "sensor.dev_home_power";
    const entity2 = pick("sensor.dev_solar_power", "sensor.solar_power");
    const entity3 = pick("sensor.dev_grid_power", "sensor.grid_power");
    const entity4 = pick("sensor.dev_battery_power", "sensor.battery_power");

    return {
      type: "custom:power-schwammerl-graph-stack-card",
      legend_layout: "row",
      timeframe_hours: DEFAULT_TIMEFRAME_HOURS,
      hover_enabled: true,
      fill_area_enabled: true,
      normalize_stack_to_percent: false,
      entity_1: entity1,
      entity_1_enabled: true,
      entity_1_show_icon: true,
      entity_1_icon: "mdi:chart-line",
      entity_1_trend_color: "purple",
      entity_2: entity2,
      entity_2_enabled: false,
      entity_2_show_icon: true,
      entity_2_icon: "mdi:chart-line-variant",
      entity_2_trend_color: "blue",
      entity_3: entity3,
      entity_3_enabled: false,
      entity_3_show_icon: true,
      entity_3_icon: "mdi:chart-bell-curve",
      entity_3_trend_color: "amber",
      entity_4: entity4,
      entity_4_enabled: false,
      entity_4_show_icon: true,
      entity_4_icon: "mdi:chart-timeline-variant",
      entity_4_trend_color: "green",
      decimals: DEFAULT_DECIMALS
    };
  }

  @property({ attribute: false })
  public hass!: HomeAssistant;

  @state()
  private _config?: PowerSchwammerlGraphStackCardConfig;

  @state()
  private _trendSeries: Partial<Record<GraphSlot, TrendPoint[]>> = {};

  @state()
  private _graphTopInset = 0;

  @state()
  private _hoverState?: GraphHoverState;

  private _drawConfigs: GraphDrawConfig[] = [];
  private _linePointsBySlot: Partial<Record<GraphSlot, TrendCanvasPoint[]>> = {};
  private _trendRefreshTimer?: number;
  private _trendRefreshInFlight = false;
  private _lastTrendRefresh = 0;
  private _trendCanvasRaf?: number;
  private _trendResizeObserver?: ResizeObserver;
  private _canvasColorContext?: CanvasRenderingContext2D | null;

  public setConfig(config: PowerSchwammerlGraphStackCardConfig): void {
    const decimals =
      typeof config.decimals === "number" && Number.isFinite(config.decimals)
        ? Math.min(3, Math.max(0, Math.round(config.decimals)))
        : DEFAULT_DECIMALS;

    const legacyEntity = this.readConfigString(config.entity);
    const legacyIcon = this.readConfigString(config.icon);
    const entity1 = this.readConfigString(config.entity_1) ?? legacyEntity ?? "sensor.dev_home_power";

    this._config = {
      ...config,
      type: "custom:power-schwammerl-graph-stack-card",
      legend_layout: this.normalizeLegendLayout(config.legend_layout),
      timeframe_hours: this.normalizeTimeframeHours(config.timeframe_hours),
      line_thickness: this.normalizeLineThickness(config.line_thickness),
      clip_graph_to_labels: config.clip_graph_to_labels ?? false,
      hover_enabled: config.hover_enabled ?? true,
      fill_area_enabled: config.fill_area_enabled ?? true,
      normalize_stack_to_percent: config.normalize_stack_to_percent ?? false,
      entity_1: entity1,
      entity_1_enabled: config.entity_1_enabled ?? true,
      entity_1_show_icon: config.entity_1_show_icon ?? true,
      entity_1_icon: config.entity_1_icon ?? legacyIcon ?? "mdi:chart-line",
      entity_1_icon_color: config.entity_1_icon_color ?? config.icon_color,
      entity_1_trend_color: config.entity_1_trend_color ?? config.trend_color,

      entity_2: this.readConfigString(config.entity_2),
      entity_2_enabled: config.entity_2_enabled ?? false,
      entity_2_show_icon: config.entity_2_show_icon ?? true,
      entity_2_icon: config.entity_2_icon ?? "mdi:chart-line-variant",

      entity_3: this.readConfigString(config.entity_3),
      entity_3_enabled: config.entity_3_enabled ?? false,
      entity_3_show_icon: config.entity_3_show_icon ?? true,
      entity_3_icon: config.entity_3_icon ?? "mdi:chart-bell-curve",

      entity_4: this.readConfigString(config.entity_4),
      entity_4_enabled: config.entity_4_enabled ?? false,
      entity_4_show_icon: config.entity_4_show_icon ?? true,
      entity_4_icon: config.entity_4_icon ?? "mdi:chart-timeline-variant",

      decimals
    };
  }

  public getCardSize(): number {
    return 2;
  }

  public getGridOptions(): LovelaceGridOptions {
    return {
      columns: 6,
      rows: 2,
      min_columns: 3,
      min_rows: 1
    };
  }

  public getLayoutOptions(): LovelaceLayoutOptions {
    return {
      grid_columns: 2
    };
  }

  protected render(): TemplateResult {
    if (!this._config) {
      return html`<ha-card>Invalid configuration</ha-card>`;
    }

    if (!this.hass) {
      return html``;
    }

    const config = this._config;
    const decimals = config.decimals ?? DEFAULT_DECIMALS;
    const lineThickness = this.normalizeLineThickness(config.line_thickness);
    const normalizeToPercent = config.normalize_stack_to_percent === true;
    const entries = this.collectSeriesEntries(config, decimals);
    const displayEntries = this.withStackedCurrentValues(entries, normalizeToPercent);
    const legendLayout = this.normalizeLegendLayout(config.legend_layout);
    const hoverEnabled = config.hover_enabled !== false;
    const hoverState = this._hoverState;
    const graphTopInset = (config.clip_graph_to_labels ?? false) ? this._graphTopInset : 0;
    const graphStyle = graphTopInset > 0 ? { top: `${graphTopInset}px` } : {};
    const hoverDotStyle =
      hoverState
        ? {
            left: `${hoverState.x}px`,
            top: `${hoverState.y + graphTopInset}px`,
            "--hover-dot-color": hoverState.color
          }
        : {};

    this._drawConfigs = entries.map((entry) => ({
      slot: entry.slot,
      currentValue: entry.currentValue,
      color: entry.trendColor,
      lineWidth: lineThickness
    }));

    return html`
      <ha-card>
        <div
          class="container"
          @pointermove=${this.handlePointerMove}
          @pointerleave=${this.handlePointerLeave}
          @pointercancel=${this.handlePointerLeave}
        >
          <div class="card-trend" style=${styleMap(graphStyle)} aria-hidden="true">
            <canvas class="card-trend-canvas-area"></canvas>
          </div>
          <div class="card-trend-line" style=${styleMap(graphStyle)} aria-hidden="true">
            <canvas class="card-trend-canvas-line"></canvas>
          </div>
          ${hoverEnabled && hoverState
            ? html`<div class="hover-dot" aria-hidden="true" style=${styleMap(hoverDotStyle)}></div>`
            : nothing}

          <div class="content">
            <div class="series-list layout-${legendLayout}">
              ${entries.length === 0
                ? html`
                    <div class="state-item empty">
                      <div class="info">
                        <div class="primary">Graph Stack card</div>
                        <div class="secondary">Select at least one entity</div>
                      </div>
                    </div>
                  `
                : displayEntries.map((entry) =>
                    this.renderSeriesItem(
                      entry,
                      hoverState && hoverState.slot === entry.slot ? hoverState.value : null
                    )
                  )}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private renderSeriesItem(entry: GraphSeriesEntry, hoveredValue: number | null): TemplateResult {
    const secondary = hoveredValue === null
      ? entry.secondary
      : this.formatValue(hoveredValue, entry.unit, entry.decimals);

    return html`
      <div class="state-item" data-slot=${String(entry.slot)}>
        ${entry.showIcon
          ? html`
              <div class="icon-wrap">
                <div class="icon-shape" style=${styleMap(entry.iconStyle)}>
                  <ha-icon .icon=${entry.icon}></ha-icon>
                </div>
              </div>
            `
          : nothing}
        <div class="info">
          <div class="primary">${entry.name}</div>
          <div class="secondary">${secondary}</div>
        </div>
      </div>
    `;
  }

  private collectSeriesEntries(config: PowerSchwammerlGraphStackCardConfig, decimals: number): GraphSeriesEntry[] {
    const entries: GraphSeriesEntry[] = [];

    for (let index = 1; index <= GRAPH_SLOT_COUNT; index += 1) {
      const slot = index as GraphSlot;
      const enabled = this.slotEnabled(slot, config);
      const entityId = this.slotEntityId(slot, config);
      if (!enabled || !entityId) {
        continue;
      }

      const name = this.entityName(entityId, index);
      const currentValue = readNumber(this.hass, entityId);
      const unit = config.unit ?? readUnit(this.hass, entityId) ?? "";
      const secondary = this.formatValue(currentValue, unit, decimals);
      const icon = this.slotIcon(slot, config);
      const iconStyle = this.iconStyle(this.slotIconColor(slot, config));
      const trendColor = this.resolveColor(this.slotTrendColor(slot, config), DEFAULT_TREND_COLOR);

      entries.push({
        slot,
        entityId,
        name,
        secondary,
        unit,
        decimals,
        currentValue,
        icon,
        showIcon: this.slotShowIcon(slot, config),
        iconStyle,
        trendColor
      });
    }

    return entries;
  }

  private withStackedCurrentValues(entries: GraphSeriesEntry[], normalizeToPercent: boolean): GraphSeriesEntry[] {
    const total = entries.reduce((sum, entry) => sum + (entry.currentValue ?? 0), 0);
    const totalValid = Number.isFinite(total) && Math.abs(total) > EPSILON;
    let running = 0;
    let hasAnyValue = false;
    return entries.map((entry) => {
      if (entry.currentValue !== null && Number.isFinite(entry.currentValue)) {
        running += entry.currentValue;
        hasAnyValue = true;
      }

      const stackedValue = hasAnyValue
        ? normalizeToPercent
          ? (totalValid ? (running / total) * 100 : 0)
          : running
        : null;
      const unit = normalizeToPercent ? "%" : entry.unit;
      return {
        ...entry,
        unit,
        secondary: this.formatValue(stackedValue, unit, entry.decimals)
      };
    });
  }

  private slotEntityId(slot: GraphSlot, config: PowerSchwammerlGraphStackCardConfig): string | undefined {
    switch (slot) {
      case 1:
        return this.readConfigString(config.entity_1);
      case 2:
        return this.readConfigString(config.entity_2);
      case 3:
        return this.readConfigString(config.entity_3);
      case 4:
        return this.readConfigString(config.entity_4);
      default:
        return undefined;
    }
  }

  private slotEnabled(slot: GraphSlot, config: PowerSchwammerlGraphStackCardConfig): boolean {
    switch (slot) {
      case 1:
        return config.entity_1_enabled !== false;
      case 2:
        return config.entity_2_enabled === true;
      case 3:
        return config.entity_3_enabled === true;
      case 4:
        return config.entity_4_enabled === true;
      default:
        return false;
    }
  }

  private slotShowIcon(slot: GraphSlot, config: PowerSchwammerlGraphStackCardConfig): boolean {
    switch (slot) {
      case 1:
        return config.entity_1_show_icon !== false;
      case 2:
        return config.entity_2_show_icon !== false;
      case 3:
        return config.entity_3_show_icon !== false;
      case 4:
        return config.entity_4_show_icon !== false;
      default:
        return true;
    }
  }

  private slotIcon(slot: GraphSlot, config: PowerSchwammerlGraphStackCardConfig): string {
    switch (slot) {
      case 1:
        return config.entity_1_icon ?? "mdi:chart-line";
      case 2:
        return config.entity_2_icon ?? "mdi:chart-line-variant";
      case 3:
        return config.entity_3_icon ?? "mdi:chart-bell-curve";
      case 4:
        return config.entity_4_icon ?? "mdi:chart-timeline-variant";
      default:
        return "mdi:chart-line";
    }
  }

  private slotIconColor(slot: GraphSlot, config: PowerSchwammerlGraphStackCardConfig): string | number[] | undefined {
    switch (slot) {
      case 1:
        return config.entity_1_icon_color;
      case 2:
        return config.entity_2_icon_color;
      case 3:
        return config.entity_3_icon_color;
      case 4:
        return config.entity_4_icon_color;
      default:
        return undefined;
    }
  }

  private slotTrendColor(slot: GraphSlot, config: PowerSchwammerlGraphStackCardConfig): string | number[] | undefined {
    switch (slot) {
      case 1:
        return config.entity_1_trend_color;
      case 2:
        return config.entity_2_trend_color;
      case 3:
        return config.entity_3_trend_color;
      case 4:
        return config.entity_4_trend_color;
      default:
        return undefined;
    }
  }

  private entityName(entityId: string, index: number): string {
    const state = this.hass.states[entityId];
    const friendly = state?.attributes?.friendly_name;
    if (typeof friendly === "string" && friendly.trim().length > 0) {
      return friendly.trim();
    }
    return `Entity ${index}`;
  }

  private formatValue(value: number | null, unit: string, decimals: number): string {
    if (value === null) {
      return unit ? `-- ${unit}` : "--";
    }
    const formatted = `${value.toFixed(decimals)} ${unit}`.trim();
    return formatted.length > 0 ? formatted : "--";
  }

  private readConfigString(value: unknown): string | undefined {
    if (typeof value !== "string") {
      return undefined;
    }
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  private normalizeLegendLayout(value: unknown): GraphLegendLayout {
    return value === "column" ? "column" : "row";
  }

  private normalizeTimeframeHours(value: unknown): GraphTimeframeHours {
    const parsed =
      typeof value === "number"
        ? value
        : typeof value === "string"
          ? Number.parseInt(value, 10)
          : NaN;
    if (parsed === 6 || parsed === 12 || parsed === 24) {
      return parsed;
    }
    return DEFAULT_TIMEFRAME_HOURS;
  }

  private trendWindowMs(config?: PowerSchwammerlGraphStackCardConfig): number {
    return this.normalizeTimeframeHours(config?.timeframe_hours) * 60 * 60 * 1000;
  }

  private normalizeLineThickness(value: unknown): number {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      return 1.5;
    }
    return Math.max(0.5, Math.min(6, value));
  }

  private iconStyle(value?: string | number[]): Record<string, string> {
    const rgbCss = this.toRgbCss(value);
    if (rgbCss) {
      return {
        "--icon-color": `rgb(${rgbCss})`,
        "--shape-color": `rgba(${rgbCss}, 0.2)`
      };
    }

    if (typeof value === "string" && value.trim().length > 0 && value !== "none") {
      const cssColor = value.trim();
      return {
        "--icon-color": cssColor,
        "--shape-color": `color-mix(in srgb, ${cssColor} 20%, transparent)`
      };
    }

    return {};
  }

  private resolveColor(value?: string | number[], fallback = ""): string {
    const rgbCss = this.toRgbCss(value);
    if (rgbCss) {
      return `rgb(${rgbCss})`;
    }

    if (typeof value === "string" && value.trim().length > 0) {
      const raw = value.trim();
      const normalized = raw.toLowerCase();
      if (normalized !== "none" && normalized !== "default") {
        return raw;
      }
    }

    return fallback;
  }

  private toRgbCss(value?: string | number[]): string | null {
    if (Array.isArray(value) && value.length >= 3) {
      const nums = value.slice(0, 3).map((channel) => Number(channel));
      if (nums.every((channel) => Number.isFinite(channel))) {
        const [r, g, b] = nums.map((channel) => Math.max(0, Math.min(255, Math.round(channel))));
        return `${r}, ${g}, ${b}`;
      }
      return null;
    }

    if (typeof value !== "string") {
      return null;
    }

    const raw = value.trim().toLowerCase();
    if (raw === "none") {
      return null;
    }
    if (raw.startsWith("var(--rgb-")) {
      return raw;
    }
    if (raw === "state") {
      return "var(--rgb-state-entity, var(--rgb-primary-color, 3, 169, 244))";
    }
    if (raw === "primary") {
      return "var(--rgb-primary-color, 3, 169, 244)";
    }
    if (raw === "accent") {
      return "var(--rgb-accent-color, 255, 152, 0)";
    }
    if (raw in COLOR_RGB_FALLBACK) {
      return `var(--rgb-${raw}, ${COLOR_RGB_FALLBACK[raw]})`;
    }

    const shortHex = /^#([a-fA-F0-9]{3})$/;
    const longHex = /^#([a-fA-F0-9]{6})$/;

    if (shortHex.test(raw)) {
      const [, hex] = raw.match(shortHex) ?? [];
      if (!hex) {
        return null;
      }
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      return `${r}, ${g}, ${b}`;
    }

    if (longHex.test(raw)) {
      const [, hex] = raw.match(longHex) ?? [];
      if (!hex) {
        return null;
      }
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `${r}, ${g}, ${b}`;
    }

    return null;
  }

  private trendPoints(slot: GraphSlot, currentValue: number | null): TrendPoint[] {
    const now = Date.now();
    const cutoff = now - this.trendWindowMs(this._config);
    const stored = (this._trendSeries[slot] ?? [])
      .filter((point) => point.ts >= cutoff)
      .sort((a, b) => a.ts - b.ts);
    const points = [...stored];

    if (currentValue !== null && Number.isFinite(currentValue)) {
      points.push({ ts: now, value: currentValue });
    }

    return points;
  }

  private toTrendCoordinates(
    points: TrendPoint[],
    windowMs: number,
    valueRange?: TrendValueRange | null
  ): TrendCoordinate[] {
    const now = Date.now();
    const start = now - windowMs;
    const xMin = 0;
    const xMax = 100;

    const values = points.map((point) => point.value);
    const min = valueRange?.min ?? Math.min(...values);
    const max = valueRange?.max ?? Math.max(...values);

    if (!Number.isFinite(min) || !Number.isFinite(max)) {
      return [];
    }

    const top = 20;
    const bottom = 80;
    const span = Math.max(max - min, EPSILON);

    const coordinates = points.map((point) => {
      const normalizedX = Math.max(0, Math.min(100, ((point.ts - start) / windowMs) * 100));
      const x = xMin + (normalizedX / 100) * (xMax - xMin);
      const normalized = span <= EPSILON ? 0.5 : (point.value - min) / span;
      const y = bottom - normalized * (bottom - top);
      return { x, y, value: point.value };
    });

    const firstX = coordinates[0]?.x ?? xMin;
    const lastX = coordinates[coordinates.length - 1]?.x ?? xMax;
    const currentSpan = Math.max(0, lastX - firstX);
    const minVisualSpan = 18;

    if (coordinates.length >= 2 && currentSpan < minVisualSpan) {
      const maxFirstX = xMax - minVisualSpan;
      const targetFirstX = Math.max(xMin, Math.min(maxFirstX, lastX - minVisualSpan));
      if (currentSpan <= EPSILON) {
        const step = minVisualSpan / (coordinates.length - 1);
        return coordinates.map((point, index) => ({
          ...point,
          x: Math.max(xMin, Math.min(xMax, targetFirstX + step * index))
        }));
      }

      const scale = minVisualSpan / currentSpan;
      return coordinates.map((point) => ({
        ...point,
        x: Math.max(xMin, Math.min(xMax, targetFirstX + (point.x - firstX) * scale))
      }));
    }

    return coordinates;
  }

  private toCanvasPoints(points: TrendCoordinate[], width: number, height: number): TrendCanvasPoint[] {
    const canvasPoints = points.map((point) => ({
      x: (point.x / 100) * width,
      y: (point.y / 100) * height,
      value: point.value
    }));
    return this.downsampleCanvasPoints(canvasPoints, width);
  }

  private downsampleCanvasPoints(points: TrendCanvasPoint[], width: number): TrendCanvasPoint[] {
    if (points.length <= 3) {
      return points;
    }

    const targetSamples = Math.max(24, Math.min(points.length, Math.round(width)));
    if (points.length <= targetSamples) {
      return this.smoothCanvasPoints(points);
    }

    const sampled: TrendCanvasPoint[] = [];
    sampled.push(points[0]);

    const span = (points.length - 1) / (targetSamples - 1);
    for (let sampleIndex = 1; sampleIndex < targetSamples - 1; sampleIndex += 1) {
      const start = Math.floor(sampleIndex * span);
      const endExclusive = Math.max(start + 1, Math.floor((sampleIndex + 1) * span));
      const bucket = points.slice(start, Math.min(points.length, endExclusive));
      if (bucket.length === 0) {
        continue;
      }

      const sum = bucket.reduce(
        (acc, point) => {
          acc.x += point.x;
          acc.y += point.y;
          acc.value += point.value;
          return acc;
        },
        { x: 0, y: 0, value: 0 }
      );

      const count = bucket.length;
      sampled.push({
        x: sum.x / count,
        y: sum.y / count,
        value: sum.value / count
      });
    }

    sampled.push(points[points.length - 1]);
    return this.smoothCanvasPoints(sampled);
  }

  private smoothCanvasPoints(points: TrendCanvasPoint[]): TrendCanvasPoint[] {
    if (points.length <= 3) {
      return points;
    }

    const smoothed: TrendCanvasPoint[] = [points[0]];
    for (let index = 1; index < points.length - 1; index += 1) {
      const prev = points[index - 1];
      const cur = points[index];
      const next = points[index + 1];
      smoothed.push({
        x: cur.x,
        y: (prev.y + (cur.y * 2) + next.y) / 4,
        value: (prev.value + (cur.value * 2) + next.value) / 4
      });
    }
    smoothed.push(points[points.length - 1]);
    return smoothed;
  }

  private syncTrendResizeObserver(): void {
    if (typeof ResizeObserver === "undefined") {
      return;
    }

    if (!this._trendResizeObserver) {
      this._trendResizeObserver = new ResizeObserver(() => {
        this.updateGraphTopInset();
        this.scheduleTrendCanvasDraw();
      });
    }

    this._trendResizeObserver.disconnect();
    const container = this.renderRoot.querySelector<HTMLElement>(".container");
    if (container) {
      this._trendResizeObserver.observe(container);
    }
    const seriesList = this.renderRoot.querySelector<HTMLElement>(".series-list");
    if (seriesList) {
      this._trendResizeObserver.observe(seriesList);
    }
  }

  private scheduleTrendCanvasDraw(): void {
    if (this._trendCanvasRaf !== undefined) {
      return;
    }

    this._trendCanvasRaf = window.requestAnimationFrame(() => {
      this._trendCanvasRaf = undefined;
      this.drawTrendCanvases();
    });
  }

  private drawTrendCanvases(): void {
    if (this._drawConfigs.length === 0) {
      this._linePointsBySlot = {};
      if (this._hoverState) {
        this._hoverState = undefined;
      }
      return;
    }

    const areaCanvas = this.renderRoot.querySelector<HTMLCanvasElement>(".card-trend-canvas-area");
    const lineCanvas = this.renderRoot.querySelector<HTMLCanvasElement>(".card-trend-canvas-line");
    if (!areaCanvas || !lineCanvas) {
      this._linePointsBySlot = {};
      if (this._hoverState) {
        this._hoverState = undefined;
      }
      return;
    }

    const area = this.prepareTrendCanvas(areaCanvas);
    const line = this.prepareTrendCanvas(lineCanvas);
    if (!area || !line) {
      this._linePointsBySlot = {};
      if (this._hoverState) {
        this._hoverState = undefined;
      }
      return;
    }

    const fillAreaEnabled = this._config?.fill_area_enabled !== false;
    const normalizeToPercent = this._config?.normalize_stack_to_percent === true;
    const windowMs = this.trendWindowMs(this._config);
    const linePointsBySlot: Partial<Record<GraphSlot, TrendCanvasPoint[]>> = {};
    const stackedSeriesBySlotRaw = this.buildStackedTrendSeries(windowMs);
    const stackedSeriesBySlot = normalizeToPercent
      ? this.normalizeStackedSeriesToPercent(stackedSeriesBySlotRaw)
      : stackedSeriesBySlotRaw;
    const stackedRange = normalizeToPercent
      ? { min: 0, max: 100 }
      : this.computeStackedValueRange(stackedSeriesBySlot);
    const drawOrder = [...this._drawConfigs].sort((left, right) => right.slot - left.slot);
    drawOrder.forEach((drawConfig) => {
      const points = stackedSeriesBySlot[drawConfig.slot] ?? [];
      if (points.length < 2) {
        return;
      }

      const coordinates = this.toTrendCoordinates(points, windowMs, stackedRange);
      if (coordinates.length < 2) {
        return;
      }

      const areaPoints = this.toCanvasPoints(coordinates, area.width, area.height);
      const linePoints = this.toCanvasPoints(coordinates, line.width, line.height);
      if (fillAreaEnabled) {
        this.drawTrendArea(area.ctx, areaPoints, drawConfig.color, area.height);
      }
      this.drawTrendLine(line.ctx, linePoints, drawConfig.color, drawConfig.lineWidth);
      linePointsBySlot[drawConfig.slot] = linePoints;
    });

    this._linePointsBySlot = linePointsBySlot;
    if (this._hoverState && !linePointsBySlot[this._hoverState.slot]) {
      this._hoverState = undefined;
    }
  }

  private buildStackedTrendSeries(windowMs: number): Partial<Record<GraphSlot, TrendPoint[]>> {
    const seriesBySlot: Partial<Record<GraphSlot, TrendPoint[]>> = {};
    const sourceOrder = [...this._drawConfigs].sort((left, right) => left.slot - right.slot);

    let cumulative: TrendPoint[] | null = null;
    sourceOrder.forEach((drawConfig) => {
      const current = this.trendPoints(drawConfig.slot, drawConfig.currentValue);
      if (current.length === 0) {
        return;
      }

      const normalizedCurrent = this.normalizeTrendSeries(current, windowMs);
      if (normalizedCurrent.length === 0) {
        return;
      }

      const stacked = cumulative
        ? this.sumTrendSeries(cumulative, normalizedCurrent)
        : normalizedCurrent;
      seriesBySlot[drawConfig.slot] = stacked;
      cumulative = stacked;
    });

    return seriesBySlot;
  }

  private normalizeTrendSeries(points: TrendPoint[], windowMs: number): TrendPoint[] {
    const cutoff = Date.now() - windowMs;
    const sorted = [...points]
      .filter((point) => Number.isFinite(point.ts) && Number.isFinite(point.value) && point.ts >= cutoff)
      .sort((left, right) => left.ts - right.ts);
    if (sorted.length === 0) {
      return [];
    }

    const deduped: TrendPoint[] = [];
    sorted.forEach((point) => {
      const last = deduped[deduped.length - 1];
      if (last && Math.abs(last.ts - point.ts) <= 0.5) {
        deduped[deduped.length - 1] = point;
      } else {
        deduped.push(point);
      }
    });
    return deduped;
  }

  private sumTrendSeries(base: TrendPoint[], add: TrendPoint[]): TrendPoint[] {
    if (base.length === 0) {
      return [...add];
    }
    if (add.length === 0) {
      return [...base];
    }

    const timestamps = this.mergeTimestamps(base, add);
    return timestamps.map((ts) => ({
      ts,
      value: this.interpolateTrendValue(base, ts) + this.interpolateTrendValue(add, ts)
    }));
  }

  private mergeTimestamps(first: TrendPoint[], second: TrendPoint[]): number[] {
    const merged: number[] = [];
    let left = 0;
    let right = 0;

    const push = (value: number): void => {
      const last = merged[merged.length - 1];
      if (last === undefined || Math.abs(last - value) > 0.5) {
        merged.push(value);
      }
    };

    while (left < first.length || right < second.length) {
      const leftValue = left < first.length ? first[left].ts : Number.POSITIVE_INFINITY;
      const rightValue = right < second.length ? second[right].ts : Number.POSITIVE_INFINITY;
      if (leftValue <= rightValue) {
        push(leftValue);
        left += 1;
        if (Math.abs(leftValue - rightValue) <= 0.5) {
          right += 1;
        }
      } else {
        push(rightValue);
        right += 1;
      }
    }

    return merged;
  }

  private interpolateTrendValue(points: TrendPoint[], ts: number): number {
    if (points.length === 0) {
      return 0;
    }

    if (ts <= points[0].ts) {
      return points[0].value;
    }
    const last = points[points.length - 1];
    if (ts >= last.ts) {
      return last.value;
    }

    let low = 0;
    let high = points.length - 1;
    while (low <= high) {
      const middle = Math.floor((low + high) / 2);
      const point = points[middle];
      if (Math.abs(point.ts - ts) <= 0.5) {
        return point.value;
      }
      if (point.ts < ts) {
        low = middle + 1;
      } else {
        high = middle - 1;
      }
    }

    const rightIndex = Math.max(1, Math.min(points.length - 1, low));
    const leftPoint = points[rightIndex - 1];
    const rightPoint = points[rightIndex];
    const span = rightPoint.ts - leftPoint.ts;
    if (Math.abs(span) <= EPSILON) {
      return rightPoint.value;
    }

    const ratio = (ts - leftPoint.ts) / span;
    return leftPoint.value + ((rightPoint.value - leftPoint.value) * ratio);
  }

  private computeStackedValueRange(
    seriesBySlot: Partial<Record<GraphSlot, TrendPoint[]>>
  ): TrendValueRange | null {
    const values: number[] = [];
    (Object.values(seriesBySlot) as TrendPoint[][]).forEach((series) => {
      series.forEach((point) => values.push(point.value));
    });

    if (values.length === 0) {
      return null;
    }

    const min = Math.min(...values);
    const max = Math.max(...values);
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
      return null;
    }

    return { min, max };
  }

  private normalizeStackedSeriesToPercent(
    seriesBySlot: Partial<Record<GraphSlot, TrendPoint[]>>
  ): Partial<Record<GraphSlot, TrendPoint[]>> {
    const normalized: Partial<Record<GraphSlot, TrendPoint[]>> = {};
    const slots = (Object.keys(seriesBySlot) as unknown[])
      .map((value) => Number(value))
      .filter((value): value is number => Number.isFinite(value) && value >= 1 && value <= GRAPH_SLOT_COUNT)
      .sort((left, right) => left - right) as GraphSlot[];
    if (slots.length === 0) {
      return normalized;
    }

    const totalSlot = slots[slots.length - 1];
    const totalSeries = seriesBySlot[totalSlot] ?? [];
    if (totalSeries.length < 1) {
      return normalized;
    }

    slots.forEach((slot) => {
      const series = seriesBySlot[slot] ?? [];
      if (series.length === 0) {
        return;
      }

      normalized[slot] = series.map((point) => {
        const total = this.interpolateTrendValue(totalSeries, point.ts);
        if (!Number.isFinite(total) || Math.abs(total) <= EPSILON) {
          return { ts: point.ts, value: 0 };
        }

        if (slot === totalSlot) {
          return { ts: point.ts, value: 100 };
        }

        const percent = (point.value / total) * 100;
        return {
          ts: point.ts,
          value: Math.max(0, Math.min(100, percent))
        };
      });
    });

    return normalized;
  }

  private prepareTrendCanvas(
    canvas: HTMLCanvasElement
  ): { ctx: CanvasRenderingContext2D; width: number; height: number } | null {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return null;
    }

    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const pixelWidth = Math.max(1, Math.round(width * dpr));
    const pixelHeight = Math.max(1, Math.round(height * dpr));

    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    return { ctx, width, height };
  }

  private drawTrendArea(
    ctx: CanvasRenderingContext2D,
    points: TrendCanvasPoint[],
    color: string,
    height: number
  ): void {
    if (points.length < 2) {
      return;
    }

    const resolvedColor = this.resolveCanvasColor(color);
    const first = points[0];
    const last = points[points.length - 1];
    const minY = Math.min(...points.map((point) => point.y));
    const gradient = ctx.createLinearGradient(0, minY, 0, height);
    gradient.addColorStop(0, this.withAlpha(resolvedColor, 0.24));
    gradient.addColorStop(1, this.withAlpha(resolvedColor, 0));

    ctx.beginPath();
    ctx.moveTo(first.x, first.y);
    points.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
    ctx.lineTo(last.x, height);
    ctx.lineTo(first.x, height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  private drawTrendLine(
    ctx: CanvasRenderingContext2D,
    points: TrendCanvasPoint[],
    color: string,
    lineWidth: number
  ): void {
    if (points.length < 2) {
      return;
    }

    const resolvedColor = this.resolveCanvasColor(color);
    this.strokeTrendPolyline(ctx, points, resolvedColor, lineWidth);
  }

  private handlePointerMove = (event: PointerEvent): void => {
    const layer = this.renderRoot.querySelector<HTMLElement>(".card-trend");
    if (!layer || !this._config || this._config.hover_enabled === false) {
      this.clearHoverState();
      return;
    }

    const rect = layer.getBoundingClientRect();
    if (rect.width <= 1 || rect.height <= 1) {
      this.clearHoverState();
      return;
    }

    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;
    if (localX < 0 || localX > rect.width || localY < 0 || localY > rect.height) {
      this.clearHoverState();
      return;
    }

    const nearest = this.findNearestHoverPoint(localX, localY);
    if (!nearest) {
      this.clearHoverState();
      return;
    }

    const current = this._hoverState;
    if (
      current
      && current.slot === nearest.slot
      && Math.abs(current.x - nearest.x) <= 0.2
      && Math.abs(current.y - nearest.y) <= 0.2
      && Math.abs(current.value - nearest.value) <= 0.0001
      && current.color === nearest.color
    ) {
      return;
    }

    this._hoverState = nearest;
  };

  private handlePointerLeave = (): void => {
    this.clearHoverState();
  };

  private clearHoverState(): void {
    if (this._hoverState) {
      this._hoverState = undefined;
    }
  }

  private findNearestHoverPoint(x: number, y: number): GraphHoverState | null {
    let best: GraphHoverState | null = null;
    let bestDistance = Number.POSITIVE_INFINITY;

    for (const drawConfig of this._drawConfigs) {
      const points = this._linePointsBySlot[drawConfig.slot];
      if (!points || points.length < 2) {
        continue;
      }

      const interpolated = this.interpolateCanvasPoint(points, x);
      if (!interpolated) {
        continue;
      }

      const distance = Math.abs(interpolated.y - y);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = {
          slot: drawConfig.slot,
          x: interpolated.x,
          y: interpolated.y,
          value: interpolated.value,
          color: drawConfig.color
        };
      }
    }

    return best;
  }

  private interpolateCanvasPoint(points: TrendCanvasPoint[], x: number): TrendCanvasPoint | null {
    if (points.length === 0) {
      return null;
    }

    const first = points[0];
    const last = points[points.length - 1];
    if (x <= first.x) {
      return { x, y: first.y, value: first.value };
    }
    if (x >= last.x) {
      return { x, y: last.y, value: last.value };
    }

    for (let index = 1; index < points.length; index += 1) {
      const prev = points[index - 1];
      const next = points[index];
      if (x > next.x) {
        continue;
      }

      const span = next.x - prev.x;
      if (Math.abs(span) <= EPSILON) {
        return { x, y: next.y, value: next.value };
      }

      const t = (x - prev.x) / span;
      return {
        x,
        y: prev.y + ((next.y - prev.y) * t),
        value: prev.value + ((next.value - prev.value) * t)
      };
    }

    return { x, y: last.y, value: last.value };
  }

  private strokeTrendPolyline(
    ctx: CanvasRenderingContext2D,
    points: TrendCanvasPoint[],
    color: string,
    width: number
  ): void {
    if (points.length < 2) {
      return;
    }

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  private resolveCanvasColor(color: string): string {
    const probe = document.createElement("span");
    probe.style.position = "absolute";
    probe.style.opacity = "0";
    probe.style.pointerEvents = "none";
    probe.style.color = color;
    this.renderRoot.appendChild(probe);
    const resolved = getComputedStyle(probe).color;
    probe.remove();
    return resolved || "rgb(158, 158, 158)";
  }

  private withAlpha(color: string, alpha: number): string {
    const channels = this.parseColorChannels(color);
    if (!channels) {
      return color;
    }

    const clamped = Math.max(0, Math.min(1, alpha));
    return `rgba(${channels[0]}, ${channels[1]}, ${channels[2]}, ${clamped})`;
  }

  private parseColorChannels(color: string): [number, number, number] | null {
    const candidate = color.trim();
    const rgbMatch = candidate.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
    if (rgbMatch) {
      const channels = rgbMatch
        .slice(1, 4)
        .map((value) => Math.max(0, Math.min(255, Math.round(Number(value)))));
      if (channels.every((value) => Number.isFinite(value))) {
        return [channels[0], channels[1], channels[2]];
      }
    }

    if (!this._canvasColorContext) {
      this._canvasColorContext = document.createElement("canvas").getContext("2d");
    }
    const ctx = this._canvasColorContext;
    if (!ctx) {
      return null;
    }
    ctx.fillStyle = "#000000";
    ctx.fillStyle = candidate;
    const normalized = ctx.fillStyle;

    const hex = typeof normalized === "string" ? normalized.trim() : "";
    const hexMatch = hex.match(/^#([a-f\d]{6})$/i);
    if (!hexMatch) {
      return null;
    }

    const value = hexMatch[1];
    return [
      parseInt(value.slice(0, 2), 16),
      parseInt(value.slice(2, 4), 16),
      parseInt(value.slice(4, 6), 16)
    ];
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.maybeRefreshTrendHistory(true);
    this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, TREND_REFRESH_MS);
    void this.updateComplete.then(() => {
      this.updateGraphTopInset();
      this.syncTrendResizeObserver();
      this.scheduleTrendCanvasDraw();
    });
  }

  public disconnectedCallback(): void {
    this.clearHoverState();
    if (this._trendRefreshTimer !== undefined) {
      window.clearInterval(this._trendRefreshTimer);
      this._trendRefreshTimer = undefined;
    }
    if (this._trendCanvasRaf !== undefined) {
      window.cancelAnimationFrame(this._trendCanvasRaf);
      this._trendCanvasRaf = undefined;
    }
    if (this._trendResizeObserver) {
      this._trendResizeObserver.disconnect();
      this._trendResizeObserver = undefined;
    }
    super.disconnectedCallback();
  }

  protected updated(changedProps: Map<string, unknown>): void {
    if (changedProps.has("_config")) {
      this.maybeRefreshTrendHistory(true);
      this.clearHoverState();
    } else if (changedProps.has("hass")) {
      this.maybeRefreshTrendHistory();
      this.clearHoverState();
    }
    if (this._config?.hover_enabled === false) {
      this.clearHoverState();
    }
    this.updateGraphTopInset();
    this.syncTrendResizeObserver();
    this.scheduleTrendCanvasDraw();
  }

  private updateGraphTopInset(): void {
    const config = this._config;
    if (!config || config.clip_graph_to_labels !== true) {
      if (this._graphTopInset !== 0) {
        this._graphTopInset = 0;
      }
      return;
    }

    const container = this.renderRoot.querySelector<HTMLElement>(".container");
    const seriesList = this.renderRoot.querySelector<HTMLElement>(".series-list");
    if (!container || !seriesList) {
      if (this._graphTopInset !== 0) {
        this._graphTopInset = 0;
      }
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const listRect = seriesList.getBoundingClientRect();
    const nextInset = Math.max(0, Math.ceil(listRect.bottom - containerRect.top));

    if (Math.abs(nextInset - this._graphTopInset) > 0.5) {
      this._graphTopInset = nextInset;
    }
  }

  private maybeRefreshTrendHistory(force = false): void {
    if (force) {
      this._lastTrendRefresh = 0;
    }

    const now = Date.now();
    if (!force && now - this._lastTrendRefresh < TREND_REFRESH_MS) {
      return;
    }

    this._lastTrendRefresh = now;
    void this.refreshTrendHistory();
  }

  private async refreshTrendHistory(): Promise<void> {
    if (this._trendRefreshInFlight || !this._config || !this.hass || typeof this.hass.callApi !== "function") {
      return;
    }

    const config = this._config;
    const next: Partial<Record<GraphSlot, TrendPoint[]>> = {};
    const windowMs = this.trendWindowMs(config);

    const slots = this.enabledSlots(config);
    if (slots.length === 0) {
      if (Object.keys(this._trendSeries).length > 0) {
        this._trendSeries = {};
      }
      return;
    }

    this._trendRefreshInFlight = true;
    try {
      for (const slot of slots) {
        const entityId = this.slotEntityId(slot, config);
        if (!entityId) {
          continue;
        }
        next[slot] = await this.fetchTrendHistory(entityId, windowMs);
      }
      this._trendSeries = next;
    } finally {
      this._trendRefreshInFlight = false;
    }
  }

  private enabledSlots(config: PowerSchwammerlGraphStackCardConfig): GraphSlot[] {
    const slots: GraphSlot[] = [];
    for (let index = 1; index <= GRAPH_SLOT_COUNT; index += 1) {
      const slot = index as GraphSlot;
      if (this.slotEnabled(slot, config) && this.slotEntityId(slot, config)) {
        slots.push(slot);
      }
    }
    return slots;
  }

  private async fetchTrendHistory(entityId: string, windowMs: number): Promise<TrendPoint[]> {
    if (!this.hass.callApi) {
      return [];
    }

    const startIso = new Date(Date.now() - windowMs).toISOString();
    const path =
      `history/period/${startIso}?filter_entity_id=${encodeURIComponent(entityId)}`
      + "&minimal_response&no_attributes";

    try {
      const raw = await this.hass.callApi("GET", path);
      return this.parseTrendHistory(raw, windowMs);
    } catch {
      return [];
    }
  }

  private parseTrendHistory(raw: unknown, windowMs: number): TrendPoint[] {
    if (!Array.isArray(raw) || raw.length === 0) {
      return [];
    }

    const series = Array.isArray(raw[0]) ? raw[0] : raw;
    if (!Array.isArray(series)) {
      return [];
    }

    const points: TrendPoint[] = [];
    for (const item of series) {
      if (!item || typeof item !== "object") {
        continue;
      }
      const stateObj = item as Record<string, unknown>;
      const value = Number(stateObj.state);
      const changedRaw =
        typeof stateObj.last_changed === "string"
          ? stateObj.last_changed
          : typeof stateObj.last_updated === "string"
            ? stateObj.last_updated
            : "";
      const ts = Date.parse(changedRaw);
      if (!Number.isFinite(value) || !Number.isFinite(ts)) {
        continue;
      }
      points.push({ ts, value });
    }

    const cutoff = Date.now() - windowMs;
    return points
      .filter((point) => point.ts >= cutoff)
      .sort((a, b) => a.ts - b.ts);
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
      --icon-size: var(--mush-icon-size, 36px);
      --icon-border-radius: var(--mush-icon-border-radius, 50%);
      --icon-symbol-size: var(--mush-icon-symbol-size, 0.667em);
      --icon-color: var(--primary-text-color);
      --shape-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
      --series-item-min-width: 164px;
      --series-row-gap: 8px;
      --series-column-gap: 10px;
    }

    ha-card {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: var(--mush-layout-align, center);
      height: 100%;
      overflow: hidden;
    }

    .container {
      position: relative;
      height: 100%;
      min-height: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .card-trend {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      opacity: 1;
    }

    .card-trend-line {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      opacity: 0.96;
    }

    .hover-dot {
      position: absolute;
      left: 0;
      top: 0;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--hover-dot-color, var(--primary-color));
      transform: translate(-50%, -50%);
      z-index: 2;
      pointer-events: none;
    }

    .card-trend-canvas-area,
    .card-trend-canvas-line {
      width: 100%;
      height: 100%;
      display: block;
    }

    .content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      padding: var(--spacing);
      box-sizing: border-box;
    }

    .series-list {
      display: flex;
      width: 100%;
      min-height: 0;
      align-content: flex-start;
      gap: var(--series-row-gap) var(--series-column-gap);
    }

    .series-list.layout-row {
      flex-direction: row;
      flex-wrap: wrap;
    }

    .series-list.layout-column {
      display: grid;
      grid-auto-flow: column;
      grid-template-rows: repeat(2, minmax(0, auto));
      grid-auto-columns: minmax(var(--series-item-min-width), 1fr);
      column-gap: var(--series-column-gap);
      row-gap: var(--series-row-gap);
    }

    .state-item {
      display: flex;
      align-items: center;
      gap: var(--spacing);
      min-width: 0;
      flex: 1 1 var(--series-item-min-width);
    }

    .series-list.layout-column .state-item {
      min-width: var(--series-item-min-width);
      width: 100%;
    }

    .state-item.empty {
      flex: 1 1 100%;
    }

    .icon-wrap {
      position: relative;
      flex: none;
    }

    .icon-shape {
      position: relative;
      width: var(--icon-size);
      height: var(--icon-size);
      font-size: var(--icon-size);
      border-radius: var(--icon-border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--shape-color);
      transition-property: background-color, box-shadow;
      transition-duration: 280ms;
      transition-timing-function: ease-out;
      box-shadow: 0 0 0 1px transparent;
    }

    .icon-shape ha-icon {
      --mdc-icon-size: var(--icon-symbol-size);
      color: var(--icon-color);
      display: flex;
      line-height: 0;
      transition: color 280ms ease-in-out;
    }

    .info {
      min-width: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

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
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "power-schwammerl-graph-stack-card": PowerSchwammerlGraphStackCard;
  }
}
