import type { LovelaceCardConfig } from "../../types";
import { tr, type Lang } from "../../utils/i18n";
import { normalizeTrendDataSource, type TrendDataSource } from "../../utils/history";
import {
  normalizeLineThickness as normalizeLineThicknessValue,
  normalizeTimeframeHours as normalizeTimeframeHoursValue,
  type GraphLegendLayout,
  type GraphSlot,
  type GraphTimeframeHours
} from "../../utils/graph";

export type { GraphLegendLayout, GraphSlot, GraphTimeframeHours, TrendDataSource };
export type GraphColor = string | number[];
export type HaFormSchema = Record<string, unknown>;

export const GRAPH_SLOT_COUNT = 4;

export const TREND_DEFAULTS: Record<number, string> = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};

// --- Helper texts ---

const HOVER_HELP =
  "When enabled, hovering over the graph shows the value and timestamp for that point in the legend.";
const AREA_FILL_HELP =
  "When enabled, the area below each trend line is filled with a semi-transparent gradient.";
const SHARED_SCALE_HELP =
  "When enabled, all entities share the same Y-axis scale. When disabled, each entity auto-scales independently.";
const CLIP_BELOW_LABELS_HELP =
  "When enabled, the graph area is clipped so it does not extend behind the legend labels.";
const LINE_WIDTH_HELP =
  "Thickness of the trend lines in pixels.";
const TREND_SOURCE_HELP =
  "Controls where trend data is fetched from. Hybrid prefers statistics and falls back to history automatically.";
const TIMEFRAME_HELP =
  "The time window shown in the graph.";
const LAYOUT_HELP =
  "Controls whether entity legend items are displayed in a row or column layout.";
const NORMALIZE_PERCENT_HELP =
  "When enabled, all entity values are normalized as percentages of a reference total, so the graph always fills 0–100%.";
const PERCENT_REFERENCE_SLOT_HELP =
  "The entity whose value represents 100%. Defaults to the last enabled entity in the stack.";
const PERCENT_REFERENCE_AUTO_HELP =
  "When enabled, the 100% total is auto-calculated by summing all other entities. Useful when you don't have a total meter.";
const ACTION_ENTITY_HELP =
  "Default entity used by more-info actions. Required when tap/hold/double-tap is set to 'More info'.";
const AUTO_SCALE_UNITS_HELP =
  "Automatically formats values with metric prefixes (e.g. W/kW/MW and Wh/kWh/MWh).";
const UNIT_HELP =
  "Optional unit override. Used when entities have no unit_of_measurement attribute.";
const DECIMALS_HELP =
  "Default decimal precision for displayed values.";
const DECIMALS_BASE_HELP =
  "Decimal precision for base units (W, Wh) when auto unit scaling is enabled.";
const DECIMALS_PREFIXED_HELP =
  "Decimal precision for prefixed units (kW, MW, kWh, MWh) when auto unit scaling is enabled.";

// --- Label maps ---

const BASE_LABELS: Record<string, string> = {
  legend_layout: "Layout",
  timeframe_hours: "Range",
  hover_enabled: "Hover",
  fill_area_enabled: "Area fill",
  shared_trend_scale: "Shared scale",
  trend_data_source: "Trend source",
  clip_graph_to_labels: "Clip below labels",
  line_thickness: "Line width",
  unit: "Unit",
  decimals: "Decimals",
  auto_scale_units: "Auto unit scaling",
  decimals_base_unit: "Decimals (base unit)",
  decimals_prefixed_unit: "Decimals (prefixed units)",
  normalize_stack_to_percent: "Normalize to 100%",
  percent_reference_slot: "100% reference entity",
  percent_reference_auto: "Auto-calculate reference",
  entity: "Action entity",
  tap_action: "Tap behavior",
  hold_action: "Hold behavior",
  double_tap_action: "Double tap behavior"
};

// --- Shared config interface ---

interface GraphEditorLikeConfig extends LovelaceCardConfig {
  entity?: string;
  icon?: string;
  icon_color?: GraphColor;
  trend_color?: GraphColor;
  legend_layout?: GraphLegendLayout;
  timeframe_hours?: GraphTimeframeHours | number | string;
  line_thickness?: number;
  hover_enabled?: boolean;
  fill_area_enabled?: boolean;
  shared_trend_scale?: boolean;
  trend_data_source?: TrendDataSource | "auto";
  debug_performance?: boolean;
  clip_graph_to_labels?: boolean;
  auto_scale_units?: boolean;
  decimals_base_unit?: number;
  decimals_prefixed_unit?: number;
  [key: string]: unknown;
}

