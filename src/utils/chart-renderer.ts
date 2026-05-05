/**
 * High-level multi-series chart renderer used by the energy node-detail
 * dialog. Built on top of `chart-primitives.ts` for canvas operations.
 *
 * Supports three modes:
 *   - "single"          single series with area gradient + line
 *   - "overlay"         multiple series as overlaid lines, with an
 *                       optional secondary y-axis for percentage data
 *                       (so absolute power/energy values share the
 *                       primary axis while battery-% gets its own scale)
 *   - "stacked-percent" cumulative stacked areas summing to 100% at
 *                       every timestamp (percentage-axis series are
 *                       silently excluded — they cannot be stacked).
 *
 * The renderer is deliberately stateless — call `renderChart()` whenever
 * the data, mode or canvas size changes. All canvas DPR/clear handling
 * is delegated to `prepareCanvas`.
 */

import type { HistoryTrendPoint } from "./history";
import { parseConvertibleUnit } from "./unit-scaling";
import {
  fillAreaBetweenPolylines,
  fillAreaUnderPolyline,
  niceTickValues,
  prepareCanvas,
  resolveCssColor,
  strokePolyline,
  withAlpha,
  type CanvasPoint
} from "./chart-primitives";

export type ChartMode = "single" | "overlay" | "stacked-percent";
export type ChartAxis = "primary" | "secondary";

/** A series after the renderer has resolved colors and converted units.
 *  Returned via `ChartContext.rendered` so callers (tooltips) can read
 *  the same data the renderer drew. */
export interface RenderedSeries {
  id: string;
  label: string;
  /** Final CSS color string already passed through `resolveCssColor`. */
  resolvedColor: string;
  /** Raw entity unit kept for display in tooltips ("kW", "%"). */
  rawUnit: string;
  /** Canonical unit ("W"/"Wh"/"%") used by the rendered axis. */
  canonicalUnit: string;
  axis: ChartAxis;
  isPercentage: boolean;
  /** Points after canonical-unit conversion (raw for secondary axis). */
  points: HistoryTrendPoint[];
  /** Original (display-unit) points retained so tooltips can show the
   *  value in the unit the user actually configured. */
  rawPoints: HistoryTrendPoint[];
}

/** Returned by `renderChart()` so the caller can convert canvas pixels
 *  back to timestamps and look up values for a hover tooltip. */
export interface ChartContext {
  innerLeft: number;
  innerRight: number;
  innerTop: number;
  innerBottom: number;
  innerWidth: number;
  innerHeight: number;
  startMs: number;
  endMs: number;
  rendered: ReadonlyArray<RenderedSeries>;
  pixelToTimestamp(canvasX: number): number;
  timestampToPixel(ts: number): number;
  /** Values of every rendered series at the given timestamp. Y returns
   *  the raw (display) value in the same unit as `rawUnit`. */
  valuesAt(ts: number): Array<{
    seriesId: string;
    label: string;
    resolvedColor: string;
    value: number;
    rawUnit: string;
    isPercentage: boolean;
  }>;
}

export interface ChartSeries {
  /** Stable id used for hover-state and de-duplication. */
  id: string;
  /** User-visible label (legend, tooltip). */
  label: string;
  /** CSS-resolvable color (variable, named, rgb()). */
  color: string;
  /** Raw HA unit, e.g. "W", "kW", "kWh", "%", "". */
  unit: string;
  /** Whether the series represents a percentage; placed on the
   *  secondary axis in overlay mode and excluded from stacked-percent. */
  isPercentage: boolean;
  /** Sorted [oldest..newest] history points. */
  points: HistoryTrendPoint[];
}

