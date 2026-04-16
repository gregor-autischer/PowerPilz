import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor } from "../../types";
import { POWER_PILZ_VERSION } from "../../version";

interface SwitchCardConfig extends LovelaceCardConfig {
  type: "custom:power-pilz-switch-card";
  entity?: string;
  name?: string;
  subtitle?: string;
  icon?: string;
  icon_color?: string | number[];
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

const SCHEMA: HaFormSchema[] = [
  // --- Identity ---
  {
    type: "expandable",
    name: "",
    title: "Identity",
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
        name: "entity",
        selector: { entity: { filter: { domain: ["input_select", "select"] } } }
      }
    ]
  },

  // --- Layout ---
  {
    type: "expandable",
    name: "",
    title: "Layout",
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
                  { label: "Horizontal (1 row)", value: "horizontal" },
                  { label: "Vertical (2 rows)", value: "vertical" }
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
                  { label: "Small", value: "small" },
                  { label: "Medium", value: "medium" },
                  { label: "Large", value: "large" }
                ]
              }
            }
          }
        ]
      }
    ]
  },

  // --- Slider appearance ---
  {
    type: "expandable",
    name: "",
    title: "Slider appearance",
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
            selector: { ui_color: { include_state: false, include_none: true, default_color: "default" } }
          },
          {
            name: "use_custom_icons",
            selector: { boolean: {} }
          }
        ]
      }
    ]
  },

  // --- State customization ---
  {
    type: "expandable",
    name: "",
    title: "State customization",
    icon: "mdi:palette-outline",
    expanded: false,
    schema: [
      {
        type: "expandable",
        name: "",
        title: "State 1 (Off / first option)",
        icon: "mdi:numeric-1-circle-outline",
        expanded: true,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "state_1_color",
                selector: { ui_color: { include_state: false, include_none: true, default_color: "default" } }
              },
              { name: "state_1_icon", selector: { icon: {} } }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "State 2",
        icon: "mdi:numeric-2-circle-outline",
        expanded: true,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "state_2_color",
                selector: { ui_color: { include_state: false, include_none: true, default_color: "default" } }
              },
              { name: "state_2_icon", selector: { icon: {} } }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "State 3",
        icon: "mdi:numeric-3-circle-outline",
        expanded: true,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "state_3_color",
                selector: { ui_color: { include_state: false, include_none: true, default_color: "default" } }
              },
              { name: "state_3_icon", selector: { icon: {} } }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "State 4",
        icon: "mdi:numeric-4-circle-outline",
        expanded: false,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "state_4_color",
                selector: { ui_color: { include_state: false, include_none: true, default_color: "default" } }
              },
              { name: "state_4_icon", selector: { icon: {} } }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "State 5",
        icon: "mdi:numeric-5-circle-outline",
        expanded: false,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "state_5_color",
                selector: { ui_color: { include_state: false, include_none: true, default_color: "default" } }
              },
              { name: "state_5_icon", selector: { icon: {} } }
            ]
          }
        ]
      }
    ]
  }
];

const LABELS: Record<string, string> = {
  name: "Name",
  subtitle: "Subtitle",
  icon: "Icon",
  icon_color: "Icon color",
  entity: "State entity",
  card_layout: "Card layout",
  slider_size: "Slider width",
  slider_color: "Slider color",
  use_custom_icons: "Custom icons per state",
  state_1_color: "Color",
  state_2_color: "Color",
  state_3_color: "Color",
  state_4_color: "Color",
  state_5_color: "Color",
  state_1_icon: "Icon",
  state_2_icon: "Icon",
  state_3_icon: "Icon",
  state_4_icon: "Icon",
  state_5_icon: "Icon"
};

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
      type: "custom:power-pilz-switch-card"
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
    const name = schema.name ?? "";
    return LABELS[name] ?? name;
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
    const nextConfig: SwitchCardConfig = {
      ...(value as SwitchCardConfig),
      type: "custom:power-pilz-switch-card"
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
    "power-pilz-switch-card-editor": PowerPilzSwitchCardEditor;
  }
}
