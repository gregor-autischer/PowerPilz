import { LitElement, css, html, type TemplateResult } from "lit";
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
import "./editors/graph-card-editor";

const DEFAULT_DECIMALS = 1;
const TREND_WINDOW_MS = 24 * 60 * 60 * 1000;
const TREND_REFRESH_MS = 5 * 60 * 1000;
const EPSILON = 0.01;
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

interface PowerSchwammerlGraphCardConfig extends LovelaceCardConfig {
  type: "custom:power-schwammerl-graph-card";
  name?: string;
  secondary?: string;
  entity?: string;
  icon?: string;
  icon_color?: string | number[];
  trend_color?: string | number[];
  unit?: string;
  decimals?: number;
}

@customElement("power-schwammerl-graph-card")
export class PowerSchwammerlGraphCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement("power-schwammerl-graph-card-editor") as LovelaceCardEditor;
  }

  public static async getStubConfig(hass?: HomeAssistant): Promise<PowerSchwammerlGraphCardConfig> {
    const states = hass?.states ?? {};
    const entityIds = Object.keys(states);
    const pick = (...candidates: string[]): string | undefined =>
      candidates.find((entityId) => entityId in states);
    const firstByDomain = (domain: string): string | undefined =>
      entityIds.find((entityId) => entityId.startsWith(`${domain}.`));

    return {
      type: "custom:power-schwammerl-graph-card",
      name: "Power Trend",
      secondary: "Last 24 hours",
      entity: pick("sensor.dev_home_power", "sensor.home_power") ?? firstByDomain("sensor") ?? "sensor.dev_home_power",
      icon: "mdi:chart-line",
      decimals: DEFAULT_DECIMALS
    };
  }

  @property({ attribute: false })
  public hass!: HomeAssistant;

  @state()
  private _config?: PowerSchwammerlGraphCardConfig;

  @state()
  private _trendSeries: TrendPoint[] = [];

  private _drawConfig?: { currentValue: number | null; color: string };
  private _trendRefreshTimer?: number;
  private _trendRefreshInFlight = false;
  private _lastTrendRefresh = 0;
  private _trendCanvasRaf?: number;
  private _trendResizeObserver?: ResizeObserver;
  private _canvasColorContext?: CanvasRenderingContext2D | null;

  public setConfig(config: PowerSchwammerlGraphCardConfig): void {
    const entity = config.entity ?? "sensor.dev_home_power";
    const decimals =
      typeof config.decimals === "number" && Number.isFinite(config.decimals)
        ? Math.min(3, Math.max(0, Math.round(config.decimals)))
        : DEFAULT_DECIMALS;

    this._config = {
      ...config,
      type: "custom:power-schwammerl-graph-card",
      name: config.name ?? "Power Trend",
      secondary: config.secondary ?? "",
      entity,
      icon: config.icon ?? "mdi:chart-line",
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
      min_rows: 1,
      max_rows: 4
    };
  }

  public getLayoutOptions(): LovelaceLayoutOptions {
    return {
      grid_columns: 2,
      grid_rows: this.getCardSize()
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
    const currentValue = readNumber(this.hass, config.entity);
    const unit = config.unit ?? readUnit(this.hass, config.entity) ?? "";
    const decimals = config.decimals ?? DEFAULT_DECIMALS;
    const secondary = this.resolveSecondary(config.secondary, currentValue, unit, decimals);
    const iconStyle = this.iconStyle(config.icon_color);
    const trendColor = this.resolveColor(config.trend_color, "rgb(var(--rgb-primary-text-color, 33, 33, 33))");

    this._drawConfig = {
      currentValue,
      color: trendColor
    };

    return html`
      <ha-card>
        <div class="container">
          <div class="card-trend" aria-hidden="true">
            <canvas class="card-trend-canvas-area"></canvas>
          </div>
          <div class="card-trend-line" aria-hidden="true">
            <canvas class="card-trend-canvas-line"></canvas>
          </div>

          <div class="content">
            <div class="state-item">
              <div class="icon-wrap">
                <div class="icon-shape" style=${styleMap(iconStyle)}>
                  <ha-icon .icon=${config.icon ?? "mdi:chart-line"}></ha-icon>
                </div>
              </div>
              <div class="info">
                <div class="primary">${config.name}</div>
                <div class="secondary">${secondary}</div>
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private resolveSecondary(
    configured: string | undefined,
    value: number | null,
    unit: string,
    decimals: number
  ): string {
    if (typeof configured === "string" && configured.trim().length > 0) {
      return configured.trim();
    }

    if (value === null) {
      return "Last 24 hours";
    }

    const formatted = `${value.toFixed(decimals)} ${unit}`.trim();
    return formatted.length > 0 ? formatted : "Last 24 hours";
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

  private trendPoints(currentValue: number | null): TrendPoint[] {
    const now = Date.now();
    const cutoff = now - TREND_WINDOW_MS;
    const stored = this._trendSeries
      .filter((point) => point.ts >= cutoff)
      .sort((a, b) => a.ts - b.ts);
    const points = [...stored];

    if (currentValue !== null && Number.isFinite(currentValue)) {
      points.push({ ts: now, value: currentValue });
    }

    return points;
  }

  private toTrendCoordinates(points: TrendPoint[]): TrendCoordinate[] {
    const now = Date.now();
    const start = now - TREND_WINDOW_MS;
    const xMin = 0;
    const xMax = 100;

    const values = points.map((point) => point.value);
    const min = Math.min(...values);
    const max = Math.max(...values);

    if (!Number.isFinite(min) || !Number.isFinite(max)) {
      return [];
    }

    const top = 20;
    const bottom = 80;
    const span = Math.max(max - min, EPSILON);

    const coordinates = points.map((point) => {
      const normalizedX = Math.max(0, Math.min(100, ((point.ts - start) / TREND_WINDOW_MS) * 100));
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
        this.scheduleTrendCanvasDraw();
      });
    }

    this._trendResizeObserver.disconnect();
    const container = this.renderRoot.querySelector<HTMLElement>(".container");
    if (container) {
      this._trendResizeObserver.observe(container);
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
    const drawConfig = this._drawConfig;
    if (!drawConfig) {
      return;
    }

    const areaCanvas = this.renderRoot.querySelector<HTMLCanvasElement>(".card-trend-canvas-area");
    const lineCanvas = this.renderRoot.querySelector<HTMLCanvasElement>(".card-trend-canvas-line");
    if (!areaCanvas || !lineCanvas) {
      return;
    }

    const area = this.prepareTrendCanvas(areaCanvas);
    const line = this.prepareTrendCanvas(lineCanvas);
    if (!area || !line) {
      return;
    }

    const points = this.trendPoints(drawConfig.currentValue);
    if (points.length < 2) {
      return;
    }

    const coordinates = this.toTrendCoordinates(points);
    if (coordinates.length < 2) {
      return;
    }

    const areaPoints = this.toCanvasPoints(coordinates, area.width, area.height);
    const linePoints = this.toCanvasPoints(coordinates, line.width, line.height);
    this.drawTrendArea(area.ctx, areaPoints, drawConfig.color, area.height);
    this.drawTrendLine(line.ctx, linePoints, drawConfig.color);
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

  private drawTrendLine(ctx: CanvasRenderingContext2D, points: TrendCanvasPoint[], color: string): void {
    if (points.length < 2) {
      return;
    }

    const resolvedColor = this.resolveCanvasColor(color);
    this.strokeTrendPolyline(ctx, points, resolvedColor, 1.5);
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
      this.syncTrendResizeObserver();
      this.scheduleTrendCanvasDraw();
    });
  }

  public disconnectedCallback(): void {
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
    } else if (changedProps.has("hass")) {
      this.maybeRefreshTrendHistory();
    }
    this.syncTrendResizeObserver();
    this.scheduleTrendCanvasDraw();
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

    const entityId = this._config.entity;
    if (!entityId) {
      if (this._trendSeries.length > 0) {
        this._trendSeries = [];
      }
      return;
    }

    this._trendRefreshInFlight = true;
    try {
      this._trendSeries = await this.fetchTrendHistory(entityId);
    } finally {
      this._trendRefreshInFlight = false;
    }
  }

  private async fetchTrendHistory(entityId: string): Promise<TrendPoint[]> {
    if (!this.hass.callApi) {
      return [];
    }

    const startIso = new Date(Date.now() - TREND_WINDOW_MS).toISOString();
    const path =
      `history/period/${startIso}?filter_entity_id=${encodeURIComponent(entityId)}`
      + "&minimal_response&no_attributes";

    try {
      const raw = await this.hass.callApi("GET", path);
      return this.parseTrendHistory(raw);
    } catch {
      return [];
    }
  }

  private parseTrendHistory(raw: unknown): TrendPoint[] {
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

    const cutoff = Date.now() - TREND_WINDOW_MS;
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
    }

    .state-item {
      display: flex;
      align-items: center;
      gap: var(--spacing);
      padding: var(--spacing);
      min-width: 0;
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
    "power-schwammerl-graph-card": PowerSchwammerlGraphCard;
  }
}