export interface ChartConfig {
  mode: ChartMode;
  series: ChartSeries[];
  /** Time window endpoints in ms since epoch. */
  startMs: number;
  endMs: number;
  /** Element under which to attach color-resolution probes (a card or
   *  shadow root). Falls back to document.body when omitted. */
  host?: ParentNode & Element;
  /** Optional override label for the primary axis. */
  primaryAxisLabel?: string;
  /** Number of decimals for axis labels (default: auto). */
  decimals?: number;
  /** Y-axis tick density (default: 5). */
  tickCount?: number;
  /** Stroke width for series lines (default: 1.6px). */
  lineWidth?: number;
}

interface AxisDomain {
  min: number;
  max: number;
}

// Padding around the inner plot rect. The left padding has to fit the
// widest y-axis tick label ("1.5 MW"-class strings up to ~6 chars +
// unit), otherwise text overflows the canvas and gets clipped.
const PADDING_LEFT = 64;
const PADDING_RIGHT = 56;
const PADDING_TOP = 12;
const PADDING_BOTTOM = 24;
const AXIS_TICK_FONT = "11px system-ui, -apple-system, sans-serif";
const TICK_COLOR_VAR = "var(--secondary-text-color, #757575)";
const GRID_COLOR = "rgba(127, 127, 127, 0.18)";

/** Renders the chart described by `config` onto `canvas` and returns a
 *  context that lets callers (e.g. a hover tooltip) translate canvas
 *  coordinates back to timestamps and series values. */
export const renderChart = (canvas: HTMLCanvasElement, config: ChartConfig): ChartContext | null => {
  const prepared = prepareCanvas(canvas);
  if (!prepared) return null;
  const { ctx, width, height } = prepared;

  const host = config.host ?? document.body;
  const tickColor = resolveCssColor(host, TICK_COLOR_VAR);

  const innerLeft = PADDING_LEFT;
  const innerRight = width - PADDING_RIGHT;
  const innerTop = PADDING_TOP;
  const innerBottom = height - PADDING_BOTTOM;
  const innerWidth = Math.max(1, innerRight - innerLeft);
  const innerHeight = Math.max(1, innerBottom - innerTop);
  const baseContext = (rendered: RenderedSeries[]): ChartContext =>
    buildContext(rendered, {
      innerLeft, innerRight, innerTop, innerBottom, innerWidth, innerHeight,
      startMs: config.startMs, endMs: config.endMs
    });

  if (config.series.length === 0) {
    drawEmptyState(ctx, innerLeft, innerTop, innerWidth, innerHeight, tickColor);
    return baseContext([]);
  }

  const timeRange = Math.max(1, config.endMs - config.startMs);
  const cache = { ctx: undefined as CanvasRenderingContext2D | null | undefined };

  if (config.mode === "stacked-percent") {
    const rendered = drawStackedPercent(
      ctx,
      config,
      host,
      { innerLeft, innerTop, innerRight, innerBottom, innerWidth, innerHeight },
      timeRange,
      tickColor,
      cache
    );
    drawXAxis(ctx, config, innerLeft, innerBottom, innerWidth, tickColor);
    return baseContext(rendered);
  }

  // single + overlay share axis logic.
  const primarySeries: ChartSeries[] = [];
  const secondarySeries: ChartSeries[] = [];
  for (const series of config.series) {
    if (config.mode === "overlay" && series.isPercentage) {
      secondarySeries.push(series);
    } else {
      primarySeries.push(series);
    }
  }

  // Convert primary series to canonical unit (W or Wh) when possible,
  // so that mixed W/kW/MW overlays line up on a single y-axis.
  const primaryConverted = convertSeriesToCanonical(primarySeries);
  const primaryDomain = computeDomain(primaryConverted.map((s) => s.points));
  const secondaryDomain = secondarySeries.length > 0
    ? computeDomain(secondarySeries.map((s) => s.points))
    : null;

  // Y axis for primary
  drawYAxis(
    ctx,
    primaryDomain,
    innerLeft,
    innerTop,
    innerHeight,
    "left",
    primaryConverted[0]?.canonicalUnit ?? config.primaryAxisLabel ?? "",
    config.tickCount ?? 5,
    config.decimals,
    tickColor
  );

  if (secondaryDomain) {
    drawYAxis(
      ctx,
      secondaryDomain,
      innerRight,
      innerTop,
      innerHeight,
      "right",
      "%",
      config.tickCount ?? 5,
      0,
      tickColor
    );
  }

  // Series.
  const lineWidth = config.lineWidth ?? 1.6;
  const drawnPrimary = primaryConverted.length;
  const rendered: RenderedSeries[] = [];

  for (let index = primaryConverted.length - 1; index >= 0; index -= 1) {
    const series = primaryConverted[index];
    const points = mapSeriesToCanvas(
      series.points,
      config.startMs,
      timeRange,
      primaryDomain,
      innerLeft,
      innerWidth,
      innerTop,
      innerHeight
    );
    const resolved = resolveCssColor(host, series.color);
    if (points.length >= 2) {
      if (config.mode === "single" || drawnPrimary === 1) {
        fillAreaUnderPolyline(ctx, points, resolved, innerBottom, 0.24, 0, cache);
      }
      strokePolyline(ctx, points, resolved, lineWidth);
    }
    rendered.push({
      id: series.id,
      label: series.label,
      resolvedColor: resolved,
      rawUnit: series.unit,
      canonicalUnit: series.canonicalUnit,
      axis: "primary",
      isPercentage: series.isPercentage,
      points: series.points,
      rawPoints: series.rawPoints
    });
  }

  for (const series of secondarySeries) {
    const points = mapSeriesToCanvas(
      series.points,
      config.startMs,
      timeRange,
      secondaryDomain ?? { min: 0, max: 100 },
      innerLeft,
      innerWidth,
      innerTop,
      innerHeight
    );
    const resolved = resolveCssColor(host, series.color);
    if (points.length >= 2) {
      // Dashed style for the secondary axis to visually distinguish it
      // from the primary unit family.
      ctx.save();
      ctx.setLineDash([4, 3]);
      strokePolyline(ctx, points, resolved, lineWidth);
      ctx.restore();
    }
    rendered.push({
      id: series.id,
      label: series.label,
      resolvedColor: resolved,
      rawUnit: series.unit,
      canonicalUnit: series.unit,
      axis: "secondary",
      isPercentage: true,
      points: series.points,
      rawPoints: series.points
    });
  }

  drawXAxis(ctx, config, innerLeft, innerBottom, innerWidth, tickColor);
  return baseContext(rendered);
};

