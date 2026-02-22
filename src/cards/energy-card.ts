import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from "../types";
import { readNumber, readUnit } from "../utils/entity";
import "./editors/energy-card-editor";

type FlowDirection = "none" | "forward" | "backward";
type TapActionType = "none" | "navigate" | "more-info";

const EPSILON = 0.01;
const DEFAULT_DECIMALS = 1;
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
      core_icon_color: "purple",
      flow_color: "purple",
      decimals: DEFAULT_DECIMALS
    };
  }

  @property({ attribute: false })
  public hass!: HomeAssistant;

  @state()
  private _config?: PowerSchwammerlEnergyCardConfig;

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
      core_icon_color: config.core_icon_color ?? "purple",
      flow_color: config.flow_color ?? "purple",
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
    const batteryIconStyle = this.iconColorStyle(config.battery_icon_color);
    const coreIconStyle = this.iconColorStyle(config.core_icon_color);
    const batteryIcon = config.battery_icon ?? this.batteryIcon(batteryPercentage, battery);
    const flowRgb = this.toRgbCss(config.flow_color) ?? COLOR_RGB_FALLBACK.purple;
    const flowStyle = { "--flow-color-rgb": flowRgb };

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
              <ha-icon
                class="energy-icon"
                .icon=${config.solar_icon ?? "mdi:weather-sunny"}
                style=${styleMap(solarIconStyle)}
              ></ha-icon>
              <div class="energy-number">${this.formatValue(solar, solarUnit, decimals)}</div>
              <div class="energy-label">${config.solar_label}</div>
            </div>

            <div class="energy-value grid ${grid === null ? "missing" : ""}">
              <ha-icon
                class="energy-icon"
                .icon=${config.grid_icon ?? "mdi:transmission-tower"}
                style=${styleMap(gridIconStyle)}
              ></ha-icon>
              <div class="energy-number">${this.formatValue(grid, gridUnit, decimals)}</div>
              <div class="energy-label">${config.grid_label}</div>
            </div>

            <div class="energy-value home ${home === null ? "missing" : ""}">
              <ha-icon
                class="energy-icon"
                .icon=${config.home_icon ?? "mdi:home-lightning-bolt"}
                style=${styleMap(homeIconStyle)}
              ></ha-icon>
              <div class="energy-number">${this.formatValue(home, homeUnit, decimals)}</div>
              <div class="energy-label">${config.home_label}</div>
            </div>

            <div class="energy-value battery ${battery === null ? "missing" : ""}">
              <div class="battery-top-row">
                <ha-icon class="energy-icon" .icon=${batteryIcon} style=${styleMap(batteryIconStyle)}></ha-icon>
                ${batteryPercentage !== null
                  ? html`<div class="battery-percentage">${this.formatBatteryPercentage(batteryPercentage)}</div>`
                  : nothing}
              </div>
              <div class="energy-number">${this.formatValue(battery, batteryUnit, decimals)}</div>
              <div class="energy-label">${config.battery_label}</div>
            </div>

            <div class="home-core">
              <ha-icon .icon=${config.core_icon ?? "mdi:home"} style=${styleMap(coreIconStyle)}></ha-icon>
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
        tapAction.entity ??
        this._config.details_entity ??
        this._config.home_entity ??
        this._config.grid_entity ??
        this._config.solar_entity ??
        this._config.battery_entity;
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
    const rounded = Math.round(Math.max(0, Math.min(100, value)));
    return `${rounded}%`;
  }

  private batteryIcon(percentage: number | null, batteryPower: number | null): string {
    if (batteryPower !== null && batteryPower > EPSILON) {
      return "mdi:battery-charging";
    }

    if (percentage === null) {
      return "mdi:battery-outline";
    }

    if (percentage >= 80) {
      return "mdi:battery-high";
    }

    if (percentage >= 45) {
      return "mdi:battery-medium";
    }

    if (percentage >= 20) {
      return "mdi:battery-low";
    }

    return "mdi:battery-outline";
  }

  private iconColorStyle(value?: string | number[]): Record<string, string> {
    const rgbCss = this.toRgbCss(value);
    if (rgbCss) {
      return { color: `rgb(${rgbCss})` };
    }

    if (typeof value === "string" && value.trim().length > 0 && value !== "none") {
      return { color: value.trim() };
    }

    return {};
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
      --shape-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
      --shape-color-soft: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.04);
      --flow-color-rgb: var(--rgb-purple, 156, 39, 176);
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
      min-height: 250px;
      border-radius: var(--control-border-radius);
      padding: var(--spacing);
      background: transparent;
      box-sizing: border-box;
    }

    .energy-value {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      justify-self: center;
      align-self: center;
      width: calc(100% - 12px);
      max-width: 120px;
      min-width: 0;
      border-radius: calc(var(--control-border-radius) - 1px);
      padding: 6px 8px;
      min-height: 62px;
      background: var(--ha-card-background, var(--card-background-color, white));
      border: 1px solid rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.1);
      box-shadow: none;
      z-index: 2;
      box-sizing: border-box;
      overflow: hidden;
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
      --mdc-icon-size: 18px;
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
      width: 64px;
      height: 64px;
      border-radius: var(--control-border-radius);
      display: grid;
      place-items: center;
      justify-self: center;
      align-self: center;
      background: var(--ha-card-background, var(--card-background-color, white));
      border: 1px solid rgba(var(--flow-color-rgb), 0.32);
      box-shadow: none;
      z-index: 3;
    }

    .home-core ha-icon {
      --mdc-icon-size: 28px;
      color: var(--icon-color);
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
      height: 3px;
    }

    .flow-line.vertical {
      width: 3px;
    }

    .flow-line.left {
      top: 50%;
      left: 17%;
      right: 50%;
      transform: translateY(-50%);
    }

    .flow-line.right {
      top: 50%;
      left: 50%;
      right: 17%;
      transform: translateY(-50%);
    }

    .flow-line.top {
      top: 17%;
      bottom: 50%;
      left: 50%;
      transform: translateX(-50%);
    }

    .flow-line.bottom {
      top: 50%;
      bottom: 17%;
      left: 50%;
      transform: translateX(-50%);
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
        min-height: 220px;
        gap: 8px;
        padding: 8px;
      }

      .energy-value {
        width: calc(100% - 8px);
        max-width: 108px;
        min-height: 58px;
        padding: 5px 7px;
      }

      .energy-number {
        font-size: 0.85rem;
      }

      .energy-label {
        font-size: 0.68rem;
      }

      .home-core {
        width: 60px;
        height: 60px;
      }

      .home-core ha-icon {
        --mdc-icon-size: 24px;
      }
    }
  `;
}
