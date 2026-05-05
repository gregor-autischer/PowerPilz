/**
 * Pure data layer for energy-card-derived chart series.
 *
 * Collects the list of plottable entities from a PowerPilz Energy Card
 * config, mirrors the card's `home_auto_calculate` / `solar_auto_calculate`
 * logic so synthetic series are computed instead of plotting their static
 * fallback entity, and resolves which series is "focused" given a node
 * key (with battery → SOC redirect).
 *
 * Used by both the node-detail dialog and the tap-zoom overlay so the
 * two views always agree on what the data layer says.
 */

import type { HomeAssistant, LovelaceCardConfig } from "../types";
import type { HistoryTrendPoint } from "./history";
import { resolveColor } from "./color";
import { parseConvertibleUnit } from "./unit-scaling";

export type SeriesCategory =
  | "solar"
  | "grid"
  | "grid_secondary"
  | "home"
  | "battery"
  | "battery_secondary"
  | "other";

export interface ComputedSeriesSpec {
  mode: "auto_home" | "auto_solar";
  dependencies: ReadonlyArray<string>;
  unitsByEntityId: Readonly<Record<string, string>>;
  signsByEntityId: Readonly<Record<string, 1 | -1>>;
  outputUnit: string;
}

export interface NodeSeriesDescriptor {
  id: string;
  nodeKey: string;
  entityId: string;
  label: string;
  color: string;
  unit: string;
  isPercentage: boolean;
  isSubBlock: boolean;
  category: SeriesCategory;
  computed?: ComputedSeriesSpec;
}

/** Default chart color when neither the user nor a category override
 *  provides one — matches the energy card's small-node trend default. */
const DEFAULT_TREND_COLOR = "purple";
/** Sub-block trends always render black, regardless of any per-slot
 *  icon color, so they read as clearly auxiliary against the main
 *  nodes' colored curves. */
const SUB_BLOCK_TREND_COLOR = "black";

/** Battery nodes prefer their SOC entity for the focused view — the
 *  visual of a battery node represents charge level, not power. */
const PREFERRED_FOCUS_REDIRECT: Record<string, string> = {
  battery: "battery_percentage",
  battery_secondary: "battery_secondary_percentage"
};

