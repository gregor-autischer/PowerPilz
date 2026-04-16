import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor } from "../../types";
import { POWER_PILZ_VERSION } from "../../version";
import { tr, haLang } from "../../utils/i18n";

interface WallboxCardConfig extends LovelaceCardConfig {
  type: "custom:power-pilz-wallbox-card";
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
  auto_scale_units?: boolean;
  decimals_base_unit?: number;
  decimals_prefixed_unit?: number;
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
  {
    type: "grid",
    name: "",
    schema: [
      { name: "decimals", selector: { number: { mode: "box", min: 0, max: 3, step: 1 } } },
      { name: "auto_scale_units", selector: { boolean: {} } },
      { name: "decimals_base_unit", selector: { number: { mode: "box", min: 0, max: 4, step: 1 } } },
      { name: "decimals_prefixed_unit", selector: { number: { mode: "box", min: 0, max: 4, step: 1 } } }
    ]
  }
];

@customElement("power-pilz-wallbox-card-editor")
export class PowerPilzWallboxCardEditor extends LitElement implements LovelaceCardEditor {
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
      decimals: config.decimals ?? 1,
      auto_scale_units: config.auto_scale_units ?? false,
      decimals_base_unit: config.decimals_base_unit ?? config.decimals ?? 1,
      decimals_prefixed_unit: config.decimals_prefixed_unit ?? config.decimals ?? 1,
      type: "custom:power-pilz-wallbox-card"
    };
  }

  private labels(): Record<string, string> {
    const lang = haLang(this.hass);
    return {
      name: tr(lang, "wallbox.editor.name"),
      icon: tr(lang, "wallbox.editor.icon"),
      icon_color: tr(lang, "wallbox.editor.icon_color"),
      power_entity: tr(lang, "wallbox.editor.power_entity"),
      status_entity: tr(lang, "wallbox.editor.status_entity"),
      mode_entity: tr(lang, "wallbox.editor.mode_entity"),
      command_entity: tr(lang, "wallbox.editor.command_entity"),
      show_mode_selector: tr(lang, "wallbox.editor.show_mode"),
      show_live_value: tr(lang, "wallbox.editor.show_live"),
      show_command_button: tr(lang, "wallbox.editor.show_button"),
      decimals: tr(lang, "wallbox.editor.decimals"),
      auto_scale_units: tr(lang, "wallbox.editor.auto_scale"),
      decimals_base_unit: tr(lang, "wallbox.editor.decimals_base"),
      decimals_prefixed_unit: tr(lang, "wallbox.editor.decimals_prefixed")
    };
  }

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    return html`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${POWER_PILZ_VERSION}
      </div>
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
    return this.labels()[schema.name ?? ""] ?? schema.name ?? "";
  };

  private valueChanged = (event: CustomEvent<{ value: unknown }>): void => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || target.tagName !== "HA-FORM") {
      return;
    }
    const value = event.detail.value;
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return;
    }
    const nextConfig: WallboxCardConfig = {
      ...(value as WallboxCardConfig),
      type: "custom:power-pilz-wallbox-card"
    };
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
    "power-pilz-wallbox-card-editor": PowerPilzWallboxCardEditor;
  }
}
