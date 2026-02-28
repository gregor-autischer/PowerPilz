import type { HomeAssistant } from "../types";

export interface HistoryTrendPoint {
  ts: number;
  value: number;
}

interface HistoryFetchBatchOptions {
  startMs?: number;
}

const HISTORY_CACHE_TTL_MS = 30_000;
const MAX_HISTORY_POINTS_PER_SERIES = 1_440;
const FULL_WINDOW_START_BUCKET_MS = 10_000;
const INCREMENTAL_START_BUCKET_MS = 2_000;
const FULL_WINDOW_COALESCE_DELAY_MS = 40;
const entityHistoryCache = new Map<string, { expiresAt: number; points: HistoryTrendPoint[] }>();
const batchInflight = new Map<string, Promise<Record<string, HistoryTrendPoint[]>>>();
type HistoryCallApi = NonNullable<HomeAssistant["callApi"]>;

interface CoalescedFullWindowWaiter {
  entityIds: string[];
  resolve: (value: Record<string, HistoryTrendPoint[]>) => void;
  reject: (reason?: unknown) => void;
}

interface CoalescedFullWindowBucket {
  entityIds: Set<string>;
  waiters: CoalescedFullWindowWaiter[];
  flushTimer?: ReturnType<typeof setTimeout>;
}

const coalescedFullWindowBuckets = new WeakMap<HistoryCallApi, Map<string, CoalescedFullWindowBucket>>();

const downsampleHistoryTrendPoints = (
  points: HistoryTrendPoint[],
  maxPoints = MAX_HISTORY_POINTS_PER_SERIES
): HistoryTrendPoint[] => {
  if (points.length <= maxPoints) {
    return points;
  }

  if (maxPoints <= 2) {
    return [points[0], points[points.length - 1]];
  }

  const interior = points.slice(1, -1);
  const bucketCount = Math.max(1, Math.floor((maxPoints - 2) / 2));
  const bucketSize = interior.length / bucketCount;
  const sampled: HistoryTrendPoint[] = [points[0]];

  for (let index = 0; index < bucketCount; index += 1) {
    const start = Math.floor(index * bucketSize);
    const endExclusive = Math.max(start + 1, Math.floor((index + 1) * bucketSize));
    const bucket = interior.slice(start, endExclusive);
    if (bucket.length === 0) {
      continue;
    }

    let minPoint = bucket[0];
    let maxPoint = bucket[0];
    for (const point of bucket) {
      if (point.value < minPoint.value) {
        minPoint = point;
      }
      if (point.value > maxPoint.value) {
        maxPoint = point;
      }
    }

    if (minPoint.ts <= maxPoint.ts) {
      sampled.push(minPoint);
      if (maxPoint !== minPoint) {
        sampled.push(maxPoint);
      }
    } else {
      sampled.push(maxPoint);
      if (minPoint !== maxPoint) {
        sampled.push(minPoint);
      }
    }

    if (sampled.length >= maxPoints - 1) {
      break;
    }
  }

  sampled.push(points[points.length - 1]);
  if (sampled.length <= maxPoints) {
    return sampled;
  }

  const trimmed: HistoryTrendPoint[] = [sampled[0]];
  const stride = (sampled.length - 2) / (maxPoints - 2);
  for (let index = 0; index < maxPoints - 2; index += 1) {
    const sampledIndex = 1 + Math.floor(index * stride);
    trimmed.push(sampled[sampledIndex]);
  }
  trimmed.push(sampled[sampled.length - 1]);
  return trimmed;
};

const normalizeHistoryStartMs = (requestedStartMs: number, useCache: boolean): number => {
  const bucketMs = useCache ? FULL_WINDOW_START_BUCKET_MS : INCREMENTAL_START_BUCKET_MS;
  if (!Number.isFinite(requestedStartMs) || requestedStartMs <= 0 || bucketMs <= 1) {
    return Math.max(0, Math.floor(requestedStartMs));
  }
  return Math.max(0, Math.floor(requestedStartMs / bucketMs) * bucketMs);
};

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
  const filtered = points
    .filter((point) => point.ts >= cutoff)
    .sort((a, b) => a.ts - b.ts);
  return downsampleHistoryTrendPoints(filtered);
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
  return downsampleHistoryTrendPoints(deduped);
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
  const filtered = points
    .filter((point) => point.ts >= cutoff)
    .sort((a, b) => a.ts - b.ts);

  return {
    entityId,
    points: downsampleHistoryTrendPoints(filtered)
  };
};

const cacheKeyForEntityWindow = (entityId: string, windowMs: number): string =>
  `${entityId}|${windowMs}`;

const clonePoints = (points: HistoryTrendPoint[]): HistoryTrendPoint[] =>
  points.map((point) => ({ ts: point.ts, value: point.value }));

const getCoalescedBucketMap = (callApi: HistoryCallApi): Map<string, CoalescedFullWindowBucket> => {
  const existing = coalescedFullWindowBuckets.get(callApi);
  if (existing) {
    return existing;
  }

  const created = new Map<string, CoalescedFullWindowBucket>();
  coalescedFullWindowBuckets.set(callApi, created);
  return created;
};