// ---------------------------------------------------------------------
// ChartContext factory
// ---------------------------------------------------------------------

interface ContextRect {
  innerLeft: number;
  innerRight: number;
  innerTop: number;
  innerBottom: number;
  innerWidth: number;
  innerHeight: number;
  startMs: number;
  endMs: number;
}

const buildContext = (rendered: RenderedSeries[], rect: ContextRect): ChartContext => {
  const range = Math.max(1, rect.endMs - rect.startMs);
  const pixelToTimestamp = (canvasX: number): number => {
    const clamped = Math.max(rect.innerLeft, Math.min(rect.innerRight, canvasX));
    const norm = (clamped - rect.innerLeft) / Math.max(1, rect.innerWidth);
    return rect.startMs + norm * range;
  };
  const timestampToPixel = (ts: number): number => {
    const norm = Math.max(0, Math.min(1, (ts - rect.startMs) / range));
    return rect.innerLeft + norm * rect.innerWidth;
  };
  const valuesAt: ChartContext["valuesAt"] = (ts) => {
    return rendered.map((series) => ({
      seriesId: series.id,
      label: series.label,
      resolvedColor: series.resolvedColor,
      value: interpolateAt(series.rawPoints, ts),
      rawUnit: series.rawUnit,
      isPercentage: series.isPercentage
    }));
  };
  return {
    innerLeft: rect.innerLeft,
    innerRight: rect.innerRight,
    innerTop: rect.innerTop,
    innerBottom: rect.innerBottom,
    innerWidth: rect.innerWidth,
    innerHeight: rect.innerHeight,
    startMs: rect.startMs,
    endMs: rect.endMs,
    rendered,
    pixelToTimestamp,
    timestampToPixel,
    valuesAt
  };
};

