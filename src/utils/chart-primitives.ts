/**
 * Low-level canvas primitives shared between PowerPilz chart cards and the
 * energy node-detail dialog. Each function is self-contained and stateless
 * except for an optional caller-owned color-context cache that lets repeated
 * calls reuse the same offscreen canvas (important for performance when
 * hundreds of color resolutions happen per draw).
 */

export interface PreparedCanvas {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
}

export interface CanvasPoint {
  x: number;
  y: number;
}

/**
 * Sizes the canvas for the device pixel ratio, clears it, and returns a
 * context already scaled to logical pixels. Returns null when 2D is
 * unavailable.
 */
export const prepareCanvas = (canvas: HTMLCanvasElement): PreparedCanvas | null => {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }

  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, Math.round(rect.width));
  const height = Math.max(1, Math.round(rect.height));
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  const pixelWidth = Math.max(1, Math.round(width * dpr));
  const pixelHeight = Math.max(1, Math.round(height * dpr));

  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  return { ctx, width, height };
};

/**
 * Resolves a CSS color (variable, named, rgb()) by attaching a probe to a
 * host element and reading the computed style. Always returns a string usable
 * as `ctx.fillStyle` / `ctx.strokeStyle`.
 */
export const resolveCssColor = (host: ParentNode & Element, color: string): string => {
  const probe = document.createElement("span");
  probe.style.position = "absolute";
  probe.style.opacity = "0";
  probe.style.pointerEvents = "none";
  probe.style.color = color;
  host.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  return resolved || "rgb(158, 158, 158)";
};

interface ColorContextCache {
  ctx?: CanvasRenderingContext2D | null;
}

/**
 * Parses a CSS color into [r, g, b] channels (0..255). Falls back to a
 * one-shot offscreen canvas to normalize named/hex/short-hex colors.
 * The optional cache holds the offscreen canvas's 2d context so repeated
 * calls don't recreate it.
 */
export const parseRgbChannels = (
  color: string,
  cache?: ColorContextCache
): [number, number, number] | null => {
  const candidate = color.trim();
  const rgbMatch = candidate.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
  if (rgbMatch) {
    const channels = rgbMatch
      .slice(1, 4)
      .map((value) => Math.max(0, Math.min(255, Math.round(Number(value)))));
    if (channels.every((value) => Number.isFinite(value))) {
      return [channels[0], channels[1], channels[2]];
    }
  }

  let ctx: CanvasRenderingContext2D | null | undefined = cache?.ctx;
  if (ctx === undefined) {
    ctx = document.createElement("canvas").getContext("2d");
    if (cache) cache.ctx = ctx;
  }
  if (!ctx) return null;

  ctx.fillStyle = "#000000";
  ctx.fillStyle = candidate;
  const normalized = ctx.fillStyle;
  const hex = typeof normalized === "string" ? normalized.trim() : "";
  const hexMatch = hex.match(/^#([a-f\d]{6})$/i);
  if (!hexMatch) return null;
  const value = hexMatch[1];
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16)
  ];
};

/**
 * Returns a `rgba(...)` string with the given alpha applied to the input
 * color. If the color cannot be parsed, returns it unchanged.
 */
export const withAlpha = (
  color: string,
  alpha: number,
  cache?: ColorContextCache
): string => {
  const channels = parseRgbChannels(color, cache);
  if (!channels) return color;
  const clamped = Math.max(0, Math.min(1, alpha));
  return `rgba(${channels[0]}, ${channels[1]}, ${channels[2]}, ${clamped})`;
};

/**
 * Strokes a polyline through the points with the given color & width.
 * Caller is expected to have already resolved the color.
 */
export const strokePolyline = (
  ctx: CanvasRenderingContext2D,
  points: ReadonlyArray<CanvasPoint>,
  color: string,
  lineWidth: number
): void => {
  if (points.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let index = 1; index < points.length; index += 1) {
    ctx.lineTo(points[index].x, points[index].y);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
};

/**
 * Fills a closed area underneath a polyline with a vertical alpha gradient.
 * The gradient runs from the polyline's highest point (top, more opaque)
 * down to the canvas baseline at the given height (transparent).
 */
export const fillAreaUnderPolyline = (
  ctx: CanvasRenderingContext2D,
  points: ReadonlyArray<CanvasPoint>,
  resolvedColor: string,
  height: number,
  alphaTop = 0.24,
  alphaBottom = 0,
  cache?: ColorContextCache
): void => {
  if (points.length < 2) return;
  const first = points[0];
  const last = points[points.length - 1];
  let minY = points[0].y;
  for (let index = 1; index < points.length; index += 1) {
    if (points[index].y < minY) minY = points[index].y;
  }

  const gradient = ctx.createLinearGradient(0, minY, 0, height);
  gradient.addColorStop(0, withAlpha(resolvedColor, alphaTop, cache));
  gradient.addColorStop(1, withAlpha(resolvedColor, alphaBottom, cache));

  ctx.beginPath();
  ctx.moveTo(first.x, first.y);
  for (let index = 1; index < points.length; index += 1) {
    ctx.lineTo(points[index].x, points[index].y);
  }
  ctx.lineTo(last.x, height);
  ctx.lineTo(first.x, height);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();
};

/**
 * Fills a closed band between two polylines (upper and lower edges). Used
 * for stacked-area renderings where each layer has its own bottom curve.
 */
export const fillAreaBetweenPolylines = (
  ctx: CanvasRenderingContext2D,
  upperPoints: ReadonlyArray<CanvasPoint>,
  lowerPoints: ReadonlyArray<CanvasPoint>,
  fillStyle: string | CanvasGradient | CanvasPattern
): void => {
  if (upperPoints.length < 2 || lowerPoints.length < 2) return;

  ctx.beginPath();
  ctx.moveTo(upperPoints[0].x, upperPoints[0].y);
  for (let index = 1; index < upperPoints.length; index += 1) {
    ctx.lineTo(upperPoints[index].x, upperPoints[index].y);
  }
  for (let index = lowerPoints.length - 1; index >= 0; index -= 1) {
    ctx.lineTo(lowerPoints[index].x, lowerPoints[index].y);
  }
  ctx.closePath();
  ctx.fillStyle = fillStyle;
  ctx.fill();
};

/**
 * Returns a "nice" rounded step size in the same magnitude as the given
 * delta. Used by axis tick generators to pick clean intervals.
 */
export const niceStep = (rawStep: number): number => {
  if (!Number.isFinite(rawStep) || rawStep <= 0) return 1;
  const exponent = Math.floor(Math.log10(rawStep));
  const magnitude = Math.pow(10, exponent);
  const fraction = rawStep / magnitude;
  let nice: number;
  if (fraction <= 1) nice = 1;
  else if (fraction <= 2) nice = 2;
  else if (fraction <= 5) nice = 5;
  else nice = 10;
  return nice * magnitude;
};

/**
 * Generates ~`tickCount` evenly spaced "nice" tick values across [min, max].
 */
export const niceTickValues = (min: number, max: number, tickCount = 5): number[] => {
  if (!Number.isFinite(min) || !Number.isFinite(max) || tickCount < 2) {
    return [min, max].filter((value) => Number.isFinite(value));
  }
  if (Math.abs(max - min) < 1e-9) {
    return [min];
  }
  const range = niceStep(max - min);
  const step = niceStep(range / (tickCount - 1));
  const niceMin = Math.floor(min / step) * step;
  const niceMax = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let value = niceMin; value <= niceMax + step / 2; value += step) {
    ticks.push(Number(value.toFixed(10)));
  }
  return ticks;
};