const fetchHistoryBatchFromApi = async (
  callApi: HistoryCallApi,
  entityIds: string[],
  windowMs: number,
  startMs: number,
  now: number,
  useCache: boolean
): Promise<Record<string, HistoryTrendPoint[]>> => {
  const startIso = new Date(startMs).toISOString();
  const filter = entityIds.join(",");
  const path =
    `history/period/${startIso}?filter_entity_id=${encodeURIComponent(filter)}`
    + "&minimal_response&no_attributes";

  let raw: unknown;
  try {
    raw = await callApi("GET", path);
  } catch {
    const failed: Record<string, HistoryTrendPoint[]> = {};
    entityIds.forEach((entityId) => {
      failed[entityId] = [];
    });
    return failed;
  }

  const seriesList = Array.isArray(raw) ? raw : [];
  const byEntity: Record<string, HistoryTrendPoint[]> = {};

  seriesList.forEach((seriesRaw, index) => {
    const parsed = parseHistoryEntitySeries(seriesRaw, windowMs, now);
    const fallbackEntityId = entityIds[index];
    const entityId = parsed.entityId ?? fallbackEntityId;
    if (!entityId) {
      return;
    }
    byEntity[entityId] = parsed.points;
  });

  entityIds.forEach((entityId) => {
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
};

const queueCoalescedFullWindowFetch = (
  callApi: HistoryCallApi,
  key: string,
  entityIds: string[],
  windowMs: number,
  startMs: number
): Promise<Record<string, HistoryTrendPoint[]>> => {
  const bucketMap = getCoalescedBucketMap(callApi);
  let bucket = bucketMap.get(key);
  if (!bucket) {
    bucket = {
      entityIds: new Set<string>(),
      waiters: []
    };
    bucketMap.set(key, bucket);
  }

  entityIds.forEach((entityId) => bucket?.entityIds.add(entityId));

  return new Promise((resolve, reject) => {
    bucket?.waiters.push({ entityIds: [...entityIds], resolve, reject });

    if (bucket?.flushTimer !== undefined) {
      return;
    }

    bucket!.flushTimer = setTimeout(async () => {
      const activeBucket = bucketMap.get(key);
      if (!activeBucket) {
        return;
      }
      bucketMap.delete(key);

      const mergedEntityIds = Array.from(activeBucket.entityIds);
      try {
        const fetched = await fetchHistoryBatchFromApi(
          callApi,
          mergedEntityIds,
          windowMs,
          startMs,
          Date.now(),
          true
        );
        activeBucket.waiters.forEach((waiter) => {
          const subset: Record<string, HistoryTrendPoint[]> = {};
          waiter.entityIds.forEach((entityId) => {
            subset[entityId] = clonePoints(fetched[entityId] ?? []);
          });
          waiter.resolve(subset);
        });
      } catch (error) {
        activeBucket.waiters.forEach((waiter) => waiter.reject(error));
      }
    }, FULL_WINDOW_COALESCE_DELAY_MS);
  });
};

export const fetchHistoryTrendPointsBatch = async (
  hass: Pick<HomeAssistant, "callApi">,
  entityIds: string[],
  windowMs: number,
  options?: HistoryFetchBatchOptions
): Promise<Record<string, HistoryTrendPoint[]>> => {
  const callApi = hass.callApi as HistoryCallApi | undefined;
  const uniqueEntityIds = Array.from(new Set(entityIds.filter((entityId) => entityId.length > 0)));
  if (!callApi || uniqueEntityIds.length === 0) {
    return {};
  }

  const now = Date.now();
  const requestedStartMs = typeof options?.startMs === "number" && Number.isFinite(options.startMs)
    ? Math.max(now - windowMs, Math.floor(options.startMs))
    : now - windowMs;
  const useCache = requestedStartMs <= (now - windowMs + 1000);
  const normalizedStartMs = normalizeHistoryStartMs(requestedStartMs, useCache);
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

  if (useCache) {
    const coalescedKey = `${normalizedStartMs}|${windowMs}`;
    const fetched = await queueCoalescedFullWindowFetch(
      callApi,
      coalescedKey,
      missingEntityIds,
      windowMs,
      normalizedStartMs
    );
    missingEntityIds.forEach((entityId) => {
      result[entityId] = clonePoints(fetched[entityId] ?? []);
    });
    return result;
  }

  const sortedForKey = [...missingEntityIds].sort();
  const inflightKey = `${normalizedStartMs}|${windowMs}|${sortedForKey.join(",")}`;
  const existingInflight = batchInflight.get(inflightKey);
  if (existingInflight) {
    const inflightResult = await existingInflight;
    missingEntityIds.forEach((entityId) => {
      result[entityId] = clonePoints(inflightResult[entityId] ?? []);
    });
    return result;
  }

  const task = (async (): Promise<Record<string, HistoryTrendPoint[]>> => {
    return fetchHistoryBatchFromApi(
      callApi,
      missingEntityIds,
      windowMs,
      normalizedStartMs,
      now,
      useCache
    );
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