const readString = (value: unknown): string | undefined => {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const friendlyName = (hass: HomeAssistant, entityId: string): string | undefined => {
  const friendly = hass.states[entityId]?.attributes?.friendly_name;
  return typeof friendly === "string" && friendly.length > 0 ? friendly : undefined;
};

const entityUnit = (hass: HomeAssistant, entityId: string): string | undefined => {
  const unit = hass.states[entityId]?.attributes?.unit_of_measurement;
  return typeof unit === "string" ? unit : undefined;
};

/** Picks the chart color for a series. Main nodes resolve from their
 *  configured trend color (the "main graphic color" the user expects
 *  to see in any chart of this node) with a fallback to purple — the
 *  same default the small-node trend uses. Sub-blocks always render
 *  black. The HA "state" sentinel is treated as "not set" so it
 *  doesn't poison the cascade. */
export const resolveSeriesColor = (
  trendColor: unknown,
  category: SeriesCategory,
  isSubBlock: boolean
): string => {
  if (isSubBlock) {
    return resolveColor(SUB_BLOCK_TREND_COLOR, SUB_BLOCK_TREND_COLOR);
  }
  if (Array.isArray(trendColor)) {
    return resolveColor(trendColor as number[], DEFAULT_TREND_COLOR);
  }
  if (typeof trendColor === "string") {
    const trimmed = trendColor.trim();
    if (trimmed.length > 0 && trimmed !== "state") {
      return resolveColor(trimmed, DEFAULT_TREND_COLOR);
    }
  }
  // Battery SOC entities have no dedicated trend color in the card
  // config — fall back to the main battery's trend color when category
  // hints at it. This keeps the SOC line color-aligned with the
  // battery node's trend.
  void category;
  return resolveColor(DEFAULT_TREND_COLOR, DEFAULT_TREND_COLOR);
};

interface MainNodeSpec {
  nodeKey: string;
  category: SeriesCategory;
  entityKey: string;
  labelKey: string;
  iconColorKey: string;
  trendColorKey: string;
  visibleKey: string;
  defaultVisible: boolean;
}

const MAIN_NODE_SPECS: ReadonlyArray<MainNodeSpec> = [
  { nodeKey: "solar", category: "solar", entityKey: "solar_entity", labelKey: "solar_label",
    iconColorKey: "solar_icon_color", trendColorKey: "solar_trend_color",
    visibleKey: "solar_visible", defaultVisible: true },
  { nodeKey: "grid", category: "grid", entityKey: "grid_entity", labelKey: "grid_label",
    iconColorKey: "grid_icon_color", trendColorKey: "grid_trend_color",
    visibleKey: "grid_visible", defaultVisible: true },
  { nodeKey: "grid_secondary", category: "grid_secondary", entityKey: "grid_secondary_entity",
    labelKey: "grid_secondary_label", iconColorKey: "grid_secondary_icon_color",
    trendColorKey: "grid_secondary_trend_color",
    visibleKey: "grid_secondary_visible", defaultVisible: false },
  { nodeKey: "home", category: "home", entityKey: "home_entity", labelKey: "home_label",
    iconColorKey: "home_icon_color", trendColorKey: "home_trend_color",
    visibleKey: "home_visible", defaultVisible: true },
  { nodeKey: "battery", category: "battery", entityKey: "battery_entity", labelKey: "battery_label",
    iconColorKey: "battery_icon_color", trendColorKey: "battery_trend_color",
    visibleKey: "battery_visible", defaultVisible: true },
  { nodeKey: "battery_secondary", category: "battery_secondary", entityKey: "battery_secondary_entity",
    labelKey: "battery_secondary_label", iconColorKey: "battery_secondary_icon_color",
    trendColorKey: "battery_secondary_trend_color",
    visibleKey: "battery_secondary_visible", defaultVisible: false },
];

const isNodeVisible = (config: Record<string, unknown>, spec: MainNodeSpec): boolean =>
  spec.defaultVisible
    ? config[spec.visibleKey] !== false
    : config[spec.visibleKey] === true;

interface SubBlockSpec {
  prefix: string;
  category: SeriesCategory;
  count: number;
}

const SUB_BLOCK_SPECS: ReadonlyArray<SubBlockSpec> = [
  { prefix: "solar", category: "solar", count: 4 },
  { prefix: "grid", category: "grid", count: 2 },
  { prefix: "grid_secondary", category: "grid_secondary", count: 2 },
  { prefix: "home", category: "home", count: 8 }
];

/** Walks the energy-card config and returns one descriptor per
 *  plottable entity (main nodes, battery SOCs, enabled sub-blocks).
 *  Auto-calc is wired into the returned descriptors via `computed`. */
export const collectEnergySeries = (
  hass: HomeAssistant,
  cardConfig: LovelaceCardConfig
): NodeSeriesDescriptor[] => {
  const config = cardConfig as unknown as Record<string, unknown>;
  const out: NodeSeriesDescriptor[] = [];

  const pushMain = (spec: MainNodeSpec): NodeSeriesDescriptor | undefined => {
    if (!isNodeVisible(config, spec)) return undefined;
    const entityId = readString(config[spec.entityKey]);
    if (!entityId) return undefined;
    const label = readString(config[spec.labelKey])
      ?? friendlyName(hass, entityId)
      ?? entityId;
    const color = resolveSeriesColor(config[spec.trendColorKey], spec.category, false);
    const unit = entityUnit(hass, entityId) ?? "";
    const descriptor: NodeSeriesDescriptor = {
      id: entityId,
      nodeKey: spec.nodeKey,
      entityId,
      label,
      color,
      unit,
      isPercentage: unit === "%",
      isSubBlock: false,
      category: spec.category
    };
    out.push(descriptor);
    return descriptor;
  };

  const mainByKey = new Map<string, NodeSeriesDescriptor>();
  for (const spec of MAIN_NODE_SPECS) {
    const descriptor = pushMain(spec);
    if (descriptor) mainByKey.set(spec.nodeKey, descriptor);
  }

  // Battery SOC sensors get their own descriptors so they're independently
  // selectable in the entity list.
  const pushBatteryPercent = (
    pctEntityKey: string,
    labelEntityKey: string,
    trendColorKey: string,
    nodeKey: string,
    category: SeriesCategory,
    fallbackLabel: string
  ): void => {
    const id = readString(config[pctEntityKey]);
    if (!id) return;
    out.push({
      id,
      nodeKey,
      entityId: id,
      label: `${readString(config[labelEntityKey]) ?? fallbackLabel} %`,
      color: resolveSeriesColor(config[trendColorKey], category, false),
      unit: "%",
      isPercentage: true,
      isSubBlock: false,
      category
    });
  };
  if (isNodeVisible(config, MAIN_NODE_SPECS[4])) {
    pushBatteryPercent("battery_percentage_entity", "battery_label", "battery_trend_color",
      "battery_percentage", "battery", "Battery");
  }
  if (isNodeVisible(config, MAIN_NODE_SPECS[5])) {
    pushBatteryPercent("battery_secondary_percentage_entity", "battery_secondary_label",
      "battery_secondary_trend_color", "battery_secondary_percentage", "battery_secondary", "Battery 2");
  }

  // Sub-blocks.
  const solarSubDescriptors: NodeSeriesDescriptor[] = [];
  for (const sub of SUB_BLOCK_SPECS) {
    for (let index = 1; index <= sub.count; index += 1) {
      const slot = `${sub.prefix}_sub_${index}`;
      if (config[`${slot}_enabled`] !== true) continue;
      const entityId = readString(config[`${slot}_entity`]);
      if (!entityId) continue;
      const label = readString(config[`${slot}_label`])
        ?? friendlyName(hass, entityId)
        ?? entityId;
      const color = resolveSeriesColor(undefined, sub.category, true);
      const unit = entityUnit(hass, entityId) ?? "";
      const descriptor: NodeSeriesDescriptor = {
        id: entityId,
        nodeKey: slot,
        entityId,
        label,
        color,
        unit,
        isPercentage: unit === "%",
        isSubBlock: true,
        category: sub.category
      };
      out.push(descriptor);
      if (sub.prefix === "solar" && config[`${slot}_state_mode`] !== true) {
        solarSubDescriptors.push(descriptor);
      }
    }
  }

  // Auto-calc wiring — synthesised at fetch time from dependency entities.
  const homeDescriptor = mainByKey.get("home");
  if (homeDescriptor && config.home_auto_calculate === true) {
    const spec = buildAutoHomeSpec(config, hass, homeDescriptor.unit, mainByKey.get("solar"));
    if (spec) homeDescriptor.computed = spec;
  }
  const solarDescriptor = mainByKey.get("solar");
  if (solarDescriptor && config.solar_auto_calculate === true && solarSubDescriptors.length > 0) {
    solarDescriptor.computed = buildAutoSolarSpec(solarDescriptor.unit, solarSubDescriptors);
  }

  // De-duplicate by entityId — one entity may appear under multiple
  // logical node keys (e.g. battery + battery_percentage).
  const seen = new Set<string>();
  return out.filter((descriptor) => {
    if (seen.has(descriptor.entityId)) return false;
    seen.add(descriptor.entityId);
    return true;
  });
};

const buildAutoHomeSpec = (
  config: Record<string, unknown>,
  hass: HomeAssistant,
  outputUnit: string,
  solarDescriptor: NodeSeriesDescriptor | undefined
): ComputedSeriesSpec | undefined => {
  const dependencies: string[] = [];
  const units: Record<string, string> = {};
  const signs: Record<string, 1 | -1> = {};

  const include = (entityKey: string, sign: 1 | -1): void => {
    const id = readString(config[entityKey]);
    if (!id) return;
    dependencies.push(id);
    units[id] = entityUnit(hass, id) ?? "";
    signs[id] = sign;
  };

  if (config.solar_visible !== false) include("solar_entity", 1);
  if (config.grid_visible !== false) include("grid_entity", 1);
  if (config.grid_secondary_visible === true) include("grid_secondary_entity", 1);
  if (config.battery_visible !== false) include("battery_entity", -1);
  if (config.battery_secondary_visible === true) include("battery_secondary_entity", -1);

  if (dependencies.length === 0) return undefined;

  // If solar is itself auto-calculated, inline its sub-blocks into the
  // home formula — otherwise we'd be summing the static solar fallback.
  if (config.solar_auto_calculate === true && solarDescriptor?.computed?.mode === "auto_solar") {
    const solarId = solarDescriptor.entityId;
    const idx = dependencies.indexOf(solarId);
    if (idx >= 0) {
      dependencies.splice(idx, 1);
      delete units[solarId];
      delete signs[solarId];
      for (const depId of solarDescriptor.computed.dependencies) {
        if (dependencies.includes(depId)) continue;
        dependencies.push(depId);
        units[depId] = solarDescriptor.computed.unitsByEntityId[depId] ?? "";
        signs[depId] = 1;
      }
    }
  }

  return {
    mode: "auto_home",
    dependencies,
    unitsByEntityId: units,
    signsByEntityId: signs,
    outputUnit
  };
};

const buildAutoSolarSpec = (
  outputUnit: string,
  solarSubDescriptors: ReadonlyArray<NodeSeriesDescriptor>
): ComputedSeriesSpec => {
  const dependencies: string[] = [];
  const units: Record<string, string> = {};
  const signs: Record<string, 1> = {};
  for (const desc of solarSubDescriptors) {
    dependencies.push(desc.entityId);
    units[desc.entityId] = desc.unit;
    signs[desc.entityId] = 1;
  }
  return {
    mode: "auto_solar",
    dependencies,
    unitsByEntityId: units,
    signsByEntityId: signs,
    outputUnit
  };
};

/** Resolves a node-key to the concrete series the user wants to focus
 *  on. Honours an optional explicit override (set when the user picks
 *  a different series via the popover) and the battery → SOC redirect. */
export const resolveFocusedSeries = (
  allSeries: ReadonlyArray<NodeSeriesDescriptor>,
  focusedNodeKey: string,
  override?: string | null
): NodeSeriesDescriptor | undefined => {
  if (override) {
    const found = allSeries.find((s) => s.id === override);
    if (found) return found;
  }
  const preferredKey = PREFERRED_FOCUS_REDIRECT[focusedNodeKey];
  if (preferredKey) {
    const preferred = allSeries.find((s) => s.nodeKey === preferredKey);
    if (preferred) return preferred;
  }
  return allSeries.find((s) => s.nodeKey === focusedNodeKey);
};

/** Returns the entity ids needed to draw the given series, including
 *  any auto-calc dependencies. */
export const entityIdsForSeries = (
  series: ReadonlyArray<NodeSeriesDescriptor>
): string[] => {
  const ids = new Set<string>();
  for (const descriptor of series) {
    ids.add(descriptor.entityId);
    if (descriptor.computed) {
      for (const dep of descriptor.computed.dependencies) ids.add(dep);
    }
  }
  return Array.from(ids);
};

/** Linear interpolation. Outside the series' bounds returns the nearest
 *  endpoint value. Returns 0 for an empty series. */
const interpolateAt = (points: ReadonlyArray<HistoryTrendPoint>, ts: number): number => {
  if (points.length === 0) return 0;
  if (ts <= points[0].ts) return points[0].value;
  if (ts >= points[points.length - 1].ts) return points[points.length - 1].value;
  let lo = 0;
  let hi = points.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (points[mid].ts <= ts) lo = mid;
    else hi = mid;
  }
  const a = points[lo];
  const b = points[hi];
  const span = b.ts - a.ts;
  if (span <= 0) return a.value;
  const t = (ts - a.ts) / span;
  return a.value + (b.value - a.value) * t;
};

