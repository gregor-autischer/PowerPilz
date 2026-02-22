import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor } from "../../types";

interface EnergyCardConfig extends LovelaceCardConfig {
  type: "custom:power-schwammerl-energy-card";
  name?: string;
  home_entity?: string;
  solar_entity?: string;
  grid_entity?: string;
  battery_entity?: string;
  battery_percentage_entity?: string;
  grid_label?: string;
  solar_label?: string;
  home_label?: string;
  battery_label?: string;
  unit?: string;
  decimals?: number;
}

type HaFormSchema = Record<string, unknown>;

const SCHEMA: HaFormSchema[] = [
  { name: "name", selector: { text: {} } },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "home_entity", selector: { entity: { filter: { domain: "sensor" } } } },
      { name: "solar_entity", selector: { entity: { filter: { domain: "sensor" } } } }
    ]
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "grid_entity", selector: { entity: { filter: { domain: "sensor" } } } },
      { name: "battery_entity", selector: { entity: { filter: { domain: "sensor" } } } }
    ]
  },
  { name: "battery_percentage_entity", selector: { entity: { filter: { domain: "sensor" } } } },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "solar_label", selector: { text: {} } },
      { name: "home_label", selector: { text: {} } },
      { name: "grid_label", selector: { text: {} } },
      { name: "battery_label", selector: { text: {} } }
    ]
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "unit", selector: { text: {} } },
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
  solar_label: "Solar label",
  home_label: "Home label",
  grid_label: "Grid label",
  battery_label: "Battery label",
  unit: "Unit",
  decimals: "Decimals"
};

@customElement("power-schwammerl-energy-card-editor")
export class PowerSchwammerlEnergyCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config?: EnergyCardConfig;

  public setConfig(config: EnergyCardConfig): void {
    this._config = {
      ...config,
      type: "custom:power-schwammerl-energy-card"
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

  private valueChanged = (event: CustomEvent<{ value: EnergyCardConfig }>): void => {
    const nextConfig: EnergyCardConfig = {
      ...event.detail.value,
      type: "custom:power-schwammerl-energy-card"
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
    "power-schwammerl-energy-card-editor": PowerSchwammerlEnergyCardEditor;
  }
}
