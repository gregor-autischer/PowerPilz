import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor } from "../../types";

interface EnergyCardConfig extends LovelaceCardConfig {
  type: "custom:power-pilz-energy-card";
  name?: string;
  home_visible?: boolean;
  solar_visible?: boolean;
  grid_visible?: boolean;
  grid_secondary_visible?: boolean;
  battery_visible?: boolean;
  battery_secondary_visible?: boolean;
  battery_dual_alignment?: "center" | "left" | "right";
  home_entity?: string;
  solar_entity?: string;
  grid_entity?: string;
  grid_secondary_entity?: string;
  battery_entity?: string;
  battery_percentage_entity?: string;
  battery_secondary_entity?: string;
  battery_secondary_percentage_entity?: string;
  solar_sub_enabled?: boolean;
  solar_sub_entity?: string;
  solar_sub_label?: string;
  solar_sub_icon?: string;
  solar_sub_icon_color?: string | number[];
  home_sub_enabled?: boolean;
  home_sub_entity?: string;
  home_sub_label?: string;
  home_sub_icon?: string;
  home_sub_icon_color?: string | number[];
  grid_label?: string;
  solar_label?: string;
  home_label?: string;
  battery_label?: string;
  battery_secondary_label?: string;
  grid_secondary_label?: string;
  solar_icon?: string;
  grid_icon?: string;
  grid_secondary_icon?: string;
  home_icon?: string;
  battery_icon?: string;
  battery_secondary_icon?: string;
  core_icon?: string;
  solar_icon_color?: string | number[];
  grid_icon_color?: string | number[];
  grid_secondary_icon_color?: string | number[];
  home_icon_color?: string | number[];
  battery_icon_color?: string | number[];
  battery_secondary_icon_color?: string | number[];
  core_icon_color?: string | number[];
  solar_trend?: boolean;
  grid_trend?: boolean;
  grid_secondary_trend?: boolean;
  home_trend?: boolean;
  battery_trend?: boolean;
  battery_secondary_trend?: boolean;
  solar_trend_color?: string | number[];
  grid_trend_color?: string | number[];
  grid_secondary_trend_color?: string | number[];
  home_trend_color?: string | number[];
  battery_trend_color?: string | number[];
  battery_secondary_trend_color?: string | number[];
  battery_low_alert?: boolean;
  battery_low_threshold?: number;
  battery_secondary_low_alert?: boolean;
  battery_secondary_low_threshold?: number;
  flow_color?: string | number[];
  unit?: string;
  decimals?: number;
}

type HaFormSchema = Record<string, unknown>;
const SOLAR_SUB_BLOCK_COUNT = 4;
const HOME_SUB_BLOCK_COUNT = 8;
const GRID_SUB_BLOCK_COUNT = 2;

const subBlockFields = (prefix: "solar" | "home" | "grid" | "grid_secondary", index: number): HaFormSchema[] => {
  const slot = `${prefix}_sub_${index}`;
  return [
    { name: `${slot}_enabled`, selector: { boolean: {} } },
    {
      type: "grid",
      name: "",
      schema: [
        { name: `${slot}_entity`, selector: { entity: { filter: { domain: "sensor" } } } },
        { name: `${slot}_label`, selector: { text: {} } },
        {
          name: `${slot}_icon`,
          selector: { icon: {} },
          context: { icon_entity: `${slot}_entity` }
        },
        {
          name: `${slot}_icon_color`,
          selector: { ui_color: { include_state: true, include_none: true, default_color: "state" } }
        }
      ]
    }
  ];
};

const subBlockSchemas = (
  prefix: "solar" | "home" | "grid" | "grid_secondary",
  title: string,
  icon: string,
  count: number
): HaFormSchema => ({
  type: "expandable",
  name: "",
  title,
  icon,
  expanded: false,
  schema: Array.from({ length: count }, (_, index) => ({
    type: "expandable",
    name: "",
    title: `Block ${index + 1}`,
    icon: "mdi:view-grid-outline",
    expanded: false,
    schema: subBlockFields(prefix, index + 1)
  }))
});

