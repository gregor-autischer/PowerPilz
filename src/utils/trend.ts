export interface TrendCanvasPoint {
  x: number;
  y: number;
  value: number;
  ts: number;
}

export const toTrendCanvasPoints = (
  points: Array<{ x: number; y: number; value: number; ts: number }>,
  width: number,
  height: number
): TrendCanvasPoint[] => {
  const canvasPoints = points.map((point) => ({
    x: (point.x / 100) * width,
    y: (point.y / 100) * height,
    value: point.value,
    ts: point.ts
  }));
  return downsampleTrendCanvasPoints(canvasPoints, width);
};

export const downsampleTrendCanvasPoints = (
  points: TrendCanvasPoint[],
  width: number
): TrendCanvasPoint[] => {
  if (points.length <= 3) {
    return points;
  }

  const targetSamples = Math.max(24, Math.min(points.length, Math.round(width)));
  if (points.length <= targetSamples) {
    return smoothTrendCanvasPoints(points);
  }

  const sampled: TrendCanvasPoint[] = [];
  sampled.push(points[0]);

  const span = (points.length - 1) / (targetSamples - 1);
  for (let sampleIndex = 1; sampleIndex < targetSamples - 1; sampleIndex += 1) {
    const start = Math.floor(sampleIndex * span);
    const endExclusive = Math.max(start + 1, Math.floor((sampleIndex + 1) * span));
    const bucket = points.slice(start, Math.min(points.length, endExclusive));
    if (bucket.length === 0) {
      continue;
    }

    const sum = bucket.reduce<{ x: number; y: number; value: number; ts: number }>(
      (acc, point) => {
        acc.x += point.x;
        acc.y += point.y;
        acc.value += point.value;
        acc.ts += point.ts;
        return acc;
      },
      { x: 0, y: 0, value: 0, ts: 0 }
    );

    const count = bucket.length;
    sampled.push({
      x: sum.x / count,
      y: sum.y / count,
      value: sum.value / count,
      ts: sum.ts / count
    });
  }

  sampled.push(points[points.length - 1]);
  return smoothTrendCanvasPoints(sampled);
};

export const smoothTrendCanvasPoints = (points: TrendCanvasPoint[]): TrendCanvasPoint[] => {
  if (points.length <= 3) {
    return points;
  }

  const smoothed: TrendCanvasPoint[] = [points[0]];
  for (let index = 1; index < points.length - 1; index += 1) {
    const prev = points[index - 1];
    const cur = points[index];
    const next = points[index + 1];
    smoothed.push({
      x: cur.x,
      y: (prev.y + (cur.y * 2) + next.y) / 4,
      value: (prev.value + (cur.value * 2) + next.value) / 4,
      ts: cur.ts
    });
  }
  smoothed.push(points[points.length - 1]);
  return smoothed;
};
