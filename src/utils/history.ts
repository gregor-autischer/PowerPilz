import type { HomeAssistant } from "../types";

export interface HistoryTrendPoint {
  ts: number;
  value: number;
}

export const parseHistoryTrendResponse = (
  raw: unknown,
  windowMs: number,
  nowMs = Date.now()
): HistoryTrendPoint[] => {
  if (!Array.isArray(raw) || raw.length === 0) {
    return [];
  }

  const series = Array.isArray(raw[0]) ? raw[0] : raw;
  if (!Array.isArray(series)) {
    return [];
  }

  const points: HistoryTrendPoint[] = [];
  for (const item of series) {
    if (!item || typeof item !== "object") {
      continue;
    }
    const stateObj = item as Record<string, unknown>;
    const value = Number(stateObj.state);
    const changedRaw =
      typeof stateObj.last_changed === "string"
        ? stateObj.last_changed
        : typeof stateObj.last_updated === "string"
          ? stateObj.last_updated
          : "";
    const ts = Date.parse(changedRaw);
    if (!Number.isFinite(value) || !Number.isFinite(ts)) {
      continue;
    }
    points.push({ ts, value });
  }

  const cutoff = nowMs - windowMs;
  return points
    .filter((point) => point.ts >= cutoff)
    .sort((a, b) => a.ts - b.ts);
};

export const fetchHistoryTrendPoints = async (
  hass: Pick<HomeAssistant, "callApi">,
  entityId: string,
  windowMs: number
): Promise<HistoryTrendPoint[]> => {
  if (!hass.callApi) {
    return [];
  }

  const startIso = new Date(Date.now() - windowMs).toISOString();
  const path =
    `history/period/${startIso}?filter_entity_id=${encodeURIComponent(entityId)}`
    + "&minimal_response&no_attributes";

  try {
    const raw = await hass.callApi("GET", path);
    return parseHistoryTrendResponse(raw, windowMs);
  } catch {
    return [];
  }
};
