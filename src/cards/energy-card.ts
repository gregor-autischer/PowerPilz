import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from "../types";
import { readNumber, readUnit } from "../utils/entity";
import "./editors/energy-card-editor";

type FlowDirection = "none" | "forward" | "backward";
type TapActionType = "none" | "navigate" | "more-info";
type NodeKey = "solar" | "grid" | "home" | "battery";

const EPSILON = 0.01;
const DEFAULT_DECIMALS = 1;
const TREND_WINDOW_MS = 24 * 60 * 60 * 1000;
const TREND_REFRESH_MS = 5 * 60 * 1000;
const DEFAULT_NEUTRAL_RGB = "var(--rgb-primary-text-color, 33, 33, 33)";
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

interface TapActionConfig {
  action?: TapActionType;
  navigation_path?: string;
  entity?: string;
}

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

interface TrendCanvasSegment {
  start: TrendCanvasPoint;
  end: TrendCanvasPoint;
  low: boolean;
}

interface PowerSchwammerlEnergyCardConfig extends LovelaceCardConfig {
  type: "custom:power-schwammerl-energy-card";
  name?: string;
  home_entity?: string;
  consumption_entity?: string;
  solar_entity?: string;
  production_entity?: string;
  grid_entity?: string;
  battery_entity?: string;
  battery_percentage_entity?: string;
  grid_label?: string;
  solar_label?: string;
  home_label?: string;
  battery_label?: string;
  solar_icon?: string;
  grid_icon?: string;
  home_icon?: string;
  battery_icon?: string;
  core_icon?: string;
  solar_icon_color?: string | number[];
  grid_icon_color?: string | number[];
  home_icon_color?: string | number[];
  battery_icon_color?: string | number[];
  core_icon_color?: string | number[];
  solar_trend?: boolean;
  grid_trend?: boolean;
  home_trend?: boolean;
  battery_trend?: boolean;
  solar_trend_color?: string | number[];
  grid_trend_color?: string | number[];
  home_trend_color?: string | number[];
  battery_trend_color?: string | number[];
  battery_low_alert?: boolean;
  battery_low_threshold?: number;
  flow_color?: string | number[];
  unit?: string;
  decimals?: number;
  details_navigation_path?: string;
  details_entity?: string;
  tap_action?: TapActionConfig;
}

