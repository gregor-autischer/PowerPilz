import type { HomeAssistant } from "../types";

export interface HistoryTrendPoint {
  ts: number;
  value: number;
}

interface HistoryFetchBatchOptions {
  startMs?: number;
  dataSource?: TrendDataSource;
}

export type TrendDataSource = "history" | "statistics" | "hybrid";

type TrendDataSourceWithFallback = TrendDataSource | "auto";

export const normalizeTrendDataSource = (
  value: unknown,
  fallback: TrendDataSourceWithFallback = "hybrid"
): TrendDataSource => {
  if (value === "history" || value === "statistics" || value === "hybrid") {
    return value;
  }
  if (value === "auto") {
    return "hybrid";
  }
  return fallback === "auto" ? "hybrid" : fallback;
};

const HISTORY_CACHE_TTL_MS = 30_000;
const STATISTICS_SUPPORT_CACHE_TTL_MS = 10 * 60_000;
const MAX_HISTORY_POINTS_PER_SERIES = 1_440;
const FULL_WINDOW_START_BUCKET_MS = 10_000;
const INCREMENTAL_START_BUCKET_MS = 2_000;
const FULL_WINDOW_COALESCE_DELAY_MS = 40;
const entityTrendCache = new Map<string, { expiresAt: number; points: HistoryTrendPoint[] }>();
const historyBatchInflight = new Map<string, Promise<Record<string, HistoryTrendPoint[]>>>();
const statisticsBatchInflight = new Map<string, Promise<StatisticsBatchResult>>();
type HistoryCallApi = NonNullable<HomeAssistant["callApi"]>;
type StatisticsCallWs = NonNullable<HomeAssistant["callWS"]>;

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

type StatisticsMessageType = "recorder/statistics_during_period" | "history/statistics_during_period";

interface StatisticsBatchResult {
  pointsByEntity: Record<string, HistoryTrendPoint[]>;
  unsupportedEntityIds: Set<string>;
}

interface CoalescedStatisticsFullWindowWaiter {
  entityIds: string[];
  resolve: (value: StatisticsBatchResult) => void;
  reject: (reason?: unknown) => void;
}

interface CoalescedStatisticsFullWindowBucket {
  entityIds: Set<string>;
  waiters: CoalescedStatisticsFullWindowWaiter[];
  flushTimer?: ReturnType<typeof setTimeout>;
}

const coalescedStatisticsFullWindowBuckets = new WeakMap<
  StatisticsCallWs,
  Map<string, CoalescedStatisticsFullWindowBucket>
>();
const statisticsMessageTypeCache = new WeakMap<StatisticsCallWs, StatisticsMessageType>();
const statisticsSupportCache = new WeakMap<
  StatisticsCallWs,
  Map<string, { expiresAt: number; supported: boolean }>
>();

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
  hass: Pick<HomeAssistant, "callApi" | "callWS">,
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

const cacheKeyForEntityWindow = (
  source: "history" | "statistics",
  entityId: string,
  windowMs: number
): string => `${source}|${entityId}|${windowMs}`;

const clonePoints = (points: HistoryTrendPoint[]): HistoryTrendPoint[] =>
  points.map((point) => ({ ts: point.ts, value: point.value }));

const parseEpochTimestamp = (value: unknown): number | null => {
  if (typeof value === "string") {
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    if (value > 1e12) {
      return Math.floor(value);
    }
    if (value > 0) {
      return Math.floor(value * 1000);
    }
  }

  return null;
};

const parseStatisticsTimestamp = (statObj: Record<string, unknown>): number | null =>
  parseEpochTimestamp(statObj.start)
  ?? parseEpochTimestamp(statObj.end)
  ?? parseEpochTimestamp(statObj.last_reset);

