import type { HomeAssistant } from "../types";

export type GraphLegendLayout = "row" | "column";
export type GraphSlot = 1 | 2 | 3 | 4;
export type GraphTimeframeHours = 6 | 12 | 24;

type ColorValue = string | number[] | undefined;

export interface GraphSlotConfigShape {
  entity_1?: unknown;
  entity_2?: unknown;
  entity_3?: unknown;
  entity_4?: unknown;
  entity_1_name?: unknown;
  entity_2_name?: unknown;
  entity_3_name?: unknown;
  entity_4_name?: unknown;
  entity_1_enabled?: boolean;
  entity_2_enabled?: boolean;
  entity_3_enabled?: boolean;
  entity_4_enabled?: boolean;
  entity_1_show_icon?: boolean;
  entity_2_show_icon?: boolean;
  entity_3_show_icon?: boolean;
  entity_4_show_icon?: boolean;
  entity_1_icon?: string;
  entity_2_icon?: string;
  entity_3_icon?: string;
  entity_4_icon?: string;
  entity_1_icon_color?: ColorValue;
  entity_2_icon_color?: ColorValue;
  entity_3_icon_color?: ColorValue;
  entity_4_icon_color?: ColorValue;
  entity_1_trend_color?: ColorValue;
  entity_2_trend_color?: ColorValue;
  entity_3_trend_color?: ColorValue;
  entity_4_trend_color?: ColorValue;
}

export const readOptionalConfigString = (value: unknown): string | undefined => {
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

export const slotEntityId = (slot: GraphSlot, config: GraphSlotConfigShape): string | undefined => {
  switch (slot) {
    case 1:
      return readOptionalConfigString(config.entity_1);
    case 2:
      return readOptionalConfigString(config.entity_2);
    case 3:
      return readOptionalConfigString(config.entity_3);
    case 4:
      return readOptionalConfigString(config.entity_4);
    default:
      return undefined;
  }
};

export const slotCustomName = (slot: GraphSlot, config: GraphSlotConfigShape): string | undefined => {
  switch (slot) {
    case 1:
      return readOptionalConfigString(config.entity_1_name);
    case 2:
      return readOptionalConfigString(config.entity_2_name);
    case 3:
      return readOptionalConfigString(config.entity_3_name);
    case 4:
      return readOptionalConfigString(config.entity_4_name);
    default:
      return undefined;
  }
};

export const slotEnabled = (slot: GraphSlot, config: GraphSlotConfigShape): boolean => {
  switch (slot) {
    case 1:
      return config.entity_1_enabled !== false;
    case 2:
      return config.entity_2_enabled === true;
    case 3:
      return config.entity_3_enabled === true;
    case 4:
      return config.entity_4_enabled === true;
    default:
      return false;
  }
};

export const slotShowIcon = (slot: GraphSlot, config: GraphSlotConfigShape): boolean => {
  switch (slot) {
    case 1:
      return config.entity_1_show_icon !== false;
    case 2:
      return config.entity_2_show_icon !== false;
    case 3:
      return config.entity_3_show_icon !== false;
    case 4:
      return config.entity_4_show_icon !== false;
    default:
      return true;
  }
};

export const slotIcon = (slot: GraphSlot, config: GraphSlotConfigShape): string => {
  switch (slot) {
    case 1:
      return config.entity_1_icon ?? "mdi:chart-line";
    case 2:
      return config.entity_2_icon ?? "mdi:chart-line-variant";
    case 3:
      return config.entity_3_icon ?? "mdi:chart-bell-curve";
    case 4:
      return config.entity_4_icon ?? "mdi:chart-timeline-variant";
    default:
      return "mdi:chart-line";
  }
};

export const slotIconColor = (slot: GraphSlot, config: GraphSlotConfigShape): ColorValue => {
  switch (slot) {
    case 1:
      return config.entity_1_icon_color;
    case 2:
      return config.entity_2_icon_color;
    case 3:
      return config.entity_3_icon_color;
    case 4:
      return config.entity_4_icon_color;
    default:
      return undefined;
  }
};

export const slotTrendColor = (slot: GraphSlot, config: GraphSlotConfigShape): ColorValue => {
  switch (slot) {
    case 1:
      return config.entity_1_trend_color;
    case 2:
      return config.entity_2_trend_color;
    case 3:
      return config.entity_3_trend_color;
    case 4:
      return config.entity_4_trend_color;
    default:
      return undefined;
  }
};

export const normalizeLegendLayout = (value: unknown): GraphLegendLayout =>
  value === "column" ? "column" : "row";

export const normalizeTimeframeHours = (
  value: unknown,
  fallbackHours: GraphTimeframeHours = 24
): GraphTimeframeHours => {
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number.parseInt(value, 10)
        : NaN;
  if (parsed === 6 || parsed === 12 || parsed === 24) {
    return parsed;
  }
  return fallbackHours;
};

export const normalizeLineThickness = (value: unknown): number => {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return 1.5;
  }
  return Math.max(0.5, Math.min(6, value));
};

export const resolveEntityName = (
  states: HomeAssistant["states"],
  customName: string | undefined,
  entityId: string,
  index: number
): string => {
  if (customName) {
    return customName;
  }
  const state = states[entityId];
  const friendly = state?.attributes?.friendly_name;
  if (typeof friendly === "string" && friendly.trim().length > 0) {
    return friendly.trim();
  }
  return `Entity ${index}`;
};

export const formatGraphValue = (value: number | null, unit: string, decimals: number): string => {
  if (value === null) {
    return unit ? `-- ${unit}` : "--";
  }
  const formatted = `${value.toFixed(decimals)} ${unit}`.trim();
  return formatted.length > 0 ? formatted : "--";
};
