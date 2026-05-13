import type { HistoryTrendPoint } from "./history";

export interface CsvSeriesInput {
  label: string;
  entityId: string;
  unit: string;
  points: ReadonlyArray<HistoryTrendPoint>;
}

const pad = (n: number, w = 2): string => String(n).padStart(w, "0");

/** Local-timezone ISO 8601 with offset (e.g. 2026-05-13T14:00:00+02:00). */
const toLocalIso = (ms: number): string => {
  const d = new Date(ms);
  const offsetMin = -d.getTimezoneOffset();
  const sign = offsetMin >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMin);
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}` +
    `${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`
  );
};

const csvEscape = (cell: string): string => {
  if (/[",\n\r]/.test(cell)) {
    return `"${cell.replace(/"/g, '""')}"`;
  }
  return cell;
};

/** Wide-format CSV with one column per series and a union of timestamps. */
export const seriesToCsv = (
  series: ReadonlyArray<CsvSeriesInput>
): string => {
  const filtered = series.filter((s) => s.points.length > 0);
  const tsByEntity = new Map<string, Map<number, number>>();
  const tsUnion = new Set<number>();
  for (const s of filtered) {
    const m = new Map<number, number>();
    for (const p of s.points) {
      m.set(p.ts, p.value);
      tsUnion.add(p.ts);
    }
    tsByEntity.set(s.entityId, m);
  }

  const sortedTs = [...tsUnion].sort((a, b) => a - b);

  const lines: string[] = [];

  const header = [
    "timestamp",
    ...filtered.map((s) =>
      csvEscape(s.unit ? `${s.label} (${s.unit})` : s.label)
    ),
  ];
  lines.push(header.join(","));

  for (const ts of sortedTs) {
    const row: string[] = [toLocalIso(ts)];
    for (const s of filtered) {
      const v = tsByEntity.get(s.entityId)?.get(ts);
      row.push(v !== undefined && Number.isFinite(v) ? String(v) : "");
    }
    lines.push(row.join(","));
  }

  return lines.join("\n") + "\n";
};

/** Trigger a browser download for a CSV string. Adds a UTF-8 BOM so
 *  Excel opens it with the correct encoding by default. */
export const downloadCsv = (filename: string, content: string): void => {
  const blob = new Blob(["\uFEFF" + content], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 0);
};

/** Build a safe filename slug (ASCII-ish, no spaces). */
export const slugify = (input: string): string => {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036F]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "export";
};
