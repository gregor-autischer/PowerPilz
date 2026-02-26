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
import { fetchHistoryTrendPoints } from "../utils/history";
import { resolveColor as resolveCssColor, toRgbCss as toRgbCssValue } from "../utils/color";
import { toTrendCanvasPoints } from "../utils/trend";
import "./editors/energy-card-editor";

type FlowDirection = "none" | "forward" | "backward";
type TapActionType = "none" | "navigate" | "more-info";
type NodeKey = "solar" | "grid" | "grid_secondary" | "home" | "battery" | "battery_secondary";

const EPSILON = 0.01;
const DEFAULT_DECIMALS = 1;
const TREND_WINDOW_MS = 24 * 60 * 60 * 1000;
const TREND_REFRESH_MS = 5 * 60 * 1000;
const SOLAR_SUB_BLOCK_SLOT_COUNT = 4;
const HOME_SUB_BLOCK_SLOT_COUNT = 8;
const GRID_SUB_BLOCK_SLOT_COUNT = 2;
const SUB_BLOCKS_MIN_COLUMNS = 12;
const SUB_BLOCKS_MIN_ROWS = 7;
const SUB_BLOCKS_FALLBACK_MIN_WIDTH = 400;
const SUB_BLOCKS_FALLBACK_MIN_HEIGHT = 300;
const DEFAULT_NEUTRAL_RGB = "var(--rgb-primary-text-color, 33, 33, 33)";

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

interface TrendAreaRun {
  low: boolean;
  points: TrendCanvasPoint[];
}

interface EnergySubBlockEntry {
  key: string;
  index: number;
  icon: string;
  iconStyle: Record<string, string>;
  label: string;
  value: number | null;
}

interface SubNodeConnectorSegment {
  left: number;
  top: number;
  width: number;
  height: number;
  node: "solar" | "home" | "grid" | "grid_secondary";
}

interface GridPlacement {
  col: number;
  row: number;
  colSpan?: number;
  rowSpan?: number;
}

interface GridBounds {
  minCol: number;
  maxCol: number;
  minRow: number;
  maxRow: number;
  cols: number;
  rows: number;
}

interface PowerPilzEnergyCardConfig extends LovelaceCardConfig {
  type: "custom:power-pilz-energy-card";
  name?: string;
  home_visible?: boolean;
  solar_visible?: boolean;
  grid_visible?: boolean;
  grid_secondary_visible?: boolean;
  battery_visible?: boolean;
  battery_secondary_visible?: boolean;
  battery_dual_alignment?: "center" | "left" | "right";
  home_entity?: string;
  consumption_entity?: string;
  solar_entity?: string;
  production_entity?: string;
  grid_entity?: string;
  grid_secondary_entity?: string;
  battery_entity?: string;
  battery_percentage_entity?: string;
  battery_secondary_entity?: string;
  battery_secondary_percentage_entity?: string;
  solar_sub_enabled?: boolean;
  solar_sub_entity?: string;
  solar_sub_label?: string;
  solar_sub_icon?: string;
  solar_sub_icon_color?: string | number[];
  home_sub_enabled?: boolean;
  home_sub_entity?: string;
  home_sub_label?: string;
  home_sub_icon?: string;
  home_sub_icon_color?: string | number[];
  grid_label?: string;
  grid_secondary_label?: string;
  solar_label?: string;
  home_label?: string;
  battery_label?: string;
  battery_secondary_label?: string;
  solar_icon?: string;
  grid_icon?: string;
  grid_secondary_icon?: string;
  home_icon?: string;
  battery_icon?: string;
  battery_secondary_icon?: string;
  core_icon?: string;
  solar_icon_color?: string | number[];
  grid_icon_color?: string | number[];
  grid_secondary_icon_color?: string | number[];
  home_icon_color?: string | number[];
  battery_icon_color?: string | number[];
  battery_secondary_icon_color?: string | number[];
  core_icon_color?: string | number[];
  solar_trend?: boolean;
  grid_trend?: boolean;
  grid_secondary_trend?: boolean;
  home_trend?: boolean;
  battery_trend?: boolean;
  battery_secondary_trend?: boolean;
  solar_trend_color?: string | number[];
  grid_trend_color?: string | number[];
  grid_secondary_trend_color?: string | number[];
  home_trend_color?: string | number[];
  battery_trend_color?: string | number[];
  battery_secondary_trend_color?: string | number[];
  battery_low_alert?: boolean;
  battery_low_threshold?: number;
  battery_secondary_low_alert?: boolean;
  battery_secondary_low_threshold?: number;
  flow_color?: string | number[];
  unit?: string;
  decimals?: number;
  details_navigation_path?: string;
  details_entity?: string;
  tap_action?: TapActionConfig;
}

