import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from "../types";
import { readNumber, readUnit } from "../utils/entity";
import "./editors/energy-card-editor";

type FlowDirection = "none" | "forward" | "backward";
type TapActionType = "none" | "navigate" | "more-info";

const EPSILON = 0.01;
const DEFAULT_DECIMALS = 1;

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

    return html`
      <ha-card
        class=${interactive ? "interactive" : ""}
        tabindex=${interactive ? 0 : -1}
        role=${interactive ? "button" : "article"}
        @click=${this.handleCardClick}
        @keydown=${this.handleCardKeyDown}
      >
        <div class="energy-flow-container">
          <div class="energy-grid">
            ${this.renderFlowLine("vertical top", solarFlow)}
            ${this.renderFlowLine("horizontal left", gridFlow)}
            ${this.renderFlowLine("horizontal right", homeFlow)}
            ${this.renderFlowLine("vertical bottom", batteryFlow)}

            <div class="energy-value solar ${solar === null ? "missing" : ""}">
              <ha-icon class="energy-icon" .icon=${"mdi:weather-sunny"}></ha-icon>
              <div class="energy-number">${this.formatValue(solar, solarUnit, decimals)}</div>
              <div class="energy-label">${config.solar_label}</div>
            </div>

            <div class="energy-value grid ${grid === null ? "missing" : ""}">
              <ha-icon class="energy-icon" .icon=${"mdi:transmission-tower"}></ha-icon>
              <div class="energy-number">${this.formatValue(grid, gridUnit, decimals)}</div>
              <div class="energy-label">${config.grid_label}</div>
            </div>

            <div class="energy-value home ${home === null ? "missing" : ""}">
              <ha-icon class="energy-icon" .icon=${"mdi:home-lightning-bolt"}></ha-icon>
              <div class="energy-number">${this.formatValue(home, homeUnit, decimals)}</div>
              <div class="energy-label">${config.home_label}</div>
            </div>

            <div class="energy-value battery ${battery === null ? "missing" : ""}">
              <div class="battery-top-row">
                <ha-icon class="energy-icon" .icon=${this.batteryIcon(batteryPercentage, battery)}></ha-icon>
                ${batteryPercentage !== null
                  ? html`<div class="battery-percentage">${this.formatBatteryPercentage(batteryPercentage)}</div>`
                  : nothing}
              </div>
              <div class="energy-number">${this.formatValue(battery, batteryUnit, decimals)}</div>
              <div class="energy-label">${config.battery_label}</div>
            </div>

            <div class="home-core">
              <ha-icon .icon=${"mdi:home"}></ha-icon>
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

  static styles = css`
    :host {
      display: block;
    }

    ha-card {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: var(--mush-layout-align, center);
      height: auto;
      background: var(--ha-card-background, var(--card-background-color));
    }

    ha-card.interactive {
      cursor: pointer;
    }

    ha-card.interactive:focus-visible {
      outline: 2px solid rgba(var(--rgb-accent-color, 233, 30, 99), 0.55);
      outline-offset: 2px;
    }

    .energy-flow-container {
      padding: 10px;
    }

    .energy-grid {
      --flow-color-rgb: var(--rgb-accent-color, 233, 30, 99);
      position: relative;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      grid-template-rows: repeat(3, minmax(0, 1fr));
      gap: 10px;
      aspect-ratio: 1 / 1;
      min-height: 250px;
      border-radius: 16px;
      padding: 10px;
      background: var(--ha-card-background, var(--card-background-color));
      border: 1px solid color-mix(in srgb, var(--divider-color) 58%, transparent);
      box-sizing: border-box;
    }

    .energy-value {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      border-radius: 14px;
      padding: 8px 10px;
      min-height: 76px;
      background: var(--ha-card-background, var(--card-background-color));
      border: 1px solid color-mix(in srgb, var(--divider-color) 66%, transparent);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.14);
      z-index: 2;
      box-sizing: border-box;
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
      width: 20px;
      height: 20px;
      margin-bottom: 4px;
      color: var(--primary-text-color);
      flex: 0 0 auto;
    }

    .energy-value.solar .energy-icon {
      color: var(--warning-color);
    }

    .energy-value.grid .energy-icon {
      color: var(--info-color, var(--primary-color));
    }

    .energy-value.home .energy-icon {
      color: rgba(var(--flow-color-rgb), 0.92);
    }

    .energy-value.battery .energy-icon {
      color: var(--success-color);
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
      font-size: 0.82rem;
      line-height: 1;
      color: var(--secondary-text-color);
      font-weight: 600;
    }

    .energy-number {
      font-size: 0.92rem;
      line-height: 1.2;
      font-weight: 600;
      color: var(--primary-text-color);
      white-space: nowrap;
    }

    .energy-label {
      margin-top: 2px;
      font-size: 0.72rem;
      line-height: 1.2;
      color: var(--secondary-text-color);
      font-weight: 500;
      letter-spacing: 0.01em;
    }

    .home-core {
      grid-column: 2;
      grid-row: 2;
      width: 70px;
      height: 70px;
      border-radius: 18px;
      display: grid;
      place-items: center;
      justify-self: center;
      align-self: center;
      background: var(--ha-card-background, var(--card-background-color));
      border: 2px solid rgba(var(--flow-color-rgb), 0.35);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
      z-index: 3;
    }

    .home-core ha-icon {
      width: 36px;
      height: 36px;
      color: rgba(var(--flow-color-rgb), 0.95);
    }

    .flow-line {
      position: absolute;
      border-radius: 999px;
      background: color-mix(in srgb, var(--divider-color) 74%, transparent);
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
      height: 4px;
    }

    .flow-line.vertical {
      width: 4px;
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
        opacity: 0.55;
      }
    }

    @media (max-width: 420px) {
      .energy-grid {
        min-height: 220px;
        gap: 8px;
        padding: 8px;
      }

      .energy-value {
        min-height: 68px;
        padding: 6px 8px;
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
        width: 30px;
        height: 30px;
      }
    }
  `;
}