// ---------------------------------------------------------------------
// Domain & coordinate helpers
// ---------------------------------------------------------------------

const computeDomain = (seriesPoints: ReadonlyArray<ReadonlyArray<HistoryTrendPoint>>): AxisDomain => {
  let min = Infinity;
  let max = -Infinity;
  for (const points of seriesPoints) {
    for (const point of points) {
      if (!Number.isFinite(point.value)) continue;
      if (point.value < min) min = point.value;
      if (point.value > max) max = point.value;
    }
  }
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return { min: 0, max: 1 };
  }
  if (min === max) {
    const pad = Math.abs(min) * 0.1 || 1;
    return { min: min - pad, max: max + pad };
  }
  // Zero baseline if data is non-negative.
  if (min >= 0) min = 0;
  // Symmetric padding to nice boundaries.
  const range = max - min;
  return { min: min - range * 0.05, max: max + range * 0.05 };
};

const mapSeriesToCanvas = (
  points: ReadonlyArray<HistoryTrendPoint>,
  startMs: number,
  timeRange: number,
  domain: AxisDomain,
  innerLeft: number,
  innerWidth: number,
  innerTop: number,
  innerHeight: number
): CanvasPoint[] => {
  const range = Math.max(1e-9, domain.max - domain.min);
  return points
    .filter((point) => Number.isFinite(point.ts) && Number.isFinite(point.value))
    .map((point) => {
      const tNorm = Math.max(0, Math.min(1, (point.ts - startMs) / timeRange));
      const vNorm = Math.max(0, Math.min(1, (point.value - domain.min) / range));
      return {
        x: innerLeft + tNorm * innerWidth,
        y: innerTop + (1 - vNorm) * innerHeight
      };
    });
};

// ---------------------------------------------------------------------
// Unit conversion
// ---------------------------------------------------------------------

interface CanonicalSeries extends ChartSeries {
  canonicalUnit: string;
  /** Original (display-unit) points before canonical conversion. */
  rawPoints: HistoryTrendPoint[];
}

const convertSeriesToCanonical = (series: ReadonlyArray<ChartSeries>): CanonicalSeries[] => {
  // Collect units; if all parseable to the same family, convert to canonical.
  const parsed = series.map((s) => ({ s, parsed: parseConvertibleUnit(s.unit) }));
  let family: "power" | "energy" | null = null;
  let allCompatible = true;
  for (const entry of parsed) {
    if (!entry.parsed) {
      allCompatible = false;
      break;
    }
    if (family === null) {
      family = entry.parsed.family;
    } else if (family !== entry.parsed.family) {
      allCompatible = false;
      break;
    }
  }

  if (!allCompatible) {
    // Fall back to raw values; pick the unit of the first series for the axis label.
    return series.map((s) => ({ ...s, canonicalUnit: s.unit, rawPoints: s.points }));
  }

  return parsed.map(({ s, parsed: p }) => {
    if (!p) {
      return { ...s, canonicalUnit: s.unit, rawPoints: s.points };
    }
    const factor = p.factor;
    const converted: HistoryTrendPoint[] = s.points.map((pt) => ({
      ts: pt.ts,
      value: pt.value * factor
    }));
    return { ...s, points: converted, canonicalUnit: p.canonicalUnit, rawPoints: s.points };
  });
};

// ---------------------------------------------------------------------
// Axes
// ---------------------------------------------------------------------

