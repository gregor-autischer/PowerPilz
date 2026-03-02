export type UnitFamily = "power" | "energy";

interface ParsedUnit {
  family: UnitFamily;
  prefixPower: number;
  factor: number;
  canonicalUnit: "W" | "Wh";
}

export interface UnitFormatOptions {
  enabled: boolean;
  baseDecimals: number;
  prefixedDecimals: number;
  nullWithUnit?: boolean;
}

export interface ComparableUnitContext<K extends string> {
  comparable: boolean;
  family: UnitFamily | null;
  canonicalUnit: string | null;
  factors: Partial<Record<K, number>>;
}

const PREFIX_BY_POWER: Record<string, number> = {
  "": 0,
  k: 1,
  m: -1,
  M: 2,
  G: 3,
  T: 4
};

const PREFIX_BY_INDEX = ["", "k", "M", "G", "T"];

export const clampUnitDecimals = (value: unknown, fallback: number): number => {
  const parsed = typeof value === "number" && Number.isFinite(value)
    ? Math.round(value)
    : fallback;
  return Math.max(0, Math.min(4, parsed));
};

export const parseConvertibleUnit = (unitRaw: string | undefined): ParsedUnit | null => {
  if (!unitRaw) {
    return null;
  }

  const unit = unitRaw.trim();
  if (unit.length === 0) {
    return null;
  }

  if (unit.endsWith("Wh")) {
    const prefix = unit.slice(0, -2);
    const normalizedPrefix = prefix === "K" ? "k" : prefix;
    const prefixPower = PREFIX_BY_POWER[normalizedPrefix];
    if (prefixPower === undefined) {
      return null;
    }
    return {
      family: "energy",
      prefixPower,
      factor: Math.pow(1000, prefixPower),
      canonicalUnit: "Wh"
    };
  }

  if (unit.endsWith("W")) {
    const prefix = unit.slice(0, -1);
    const normalizedPrefix = prefix === "K" ? "k" : prefix;
    const prefixPower = PREFIX_BY_POWER[normalizedPrefix];
    if (prefixPower === undefined) {
      return null;
    }
    return {
      family: "power",
      prefixPower,
      factor: Math.pow(1000, prefixPower),
      canonicalUnit: "W"
    };
  }

  return null;
};

const unitForFamilyAndPower = (family: UnitFamily, prefixPower: number): string => {
  const clampedPower = Math.max(0, Math.min(PREFIX_BY_INDEX.length - 1, prefixPower));
  const prefix = PREFIX_BY_INDEX[clampedPower] ?? "";
  return family === "energy" ? `${prefix}Wh` : `${prefix}W`;
};

const chooseDisplayPrefixPower = (canonicalAbs: number): number => {
  if (!Number.isFinite(canonicalAbs) || canonicalAbs <= 0) {
    return 0;
  }

  let power = 0;
  let reduced = canonicalAbs;
  while (reduced >= 1000 && power < PREFIX_BY_INDEX.length - 1) {
    reduced /= 1000;
    power += 1;
  }
  return power;
};

export const formatValueWithUnitScaling = (
  value: number | null,
  unit: string,
  fallbackDecimals: number,
  options: UnitFormatOptions
): string => {
  const nullWithUnit = options.nullWithUnit === true;
  if (value === null) {
    return nullWithUnit && unit ? `-- ${unit}` : "--";
  }

  const parsed = parseConvertibleUnit(unit);
  if (!options.enabled || !parsed) {
    return `${value.toFixed(fallbackDecimals)} ${unit}`.trim();
  }

  const sign = value < 0 ? "-" : "";
  const canonicalAbs = Math.abs(value) * parsed.factor;
  const targetPower = chooseDisplayPrefixPower(canonicalAbs);
  const targetUnit = unitForFamilyAndPower(parsed.family, targetPower);
  const scaled = canonicalAbs / Math.pow(1000, targetPower);
  const decimals = targetPower === 0
    ? options.baseDecimals
    : options.prefixedDecimals;

  return `${sign}${scaled.toFixed(decimals)} ${targetUnit}`.trim();
};

export const resolveComparableUnitContext = <K extends string>(
  unitsByKey: Partial<Record<K, string | undefined>>
): ComparableUnitContext<K> => {
  const keys = Object.keys(unitsByKey) as K[];
  const factors: Partial<Record<K, number>> = {};
  if (keys.length === 0) {
    return {
      comparable: false,
      family: null,
      canonicalUnit: null,
      factors
    };
  }

  let family: UnitFamily | null = null;
  let canonicalUnit: string | null = null;
  for (const key of keys) {
    const parsed = parseConvertibleUnit(unitsByKey[key]);
    if (!parsed) {
      return {
        comparable: false,
        family: null,
        canonicalUnit: null,
        factors
      };
    }
    if (family === null) {
      family = parsed.family;
      canonicalUnit = parsed.canonicalUnit;
    } else if (family !== parsed.family) {
      return {
        comparable: false,
        family: null,
        canonicalUnit: null,
        factors
      };
    }
    factors[key] = parsed.factor;
  }

  return {
    comparable: true,
    family,
    canonicalUnit,
    factors
  };
};

export const convertToCanonicalValue = (value: number, unit: string): number | null => {
  const parsed = parseConvertibleUnit(unit);
  if (!parsed) {
    return null;
  }
  return value * parsed.factor;
};

export const convertFromCanonicalValue = (value: number, unit: string): number | null => {
  const parsed = parseConvertibleUnit(unit);
  if (!parsed || Math.abs(parsed.factor) <= 0) {
    return null;
  }
  return value / parsed.factor;
};
