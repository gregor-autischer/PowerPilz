import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor } from "../../types";
import { normalizeTrendDataSource, type TrendDataSource } from "../../utils/history";
import { POWER_PILZ_VERSION } from "../../version";
import { tr, haLang, type Lang } from "../../utils/i18n";

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
  battery_invert_flow?: boolean;
  battery_invert_value_sign?: boolean;
  battery_secondary_invert_flow?: boolean;
  battery_secondary_invert_value_sign?: boolean;
  flow_color?: string | number[];
  unit?: string;
  decimals?: number;
  node_actions_enabled?: boolean;
  entity?: string;
}

type HaFormSchema = Record<string, unknown>;
const SOLAR_SUB_BLOCK_COUNT = 4;
const HOME_SUB_BLOCK_COUNT = 8;
const GRID_SUB_BLOCK_COUNT = 2;
const SUB_NODE_STATE_MODE_PREFIXES = new Set(["solar", "home", "grid", "grid_secondary"]);

const trendSourceSelector = (lang: Lang | string | undefined) => ({
  select: {
    mode: "dropdown",
    options: [
      { label: tr(lang, "energy.editor.trend_source_auto"), value: "auto" },
      { label: tr(lang, "energy.editor.trend_source_statistics"), value: "statistics" },
      { label: tr(lang, "energy.editor.trend_source_history"), value: "history" }
    ]
  }
}) as const;

const subBlockFields = (
  prefix: "solar" | "home" | "grid" | "grid_secondary",
  index: number,
  lang: Lang | string | undefined
): HaFormSchema[] => {
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
      title: tr(lang, "energy.editor.section_identity"),
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
              helper: tr(lang, "energy.editor.sub_node_identity_value_render_help"),
              description: tr(lang, "energy.editor.sub_node_identity_value_render_help")
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
            title: tr(lang, "energy.editor.section_display_mode"),
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
                    helper:
                      prefix === "solar"
                        ? tr(lang, "energy.editor.solar_sub_node_state_mode_help")
                        : tr(lang, "energy.editor.sub_node_state_mode_help"),
                    description:
                      prefix === "solar"
                        ? tr(lang, "energy.editor.solar_sub_node_state_mode_help")
                        : tr(lang, "energy.editor.sub_node_state_mode_help")
                  }
                ]
              }
            ]
          }
        ]
      : []),
    nodeActionSection(slot, lang)
  ];
};

