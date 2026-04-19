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
  solar_auto_calculate?: boolean;
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
  grid_export_highlight?: boolean;
  grid_export_trend_color?: string | number[];
  grid_export_icon_highlight?: boolean;
  grid_export_icon_color?: string | number[];
  grid_secondary_export_highlight?: boolean;
  grid_secondary_export_trend_color?: string | number[];
  grid_secondary_export_icon_highlight?: boolean;
  grid_secondary_export_icon_color?: string | number[];
  shared_trend_scale?: boolean;
  trend_data_source?: TrendDataSource | "auto";
  debug_performance?: boolean;
  auto_scale_units?: boolean;
  decimals_base_unit?: number;
  decimals_prefixed_unit?: number;
  battery_low_alert?: boolean;
  battery_low_threshold?: number;
  battery_low_alert_color?: string | number[];
  battery_secondary_low_alert?: boolean;
  battery_secondary_low_threshold?: number;
  battery_secondary_low_alert_color?: string | number[];
  flow_color?: string | number[];
  unit?: string;
  decimals?: number;
}

type HaFormSchema = Record<string, unknown>;
const SOLAR_SUB_BLOCK_COUNT = 4;
const HOME_SUB_BLOCK_COUNT = 8;
const GRID_SUB_BLOCK_COUNT = 2;
const SUB_NODE_STATE_MODE_PREFIXES = new Set(["solar", "home", "grid", "grid_secondary"]);