const parseStatisticsValue = (statObj: Record<string, unknown>): number | null => {
  const candidates: unknown[] = [
    statObj.state,
    statObj.mean,
    statObj.sum,
    statObj.max,
    statObj.min,
    statObj.change
  ];

  for (const candidate of candidates) {
    const parsed = Number(candidate);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
};

const parseStatisticsEntitySeries = (
  raw: unknown,
  windowMs: number,
  nowMs = Date.now()
): HistoryTrendPoint[] => {
  if (!Array.isArray(raw)) {
    return [];
  }

  const points: HistoryTrendPoint[] = [];
  raw.forEach((item) => {
    if (!item || typeof item !== "object") {
      return;
    }
    const statObj = item as Record<string, unknown>;
    const ts = parseStatisticsTimestamp(statObj);
    const value = parseStatisticsValue(statObj);
    if (ts === null || value === null) {
      return;
    }
    points.push({ ts, value });
  });

  const cutoff = nowMs - windowMs;
  const filtered = points
    .filter((point) => point.ts >= cutoff)
    .sort((left, right) => left.ts - right.ts);
  return downsampleHistoryTrendPoints(filtered);
};

const getStatisticsSupportMap = (
  callWs: StatisticsCallWs
): Map<string, { expiresAt: number; supported: boolean }> => {
  const existing = statisticsSupportCache.get(callWs);
  if (existing) {
    return existing;
  }

  const created = new Map<string, { expiresAt: number; supported: boolean }>();
  statisticsSupportCache.set(callWs, created);
  return created;
};

const readStatisticsSupport = (
  callWs: StatisticsCallWs,
  entityId: string,
  now: number
): boolean | null => {
  const map = getStatisticsSupportMap(callWs);
  const entry = map.get(entityId);
  if (!entry) {
    return null;
  }
  if (entry.expiresAt <= now) {
    map.delete(entityId);
    return null;
  }
  return entry.supported;
};

const writeStatisticsSupport = (
  callWs: StatisticsCallWs,
  entityId: string,
  supported: boolean,
  now: number
): void => {
  getStatisticsSupportMap(callWs).set(entityId, {
    supported,
    expiresAt: now + STATISTICS_SUPPORT_CACHE_TTL_MS
  });
};

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
      entityTrendCache.set(cacheKeyForEntityWindow("history", entityId, windowMs), {
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

const getCoalescedStatisticsBucketMap = (
  callWs: StatisticsCallWs
): Map<string, CoalescedStatisticsFullWindowBucket> => {
  const existing = coalescedStatisticsFullWindowBuckets.get(callWs);
  if (existing) {
    return existing;
  }

  const created = new Map<string, CoalescedStatisticsFullWindowBucket>();
  coalescedStatisticsFullWindowBuckets.set(callWs, created);
  return created;
};

const callStatisticsWsApi = async (
  callWs: StatisticsCallWs,
  startMs: number,
  endMs: number,
  entityIds: string[]
): Promise<unknown> => {
  const statisticIds = [...entityIds];
  const startIso = new Date(startMs).toISOString();
  const endIso = new Date(endMs).toISOString();

  const preferredMessageType = statisticsMessageTypeCache.get(callWs);
  const typesToTry: StatisticsMessageType[] = preferredMessageType
    ? [preferredMessageType]
    : ["recorder/statistics_during_period", "history/statistics_during_period"];
  let lastError: unknown;

  for (const messageType of typesToTry) {
    try {
      const response = await callWs({
        type: messageType,
        start_time: startIso,
        end_time: endIso,
        statistic_ids: statisticIds,
        period: "5minute",
        types: ["state", "mean", "sum"]
      });
      statisticsMessageTypeCache.set(callWs, messageType);
      return response;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
};

const fetchStatisticsMetadataSupport = async (
  callWs: StatisticsCallWs,
  entityIds: string[]
): Promise<Set<string> | null> => {
  if (entityIds.length === 0) {
    return new Set<string>();
  }

  try {
    const raw = await callWs({
      type: "recorder/get_statistics_metadata",
      statistic_ids: entityIds
    });
    if (!Array.isArray(raw)) {
      return null;
    }

    const supported = new Set<string>();
    raw.forEach((item) => {
      if (!item || typeof item !== "object") {
        return;
      }
      const statisticId = (item as Record<string, unknown>).statistic_id;
      if (typeof statisticId === "string" && statisticId.length > 0) {
        supported.add(statisticId);
      }
    });
    return supported;
  } catch {
    return null;
  }
};

const fetchStatisticsBatchFromWs = async (
  callWs: StatisticsCallWs,
  entityIds: string[],
  windowMs: number,
  startMs: number,
  now: number,
  useCache: boolean
): Promise<StatisticsBatchResult> => {
  let raw: unknown;
  try {
    raw = await callStatisticsWsApi(callWs, startMs, now, entityIds);
  } catch {
    const unsupported = new Set<string>(entityIds);
    const empty: Record<string, HistoryTrendPoint[]> = {};
    entityIds.forEach((entityId) => {
      empty[entityId] = [];
    });
    return {
      pointsByEntity: empty,
      unsupportedEntityIds: unsupported
    };
  }

  const byStatisticId = raw && typeof raw === "object" && !Array.isArray(raw)
    ? raw as Record<string, unknown>
    : {};
  const byEntity: Record<string, HistoryTrendPoint[]> = {};
  const unsupportedEntityIds = new Set<string>();
  const missingEntityIds: string[] = [];

  entityIds.forEach((entityId) => {
    if (!Object.prototype.hasOwnProperty.call(byStatisticId, entityId)) {
      byEntity[entityId] = [];
      missingEntityIds.push(entityId);
      return;
    }

    const parsed = parseStatisticsEntitySeries(byStatisticId[entityId], windowMs, now);
    byEntity[entityId] = parsed;
    writeStatisticsSupport(callWs, entityId, true, now);

    if (useCache) {
      entityTrendCache.set(cacheKeyForEntityWindow("statistics", entityId, windowMs), {
        expiresAt: now + HISTORY_CACHE_TTL_MS,
        points: clonePoints(parsed)
      });
    }
  });

  const metadataUnknownEntityIds: string[] = [];
  missingEntityIds.forEach((entityId) => {
    const support = readStatisticsSupport(callWs, entityId, now);
    if (support === true) {
      return;
    }
    if (support === false) {
      unsupportedEntityIds.add(entityId);
      return;
    }
    metadataUnknownEntityIds.push(entityId);
  });

  const metadataSupported = await fetchStatisticsMetadataSupport(callWs, metadataUnknownEntityIds);
  if (metadataSupported !== null) {
    metadataUnknownEntityIds.forEach((entityId) => {
      const supported = metadataSupported.has(entityId);
      writeStatisticsSupport(callWs, entityId, supported, now);
      if (!supported) {
        unsupportedEntityIds.add(entityId);
      }
    });
  } else {
    metadataUnknownEntityIds.forEach((entityId) => {
      unsupportedEntityIds.add(entityId);
    });
  }

  return {
    pointsByEntity: byEntity,
    unsupportedEntityIds
  };
};

const queueCoalescedStatisticsFullWindowFetch = (
  callWs: StatisticsCallWs,
  key: string,
  entityIds: string[],
  windowMs: number,
  startMs: number
): Promise<StatisticsBatchResult> => {
  const bucketMap = getCoalescedStatisticsBucketMap(callWs);
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
        const fetched = await fetchStatisticsBatchFromWs(
          callWs,
          mergedEntityIds,
          windowMs,
          startMs,
          Date.now(),
          true
        );
        activeBucket.waiters.forEach((waiter) => {
          const subset: StatisticsBatchResult = {
            pointsByEntity: {},
            unsupportedEntityIds: new Set<string>()
          };
          waiter.entityIds.forEach((entityId) => {
            subset.pointsByEntity[entityId] = clonePoints(fetched.pointsByEntity[entityId] ?? []);
            if (fetched.unsupportedEntityIds.has(entityId)) {
              subset.unsupportedEntityIds.add(entityId);
            }
          });
          waiter.resolve(subset);
        });
      } catch (error) {
        activeBucket.waiters.forEach((waiter) => waiter.reject(error));
      }
    }, FULL_WINDOW_COALESCE_DELAY_MS);
  });
};

