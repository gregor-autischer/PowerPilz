import type { HomeAssistant } from "../types";

export interface HistoryTrendPoint {
  ts: number;
  value: number;
}

interface HistoryFetchBatchOptions {
  startMs?: number;
}

const HISTORY_CACHE_TTL_MS = 30_000;
const entityHistoryCache = new Map<string, { expiresAt: number; points: HistoryTrendPoint[] }>();
const batchInflight = new Map<string, Promise<Record<string, HistoryTrendPoint[]>>>();

const parseHistoryTimestamp = (stateObj: Record<string, unknown>): number | null => {
  const parseCandidate = (candidate: unknown): number | null => {
    if (typeof candidate === "string") {
      const parsedString = Date.parse(candidate);
      return Number.isFinite(parsedString) ? parsedString : null;
    }

    if (typeof candidate === "number" && Number.isFinite(candidate)) {
      // Home Assistant may return epoch seconds or milliseconds depending on endpoint/version.
      if (candidate > 1e12) {
        return Math.floor(candidate);
      }
      if (candidate > 0) {
        return Math.floor(candidate * 1000);
      }
    }

    return null;
  };

  const candidates: unknown[] = [
    stateObj.last_changed,
    stateObj.last_updated,
    stateObj.last_changed_ts,
    stateObj.last_updated_ts,
    // Some minimal/compact responses use short keys.
    stateObj.lc,
    stateObj.lu
  ];

  for (const candidate of candidates) {
    const parsed = parseCandidate(candidate);
    if (parsed !== null) {
      return parsed;
    }
  }

  return null;
};

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
    const ts = parseHistoryTimestamp(stateObj);
    if (!Number.isFinite(value) || ts === null) {
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
  const byEntity = await fetchHistoryTrendPointsBatch(hass, [entityId], windowMs);
  return byEntity[entityId] ?? [];
};

export const mergeHistoryTrendPoints = (
  base: HistoryTrendPoint[],
  incoming: HistoryTrendPoint[],
  cutoffMs: number
): HistoryTrendPoint[] => {
  const merged = [...base, ...incoming]
    .filter((point) => Number.isFinite(point.ts) && Number.isFinite(point.value) && point.ts >= cutoffMs)
    .sort((left, right) => left.ts - right.ts);

  if (merged.length <= 1) {
    return merged;
  }

  const deduped: HistoryTrendPoint[] = [];
  merged.forEach((point) => {
    const last = deduped[deduped.length - 1];
    if (last && Math.abs(last.ts - point.ts) <= 0.5) {
      deduped[deduped.length - 1] = point;
      return;
    }
    deduped.push(point);
  });
  return deduped;
};

const parseHistoryEntitySeries = (
  raw: unknown,
  windowMs: number,
  nowMs = Date.now()
): { entityId: string | null; points: HistoryTrendPoint[] } => {
  if (!Array.isArray(raw)) {
    return { entityId: null, points: [] };
  }

  const points: HistoryTrendPoint[] = [];
  let entityId: string | null = null;
  for (const item of raw) {
    if (!item || typeof item !== "object") {
      continue;
    }
    const stateObj = item as Record<string, unknown>;
    if (entityId === null && typeof stateObj.entity_id === "string" && stateObj.entity_id.length > 0) {
      entityId = stateObj.entity_id;
    }
    const value = Number(stateObj.state);
    const ts = parseHistoryTimestamp(stateObj);
    if (!Number.isFinite(value) || ts === null) {
      continue;
    }
    points.push({ ts, value });
  }

  const cutoff = nowMs - windowMs;
  return {
    entityId,
    points: points
      .filter((point) => point.ts >= cutoff)
      .sort((a, b) => a.ts - b.ts)
  };
};

const cacheKeyForEntityWindow = (entityId: string, windowMs: number): string =>
  `${entityId}|${windowMs}`;

const clonePoints = (points: HistoryTrendPoint[]): HistoryTrendPoint[] =>
  points.map((point) => ({ ts: point.ts, value: point.value }));

export const fetchHistoryTrendPointsBatch = async (
  hass: Pick<HomeAssistant, "callApi">,
  entityIds: string[],
  windowMs: number,
  options?: HistoryFetchBatchOptions
): Promise<Record<string, HistoryTrendPoint[]>> => {
  const callApi = hass.callApi;
  const uniqueEntityIds = Array.from(new Set(entityIds.filter((entityId) => entityId.length > 0)));
  if (!callApi || uniqueEntityIds.length === 0) {
    return {};
  }

  const now = Date.now();
  const requestedStartMs = typeof options?.startMs === "number" && Number.isFinite(options.startMs)
    ? Math.max(now - windowMs, Math.floor(options.startMs))
    : now - windowMs;
  const useCache = requestedStartMs <= (now - windowMs + 1000);
  const result: Record<string, HistoryTrendPoint[]> = {};
  const missingEntityIds: string[] = [];

  uniqueEntityIds.forEach((entityId) => {
    if (useCache) {
      const cacheKey = cacheKeyForEntityWindow(entityId, windowMs);
      const cached = entityHistoryCache.get(cacheKey);
      if (cached && cached.expiresAt > now) {
        result[entityId] = clonePoints(cached.points);
        return;
      }
    }
    missingEntityIds.push(entityId);
  });

  if (missingEntityIds.length === 0) {
    return result;
  }

  const sortedForKey = [...missingEntityIds].sort();
  const inflightKey = `${requestedStartMs}|${windowMs}|${sortedForKey.join(",")}`;
  const existingInflight = batchInflight.get(inflightKey);
  if (existingInflight) {
    const inflightResult = await existingInflight;
    missingEntityIds.forEach((entityId) => {
      result[entityId] = clonePoints(inflightResult[entityId] ?? []);
    });
    return result;
  }

  const task = (async (): Promise<Record<string, HistoryTrendPoint[]>> => {
    const startIso = new Date(requestedStartMs).toISOString();
    const filter = missingEntityIds.join(",");
    const path =
      `history/period/${startIso}?filter_entity_id=${encodeURIComponent(filter)}`
      + "&minimal_response&no_attributes";

    let raw: unknown;
    try {
      raw = await callApi("GET", path);
    } catch {
      const failed: Record<string, HistoryTrendPoint[]> = {};
      missingEntityIds.forEach((entityId) => {
        failed[entityId] = [];
      });
      return failed;
    }

    const seriesList = Array.isArray(raw) ? raw : [];
    const byEntity: Record<string, HistoryTrendPoint[]> = {};

    seriesList.forEach((seriesRaw, index) => {
      const parsed = parseHistoryEntitySeries(seriesRaw, windowMs, now);
      const fallbackEntityId = missingEntityIds[index];
      const entityId = parsed.entityId ?? fallbackEntityId;
      if (!entityId) {
        return;
      }
      byEntity[entityId] = parsed.points;
    });

    missingEntityIds.forEach((entityId) => {
      if (!(entityId in byEntity)) {
        byEntity[entityId] = [];
      }
      if (useCache) {
        entityHistoryCache.set(cacheKeyForEntityWindow(entityId, windowMs), {
          expiresAt: now + HISTORY_CACHE_TTL_MS,
          points: clonePoints(byEntity[entityId])
        });
      }
    });

    return byEntity;
  })();

  batchInflight.set(inflightKey, task);
  try {
    const fetched = await task;
    missingEntityIds.forEach((entityId) => {
      result[entityId] = clonePoints(fetched[entityId] ?? []);
    });
    return result;
  } finally {
    batchInflight.delete(inflightKey);
  }
};
