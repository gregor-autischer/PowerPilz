import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor } from "../../types";

interface EnergyBreakdownCardConfig extends LovelaceCardConfig {
  type: "custom:power-schwammerl-energy-breakdown-card";
  name?: string;
  home_entity?: string;
  solar_entity?: string;
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

type HaFormSchema = Record<string, unknown>;

const SENSOR_SELECTOR = { entity: { filter: { domain: "sensor" } } };

const SCHEMA: HaFormSchema[] = [
  { name: "name", selector: { text: {} } },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "home_entity", selector: SENSOR_SELECTOR },
      { name: "solar_entity", selector: SENSOR_SELECTOR },
      { name: "grid_entity", selector: SENSOR_SELECTOR },
      { name: "battery_entity", selector: SENSOR_SELECTOR },
      { name: "battery_percentage_entity", selector: SENSOR_SELECTOR }
    ]
  },
  {
    type: "expandable",
    name: "",
    title: "Daily entities",
    icon: "mdi:calendar-today",
    expanded: false,
    schema: [
      { name: "daily_consumption_entity", selector: SENSOR_SELECTOR },
      { name: "daily_production_entity", selector: SENSOR_SELECTOR },
      { name: "daily_grid_import_entity", selector: SENSOR_SELECTOR },
      { name: "daily_grid_export_entity", selector: SENSOR_SELECTOR }
    ]
  },
  {
    type: "expandable",
    name: "",
    title: "Electrical entities",
    icon: "mdi:sine-wave",
    expanded: false,
    schema: [
      { name: "voltage_entity", selector: SENSOR_SELECTOR },
      { name: "current_entity", selector: SENSOR_SELECTOR },
      { name: "frequency_entity", selector: SENSOR_SELECTOR }
    ]
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "unit", selector: { text: {} } },
      { name: "energy_unit", selector: { text: {} } },
      { name: "decimals", selector: { number: { mode: "box", min: 0, max: 3, step: 1 } } }
    ]
  }
];

const LABELS: Record<string, string> = {
  name: "Name",
  home_entity: "Home entity",
  solar_entity: "Solar entity",
  grid_entity: "Grid entity",
  battery_entity: "Battery entity",
  battery_percentage_entity: "Battery percentage entity",
  daily_consumption_entity: "Daily consumption entity",
  daily_production_entity: "Daily production entity",
  daily_grid_import_entity: "Daily grid import entity",
  daily_grid_export_entity: "Daily grid export entity",
  voltage_entity: "Voltage entity",
  current_entity: "Current entity",
  frequency_entity: "Frequency entity",
  unit: "Power unit",
  energy_unit: "Energy unit",
  decimals: "Decimals"
};

@customElement("power-schwammerl-energy-breakdown-card-editor")
export class PowerSchwammerlEnergyBreakdownCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config?: EnergyBreakdownCardConfig;

  public setConfig(config: EnergyBreakdownCardConfig): void {
    this._config = {
      ...config,
      type: "custom:power-schwammerl-energy-breakdown-card"
    };
  }

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }

  private computeLabel = (schema: { name?: string }): string => {
    const name = schema.name ?? "";
    return LABELS[name] ?? name;
  };

  private valueChanged = (event: CustomEvent<{ value: EnergyBreakdownCardConfig }>): void => {
    const nextConfig: EnergyBreakdownCardConfig = {
      ...event.detail.value,
      type: "custom:power-schwammerl-energy-breakdown-card"
    };
    this._config = nextConfig;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: nextConfig },
        bubbles: true,
        composed: true
      })
    );
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "power-schwammerl-energy-breakdown-card-editor": PowerSchwammerlEnergyBreakdownCardEditor;
  }
}
