import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor } from "../../types";

interface GraphCardConfig extends LovelaceCardConfig {
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

type HaFormSchema = Record<string, unknown>;

const SCHEMA: HaFormSchema[] = [
  { name: "name", selector: { text: {} } },
  { name: "secondary", selector: { text: {} } },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "entity", selector: { entity: { filter: { domain: "sensor" } } } },
      { name: "icon", selector: { icon: {} }, context: { icon_entity: "entity" } }
    ]
  },
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "icon_color",
        selector: { ui_color: { include_state: true, include_none: true, default_color: "state" } }
      },
      {
        name: "trend_color",
        selector: { ui_color: { include_state: true, include_none: false, default_color: "purple" } }
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
  secondary: "Secondary text",
  entity: "Trend entity",
  icon: "Icon",
  icon_color: "Icon color",
  trend_color: "Graph color",
  unit: "Unit override",
  decimals: "Decimals"
};

@customElement("power-schwammerl-graph-card-editor")
export class PowerSchwammerlGraphCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config?: GraphCardConfig;

  public setConfig(config: GraphCardConfig): void {
    this._config = {
      ...config,
      type: "custom:power-schwammerl-graph-card"
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

  private valueChanged = (event: CustomEvent<{ value: GraphCardConfig }>): void => {
    const nextConfig: GraphCardConfig = {
      ...event.detail.value,
      type: "custom:power-schwammerl-graph-card"
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
    "power-schwammerl-graph-card-editor": PowerSchwammerlGraphCardEditor;
  }
}
