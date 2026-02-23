import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor } from "../../types";

interface WallboxCardConfig extends LovelaceCardConfig {
  type: "custom:power-schwammerl-wallbox-card";
  name?: string;
  icon?: string;
  icon_color?: number[] | string;
  power_entity?: string;
  status_entity?: string;
  mode_entity?: string;
  command_entity?: string;
  show_mode_selector?: boolean;
  show_live_value?: boolean;
  show_command_button?: boolean;
  decimals?: number;
}

type HaFormSchema = Record<string, unknown>;

const SCHEMA: HaFormSchema[] = [
  { name: "name", selector: { text: {} } },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "icon", selector: { icon: {} }, context: { icon_entity: "power_entity" } },
      {
        name: "icon_color",
        selector: { ui_color: { include_state: true, include_none: true, default_color: "state" } }
      }
    ]
  },
  { name: "power_entity", selector: { entity: { filter: { domain: "sensor" } } } },
  { name: "status_entity", selector: { entity: { filter: { domain: "sensor" } } } },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "mode_entity", selector: { entity: { filter: { domain: ["input_select", "select"] } } } },
      {
        name: "command_entity",
        selector: { entity: { filter: { domain: ["input_boolean", "switch"] } } }
      }
    ]
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "show_mode_selector", selector: { boolean: {} } },
      { name: "show_live_value", selector: { boolean: {} } },
      { name: "show_command_button", selector: { boolean: {} } }
    ]
  },
  { name: "decimals", selector: { number: { mode: "box", min: 0, max: 3, step: 1 } } }
];

const LABELS: Record<string, string> = {
  name: "Name",
  icon: "Icon",
  icon_color: "Icon color",
  power_entity: "Power entity",
  status_entity: "Status entity",
  mode_entity: "Mode entity",
  command_entity: "Command entity",
  show_mode_selector: "Show mode selector",
  show_live_value: "Show live status and power",
  show_command_button: "Show play/pause button",
  decimals: "Decimals"
};

@customElement("power-schwammerl-wallbox-card-editor")
export class PowerSchwammerlWallboxCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config?: WallboxCardConfig;

  public setConfig(config: WallboxCardConfig): void {
    this._config = {
      ...config,
      show_mode_selector: config.show_mode_selector ?? true,
      show_live_value: config.show_live_value ?? true,
      show_command_button: config.show_command_button ?? true,
      type: "custom:power-schwammerl-wallbox-card"
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

  private valueChanged = (event: CustomEvent<{ value: WallboxCardConfig }>): void => {
    const nextConfig: WallboxCardConfig = {
      ...event.detail.value,
      type: "custom:power-schwammerl-wallbox-card"
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
    "power-schwammerl-wallbox-card-editor": PowerSchwammerlWallboxCardEditor;
  }
}