const drawYAxis = (
  ctx: CanvasRenderingContext2D,
  domain: AxisDomain,
  x: number,
  innerTop: number,
  innerHeight: number,
  side: "left" | "right",
  unitLabel: string,
  tickCount: number,
  decimals: number | undefined,
  tickColor: string
): void => {
  const range = Math.max(1e-9, domain.max - domain.min);
  // Always pin labels at the domain endpoints (the user wants to see
  // the axis bounds — e.g. 0 % and 100 %), then fill in nice
  // intermediate ticks. Drop intermediates that visually collide with
  // the endpoints so labels never overlap.
  const collisionDistance = range * 0.07;
  const intermediates = niceTickValues(domain.min, domain.max, tickCount).filter(
    (tick) =>
      tick > domain.min + collisionDistance
      && tick < domain.max - collisionDistance
  );
  const finalTicks = [domain.min, ...intermediates, domain.max];

  ctx.save();
  ctx.font = AXIS_TICK_FONT;
  ctx.fillStyle = tickColor;
  ctx.textBaseline = "middle";
  ctx.textAlign = side === "left" ? "right" : "left";

  for (const tick of finalTicks) {
    const norm = (tick - domain.min) / range;
    const y = innerTop + (1 - norm) * innerHeight;
    const labelX = side === "left" ? x - 6 : x + 6;
    ctx.fillText(formatTick(tick, unitLabel, decimals), labelX, y);
    if (side === "left") {
      ctx.strokeStyle = GRID_COLOR;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y + 0.5);
      ctx.lineTo(x + (ctx.canvas.width - 0.001), y + 0.5);
      ctx.stroke();
    }
  }
  ctx.restore();
};

const drawXAxis = (
  ctx: CanvasRenderingContext2D,
  config: ChartConfig,
  innerLeft: number,
  innerBottom: number,
  innerWidth: number,
  tickColor: string
): void => {
  const range = Math.max(1, config.endMs - config.startMs);
  // Pin the start and end timestamps as labelled ticks, then keep the
  // auto-generated nice ticks that don't visually collide with them.
  const collisionMs = range * 0.07;
  const formatter = pickTimeFormatter(range);
  const intermediates = pickTimeTicks(config.startMs, config.endMs).filter(
    (tick) =>
      tick.ms > config.startMs + collisionMs
      && tick.ms < config.endMs - collisionMs
  );
  const finalTicks: Array<{ ms: number; label: string; align: CanvasTextAlign }> = [
    { ms: config.startMs, label: formatter(new Date(config.startMs)), align: "left" },
    ...intermediates.map((t) => ({ ms: t.ms, label: t.label, align: "center" as CanvasTextAlign })),
    { ms: config.endMs, label: formatter(new Date(config.endMs)), align: "right" }
  ];

  ctx.save();
  ctx.font = AXIS_TICK_FONT;
  ctx.fillStyle = tickColor;
  ctx.textBaseline = "top";

  for (const tick of finalTicks) {
    const tNorm = (tick.ms - config.startMs) / range;
    if (tNorm < 0 || tNorm > 1) continue;
    const x = innerLeft + tNorm * innerWidth;
    ctx.strokeStyle = GRID_COLOR;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + 0.5, innerBottom - 4);
    ctx.lineTo(x + 0.5, innerBottom);
    ctx.stroke();
    ctx.textAlign = tick.align;
    ctx.fillText(tick.label, x, innerBottom + 4);
  }
  ctx.restore();
};

interface TimeTick {
  ms: number;
  label: string;
}

const HOUR_MS = 3600 * 1000;
const DAY_MS = 24 * HOUR_MS;