const SCHEMA: HaFormSchema[] = [
  { name: "name", selector: { text: {} } },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "home_visible", selector: { boolean: {} } },
      { name: "solar_visible", selector: { boolean: {} } },
      { name: "grid_visible", selector: { boolean: {} } },
      { name: "grid_secondary_visible", selector: { boolean: {} } },
      { name: "battery_visible", selector: { boolean: {} } },
      { name: "battery_secondary_visible", selector: { boolean: {} } }
    ]
  },
  {
    name: "battery_dual_alignment",
    selector: {
      select: {
        mode: "dropdown",
        options: ["center", "left", "right"]
      }
    }
  },
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
      { name: "grid_secondary_entity", selector: { entity: { filter: { domain: "sensor" } } } },
      { name: "battery_entity", selector: { entity: { filter: { domain: "sensor" } } } },
      { name: "battery_secondary_entity", selector: { entity: { filter: { domain: "sensor" } } } }
    ]
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "battery_percentage_entity", selector: { entity: { filter: { domain: "sensor" } } } },
      { name: "battery_secondary_percentage_entity", selector: { entity: { filter: { domain: "sensor" } } } }
    ]
  },
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
          },
          { name: "solar_trend", selector: { boolean: {} } },
          {
            name: "solar_trend_color",
            selector: { ui_color: { include_state: true, include_none: false, default_color: "purple" } }
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
          },
          { name: "grid_trend", selector: { boolean: {} } },
          {
            name: "grid_trend_color",
            selector: { ui_color: { include_state: true, include_none: false, default_color: "purple" } }
          }
        ]
      },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "grid_secondary_label", selector: { text: {} } },
          { name: "grid_secondary_icon", selector: { icon: {} }, context: { icon_entity: "grid_secondary_entity" } },
          {
            name: "grid_secondary_icon_color",
            selector: { ui_color: { include_state: true, include_none: true, default_color: "state" } }
          },
          { name: "grid_secondary_trend", selector: { boolean: {} } },
          {
            name: "grid_secondary_trend_color",
            selector: { ui_color: { include_state: true, include_none: false, default_color: "purple" } }
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
          },
          { name: "home_trend", selector: { boolean: {} } },
          {
            name: "home_trend_color",
            selector: { ui_color: { include_state: true, include_none: false, default_color: "purple" } }
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
          },
          { name: "battery_trend", selector: { boolean: {} } },
          {
            name: "battery_trend_color",
            selector: { ui_color: { include_state: true, include_none: false, default_color: "purple" } }
          },
          { name: "battery_low_alert", selector: { boolean: {} } },
          {
            name: "battery_low_threshold",
            selector: { number: { mode: "box", min: 0, max: 100, step: 1, unit_of_measurement: "%" } }
          }
        ]
      },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "battery_secondary_label", selector: { text: {} } },
          { name: "battery_secondary_icon", selector: { icon: {} }, context: { icon_entity: "battery_secondary_entity" } },
          {
            name: "battery_secondary_icon_color",
            selector: { ui_color: { include_state: true, include_none: true, default_color: "state" } }
          },
          { name: "battery_secondary_trend", selector: { boolean: {} } },
          {
            name: "battery_secondary_trend_color",
            selector: { ui_color: { include_state: true, include_none: false, default_color: "purple" } }
          },
          { name: "battery_secondary_low_alert", selector: { boolean: {} } },
          {
            name: "battery_secondary_low_threshold",
            selector: { number: { mode: "box", min: 0, max: 100, step: 1, unit_of_measurement: "%" } }
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
            selector: { ui_color: { include_state: true, include_none: true, default_color: "none" } }
          },
          {
            name: "flow_color",
            selector: { ui_color: { include_state: true, include_none: true, default_color: "none" } }
          }
        ]
      }
    ]
  },
  subBlockSchemas("solar", "Solar sub blocks", "mdi:solar-power-variant", SOLAR_SUB_BLOCK_COUNT),
  subBlockSchemas("grid", "Grid 1 sub blocks", "mdi:transmission-tower", GRID_SUB_BLOCK_COUNT),
  subBlockSchemas("grid_secondary", "Grid 2 sub blocks", "mdi:transmission-tower", GRID_SUB_BLOCK_COUNT),
  subBlockSchemas("home", "Home sub blocks", "mdi:flash", HOME_SUB_BLOCK_COUNT),
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
  home_visible: "Show home node",
  solar_visible: "Show solar node",
  grid_visible: "Show grid node",
  grid_secondary_visible: "Show second grid node",
  battery_visible: "Show battery node",
  battery_secondary_visible: "Show second battery node",
  battery_dual_alignment: "Dual battery alignment",
  home_entity: "Home entity",
  solar_entity: "Solar entity",
  grid_entity: "Grid entity",
  grid_secondary_entity: "Second grid entity",
  battery_entity: "Battery entity",
  battery_percentage_entity: "Battery percentage entity",
  battery_secondary_entity: "Second battery entity",
  battery_secondary_percentage_entity: "Second battery percentage entity",
  solar_sub_enabled: "Enable solar sub block",
  solar_sub_entity: "Solar sub entity",
  solar_sub_label: "Solar sub label",
  solar_sub_icon: "Solar sub icon",
  solar_sub_icon_color: "Solar sub color",
  home_sub_enabled: "Enable home sub block",
  home_sub_entity: "Home sub entity",
  home_sub_label: "Home sub label",
  home_sub_icon: "Home sub icon",
  home_sub_icon_color: "Home sub color",
  solar_label: "Solar label",
  home_label: "Home label",
  grid_label: "Grid label",
  grid_secondary_label: "Second grid label",
  battery_label: "Battery label",
  battery_secondary_label: "Second battery label",
  solar_icon: "Solar icon",
  solar_icon_color: "Solar color",
  solar_trend: "Solar trend",
  solar_trend_color: "Solar trend color",
  grid_icon: "Grid icon",
  grid_icon_color: "Grid color",
  grid_secondary_icon: "Second grid icon",
  grid_secondary_icon_color: "Second grid color",
  grid_secondary_trend: "Second grid trend",
  grid_secondary_trend_color: "Second grid trend color",
  grid_trend: "Grid trend",
  grid_trend_color: "Grid trend color",
  home_icon: "Home icon",
  home_icon_color: "Home color",
  home_trend: "Home trend",
  home_trend_color: "Home trend color",
  battery_icon: "Battery icon",
  battery_icon_color: "Battery color",
  battery_trend: "Battery trend",
  battery_trend_color: "Battery trend color",
  battery_secondary_icon: "Second battery icon",
  battery_secondary_icon_color: "Second battery color",
  battery_secondary_trend: "Second battery trend",
  battery_secondary_trend_color: "Second battery trend color",
  battery_low_alert: "Low battery alert",
  battery_low_threshold: "Low battery threshold",
  battery_secondary_low_alert: "Second low battery alert",
  battery_secondary_low_threshold: "Second low battery threshold",
  core_icon: "Core icon",
  core_icon_color: "Core color",
  flow_color: "Flow color",
  unit: "Unit",
  decimals: "Decimals"
};

