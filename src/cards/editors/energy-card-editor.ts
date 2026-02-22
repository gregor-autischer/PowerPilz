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
    type: "expandable",
    name: "",
    title: "Node styling",
    icon: "mdi:shape-outline",
    expanded: false,
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          { name: "solar_label", selector: { text: {} } },
          { name: "solar_icon", selector: { icon: {} }, context: { icon_entity: "solar_entity" } },
          {
            name: "solar_icon_color",
            selector: { ui_color: { include_state: true, include_none: true, default_color: "state" } }
          }
        ]
      },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "grid_label", selector: { text: {} } },
          { name: "grid_icon", selector: { icon: {} }, context: { icon_entity: "grid_entity" } },
          {
            name: "grid_icon_color",
            selector: { ui_color: { include_state: true, include_none: true, default_color: "state" } }
          }
        ]
      },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "home_label", selector: { text: {} } },
          { name: "home_icon", selector: { icon: {} }, context: { icon_entity: "home_entity" } },
          {
            name: "home_icon_color",
            selector: { ui_color: { include_state: true, include_none: true, default_color: "state" } }
          }
        ]
      },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "battery_label", selector: { text: {} } },
          { name: "battery_icon", selector: { icon: {} }, context: { icon_entity: "battery_entity" } },
          {
            name: "battery_icon_color",
            selector: { ui_color: { include_state: true, include_none: true, default_color: "state" } }
          }
        ]
      },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "core_icon", selector: { icon: {} }, context: { icon_entity: "home_entity" } },
          {
            name: "core_icon_color",
            selector: { ui_color: { include_state: true, include_none: true, default_color: "state" } }
          },
          {
            name: "flow_color",
            selector: { ui_color: { include_state: true, include_none: false, default_color: "purple" } }
          }
        ]
      }
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
  solar_icon: "Solar icon",
  solar_icon_color: "Solar color",
  grid_icon: "Grid icon",
  grid_icon_color: "Grid color",
  home_icon: "Home icon",
  home_icon_color: "Home color",
  battery_icon: "Battery icon",
  battery_icon_color: "Battery color",
  core_icon: "Core icon",
  core_icon_color: "Core color",
  flow_color: "Flow color",
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
