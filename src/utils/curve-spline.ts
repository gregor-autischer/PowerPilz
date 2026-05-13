/**
 * Monotone cubic (Fritsch-Carlson PCHIP) spline helpers for the
 * PowerPilz Heating Curve card.
 *
 * Given an ordered list of (x, y) control points, the spline passes
 * through every point exactly and avoids the over/undershoot you'd get
 * from a Catmull-Rom or natural cubic. The resulting SVG path looks
 * smooth without distorting the user's input values.
 */

export interface CurvePoint {
  /** X coordinate, e.g. minutes-since-midnight in [0, 1440]. */
  x: number;
  /** Y coordinate in the curve's value domain. */
  y: number;
}

/** Build a smooth SVG `d` path through the given control points. */
export function buildSmoothPath(
  points: readonly CurvePoint[],
  toScreen: (p: CurvePoint) => { x: number; y: number },
): string {
  if (points.length === 0) return "";
  if (points.length === 1) {
    const p = toScreen(points[0]);
    return `M ${p.x} ${p.y}`;
  }
  const tangents = computePchipTangents(points);
  const segs: string[] = [];
  const start = toScreen(points[0]);
  segs.push(`M ${start.x} ${start.y}`);
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const h = p1.x - p0.x;
    if (h <= 0) {
      const screen = toScreen(p1);
      segs.push(`L ${screen.x} ${screen.y}`);
      continue;
    }
    const c1 = toScreen({ x: p0.x + h / 3, y: p0.y + (tangents[i] * h) / 3 });
    const c2 = toScreen({ x: p1.x - h / 3, y: p1.y - (tangents[i + 1] * h) / 3 });
    const end = toScreen(p1);
    segs.push(`C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`);
  }
  return segs.join(" ");
}

/** Sample the monotone cubic spline at an arbitrary x. */
export function sampleSmoothCurve(
  points: readonly CurvePoint[],
  x: number,
): number | null {
  if (points.length === 0) return null;
  if (points.length === 1) return points[0].y;
  if (x <= points[0].x) return points[0].y;
  if (x >= points[points.length - 1].x) return points[points.length - 1].y;

  const tangents = computePchipTangents(points);
  let i = 0;
  while (i < points.length - 2 && x >= points[i + 1].x) i++;
  const p0 = points[i];
  const p1 = points[i + 1];
  const h = p1.x - p0.x;
  if (h <= 0) return p1.y;
  const t = (x - p0.x) / h;
  const t2 = t * t;
  const t3 = t2 * t;
  const h00 = 2 * t3 - 3 * t2 + 1;
  const h10 = t3 - 2 * t2 + t;
  const h01 = -2 * t3 + 3 * t2;
  const h11 = t3 - t2;
  return (
    h00 * p0.y +
    h10 * h * tangents[i] +
    h01 * p1.y +
    h11 * h * tangents[i + 1]
  );
}

function computePchipTangents(points: readonly CurvePoint[]): number[] {
  const n = points.length;
  if (n < 2) return n === 1 ? [0] : [];

  const h: number[] = [];
  const delta: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    const dx = points[i + 1].x - points[i].x;
    h.push(dx);
    delta.push(dx === 0 ? 0 : (points[i + 1].y - points[i].y) / dx);
  }

  const m: number[] = new Array(n).fill(0);
  if (n === 2) {
    m[0] = delta[0];
    m[1] = delta[0];
    return m;
  }

  for (let i = 1; i < n - 1; i++) {
    if (delta[i - 1] === 0 || delta[i] === 0 || (delta[i - 1] > 0) !== (delta[i] > 0)) {
      m[i] = 0;
    } else {
      const w1 = 2 * h[i] + h[i - 1];
      const w2 = h[i] + 2 * h[i - 1];
      m[i] = (w1 + w2) / (w1 / delta[i - 1] + w2 / delta[i]);
    }
  }
  m[0] = endTangent(h[0], h[1], delta[0], delta[1]);
  m[n - 1] = endTangent(h[n - 2], h[n - 3], delta[n - 2], delta[n - 3]);
  return m;
}

function endTangent(h0: number, h1: number, d0: number, d1: number): number {
  if (h0 + h1 === 0) return 0;
  let m = ((2 * h0 + h1) * d0 - h0 * d1) / (h0 + h1);
  if ((m > 0) !== (d0 > 0)) return 0;
  if ((d0 > 0) !== (d1 > 0) && Math.abs(m) > Math.abs(3 * d0)) return 3 * d0;
  return m;
}
