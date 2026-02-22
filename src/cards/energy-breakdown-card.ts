import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";
import { readNumber, readUnit } from "../utils/entity";

const DEFAULT_DECIMALS = 1;
const EPSILON = 0.01;

interface PowerSchwammerlEnergyBreakdownCardConfig extends LovelaceCardConfig {
  type: "custom:power-schwammerl-energy-breakdown-card";
  name?: string;
  home_entity?: string;
  consumption_entity?: string;
  solar_entity?: string;
  production_entity?: string;
  grid_entity?: string;
  battery_entity?: string;
  battery_percentage_entity?: string;
  daily_consumption_entity?: string;
  daily_production_entity?: string;
  daily_grid_import_entity?: string;
  daily_grid_export_entity?: string;
  voltage_entity?: string;
  current_entity?: string;
  frequency_entity?: string;
  unit?: string;
  energy_unit?: string;
  decimals?: number;
}

@customElement("power-schwammerl-energy-breakdown-card")
export class PowerSchwammerlEnergyBreakdownCard extends LitElement implements LovelaceCard {
  public static async getStubConfig(hass: HomeAssistant): Promise<PowerSchwammerlEnergyBreakdownCardConfig> {
    const entityIds = Object.keys(hass.states);
    const pick = (...candidates: string[]): string | undefined =>
      candidates.find((entityId) => entityId in hass.states);
    const firstByDomain = (domain: string): string | undefined =>
      entityIds.find((entityId) => entityId.startsWith(`${domain}.`));

    const homeEntity = pick("sensor.dev_home_power", "sensor.house_consumption_power")
      ?? firstByDomain("sensor")
      ?? "sensor.dev_home_power";

    return {
      type: "custom:power-schwammerl-energy-breakdown-card",
      name: "Energy Breakdown",
      home_entity: homeEntity,
      solar_entity: pick("sensor.dev_solar_power", "sensor.solar_production_power") ?? firstByDomain("sensor"),
      grid_entity: pick("sensor.dev_grid_power", "sensor.grid_power") ?? firstByDomain("sensor"),
      battery_entity: pick("sensor.dev_battery_power", "sensor.home_battery_power") ?? firstByDomain("sensor"),
      battery_percentage_entity: pick("sensor.dev_battery_soc", "sensor.home_battery_soc") ?? firstByDomain("sensor"),
      daily_consumption_entity: pick("sensor.dev_daily_consumption", "sensor.energy_daily_consumption"),
      daily_production_entity: pick("sensor.dev_daily_production", "sensor.energy_daily_solar"),
      daily_grid_import_entity: pick("sensor.dev_daily_grid_import", "sensor.energy_daily_grid_import"),
      daily_grid_export_entity: pick("sensor.dev_daily_grid_export", "sensor.energy_daily_grid_export"),
      voltage_entity: pick("sensor.dev_grid_voltage", "sensor.grid_voltage"),
      current_entity: pick("sensor.dev_grid_current", "sensor.grid_current"),
      frequency_entity: pick("sensor.dev_grid_frequency", "sensor.grid_frequency"),
      decimals: DEFAULT_DECIMALS
    };
  }

  @property({ attribute: false })
  public hass!: HomeAssistant;

  @state()
  private _config?: PowerSchwammerlEnergyBreakdownCardConfig;

  public setConfig(config: PowerSchwammerlEnergyBreakdownCardConfig): void {
    const homeEntity = config.home_entity ?? config.consumption_entity;
    if (!homeEntity) {
      throw new Error("You need to define home_entity (or consumption_entity).");
    }

    const decimals =
      typeof config.decimals === "number" && Number.isFinite(config.decimals)
        ? Math.min(3, Math.max(0, Math.round(config.decimals)))
        : DEFAULT_DECIMALS;

    this._config = {
      ...config,
      name: config.name ?? "Energy Breakdown",
      home_entity: homeEntity,
      solar_entity: config.solar_entity ?? config.production_entity,
      decimals
    };
  }