const subBlockSchemas = (
  prefix: "solar" | "home" | "grid" | "grid_secondary",
  title: string,
  icon: string,
  count: number,
  lang: Lang | string | undefined
): HaFormSchema => ({
  type: "expandable",
  name: "",
  title,
  icon,
  expanded: false,
  schema: Array.from({ length: count }, (_, index) => ({
    type: "expandable",
    name: "",
    title: tr(lang, "energy.editor.block_n", { n: index + 1 }),
    icon: "mdi:view-grid-outline",
    expanded: false,
    schema: subBlockFields(prefix, index + 1, lang)
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

/** Builds an "Interactions" expandable section for a given node prefix
 *  (e.g. "solar", "home_sub_3"). Mirrors the Mushroom card's
 *  tap/hold/double-tap UI exactly. */
const nodeActionSection = (
  prefix: string,
  lang: Lang | string | undefined,
  title?: string
): HaFormSchema => ({
  type: "expandable",
  name: "",
  title: title ?? tr(lang, "energy.editor.section_interactions"),
  icon: "mdi:gesture-tap",
  expanded: false,
  schema: [
    {
      type: "grid",
      name: "",
      schema: [
        {
          name: `${prefix}_tap_action`,
          selector: { ui_action: {} },
          helper: tr(lang, "energy.editor.node_interaction_help"),
          description: tr(lang, "energy.editor.node_interaction_help")
        },
        {
          name: `${prefix}_hold_action`,
          selector: { ui_action: {} }
        },
        {
          name: `${prefix}_double_tap_action`,
          selector: { ui_action: {} }
        }
      ]
    }
  ]
});

const buildSchema = (lang: Lang | string | undefined): HaFormSchema[] => [
  nodeStyleSection(tr(lang, "energy.editor.section_center_visuals"), "mdi:palette-outline", [
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
    title: tr(lang, "energy.editor.section_units_trend"),
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
        title: tr(lang, "energy.editor.section_auto_scaling"),
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
                helper: tr(lang, "energy.editor.auto_scale_units_help"),
                description: tr(lang, "energy.editor.auto_scale_units_help")
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
                helper: tr(lang, "energy.editor.decimals_prefixed_help"),
                description: tr(lang, "energy.editor.decimals_prefixed_help")
              },
              {
                name: "decimals_base_unit",
                selector: { number: { mode: "box", min: 0, max: 4, step: 1 } },
                helper: tr(lang, "energy.editor.decimals_base_help"),
                description: tr(lang, "energy.editor.decimals_base_help")
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: tr(lang, "energy.editor.section_display_format"),
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
                helper: tr(lang, "energy.editor.unit_field_help"),
                description: tr(lang, "energy.editor.unit_field_help")
              },
              {
                name: "decimals",
                selector: { number: { mode: "box", min: 0, max: 3, step: 1 } },
                helper: tr(lang, "energy.editor.decimals_default_help"),
                description: tr(lang, "energy.editor.decimals_default_help")
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: tr(lang, "energy.editor.section_trend_source"),
        icon: "mdi:database-search",
        expanded: true,
        schema: [
          {
            type: "grid",
            name: "",
            schema: [
              {
                name: "trend_data_source",
                selector: trendSourceSelector(lang),
                helper: tr(lang, "energy.editor.trend_source_help"),
                description: tr(lang, "energy.editor.trend_source_help")
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
    title: tr(lang, "energy.editor.section_solar_node"),
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
            helper: tr(lang, "energy.editor.solar_visible_help"),
            description: tr(lang, "energy.editor.solar_visible_help")
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: tr(lang, "energy.editor.section_identity"),
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
                helper: tr(lang, "energy.editor.solar_flow_direction_help"),
                description: tr(lang, "energy.editor.solar_flow_direction_help")
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
      nodeSubSection(tr(lang, "energy.editor.section_calculation"), [
        {
          name: "solar_auto_calculate",
          selector: { boolean: {} },
          helper: tr(lang, "energy.editor.solar_auto_calc_help"),
          description: tr(lang, "energy.editor.solar_auto_calc_help")
        }
      ]),
      nodeSubSection(tr(lang, "energy.editor.section_trend"), [
        { name: "solar_trend", selector: { boolean: {} } },
        {
          name: "solar_trend_color",
          selector: { ui_color: { include_state: true, include_none: false, default_color: "purple" } }
        }
      ]),
      nodeActionSection("solar", lang)
    ]
  },
  {
    type: "expandable",
    name: "",
    title: tr(lang, "energy.editor.section_grid_node"),
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
            helper: tr(lang, "energy.editor.grid_visible_help"),
            description: tr(lang, "energy.editor.grid_visible_help")
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: tr(lang, "energy.editor.section_identity"),
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
                helper: tr(lang, "energy.editor.grid_flow_direction_help"),
                description: tr(lang, "energy.editor.grid_flow_direction_help")
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
      nodeSubSection(tr(lang, "energy.editor.section_trend"), [
        { name: "grid_trend", selector: { boolean: {} } },
        {
          name: "grid_trend_color",
          selector: { ui_color: { include_state: true, include_none: false, default_color: "purple" } }
        }
      ]),
      nodeSubSection(tr(lang, "energy.editor.section_export"), [
        {
          name: "grid_export_highlight",
          selector: { boolean: {} },
          helper: tr(lang, "energy.editor.grid_export_highlight_help"),
          description: tr(lang, "energy.editor.grid_export_highlight_help")
        },
        {
          name: "grid_export_trend_color",
          selector: { ui_color: { include_state: false, include_none: false, default_color: "red" } }
        },
        {
          name: "grid_export_icon_highlight",
          selector: { boolean: {} },
          helper: tr(lang, "energy.editor.grid_export_icon_highlight_help"),
          description: tr(lang, "energy.editor.grid_export_icon_highlight_help")
        },
        {
          name: "grid_export_icon_color",
          selector: { ui_color: { include_state: false, include_none: false, default_color: "red" } }
        }
      ]),
      nodeActionSection("grid", lang)
    ]
  },
  {
    type: "expandable",
    name: "",
    title: tr(lang, "energy.editor.section_grid_2_node"),
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
            helper: tr(lang, "energy.editor.grid_secondary_visible_help"),
            description: tr(lang, "energy.editor.grid_secondary_visible_help")
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: tr(lang, "energy.editor.section_identity"),
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
                helper: tr(lang, "energy.editor.grid_secondary_flow_direction_help"),
                description: tr(lang, "energy.editor.grid_secondary_flow_direction_help")
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
      nodeSubSection(tr(lang, "energy.editor.section_trend"), [
        { name: "grid_secondary_trend", selector: { boolean: {} } },
        {
          name: "grid_secondary_trend_color",
          selector: { ui_color: { include_state: true, include_none: false, default_color: "purple" } }
        }
      ]),
      nodeSubSection(tr(lang, "energy.editor.section_export"), [
        {
          name: "grid_secondary_export_highlight",
          selector: { boolean: {} },
          helper: tr(lang, "energy.editor.grid_export_highlight_help"),
          description: tr(lang, "energy.editor.grid_export_highlight_help")
        },
        {
          name: "grid_secondary_export_trend_color",
          selector: { ui_color: { include_state: false, include_none: false, default_color: "red" } }
        },
        {
          name: "grid_secondary_export_icon_highlight",
          selector: { boolean: {} },
          helper: tr(lang, "energy.editor.grid_export_icon_highlight_help"),
          description: tr(lang, "energy.editor.grid_export_icon_highlight_help")
        },
        {
          name: "grid_secondary_export_icon_color",
          selector: { ui_color: { include_state: false, include_none: false, default_color: "red" } }
        }
      ]),
      nodeActionSection("grid_secondary", lang)
    ]
  },
  {
    type: "expandable",
    name: "",
    title: tr(lang, "energy.editor.section_home_node"),
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
            helper: tr(lang, "energy.editor.home_visible_help"),
            description: tr(lang, "energy.editor.home_visible_help")
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: tr(lang, "energy.editor.section_identity"),
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
                helper: tr(lang, "energy.editor.home_flow_direction_help"),
                description: tr(lang, "energy.editor.home_flow_direction_help")
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
      nodeSubSection(tr(lang, "energy.editor.section_calculation"), [
        {
          name: "home_auto_calculate",
          selector: { boolean: {} },
          helper: tr(lang, "energy.editor.home_auto_calc_help"),
          description: tr(lang, "energy.editor.home_auto_calc_help")
        }
      ]),
      nodeSubSection(tr(lang, "energy.editor.section_trend"), [
        { name: "home_trend", selector: { boolean: {} } },
        {
          name: "home_trend_color",
          selector: { ui_color: { include_state: true, include_none: false, default_color: "purple" } }
        }
      ]),
      nodeActionSection("home", lang)
    ]
  },
  {
    type: "expandable",
    name: "",
    title: tr(lang, "energy.editor.section_battery_node"),
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
            helper: tr(lang, "energy.editor.battery_visible_help"),
            description: tr(lang, "energy.editor.battery_visible_help")
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: tr(lang, "energy.editor.section_identity"),
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
                helper: tr(lang, "energy.editor.battery_flow_direction_help"),
                description: tr(lang, "energy.editor.battery_flow_direction_help")
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
      nodeSubSection(tr(lang, "energy.editor.section_trend"), [
        { name: "battery_trend", selector: { boolean: {} } },
        {
          name: "battery_trend_color",
          selector: { ui_color: { include_state: true, include_none: false, default_color: "purple" } }
        }
      ]),
      {
        type: "expandable",
        name: "",
        title: tr(lang, "energy.editor.section_sign_convention"),
        icon: "mdi:swap-vertical",
        expanded: false,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "battery_invert_flow",
                selector: { boolean: {} },
                helper: tr(lang, "energy.editor.battery_invert_flow_help"),
                description: tr(lang, "energy.editor.battery_invert_flow_help")
              },
              {
                name: "battery_invert_value_sign",
                selector: { boolean: {} },
                helper: tr(lang, "energy.editor.battery_invert_value_sign_help"),
                description: tr(lang, "energy.editor.battery_invert_value_sign_help")
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: tr(lang, "energy.editor.section_alert"),
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
                helper: tr(lang, "energy.editor.battery_low_alert_color_help"),
                description: tr(lang, "energy.editor.battery_low_alert_color_help")
              }
            ]
          }
        ]
      },
      nodeActionSection("battery", lang)
    ]
  },
  {
    type: "expandable",
    name: "",
    title: tr(lang, "energy.editor.section_battery_2_node"),
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
            helper: tr(lang, "energy.editor.battery_secondary_visible_help"),
            description: tr(lang, "energy.editor.battery_secondary_visible_help")
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: tr(lang, "energy.editor.section_identity"),
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
                helper: tr(lang, "energy.editor.battery_secondary_flow_direction_help"),
                description: tr(lang, "energy.editor.battery_secondary_flow_direction_help")
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
      nodeSubSection(tr(lang, "energy.editor.section_trend"), [
        { name: "battery_secondary_trend", selector: { boolean: {} } },
        {
          name: "battery_secondary_trend_color",
          selector: { ui_color: { include_state: true, include_none: false, default_color: "purple" } }
        }
      ]),
      {
        type: "expandable",
        name: "",
        title: tr(lang, "energy.editor.section_sign_convention"),
        icon: "mdi:swap-vertical",
        expanded: false,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "battery_secondary_invert_flow",
                selector: { boolean: {} },
                helper: tr(lang, "energy.editor.battery_invert_flow_help"),
                description: tr(lang, "energy.editor.battery_invert_flow_help")
              },
              {
                name: "battery_secondary_invert_value_sign",
                selector: { boolean: {} },
                helper: tr(lang, "energy.editor.battery_invert_value_sign_help"),
                description: tr(lang, "energy.editor.battery_invert_value_sign_help")
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: tr(lang, "energy.editor.section_alert"),
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
                helper: tr(lang, "energy.editor.battery_low_alert_color_help"),
                description: tr(lang, "energy.editor.battery_low_alert_color_help")
              }
            ]
          }
        ]
      },
      nodeActionSection("battery_secondary", lang)
    ]
  },
  subBlockSchemas("solar", tr(lang, "energy.editor.section_solar_sub_blocks"), "mdi:solar-power-variant", SOLAR_SUB_BLOCK_COUNT, lang),
  subBlockSchemas("grid", tr(lang, "energy.editor.section_grid_1_sub_blocks"), "mdi:transmission-tower", GRID_SUB_BLOCK_COUNT, lang),
  subBlockSchemas("grid_secondary", tr(lang, "energy.editor.section_grid_2_sub_blocks"), "mdi:transmission-tower", GRID_SUB_BLOCK_COUNT, lang),
  subBlockSchemas("home", tr(lang, "energy.editor.section_home_sub_blocks"), "mdi:flash", HOME_SUB_BLOCK_COUNT, lang),
  {
    type: "expandable",
    name: "",
    title: tr(lang, "energy.editor.section_tap_behavior"),
    icon: "mdi:gesture-tap",
    expanded: false,
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "node_actions_enabled",
            selector: { boolean: {} },
            helper: tr(lang, "energy.editor.node_actions_enabled_help"),
            description: tr(lang, "energy.editor.node_actions_enabled_help")
          }
        ]
      },
      {
        name: "entity",
        selector: { entity: {} },
        helper: tr(lang, "energy.editor.default_entity_help"),
        description: tr(lang, "energy.editor.default_entity_help")
      },
      { name: "tap_action", selector: { ui_action: {} } },
      { name: "hold_action", selector: { ui_action: {} } },
      { name: "double_tap_action", selector: { ui_action: {} } }
    ]
  }
];

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
      battery_invert_flow: config.battery_invert_flow ?? false,
      battery_invert_value_sign: config.battery_invert_value_sign ?? false,
      battery_secondary_invert_flow: config.battery_secondary_invert_flow ?? false,
      battery_secondary_invert_value_sign: config.battery_secondary_invert_value_sign ?? false,
      shared_trend_scale: config.shared_trend_scale ?? false,
      trend_data_source: toEditorTrendDataSource(config.trend_data_source),
      debug_performance: config.debug_performance ?? false,
      decimals: config.decimals ?? 1,
      auto_scale_units: config.auto_scale_units ?? false,
      decimals_base_unit: config.decimals_base_unit ?? config.decimals ?? 1,
      decimals_prefixed_unit: config.decimals_prefixed_unit ?? config.decimals ?? 1,
      node_actions_enabled: config.node_actions_enabled ?? true,
      type: "custom:power-pilz-energy-card"
    };
  }

  private labelMap(): Record<string, string> {
    const lang = haLang(this.hass);
    return {
      name: tr(lang, "energy.editor.name"),
      home_visible: tr(lang, "energy.editor.home_visible"),
      solar_visible: tr(lang, "energy.editor.solar_visible"),
      grid_visible: tr(lang, "energy.editor.grid_visible"),
      grid_secondary_visible: tr(lang, "energy.editor.grid_secondary_visible"),
      battery_visible: tr(lang, "energy.editor.battery_visible"),
      battery_secondary_visible: tr(lang, "energy.editor.battery_secondary_visible"),
      battery_dual_alignment: tr(lang, "energy.editor.battery_dual_alignment"),
      home_auto_calculate: tr(lang, "energy.editor.home_auto_calculate"),
      solar_auto_calculate: tr(lang, "energy.editor.solar_auto_calculate"),
      home_entity: tr(lang, "energy.editor.home_entity"),
      solar_entity: tr(lang, "energy.editor.solar_entity"),
      grid_entity: tr(lang, "energy.editor.grid_entity"),
      grid_secondary_entity: tr(lang, "energy.editor.grid_secondary_entity"),
      battery_entity: tr(lang, "energy.editor.battery_entity"),
      battery_percentage_entity: tr(lang, "energy.editor.battery_percentage_entity"),
      battery_secondary_entity: tr(lang, "energy.editor.battery_secondary_entity"),
      battery_secondary_percentage_entity: tr(lang, "energy.editor.battery_secondary_percentage_entity"),
      solar_sub_enabled: tr(lang, "energy.editor.solar_sub_enabled"),
      solar_sub_entity: tr(lang, "energy.editor.solar_sub_entity"),
      solar_sub_label: tr(lang, "energy.editor.solar_sub_label"),
      solar_sub_icon: tr(lang, "energy.editor.solar_sub_icon"),
      solar_sub_icon_color: tr(lang, "energy.editor.solar_sub_icon_color"),
      home_sub_enabled: tr(lang, "energy.editor.home_sub_enabled"),
      home_sub_entity: tr(lang, "energy.editor.home_sub_entity"),
      home_sub_label: tr(lang, "energy.editor.home_sub_label"),
      home_sub_icon: tr(lang, "energy.editor.home_sub_icon"),
      home_sub_icon_color: tr(lang, "energy.editor.home_sub_icon_color"),
      solar_label: tr(lang, "energy.editor.solar_label"),
      home_label: tr(lang, "energy.editor.home_label"),
      grid_label: tr(lang, "energy.editor.grid_label"),
      grid_secondary_label: tr(lang, "energy.editor.grid_secondary_label"),
      battery_label: tr(lang, "energy.editor.battery_label"),
      battery_secondary_label: tr(lang, "energy.editor.battery_secondary_label"),
      solar_icon: tr(lang, "energy.editor.solar_icon"),
      solar_icon_color: tr(lang, "energy.editor.solar_icon_color"),
      solar_trend: tr(lang, "energy.editor.solar_trend"),
      solar_trend_color: tr(lang, "energy.editor.solar_trend_color"),
      grid_icon: tr(lang, "energy.editor.grid_icon"),
      grid_icon_color: tr(lang, "energy.editor.grid_icon_color"),
      grid_secondary_icon: tr(lang, "energy.editor.grid_secondary_icon"),
      grid_secondary_icon_color: tr(lang, "energy.editor.grid_secondary_icon_color"),
      grid_secondary_trend: tr(lang, "energy.editor.grid_secondary_trend"),
      grid_secondary_trend_color: tr(lang, "energy.editor.grid_secondary_trend_color"),
      grid_trend: tr(lang, "energy.editor.grid_trend"),
      grid_trend_color: tr(lang, "energy.editor.grid_trend_color"),
      grid_export_highlight: tr(lang, "energy.editor.grid_export_highlight"),
      grid_export_trend_color: tr(lang, "energy.editor.grid_export_trend_color"),
      grid_export_icon_highlight: tr(lang, "energy.editor.grid_export_icon_highlight"),
      grid_export_icon_color: tr(lang, "energy.editor.grid_export_icon_color"),
      grid_secondary_export_highlight: tr(lang, "energy.editor.grid_export_highlight"),
      grid_secondary_export_trend_color: tr(lang, "energy.editor.grid_export_trend_color"),
      grid_secondary_export_icon_highlight: tr(lang, "energy.editor.grid_export_icon_highlight"),
      grid_secondary_export_icon_color: tr(lang, "energy.editor.grid_export_icon_color"),
      home_icon: tr(lang, "energy.editor.home_icon"),
      home_icon_color: tr(lang, "energy.editor.home_icon_color"),
      home_trend: tr(lang, "energy.editor.home_trend"),
      home_trend_color: tr(lang, "energy.editor.home_trend_color"),
      battery_icon: tr(lang, "energy.editor.battery_icon"),
      battery_icon_color: tr(lang, "energy.editor.battery_icon_color"),
      battery_trend: tr(lang, "energy.editor.battery_trend"),
      battery_trend_color: tr(lang, "energy.editor.battery_trend_color"),
      battery_secondary_icon: tr(lang, "energy.editor.battery_secondary_icon"),
      battery_secondary_icon_color: tr(lang, "energy.editor.battery_secondary_icon_color"),
      battery_secondary_trend: tr(lang, "energy.editor.battery_secondary_trend"),
      battery_secondary_trend_color: tr(lang, "energy.editor.battery_secondary_trend_color"),
      shared_trend_scale: tr(lang, "energy.editor.shared_trend_scale"),
      trend_data_source: tr(lang, "energy.editor.trend_data_source"),
      battery_low_alert: tr(lang, "energy.editor.battery_low_alert"),
      battery_low_threshold: tr(lang, "energy.editor.battery_low_threshold"),
      battery_low_alert_color: tr(lang, "energy.editor.battery_low_alert_color"),
      battery_secondary_low_alert: tr(lang, "energy.editor.battery_secondary_low_alert"),
      battery_secondary_low_threshold: tr(lang, "energy.editor.battery_secondary_low_threshold"),
      battery_secondary_low_alert_color: tr(lang, "energy.editor.battery_secondary_low_alert_color"),
      battery_invert_flow: tr(lang, "energy.editor.battery_invert_flow"),
      battery_invert_value_sign: tr(lang, "energy.editor.battery_invert_value_sign"),
      battery_secondary_invert_flow: tr(lang, "energy.editor.battery_secondary_invert_flow"),
      battery_secondary_invert_value_sign: tr(lang, "energy.editor.battery_secondary_invert_value_sign"),
      core_icon: tr(lang, "energy.editor.core_icon"),
      core_icon_color: tr(lang, "energy.editor.core_icon_color"),
      flow_color: tr(lang, "energy.editor.flow_color"),
      unit: tr(lang, "energy.editor.unit"),
      decimals: tr(lang, "energy.editor.decimals"),
      auto_scale_units: tr(lang, "energy.editor.auto_scale_units"),
      decimals_base_unit: tr(lang, "energy.editor.decimals_base_unit"),
      decimals_prefixed_unit: tr(lang, "energy.editor.decimals_prefixed_unit"),
      entity: tr(lang, "energy.editor.entity"),
      tap_action: tr(lang, "energy.editor.tap_action"),
      hold_action: tr(lang, "energy.editor.hold_action"),
      double_tap_action: tr(lang, "energy.editor.double_tap_action"),
      node_actions_enabled: tr(lang, "energy.editor.node_actions_enabled"),
      solar_tap_action: tr(lang, "energy.editor.node_tap_action"),
      solar_hold_action: tr(lang, "energy.editor.node_hold_action"),
      solar_double_tap_action: tr(lang, "energy.editor.node_double_tap_action"),
      grid_tap_action: tr(lang, "energy.editor.node_tap_action"),
      grid_hold_action: tr(lang, "energy.editor.node_hold_action"),
      grid_double_tap_action: tr(lang, "energy.editor.node_double_tap_action"),
      grid_secondary_tap_action: tr(lang, "energy.editor.node_tap_action"),
      grid_secondary_hold_action: tr(lang, "energy.editor.node_hold_action"),
      grid_secondary_double_tap_action: tr(lang, "energy.editor.node_double_tap_action"),
      home_tap_action: tr(lang, "energy.editor.node_tap_action"),
      home_hold_action: tr(lang, "energy.editor.node_hold_action"),
      home_double_tap_action: tr(lang, "energy.editor.node_double_tap_action"),
      battery_tap_action: tr(lang, "energy.editor.node_tap_action"),
      battery_hold_action: tr(lang, "energy.editor.node_hold_action"),
      battery_double_tap_action: tr(lang, "energy.editor.node_double_tap_action"),
      battery_secondary_tap_action: tr(lang, "energy.editor.node_tap_action"),
      battery_secondary_hold_action: tr(lang, "energy.editor.node_hold_action"),
      battery_secondary_double_tap_action: tr(lang, "energy.editor.node_double_tap_action")
    };
  }

  private subLabelMap(): Record<string, string> {
    const lang = haLang(this.hass);
    return {
      enabled: tr(lang, "energy.editor.sub_field_enabled"),
      entity: tr(lang, "energy.editor.sub_field_entity"),
      label: tr(lang, "energy.editor.sub_field_label"),
      icon: tr(lang, "energy.editor.sub_field_icon"),
      icon_color: tr(lang, "energy.editor.sub_field_icon_color"),
      state_mode: tr(lang, "energy.editor.sub_field_state_mode"),
      tap_action: tr(lang, "energy.editor.sub_field_tap_action"),
      hold_action: tr(lang, "energy.editor.sub_field_hold_action"),
      double_tap_action: tr(lang, "energy.editor.sub_field_double_tap_action")
    };
  }

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    const lang = haLang(this.hass);

    return html`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${POWER_PILZ_VERSION}
      </div>
      <div style="margin: 0 0 14px; color: var(--secondary-text-color); line-height: 1.4;">
        ${tr(lang, "energy.editor.intro")}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${buildSchema(lang)}
        .computeLabel=${this.computeLabel}
        .computeHelper=${this.computeHelper}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }

  private computeLabel = (schema: { name?: string }): string => {
    const name = schema.name ?? "";
    const subMatch = name.match(
      /^(solar|home|grid|grid_secondary)_sub_(\d+)_(enabled|entity|label|icon|icon_color|state_mode|tap_action|hold_action|double_tap_action)$/
    );
    if (subMatch) {
      const [, , , field] = subMatch;
      const fieldLabels = this.subLabelMap();
      return fieldLabels[field] ?? field;
    }
    return this.labelMap()[name] ?? name;
  };

  private computeHelper = (schema: { name?: string }): string | undefined => {
    const name = schema.name ?? "";
    const lang = haLang(this.hass);
    if (name === "solar_entity") {
      return tr(lang, "energy.editor.solar_flow_direction_help");
    }
    if (name === "grid_entity") {
      return tr(lang, "energy.editor.grid_flow_direction_help");
    }
    if (name === "grid_secondary_entity") {
      return tr(lang, "energy.editor.grid_secondary_flow_direction_help");
    }
    if (name === "home_entity") {
      return tr(lang, "energy.editor.home_flow_direction_help");
    }
    if (name === "battery_entity") {
      return tr(lang, "energy.editor.battery_flow_direction_help");
    }
    if (name === "battery_secondary_entity") {
      return tr(lang, "energy.editor.battery_secondary_flow_direction_help");
    }
    if (/^(solar|home|grid|grid_secondary)_sub_\d+_icon_color$/.test(name)) {
      return tr(lang, "energy.editor.sub_node_identity_value_render_help");
    }
    if (/^(home|grid|grid_secondary)_sub_\d+_state_mode$/.test(name)) {
      return tr(lang, "energy.editor.sub_node_state_mode_help");
    }
    if (/^solar_sub_\d+_state_mode$/.test(name)) {
      return tr(lang, "energy.editor.solar_sub_node_state_mode_help");
    }
    if (name === "solar_visible") {
      return tr(lang, "energy.editor.solar_visible_help");
    }
    if (name === "home_visible") {
      return tr(lang, "energy.editor.home_visible_help");
    }
    if (name === "battery_visible") {
      return tr(lang, "energy.editor.battery_visible_help");
    }
    if (name === "battery_secondary_visible") {
      return tr(lang, "energy.editor.battery_secondary_visible_help");
    }
    if (name === "solar_auto_calculate") {
      return tr(lang, "energy.editor.solar_auto_calc_help");
    }
    if (name === "home_auto_calculate") {
      return tr(lang, "energy.editor.home_auto_calc_help");
    }
    if (name === "grid_visible") {
      return tr(lang, "energy.editor.grid_visible_help");
    }
    if (name === "grid_secondary_visible") {
      return tr(lang, "energy.editor.grid_secondary_visible_help");
    }
    if (name === "grid_export_highlight" || name === "grid_secondary_export_highlight") {
      return tr(lang, "energy.editor.grid_export_highlight_help");
    }
    if (name === "grid_export_icon_highlight" || name === "grid_secondary_export_icon_highlight") {
      return tr(lang, "energy.editor.grid_export_icon_highlight_help");
    }
    if (name === "battery_low_alert_color" || name === "battery_secondary_low_alert_color") {
      return tr(lang, "energy.editor.battery_low_alert_color_help");
    }
    if (name === "unit") {
      return tr(lang, "energy.editor.unit_field_help");
    }
    if (name === "decimals") {
      return tr(lang, "energy.editor.decimals_default_help");
    }
    if (name === "decimals_base_unit") {
      return tr(lang, "energy.editor.decimals_base_help");
    }
    if (name === "decimals_prefixed_unit") {
      return tr(lang, "energy.editor.decimals_prefixed_help");
    }
    if (name === "trend_data_source") {
      return tr(lang, "energy.editor.trend_source_help");
    }
    if (name === "auto_scale_units") {
      return tr(lang, "energy.editor.auto_scale_units_help");
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
