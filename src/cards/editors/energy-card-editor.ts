import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor } from "../../types";
import { normalizeTrendDataSource, type TrendDataSource } from "../../utils/history";
import { POWER_PILZ_VERSION } from "../../version";

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
  home_auto_calculate?: boolean;
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
  shared_trend_scale?: boolean;
  trend_data_source?: TrendDataSource | "auto";
  debug_performance?: boolean;
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

const nodeStyleSection = (
  title: string,
  icon: string,
  schema: HaFormSchema[]
): HaFormSchema => ({
  type: "expandable",
  name: "",
  title,
  icon,
  expanded: false,
  schema: [
    {
      type: "grid",
      name: "",
      schema
    }
  ]
});

const TREND_SOURCE_SELECTOR = {
  select: {
    mode: "dropdown",
    options: [
      { label: "Hybrid (auto fallback)", value: "hybrid" },
      { label: "Statistics (fastest)", value: "statistics" },
      { label: "History (raw)", value: "history" }
    ]
  }
} as const;

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
      { name: "home_auto_calculate", selector: { boolean: {} } },
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
  nodeStyleSection("Solar node", "mdi:weather-sunny", [
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
  ]),
  nodeStyleSection("Grid node", "mdi:transmission-tower", [
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
  ]),
  nodeStyleSection("Grid 2 node", "mdi:transmission-tower", [
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
  ]),
  nodeStyleSection("Home node", "mdi:home-lightning-bolt", [
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
  ]),
  nodeStyleSection("Battery node", "mdi:battery", [
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
  ]),
  nodeStyleSection("Battery 2 node", "mdi:battery-outline", [
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
  ]),
  nodeStyleSection("Card visuals", "mdi:palette-outline", [
    { name: "core_icon", selector: { icon: {} }, context: { icon_entity: "home_entity" } },
    {
      name: "core_icon_color",
      selector: { ui_color: { include_state: true, include_none: true, default_color: "none" } }
    },
    {
      name: "flow_color",
      selector: { ui_color: { include_state: true, include_none: true, default_color: "none" } }
    }
  ]),
  nodeStyleSection("Trend settings", "mdi:chart-line", [
    { name: "shared_trend_scale", selector: { boolean: {} } },
    { name: "trend_data_source", selector: TREND_SOURCE_SELECTOR },
    { name: "debug_performance", selector: { boolean: {} } }
  ]),
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
  home_visible: "Show home",
  solar_visible: "Show solar",
  grid_visible: "Show grid",
  grid_secondary_visible: "Show grid 2",
  battery_visible: "Show battery",
  battery_secondary_visible: "Show battery 2",
  battery_dual_alignment: "Battery 2 alignment",
  home_auto_calculate: "Auto-calc home",
  home_entity: "Home sensor",
  solar_entity: "Solar sensor",
  grid_entity: "Grid sensor",
  grid_secondary_entity: "Grid 2 sensor",
  battery_entity: "Battery sensor",
  battery_percentage_entity: "Battery SoC sensor",
  battery_secondary_entity: "Battery 2 sensor",
  battery_secondary_percentage_entity: "Battery 2 SoC sensor",
  solar_sub_enabled: "Enable solar sub",
  solar_sub_entity: "Solar sub sensor",
  solar_sub_label: "Solar sub name",
  solar_sub_icon: "Solar sub icon",
  solar_sub_icon_color: "Solar sub color",
  home_sub_enabled: "Enable home sub",
  home_sub_entity: "Home sub sensor",
  home_sub_label: "Home sub name",
  home_sub_icon: "Home sub icon",
  home_sub_icon_color: "Home sub color",
  solar_label: "Solar name",
  home_label: "Home name",
  grid_label: "Grid name",
  grid_secondary_label: "Grid 2 name",
  battery_label: "Battery name",
  battery_secondary_label: "Battery 2 name",
  solar_icon: "Solar icon",
  solar_icon_color: "Solar icon color",
  solar_trend: "Solar trend",
  solar_trend_color: "Solar trend color",
  grid_icon: "Grid icon",
  grid_icon_color: "Grid icon color",
  grid_secondary_icon: "Grid 2 icon",
  grid_secondary_icon_color: "Grid 2 icon color",
  grid_secondary_trend: "Grid 2 trend",
  grid_secondary_trend_color: "Grid 2 trend color",
  grid_trend: "Grid trend",
  grid_trend_color: "Grid trend color",
  home_icon: "Home icon",
  home_icon_color: "Home icon color",
  home_trend: "Home trend",
  home_trend_color: "Home trend color",
  battery_icon: "Battery icon",
  battery_icon_color: "Battery icon color",
  battery_trend: "Battery trend",
  battery_trend_color: "Battery trend color",
  battery_secondary_icon: "Battery 2 icon",
  battery_secondary_icon_color: "Battery 2 icon color",
  battery_secondary_trend: "Battery 2 trend",
  battery_secondary_trend_color: "Battery 2 trend color",
  shared_trend_scale: "Shared trend scale",
  trend_data_source: "Trend source (auto)",
  debug_performance: "Debug logs",
  battery_low_alert: "Low battery alert",
  battery_low_threshold: "Low battery %",
  battery_secondary_low_alert: "Battery 2 low alert",
  battery_secondary_low_threshold: "Battery 2 low %",
  core_icon: "Core icon",
  core_icon_color: "Core icon color",
  flow_color: "Flow line color",
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
      home_auto_calculate: config.home_auto_calculate ?? false,
      shared_trend_scale: config.shared_trend_scale ?? false,
      trend_data_source: normalizeTrendDataSource(config.trend_data_source, "hybrid"),
      debug_performance: config.debug_performance ?? false,
      type: "custom:power-pilz-energy-card"
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
    const subMatch = name.match(/^(solar|home|grid|grid_secondary)_sub_(\d+)_(enabled|entity|label|icon|icon_color)$/);
    if (subMatch) {
      const [, , , field] = subMatch;
      const fieldLabels: Record<string, string> = {
        enabled: "Enabled",
        entity: "Entity",
        label: "Label",
        icon: "Icon",
        icon_color: "Color"
      };
      return fieldLabels[field] ?? field;
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