@customElement("power-pilz-energy-card")
export class PowerPilzEnergyCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement("power-pilz-energy-card-editor") as LovelaceCardEditor;
  }

  public static async getStubConfig(hass?: HomeAssistant): Promise<PowerPilzEnergyCardConfig> {
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
      type: "custom:power-pilz-energy-card",
      name: "Energy Flow",
      home_visible: true,
      solar_visible: true,
      grid_visible: true,
      grid_secondary_visible: false,
      battery_visible: true,
      battery_secondary_visible: false,
      battery_dual_alignment: "center",
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

  @property({ type: Boolean })
  public preview = false;

  @property({ type: Boolean })
  public editMode = false;

  @state()
  private _config?: PowerPilzEnergyCardConfig;

  @state()
  private _trendSeries: Partial<Record<NodeKey, TrendPoint[]>> = {};

  @state()
  private _showSubBlocks = false;

  @state()
  private _subNodeConnectorSegments: SubNodeConnectorSegment[] = [];

  private _trendRefreshTimer?: number;
  private _trendRefreshInFlight = false;
  private _lastTrendRefresh = 0;
  private _trendCanvasRaf?: number;
  private _subNodeConnectorRaf?: number;
  private _trendResizeObserver?: ResizeObserver;
  private _liveRuntimeActive = false;
  private _trendDrawConfig: Partial<
    Record<NodeKey, { currentValue: number | null; color: string; threshold: number | null; thresholdColor: string }>
  > = {};
  private _canvasColorContext?: CanvasRenderingContext2D | null;

  public setConfig(config: PowerPilzEnergyCardConfig): void {
    const homeEntity = config.home_entity ?? config.consumption_entity ?? "sensor.dev_home_power";

    const decimals =
      typeof config.decimals === "number" && Number.isFinite(config.decimals)
        ? Math.min(3, Math.max(0, Math.round(config.decimals)))
        : DEFAULT_DECIMALS;

    this._config = {
      ...config,
      name: config.name ?? "Energy Flow",
      home_visible: config.home_visible ?? true,
      solar_visible: config.solar_visible ?? true,
      grid_visible: config.grid_visible ?? true,
      grid_secondary_visible: config.grid_secondary_visible ?? false,
      battery_visible: config.battery_visible ?? true,
      battery_secondary_visible: config.battery_secondary_visible ?? false,
      battery_dual_alignment: this.normalizeBatteryDualAlignment(config.battery_dual_alignment),
      home_entity: homeEntity,
      solar_entity: config.solar_entity ?? config.production_entity,
      solar_sub_enabled: config.solar_sub_enabled ?? false,
      solar_sub_label: config.solar_sub_label ?? "Solar Sub",
      solar_sub_icon: config.solar_sub_icon ?? "mdi:solar-power-variant",
      home_sub_enabled: config.home_sub_enabled ?? false,
      home_sub_label: config.home_sub_label ?? "Home Load",
      home_sub_icon: config.home_sub_icon ?? "mdi:flash",
      grid_label: config.grid_label ?? "Grid",
      grid_secondary_label: config.grid_secondary_label ?? "Grid 2",
      solar_label: config.solar_label ?? "Solar",
      home_label: config.home_label ?? "Home",
      battery_label: config.battery_label ?? "Battery",
      battery_secondary_label: config.battery_secondary_label ?? "Battery 2",
      solar_icon: config.solar_icon ?? "mdi:weather-sunny",
      grid_icon: config.grid_icon ?? "mdi:transmission-tower",
      grid_secondary_icon: config.grid_secondary_icon ?? "mdi:transmission-tower",
      home_icon: config.home_icon ?? "mdi:home-lightning-bolt",
      battery_secondary_icon: config.battery_secondary_icon ?? "mdi:battery-outline",
      core_icon: config.core_icon ?? "mdi:home",
      core_icon_color: config.core_icon_color,
      solar_trend: config.solar_trend ?? false,
      grid_trend: config.grid_trend ?? false,
      grid_secondary_trend: config.grid_secondary_trend ?? false,
      home_trend: config.home_trend ?? false,
      battery_trend: config.battery_trend ?? false,
      battery_secondary_trend: config.battery_secondary_trend ?? false,
      battery_low_alert: config.battery_low_alert ?? false,
      battery_low_threshold: this.normalizeBatteryThreshold(config.battery_low_threshold),
      battery_secondary_low_alert: config.battery_secondary_low_alert ?? false,
      battery_secondary_low_threshold: this.normalizeBatteryThreshold(config.battery_secondary_low_threshold),
      flow_color: config.flow_color,
      decimals
    };
  }

  public getCardSize(): number {
    return 4;
  }

  public getGridOptions(): LovelaceGridOptions {
    return {
      columns: 6,
      rows: 4,
      min_columns: 3,
      max_columns: 12,
      min_rows: 2,
      max_rows: 8
    };
  }

  public getLayoutOptions(): LovelaceLayoutOptions {
    return {
      grid_columns: 2,
      grid_rows: 4
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

    const homeVisible = config.home_visible !== false;
    const solarVisible = config.solar_visible !== false;
    const gridVisible = config.grid_visible !== false;
    const gridSecondaryVisible = gridVisible && config.grid_secondary_visible === true;
    const batteryVisible = config.battery_visible !== false;
    const batterySecondaryVisible = batteryVisible && config.battery_secondary_visible === true;
    const batteryDualAlignment = this.normalizeBatteryDualAlignment(config.battery_dual_alignment);

    const home = readNumber(this.hass, config.home_entity);
    const solar = solarVisible ? readNumber(this.hass, config.solar_entity) : null;
    const grid = gridVisible ? readNumber(this.hass, config.grid_entity) : null;
    const gridSecondary = gridSecondaryVisible ? readNumber(this.hass, config.grid_secondary_entity) : null;
    const battery = batteryVisible ? readNumber(this.hass, config.battery_entity) : null;
    const batteryPercentage = readNumber(this.hass, config.battery_percentage_entity);
    const batterySecondary = batterySecondaryVisible ? readNumber(this.hass, config.battery_secondary_entity) : null;
    const batterySecondaryPercentage = readNumber(this.hass, config.battery_secondary_percentage_entity);

    const fallbackUnit = config.unit ?? readUnit(this.hass, config.home_entity) ?? "kW";
    const solarUnit = config.unit ?? readUnit(this.hass, config.solar_entity) ?? fallbackUnit;
    const homeUnit = config.unit ?? readUnit(this.hass, config.home_entity) ?? fallbackUnit;
    const gridUnit = config.unit ?? readUnit(this.hass, config.grid_entity) ?? fallbackUnit;
    const gridSecondaryUnit = config.unit ?? readUnit(this.hass, config.grid_secondary_entity) ?? gridUnit;
    const batteryUnit = config.unit ?? readUnit(this.hass, config.battery_entity) ?? fallbackUnit;
    const batterySecondaryUnit = config.unit ?? readUnit(this.hass, config.battery_secondary_entity) ?? batteryUnit;

    const solarFlow = this.toUnidirectionalFlow(solar);
    const homeFlow = this.toUnidirectionalFlow(home);
    const gridFlow = this.toBidirectionalFlow(grid);
    const gridSecondaryFlow = this.toBidirectionalFlow(gridSecondary);
    const gridCombinedFlow = (grid === null && gridSecondary === null)
      ? "none"
      : this.toBidirectionalFlow((grid ?? 0) + (gridSecondary ?? 0));
    const batteryFlow = this.toBidirectionalFlow(battery);
    const batterySecondaryFlow = this.toBidirectionalFlow(batterySecondary);
    const batteryCombinedFlow = (battery === null && batterySecondary === null)
      ? "none"
      : this.toBidirectionalFlow((battery ?? 0) + (batterySecondary ?? 0));
    const tapAction = this.resolveTapAction(config);
    const interactive = !this.isEditorPreview() && tapAction.action !== "none";

    const solarIconStyle = this.iconColorStyle(config.solar_icon_color);
    const gridIconStyle = this.iconColorStyle(config.grid_icon_color);
    const gridSecondaryIconStyle = this.iconColorStyle(config.grid_secondary_icon_color);
    const homeIconStyle = this.iconColorStyle(config.home_icon_color);
    const coreIconStyle = this.iconShapeStyle(config.core_icon_color);
    const solarSubBlocks = solarVisible ? this.collectSubBlocks("solar", config) : [];
    const gridSubBlocks = gridVisible ? this.collectSubBlocks("grid", config) : [];
    const gridSecondarySubBlocks = gridSecondaryVisible ? this.collectSubBlocks("grid_secondary", config) : [];
    const homeSubBlocks = homeVisible ? this.collectSubBlocks("home", config) : [];
    const homeSubIndexes = new Set(homeSubBlocks.map((entry) => entry.index));
    const solarSubIndexes = new Set(solarSubBlocks.map((entry) => entry.index));
    const homeHas7And8 = homeSubIndexes.has(7) && homeSubIndexes.has(8);
    const homeHasAny5To8 = [5, 6, 7, 8].some((index) => homeSubIndexes.has(index));
    const solarHas1And2Only =
      solarSubIndexes.has(1)
      && solarSubIndexes.has(2)
      && !solarSubIndexes.has(3)
      && !solarSubIndexes.has(4);
    const solarHas3And4 = solarSubIndexes.has(3) && solarSubIndexes.has(4);
    const forceSolarSubnodesLeft =
      gridSecondaryVisible
      && (
        (solarHas1And2Only && homeHas7And8)
        || (solarHas3And4 && homeHasAny5To8)
      );
    const useDualGridSolarPlacement = gridSecondaryVisible && !forceSolarSubnodesLeft;
    const homeHasExtendedSubLayout = homeSubBlocks.some((entry) => entry.index >= 7);
    const homeSubPositions = this.homeSubPositions(homeHasExtendedSubLayout);
    const gridSubPositions = this.gridSubPositions(gridSecondaryVisible);
    const gridSecondarySubPositions = this.gridSecondarySubPositions();
    const solarSubPositions = this.solarSubPositions(
      homeHasExtendedSubLayout,
      useDualGridSolarPlacement,
      forceSolarSubnodesLeft
    );
    const visibleHomeSubBlocks = homeSubBlocks.filter((entry) => entry.index <= (homeHasExtendedSubLayout ? 8 : 6));
    const gridPlacementBase = gridVisible
      ? { col: 1, row: gridSecondaryVisible ? 2 : 3, colSpan: 2, rowSpan: 2 }
      : null;
    const gridSecondaryPlacementBase = gridSecondaryVisible
      ? { col: 1, row: 4, colSpan: 2, rowSpan: 2 }
      : null;
    const batteryPlacementBase = batteryVisible
      ? {
          col: batterySecondaryVisible
            ? (batteryDualAlignment === "center" ? 2 : 3)
            : 3,
          row: 5,
          colSpan: 2,
          rowSpan: 2
        }
      : null;
    const batterySecondaryPlacementBase = batterySecondaryVisible
      ? {
          col: batteryDualAlignment === "left"
            ? 1
            : batteryDualAlignment === "right"
              ? 5
              : 4,
          row: 5,
          colSpan: 2,
          rowSpan: 2
        }
      : null;
    const layoutBounds = this.computeGridBounds(
      homeVisible,
      solarVisible,
      gridVisible,
      gridSecondaryVisible,
      batteryVisible,
      batterySecondaryVisible,
      gridPlacementBase,
      gridSecondaryPlacementBase,
      batteryPlacementBase,
      batterySecondaryPlacementBase,
      solarSubBlocks,
      gridSubBlocks,
      gridSecondarySubBlocks,
      visibleHomeSubBlocks,
      solarSubPositions,
      gridSubPositions,
      gridSecondarySubPositions,
      homeSubPositions
    );
    const solarPlacement = solarVisible ? this.normalizePlacement({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }, layoutBounds) : null;
    const gridPlacement = gridPlacementBase ? this.normalizePlacement(gridPlacementBase, layoutBounds) : null;
    const gridSecondaryPlacement = gridSecondaryPlacementBase
      ? this.normalizePlacement(gridSecondaryPlacementBase, layoutBounds)
      : null;
    const homePlacement = homeVisible
      ? this.normalizePlacement({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }, layoutBounds)
      : null;
    const batteryPlacement = batteryPlacementBase ? this.normalizePlacement(batteryPlacementBase, layoutBounds) : null;
    const batterySecondaryPlacement = batterySecondaryPlacementBase
      ? this.normalizePlacement(batterySecondaryPlacementBase, layoutBounds)
      : null;
    const corePlacement = this.normalizePlacement({ col: 3, row: 3, colSpan: 2, rowSpan: 2 }, layoutBounds);
    const normalizedSolarSubPositions = this.normalizePositions(solarSubPositions, layoutBounds);
    const normalizedGridSubPositions = this.normalizePositions(gridSubPositions, layoutBounds);
    const normalizedGridSecondarySubPositions = this.normalizePositions(gridSecondarySubPositions, layoutBounds);
    const normalizedHomeSubPositions = this.normalizePositions(homeSubPositions, layoutBounds);

    const batteryLowThreshold = this.normalizeBatteryThreshold(config.battery_low_threshold);
    const batteryLowAlertEnabled = Boolean(config.battery_low_alert);
    const batterySecondaryLowThreshold = this.normalizeBatteryThreshold(config.battery_secondary_low_threshold);
    const batterySecondaryLowAlertEnabled = Boolean(config.battery_secondary_low_alert);
    const batteryIsLow = batteryLowAlertEnabled && batteryPercentage !== null && batteryPercentage <= batteryLowThreshold;
    const batteryIconStyle = this.iconColorStyle(batteryIsLow ? "red" : config.battery_icon_color);
    const batteryIcon = this.batteryIcon(batteryPercentage, battery, config.battery_icon);
    const batterySecondaryIsLow =
      batterySecondaryLowAlertEnabled
      && batterySecondaryPercentage !== null
      && batterySecondaryPercentage <= batterySecondaryLowThreshold;
    const batterySecondaryIconStyle = this.iconColorStyle(
      batterySecondaryIsLow ? "red" : config.battery_secondary_icon_color
    );
    const batterySecondaryIcon = this.batteryIcon(
      batterySecondaryPercentage,
      batterySecondary,
      config.battery_secondary_icon
    );

    const flowRgb = this.toRgbCss(config.flow_color) ?? DEFAULT_NEUTRAL_RGB;
    const flowStyle = { "--flow-color-rgb": flowRgb };

    const defaultTrendColor = this.resolveColor("purple");
    const solarTrendColor = this.resolveColor(config.solar_trend_color, defaultTrendColor);
    const gridTrendColor = this.resolveColor(config.grid_trend_color, defaultTrendColor);
    const gridSecondaryTrendColor = this.resolveColor(config.grid_secondary_trend_color, defaultTrendColor);
    const homeTrendColor = this.resolveColor(config.home_trend_color, defaultTrendColor);
    const batteryTrendColor = this.resolveColor(config.battery_trend_color, defaultTrendColor);
    const batterySecondaryTrendColor = this.resolveColor(config.battery_secondary_trend_color, defaultTrendColor);
    const batteryTrendAlertColor = this.resolveColor("red");
    const batteryTrendThreshold = batteryLowAlertEnabled
      && (Boolean(config.battery_percentage_entity) || batteryPercentage !== null)
      ? batteryLowThreshold
      : null;
    const batteryTrendValue = batteryPercentage ?? battery;
    const batterySecondaryTrendThreshold = batterySecondaryLowAlertEnabled
      && (Boolean(config.battery_secondary_percentage_entity) || batterySecondaryPercentage !== null)
      ? batterySecondaryLowThreshold
      : null;
    const batterySecondaryTrendValue = batterySecondaryPercentage ?? batterySecondary;

    const flowSegments = this.buildFlowSegments(
      homePlacement,
      corePlacement,
      solarPlacement,
      [
        ...(gridPlacement ? [{ placement: gridPlacement, direction: gridFlow }] : []),
        ...(gridSecondaryPlacement ? [{ placement: gridSecondaryPlacement, direction: gridSecondaryFlow }] : [])
      ],
      gridCombinedFlow,
      [
        ...(batteryPlacement ? [{ placement: batteryPlacement, direction: batteryFlow }] : []),
        ...(batterySecondaryPlacement ? [{ placement: batterySecondaryPlacement, direction: batterySecondaryFlow }] : [])
      ],
      batteryCombinedFlow,
      solarFlow,
      homeFlow,
      layoutBounds
    );
    return html`
      <ha-card
        class=${interactive ? "interactive" : ""}
        tabindex=${interactive ? 0 : -1}
        role=${interactive ? "button" : "article"}
        @click=${this.handleCardClick}
        @keydown=${this.handleCardKeyDown}
      >
        <div class="energy-flow-container">
          <div
            class="energy-grid"
            style=${styleMap({
              ...flowStyle,
              "--grid-columns": `${layoutBounds.cols}`,
              "--grid-rows": `${layoutBounds.rows}`,
              "--grid-aspect": `${layoutBounds.cols} / ${layoutBounds.rows}`
            })}
          >
            ${flowSegments.map((segment) =>
              this.renderFlowLine(segment.orientation, segment.direction, {
                ...(segment.orientation === "horizontal"
                  ? {
                      left: `${segment.left}%`,
                      top: `calc(${segment.top}% - (var(--flow-line-size) / 2))`,
                      width: `${segment.width}%`
                    }
                  : {
                      left: `calc(${segment.left}% - (var(--flow-line-size) / 2))`,
                      top: `${segment.top}%`,
                      height: `${segment.height}%`
                    })
              })
            )}
            ${this.renderSubNodeConnectors()}

            ${solarVisible && solarPlacement
              ? html`
                  <div
                    class="energy-value solar ${solar === null ? "missing" : ""}"
                    style=${styleMap(this.gridPlacementStyle(solarPlacement))}
                  >
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
                `
              : nothing}

            ${gridVisible && gridPlacement
              ? html`
                  <div
                    class="energy-value grid ${grid === null ? "missing" : ""}"
                    style=${styleMap(this.gridPlacementStyle(gridPlacement))}
                  >
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
                `
              : nothing}

            ${gridSecondaryVisible && gridSecondaryPlacement
              ? html`
                  <div
                    class="energy-value grid-secondary ${gridSecondary === null ? "missing" : ""}"
                    style=${styleMap(this.gridPlacementStyle(gridSecondaryPlacement))}
                  >
                    ${this.renderTrend(
                      "grid_secondary",
                      gridSecondary,
                      Boolean(config.grid_secondary_trend),
                      gridSecondaryTrendColor,
                      null,
                      ""
                    )}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${config.grid_secondary_icon ?? "mdi:transmission-tower"}
                        style=${styleMap(gridSecondaryIconStyle)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(gridSecondary, gridSecondaryUnit, decimals)}</div>
                      <div class="energy-label">${config.grid_secondary_label}</div>
                    </div>
                  </div>
                `
              : nothing}

            ${homeVisible && homePlacement
              ? html`
                  <div
                    class="energy-value home ${home === null ? "missing" : ""}"
                    style=${styleMap(this.gridPlacementStyle(homePlacement))}
                  >
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
                `
              : nothing}

            ${this._showSubBlocks
              ? this.renderSubNodes("solar", solarSubBlocks, normalizedSolarSubPositions, decimals)
              : nothing}
            ${this._showSubBlocks
              ? this.renderSubNodes("grid", gridSubBlocks, normalizedGridSubPositions, decimals)
              : nothing}
            ${this._showSubBlocks
              ? this.renderSubNodes("grid_secondary", gridSecondarySubBlocks, normalizedGridSecondarySubPositions, decimals)
              : nothing}
            ${this._showSubBlocks
              ? this.renderSubNodes("home", visibleHomeSubBlocks, normalizedHomeSubPositions, decimals)
              : nothing}

            ${batteryVisible && batteryPlacement
              ? html`
                  <div
                    class="energy-value battery ${battery === null ? "missing" : ""}"
                    style=${styleMap(this.gridPlacementStyle(batteryPlacement))}
                  >
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
                `
              : nothing}

            ${batterySecondaryVisible && batterySecondaryPlacement
              ? html`
                  <div
                    class="energy-value battery-secondary ${batterySecondary === null ? "missing" : ""}"
                    style=${styleMap(this.gridPlacementStyle(batterySecondaryPlacement))}
                  >
                    ${this.renderTrend(
                      "battery_secondary",
                      batterySecondaryTrendValue,
                      Boolean(config.battery_secondary_trend),
                      batterySecondaryTrendColor,
                      batterySecondaryTrendThreshold,
                      batteryTrendAlertColor
                    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon
                          class="energy-icon"
                          .icon=${batterySecondaryIcon}
                          style=${styleMap(batterySecondaryIconStyle)}
                        ></ha-icon>
                        ${batterySecondaryPercentage !== null
                          ? html`
                              <div class="battery-percentage ${batterySecondaryIsLow ? "alert" : ""}">
                                ${this.formatBatteryPercentage(batterySecondaryPercentage)}
                              </div>
                            `
                          : nothing}
                      </div>
                      <div class="energy-number">${this.formatValue(batterySecondary, batterySecondaryUnit, decimals)}</div>
                      <div class="energy-label">${config.battery_secondary_label}</div>
                    </div>
                  </div>
                `
              : nothing}

            <div class="home-core" style=${styleMap(this.gridPlacementStyle(corePlacement))}>
              <div class="home-core-icon" style=${styleMap(coreIconStyle)}>
                <ha-icon .icon=${config.core_icon ?? "mdi:home"}></ha-icon>
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private renderFlowLine(
    orientation: "horizontal" | "vertical",
    direction: FlowDirection,
    style: Record<string, string>
  ): TemplateResult {
    const className =
      direction === "none"
        ? `flow-line dynamic ${orientation}`
        : `flow-line dynamic ${orientation} active ${direction}`;
    return html`<div class=${className} style=${styleMap(style)} aria-hidden="true"></div>`;
  }

  private renderSubNodeConnectors(): TemplateResult | typeof nothing {
    if (!this._showSubBlocks || this._subNodeConnectorSegments.length === 0) {
      return nothing;
    }

    return html`
      <div class="subnode-connectors" aria-hidden="true">
        ${this._subNodeConnectorSegments.map((segment) =>
          html`
            <div
              class="subnode-connector-segment ${segment.node}"
              style=${styleMap({
                left: `${segment.left}px`,
                top: `${segment.top}px`,
                width: `${segment.width}px`,
                height: `${segment.height}px`
              })}
            ></div>
          `
        )}
      </div>
    `;
  }

  private collectSubBlocks(
    node: "solar" | "home" | "grid" | "grid_secondary",
    config: PowerPilzEnergyCardConfig
  ): EnergySubBlockEntry[] {
    if (!this.hass) {
      return [];
    }

    const entries: EnergySubBlockEntry[] = [];
    const defaultIcon = node === "solar"
      ? "mdi:solar-power-variant"
      : node === "home"
        ? "mdi:flash"
        : "mdi:transmission-tower";
    const defaultLabelPrefix = node === "solar"
      ? "Solar"
      : node === "home"
        ? "Home"
        : node === "grid"
          ? "Grid"
          : "Grid 2";
    const slotCount = node === "solar"
      ? SOLAR_SUB_BLOCK_SLOT_COUNT
      : node === "home"
        ? HOME_SUB_BLOCK_SLOT_COUNT
        : GRID_SUB_BLOCK_SLOT_COUNT;

    for (let index = 1; index <= slotCount; index += 1) {
      const enabled = config[`${node}_sub_${index}_enabled`] === true;
      const entityId = this.readConfigString(config[`${node}_sub_${index}_entity`]);
      if (!enabled || !entityId) {
        continue;
      }

      entries.push({
        key: `${node}_${index}`,
        index,
        icon: this.readConfigString(config[`${node}_sub_${index}_icon`]) ?? defaultIcon,
        iconStyle: this.iconColorStyle(config[`${node}_sub_${index}_icon_color`] as string | number[] | undefined),
        label: this.readConfigString(config[`${node}_sub_${index}_label`]) ?? `${defaultLabelPrefix} ${index}`,
        value: readNumber(this.hass, entityId)
      });
    }

    if (entries.length > 0) {
      return entries;
    }

    if (node !== "solar" && node !== "home") {
      return [];
    }

    const legacyEnabled = node === "solar" ? Boolean(config.solar_sub_enabled) : Boolean(config.home_sub_enabled);
    const legacyEntity = node === "solar" ? config.solar_sub_entity : config.home_sub_entity;
    if (!legacyEnabled || !legacyEntity) {
      return [];
    }

    const legacyIcon = node === "solar"
      ? config.solar_sub_icon ?? defaultIcon
      : config.home_sub_icon ?? defaultIcon;
    const legacyColor = node === "solar"
      ? config.solar_sub_icon_color
      : config.home_sub_icon_color;
    const legacyLabel = node === "solar"
      ? config.solar_sub_label ?? "Solar Sub"
      : config.home_sub_label ?? "Home Load";

    return [
      {
        key: `${node}_legacy`,
        index: 1,
        icon: legacyIcon,
        iconStyle: this.iconColorStyle(legacyColor),
        label: legacyLabel,
        value: readNumber(this.hass, legacyEntity)
      }
    ];
  }

  private solarSubPositions(
    homeHasExtendedSubLayout: boolean,
    useDualGridLayout = false,
    forceAllLeft = false
  ): Record<number, { row: number; col: number }> {
    if (useDualGridLayout) {
      return {
        1: { row: 1, col: 5 },
        2: { row: 1, col: 6 },
        3: { row: 1, col: 2 },
        4: { row: 1, col: 1 }
      };
    }

    return (homeHasExtendedSubLayout || forceAllLeft)
      ? {
          1: { row: 1, col: 2 },
          2: { row: 1, col: 1 },
          3: { row: 2, col: 2 },
          4: { row: 2, col: 1 }
        }
      : {
          1: { row: 1, col: 5 },
          2: { row: 1, col: 6 },
          3: { row: 1, col: 2 },
          4: { row: 1, col: 1 }
        };
  }

  private homeSubPositions(homeHasExtendedSubLayout: boolean): Record<number, { row: number; col: number }> {
    return homeHasExtendedSubLayout
      ? {
          1: { row: 5, col: 6 },
          2: { row: 5, col: 5 },
          3: { row: 6, col: 6 },
          4: { row: 6, col: 5 },
          5: { row: 2, col: 6 },
          6: { row: 2, col: 5 },
          7: { row: 1, col: 6 },
          8: { row: 1, col: 5 }
        }
      : {
          1: { row: 5, col: 6 },
          2: { row: 5, col: 5 },
          3: { row: 6, col: 6 },
          4: { row: 6, col: 5 },
          5: { row: 2, col: 6 },
          6: { row: 2, col: 5 }
        };
  }

  private gridSubPositions(gridSecondaryVisible: boolean): Record<number, { row: number; col: number }> {
    return gridSecondaryVisible
      ? {
          1: { row: 1, col: 1 },
          2: { row: 1, col: 2 }
        }
      : {
          1: { row: 5, col: 1 },
          2: { row: 5, col: 2 }
        };
  }

  private gridSecondarySubPositions(): Record<number, { row: number; col: number }> {
    return {
      1: { row: 6, col: 1 },
      2: { row: 6, col: 2 }
    };
  }

  private gridPlacementStyle(placement: GridPlacement): Record<string, string> {
    const colSpan = placement.colSpan ?? 1;
    const rowSpan = placement.rowSpan ?? 1;
    return {
      "grid-column": `${placement.col} / span ${colSpan}`,
      "grid-row": `${placement.row} / span ${rowSpan}`
    };
  }

  private normalizePlacement(placement: GridPlacement, bounds: GridBounds): GridPlacement {
    return {
      col: placement.col - bounds.minCol + 1,
      row: placement.row - bounds.minRow + 1,
      colSpan: placement.colSpan ?? 1,
      rowSpan: placement.rowSpan ?? 1
    };
  }

  private normalizePositions(
    positions: Record<number, { row: number; col: number }>,
    bounds: GridBounds
  ): Record<number, { row: number; col: number }> {
    const next: Record<number, { row: number; col: number }> = {};
    Object.entries(positions).forEach(([key, position]) => {
      next[Number(key)] = {
        row: position.row - bounds.minRow + 1,
        col: position.col - bounds.minCol + 1
      };
    });
    return next;
  }

  private computeGridBounds(
    homeVisible: boolean,
    solarVisible: boolean,
    gridVisible: boolean,
    gridSecondaryVisible: boolean,
    batteryVisible: boolean,
    batterySecondaryVisible: boolean,
    gridPlacementBase: GridPlacement | null,
    gridSecondaryPlacementBase: GridPlacement | null,
    batteryPlacementBase: GridPlacement | null,
    batterySecondaryPlacementBase: GridPlacement | null,
    solarSubBlocks: EnergySubBlockEntry[],
    gridSubBlocks: EnergySubBlockEntry[],
    gridSecondarySubBlocks: EnergySubBlockEntry[],
    homeSubBlocks: EnergySubBlockEntry[],
    solarSubPositions: Record<number, { row: number; col: number }>,
    gridSubPositions: Record<number, { row: number; col: number }>,
    gridSecondarySubPositions: Record<number, { row: number; col: number }>,
    homeSubPositions: Record<number, { row: number; col: number }>
  ): GridBounds {
    const placements: GridPlacement[] = [{ col: 3, row: 3, colSpan: 2, rowSpan: 2 }];

    if (homeVisible) {
      placements.push({ col: 5, row: 3, colSpan: 2, rowSpan: 2 });
    }

    if (solarVisible) {
      placements.push({ col: 3, row: 1, colSpan: 2, rowSpan: 2 });
    }
    if (gridVisible && gridPlacementBase) {
      placements.push(gridPlacementBase);
    }
    if (gridSecondaryVisible && gridSecondaryPlacementBase) {
      placements.push(gridSecondaryPlacementBase);
    }
    if (batteryVisible && batteryPlacementBase) {
      placements.push(batteryPlacementBase);
    }
    if (batterySecondaryVisible && batterySecondaryPlacementBase) {
      placements.push(batterySecondaryPlacementBase);
    }

    solarSubBlocks.forEach((entry) => {
      const position = solarSubPositions[entry.index];
      if (!position) {
        return;
      }
      placements.push({ col: position.col, row: position.row, colSpan: 1, rowSpan: 1 });
    });

    gridSubBlocks.forEach((entry) => {
      const position = gridSubPositions[entry.index];
      if (!position) {
        return;
      }
      placements.push({ col: position.col, row: position.row, colSpan: 1, rowSpan: 1 });
    });

    gridSecondarySubBlocks.forEach((entry) => {
      const position = gridSecondarySubPositions[entry.index];
      if (!position) {
        return;
      }
      placements.push({ col: position.col, row: position.row, colSpan: 1, rowSpan: 1 });
    });

    homeSubBlocks.forEach((entry) => {
      const position = homeSubPositions[entry.index];
      if (!position) {
        return;
      }
      placements.push({ col: position.col, row: position.row, colSpan: 1, rowSpan: 1 });
    });

    const minCol = Math.min(...placements.map((placement) => placement.col));
    const maxCol = Math.max(...placements.map((placement) => placement.col + (placement.colSpan ?? 1) - 1));
    const minRow = Math.min(...placements.map((placement) => placement.row));
    const maxRow = Math.max(...placements.map((placement) => placement.row + (placement.rowSpan ?? 1) - 1));
    return {
      minCol,
      maxCol,
      minRow,
      maxRow,
      cols: maxCol - minCol + 1,
      rows: maxRow - minRow + 1
    };
  }

  private placementCenter(placement: GridPlacement, bounds: GridBounds): { x: number; y: number } {
    const colSpan = placement.colSpan ?? 1;
    const rowSpan = placement.rowSpan ?? 1;
    return {
      x: (((placement.col - 1) + (colSpan / 2)) / bounds.cols) * 100,
      y: (((placement.row - 1) + (rowSpan / 2)) / bounds.rows) * 100
    };
  }

  private buildFlowSegments(
    homePlacement: GridPlacement | null,
    corePlacement: GridPlacement,
    solarPlacement: GridPlacement | null,
    gridPlacements: Array<{ placement: GridPlacement; direction: FlowDirection }>,
    gridTrunkFlow: FlowDirection,
    batteryPlacements: Array<{ placement: GridPlacement; direction: FlowDirection }>,
    batteryTrunkFlow: FlowDirection,
    solarFlow: FlowDirection,
    homeFlow: FlowDirection,
    bounds: GridBounds
  ): Array<{
    orientation: "horizontal" | "vertical";
    direction: FlowDirection;
    left: number;
    top: number;
    width: number;
    height: number;
  }> {
    const coreCenter = this.placementCenter(corePlacement, bounds);
    const segments: Array<{
      orientation: "horizontal" | "vertical";
      direction: FlowDirection;
      left: number;
      top: number;
      width: number;
      height: number;
    }> = [];

    const horizontal = (x1: number, x2: number, y: number, direction: FlowDirection): void => {
      const left = Math.min(x1, x2);
      const width = Math.abs(x2 - x1);
      if (width <= EPSILON) {
        return;
      }
      segments.push({
        orientation: "horizontal",
        direction,
        left,
        top: y,
        width,
        height: 0
      });
    };

    const vertical = (y1: number, y2: number, x: number, direction: FlowDirection): void => {
      const top = Math.min(y1, y2);
      const height = Math.abs(y2 - y1);
      if (height <= EPSILON) {
        return;
      }
      segments.push({
        orientation: "vertical",
        direction,
        left: x,
        top,
        width: 0,
        height
      });
    };

    if (homePlacement) {
      const homeCenter = this.placementCenter(homePlacement, bounds);
      horizontal(coreCenter.x, homeCenter.x, coreCenter.y, homeFlow);
    }

    if (solarPlacement) {
      const solarCenter = this.placementCenter(solarPlacement, bounds);
      vertical(solarCenter.y, coreCenter.y, coreCenter.x, solarFlow);
    }

    if (gridPlacements.length === 1) {
      const [{ placement, direction }] = gridPlacements;
      const gridCenter = this.placementCenter(placement, bounds);
      horizontal(gridCenter.x, coreCenter.x, coreCenter.y, direction);
    } else if (gridPlacements.length >= 2) {
      const centers = gridPlacements
        .map((entry) => ({
          direction: entry.direction,
          center: this.placementCenter(entry.placement, bounds)
        }))
        .sort((a, b) => a.center.y - b.center.y);
      const leftMostX = Math.min(...centers.map((entry) => entry.center.x));
      const splitX = coreCenter.x - ((coreCenter.x - leftMostX) * 0.5);

      horizontal(coreCenter.x, splitX, coreCenter.y, gridTrunkFlow);
      centers.forEach((entry) => {
        const verticalDirection = entry.center.y > coreCenter.y + EPSILON
          ? this.reverseFlowDirection(entry.direction)
          : entry.direction;
        vertical(coreCenter.y, entry.center.y, splitX, verticalDirection);
        horizontal(entry.center.x, splitX, entry.center.y, entry.direction);
      });
    }

    if (batteryPlacements.length === 1) {
      const [{ placement, direction }] = batteryPlacements;
      const batteryCenter = this.placementCenter(placement, bounds);
      vertical(coreCenter.y, batteryCenter.y, coreCenter.x, direction);
    } else if (batteryPlacements.length >= 2) {
      const entries = batteryPlacements
        .map((entry) => ({
          placement: entry.placement,
          direction: entry.direction,
          center: this.placementCenter(entry.placement, bounds)
        }))
        .sort((a, b) => a.center.y - b.center.y);
      const topEdgeY = Math.min(
        ...entries.map((entry) => (((entry.placement.row - 1) / bounds.rows) * 100))
      );
      const splitY = Math.max(coreCenter.y + EPSILON, topEdgeY);

      vertical(coreCenter.y, splitY, coreCenter.x, batteryTrunkFlow);
      entries.forEach((entry) => {
        horizontal(coreCenter.x, entry.center.x, splitY, entry.direction);
        vertical(splitY, entry.center.y, entry.center.x, entry.direction);
      });
    }

    return segments;
  }

  private renderSubNodes(
    node: "solar" | "home" | "grid" | "grid_secondary",
    entries: EnergySubBlockEntry[],
    positions: Record<number, { row: number; col: number }>,
    decimals: number
  ): TemplateResult | typeof nothing {
    if (entries.length === 0) {
      return nothing;
    }

    return html`
      ${entries.map((entry) => {
          const position = positions[entry.index];
          if (!position) {
            return nothing;
          }

          const blockStyle = {
            "grid-column": `${position.col}`,
            "grid-row": `${position.row}`
          };

          return html`
            <div
              class="energy-sub-value ${node}-sub sub-col-${position.col} ${entry.value === null ? "missing" : ""}"
              data-key=${entry.key}
              style=${styleMap(blockStyle)}
            >
              <div class="energy-sub-content">
                <ha-icon class="energy-sub-icon" .icon=${entry.icon} style=${styleMap(entry.iconStyle)}></ha-icon>
                <div class="energy-sub-number">${this.formatValue(entry.value, "kWh", decimals)}</div>
                <div class="energy-sub-label">${entry.label}</div>
              </div>
            </div>
          `;
        })}
    `;
  }

  private readConfigString(value: unknown): string | undefined {
    if (typeof value !== "string") {
      return undefined;
    }

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
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
    return toTrendCanvasPoints(points, width, height);
  }

  private updateSubBlockVisibility(): void {
    const grid = this.renderRoot.querySelector<HTMLElement>(".energy-grid");
    if (!grid) {
      if (this._showSubBlocks) {
        this._showSubBlocks = false;
      }
      return;
    }

    const columns = this.findLayoutSpan("column");
    const rows = this.findLayoutSpan("row");
    const shouldShow =
      columns !== null
      && rows !== null
      && columns >= SUB_BLOCKS_MIN_COLUMNS
      && rows >= SUB_BLOCKS_MIN_ROWS;
    const fallbackRect = grid.getBoundingClientRect();
    const fallbackShouldShow =
      fallbackRect.width >= SUB_BLOCKS_FALLBACK_MIN_WIDTH
      && fallbackRect.height >= SUB_BLOCKS_FALLBACK_MIN_HEIGHT;
    const resolvedShouldShow = (columns !== null && rows !== null) ? shouldShow : fallbackShouldShow;

    if (resolvedShouldShow !== this._showSubBlocks) {
      this._showSubBlocks = resolvedShouldShow;
    }
  }

  private findLayoutSpan(axis: "row" | "column"): number | null {
    let node: HTMLElement | null = this;
    while (node) {
      const inlineSpan = this.parseGridSpanCandidates(
        axis === "row"
          ? [node.style.gridRowStart, node.style.gridRowEnd, node.style.gridRow]
          : [node.style.gridColumnStart, node.style.gridColumnEnd, node.style.gridColumn]
      );
      if (inlineSpan !== null) {
        return inlineSpan;
      }

      const computed = getComputedStyle(node);
      const computedSpan = this.parseGridSpanCandidates(
        axis === "row"
          ? [computed.gridRowStart, computed.gridRowEnd, computed.gridRow]
          : [computed.gridColumnStart, computed.gridColumnEnd, computed.gridColumn]
      );
      if (computedSpan !== null) {
        return computedSpan;
      }

      node = node.parentElement;
    }
    return null;
  }

  private parseGridSpan(value: string | null | undefined): number | null {
    if (!value) {
      return null;
    }
    const match = value.match(/span\s+(\d+)/i);
    if (!match) {
      return null;
    }
    const span = Number.parseInt(match[1], 10);
    return Number.isFinite(span) && span > 0 ? span : null;
  }

  private parseGridSpanCandidates(values: Array<string | null | undefined>): number | null {
    for (const value of values) {
      const parsed = this.parseGridSpan(value);
      if (parsed !== null) {
        return parsed;
      }
    }
    return null;
  }

  private scheduleSubNodeConnectorDraw(): void {
    if (this._subNodeConnectorRaf !== undefined) {
      return;
    }

    this._subNodeConnectorRaf = window.requestAnimationFrame(() => {
      this._subNodeConnectorRaf = undefined;
      this.drawSubNodeConnectors();
    });
  }

  private drawSubNodeConnectors(): void {
    if (!this._showSubBlocks) {
      if (this._subNodeConnectorSegments.length > 0) {
        this._subNodeConnectorSegments = [];
      }
      return;
    }

    const grid = this.renderRoot.querySelector<HTMLElement>(".energy-grid");
    const homeNode = this.renderRoot.querySelector<HTMLElement>(".energy-value.home");
    const solarNode = this.renderRoot.querySelector<HTMLElement>(".energy-value.solar");
    const gridNode = this.renderRoot.querySelector<HTMLElement>(".energy-value.grid");
    const gridSecondaryNode = this.renderRoot.querySelector<HTMLElement>(".energy-value.grid-secondary");
    if (!grid) {
      if (this._subNodeConnectorSegments.length > 0) {
        this._subNodeConnectorSegments = [];
      }
      return;
    }

    const gridRect = grid.getBoundingClientRect();
    const homeRect = homeNode?.getBoundingClientRect();
    const solarRect = solarNode?.getBoundingClientRect();
    const gridNodeRect = gridNode?.getBoundingClientRect();
    const gridSecondaryNodeRect = gridSecondaryNode?.getBoundingClientRect();
    const homeCenterX = homeRect ? homeRect.left + (homeRect.width / 2) : 0;
    const solarCenterY = solarRect ? solarRect.top + (solarRect.height / 2) : 0;
    const gridCenterX = gridNodeRect ? gridNodeRect.left + (gridNodeRect.width / 2) : 0;
    const gridSecondaryCenterX = gridSecondaryNodeRect ? gridSecondaryNodeRect.left + (gridSecondaryNodeRect.width / 2) : 0;

    const toLocalX = (x: number): number => x - gridRect.left;
    const toLocalY = (y: number): number => y - gridRect.top;
    const round = (value: number): number => Math.round(value * 10) / 10;
    const segments: SubNodeConnectorSegment[] = [];

    const pushHorizontal = (
      x1: number,
      x2: number,
      y: number,
      node: "solar" | "home" | "grid" | "grid_secondary"
    ): void => {
      const left = Math.min(x1, x2);
      const width = Math.abs(x2 - x1);
      if (width <= 0.5) {
        return;
      }
      segments.push({
        node,
        left: round(left),
        top: round(y - 1),
        width: round(width),
        height: 2
      });
    };

    const pushVertical = (
      y1: number,
      y2: number,
      x: number,
      node: "solar" | "home" | "grid" | "grid_secondary"
    ): void => {
      const top = Math.min(y1, y2);
      const height = Math.abs(y2 - y1);
      if (height <= 0.5) {
        return;
      }
      segments.push({
        node,
        left: round(x - 1),
        top: round(top),
        width: 2,
        height: round(height)
      });
    };

    if (homeRect) {
      this.renderRoot.querySelectorAll<HTMLElement>(".energy-sub-value.home-sub").forEach((subNode) => {
        const rect = subNode.getBoundingClientRect();
        const centerY = rect.top + (rect.height / 2);
        const startX = (rect.left + (rect.width / 2)) < homeCenterX ? rect.right : rect.left;
        const startY = centerY;
        const endY = centerY < homeRect.top
          ? homeRect.top
          : centerY > homeRect.bottom
            ? homeRect.bottom
            : centerY;
        const x = toLocalX(homeCenterX);
        const y1 = toLocalY(startY);
        const y2 = toLocalY(endY);
        const sx = toLocalX(startX);
        pushHorizontal(sx, x, y1, "home");
        pushVertical(y1, y2, x, "home");
      });
    }

    if (solarRect) {
      this.renderRoot.querySelectorAll<HTMLElement>(".energy-sub-value.solar-sub").forEach((subNode) => {
        const rect = subNode.getBoundingClientRect();
        const centerX = rect.left + (rect.width / 2);
        const startY = (rect.top + (rect.height / 2)) < solarCenterY ? rect.bottom : rect.top;
        const startX = centerX;
        const endX = centerX < solarRect.left
          ? solarRect.left
          : centerX > solarRect.right
            ? solarRect.right
            : centerX;
        const y = toLocalY(solarCenterY);
        const x1 = toLocalX(startX);
        const x2 = toLocalX(endX);
        const sy = toLocalY(startY);
        pushVertical(sy, y, x1, "solar");
        pushHorizontal(x1, x2, y, "solar");
      });
    }

    if (gridNodeRect) {
      this.renderRoot.querySelectorAll<HTMLElement>(".energy-sub-value.grid-sub").forEach((subNode) => {
        const rect = subNode.getBoundingClientRect();
        const centerY = rect.top + (rect.height / 2);
        const startX = (rect.left + (rect.width / 2)) < gridCenterX ? rect.right : rect.left;
        const startY = centerY;
        const endY = centerY < gridNodeRect.top
          ? gridNodeRect.top
          : centerY > gridNodeRect.bottom
            ? gridNodeRect.bottom
            : centerY;
        const x = toLocalX(gridCenterX);
        const y1 = toLocalY(startY);
        const y2 = toLocalY(endY);
        const sx = toLocalX(startX);
        pushHorizontal(sx, x, y1, "grid");
        pushVertical(y1, y2, x, "grid");
      });
    }

    if (gridSecondaryNodeRect) {
      this.renderRoot.querySelectorAll<HTMLElement>(".energy-sub-value.grid_secondary-sub").forEach((subNode) => {
        const rect = subNode.getBoundingClientRect();
        const centerY = rect.top + (rect.height / 2);
        const startX = (rect.left + (rect.width / 2)) < gridSecondaryCenterX ? rect.right : rect.left;
        const startY = centerY;
        const endY = centerY < gridSecondaryNodeRect.top
          ? gridSecondaryNodeRect.top
          : centerY > gridSecondaryNodeRect.bottom
            ? gridSecondaryNodeRect.bottom
            : centerY;
        const x = toLocalX(gridSecondaryCenterX);
        const y1 = toLocalY(startY);
        const y2 = toLocalY(endY);
        const sx = toLocalX(startX);
        pushHorizontal(sx, x, y1, "grid_secondary");
        pushVertical(y1, y2, x, "grid_secondary");
      });
    }

    const same =
      segments.length === this._subNodeConnectorSegments.length
      && segments.every((segment, index) =>
        segment.node === this._subNodeConnectorSegments[index]?.node
        && segment.left === this._subNodeConnectorSegments[index]?.left
        && segment.top === this._subNodeConnectorSegments[index]?.top
        && segment.width === this._subNodeConnectorSegments[index]?.width
        && segment.height === this._subNodeConnectorSegments[index]?.height
      );
    if (!same) {
      this._subNodeConnectorSegments = segments;
    }
  }

  private syncTrendResizeObserver(): void {
    if (typeof ResizeObserver === "undefined") {
      return;
    }

    if (!this._trendResizeObserver) {
      this._trendResizeObserver = new ResizeObserver(() => {
        this.updateSubBlockVisibility();
        this.scheduleSubNodeConnectorDraw();
        this.scheduleTrendCanvasDraw();
      });
    }

    this._trendResizeObserver.disconnect();
    const grid = this.renderRoot.querySelector<HTMLElement>(".energy-grid");
    if (grid) {
      this._trendResizeObserver.observe(grid);
    }
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
      this.drawTrendArea(
        area.ctx,
        areaPoints,
        drawConfig.color,
        area.height,
        drawConfig.threshold,
        drawConfig.thresholdColor
      );
      this.drawTrendLine(line.ctx, linePoints, drawConfig.color, drawConfig.threshold, drawConfig.thresholdColor);
    });
  }

  private collectTrendCanvases(selector: string): Map<NodeKey, HTMLCanvasElement> {
    const canvases = new Map<NodeKey, HTMLCanvasElement>();

    this.renderRoot.querySelectorAll<HTMLCanvasElement>(selector).forEach((canvas) => {
      const node = canvas.dataset.node;
      if (
        !node
        || (
          node !== "solar"
          && node !== "grid"
          && node !== "grid_secondary"
          && node !== "home"
          && node !== "battery"
          && node !== "battery_secondary"
        )
      ) {
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
    height: number,
    threshold: number | null,
    thresholdColor: string
  ): void {
    if (points.length < 2) {
      return;
    }

    const normalColor = this.resolveCanvasColor(color);
    if (threshold === null) {
      this.fillTrendAreaRun(ctx, points, normalColor, height);
      return;
    }

    const lowColor = this.resolveCanvasColor(thresholdColor);
    const segments = this.buildThresholdTrendSegments(points, threshold);
    const runs = this.buildAreaRunsFromSegments(segments);
    runs.forEach((run) => {
      this.fillTrendAreaRun(ctx, run.points, run.low ? lowColor : normalColor, height);
    });
  }

  private buildAreaRunsFromSegments(segments: TrendCanvasSegment[]): TrendAreaRun[] {
    const runs: TrendAreaRun[] = [];

    for (const segment of segments) {
      if (runs.length === 0) {
        runs.push({
          low: segment.low,
          points: [segment.start, segment.end]
        });
        continue;
      }

      const current = runs[runs.length - 1];
      const currentLast = current.points[current.points.length - 1];
      const startsAtCurrentEnd =
        Math.abs(currentLast.x - segment.start.x) <= 0.01
        && Math.abs(currentLast.y - segment.start.y) <= 0.01;

      if (current.low === segment.low && startsAtCurrentEnd) {
        current.points.push(segment.end);
      } else {
        runs.push({
          low: segment.low,
          points: [segment.start, segment.end]
        });
      }
    }

    return runs;
  }

  private fillTrendAreaRun(
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
    const minY = Math.min(...points.map((point) => point.y));
    const gradient = ctx.createLinearGradient(0, minY, 0, height);
    gradient.addColorStop(0, this.withAlpha(color, 0.24));
    gradient.addColorStop(1, this.withAlpha(color, 0));

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
      this.strokeTrendPolyline(ctx, points, normalColor, 1.5);
      return;
    }

    const segments = this.buildThresholdTrendSegments(points, threshold);
    segments.forEach((segment) => {
      this.strokeTrendSegment(ctx, segment.start, segment.end, segment.low ? lowColor : normalColor, 1.5);
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
    this.startLiveRuntime(true);
    if (!this.shouldRunLiveRuntime()) {
      void this.updateComplete.then(() => {
        this.updateSubBlockVisibility();
        this.scheduleSubNodeConnectorDraw();
        this.scheduleTrendCanvasDraw();
      });
    }
  }

  public disconnectedCallback(): void {
    this.stopLiveRuntime();
    super.disconnectedCallback();
  }

  protected updated(changedProps: Map<string, unknown>): void {
    if (changedProps.has("preview") || changedProps.has("editMode")) {
      if (this.shouldRunLiveRuntime()) {
        this.startLiveRuntime(true);
      } else {
        this.stopLiveRuntime();
      }
    }

    if (this.shouldRunLiveRuntime()) {
      if (changedProps.has("_config")) {
        this.maybeRefreshTrendHistory(true);
      } else if (changedProps.has("hass")) {
        this.maybeRefreshTrendHistory();
      }
      this.syncTrendResizeObserver();
    } else if (this._trendResizeObserver) {
      this._trendResizeObserver.disconnect();
    }

    this.updateSubBlockVisibility();
    this.scheduleSubNodeConnectorDraw();
    this.scheduleTrendCanvasDraw();
  }

  private maybeRefreshTrendHistory(force = false): void {
    if (!this.shouldRunLiveRuntime()) {
      return;
    }

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

  private isEditorPreview(): boolean {
    return this.preview || this.editMode || Boolean(this.closest("hui-card-preview"));
  }

  private shouldRunLiveRuntime(): boolean {
    return !this.isEditorPreview();
  }

  private startLiveRuntime(forceRefresh = false): void {
    if (!this.shouldRunLiveRuntime() || this._liveRuntimeActive) {
      return;
    }

    this._liveRuntimeActive = true;
    this.maybeRefreshTrendHistory(forceRefresh);
    this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, TREND_REFRESH_MS);
    void this.updateComplete.then(() => {
      if (!this._liveRuntimeActive) {
        return;
      }
      this.syncTrendResizeObserver();
      this.updateSubBlockVisibility();
      this.scheduleSubNodeConnectorDraw();
      this.scheduleTrendCanvasDraw();
    });
  }

  private stopLiveRuntime(): void {
    this._liveRuntimeActive = false;
    if (this._trendRefreshTimer !== undefined) {
      window.clearInterval(this._trendRefreshTimer);
      this._trendRefreshTimer = undefined;
    }
    if (this._trendCanvasRaf !== undefined) {
      window.cancelAnimationFrame(this._trendCanvasRaf);
      this._trendCanvasRaf = undefined;
    }
    if (this._subNodeConnectorRaf !== undefined) {
      window.cancelAnimationFrame(this._subNodeConnectorRaf);
      this._subNodeConnectorRaf = undefined;
    }
    if (this._trendResizeObserver) {
      this._trendResizeObserver.disconnect();
      this._trendResizeObserver = undefined;
    }
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

  private enabledTrendNodes(config: PowerPilzEnergyCardConfig): NodeKey[] {
    const nodes: NodeKey[] = [];
    if (config.solar_trend) {
      nodes.push("solar");
    }
    if (config.grid_trend) {
      nodes.push("grid");
    }
    if (config.grid_secondary_visible && config.grid_secondary_trend) {
      nodes.push("grid_secondary");
    }
    if (config.home_trend) {
      nodes.push("home");
    }
    if (config.battery_trend) {
      nodes.push("battery");
    }
    if (config.battery_secondary_visible && config.battery_secondary_trend) {
      nodes.push("battery_secondary");
    }
    return nodes;
  }

  private trendEntityId(node: NodeKey, config: PowerPilzEnergyCardConfig): string | undefined {
    switch (node) {
      case "solar":
        return config.solar_entity;
      case "grid":
        return config.grid_entity;
      case "grid_secondary":
        return config.grid_secondary_entity;
      case "home":
        return config.home_entity;
      case "battery":
        return config.battery_percentage_entity ?? config.battery_entity;
      case "battery_secondary":
        return config.battery_secondary_percentage_entity ?? config.battery_secondary_entity;
      default:
        return undefined;
    }
  }

  private async fetchTrendHistory(entityId: string): Promise<TrendPoint[]> {
    return fetchHistoryTrendPoints(this.hass, entityId, TREND_WINDOW_MS);
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
    if (this.isEditorPreview()) {
      return;
    }

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

  private resolveTapAction(config: PowerPilzEnergyCardConfig): Required<TapActionConfig> {
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

  private reverseFlowDirection(direction: FlowDirection): FlowDirection {
    if (direction === "forward") {
      return "backward";
    }
    if (direction === "backward") {
      return "forward";
    }
    return "none";
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

  private normalizeBatteryDualAlignment(value?: unknown): "center" | "left" | "right" {
    if (value === "left" || value === "right") {
      return value;
    }
    return "center";
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
    return resolveCssColor(value, fallback);
  }

  private toRgbCss(value?: string | number[]): string | null {
    return toRgbCssValue(value);
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
      --icon-size: var(--mush-icon-size, 36px);
      --icon-border-radius: var(--mush-icon-border-radius, 50%);
      --icon-symbol-size: var(--mush-icon-symbol-size, 0.667em);
      --icon-color: var(--primary-text-color);
      --main-node-margin: 12px;
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
      height: 100%;
      background: var(--ha-card-background, var(--card-background-color, white));
      overflow: hidden;
    }

    ha-card.interactive {
      cursor: pointer;
    }

    ha-card.interactive:focus-visible {
      outline: 2px solid rgba(var(--flow-color-rgb), 0.45);
      outline-offset: 2px;
    }

    .energy-flow-container {
      height: 100%;
      min-height: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--spacing);
      box-sizing: border-box;
    }

    .energy-grid {
      position: relative;
      display: grid;
      grid-template-columns: repeat(var(--grid-columns, 6), minmax(0, 1fr));
      grid-template-rows: repeat(var(--grid-rows, 6), minmax(0, 1fr));
      gap: 4px;
      width: 100%;
      height: 100%;
      min-height: 0;
      border-radius: var(--control-border-radius);
      padding: 0;
      background: transparent;
      box-sizing: border-box;
      margin: 0 auto;
    }

    .energy-value {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      justify-self: stretch;
      align-self: stretch;
      margin: var(--main-node-margin);
      min-height: 0;
      min-width: 0;
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
      z-index: 0;
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
      grid-column: 3 / span 2;
      grid-row: 1 / span 2;
    }

    .energy-value.grid {
      grid-column: 1 / span 2;
      grid-row: 3 / span 2;
    }

    .energy-value.home {
      grid-column: 5 / span 2;
      grid-row: 3 / span 2;
    }

    .energy-value.battery {
      grid-column: 3 / span 2;
      grid-row: 5 / span 2;
    }

    .energy-value.missing .energy-number {
      color: var(--disabled-text-color);
    }

    .subnode-connectors {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    .subnode-connector-segment {
      position: absolute;
      background: color-mix(
        in srgb,
        var(--primary-text-color) 34%,
        var(--ha-card-background, var(--card-background-color, white))
      );
      border-radius: 999px;
    }

    .energy-sub-value {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      justify-self: center;
      align-self: center;
      width: calc(100% - 2px);
      height: calc(100% - 2px);
      min-width: 0;
      border-radius: calc(var(--control-border-radius) - 4px);
      padding: 3px 4px;
      background: var(--ha-card-background, var(--card-background-color, white));
      border: 1px solid rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.1);
      box-sizing: border-box;
      overflow: hidden;
      z-index: 2;
    }

    .energy-sub-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1px;
      min-width: 0;
      text-align: center;
      width: 100%;
      height: 100%;
    }

    .energy-sub-icon {
      --mdc-icon-size: calc(var(--icon-size) * 0.48);
      margin-bottom: 0;
      color: var(--icon-color);
      flex: 0 0 auto;
    }

    .energy-sub-number {
      font-size: calc(var(--card-secondary-font-size) - 1px);
      line-height: calc(var(--card-secondary-line-height) - 5px);
      font-weight: var(--card-primary-font-weight);
      color: var(--primary-text-color);
      letter-spacing: var(--card-primary-letter-spacing);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: clip;
      width: 100%;
    }

    .energy-sub-label {
      margin-top: 0;
      font-size: calc(var(--card-secondary-font-size) - 2px);
      line-height: calc(var(--card-secondary-line-height) - 6px);
      color: var(--secondary-text-color);
      font-weight: var(--card-secondary-font-weight);
      letter-spacing: var(--card-secondary-letter-spacing);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: clip;
      width: 100%;
    }

    .energy-sub-value.missing .energy-sub-number {
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
      grid-column: 3 / span 2;
      grid-row: 3 / span 2;
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

    @container (max-width: 350px) {
      .energy-grid {
        gap: 3px;
        padding: 0;
        --main-node-margin: 8px;
      }

      .energy-value {
        padding: 6px 8px;
      }

      .energy-sub-value {
      }

    }

    @container (max-width: 300px) {
      .energy-grid {
        --main-node-margin: 4px;
      }
    }

    @container (max-width: 275px) {
      .energy-grid {
        gap: 2px;
        padding: 0;
        --main-node-margin: 0px;
      }

      .energy-value {
        padding: 4px 6px;
      }

      .energy-sub-value {
      }

      .energy-sub-icon {
        --mdc-icon-size: calc(var(--icon-size) * 0.42);
      }

      .energy-sub-number {
        font-size: calc(var(--card-secondary-font-size) - 2px);
        line-height: calc(var(--card-secondary-line-height) - 6px);
      }

      .energy-sub-label {
        font-size: calc(var(--card-secondary-font-size) - 3px);
        line-height: calc(var(--card-secondary-line-height) - 7px);
      }

      .energy-icon {
        --mdc-icon-size: calc(var(--icon-size) * 0.52);
        margin-bottom: 2px;
      }

      .battery-top-row {
        gap: 4px;
        margin-bottom: 1px;
      }

      .battery-percentage {
        font-size: calc(var(--card-secondary-font-size) - 1px);
        line-height: calc(var(--card-secondary-line-height) - 1px);
      }

      .energy-number {
        font-size: calc(var(--card-primary-font-size) - 2px);
        line-height: calc(var(--card-primary-line-height) - 3px);
      }

      .energy-label {
        margin-top: 1px;
        font-size: calc(var(--card-secondary-font-size) - 1px);
        line-height: calc(var(--card-secondary-line-height) - 2px);
      }

    }
  `;
}