const fetchHistoryTrendPointsBatchInternal = async (
  hass: Pick<HomeAssistant, "callApi">,
  entityIds: string[],
  windowMs: number,
  startMs?: number
): Promise<Record<string, HistoryTrendPoint[]>> => {
  const callApi = hass.callApi as HistoryCallApi | undefined;
  const uniqueEntityIds = Array.from(new Set(entityIds.filter((entityId) => entityId.length > 0)));
  if (!callApi || uniqueEntityIds.length === 0) {
    return {};
  }

  const now = Date.now();
  const requestedStartMs = typeof startMs === "number" && Number.isFinite(startMs)
    ? Math.max(now - windowMs, Math.floor(startMs))
    : now - windowMs;
  const useCache = requestedStartMs <= (now - windowMs + 1000);
  const normalizedStartMs = normalizeHistoryStartMs(requestedStartMs, useCache);
  const result: Record<string, HistoryTrendPoint[]> = {};
  const missingEntityIds: string[] = [];

  uniqueEntityIds.forEach((entityId) => {
    if (useCache) {
      const cacheKey = cacheKeyForEntityWindow("history", entityId, windowMs);
      const cached = entityTrendCache.get(cacheKey);
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
  const existingInflight = historyBatchInflight.get(inflightKey);
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

  historyBatchInflight.set(inflightKey, task);
  try {
    const fetched = await task;
    missingEntityIds.forEach((entityId) => {
      result[entityId] = clonePoints(fetched[entityId] ?? []);
    });
    return result;
  } finally {
    historyBatchInflight.delete(inflightKey);
  }
};

const fetchStatisticsTrendPointsBatchInternal = async (
  hass: Pick<HomeAssistant, "callWS">,
  entityIds: string[],
  windowMs: number,
  startMs?: number
): Promise<StatisticsBatchResult> => {
  const callWs = hass.callWS as StatisticsCallWs | undefined;
  const uniqueEntityIds = Array.from(new Set(entityIds.filter((entityId) => entityId.length > 0)));
  if (!callWs || uniqueEntityIds.length === 0) {
    return {
      pointsByEntity: {},
      unsupportedEntityIds: new Set<string>(uniqueEntityIds)
    };
  }

  const now = Date.now();
  const requestedStartMs = typeof startMs === "number" && Number.isFinite(startMs)
    ? Math.max(now - windowMs, Math.floor(startMs))
    : now - windowMs;
  const useCache = requestedStartMs <= (now - windowMs + 1000);
  const normalizedStartMs = normalizeHistoryStartMs(requestedStartMs, useCache);
  const result: Record<string, HistoryTrendPoint[]> = {};
  const missingEntityIds: string[] = [];
  const unsupportedEntityIds = new Set<string>();

  uniqueEntityIds.forEach((entityId) => {
    const support = readStatisticsSupport(callWs, entityId, now);
    if (support === false) {
      result[entityId] = [];
      unsupportedEntityIds.add(entityId);
      return;
    }

    if (useCache) {
      const cacheKey = cacheKeyForEntityWindow("statistics", entityId, windowMs);
      const cached = entityTrendCache.get(cacheKey);
      if (cached && cached.expiresAt > now) {
        result[entityId] = clonePoints(cached.points);
        return;
      }
    }
    missingEntityIds.push(entityId);
  });

  if (missingEntityIds.length === 0) {
    return {
      pointsByEntity: result,
      unsupportedEntityIds
    };
  }

  const mergeFetched = (fetched: StatisticsBatchResult): StatisticsBatchResult => {
    missingEntityIds.forEach((entityId) => {
      result[entityId] = clonePoints(fetched.pointsByEntity[entityId] ?? []);
      if (fetched.unsupportedEntityIds.has(entityId)) {
        unsupportedEntityIds.add(entityId);
      }
    });
    return {
      pointsByEntity: result,
      unsupportedEntityIds
    };
  };

  if (useCache) {
    const coalescedKey = `${normalizedStartMs}|${windowMs}`;
    const fetched = await queueCoalescedStatisticsFullWindowFetch(
      callWs,
      coalescedKey,
      missingEntityIds,
      windowMs,
      normalizedStartMs
    );
    return mergeFetched(fetched);
  }

  const sortedForKey = [...missingEntityIds].sort();
  const inflightKey = `${normalizedStartMs}|${windowMs}|${sortedForKey.join(",")}`;
  const existingInflight = statisticsBatchInflight.get(inflightKey);
  if (existingInflight) {
    const inflightResult = await existingInflight;
    return mergeFetched(inflightResult);
  }

  const task = (async (): Promise<StatisticsBatchResult> => {
    return fetchStatisticsBatchFromWs(
      callWs,
      missingEntityIds,
      windowMs,
      normalizedStartMs,
      now,
      useCache
    );
  })();

  statisticsBatchInflight.set(inflightKey, task);
  try {
    const fetched = await task;
    return mergeFetched(fetched);
  } finally {
    statisticsBatchInflight.delete(inflightKey);
  }
};

const fetchHybridTrendPointsBatchInternal = async (
  hass: Pick<HomeAssistant, "callApi" | "callWS">,
  entityIds: string[],
  windowMs: number,
  startMs?: number
): Promise<Record<string, HistoryTrendPoint[]>> => {
  const statistics = await fetchStatisticsTrendPointsBatchInternal(
    hass,
    entityIds,
    windowMs,
    startMs
  );

  const merged: Record<string, HistoryTrendPoint[]> = {};
  entityIds.forEach((entityId) => {
    if (entityId.length === 0) {
      return;
    }
    merged[entityId] = clonePoints(statistics.pointsByEntity[entityId] ?? []);
  });

  const unsupported = Array.from(statistics.unsupportedEntityIds).filter((entityId) => entityId.length > 0);
  if (unsupported.length === 0) {
    return merged;
  }

  const historyFallback = await fetchHistoryTrendPointsBatchInternal(
    hass,
    unsupported,
    windowMs,
    startMs
  );
  unsupported.forEach((entityId) => {
    merged[entityId] = clonePoints(historyFallback[entityId] ?? []);
  });

  return merged;
};

export const fetchHistoryTrendPointsBatch = async (
  hass: Pick<HomeAssistant, "callApi" | "callWS">,
  entityIds: string[],
  windowMs: number,
  options?: HistoryFetchBatchOptions
): Promise<Record<string, HistoryTrendPoint[]>> => {
  const dataSource = normalizeTrendDataSource(options?.dataSource, "hybrid");
  if (dataSource === "history") {
    return fetchHistoryTrendPointsBatchInternal(hass, entityIds, windowMs, options?.startMs);
  }
  if (dataSource === "statistics") {
    const statistics = await fetchStatisticsTrendPointsBatchInternal(
      hass,
      entityIds,
      windowMs,
      options?.startMs
    );
    return statistics.pointsByEntity;
  }
  return fetchHybridTrendPointsBatchInternal(hass, entityIds, windowMs, options?.startMs);
};
