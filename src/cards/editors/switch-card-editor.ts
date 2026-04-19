import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor } from "../../types";
import { POWER_PILZ_VERSION } from "../../version";
import { tr, haLang } from "../../utils/i18n";

interface SwitchCardConfig extends LovelaceCardConfig {
  type: "custom:power-pilz-switch-card";
  entity?: string;
  name?: string;
  subtitle?: string;
  icon?: string;
  icon_color?: string | number[];
  dim_inactive_icon?: boolean;
  card_layout?: string;
  slider_size?: string;
  slider_color?: string | number[];
  use_custom_icons?: boolean;
  state_1_color?: string | number[];
  state_2_color?: string | number[];
  state_3_color?: string | number[];
  state_4_color?: string | number[];
  state_5_color?: string | number[];
  state_1_icon?: string;
  state_2_icon?: string;
  state_3_icon?: string;
  state_4_icon?: string;
  state_5_icon?: string;
}

type HaFormSchema = Record<string, unknown>;

@customElement("power-pilz-switch-card-editor")
export class PowerPilzSwitchCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config?: SwitchCardConfig;

  public setConfig(config: SwitchCardConfig): void {
    this._config = {
      ...config,
      use_custom_icons: config.use_custom_icons ?? false,
      dim_inactive_icon: config.dim_inactive_icon ?? true,
      type: "custom:power-pilz-switch-card"
    };
  }

  private stateSection(n: number, icon: string): HaFormSchema {
    const lang = haLang(this.hass);
    return {
      type: "expandable",
      name: "",
      title: n === 1 ? tr(lang, "switch.editor.state_1_title") : tr(lang, "switch.editor.state_n_title", { n }),
      icon,
      expanded: n <= 3,
      schema: [
        {
          type: "grid",
          name: "",
          columns: 2,
          schema: [
            {
              name: `state_${n}_color`,
              selector: { ui_color: { include_state: false, include_none: true } }
            },
            { name: `state_${n}_icon`, selector: { icon: {} } }
          ]
        }
      ]
    };
  }

  private buildSchema(): HaFormSchema[] {
    const lang = haLang(this.hass);
    return [
      {
        type: "expandable",
        name: "",
        title: tr(lang, "switch.editor.section_identity"),
        icon: "mdi:card-text-outline",
        expanded: true,
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
              {
                name: "icon_color",
                selector: { ui_color: { include_state: true, include_none: true, default_color: "state" } }
              }
            ]
          },
          {
            name: "dim_inactive_icon",
            selector: { boolean: {} }
          },
          {
            name: "entity",
            selector: { entity: { filter: { domain: ["input_select", "select"] } } }
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: tr(lang, "switch.editor.section_layout"),
        icon: "mdi:page-layout-body",
        expanded: false,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "card_layout",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: [
                      { label: tr(lang, "switch.editor.layout_horizontal"), value: "horizontal" },
                      { label: tr(lang, "switch.editor.layout_vertical"), value: "vertical" }
                    ]
                  }
                }
              },
              {
                name: "slider_size",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: [
                      { label: tr(lang, "switch.editor.slider_small"), value: "small" },
                      { label: tr(lang, "switch.editor.slider_medium"), value: "medium" },
                      { label: tr(lang, "switch.editor.slider_large"), value: "large" }
                    ]
                  }
                }
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: tr(lang, "switch.editor.section_slider"),
        icon: "mdi:tune-variant",
        expanded: false,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "slider_color",
                selector: { ui_color: { include_state: false, include_none: true } }
              },
              { name: "use_custom_icons", selector: { boolean: {} } }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: tr(lang, "switch.editor.section_state_custom"),
        icon: "mdi:palette-outline",
        expanded: false,
        schema: [
          this.stateSection(1, "mdi:numeric-1-circle-outline"),
          this.stateSection(2, "mdi:numeric-2-circle-outline"),
          this.stateSection(3, "mdi:numeric-3-circle-outline"),
          this.stateSection(4, "mdi:numeric-4-circle-outline"),
          this.stateSection(5, "mdi:numeric-5-circle-outline")
        ]
      }
    ];
  }

  private labelMap(): Record<string, string> {
    const lang = haLang(this.hass);
    const result: Record<string, string> = {
      name: tr(lang, "switch.editor.name"),
      subtitle: tr(lang, "switch.editor.subtitle"),
      icon: tr(lang, "switch.editor.icon"),
      icon_color: tr(lang, "switch.editor.icon_color"),
      dim_inactive_icon: tr(lang, "switch.editor.dim_inactive_icon"),
      entity: tr(lang, "switch.editor.entity"),
      card_layout: tr(lang, "switch.editor.card_layout"),
      slider_size: tr(lang, "switch.editor.slider_size"),
      slider_color: tr(lang, "switch.editor.slider_color"),
      use_custom_icons: tr(lang, "switch.editor.use_custom_icons")
    };
    for (let i = 1; i <= 5; i++) {
      result[`state_${i}_color`] = tr(lang, "switch.editor.state_color");
      result[`state_${i}_icon`] = tr(lang, "switch.editor.state_icon");
    }
    return result;
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
    const value = event.detail.value;
    if (!value || typeof value !== "object" || Array.isArray(value)) return;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: { ...(value as SwitchCardConfig), type: "custom:power-pilz-switch-card" } },
        bubbles: true,
        composed: true
      })
    );
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "power-pilz-switch-card-editor": PowerPilzSwitchCardEditor;
  }
}
