import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor } from "../../types";
import { POWER_PILZ_VERSION } from "../../version";
import { tr, haLang } from "../../utils/i18n";

interface HeatingCurveCardConfig extends LovelaceCardConfig {
  type: "custom:power-pilz-heating-curve-card";
  entity?: string;
  name?: string;
  subtitle?: string;
  icon?: string;
  icon_color?: string | number[];
  active_color?: string | number[];
  show_day_selector?: boolean;
  show_mode_control?: boolean;
  show_now_indicator?: boolean;
  show_time_labels?: boolean;
  tap_action?: Record<string, unknown>;
  hold_action?: Record<string, unknown>;
  double_tap_action?: Record<string, unknown>;
}

type HaFormSchema = Record<string, unknown>;

@customElement("power-pilz-heating-curve-card-editor")
export class PowerPilzHeatingCurveCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config?: HeatingCurveCardConfig;

  public setConfig(config: HeatingCurveCardConfig): void {
    this._config = {
      ...config,
      show_day_selector: config.show_day_selector ?? true,
      show_mode_control: config.show_mode_control ?? true,
      show_now_indicator: config.show_now_indicator ?? true,
      show_time_labels: config.show_time_labels ?? true,
      type: "custom:power-pilz-heating-curve-card"
    };
  }

  private buildSchema(): HaFormSchema[] {
    const lang = haLang(this.hass);

    return [
      {
        type: "expandable",
        name: "",
        title: tr(lang, "heating_curve.editor.section_entities"),
        icon: "mdi:connection",
        expanded: true,
        schema: [
          {
            name: "entity",
            selector: {
              entity: {
                filter: { domain: "select", integration: "powerpilz_companion" }
              }
            },
            helper: tr(lang, "heating_curve.editor.entity_help")
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: tr(lang, "heating_curve.editor.section_identity"),
        icon: "mdi:card-text-outline",
        expanded: false,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "name", selector: { text: {} } },
              { name: "subtitle", selector: { text: {} } }
            ]
          },
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "icon", selector: { icon: {} }, context: { icon_entity: "entity" } },
              { name: "icon_color", selector: { ui_color: { include_state: true, include_none: true, default_color: "state" } } }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: tr(lang, "heating_curve.editor.section_appearance"),
        icon: "mdi:palette-outline",
        expanded: false,
        schema: [
          {
            name: "active_color",
            selector: { ui_color: { include_state: false, include_none: true, default_color: "primary" } }
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: tr(lang, "heating_curve.editor.section_display"),
        icon: "mdi:tune-variant",
        expanded: false,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "show_day_selector", selector: { boolean: {} } },
              { name: "show_mode_control", selector: { boolean: {} } },
              { name: "show_now_indicator", selector: { boolean: {} } },
              { name: "show_time_labels", selector: { boolean: {} } }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: tr(lang, "heating_curve.editor.section_actions"),
        icon: "mdi:gesture-tap",
        expanded: false,
        schema: [
          { name: "tap_action", selector: { ui_action: {} } },
          {
            name: "hold_action",
            selector: { ui_action: {} }
          },
          { name: "double_tap_action", selector: { ui_action: {} } }
        ]
      }
    ];
  }

  private labelMap(): Record<string, string> {
    const lang = haLang(this.hass);
    return {
      entity: tr(lang, "heating_curve.editor.entity"),
      name: tr(lang, "heating_curve.editor.name"),
      subtitle: tr(lang, "heating_curve.editor.subtitle"),
      icon: tr(lang, "heating_curve.editor.icon"),
      icon_color: tr(lang, "heating_curve.editor.icon_color"),
      active_color: tr(lang, "heating_curve.editor.active_color"),
      show_day_selector: tr(lang, "heating_curve.editor.show_day_selector"),
      show_mode_control: tr(lang, "heating_curve.editor.show_mode_control"),
      show_now_indicator: tr(lang, "heating_curve.editor.show_now_indicator"),
      show_time_labels: tr(lang, "heating_curve.editor.show_time_labels"),
      tap_action: tr(lang, "heating_curve.editor.tap_action"),
      hold_action: tr(lang, "heating_curve.editor.hold_action"),
      double_tap_action: tr(lang, "heating_curve.editor.double_tap_action")
    };
  }

  protected render() {
    if (!this.hass || !this._config) return nothing;
    return html`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${POWER_PILZ_VERSION}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this.buildSchema()}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }

  private computeLabel = (schema: { name?: string }): string => {
    return this.labelMap()[schema.name ?? ""] ?? schema.name ?? "";
  };

  private valueChanged = (event: CustomEvent<{ value: unknown }>): void => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || target.tagName !== "HA-FORM") return;
    const raw = event.detail.value;
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: { ...(raw as HeatingCurveCardConfig), type: "custom:power-pilz-heating-curve-card" } },
        bubbles: true,
        composed: true
      })
    );
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "power-pilz-heating-curve-card-editor": PowerPilzHeatingCurveCardEditor;
  }
}
