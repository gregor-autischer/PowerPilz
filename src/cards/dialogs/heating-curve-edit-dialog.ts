/**
 * Heating curve edit dialog — PowerPilz weekly point editor.
 *
 * Per-day SVG track:
 *   - Tap on empty area: insert a point at that (time, value), x snapped
 *     to 15 minutes, y free within [value_min, value_max].
 *   - Drag a point: move it (same snap rules, prevented from passing
 *     neighbours so the curve stays single-valued).
 *   - Double-click a point: delete (each day must keep at least one).
 *
 * Plus: "same for all days" toggle (collapses to a single editor row,
 * applied to every weekday on save), and per-day Copy → Paste-to-day.
 *
 * All edits are buffered until Save, which calls
 * `powerpilz_companion.set_curve_points`.
 */

import { css, html, nothing, svg, type CSSResultGroup, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import type { HomeAssistant } from "../../types";
import { tr, haLang, weekdayShort } from "../../utils/i18n";
import { buildSmoothPath, type CurvePoint } from "../../utils/curve-spline";
import { PowerPilzDialogBase } from "./dialog-shell";

interface CurveStoredPoint {
  time: string; // "HH:MM:SS"
  value: number;
}

type WeekPoints = {
  monday: CurveStoredPoint[];
  tuesday: CurveStoredPoint[];
  wednesday: CurveStoredPoint[];
  thursday: CurveStoredPoint[];
  friday: CurveStoredPoint[];
  saturday: CurveStoredPoint[];
  sunday: CurveStoredPoint[];
};

const DIALOG_TAG = "power-pilz-heating-curve-edit-dialog";

const WEEK = [
  { key: "monday",    dayIndex: 1 },
  { key: "tuesday",   dayIndex: 2 },
  { key: "wednesday", dayIndex: 3 },
  { key: "thursday",  dayIndex: 4 },
  { key: "friday",    dayIndex: 5 },
  { key: "saturday",  dayIndex: 6 },
  { key: "sunday",    dayIndex: 0 },
] as const;

type DayKey = typeof WEEK[number]["key"];

const SNAP_MINUTES = 15;
const DAY_MINUTES = 24 * 60;

// SVG viewBox dimensions — kept large so coordinates round nicely.
const VB_W = 1000;
const VB_H = 220;
const VB_PAD_X = 30;
const VB_PAD_TOP = 14;
const VB_PAD_BOTTOM = 22;

interface DragState {
  day: DayKey;
  pointIndex: number;
  pointerId: number;
  svgEl: SVGSVGElement;
}

export interface HeatingCurveEditDialogOptions {
  hass: HomeAssistant;
  curveEntityId: string;
  title?: string;
}

function _emptyWeek(): WeekPoints {
  return {
    monday: [], tuesday: [], wednesday: [], thursday: [],
    friday: [], saturday: [], sunday: [],
  };
}

class PowerPilzHeatingCurveEditDialog extends PowerPilzDialogBase {
  @property({ attribute: false })
  public hass!: HomeAssistant;

  @property({ type: String })
  public curveEntityId = "";

  @state() private _points: WeekPoints = _emptyWeek();
  @state() private _loading = true;
  @state() private _loadError?: string;
  @state() private _saving = false;
  @state() private _dirty = false;
  @state() private _sameForAll = false;
  @state() private _valueMin = 5;
  @state() private _valueMax = 30;
  @state() private _unit = "°C";
  @state() private _clipboard?: { source: DayKey; points: CurveStoredPoint[] };

  private _drag?: DragState;

  connectedCallback(): void {
    super.connectedCallback();
    void this._loadCurve();
  }

  protected _handleEscape(_event: KeyboardEvent): void {
    if (this._saving) return;
    this.close();
  }

  // ------------------------------------------------------------
  // Load + save
  // ------------------------------------------------------------

  private async _loadCurve(): Promise<void> {
    const lang = haLang(this.hass);
    try {
      const state = this.hass?.states?.[this.curveEntityId];
      if (!state) {
        this._loadError = tr(lang, "heating_curve.edit_dialog.error_not_found", {
          entity: this.curveEntityId,
        });
        return;
      }
      const attrs = state.attributes ?? {};
      const raw = attrs.week_points;
      const loaded = _emptyWeek();
      if (raw && typeof raw === "object" && !Array.isArray(raw)) {
        for (const day of Object.keys(loaded) as (keyof WeekPoints)[]) {
          const list = (raw as Record<string, unknown>)[day];
          if (Array.isArray(list)) {
            loaded[day] = list
              .filter((p): p is Record<string, unknown> => !!p && typeof p === "object")
              .map((p) => ({
                time: String(p.time ?? "00:00:00"),
                value: typeof p.value === "number" ? p.value : Number(p.value)
              }))
              .filter((p) => Number.isFinite(p.value))
              .sort((a, b) => _toMin(a.time) - _toMin(b.time));
          }
        }
      }
      this._points = loaded;
      this._sameForAll = attrs.same_for_all_days === true;
      const vmin = Number(attrs.value_min);
      const vmax = Number(attrs.value_max);
      if (Number.isFinite(vmin)) this._valueMin = vmin;
      if (Number.isFinite(vmax) && vmax > this._valueMin) this._valueMax = vmax;
      if (typeof attrs.unit === "string") this._unit = attrs.unit;

      // If a day has no points yet, seed it with a single midpoint so the
      // user always has something to grab. New days emerge silently dirty.
      const seed = (this._valueMin + this._valueMax) / 2;
      let seeded = false;
      for (const k of Object.keys(this._points) as DayKey[]) {
        if (this._points[k].length === 0) {
          this._points[k] = [{ time: "12:00:00", value: round1(seed) }];
          seeded = true;
        }
      }
      if (seeded) this._dirty = true;
    } catch (err) {
      this._loadError = String((err as Error)?.message || err);
    } finally {
      this._loading = false;
    }
  }

  private async _handleSave(): Promise<void> {
    if (this._saving || !this.hass) return;
    this._saving = true;
    this.lockClose = true;
    try {
      let payload: WeekPoints;
      if (this._sameForAll) {
        const src = this._points.monday;
        payload = {
          monday: src, tuesday: src, wednesday: src, thursday: src,
          friday: src, saturday: src, sunday: src,
        };
      } else {
        payload = this._points;
      }
      await this.hass.callService(
        "powerpilz_companion",
        "set_curve_points",
        { entity_id: this.curveEntityId, points: payload },
      );
      this._dirty = false;
      this.close();
    } catch (err) {
      this._saving = false;
      this.lockClose = false;
      this._loadError = String((err as Error)?.message || err);
    }
  }

  // ------------------------------------------------------------
  // Point manipulation
  // ------------------------------------------------------------

  private _setPointsForDay(day: DayKey, list: CurveStoredPoint[]): void {
    const sorted = [...list].sort((a, b) => _toMin(a.time) - _toMin(b.time));
    this._points = { ...this._points, [day]: sorted };
    this._dirty = true;
  }

  private _addPointAt(day: DayKey, minutes: number, value: number): void {
    const snappedMin = Math.round(minutes / SNAP_MINUTES) * SNAP_MINUTES;
    const time = _minToHms(snappedMin);
    const v = round1(this._clamp(value));
    const list = [...this._points[day]];
    if (!list.some((p) => p.time === time)) {
      list.push({ time, value: v });
      this._setPointsForDay(day, list);
    }
  }

  private _movePoint(day: DayKey, idx: number, minutes: number, value: number): void {
    const list = [...this._points[day]];
    if (idx < 0 || idx >= list.length) return;
    const snappedMin = Math.round(minutes / SNAP_MINUTES) * SNAP_MINUTES;
    const lower = idx > 0 ? _toMin(list[idx - 1].time) + SNAP_MINUTES : 0;
    const upper = idx < list.length - 1 ? _toMin(list[idx + 1].time) - SNAP_MINUTES : DAY_MINUTES;
    const clampedMin = Math.max(lower, Math.min(upper, snappedMin));
    list[idx] = {
      time: _minToHms(clampedMin),
      value: round1(this._clamp(value))
    };
    this._setPointsForDay(day, list);
  }

  private _deletePoint(day: DayKey, idx: number): void {
    const list = this._points[day];
    if (list.length <= 1) return;
    this._setPointsForDay(day, list.filter((_, i) => i !== idx));
  }

  private _clamp(v: number): number {
    return Math.max(this._valueMin, Math.min(this._valueMax, v));
  }

  // ------------------------------------------------------------
  // Coordinate mapping
  // ------------------------------------------------------------

  private _svgToData(svgEl: SVGSVGElement, clientX: number, clientY: number): { minutes: number; value: number } {
    const pt = svgEl.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svgEl.getScreenCTM();
    const local = ctm ? pt.matrixTransform(ctm.inverse()) : { x: 0, y: 0 };
    const usableW = VB_W - 2 * VB_PAD_X;
    const usableH = VB_H - VB_PAD_TOP - VB_PAD_BOTTOM;
    const xRel = Math.max(0, Math.min(usableW, local.x - VB_PAD_X));
    const yRel = Math.max(0, Math.min(usableH, local.y - VB_PAD_TOP));
    const minutes = (xRel / usableW) * DAY_MINUTES;
    const value = this._valueMax - (yRel / usableH) * (this._valueMax - this._valueMin);
    return { minutes, value };
  }

  // ------------------------------------------------------------
  // Pointer interactions
  // ------------------------------------------------------------

  private _handleSvgPointerDown = (event: PointerEvent): void => {
    if (this._loading || this._loadError) return;
    if (event.button !== 0) return;
    const svgEl = event.currentTarget as SVGSVGElement;
    const day = svgEl.dataset.day as DayKey | undefined;
    if (!day) return;

    const target = event.target as Element;
    const pointEl = target.closest("[data-point-index]");
    if (pointEl) {
      const idx = parseInt(
        (pointEl as HTMLElement).dataset.pointIndex ?? "-1", 10
      );
      if (idx >= 0) {
        event.preventDefault();
        try { svgEl.setPointerCapture(event.pointerId); } catch { /* ignore */ }
        this._drag = { day, pointIndex: idx, pointerId: event.pointerId, svgEl };
      }
      return;
    }

    // Empty space — create a new point.
    event.preventDefault();
    const { minutes, value } = this._svgToData(svgEl, event.clientX, event.clientY);
    this._addPointAt(day, minutes, value);
  };

  private _handleSvgPointerMove = (event: PointerEvent): void => {
    if (!this._drag || event.pointerId !== this._drag.pointerId) return;
    const { minutes, value } = this._svgToData(
      this._drag.svgEl, event.clientX, event.clientY
    );
    this._movePoint(this._drag.day, this._drag.pointIndex, minutes, value);
  };

  private _handleSvgPointerUp = (event: PointerEvent): void => {
    if (!this._drag || event.pointerId !== this._drag.pointerId) return;
    try { this._drag.svgEl.releasePointerCapture(this._drag.pointerId); } catch { /* ignore */ }
    this._drag = undefined;
  };

  private _handlePointDblClick = (event: MouseEvent): void => {
    event.stopPropagation();
    const el = event.currentTarget as HTMLElement;
    const day = (el.parentElement?.parentElement as SVGSVGElement | null)?.dataset.day as DayKey | undefined;
    const idx = parseInt(el.dataset.pointIndex ?? "-1", 10);
    if (!day || idx < 0) return;
    this._deletePoint(day, idx);
  };

  // ------------------------------------------------------------
  // Same-for-all + copy/paste
  // ------------------------------------------------------------

  private _toggleSameForAll = (): void => {
    if (!this._sameForAll) {
      // Switching ON — propagate Monday to every other day so save sees
      // a sensible starting state.
      const src = this._points.monday;
      this._points = {
        monday: src, tuesday: src, wednesday: src, thursday: src,
        friday: src, saturday: src, sunday: src,
      };
      this._dirty = true;
    }
    this._sameForAll = !this._sameForAll;
  };

  private _copyDay = (event: Event): void => {
    event.stopPropagation();
    const el = event.currentTarget as HTMLElement;
    const day = el.dataset.day as DayKey | undefined;
    if (!day) return;
    this._clipboard = {
      source: day,
      points: this._points[day].map((p) => ({ ...p })),
    };
  };

  private _pasteDay = (event: Event): void => {
    event.stopPropagation();
    const el = event.currentTarget as HTMLElement;
    const day = el.dataset.day as DayKey | undefined;
    if (!day || !this._clipboard) return;
    this._setPointsForDay(day, this._clipboard.points.map((p) => ({ ...p })));
  };

  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------

  protected willUpdate(): void {
    const resolved = this._resolveTitle();
    if (this.dialogTitle !== resolved && !this.dialogTitle) {
      this.dialogTitle = resolved;
    }
  }

  private _resolveTitle(): string {
    if (this.dialogTitle) return this.dialogTitle;
    const lang = haLang(this.hass);
    return (
      this.hass?.states?.[this.curveEntityId]?.attributes?.friendly_name as string | undefined
      ?? tr(lang, "heating_curve.edit_dialog.default_title")
    );
  }

  protected renderBody(): TemplateResult {
    const lang = haLang(this.hass);
    if (this._loading) return html`<div class="msg">${tr(lang, "common.loading") || "Loading…"}</div>`;
    if (this._loadError) return html`<div class="msg error">${this._loadError}</div>`;

    const days = this._sameForAll ? [WEEK[0]] : WEEK;
    return html`
      <div class="hc-toolbar">
        <label class="hc-toggle">
          <input
            type="checkbox"
            .checked=${this._sameForAll}
            @change=${this._toggleSameForAll}
          />
          <span>${tr(lang, "heating_curve.edit_dialog.same_for_all")}</span>
        </label>
        <span class="hc-range">
          ${tr(lang, "heating_curve.edit_dialog.range_label")}: ${this._valueMin}${this._unit} – ${this._valueMax}${this._unit}
        </span>
      </div>
      <div class="hc-editor">
        ${days.map((d) => this._renderDayRow(d.key, d.dayIndex, lang))}
      </div>
      <div class="hint">${tr(lang, "heating_curve.edit_dialog.hint")}</div>
    `;
  }

  protected renderFooter(): TemplateResult {
    const lang = haLang(this.hass);
    return html`
      <button class="ppd-btn flat" @click=${() => this.close()} ?disabled=${this._saving}>
        ${tr(lang, "common.cancel")}
      </button>
      <button
        class="ppd-btn primary"
        @click=${this._handleSave}
        ?disabled=${this._saving || !this._dirty || !!this._loadError}
      >
        ${this._saving ? tr(lang, "common.saving") || "Saving…" : tr(lang, "common.save") || "Save"}
      </button>
    `;
  }

  private _renderDayRow(key: DayKey, dayIndex: number, lang: "en" | "de"): TemplateResult {
    const points = this._points[key];
    const dayLabel = this._sameForAll
      ? tr(lang, "heating_curve.edit_dialog.all_days")
      : weekdayShort(lang, dayIndex);

    const usableW = VB_W - 2 * VB_PAD_X;
    const usableH = VB_H - VB_PAD_TOP - VB_PAD_BOTTOM;
    const range = Math.max(0.0001, this._valueMax - this._valueMin);
    const screen = (p: CurvePoint) => ({
      x: VB_PAD_X + (p.x / DAY_MINUTES) * usableW,
      y: VB_PAD_TOP + (1 - (p.y - this._valueMin) / range) * usableH,
    });
    const curvePoints: CurvePoint[] = points
      .map((p) => ({ x: _toMin(p.time), y: p.value }))
      .sort((a, b) => a.x - b.x);
    const path = buildSmoothPath(curvePoints, screen);

    const hasClipboard = !!this._clipboard;
    const isClipboardSource = this._clipboard?.source === key;

    return html`
      <div class="hc-row">
        <div class="hc-row-head">
          <span class="hc-day">${dayLabel}</span>
          <div class="hc-row-actions">
            <button
              class="ppd-btn flat tiny"
              data-day=${key}
              @click=${this._copyDay}
              title=${tr(lang, "heating_curve.edit_dialog.copy")}
            >
              <ha-icon icon="mdi:content-copy"></ha-icon>
            </button>
            <button
              class="ppd-btn flat tiny"
              data-day=${key}
              @click=${this._pasteDay}
              ?disabled=${!hasClipboard || isClipboardSource}
              title=${tr(lang, "heating_curve.edit_dialog.paste")}
            >
              <ha-icon icon="mdi:content-paste"></ha-icon>
            </button>
          </div>
        </div>
        <svg
          class="hc-svg"
          viewBox="0 0 ${VB_W} ${VB_H}"
          preserveAspectRatio="none"
          data-day=${key}
          @pointerdown=${this._handleSvgPointerDown}
          @pointermove=${this._handleSvgPointerMove}
          @pointerup=${this._handleSvgPointerUp}
          @pointercancel=${this._handleSvgPointerUp}
        >
          ${this._renderGrid(usableW, usableH)}
          ${path
            ? svg`<path d=${path}
                fill="none"
                stroke="var(--primary-color, #03a9f4)"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                vector-effect="non-scaling-stroke"
              />`
            : nothing}
          ${points.map((p, i) => {
            const s = screen({ x: _toMin(p.time), y: p.value });
            return svg`
              <g class="hc-point-grp">
                <circle
                  data-point-index=${i}
                  class="hc-hit"
                  cx=${s.x} cy=${s.y} r="14"
                  fill="transparent"
                  @dblclick=${this._handlePointDblClick}
                ></circle>
                <circle
                  cx=${s.x} cy=${s.y} r="6"
                  fill="var(--primary-color, #03a9f4)"
                  stroke="var(--card-background-color, white)"
                  stroke-width="2"
                  pointer-events="none"
                ></circle>
                <text
                  x=${s.x} y=${s.y - 12}
                  text-anchor="middle"
                  class="hc-label"
                  pointer-events="none"
                >${p.value.toFixed(1)}${this._unit}</text>
                <text
                  x=${s.x} y=${VB_H - 4}
                  text-anchor="middle"
                  class="hc-time-label"
                  pointer-events="none"
                >${p.time.slice(0, 5)}</text>
              </g>`;
          })}
        </svg>
      </div>
    `;
  }

  private _renderGrid(usableW: number, usableH: number) {
    const hourMarks = [0, 6, 12, 18, 24];
    const valueSteps = 4;
    return svg`
      ${hourMarks.map((h) => {
        const x = VB_PAD_X + (h / 24) * usableW;
        return svg`
          <line x1=${x} x2=${x}
            y1=${VB_PAD_TOP} y2=${VB_PAD_TOP + usableH}
            stroke="rgba(127,127,127,0.18)" stroke-width="1"
            vector-effect="non-scaling-stroke"
          />
          <text x=${x} y=${VB_PAD_TOP - 4}
            text-anchor="middle" class="hc-axis-label"
          >${String(h).padStart(2, "0")}</text>`;
      })}
      ${Array.from({ length: valueSteps + 1 }, (_, i) => {
        const f = i / valueSteps;
        const y = VB_PAD_TOP + f * usableH;
        const v = this._valueMax - f * (this._valueMax - this._valueMin);
        return svg`
          <line x1=${VB_PAD_X} x2=${VB_PAD_X + usableW}
            y1=${y} y2=${y}
            stroke="rgba(127,127,127,0.12)" stroke-width="1"
            stroke-dasharray=${i === 0 || i === valueSteps ? "0" : "2 4"}
            vector-effect="non-scaling-stroke"
          />
          <text x=${VB_PAD_X - 4} y=${y + 3}
            text-anchor="end" class="hc-axis-label"
          >${v.toFixed(0)}</text>`;
      })}
    `;
  }

  static styles: CSSResultGroup = [
    PowerPilzDialogBase.styles,
    css`
      .msg {
        padding: 32px 8px;
        text-align: center;
        color: var(--secondary-text-color, #757575);
        font-size: 14px;
      }
      .msg.error { color: var(--error-color, #c62828); }

      .hc-toolbar {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 8px;
        flex-wrap: wrap;
      }
      .hc-toggle {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        cursor: pointer;
        user-select: none;
      }
      .hc-toggle input { width: 16px; height: 16px; cursor: pointer; }
      .hc-range {
        font-size: 12px;
        color: var(--secondary-text-color);
      }

      .hc-editor { display: flex; flex-direction: column; gap: 12px; }

      .hc-row {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 8px;
        border-radius: 10px;
        background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.03);
      }
      .hc-row-head {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .hc-day {
        flex: 1;
        font-weight: 600;
        font-size: 13px;
        color: var(--primary-text-color);
      }
      .hc-row-actions { display: flex; gap: 4px; }
      .ppd-btn.tiny {
        padding: 4px 8px;
        font-size: 12px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .ppd-btn.tiny ha-icon {
        --mdc-icon-size: 16px;
        display: flex;
        line-height: 0;
      }

      .hc-svg {
        width: 100%;
        height: 180px;
        display: block;
        touch-action: none;
        user-select: none;
        cursor: crosshair;
      }
      .hc-svg .hc-hit { cursor: grab; }
      .hc-svg .hc-hit:active { cursor: grabbing; }
      .hc-axis-label {
        font-size: 10px;
        fill: var(--secondary-text-color);
        font-family: var(--paper-font-body1_-_font-family, inherit);
      }
      .hc-label {
        font-size: 11px;
        fill: var(--primary-text-color);
        font-family: var(--paper-font-body1_-_font-family, inherit);
        font-weight: 600;
      }
      .hc-time-label {
        font-size: 9px;
        fill: var(--secondary-text-color);
        font-family: var(--paper-font-body1_-_font-family, inherit);
      }
      .hint {
        margin-top: 12px;
        font-size: 11px;
        color: var(--secondary-text-color);
        line-height: 1.4;
      }
    `,
  ];
}

// ----------------- Helpers -----------------

function _toMin(hms: string): number {
  if (!hms || typeof hms !== "string") return 0;
  const parts = hms.split(":");
  const h = parseInt(parts[0] ?? "0", 10);
  const m = parseInt(parts[1] ?? "0", 10);
  if (isNaN(h) || isNaN(m)) return 0;
  return h * 60 + m;
}

function _minToHms(total: number): string {
  const clamped = Math.max(0, Math.min(DAY_MINUTES, Math.round(total)));
  const h = Math.floor(clamped / 60);
  const m = clamped % 60;
  if (h === 24 && m === 0) return "24:00:00";
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`;
}

function round1(v: number): number {
  return Math.round(v * 10) / 10;
}

if (!customElements.get(DIALOG_TAG)) {
  customElements.define(DIALOG_TAG, PowerPilzHeatingCurveEditDialog);
}

export function openHeatingCurveEditDialog(opts: HeatingCurveEditDialogOptions): void {
  if (!opts.curveEntityId) return;
  const dlg = document.createElement(DIALOG_TAG) as PowerPilzHeatingCurveEditDialog;
  dlg.hass = opts.hass;
  dlg.curveEntityId = opts.curveEntityId;
  if (opts.title) dlg.dialogTitle = opts.title;
  document.body.appendChild(dlg);
}

declare global {
  interface HTMLElementTagNameMap {
    [DIALOG_TAG]: PowerPilzHeatingCurveEditDialog;
  }
}