  public getCardSize(): number {
    return 5;
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

    const fallbackPowerUnit = config.unit ?? readUnit(this.hass, config.home_entity) ?? "kW";
    const fallbackEnergyUnit = config.energy_unit ?? "kWh";

    const solarUnit = config.unit ?? readUnit(this.hass, config.solar_entity) ?? fallbackPowerUnit;
    const homeUnit = config.unit ?? readUnit(this.hass, config.home_entity) ?? fallbackPowerUnit;
    const gridUnit = config.unit ?? readUnit(this.hass, config.grid_entity) ?? fallbackPowerUnit;
    const batteryUnit = config.unit ?? readUnit(this.hass, config.battery_entity) ?? fallbackPowerUnit;

    const dailyConsumption = readNumber(this.hass, config.daily_consumption_entity);
    const dailyProduction = readNumber(this.hass, config.daily_production_entity);
    const dailyImport = readNumber(this.hass, config.daily_grid_import_entity);
    const dailyExport = readNumber(this.hass, config.daily_grid_export_entity);

    const dailyConsumptionUnit = config.energy_unit ?? readUnit(this.hass, config.daily_consumption_entity) ?? fallbackEnergyUnit;
    const dailyProductionUnit = config.energy_unit ?? readUnit(this.hass, config.daily_production_entity) ?? fallbackEnergyUnit;
    const dailyImportUnit = config.energy_unit ?? readUnit(this.hass, config.daily_grid_import_entity) ?? fallbackEnergyUnit;
    const dailyExportUnit = config.energy_unit ?? readUnit(this.hass, config.daily_grid_export_entity) ?? fallbackEnergyUnit;

    const voltage = readNumber(this.hass, config.voltage_entity);
    const current = readNumber(this.hass, config.current_entity);
    const frequency = readNumber(this.hass, config.frequency_entity);

    const voltageUnit = readUnit(this.hass, config.voltage_entity) ?? "V";
    const currentUnit = readUnit(this.hass, config.current_entity) ?? "A";
    const frequencyUnit = readUnit(this.hass, config.frequency_entity) ?? "Hz";

    const selfSufficiency = this.computeSelfSufficiency(home, solar);

    const hasDailyData =
      dailyConsumption !== null || dailyProduction !== null || dailyImport !== null || dailyExport !== null;
    const hasElectricData = voltage !== null || current !== null || frequency !== null;

    return html`
      <ha-card>
        <div class="card-shell">
          <div class="header-row">
            <div class="title-wrap">
              <ha-icon .icon=${"mdi:chart-areaspline"}></ha-icon>
              <div>
                <div class="title">${config.name}</div>
                <div class="subtitle">Detailed energy telemetry</div>
              </div>
            </div>
            ${selfSufficiency !== null
              ? html`<div class="sufficiency-pill">${selfSufficiency.toFixed(0)}% self</div>`
              : nothing}
          </div>

          <section class="section">
            <div class="section-title">Live Power</div>
            <div class="metric-grid">
              ${this.renderPowerMetric(
                "Solar",
                "mdi:weather-sunny",
                solar,
                solarUnit,
                decimals,
                this.powerDirectionLabel(solar, "production")
              )}
              ${this.renderPowerMetric(
                "Home",
                "mdi:home-lightning-bolt",
                home,
                homeUnit,
                decimals,
                this.powerDirectionLabel(home, "consumption")
              )}
              ${this.renderPowerMetric(
                "Grid",
                "mdi:transmission-tower",
                grid,
                gridUnit,
                decimals,
                this.gridDirectionLabel(grid),
                true
              )}
              ${this.renderPowerMetric(
                "Battery",
                this.batteryIcon(batteryPercentage, battery),
                battery,
                batteryUnit,
                decimals,
                this.batteryDirectionLabel(battery),
                true
              )}
            </div>
          </section>

          ${batteryPercentage !== null
            ? html`
                <section class="section compact">
                  <div class="row-between">
                    <span>Battery SoC</span>
                    <strong>${Math.round(Math.max(0, Math.min(100, batteryPercentage)))}%</strong>
                  </div>
                  <div class="progress-track">
                    <div class="progress-bar" style=${`width: ${Math.max(0, Math.min(100, batteryPercentage))}%;`}></div>
                  </div>
                </section>
              `
            : nothing}

          ${hasDailyData
            ? html`
                <section class="section">
                  <div class="section-title">Daily Energy</div>
                  <div class="daily-grid">
                    ${this.renderDailyMetric("Usage", "mdi:home-analytics", dailyConsumption, dailyConsumptionUnit, decimals)}
                    ${this.renderDailyMetric("Solar", "mdi:solar-power", dailyProduction, dailyProductionUnit, decimals)}
                    ${this.renderDailyMetric("Import", "mdi:transmission-tower-import", dailyImport, dailyImportUnit, decimals)}
                    ${this.renderDailyMetric("Export", "mdi:transmission-tower-export", dailyExport, dailyExportUnit, decimals)}
                  </div>
                </section>
              `
            : nothing}

          ${hasElectricData
            ? html`
                <section class="section">
                  <div class="section-title">Electrical</div>
                  <div class="daily-grid small">
                    ${this.renderDailyMetric("Voltage", "mdi:sine-wave", voltage, voltageUnit, 0)}
                    ${this.renderDailyMetric("Current", "mdi:current-ac", current, currentUnit, 1)}
                    ${this.renderDailyMetric("Frequency", "mdi:pulse", frequency, frequencyUnit, 1)}
                  </div>
                </section>
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }

  private renderPowerMetric(
    label: string,
    icon: string,
    value: number | null,
    unit: string,
    decimals: number,
    status: string,
    signed = false
  ): TemplateResult {
    return html`
      <div class="metric-card ${value === null ? "missing" : ""}">
        <div class="metric-head">
          <ha-icon .icon=${icon}></ha-icon>
          <span>${label}</span>
        </div>
        <div class="metric-value">${this.formatValue(value, unit, decimals, signed)}</div>
        <div class="metric-status">${status}</div>
      </div>
    `;
  }

  private renderDailyMetric(
    label: string,
    icon: string,
    value: number | null,
    unit: string,
    decimals: number
  ): TemplateResult {
    return html`
      <div class="daily-chip ${value === null ? "missing" : ""}">
        <ha-icon .icon=${icon}></ha-icon>
        <div>
          <div class="daily-label">${label}</div>
          <div class="daily-value">${this.formatValue(value, unit, decimals, false)}</div>
        </div>
      </div>
    `;
  }

  private formatValue(value: number | null, unit: string, decimals: number, signed: boolean): string {
    if (value === null) {
      return "--";
    }

    if (signed) {
      const sign = value < 0 ? "-" : "+";
      return `${sign}${Math.abs(value).toFixed(decimals)} ${unit}`;
    }

    return `${Math.abs(value).toFixed(decimals)} ${unit}`;
  }

  private powerDirectionLabel(value: number | null, mode: "production" | "consumption"): string {
    if (value === null) {
      return "No data";
    }

    if (Math.abs(value) <= EPSILON) {
      return "Idle";
    }

    return mode === "production" ? "Producing" : "Consuming";
  }

  private gridDirectionLabel(value: number | null): string {
    if (value === null) {
      return "No data";
    }

    if (Math.abs(value) <= EPSILON) {
      return "Balanced";
    }

    return value > 0 ? "Import" : "Export";
  }

  private batteryDirectionLabel(value: number | null): string {
    if (value === null) {
      return "No data";
    }

    if (Math.abs(value) <= EPSILON) {
      return "Idle";
    }

    return value > 0 ? "Charging" : "Discharging";
  }

  private computeSelfSufficiency(home: number | null, solar: number | null): number | null {
    if (home === null || solar === null || home <= EPSILON) {
      return null;
    }

    const ratio = (Math.min(Math.max(solar, 0), Math.max(home, 0)) / home) * 100;
    return Math.max(0, Math.min(100, ratio));
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

    .card-shell {
      padding: 16px;
      background: var(--ha-card-background, var(--card-background-color));
      display: grid;
      gap: 12px;
    }

    .header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }

    .title-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }

    .title-wrap ha-icon {
      width: 22px;
      height: 22px;
      color: var(--primary-color);
    }

    .title {
      color: var(--primary-text-color);
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.2;
    }

    .subtitle {
      color: var(--secondary-text-color);
      font-size: 0.78rem;
      line-height: 1.2;
      margin-top: 2px;
    }

    .sufficiency-pill {
      border-radius: 999px;
      border: 1px solid color-mix(in srgb, var(--primary-color) 40%, transparent);
      background: color-mix(in srgb, var(--primary-color) 12%, transparent);
      color: var(--primary-text-color);
      font-size: 0.74rem;
      font-weight: 700;
      padding: 6px 9px;
      white-space: nowrap;
    }

    .section {
      background: color-mix(in srgb, var(--secondary-background-color, #9aa0a6) 14%, transparent);
      border: 1px solid color-mix(in srgb, var(--divider-color) 58%, transparent);
      border-radius: 14px;
      padding: 11px;
    }

    .section.compact {
      padding: 10px 11px;
    }

    .section-title {
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--secondary-text-color);
      margin-bottom: 10px;
      font-weight: 700;
    }

    .metric-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }

    .metric-card {
      background: var(--ha-card-background, var(--card-background-color));
      border: 1px solid color-mix(in srgb, var(--divider-color) 62%, transparent);
      border-radius: 12px;
      padding: 9px;
      min-height: 78px;
      display: grid;
      align-content: space-between;
      gap: 6px;
    }

    .metric-card.missing .metric-value {
      color: var(--disabled-text-color);
    }

    .metric-head {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
      color: var(--secondary-text-color);
      font-size: 0.72rem;
      font-weight: 600;
    }

    .metric-head ha-icon {
      width: 16px;
      height: 16px;
      color: var(--primary-color);
      flex: 0 0 auto;
    }

    .metric-value {
      color: var(--primary-text-color);
      font-size: 0.94rem;
      font-weight: 700;
      line-height: 1.2;
    }

    .metric-status {
      color: var(--secondary-text-color);
      font-size: 0.7rem;
      line-height: 1;
      font-weight: 600;
    }

    .row-between {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      color: var(--secondary-text-color);
      font-size: 0.8rem;
      margin-bottom: 8px;
    }

    .row-between strong {
      color: var(--primary-text-color);
      font-size: 0.92rem;
    }

    .progress-track {
      width: 100%;
      height: 8px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--divider-color) 65%, transparent);
      overflow: hidden;
    }

    .progress-bar {
      height: 100%;
      border-radius: 999px;
      background: linear-gradient(90deg, var(--primary-color), color-mix(in srgb, var(--success-color) 75%, var(--primary-color) 25%));
    }

    .daily-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }

    .daily-grid.small {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .daily-chip {
      background: var(--ha-card-background, var(--card-background-color));
      border: 1px solid color-mix(in srgb, var(--divider-color) 62%, transparent);
      border-radius: 11px;
      padding: 8px;
      display: flex;
      gap: 8px;
      align-items: center;
      min-height: 54px;
    }

    .daily-chip.missing .daily-value {
      color: var(--disabled-text-color);
    }

    .daily-chip ha-icon {
      width: 16px;
      height: 16px;
      color: var(--primary-color);
      flex: 0 0 auto;
    }

    .daily-label {
      color: var(--secondary-text-color);
      font-size: 0.68rem;
      font-weight: 600;
      line-height: 1.2;
    }

    .daily-value {
      color: var(--primary-text-color);
      font-size: 0.85rem;
      font-weight: 700;
      line-height: 1.2;
      margin-top: 2px;
      white-space: nowrap;
    }

    @media (max-width: 420px) {
      .card-shell {
        padding: 12px;
      }

      .metric-grid,
      .daily-grid,
      .daily-grid.small {
        grid-template-columns: 1fr;
      }
    }
  `;
}