const pickTimeFormatter = (rangeMs: number): (date: Date) => string => {
  if (rangeMs <= 6 * HOUR_MS) return (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  if (rangeMs <= 2 * DAY_MS) return (d) => `${pad(d.getHours())}:00`;
  if (rangeMs <= 200 * DAY_MS) return (d) => `${pad(d.getDate())}.${pad(d.getMonth() + 1)}`;
  return (d) => `${pad(d.getMonth() + 1)}/${String(d.getFullYear()).slice(2)}`;
};

const pickTimeStep = (rangeMs: number): number => {
  if (rangeMs <= 6 * HOUR_MS) return HOUR_MS;
  if (rangeMs <= 2 * DAY_MS) return 6 * HOUR_MS;
  if (rangeMs <= 14 * DAY_MS) return DAY_MS;
  if (rangeMs <= 90 * DAY_MS) return 7 * DAY_MS;
  if (rangeMs <= 200 * DAY_MS) return 14 * DAY_MS;
  return 30 * DAY_MS;
};

const pickTimeTicks = (startMs: number, endMs: number): TimeTick[] => {
  const range = endMs - startMs;
  const stepMs = pickTimeStep(range);
  const formatter = pickTimeFormatter(range);

  const first = Math.ceil(startMs / stepMs) * stepMs;
  const ticks: TimeTick[] = [];
  for (let ms = first; ms <= endMs; ms += stepMs) {
    ticks.push({ ms, label: formatter(new Date(ms)) });
    if (ticks.length > 16) break;
  }
  return ticks;
};

const pad = (n: number): string => String(n).padStart(2, "0");

const formatTick = (value: number, unit: string, decimals?: number): string => {
  const abs = Math.abs(value);
  const dec = decimals !== undefined
    ? decimals
    : abs >= 100 ? 0
    : abs >= 10 ? 1
    : 2;
  const text = value.toFixed(dec);
  return unit ? `${text} ${unit}` : text;
};

// ---------------------------------------------------------------------
// Stacked-percent rendering
// ---------------------------------------------------------------------

interface InnerRect {
  innerLeft: number;
  innerTop: number;
  innerRight: number;
  innerBottom: number;
  innerWidth: number;
  innerHeight: number;
}

const drawStackedPercent = (
  ctx: CanvasRenderingContext2D,
  config: ChartConfig,
  host: ParentNode & Element,
  rect: InnerRect,
  timeRange: number,
  tickColor: string,
  cache: { ctx?: CanvasRenderingContext2D | null }
): RenderedSeries[] => {
  // Filter percentage entities — they can't be sensibly stacked with power/energy.
  const stackable = config.series.filter((s) => !s.isPercentage);
  if (stackable.length === 0) {
    drawEmptyState(ctx, rect.innerLeft, rect.innerTop, rect.innerWidth, rect.innerHeight, tickColor);
    return [];
  }

  // Convert all series to canonical unit so absolute magnitudes match.
  const canonical = convertSeriesToCanonical(stackable);

  // Build a unified timestamp grid (union of all series' ts, downsampled
  // if huge). 256 points across the visible range is plenty for smooth
  // stacked rendering.
  const timestamps = buildSampleTimestamps(canonical, config.startMs, config.endMs, 256);
  if (timestamps.length < 2) {
    drawEmptyState(ctx, rect.innerLeft, rect.innerTop, rect.innerWidth, rect.innerHeight, tickColor);
    return [];
  }

  // Interpolate each series at each timestamp. Negative values are
  // clamped to 0 (stacking only makes sense for non-negative shares).
  const interpolated = canonical.map((series) =>
    timestamps.map((ts) => Math.max(0, interpolateAt(series.points, ts)))
  );

  // Compute the cumulative total at each timestamp.
  const totals = timestamps.map((_, tIndex) => {
    let sum = 0;
    for (const slot of interpolated) sum += slot[tIndex];
    return sum;
  });

  // Draw axis (0..100%).
  drawYAxis(
    ctx,
    { min: 0, max: 100 },
    rect.innerLeft,
    rect.innerTop,
    rect.innerHeight,
    "left",
    "%",
    config.tickCount ?? 5,
    0,
    tickColor
  );

  // Draw stacked layers in slot order (slot 0 = bottom). Build a parallel
  // RenderedSeries[] where each series' tooltip-facing points are its
  // share-of-total (0..100) at each timestamp — that is what the user
  // actually sees in the stacked-percent chart.
  let lowerCurve: CanvasPoint[] = timestamps.map((ts) => ({
    x: timeToCanvasX(ts, config.startMs, timeRange, rect.innerLeft, rect.innerWidth),
    y: rect.innerBottom
  }));

  const rendered: RenderedSeries[] = [];
  const cumulative: number[] = timestamps.map(() => 0);
  for (let slot = 0; slot < canonical.length; slot += 1) {
    const series = canonical[slot];
    const slotValues = interpolated[slot];
    const upper: CanvasPoint[] = [];
    const sharePoints: HistoryTrendPoint[] = [];
    for (let tIndex = 0; tIndex < timestamps.length; tIndex += 1) {
      const ts = timestamps[tIndex];
      cumulative[tIndex] += slotValues[tIndex];
      const total = totals[tIndex];
      const cumulativeShare = total > 0 ? (cumulative[tIndex] / total) * 100 : 0;
      const ownShare = total > 0 ? (slotValues[tIndex] / total) * 100 : 0;
      const yNorm = Math.max(0, Math.min(1, cumulativeShare / 100));
      upper.push({
        x: timeToCanvasX(ts, config.startMs, timeRange, rect.innerLeft, rect.innerWidth),
        y: rect.innerTop + (1 - yNorm) * rect.innerHeight
      });
      sharePoints.push({ ts, value: ownShare });
    }

    const resolvedColor = resolveCssColor(host, series.color);
    fillAreaBetweenPolylines(ctx, upper, lowerCurve, withAlpha(resolvedColor, 0.45, cache));
    strokePolyline(ctx, upper, resolvedColor, config.lineWidth ?? 1.4);
    lowerCurve = upper;

    rendered.push({
      id: series.id,
      label: series.label,
      resolvedColor,
      rawUnit: "%",
      canonicalUnit: "%",
      axis: "primary",
      isPercentage: true,
      points: sharePoints,
      rawPoints: sharePoints
    });
  }
  return rendered;
};

const buildSampleTimestamps = (
  series: ReadonlyArray<ChartSeries>,
  startMs: number,
  endMs: number,
  maxSamples: number
): number[] => {
  if (endMs <= startMs) return [];
  // Use evenly spaced samples — simple & sufficient for stacking.
  const count = Math.max(2, Math.min(maxSamples, 512));
  const step = (endMs - startMs) / (count - 1);
  const out: number[] = [];
  for (let index = 0; index < count; index += 1) {
    out.push(startMs + index * step);
  }
  // Ensure we have at least one series with data inside the range.
  const anyData = series.some((s) => s.points.some((pt) => pt.ts >= startMs && pt.ts <= endMs));
  return anyData ? out : [];
};

/**
 * Linear interpolation of a series at the given timestamp. Outside the
 * series' bounds returns the nearest endpoint value (so far-future or
 * far-past samples are clamped). Returns 0 if the series is empty.
 */
const interpolateAt = (points: ReadonlyArray<HistoryTrendPoint>, ts: number): number => {
  if (points.length === 0) return 0;
  if (ts <= points[0].ts) return points[0].value;
  if (ts >= points[points.length - 1].ts) return points[points.length - 1].value;

  // Binary search for the bracket.
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

const timeToCanvasX = (
  ts: number,
  startMs: number,
  timeRange: number,
  innerLeft: number,
  innerWidth: number
): number => {
  const norm = Math.max(0, Math.min(1, (ts - startMs) / timeRange));
  return innerLeft + norm * innerWidth;
};

// ---------------------------------------------------------------------
// Empty-state placeholder
// ---------------------------------------------------------------------

const drawEmptyState = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
): void => {
  ctx.save();
  ctx.font = AXIS_TICK_FONT;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("No data", x + w / 2, y + h / 2);
  ctx.restore();
};