@customElement("power-pilz-energy-card-editor")
export class PowerPilzEnergyCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config?: EnergyCardConfig;

  public setConfig(config: EnergyCardConfig): void {
    this._config = {
      ...config,
      home_visible: config.home_visible ?? true,
      solar_visible: config.solar_visible ?? true,
      grid_visible: config.grid_visible ?? true,
      grid_secondary_visible: config.grid_secondary_visible ?? false,
      battery_visible: config.battery_visible ?? true,
      battery_secondary_visible: config.battery_secondary_visible ?? false,
      battery_dual_alignment: config.battery_dual_alignment ?? "center",
      type: "custom:power-pilz-energy-card"
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
    const subMatch = name.match(/^(solar|home|grid|grid_secondary)_sub_(\d+)_(enabled|entity|label|icon|icon_color)$/);
    if (subMatch) {
      const [, node, index, field] = subMatch;
      const nodeLabel = node === "solar"
        ? "Solar"
        : node === "home"
          ? "Home"
          : node === "grid"
            ? "Grid 1"
            : "Grid 2";
      const fieldLabels: Record<string, string> = {
        enabled: "Enabled",
        entity: "Entity",
        label: "Label",
        icon: "Icon",
        icon_color: "Color"
      };
      return `${nodeLabel} block ${index} ${fieldLabels[field] ?? field}`;
    }
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
    const nextConfig: EnergyCardConfig = {
      ...(value as EnergyCardConfig),
      type: "custom:power-pilz-energy-card"
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
    "power-pilz-energy-card-editor": PowerPilzEnergyCardEditor;
  }
}
