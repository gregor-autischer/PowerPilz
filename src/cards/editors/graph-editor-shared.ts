import type { LovelaceCardConfig } from "../../types";
import {
  normalizeLineThickness as normalizeLineThicknessValue,
  normalizeTimeframeHours as normalizeTimeframeHoursValue,
  type GraphLegendLayout,
  type GraphSlot,
  type GraphTimeframeHours
} from "../../utils/graph";

export type { GraphLegendLayout, GraphSlot, GraphTimeframeHours };
export type GraphColor = string | number[];
export type HaFormSchema = Record<string, unknown>;

export const GRAPH_SLOT_COUNT = 4;

export const TREND_DEFAULTS: Record<number, string> = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};

const BASE_LABELS: Record<string, string> = {
  legend_layout: "Label layout",
  timeframe_hours: "Time range",
  hover_enabled: "Enable hover",
  fill_area_enabled: "Enable area fill",
  shared_trend_scale: "Shared trend scale",
  clip_graph_to_labels: "Clip graph below labels",
  line_thickness: "Line thickness",
  unit: "Unit override",
  decimals: "Decimals"
};

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
  clip_graph_to_labels?: boolean;
  [key: string]: unknown;
}

const entitySchema = (index: number): HaFormSchema => ({
  type: "expandable",
  name: "",
  title: `Entity ${index}`,
  icon: "mdi:chart-line",
  expanded: index === 1,
  schema: [
    { name: `entity_${index}_enabled`, selector: { boolean: {} } },
    {
      type: "grid",
      name: "",
      schema: [
        { name: `entity_${index}`, selector: { entity: { filter: { domain: "sensor" } } } },
        { name: `entity_${index}_name`, selector: { text: {} } },
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
});

export const createGraphSchema = (includeNormalizeStackToPercent = false): HaFormSchema[] => {
  const toggles: HaFormSchema[] = [
    { name: "hover_enabled", selector: { boolean: {} } },
    { name: "fill_area_enabled", selector: { boolean: {} } },
    { name: "shared_trend_scale", selector: { boolean: {} } }
  ];

  if (includeNormalizeStackToPercent) {
    toggles.push({ name: "normalize_stack_to_percent", selector: { boolean: {} } });
  }

  toggles.push(
    { name: "clip_graph_to_labels", selector: { boolean: {} } },
    { name: "line_thickness", selector: { number: { mode: "box", min: 0.5, max: 6, step: 0.1 } } }
  );

  return [
    {
      type: "grid",
      name: "",
      schema: [
        {
          name: "legend_layout",
          selector: {
            select: {
              mode: "dropdown",
              options: ["row", "column"]
            }
          }
        },
        {
          name: "timeframe_hours",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { label: "24 hours", value: 24 },
                { label: "12 hours", value: 12 },
                { label: "6 hours", value: 6 }
              ]
            }
          }
        }
      ]
    },
    {
      type: "grid",
      name: "",
      schema: toggles
    },
    ...Array.from({ length: GRAPH_SLOT_COUNT }, (_, index) => entitySchema(index + 1)),
    {
      type: "grid",
      name: "",
      schema: [
        { name: "unit", selector: { text: {} } },
        { name: "decimals", selector: { number: { mode: "box", min: 0, max: 3, step: 1 } } }
      ]
    }
  ];
};

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

export const computeGraphEditorLabel = (
  schema: { name?: string },
  extraLabels: Record<string, string> = {}
): string => {
  const name = schema.name ?? "";

  const match = name.match(/^entity_(\d+)_(enabled|name|show_icon|icon|icon_color|trend_color)$/);
  if (match) {
    const [, index, field] = match;
    const fieldLabel: Record<string, string> = {
      enabled: "Enabled",
      name: "Name",
      show_icon: "Show icon",
      icon: "Icon",
      icon_color: "Icon color",
      trend_color: "Graph color"
    };
    return `Entity ${index} ${fieldLabel[field] ?? field}`;
  }

  const entityMatch = name.match(/^entity_(\d+)$/);
  if (entityMatch) {
    return `Entity ${entityMatch[1]}`;
  }

  return extraLabels[name] ?? BASE_LABELS[name] ?? name;
};