// --- Entity schema ---

const entitySchema = (index: number): HaFormSchema => ({
  type: "expandable",
  name: "",
  title: `Entity ${index}`,
  icon: "mdi:chart-line",
  expanded: index === 1,
  schema: [
    {
      type: "grid",
      name: "",
      schema: [
        { name: `entity_${index}_enabled`, selector: { boolean: {} } }
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
            { name: `entity_${index}`, selector: { entity: { filter: { domain: "sensor" } } } },
            { name: `entity_${index}_name`, selector: { text: {} } }
          ]
        }
      ]
    },
    {
      type: "expandable",
      name: "",
      title: "Appearance",
      icon: "mdi:palette-outline",
      expanded: true,
      schema: [
        {
          type: "grid",
          name: "",
          columns: 2,
          schema: [
            { name: `entity_${index}_show_icon`, selector: { boolean: {} } },
            { name: `entity_${index}_icon`, selector: { icon: {} }, context: { icon_entity: `entity_${index}` } },
            {
              name: `entity_${index}_icon_color`,
              selector: { ui_color: { include_state: true, include_none: true, default_color: "state" } }
            },
            {
              name: `entity_${index}_trend_color`,
              selector: {
                ui_color: {
                  include_state: true,
                  include_none: false,
                  default_color: TREND_DEFAULTS[index] ?? "purple"
                }
              }
            }
          ]
        }
      ]
    }
  ]
});

// --- Schema builder ---