@customElement("power-schwammerl-energy-card")
export class PowerSchwammerlEnergyCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement("power-schwammerl-energy-card-editor") as LovelaceCardEditor;
  }

  public static async getStubConfig(hass?: HomeAssistant): Promise<PowerSchwammerlEnergyCardConfig> {
    const states = hass?.states ?? {};
    const entityIds = Object.keys(states);
    const pick = (...candidates: string[]): string | undefined =>
      candidates.find((entityId) => entityId in states);
    const firstByDomain = (domain: string): string | undefined =>
      entityIds.find((entityId) => entityId.startsWith(`${domain}.`));

    const homeEntity = pick("sensor.dev_home_power", "sensor.house_consumption_power")
      ?? firstByDomain("sensor")
      ?? "sensor.dev_home_power";
    const solarEntity = pick("sensor.dev_solar_power", "sensor.solar_production_power")
      ?? firstByDomain("sensor");
    const gridEntity = pick("sensor.dev_grid_power", "sensor.grid_power")
      ?? firstByDomain("sensor");
    const batteryEntity = pick("sensor.dev_battery_power", "sensor.home_battery_power")
      ?? firstByDomain("sensor");
    const batterySocEntity = pick("sensor.dev_battery_soc", "sensor.home_battery_soc")
      ?? firstByDomain("sensor");

    return {
      type: "custom:power-schwammerl-energy-card",
      name: "Energy Flow",
      home_entity: homeEntity,
      solar_entity: solarEntity,
      grid_entity: gridEntity,
      battery_entity: batteryEntity,
      battery_percentage_entity: batterySocEntity,
      decimals: DEFAULT_DECIMALS
    };
  }

  @property({ attribute: false })
  public hass!: HomeAssistant;

  @state()
  private _config?: PowerSchwammerlEnergyCardConfig;

  @state()
  private _trendSeries: Partial<Record<NodeKey, TrendPoint[]>> = {};

  private _trendRefreshTimer?: number;
  private _trendRefreshInFlight = false;
  private _lastTrendRefresh = 0;
  private _trendCanvasRaf?: number;
  private _trendResizeObserver?: ResizeObserver;
  private _trendDrawConfig: Partial<
    Record<NodeKey, { currentValue: number | null; color: string; threshold: number | null; thresholdColor: string }>
  > = {};
  private _canvasColorContext?: CanvasRenderingContext2D | null;

  public setConfig(config: PowerSchwammerlEnergyCardConfig): void {
    const homeEntity = config.home_entity ?? config.consumption_entity ?? "sensor.dev_home_power";

    const decimals =
      typeof config.decimals === "number" && Number.isFinite(config.decimals)
        ? Math.min(3, Math.max(0, Math.round(config.decimals)))
        : DEFAULT_DECIMALS;

    this._config = {
      ...config,
      name: config.name ?? "Energy Flow",
      home_entity: homeEntity,
      solar_entity: config.solar_entity ?? config.production_entity,
      grid_label: config.grid_label ?? "Grid",
      solar_label: config.solar_label ?? "Solar",
      home_label: config.home_label ?? "Home",
      battery_label: config.battery_label ?? "Battery",
      solar_icon: config.solar_icon ?? "mdi:weather-sunny",
      grid_icon: config.grid_icon ?? "mdi:transmission-tower",
      home_icon: config.home_icon ?? "mdi:home-lightning-bolt",
      core_icon: config.core_icon ?? "mdi:home",
      core_icon_color: config.core_icon_color,
      solar_trend: config.solar_trend ?? false,
      grid_trend: config.grid_trend ?? false,
      home_trend: config.home_trend ?? false,
      battery_trend: config.battery_trend ?? false,
      battery_low_alert: config.battery_low_alert ?? false,
      battery_low_threshold: this.normalizeBatteryThreshold(config.battery_low_threshold),
      flow_color: config.flow_color,
      decimals
    };
  }

  public getCardSize(): number {
    return 4;
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

    const home = readNumber(this.hass, config.home_entity);
    const solar = readNumber(this.hass, config.solar_entity);
    const grid = readNumber(this.hass, config.grid_entity);
    const battery = readNumber(this.hass, config.battery_entity);
    const batteryPercentage = readNumber(this.hass, config.battery_percentage_entity);

    const fallbackUnit = config.unit ?? readUnit(this.hass, config.home_entity) ?? "kW";
    const solarUnit = config.unit ?? readUnit(this.hass, config.solar_entity) ?? fallbackUnit;
    const homeUnit = config.unit ?? readUnit(this.hass, config.home_entity) ?? fallbackUnit;
    const gridUnit = config.unit ?? readUnit(this.hass, config.grid_entity) ?? fallbackUnit;
    const batteryUnit = config.unit ?? readUnit(this.hass, config.battery_entity) ?? fallbackUnit;

    const solarFlow = this.toUnidirectionalFlow(solar);
    const homeFlow = this.toUnidirectionalFlow(home);
    const gridFlow = this.toBidirectionalFlow(grid);
    const batteryFlow = this.toBidirectionalFlow(battery);
    const tapAction = this.resolveTapAction(config);
    const interactive = tapAction.action !== "none";

    const solarIconStyle = this.iconColorStyle(config.solar_icon_color);
    const gridIconStyle = this.iconColorStyle(config.grid_icon_color);
    const homeIconStyle = this.iconColorStyle(config.home_icon_color);
    const coreIconStyle = this.iconShapeStyle(config.core_icon_color);

    const batteryLowThreshold = this.normalizeBatteryThreshold(config.battery_low_threshold);
    const batteryLowAlertEnabled = Boolean(config.battery_low_alert);
    const batteryIsLow = batteryLowAlertEnabled && batteryPercentage !== null && batteryPercentage <= batteryLowThreshold;
    const batteryIconStyle = this.iconColorStyle(batteryIsLow ? "red" : config.battery_icon_color);
    const batteryIcon = this.batteryIcon(batteryPercentage, battery, config.battery_icon);

    const flowRgb = this.toRgbCss(config.flow_color) ?? DEFAULT_NEUTRAL_RGB;
    const flowStyle = { "--flow-color-rgb": flowRgb };

    const defaultTrendColor = this.resolveColor("purple");
    const solarTrendColor = this.resolveColor(config.solar_trend_color, defaultTrendColor);
    const gridTrendColor = this.resolveColor(config.grid_trend_color, defaultTrendColor);
    const homeTrendColor = this.resolveColor(config.home_trend_color, defaultTrendColor);
    const batteryTrendColor = this.resolveColor(config.battery_trend_color, defaultTrendColor);
    const batteryTrendAlertColor = this.resolveColor("red");
    const batteryTrendThreshold = batteryLowAlertEnabled
      && (Boolean(config.battery_percentage_entity) || batteryPercentage !== null)
      ? batteryLowThreshold
      : null;
    const batteryTrendValue = batteryPercentage ?? battery;

    return html`
      <ha-card
        class=${interactive ? "interactive" : ""}
        tabindex=${interactive ? 0 : -1}
        role=${interactive ? "button" : "article"}
        @click=${this.handleCardClick}
        @keydown=${this.handleCardKeyDown}
      >
        <div class="energy-flow-container">
          <div class="energy-grid" style=${styleMap(flowStyle)}>
            ${this.renderFlowLine("vertical top", solarFlow)}
            ${this.renderFlowLine("horizontal left", gridFlow)}
            ${this.renderFlowLine("horizontal right", homeFlow)}
            ${this.renderFlowLine("vertical bottom", batteryFlow)}

            <div class="energy-value solar ${solar === null ? "missing" : ""}">
              ${this.renderTrend("solar", solar, Boolean(config.solar_trend), solarTrendColor, null, "")}
              <div class="energy-content">
                <ha-icon
                  class="energy-icon"
                  .icon=${config.solar_icon ?? "mdi:weather-sunny"}
                  style=${styleMap(solarIconStyle)}
                ></ha-icon>
                <div class="energy-number">${this.formatValue(solar, solarUnit, decimals)}</div>
                <div class="energy-label">${config.solar_label}</div>
              </div>
            </div>

            <div class="energy-value grid ${grid === null ? "missing" : ""}">
              ${this.renderTrend("grid", grid, Boolean(config.grid_trend), gridTrendColor, null, "")}
              <div class="energy-content">
                <ha-icon
                  class="energy-icon"
                  .icon=${config.grid_icon ?? "mdi:transmission-tower"}
                  style=${styleMap(gridIconStyle)}
                ></ha-icon>
                <div class="energy-number">${this.formatValue(grid, gridUnit, decimals)}</div>
                <div class="energy-label">${config.grid_label}</div>
              </div>
            </div>

            <div class="energy-value home ${home === null ? "missing" : ""}">
              ${this.renderTrend("home", home, Boolean(config.home_trend), homeTrendColor, null, "")}
              <div class="energy-content">
                <ha-icon
                  class="energy-icon"
                  .icon=${config.home_icon ?? "mdi:home-lightning-bolt"}
                  style=${styleMap(homeIconStyle)}
                ></ha-icon>
                <div class="energy-number">${this.formatValue(home, homeUnit, decimals)}</div>
                <div class="energy-label">${config.home_label}</div>
              </div>
            </div>

            <div class="energy-value battery ${battery === null ? "missing" : ""}">
              ${this.renderTrend(
                "battery",
                batteryTrendValue,
                Boolean(config.battery_trend),
                batteryTrendColor,
                batteryTrendThreshold,
                batteryTrendAlertColor
              )}
              <div class="energy-content">
                <div class="battery-top-row">
                  <ha-icon class="energy-icon" .icon=${batteryIcon} style=${styleMap(batteryIconStyle)}></ha-icon>
                  ${batteryPercentage !== null
                    ? html`
                        <div class="battery-percentage ${batteryIsLow ? "alert" : ""}">
                          ${this.formatBatteryPercentage(batteryPercentage)}
                        </div>
                      `
                    : nothing}
                </div>
                <div class="energy-number">${this.formatValue(battery, batteryUnit, decimals)}</div>
                <div class="energy-label">${config.battery_label}</div>
              </div>
            </div>

            <div class="home-core">
              <div class="home-core-icon" style=${styleMap(coreIconStyle)}>
                <ha-icon .icon=${config.core_icon ?? "mdi:home"}></ha-icon>
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private renderFlowLine(baseClass: string, direction: FlowDirection): TemplateResult {
    const className =
      direction === "none" ? `flow-line ${baseClass}` : `flow-line ${baseClass} active ${direction}`;
    return html`<div class=${className} aria-hidden="true"></div>`;
  }

  private renderTrend(
    node: NodeKey,
    currentValue: number | null,
    enabled: boolean,
    color: string,
    threshold: number | null,
    thresholdColor: string
  ): TemplateResult | typeof nothing {
    if (!enabled) {
      delete this._trendDrawConfig[node];
      return nothing;
    }

    this._trendDrawConfig[node] = {
      currentValue,
      color,
      threshold,
      thresholdColor
    };

    return html`
      <div class="node-trend" aria-hidden="true">
        <canvas class="node-trend-canvas-area" data-node=${node}></canvas>
      </div>
      <div class="node-trend-line" aria-hidden="true">
        <canvas class="node-trend-canvas-line" data-node=${node}></canvas>
      </div>
    `;
  }

  private trendPoints(node: NodeKey, currentValue: number | null): TrendPoint[] {
    const now = Date.now();
    const cutoff = now - TREND_WINDOW_MS;
    const stored = (this._trendSeries[node] ?? [])
      .filter((point) => point.ts >= cutoff)
      .sort((a, b) => a.ts - b.ts);
    const points = [...stored];

    if (currentValue !== null && Number.isFinite(currentValue)) {
      points.push({ ts: now, value: currentValue });
    }

    return points;
  }

  private buildThresholdTrendSegments(
    points: TrendCanvasPoint[],
    threshold: number
  ): TrendCanvasSegment[] {
    const segments: TrendCanvasSegment[] = [];

    for (let index = 1; index < points.length; index += 1) {
      const start = points[index - 1];
      const end = points[index];
      const startIsLow = start.value <= threshold;
      const endIsLow = end.value <= threshold;

      if (startIsLow === endIsLow || Math.abs(end.value - start.value) <= EPSILON) {
        segments.push({
          start,
          end,
          low: startIsLow
        });
        continue;
      }

      const ratio = (threshold - start.value) / (end.value - start.value);
      const t = Math.max(0, Math.min(1, ratio));
      const cross: TrendCanvasPoint = {
        x: start.x + (end.x - start.x) * t,
        y: start.y + (end.y - start.y) * t,
        value: threshold
      };

      segments.push({
        start,
        end: cross,
        low: startIsLow
      });
      segments.push({
        start: cross,
        end,
        low: endIsLow
      });
    }

    return segments;
  }

  private toTrendCoordinates(points: TrendPoint[]): TrendCoordinate[] {
    const now = Date.now();
    const start = now - TREND_WINDOW_MS;
    const xMin = 3;
    const xMax = 97;

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
    return points.map((point) => ({
      x: (point.x / 100) * width,
      y: (point.y / 100) * height,
      value: point.value
    }));
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
    this.renderRoot.querySelectorAll<HTMLElement>(".energy-value").forEach((node) => {
      this._trendResizeObserver?.observe(node);
    });
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
    const areaCanvases = this.collectTrendCanvases(".node-trend-canvas-area");
    const lineCanvases = this.collectTrendCanvases(".node-trend-canvas-line");
    const areaContexts = new Map<NodeKey, { ctx: CanvasRenderingContext2D; width: number; height: number }>();
    const lineContexts = new Map<NodeKey, { ctx: CanvasRenderingContext2D; width: number; height: number }>();

    areaCanvases.forEach((canvas, node) => {
      const prepared = this.prepareTrendCanvas(canvas);
      if (prepared) {
        areaContexts.set(node, prepared);
      }
    });

    lineCanvases.forEach((canvas, node) => {
      const prepared = this.prepareTrendCanvas(canvas);
      if (prepared) {
        lineContexts.set(node, prepared);
      }
    });

    (Object.keys(this._trendDrawConfig) as NodeKey[]).forEach((node) => {
      const drawConfig = this._trendDrawConfig[node];
      if (!drawConfig) {
        return;
      }

      const area = areaContexts.get(node);
      const line = lineContexts.get(node);
      if (!area || !line) {
        return;
      }

      const points = this.trendPoints(node, drawConfig.currentValue);
      if (points.length < 2) {
        return;
      }

      const coordinates = this.toTrendCoordinates(points);
      if (coordinates.length < 2) {
        return;
      }

      const areaPoints = this.toCanvasPoints(coordinates, area.width, area.height);
      const linePoints = this.toCanvasPoints(coordinates, line.width, line.height);
      const areaColor =
        drawConfig.threshold !== null
        && drawConfig.currentValue !== null
        && drawConfig.currentValue <= drawConfig.threshold
          ? drawConfig.thresholdColor
          : drawConfig.color;

      this.drawTrendArea(area.ctx, areaPoints, areaColor, area.height);
      this.drawTrendLine(line.ctx, linePoints, drawConfig.color, drawConfig.threshold, drawConfig.thresholdColor);
    });
  }

  private collectTrendCanvases(selector: string): Map<NodeKey, HTMLCanvasElement> {
    const canvases = new Map<NodeKey, HTMLCanvasElement>();

    this.renderRoot.querySelectorAll<HTMLCanvasElement>(selector).forEach((canvas) => {
      const node = canvas.dataset.node;
      if (!node || (node !== "solar" && node !== "grid" && node !== "home" && node !== "battery")) {
        return;
      }
      canvases.set(node, canvas);
    });

    return canvases;
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

    const first = points[0];
    const last = points[points.length - 1];
    const resolvedColor = this.resolveCanvasColor(color);
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
    threshold: number | null,
    thresholdColor: string
  ): void {
    if (points.length < 2) {
      return;
    }

    const normalColor = this.resolveCanvasColor(color);
    const lowColor = this.resolveCanvasColor(thresholdColor);

    if (threshold === null) {
      this.strokeTrendPolyline(ctx, points, "rgba(255, 255, 255, 0.92)", 4.2);
      this.strokeTrendPolyline(ctx, points, normalColor, 2.8);
      return;
    }

    const segments = this.buildThresholdTrendSegments(points, threshold);
    segments.forEach((segment) => {
      this.strokeTrendSegment(ctx, segment.start, segment.end, "rgba(255, 255, 255, 0.92)", 4.2);
    });
    segments.forEach((segment) => {
      this.strokeTrendSegment(ctx, segment.start, segment.end, segment.low ? lowColor : normalColor, 2.8);
    });
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

  private strokeTrendSegment(
    ctx: CanvasRenderingContext2D,
    start: TrendCanvasPoint,
    end: TrendCanvasPoint,
    color: string,
    width: number
  ): void {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
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

    const config = this._config;
    const enabledNodes = this.enabledTrendNodes(config);
    if (enabledNodes.length === 0) {
      if (Object.keys(this._trendSeries).length > 0) {
        this._trendSeries = {};
      }
      return;
    }

    this._trendRefreshInFlight = true;
    try {
      const next: Partial<Record<NodeKey, TrendPoint[]>> = {};
      for (const node of enabledNodes) {
        const entityId = this.trendEntityId(node, config);
        if (!entityId) {
          continue;
        }
        next[node] = await this.fetchTrendHistory(entityId);
      }
      this._trendSeries = next;
    } finally {
      this._trendRefreshInFlight = false;
    }
  }

  private enabledTrendNodes(config: PowerSchwammerlEnergyCardConfig): NodeKey[] {
    const nodes: NodeKey[] = [];
    if (config.solar_trend) {
      nodes.push("solar");
    }
    if (config.grid_trend) {
      nodes.push("grid");
    }
    if (config.home_trend) {
      nodes.push("home");
    }
    if (config.battery_trend) {
      nodes.push("battery");
    }
    return nodes;
  }

  private trendEntityId(node: NodeKey, config: PowerSchwammerlEnergyCardConfig): string | undefined {
    switch (node) {
      case "solar":
        return config.solar_entity;
      case "grid":
        return config.grid_entity;
      case "home":
        return config.home_entity;
      case "battery":
        return config.battery_percentage_entity ?? config.battery_entity;
      default:
        return undefined;
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

  private handleCardClick = (): void => {
    this.executeTapAction();
  };

  private handleCardKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    event.preventDefault();
    this.executeTapAction();
  };

  private executeTapAction(): void {
    if (!this._config) {
      return;
    }

    const tapAction = this.resolveTapAction(this._config);
    if (tapAction.action === "none") {
      return;
    }

    if (tapAction.action === "navigate") {
      if (tapAction.navigation_path) {
        this.navigateToPath(tapAction.navigation_path);
      }
      return;
    }

    if (tapAction.action === "more-info") {
      const entityId =
        tapAction.entity
        ?? this._config.details_entity
        ?? this._config.home_entity
        ?? this._config.grid_entity
        ?? this._config.solar_entity
        ?? this._config.battery_entity;
      if (entityId) {
        this.fireEvent("hass-more-info", { entityId });
      }
    }
  }

  private resolveTapAction(config: PowerSchwammerlEnergyCardConfig): Required<TapActionConfig> {
    const source = config.tap_action;
    if (source) {
      const action: TapActionType = source.action ?? (source.navigation_path ? "navigate" : "none");
      return {
        action,
        navigation_path: source.navigation_path ?? "",
        entity: source.entity ?? ""
      };
    }

    if (config.details_navigation_path) {
      return {
        action: "navigate",
        navigation_path: config.details_navigation_path,
        entity: ""
      };
    }

    return {
      action: "none",
      navigation_path: "",
      entity: ""
    };
  }

  private navigateToPath(path: string): void {
    window.history.pushState(null, "", path);
    window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
  }

  private fireEvent(type: string, detail: Record<string, unknown>): void {
    this.dispatchEvent(
      new CustomEvent(type, {
        detail,
        bubbles: true,
        composed: true
      })
    );
  }

  private toUnidirectionalFlow(value: number | null): FlowDirection {
    if (value === null || value <= EPSILON) {
      return "none";
    }
    return "forward";
  }

  private toBidirectionalFlow(value: number | null): FlowDirection {
    if (value === null || Math.abs(value) <= EPSILON) {
      return "none";
    }
    return value > 0 ? "forward" : "backward";
  }

  private formatValue(value: number | null, unit: string, decimals: number): string {
    if (value === null) {
      return "--";
    }

    const sign = value < 0 ? "-" : "";
    return `${sign}${Math.abs(value).toFixed(decimals)} ${unit}`;
  }

  private formatBatteryPercentage(value: number): string {
    const rounded = Math.round(this.normalizeBatteryThreshold(value));
    return `${rounded}%`;
  }

  private batteryIcon(percentage: number | null, batteryPower: number | null, fallbackIcon?: string): string {
    if (batteryPower !== null && batteryPower > EPSILON) {
      return "mdi:battery-charging";
    }

    if (percentage === null) {
      return fallbackIcon ?? "mdi:battery-outline";
    }

    const clamped = this.normalizeBatteryThreshold(percentage);
    if (clamped < 5) {
      return "mdi:battery-outline";
    }

    if (clamped >= 95) {
      return "mdi:battery";
    }

    const step = Math.max(10, Math.min(90, Math.round(clamped / 10) * 10));
    return `mdi:battery-${step}`;
  }

  private normalizeBatteryThreshold(value?: number | null): number {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      return 20;
    }
    return Math.max(0, Math.min(100, value));
  }

  private iconColorStyle(value?: string | number[]): Record<string, string> {
    const color = this.resolveColor(value, "");
    return color ? { color } : {};
  }

  private iconShapeStyle(value?: string | number[]): Record<string, string> {
    const rgbCss = this.toRgbCss(value);
    if (rgbCss) {
      return {
        "--icon-color": `rgb(${rgbCss})`,
        "--shape-color":
          `color-mix(in srgb, rgb(${rgbCss}) 14%, `
          + "var(--ha-card-background, var(--card-background-color, white)))"
      };
    }

    if (typeof value === "string" && value.trim().length > 0) {
      const cssColor = value.trim();
      const normalized = cssColor.toLowerCase();
      if (normalized === "none" || normalized === "default") {
        return {};
      }
      return {
        "--icon-color": cssColor,
        "--shape-color":
          `color-mix(in srgb, ${cssColor} 14%, `
          + "var(--ha-card-background, var(--card-background-color, white)))"
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

  static styles = css`
    :host {
      display: block;
      container-type: inline-size;
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
      --icon-size: var(--mush-icon-size, 36px);
      --icon-border-radius: var(--mush-icon-border-radius, 50%);
      --icon-symbol-size: var(--mush-icon-symbol-size, 0.667em);
      --icon-color: var(--primary-text-color);
      --flow-line-size: 3px;
      --shape-color: color-mix(
        in srgb,
        var(--icon-color) 14%,
        var(--ha-card-background, var(--card-background-color, white))
      );
      --shape-color-soft: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.04);
      --flow-color-rgb: var(--rgb-primary-text-color, 33, 33, 33);
      --flow-track-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.12);
    }

    ha-card {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: var(--mush-layout-align, center);
      height: auto;
      background: var(--ha-card-background, var(--card-background-color, white));
    }

    ha-card.interactive {
      cursor: pointer;
    }

    ha-card.interactive:focus-visible {
      outline: 2px solid rgba(var(--flow-color-rgb), 0.45);
      outline-offset: 2px;
    }

    .energy-flow-container {
      padding: var(--spacing);
    }

    .energy-grid {
      position: relative;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      grid-template-rows: repeat(3, minmax(0, 1fr));
      gap: var(--spacing);
      aspect-ratio: 1 / 1;
      min-height: 266px;
      border-radius: var(--control-border-radius);
      padding: var(--spacing);
      background: transparent;
      box-sizing: border-box;
    }

    .energy-value {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      justify-self: center;
      align-self: center;
      width: calc(100% - 8px);
      max-width: 132px;
      min-width: 0;
      aspect-ratio: 1 / 1;
      border-radius: calc(var(--control-border-radius) - 1px);
      padding: 8px 10px;
      background: var(--ha-card-background, var(--card-background-color, white));
      border: 1px solid rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.1);
      box-shadow: none;
      z-index: 2;
      box-sizing: border-box;
      overflow: hidden;
    }

    .node-trend {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      opacity: 1;
    }

    .node-trend-line {
      position: absolute;
      inset: 0;
      z-index: 2;
      pointer-events: none;
      opacity: 0.96;
    }

    .node-trend-canvas-area,
    .node-trend-canvas-line {
      width: 100%;
      height: 100%;
      display: block;
    }

    .energy-content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-width: 0;
    }

    .energy-value.solar {
      grid-column: 2;
      grid-row: 1;
    }

    .energy-value.grid {
      grid-column: 1;
      grid-row: 2;
    }

    .energy-value.home {
      grid-column: 3;
      grid-row: 2;
    }

    .energy-value.battery {
      grid-column: 2;
      grid-row: 3;
    }

    .energy-value.missing .energy-number {
      color: var(--disabled-text-color);
    }

    .energy-icon {
      --mdc-icon-size: calc(var(--icon-size) * 0.667);
      margin-bottom: 4px;
      color: var(--icon-color);
      flex: 0 0 auto;
    }

    .battery-top-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin-bottom: 2px;
    }

    .battery-top-row .energy-icon {
      margin-bottom: 0;
    }

    .battery-percentage {
      font-size: var(--card-secondary-font-size);
      line-height: var(--card-secondary-line-height);
      color: var(--secondary-text-color);
      font-weight: var(--card-primary-font-weight);
      letter-spacing: var(--card-secondary-letter-spacing);
    }

    .battery-percentage.alert {
      color: var(--error-color, rgb(var(--rgb-red, 244, 67, 54)));
    }

    .energy-number {
      font-size: var(--card-primary-font-size);
      line-height: var(--card-primary-line-height);
      font-weight: var(--card-primary-font-weight);
      color: var(--primary-text-color);
      letter-spacing: var(--card-primary-letter-spacing);
      white-space: nowrap;
    }

    .energy-label {
      margin-top: 2px;
      font-size: var(--card-secondary-font-size);
      line-height: var(--card-secondary-line-height);
      color: var(--secondary-text-color);
      font-weight: var(--card-secondary-font-weight);
      letter-spacing: var(--card-secondary-letter-spacing);
    }

    .home-core {
      grid-column: 2;
      grid-row: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      justify-self: center;
      align-self: center;
      z-index: 3;
    }

    .home-core-icon {
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

    .home-core-icon ha-icon {
      --mdc-icon-size: var(--icon-symbol-size);
      color: var(--icon-color);
      display: flex;
      line-height: 0;
      transition: color 280ms ease-in-out;
    }

    .flow-line {
      position: absolute;
      border-radius: 999px;
      background: var(--flow-track-color);
      overflow: hidden;
      z-index: 1;
    }

    .flow-line::after {
      content: "";
      position: absolute;
      inset: 0;
      opacity: 0;
    }

    .flow-line.horizontal {
      height: var(--flow-line-size);
      top: calc(50% - (var(--flow-line-size) / 2));
    }

    .flow-line.vertical {
      width: var(--flow-line-size);
      left: calc(50% - (var(--flow-line-size) / 2));
    }

    .flow-line.left {
      left: 17%;
      right: 50%;
    }

    .flow-line.right {
      left: 50%;
      right: 17%;
    }

    .flow-line.top {
      top: 17%;
      bottom: 50%;
    }

    .flow-line.bottom {
      top: 50%;
      bottom: 17%;
    }

    .flow-line.active::after {
      opacity: 0.95;
    }

    .flow-line.horizontal.active.forward::after {
      background: linear-gradient(90deg, transparent 0%, rgba(var(--flow-color-rgb), 0.98) 50%, transparent 100%);
      animation: flow-horizontal-forward 1.8s linear infinite;
    }

    .flow-line.horizontal.active.backward::after {
      background: linear-gradient(270deg, transparent 0%, rgba(var(--flow-color-rgb), 0.98) 50%, transparent 100%);
      animation: flow-horizontal-backward 1.8s linear infinite;
    }

    .flow-line.vertical.active.forward::after {
      background: linear-gradient(180deg, transparent 0%, rgba(var(--flow-color-rgb), 0.98) 50%, transparent 100%);
      animation: flow-vertical-forward 1.8s linear infinite;
    }

    .flow-line.vertical.active.backward::after {
      background: linear-gradient(0deg, transparent 0%, rgba(var(--flow-color-rgb), 0.98) 50%, transparent 100%);
      animation: flow-vertical-backward 1.8s linear infinite;
    }

    @keyframes flow-horizontal-forward {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    @keyframes flow-horizontal-backward {
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(-100%);
      }
    }

    @keyframes flow-vertical-forward {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(100%);
      }
    }

    @keyframes flow-vertical-backward {
      0% {
        transform: translateY(100%);
      }
      100% {
        transform: translateY(-100%);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .flow-line.active::after {
        animation: none !important;
        opacity: 0.6;
      }
    }

    @container (max-width: 520px) {
      .energy-grid {
        min-height: 234px;
        gap: 8px;
        padding: 8px;
      }

      .energy-value {
        width: calc(100% - 6px);
        max-width: 116px;
        padding: 6px 8px;
      }

      .home-core-icon {
        width: var(--icon-size);
        height: var(--icon-size);
      }
    }
  `;
}