/** Builds a synthetic time series for an auto_home / auto_solar
 *  descriptor by walking the union of dependency timestamps and
 *  evaluating the formula at each. */
export const computeSeriesPoints = (
  spec: ComputedSeriesSpec,
  historyByEntity: ReadonlyMap<string, HistoryTrendPoint[]>
): HistoryTrendPoint[] => {
  const series = spec.dependencies
    .map((id) => ({
      id,
      unit: spec.unitsByEntityId[id] ?? "",
      sign: spec.signsByEntityId[id] ?? 1,
      points: historyByEntity.get(id) ?? []
    }))
    .filter((entry) => entry.points.length > 0);

  if (series.length === 0) return [];

  const tsSet = new Set<number>();
  for (const entry of series) {
    for (const point of entry.points) tsSet.add(point.ts);
  }
  const timestamps = Array.from(tsSet).sort((a, b) => a - b);

  const factors = new Map<string, number>();
  let outputFamily: "power" | "energy" | null = null;
  for (const entry of series) {
    const parsed = parseConvertibleUnit(entry.unit);
    if (parsed) {
      factors.set(entry.id, parsed.factor);
      outputFamily ??= parsed.family;
    }
  }
  const outputParsed = parseConvertibleUnit(spec.outputUnit);
  const outputFactor = outputParsed && outputParsed.family === outputFamily
    ? outputParsed.factor
    : 1;

  const out: HistoryTrendPoint[] = [];
  for (const ts of timestamps) {
    let canonical = 0;
    for (const entry of series) {
      const value = interpolateAt(entry.points, ts);
      const factor = factors.get(entry.id) ?? 1;
      canonical += entry.sign * value * factor;
    }
    const display = outputFactor > 0 ? canonical / outputFactor : canonical;
    if (Number.isFinite(display)) {
      out.push({ ts, value: display });
    }
  }
  return out;
};

/** Resolves the points to plot for a descriptor — either its own
 *  fetched history or the synthetic auto-calc series. */
export const seriesPointsFor = (
  descriptor: NodeSeriesDescriptor,
  historyByEntity: ReadonlyMap<string, HistoryTrendPoint[]>
): HistoryTrendPoint[] => {
  return descriptor.computed
    ? computeSeriesPoints(descriptor.computed, historyByEntity)
    : (historyByEntity.get(descriptor.entityId) ?? []);
};