export const createGraphSchema = (
  includeNormalizeStackToPercent = false,
  percentEnabled = false
): HaFormSchema[] => {

  // --- Graph settings section ---
  const graphSettingsSection: HaFormSchema = {
    type: "expandable",
    name: "",
    title: "Graph settings",
    icon: "mdi:chart-line",
    expanded: false,
    schema: [
      {
        type: "grid",
        name: "",
        columns: 2,
        schema: [
          {
            name: "legend_layout",
            selector: {
              select: {
                mode: "dropdown",
                options: ["row", "column"]
              }
            },
            helper: LAYOUT_HELP,
            description: LAYOUT_HELP
          },
          {
            name: "timeframe_hours",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { label: "6 hours", value: "6" },
                  { label: "12 hours", value: "12" },
                  { label: "24 hours", value: "24" },
                  { label: "48 hours", value: "48" },
                  { label: "3 days", value: "72" },
                  { label: "7 days", value: "168" },
                  { label: "14 days", value: "336" },
                  { label: "30 days", value: "720" }
                ]
              }
            },
            helper: TIMEFRAME_HELP,
            description: TIMEFRAME_HELP
          }
        ]
      },
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "trend_data_source",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { label: "Hybrid (auto fallback)", value: "hybrid" },
                  { label: "Statistics (fastest)", value: "statistics" },
                  { label: "History (raw)", value: "history" }
                ]
              }
            },
            helper: TREND_SOURCE_HELP,
            description: TREND_SOURCE_HELP
          }
        ]
      }
    ]
  };

  // --- Display options section ---
  const displayOptionsSchema: HaFormSchema[] = [
    {
      type: "grid",
      name: "",
      columns: 2,
      schema: [
        {
          name: "hover_enabled",
          selector: { boolean: {} },
          helper: HOVER_HELP,
          description: HOVER_HELP
        },
        {
          name: "fill_area_enabled",
          selector: { boolean: {} },
          helper: AREA_FILL_HELP,
          description: AREA_FILL_HELP
        },
        {
          name: "shared_trend_scale",
          selector: { boolean: {} },
          helper: SHARED_SCALE_HELP,
          description: SHARED_SCALE_HELP
        },
        {
          name: "clip_graph_to_labels",
          selector: { boolean: {} },
          helper: CLIP_BELOW_LABELS_HELP,
          description: CLIP_BELOW_LABELS_HELP
        }
      ]
    },
    {
      type: "grid",
      name: "",
      columns: 2,
      schema: [
        {
          name: "line_thickness",
          selector: { number: { mode: "box", min: 0.5, max: 6, step: 0.1 } },
          helper: LINE_WIDTH_HELP,
          description: LINE_WIDTH_HELP
        }
      ]
    }
  ];

  const displayOptionsSection: HaFormSchema = {
    type: "expandable",
    name: "",
    title: "Display options",
    icon: "mdi:tune-variant",
    expanded: false,
    schema: displayOptionsSchema
  };

  // --- Stacked percent section (stack card only) ---
  const stackedPercentSection: HaFormSchema[] = [];
  if (includeNormalizeStackToPercent) {
    const percentSchema: HaFormSchema[] = [
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "normalize_stack_to_percent",
            selector: { boolean: {} },
            helper: NORMALIZE_PERCENT_HELP,
            description: NORMALIZE_PERCENT_HELP
          }
        ]
      }
    ];

    if (percentEnabled) {
      percentSchema.push(
        {
          type: "grid",
          name: "",
          columns: 2,
          schema: [
            {
              name: "percent_reference_slot",
              selector: {
                select: {
                  mode: "dropdown",
                  options: [
                    { label: "Last entity (default)", value: "" },
                    { label: "Entity 1", value: "1" },
                    { label: "Entity 2", value: "2" },
                    { label: "Entity 3", value: "3" },
                    { label: "Entity 4", value: "4" }
                  ]
                }
              },
              helper: PERCENT_REFERENCE_SLOT_HELP,
              description: PERCENT_REFERENCE_SLOT_HELP
            },
            {
              name: "percent_reference_auto",
              selector: { boolean: {} },
              helper: PERCENT_REFERENCE_AUTO_HELP,
              description: PERCENT_REFERENCE_AUTO_HELP
            }
          ]
        }
      );
    }

    stackedPercentSection.push({
      type: "expandable",
      name: "",
      title: "Stacked percent",
      icon: "mdi:percent-outline",
      expanded: false,
      schema: percentSchema
    });
  }

  // --- Actions section ---
  const actionsSection: HaFormSchema = {
    type: "expandable",
    name: "",
    title: "Actions",
    icon: "mdi:gesture-tap",
    expanded: false,
    schema: [
      {
        name: "entity",
        selector: { entity: {} },
        helper: ACTION_ENTITY_HELP,
        description: ACTION_ENTITY_HELP
      },
      { name: "tap_action", selector: { ui_action: {} } },
      { name: "hold_action", selector: { ui_action: {} } },
      { name: "double_tap_action", selector: { ui_action: {} } }
    ]
  };

  // --- Units and format section ---
  const unitsSection: HaFormSchema = {
    type: "expandable",
    name: "",
    title: "Units and format",
    icon: "mdi:format-list-numbered",
    expanded: false,
    schema: [
      {
        type: "expandable",
        name: "",
        title: "Display format",
        icon: "mdi:decimal",
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
                helper: UNIT_HELP,
                description: UNIT_HELP
              },
              {
                name: "decimals",
                selector: { number: { mode: "box", min: 0, max: 3, step: 1 } },
                helper: DECIMALS_HELP,
                description: DECIMALS_HELP
              }
            ]
          }
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
                name: "decimals_base_unit",
                selector: { number: { mode: "box", min: 0, max: 4, step: 1 } },
                helper: DECIMALS_BASE_HELP,
                description: DECIMALS_BASE_HELP
              },
              {
                name: "decimals_prefixed_unit",
                selector: { number: { mode: "box", min: 0, max: 4, step: 1 } },
                helper: DECIMALS_PREFIXED_HELP,
                description: DECIMALS_PREFIXED_HELP
              }
            ]
          }
        ]
      }
    ]
  };

  // --- Assemble final schema ---
  return [
    graphSettingsSection,
    displayOptionsSection,
    ...stackedPercentSection,
    ...Array.from({ length: GRAPH_SLOT_COUNT }, (_, index) => entitySchema(index + 1)),
    unitsSection,
    actionsSection
  ];
};

// --- Utility functions ---

export const readOptionalString = (value: unknown): string | undefined => {
  if (typeof value !== "string") {
    return undefined;
  }
  return value.length > 0 ? value : undefined;
};

export const normalizeLegendLayout = (value: unknown): GraphLegendLayout =>
  value === "column" ? "column" : "row";

export const normalizeTimeframeHours = (value: unknown): GraphTimeframeHours => {
  return normalizeTimeframeHoursValue(value);
};

export const clampLineThickness = (value: unknown): number => {
  return normalizeLineThicknessValue(value);
};

export const normalizeTrendColor = (
  value: GraphColor | undefined,
  legacy: GraphColor | undefined,
  slot: GraphSlot
): GraphColor => {
  const candidate = value ?? legacy;
  if (Array.isArray(candidate)) {
    return candidate;
  }
  if (typeof candidate === "string" && candidate.trim().length > 0) {
    return candidate;
  }
  return TREND_DEFAULTS[slot] ?? "purple";
};