const subBlockFields = (prefix: "solar" | "home" | "grid" | "grid_secondary", index: number): HaFormSchema[] => {
  const slot = `${prefix}_sub_${index}`;
  const supportsStateMode = SUB_NODE_STATE_MODE_PREFIXES.has(prefix);

  return [
    {
      type: "grid",
      name: "",
      schema: [
        { name: `${slot}_enabled`, selector: { boolean: {} } }
      ]
    },
    {
      type: "expandable",
      name: "",
      title: "Identity",
      icon: "mdi:view-list-outline",
      expanded: true,
      schema: [
        {
          type: "grid",
          name: "",
          columns: 2,
          schema: [
            { name: `${slot}_entity`, selector: { entity: { filter: { domain: ["sensor", "input_number", "number"] } } } },
            { name: `${slot}_label`, selector: { text: {} } }
          ]
        },
        {
          type: "grid",
          name: "",
          columns: 2,
          schema: [
            {
              name: `${slot}_icon`,
              selector: { icon: {} },
              context: { icon_entity: `${slot}_entity` }
            },
            {
              name: `${slot}_icon_color`,
              selector: { ui_color: { include_state: true, include_none: true, default_color: "state" } },
              helper: SUB_NODE_IDENTITY_VALUE_RENDER_HELP,
              description: SUB_NODE_IDENTITY_VALUE_RENDER_HELP
            }
          ]
        }
      ]
    },
    ...(supportsStateMode
      ? [
          {
            type: "expandable",
            name: "",
            title: "Display mode",
            icon: "mdi:form-dropdown",
            expanded: true,
            schema: [
              {
                type: "grid",
                name: "",
                schema: [
                  {
                    name: `${slot}_state_mode`,
                    selector: { boolean: {} },
                    helper: prefix === "solar" ? SOLAR_SUB_NODE_STATE_MODE_HELP : SUB_NODE_STATE_MODE_HELP,
                    description: prefix === "solar" ? SOLAR_SUB_NODE_STATE_MODE_HELP : SUB_NODE_STATE_MODE_HELP
                  }
                ]
              }
            ]
          }
        ]
      : [])
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

const nodeSubSection = (title: string, schema: HaFormSchema[]): HaFormSchema => ({
  type: "expandable",
  name: "",
  title,
  icon: "mdi:view-list-outline",
  expanded: true,
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
      { label: "Auto (recommended)", value: "auto" },
      { label: "Statistics (fastest)", value: "statistics" },
      { label: "History (raw)", value: "history" }
    ]
  }
} as const;

const toEditorTrendDataSource = (value: unknown): TrendDataSource | "auto" => {
  const normalized = normalizeTrendDataSource(value, "hybrid");
  return normalized === "hybrid" ? "auto" : normalized;
};

const toConfigTrendDataSource = (value: unknown): TrendDataSource | "auto" => {
  if (value === "auto" || value === "history" || value === "statistics" || value === "hybrid") {
    return value;
  }
  return "auto";
};

const SOLAR_AUTO_CALC_HELP =
  "When enabled, the solar main node shows the sum of enabled solar sub-node entities instead of the solar entity. Solar sub-nodes with State mode enabled are excluded from this sum.";
const HOME_AUTO_CALC_HELP =
  "When enabled, the home main node is calculated as solar + grid + grid 2 - battery - battery 2 using compatible unit conversion.";
const GRID_EXPORT_HIGHLIGHT_HELP =
  "When enabled, negative grid values (energy exported to the grid) are highlighted in the trend with the export color.";
const GRID_EXPORT_ICON_HIGHLIGHT_HELP =
  "When enabled, the grid icon switches to the export icon color while the grid value is negative.";
const GRID_VISIBLE_HELP =
  "When enabled, the main grid node is shown. When disabled, the grid node is hidden.";
const GRID_SECONDARY_VISIBLE_HELP =
  "When enabled, the second grid node is shown. When disabled, the second grid node is hidden.";
const SOLAR_VISIBLE_HELP =
  "When enabled, the main solar node is shown. When disabled, the solar node is hidden.";
const SOLAR_FLOW_DIRECTION_HELP =
  "Flow direction: + value animates from Solar to Center. 0 or - value shows no solar flow.";
const HOME_VISIBLE_HELP =
  "When enabled, the main home node is shown. When disabled, the home node is hidden.";
const HOME_FLOW_DIRECTION_HELP =
  "Flow direction: + value animates from Center to Home. 0 or - value shows no home flow.";
const BATTERY_VISIBLE_HELP =
  "When enabled, the main battery node is shown. When disabled, the battery node is hidden.";
const BATTERY_FLOW_DIRECTION_HELP =
  "Flow direction: + value animates from Center to Battery (charging). - value animates Battery to Center (discharging).";
const BATTERY_SECONDARY_VISIBLE_HELP =
  "When enabled, the second battery node is shown. When disabled, the second battery node is hidden.";
const BATTERY_SECONDARY_FLOW_DIRECTION_HELP =
  "Flow direction: + value animates from Center to Battery 2 (charging). - value animates Battery 2 to Center (discharging).";
const BATTERY_LOW_ALERT_COLOR_HELP =
  "Color used for battery low-threshold alert styling (icon and low trend section).";
const GRID_FLOW_DIRECTION_HELP =
  "Flow direction: + value animates from Grid to Center (import). - value animates from Center to Grid (export).";
const GRID_SECONDARY_FLOW_DIRECTION_HELP =
  "Flow direction: + value animates from Grid 2 to Center (import). - value animates from Center to Grid 2 (export).";
const SUB_NODE_IDENTITY_VALUE_RENDER_HELP =
  "In default mode, this sub-node renders the entity as numeric value + unit.";
const SUB_NODE_STATE_MODE_HELP =
  "When enabled, this sub-node displays the entity state text (for example AUS/WW/HZ) instead of numeric value + unit.";
const SOLAR_SUB_NODE_STATE_MODE_HELP =
  "When enabled, this solar sub-node displays entity state text instead of numeric value + unit and is excluded from Solar auto-calc.";
const AUTO_SCALE_UNITS_HELP =
  "Automatically formats values with metric prefixes (for example W/kW/MW and Wh/kWh/MWh).";
const UNIT_FIELD_HELP =
  "Optional unit override/fallback. Used when entities have no unit and as preferred output unit for auto-calculated values.";
const DECIMALS_DEFAULT_HELP =
  "Default decimal precision for displayed values and fallback when base/prefixed decimals are not set.";
const DECIMALS_BASE_HELP =
  "Decimal precision for base units (W, Wh) when Auto unit scaling is enabled.";
const DECIMALS_PREFIXED_HELP =
  "Decimal precision for prefixed units (kW, MW, kWh, MWh) when Auto unit scaling is enabled.";
const TREND_SOURCE_HELP =
  "Controls where trend data is fetched from. In most setups, keep Auto (recommended), which prefers statistics and falls back to history automatically.";

const SCHEMA: HaFormSchema[] = [
  nodeStyleSection("Center visuals", "mdi:palette-outline", [
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
  {
    type: "expandable",
    name: "",
    title: "Units and Trend settings",
    icon: "mdi:chart-line",
    expanded: false,
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          { name: "shared_trend_scale", selector: { boolean: {} } }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "Auto scaling",
        icon: "mdi:scale-balance",
        expanded: true,
        schema: [
          {
            type: "grid",
            name: "",
            schema: [
              {
                name: "auto_scale_units",
                selector: { boolean: {} },
                helper: AUTO_SCALE_UNITS_HELP,
                description: AUTO_SCALE_UNITS_HELP
              }
            ]
          },
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "decimals_prefixed_unit",
                selector: { number: { mode: "box", min: 0, max: 4, step: 1 } },
                helper: DECIMALS_PREFIXED_HELP,
                description: DECIMALS_PREFIXED_HELP
              },
              {
                name: "decimals_base_unit",
                selector: { number: { mode: "box", min: 0, max: 4, step: 1 } },
                helper: DECIMALS_BASE_HELP,
                description: DECIMALS_BASE_HELP
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "Display format",
        icon: "mdi:format-list-numbered",
        expanded: true,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "unit",
                selector: { text: {} },
                helper: UNIT_FIELD_HELP,
                description: UNIT_FIELD_HELP
              },
              {
                name: "decimals",
                selector: { number: { mode: "box", min: 0, max: 3, step: 1 } },
                helper: DECIMALS_DEFAULT_HELP,
                description: DECIMALS_DEFAULT_HELP
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "Trend source",
        icon: "mdi:database-search",
        expanded: true,
        schema: [
          {
            type: "grid",
            name: "",
            schema: [
              {
                name: "trend_data_source",
                selector: TREND_SOURCE_SELECTOR,
                helper: TREND_SOURCE_HELP,
                description: TREND_SOURCE_HELP
              }
            ]
          }
        ]
      }
    ]
  },
  {
    type: "expandable",
    name: "",
    title: "Solar node",
    icon: "mdi:weather-sunny",
    expanded: false,
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "solar_visible",
            selector: { boolean: {} },
            helper: SOLAR_VISIBLE_HELP,
            description: SOLAR_VISIBLE_HELP
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "Identity",
        icon: "mdi:view-list-outline",
        expanded: true,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "solar_entity",
                selector: { entity: { filter: { domain: ["sensor", "input_number", "number"] } } },
                helper: SOLAR_FLOW_DIRECTION_HELP,
                description: SOLAR_FLOW_DIRECTION_HELP
              },
              { name: "solar_label", selector: { text: {} } }
            ]
          },
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "solar_icon", selector: { icon: {} }, context: { icon_entity: "solar_entity" } },
              {
                name: "solar_icon_color",
                selector: { ui_color: { include_state: true, include_none: true, default_color: "state" } }
              }
            ]
          }
        ]
      },
      nodeSubSection("Calculation", [
        {
          name: "solar_auto_calculate",
          selector: { boolean: {} },
          helper: SOLAR_AUTO_CALC_HELP,
          description: SOLAR_AUTO_CALC_HELP
        }
      ]),
      nodeSubSection("Trend", [
        { name: "solar_trend", selector: { boolean: {} } },
        {
          name: "solar_trend_color",
          selector: { ui_color: { include_state: true, include_none: false, default_color: "purple" } }
        }
      ])
    ]
  },
  {
    type: "expandable",
    name: "",
    title: "Grid node",
    icon: "mdi:transmission-tower",
    expanded: false,
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "grid_visible",
            selector: { boolean: {} },
            helper: GRID_VISIBLE_HELP,
            description: GRID_VISIBLE_HELP
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "Identity",
        icon: "mdi:view-list-outline",
        expanded: true,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "grid_entity",
                selector: { entity: { filter: { domain: ["sensor", "input_number", "number"] } } },
                helper: GRID_FLOW_DIRECTION_HELP,
                description: GRID_FLOW_DIRECTION_HELP
              },
              { name: "grid_label", selector: { text: {} } }
            ]
          },
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "grid_icon", selector: { icon: {} }, context: { icon_entity: "grid_entity" } },
              {
                name: "grid_icon_color",
                selector: { ui_color: { include_state: true, include_none: true, default_color: "state" } }
              }
            ]
          }
        ]
      },
      nodeSubSection("Trend", [
        { name: "grid_trend", selector: { boolean: {} } },
        {
          name: "grid_trend_color",
          selector: { ui_color: { include_state: true, include_none: false, default_color: "purple" } }
        }
      ]),
      nodeSubSection("Export", [
        {
          name: "grid_export_highlight",
          selector: { boolean: {} },
          helper: GRID_EXPORT_HIGHLIGHT_HELP,
          description: GRID_EXPORT_HIGHLIGHT_HELP
        },
        {
          name: "grid_export_trend_color",
          selector: { ui_color: { include_state: false, include_none: false, default_color: "red" } }
        },
        {
          name: "grid_export_icon_highlight",
          selector: { boolean: {} },
          helper: GRID_EXPORT_ICON_HIGHLIGHT_HELP,
          description: GRID_EXPORT_ICON_HIGHLIGHT_HELP
        },
        {
          name: "grid_export_icon_color",
          selector: { ui_color: { include_state: false, include_none: false, default_color: "red" } }
        }
      ])
    ]
  },
  {
    type: "expandable",
    name: "",
    title: "Grid 2 node",
    icon: "mdi:transmission-tower",
    expanded: false,
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "grid_secondary_visible",
            selector: { boolean: {} },
            helper: GRID_SECONDARY_VISIBLE_HELP,
            description: GRID_SECONDARY_VISIBLE_HELP
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "Identity",
        icon: "mdi:view-list-outline",
        expanded: true,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "grid_secondary_entity",
                selector: { entity: { filter: { domain: ["sensor", "input_number", "number"] } } },
                helper: GRID_SECONDARY_FLOW_DIRECTION_HELP,
                description: GRID_SECONDARY_FLOW_DIRECTION_HELP
              },
              { name: "grid_secondary_label", selector: { text: {} } }
            ]
          },
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "grid_secondary_icon", selector: { icon: {} }, context: { icon_entity: "grid_secondary_entity" } },
              {
                name: "grid_secondary_icon_color",
                selector: { ui_color: { include_state: true, include_none: true, default_color: "state" } }
              }
            ]
          }
        ]
      },
      nodeSubSection("Trend", [
        { name: "grid_secondary_trend", selector: { boolean: {} } },
        {
          name: "grid_secondary_trend_color",
          selector: { ui_color: { include_state: true, include_none: false, default_color: "purple" } }
        }
      ]),
      nodeSubSection("Export", [
        {
          name: "grid_secondary_export_highlight",
          selector: { boolean: {} },
          helper: GRID_EXPORT_HIGHLIGHT_HELP,
          description: GRID_EXPORT_HIGHLIGHT_HELP
        },
        {
          name: "grid_secondary_export_trend_color",
          selector: { ui_color: { include_state: false, include_none: false, default_color: "red" } }
        },
        {
          name: "grid_secondary_export_icon_highlight",
          selector: { boolean: {} },
          helper: GRID_EXPORT_ICON_HIGHLIGHT_HELP,
          description: GRID_EXPORT_ICON_HIGHLIGHT_HELP
        },
        {
          name: "grid_secondary_export_icon_color",
          selector: { ui_color: { include_state: false, include_none: false, default_color: "red" } }
        }
      ])
    ]
  },
  {
    type: "expandable",
    name: "",
    title: "Home node",
    icon: "mdi:home-lightning-bolt",
    expanded: false,
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "home_visible",
            selector: { boolean: {} },
            helper: HOME_VISIBLE_HELP,
            description: HOME_VISIBLE_HELP
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "Identity",
        icon: "mdi:view-list-outline",
        expanded: true,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "home_entity",
                selector: { entity: { filter: { domain: ["sensor", "input_number", "number"] } } },
                helper: HOME_FLOW_DIRECTION_HELP,
                description: HOME_FLOW_DIRECTION_HELP
              },
              { name: "home_label", selector: { text: {} } }
            ]
          },
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "home_icon", selector: { icon: {} }, context: { icon_entity: "home_entity" } },
              {
                name: "home_icon_color",
                selector: { ui_color: { include_state: true, include_none: true, default_color: "state" } }
              }
            ]
          }
        ]
      },
      nodeSubSection("Calculation", [
        {
          name: "home_auto_calculate",
          selector: { boolean: {} },
          helper: HOME_AUTO_CALC_HELP,
          description: HOME_AUTO_CALC_HELP
        }
      ]),
      nodeSubSection("Trend", [
        { name: "home_trend", selector: { boolean: {} } },
        {
          name: "home_trend_color",
          selector: { ui_color: { include_state: true, include_none: false, default_color: "purple" } }
        }
      ])
    ]
  },
  {
    type: "expandable",
    name: "",
    title: "Battery node",
    icon: "mdi:battery",
    expanded: false,
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "battery_visible",
            selector: { boolean: {} },
            helper: BATTERY_VISIBLE_HELP,
            description: BATTERY_VISIBLE_HELP
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "Identity",
        icon: "mdi:view-list-outline",
        expanded: true,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "battery_entity",
                selector: { entity: { filter: { domain: ["sensor", "input_number", "number"] } } },
                helper: BATTERY_FLOW_DIRECTION_HELP,
                description: BATTERY_FLOW_DIRECTION_HELP
              },
              { name: "battery_percentage_entity", selector: { entity: { filter: { domain: ["sensor", "input_number", "number"] } } } }
            ]
          },
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "battery_label", selector: { text: {} } },
              { name: "battery_icon", selector: { icon: {} }, context: { icon_entity: "battery_entity" } }
            ]
          },
          {
            type: "grid",
            name: "",
            schema: [
              {
                name: "battery_icon_color",
                selector: { ui_color: { include_state: true, include_none: true, default_color: "state" } }
              }
            ]
          }
        ]
      },
      nodeSubSection("Trend", [
        { name: "battery_trend", selector: { boolean: {} } },
        {
          name: "battery_trend_color",
          selector: { ui_color: { include_state: true, include_none: false, default_color: "purple" } }
        }
      ]),
      {
        type: "expandable",
        name: "",
        title: "Alert",
        icon: "mdi:alert-outline",
        expanded: true,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
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
              {
                name: "battery_low_alert_color",
                selector: { ui_color: { include_state: false, include_none: false, default_color: "red" } },
                helper: BATTERY_LOW_ALERT_COLOR_HELP,
                description: BATTERY_LOW_ALERT_COLOR_HELP
              }
            ]
          }
        ]
      }
    ]
  },
  {
    type: "expandable",
    name: "",
    title: "Battery 2 node",
    icon: "mdi:battery-outline",
    expanded: false,
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "battery_secondary_visible",
            selector: { boolean: {} },
            helper: BATTERY_SECONDARY_VISIBLE_HELP,
            description: BATTERY_SECONDARY_VISIBLE_HELP
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "Identity",
        icon: "mdi:view-list-outline",
        expanded: true,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "battery_secondary_entity",
                selector: { entity: { filter: { domain: ["sensor", "input_number", "number"] } } },
                helper: BATTERY_SECONDARY_FLOW_DIRECTION_HELP,
                description: BATTERY_SECONDARY_FLOW_DIRECTION_HELP
              },
              { name: "battery_secondary_percentage_entity", selector: { entity: { filter: { domain: ["sensor", "input_number", "number"] } } } }
            ]
          },
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "battery_secondary_label", selector: { text: {} } },
              { name: "battery_secondary_icon", selector: { icon: {} }, context: { icon_entity: "battery_secondary_entity" } }
            ]
          },
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "battery_secondary_icon_color",
                selector: { ui_color: { include_state: true, include_none: true, default_color: "state" } }
              },
              {
                name: "battery_dual_alignment",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: ["center", "left", "right"]
                  }
                }
              }
            ]
          }
        ]
      },
      nodeSubSection("Trend", [
        { name: "battery_secondary_trend", selector: { boolean: {} } },
        {
          name: "battery_secondary_trend_color",
          selector: { ui_color: { include_state: true, include_none: false, default_color: "purple" } }
        }
      ]),
      {
        type: "expandable",
        name: "",
        title: "Alert",
        icon: "mdi:alert-outline",
        expanded: true,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
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
              {
                name: "battery_secondary_low_alert_color",
                selector: { ui_color: { include_state: false, include_none: false, default_color: "red" } },
                helper: BATTERY_LOW_ALERT_COLOR_HELP,
                description: BATTERY_LOW_ALERT_COLOR_HELP
              }
            ]
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
    type: "expandable",
    name: "",
    title: "Actions",
    icon: "mdi:gesture-tap",
    expanded: false,
    schema: [
      {
        name: "entity",
        selector: { entity: {} },
        helper: "Default entity used by more-info actions. Required when tap/hold/double-tap is set to 'More info'.",
        description: "Default entity used by more-info actions. Required when tap/hold/double-tap is set to 'More info'."
      },
      { name: "tap_action", selector: { ui_action: {} } },
      { name: "hold_action", selector: { ui_action: {} } },
      { name: "double_tap_action", selector: { ui_action: {} } }
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
  solar_auto_calculate: "Auto-calc solar",
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
  grid_export_highlight: "Highlight export in trend",
  grid_export_trend_color: "Export trend color",
  grid_export_icon_highlight: "Highlight export icon",
  grid_export_icon_color: "Export icon color",
  grid_secondary_export_highlight: "Highlight export in trend",
  grid_secondary_export_trend_color: "Export trend color",
  grid_secondary_export_icon_highlight: "Highlight export icon",
  grid_secondary_export_icon_color: "Export icon color",
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
  trend_data_source: "Trend source",
  battery_low_alert: "Low battery alert",
  battery_low_threshold: "Low battery %",
  battery_low_alert_color: "Low alert color",
  battery_secondary_low_alert: "Battery 2 low alert",
  battery_secondary_low_threshold: "Battery 2 low %",
  battery_secondary_low_alert_color: "Low alert color",
  core_icon: "Core icon",
  core_icon_color: "Core icon color",
  flow_color: "Flow line color",
  unit: "Unit",
  decimals: "Decimals",
  auto_scale_units: "Auto unit scaling",
  decimals_base_unit: "Decimals (base unit)",
  decimals_prefixed_unit: "Decimals (prefixed units)",
  entity: "Action entity",
  tap_action: "Tap behavior",
  hold_action: "Hold behavior",
  double_tap_action: "Double tap behavior"
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
      solar_auto_calculate: config.solar_auto_calculate ?? false,
      grid_export_highlight: config.grid_export_highlight ?? false,
      grid_export_trend_color: config.grid_export_trend_color ?? "red",
      grid_export_icon_highlight: config.grid_export_icon_highlight ?? false,
      grid_export_icon_color: config.grid_export_icon_color ?? "red",
      grid_secondary_export_highlight: config.grid_secondary_export_highlight ?? false,
      grid_secondary_export_trend_color: config.grid_secondary_export_trend_color ?? "red",
      grid_secondary_export_icon_highlight: config.grid_secondary_export_icon_highlight ?? false,
      grid_secondary_export_icon_color: config.grid_secondary_export_icon_color ?? "red",
      battery_low_alert_color: config.battery_low_alert_color ?? "red",
      battery_secondary_low_alert_color: config.battery_secondary_low_alert_color ?? "red",
      shared_trend_scale: config.shared_trend_scale ?? false,
      trend_data_source: toEditorTrendDataSource(config.trend_data_source),
      debug_performance: config.debug_performance ?? false,
      decimals: config.decimals ?? 1,
      auto_scale_units: config.auto_scale_units ?? false,
      decimals_base_unit: config.decimals_base_unit ?? config.decimals ?? 1,
      decimals_prefixed_unit: config.decimals_prefixed_unit ?? config.decimals ?? 1,
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
      <div style="margin: 0 0 14px; color: var(--secondary-text-color); line-height: 1.4;">
        Highly flexible energy flow card with configurable main nodes, trends, sub-nodes, auto calculations,
        export highlighting, and advanced unit handling.
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${this.computeLabel}
        .computeHelper=${this.computeHelper}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }

  private computeLabel = (schema: { name?: string }): string => {
    const name = schema.name ?? "";
    const subMatch = name.match(
      /^(solar|home|grid|grid_secondary)_sub_(\d+)_(enabled|entity|label|icon|icon_color|state_mode)$/
    );
    if (subMatch) {
      const [, , , field] = subMatch;
      const fieldLabels: Record<string, string> = {
        enabled: "Enabled",
        entity: "Entity",
        label: "Label",
        icon: "Icon",
        icon_color: "Color",
        state_mode: "State mode"
      };
      return fieldLabels[field] ?? field;
    }
    return LABELS[name] ?? name;
  };

  private computeHelper = (schema: { name?: string }): string | undefined => {
    const name = schema.name ?? "";
    if (name === "solar_entity") {
      return SOLAR_FLOW_DIRECTION_HELP;
    }
    if (name === "grid_entity") {
      return GRID_FLOW_DIRECTION_HELP;
    }
    if (name === "grid_secondary_entity") {
      return GRID_SECONDARY_FLOW_DIRECTION_HELP;
    }
    if (name === "home_entity") {
      return HOME_FLOW_DIRECTION_HELP;
    }
    if (name === "battery_entity") {
      return BATTERY_FLOW_DIRECTION_HELP;
    }
    if (name === "battery_secondary_entity") {
      return BATTERY_SECONDARY_FLOW_DIRECTION_HELP;
    }
    if (/^(solar|home|grid|grid_secondary)_sub_\d+_icon_color$/.test(name)) {
      return SUB_NODE_IDENTITY_VALUE_RENDER_HELP;
    }
    if (/^(home|grid|grid_secondary)_sub_\d+_state_mode$/.test(name)) {
      return SUB_NODE_STATE_MODE_HELP;
    }
    if (/^solar_sub_\d+_state_mode$/.test(name)) {
      return SOLAR_SUB_NODE_STATE_MODE_HELP;
    }
    if (name === "solar_visible") {
      return SOLAR_VISIBLE_HELP;
    }
    if (name === "home_visible") {
      return HOME_VISIBLE_HELP;
    }
    if (name === "battery_visible") {
      return BATTERY_VISIBLE_HELP;
    }
    if (name === "battery_secondary_visible") {
      return BATTERY_SECONDARY_VISIBLE_HELP;
    }
    if (name === "solar_auto_calculate") {
      return SOLAR_AUTO_CALC_HELP;
    }
    if (name === "home_auto_calculate") {
      return HOME_AUTO_CALC_HELP;
    }
    if (name === "grid_visible") {
      return GRID_VISIBLE_HELP;
    }
    if (name === "grid_secondary_visible") {
      return GRID_SECONDARY_VISIBLE_HELP;
    }
    if (name === "grid_export_highlight" || name === "grid_secondary_export_highlight") {
      return GRID_EXPORT_HIGHLIGHT_HELP;
    }
    if (name === "grid_export_icon_highlight" || name === "grid_secondary_export_icon_highlight") {
      return GRID_EXPORT_ICON_HIGHLIGHT_HELP;
    }
    if (name === "battery_low_alert_color" || name === "battery_secondary_low_alert_color") {
      return BATTERY_LOW_ALERT_COLOR_HELP;
    }
    if (name === "unit") {
      return UNIT_FIELD_HELP;
    }
    if (name === "decimals") {
      return DECIMALS_DEFAULT_HELP;
    }
    if (name === "decimals_base_unit") {
      return DECIMALS_BASE_HELP;
    }
    if (name === "decimals_prefixed_unit") {
      return DECIMALS_PREFIXED_HELP;
    }
    if (name === "trend_data_source") {
      return TREND_SOURCE_HELP;
    }
    if (name === "auto_scale_units") {
      return AUTO_SCALE_UNITS_HELP;
    }
    return undefined;
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
      trend_data_source: toConfigTrendDataSource((value as EnergyCardConfig).trend_data_source),
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