export const normalizeGraphEntityFields = (config: GraphEditorLikeConfig): Record<string, unknown> => ({
  trend_data_source: normalizeTrendDataSource(config.trend_data_source, "hybrid"),
  entity_1: readOptionalString(config.entity_1) ?? readOptionalString(config.entity),
  entity_1_name: readOptionalString(config.entity_1_name),
  entity_1_enabled: config.entity_1_enabled ?? true,
  entity_1_show_icon: config.entity_1_show_icon ?? true,
  entity_1_icon: config.entity_1_icon ?? config.icon,
  entity_1_icon_color: config.entity_1_icon_color ?? config.icon_color,
  entity_1_trend_color: normalizeTrendColor(config.entity_1_trend_color as GraphColor, config.trend_color, 1),

  entity_2: readOptionalString(config.entity_2),
  entity_2_name: readOptionalString(config.entity_2_name),
  entity_2_enabled: config.entity_2_enabled ?? false,
  entity_2_show_icon: config.entity_2_show_icon ?? true,
  entity_2_icon: config.entity_2_icon,
  entity_2_trend_color: normalizeTrendColor(config.entity_2_trend_color as GraphColor, undefined, 2),

  entity_3: readOptionalString(config.entity_3),
  entity_3_name: readOptionalString(config.entity_3_name),
  entity_3_enabled: config.entity_3_enabled ?? false,
  entity_3_show_icon: config.entity_3_show_icon ?? true,
  entity_3_icon: config.entity_3_icon,
  entity_3_trend_color: normalizeTrendColor(config.entity_3_trend_color as GraphColor, undefined, 3),

  entity_4: readOptionalString(config.entity_4),
  entity_4_name: readOptionalString(config.entity_4_name),
  entity_4_enabled: config.entity_4_enabled ?? false,
  entity_4_show_icon: config.entity_4_show_icon ?? true,
  entity_4_icon: config.entity_4_icon,
  entity_4_trend_color: normalizeTrendColor(config.entity_4_trend_color as GraphColor, undefined, 4)
});

// Map of graph schema field names → i18n keys
const GRAPH_LABEL_KEYS: Record<string, string> = {
  legend_layout: "graph.editor.layout",
  timeframe_hours: "graph.editor.timeframe_hours",
  hover_enabled: "graph.editor.hover_enabled",
  fill_area_enabled: "graph.editor.fill_area_enabled",
  shared_trend_scale: "graph.editor.shared_trend_scale",
  trend_data_source: "graph.editor.trend_data_source",
  clip_graph_to_labels: "graph.editor.clip_graph_to_labels",
  line_thickness: "graph.editor.line_thickness",
  unit: "graph.editor.unit",
  decimals: "graph.editor.decimals",
  auto_scale_units: "graph.editor.auto_scale_units",
  decimals_base_unit: "graph.editor.decimals_base_unit",
  decimals_prefixed_unit: "graph.editor.decimals_prefixed_unit",
  normalize_stack_to_percent: "graph.editor.normalize_stack_to_percent",
  percent_reference_slot: "graph.editor.percent_reference_slot",
  percent_reference_auto: "graph.editor.percent_reference_auto",
  entity: "graph.editor.entity",
  tap_action: "graph.editor.tap_action",
  hold_action: "graph.editor.hold_action",
  double_tap_action: "graph.editor.double_tap_action"
};

export const computeGraphEditorLabel = (
  schema: { name?: string },
  extraLabels: Record<string, string> = {},
  lang: Lang | string = "en"
): string => {
  const name = schema.name ?? "";

  const match = name.match(/^entity_(\d+)_(enabled|name|show_icon|icon|icon_color|trend_color)$/);
  if (match) {
    const [, , field] = match;
    const fieldLabel: Record<string, string> = {
      enabled: lang === "de" ? "Aktiviert" : "Enabled",
      name: lang === "de" ? "Name" : "Name",
      show_icon: lang === "de" ? "Symbol anzeigen" : "Show icon",
      icon: lang === "de" ? "Symbol" : "Icon",
      icon_color: lang === "de" ? "Symbolfarbe" : "Icon color",
      trend_color: lang === "de" ? "Graph-Farbe" : "Graph color"
    };
    return fieldLabel[field] ?? field;
  }

  const entityMatch = name.match(/^entity_(\d+)$/);
  if (entityMatch) {
    return lang === "de" ? "Sensor" : "Sensor";
  }

  if (extraLabels[name]) return extraLabels[name];
  const key = GRAPH_LABEL_KEYS[name];
  if (key) return tr(lang, key);
  return BASE_LABELS[name] ?? name;
};
