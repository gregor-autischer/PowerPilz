/**
 * Schedule edit dialog — PowerPilz's own weekly-plan editor.
 *
 * Primary UX:
 *   - 7 horizontal tracks (Mon–Sun) covering 24 hours.
 *   - Pointer-drag on empty track → paints a new block with 15-minute
 *     snapping, persisted on pointer-up.
 *   - Click on an existing block → opens a second modal for minute/
 *     second-precise time editing, a free-form `data` field and a
 *     Delete action.
 *
 * All changes are buffered on `this._blocks` until the user hits Save,
 * which calls the PowerPilz Companion `set_schedule_blocks` service.
 * Blocks are read straight from the companion select entity's
 * `week_blocks` attribute — no separate schedule helper is involved.
 */

import { css, html, nothing, type CSSResultGroup, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import type { HomeAssistant } from "../../types";
import { tr, haLang, weekdayShort } from "../../utils/i18n";
import { PowerPilzDialogBase } from "./dialog-shell";

interface ScheduleBlock {
  from: string; // "HH:MM:SS"
  to: string;   // "HH:MM:SS"
  data?: Record<string, unknown>;
}

type WeekBlocks = {
  monday: ScheduleBlock[];
  tuesday: ScheduleBlock[];
  wednesday: ScheduleBlock[];
  thursday: ScheduleBlock[];
  friday: ScheduleBlock[];
  saturday: ScheduleBlock[];
  sunday: ScheduleBlock[];
};

const DIALOG_TAG = "power-pilz-schedule-edit-dialog";

// Order mirrors JS Date.getDay() for convenient short-name lookups.
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
const MIN_BLOCK_MINUTES = 15;
const DAY_MINUTES = 24 * 60;

interface DragState {
  day: DayKey;
  trackEl: HTMLElement;
  pointerId: number;
  startMin: number;
  endMin: number;
}

/** State while dragging an existing block to a new position. */
interface MoveDragState {
  day: DayKey;
  index: number;
  trackEl: HTMLElement;
  pointerId: number;
  origFrom: number;     // minutes
  origTo: number;       // minutes
  anchorClientX: number;
  deltaMin: number;     // current snapped delta
  moved: boolean;
}

interface EditingState {
  day: DayKey;
  index: number;
  from: string; // "HH:MM:SS"
  to: string;   // "HH:MM:SS"
  dataText: string;
  dataError?: string;
  error?: string;
}

export interface ScheduleEditDialogOptions {
  hass: HomeAssistant;
  /** The PowerPilz Smart Schedule `select.*` entity id. Blocks are read
   *  from its `week_blocks` attribute and saved via the Companion
   *  integration's `set_schedule_blocks` service. */
  scheduleEntityId: string;
  title?: string;
}

function _emptyWeek(): WeekBlocks {
  return {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  };
}

class PowerPilzScheduleEditDialog extends PowerPilzDialogBase {
  @property({ attribute: false })
  public hass!: HomeAssistant;

  @property({ type: String })
  public scheduleEntityId = "";

  @state() private _blocks: WeekBlocks = _emptyWeek();
  /** Single "uniform" template used when same-for-all-days is enabled.
   *  Stored independently from `_blocks` so toggling the flag off
   *  restores the per-day data the user had before. */
  @state() private _uniformBlocks: ScheduleBlock[] = [];
  @state() private _sameForAll = false;
  @state() private _loading = true;
  @state() private _loadError?: string;
  @state() private _saving = false;
  @state() private _dirty = false;

  @state() private _drag?: DragState;
  @state() private _moveDrag?: MoveDragState;
  @state() private _editing?: EditingState;
  /** Live cursor position over a track, used to show the time hint
   *  while hovering. */
  @state() private _cursor?: { day: DayKey; min: number };

  connectedCallback(): void {
    super.connectedCallback();
    void this._loadSchedule();
  }

  protected _handleEscape(_event: KeyboardEvent): void {
    if (this._saving) return;
    if (this._editing) {
      this._cancelBlockEdit();
    } else {
      this.close();
    }
  }

  // ------------------------------------------------------------
  // Load + save
  // ------------------------------------------------------------

  private async _loadSchedule(): Promise<void> {
    const lang = haLang(this.hass);
    try {
      const state = this.hass?.states?.[this.scheduleEntityId];
      if (!state) {
        this._loadError = tr(lang, "schedule.edit_dialog.error_not_found", {
          entity: this.scheduleEntityId,
        });
        return;
      }
      const raw = state.attributes?.week_blocks;
      const loaded = _emptyWeek();
      if (raw && typeof raw === "object" && !Array.isArray(raw)) {
        for (const day of Object.keys(loaded) as (keyof WeekBlocks)[]) {
          const list = (raw as Record<string, unknown>)[day];
          if (Array.isArray(list)) {
            loaded[day] = list
              .filter((b) => b && typeof b === "object")
              .map((b) => {
                const blk = b as Record<string, unknown>;
                const out: ScheduleBlock = {
                  from: String(blk.from ?? "00:00:00"),
                  to: String(blk.to ?? "00:00:00"),
                };
                if (blk.data && typeof blk.data === "object" && !Array.isArray(blk.data)) {
                  out.data = blk.data as Record<string, unknown>;
                }
                return out;
              });
          }
        }
      }
      this._blocks = loaded;
    } catch (err) {
      this._loadError = String((err as Error)?.message || err);
    } finally {
      this._loading = false;
    }
  }

  private _handleSave = async (): Promise<void> => {
    if (this._saving || !this.hass) return;
    this._saving = true;
    this.lockClose = true;
    try {
      // When same-for-all-days is enabled, flatten the uniform template
      // onto every day in the saved payload. The per-day `_blocks` state
      // is left untouched so the user can toggle back and see the old
      // per-day plan reappear without losing data.
      const payload = this._sameForAll
        ? {
            monday: this._uniformBlocks,
            tuesday: this._uniformBlocks,
            wednesday: this._uniformBlocks,
            thursday: this._uniformBlocks,
            friday: this._uniformBlocks,
            saturday: this._uniformBlocks,
            sunday: this._uniformBlocks,
          }
        : this._blocks;
      await this.hass.callService(
        "powerpilz_companion",
        "set_schedule_blocks",
        {
          entity_id: this.scheduleEntityId,
          blocks: payload,
        },
      );
      this._dirty = false;
      this.close();
    } catch (err) {
      this._saving = false;
      this.lockClose = false;
      this._loadError = String((err as Error)?.message || err);
    }
  };

  // ------------------------------------------------------------
  // Block list helpers
  // ------------------------------------------------------------

  /** Returns the blocks for the given day, transparently routing to
   *  `_uniformBlocks` when same-for-all-days is enabled. */
  private _blocksForDay(key: DayKey): ScheduleBlock[] {
    if (this._sameForAll) return [...this._uniformBlocks];
    const blocks = this._blocks[key];
    return Array.isArray(blocks) ? [...blocks] : [];
  }

  private _setBlocksForDay(key: DayKey, blocks: ScheduleBlock[]): void {
    const cleaned = _sortAndMerge(blocks);
    if (this._sameForAll) {
      this._uniformBlocks = cleaned;
    } else {
      this._blocks = { ...this._blocks, [key]: cleaned };
    }
    this._dirty = true;
  }

  private _toggleSameForAll = (): void => {
    const next = !this._sameForAll;
    if (next) {
      // Switching ON: seed the uniform template. Prefer the first day
      // that already has blocks (Mon → Sun); fall back to empty so the
      // user starts with a clean slate they can build out.
      const seed = WEEK
        .map((w) => this._blocks[w.key])
        .find((b) => Array.isArray(b) && b.length > 0);
      this._uniformBlocks = seed ? [...seed] : [];
    }
    // Switching OFF: leave `_blocks` untouched — the original per-day
    // plan reappears unchanged. `_uniformBlocks` stays around in case
    // the user toggles back on.
    this._sameForAll = next;
    this._dirty = true;
  };

  // ------------------------------------------------------------
  // Pointer interaction — paint new blocks, move existing blocks,
  // and track cursor position for the live time hint.
  // ------------------------------------------------------------

  private _pxToMin(trackEl: HTMLElement, clientX: number): number {
    const rect = trackEl.getBoundingClientRect();
    const pct = (clientX - rect.left) / rect.width;
    const raw = Math.max(0, Math.min(DAY_MINUTES, Math.round(pct * DAY_MINUTES)));
    return Math.round(raw / SNAP_MINUTES) * SNAP_MINUTES;
  }

  private _handleTrackPointerDown = (event: PointerEvent): void => {
    if (event.button !== 0) return;
    if (this._loading || this._loadError) return;
    // Block-clicks are handled by their own pointerdown handler.
    if ((event.target as HTMLElement).closest(".pp-block")) return;

    const trackEl = event.currentTarget as HTMLElement;
    const day = trackEl.dataset.day as DayKey | undefined;
    if (!day) return;

    event.preventDefault();
    try { trackEl.setPointerCapture(event.pointerId); } catch { /* ignore */ }

    const anchor = this._pxToMin(trackEl, event.clientX);
    this._drag = {
      day,
      trackEl,
      pointerId: event.pointerId,
      startMin: anchor,
      endMin: anchor,
    };
  };

  private _handleTrackPointerMove = (event: PointerEvent): void => {
    const trackEl = event.currentTarget as HTMLElement;
    const day = trackEl.dataset.day as DayKey | undefined;

    if (this._moveDrag && event.pointerId === this._moveDrag.pointerId) {
      // Compute delta against the original drag-start pointer x.
      const rect = trackEl.getBoundingClientRect();
      const dxPx = event.clientX - this._moveDrag.anchorClientX;
      const dxMinRaw = (dxPx / rect.width) * DAY_MINUTES;
      let delta = Math.round(dxMinRaw / SNAP_MINUTES) * SNAP_MINUTES;
      // Clamp so the moved block can't slide past the day boundaries.
      const minDelta = -this._moveDrag.origFrom;
      const maxDelta = DAY_MINUTES - this._moveDrag.origTo;
      if (delta < minDelta) delta = minDelta;
      if (delta > maxDelta) delta = maxDelta;
      if (delta !== this._moveDrag.deltaMin) {
        this._moveDrag = {
          ...this._moveDrag,
          deltaMin: delta,
          moved: this._moveDrag.moved || delta !== 0,
        };
      }
      return;
    }

    if (this._drag && event.pointerId === this._drag.pointerId) {
      const endMin = this._pxToMin(this._drag.trackEl, event.clientX);
      if (endMin !== this._drag.endMin) {
        this._drag = { ...this._drag, endMin };
      }
      return;
    }

    // Hover hint: update the cursor time chip while no drag is active.
    if (day) {
      const min = this._pxToMin(trackEl, event.clientX);
      if (!this._cursor || this._cursor.day !== day || this._cursor.min !== min) {
        this._cursor = { day, min };
      }
    }
  };

  private _handleTrackPointerLeave = (_event: PointerEvent): void => {
    if (this._moveDrag || this._drag) return;
    this._cursor = undefined;
  };

  private _handleTrackPointerUp = (event: PointerEvent): void => {
    // Move-existing path takes priority over paint-new.
    if (this._moveDrag && event.pointerId === this._moveDrag.pointerId) {
      this._finishMoveDrag();
      return;
    }
    if (!this._drag) return;
    if (event.pointerId !== this._drag.pointerId) return;
    const drag = this._drag;
    this._drag = undefined;

    try { drag.trackEl.releasePointerCapture(drag.pointerId); } catch { /* ignore */ }

    const a = Math.min(drag.startMin, drag.endMin);
    const b = Math.max(drag.startMin, drag.endMin);
    if (b - a < MIN_BLOCK_MINUTES) return;

    const existing = this._blocksForDay(drag.day);
    const overlap = existing.some((blk) =>
      _rangesOverlap(_toMin(blk.from), _toMin(blk.to), a, b)
    );
    if (overlap) return;

    existing.push({ from: _minToHms(a), to: _minToHms(b) });
    this._setBlocksForDay(drag.day, existing);
  };

  // ------------------------------------------------------------
  // Drag-to-move existing block
  // ------------------------------------------------------------

  private _handleBlockPointerDown = (event: PointerEvent): void => {
    if (event.button !== 0) return;
    if (this._loading || this._loadError) return;
    const el = event.currentTarget as HTMLElement;
    const day = el.dataset.day as DayKey | undefined;
    const idx = parseInt(el.dataset.index ?? "-1", 10);
    if (!day || idx < 0) return;
    const trackEl = el.parentElement as HTMLElement | null;
    if (!trackEl) return;

    const blocks = this._blocksForDay(day);
    const block = blocks[idx];
    if (!block) return;

    event.preventDefault();
    event.stopPropagation();
    try { trackEl.setPointerCapture(event.pointerId); } catch { /* ignore */ }

    this._moveDrag = {
      day,
      index: idx,
      trackEl,
      pointerId: event.pointerId,
      origFrom: _toMin(block.from),
      origTo: _toMin(block.to),
      anchorClientX: event.clientX,
      deltaMin: 0,
      moved: false,
    };
  };

  private _finishMoveDrag(): void {
    const drag = this._moveDrag;
    if (!drag) return;
    this._moveDrag = undefined;
    try { drag.trackEl.releasePointerCapture(drag.pointerId); } catch { /* ignore */ }

    // Not moved meaningfully → treat as a click and open the edit modal.
    if (!drag.moved || drag.deltaMin === 0) {
      const blocks = this._blocksForDay(drag.day);
      const block = blocks[drag.index];
      if (!block) return;
      this._editing = {
        day: drag.day,
        index: drag.index,
        from: _normaliseHms(block.from),
        to: _normaliseHms(block.to),
        dataText: block.data ? JSON.stringify(block.data, null, 2) : "",
      };
      return;
    }

    // Compute the new position and apply collision + adjacency-merge.
    const newFrom = drag.origFrom + drag.deltaMin;
    const newTo = drag.origTo + drag.deltaMin;
    const blocks = this._blocksForDay(drag.day);
    const moved = blocks[drag.index];
    if (!moved) return;

    // Reject if the new range overlaps a different block (touching is OK
    // — _sortAndMerge will fuse them).
    const overlaps = blocks.some((b, i) => {
      if (i === drag.index) return false;
      return _rangesOverlap(_toMin(b.from), _toMin(b.to), newFrom, newTo);
    });
    if (overlaps) return; // discard move; old position stays

    const updated: ScheduleBlock = {
      from: _minToHms(newFrom),
      to: _minToHms(newTo),
    };
    if (moved.data) updated.data = moved.data;
    blocks[drag.index] = updated;
    this._setBlocksForDay(drag.day, blocks);
  }

  private _handleTrackPointerCancel = (event: PointerEvent): void => {
    if (!this._drag) return;
    if (event.pointerId !== this._drag.pointerId) return;
    try { this._drag.trackEl.releasePointerCapture(this._drag.pointerId); } catch { /* ignore */ }
    this._drag = undefined;
  };

  // ------------------------------------------------------------
  // Block-edit modal
  // ------------------------------------------------------------

  // Opening the edit modal is handled by `_finishMoveDrag` when the
  // pointer-down on a block doesn't turn into an actual drag.

  private _updateEditingField(field: "from" | "to" | "dataText", value: string): void {
    if (!this._editing) return;
    this._editing = { ...this._editing, [field]: value, error: undefined, dataError: undefined };
  }

  private _handleEditFromChange = (e: Event): void => {
    this._updateEditingField("from", _withSeconds((e.target as HTMLInputElement).value));
  };

  private _handleEditToChange = (e: Event): void => {
    this._updateEditingField("to", _withSeconds((e.target as HTMLInputElement).value));
  };

  private _handleEditDataChange = (e: Event): void => {
    this._updateEditingField("dataText", (e.target as HTMLTextAreaElement).value);
  };

  private _saveBlockEdit(): void {
    if (!this._editing) return;
    const lang = haLang(this.hass);
    const { day, index, from, to, dataText } = this._editing;

    const fromMin = _toMin(from);
    const toMin = _toMin(to);
    if (isNaN(fromMin) || isNaN(toMin)) {
      this._editing = { ...this._editing, error: tr(lang, "schedule.edit_dialog.err_time") };
      return;
    }
    if (toMin <= fromMin) {
      this._editing = { ...this._editing, error: tr(lang, "schedule.edit_dialog.err_order") };
      return;
    }

    let data: Record<string, unknown> | undefined;
    const trimmed = dataText.trim();
    if (trimmed) {
      try {
        const parsed = JSON.parse(trimmed);
        if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
          throw new Error("not an object");
        }
        data = parsed as Record<string, unknown>;
      } catch {
        this._editing = {
          ...this._editing,
          dataError: tr(lang, "schedule.edit_dialog.err_data"),
        };
        return;
      }
    }

    const blocks = this._blocksForDay(day);
    const overlap = blocks.some((b, i) =>
      i !== index && _rangesOverlap(_toMin(b.from), _toMin(b.to), fromMin, toMin)
    );
    if (overlap) {
      this._editing = { ...this._editing, error: tr(lang, "schedule.edit_dialog.err_overlap") };
      return;
    }

    const updated: ScheduleBlock = {
      from: _minToHms(fromMin, from),
      to: _minToHms(toMin, to),
    };
    if (data) updated.data = data;
    blocks[index] = updated;
    this._setBlocksForDay(day, blocks);
    this._editing = undefined;
  }

  private _deleteEditingBlock(): void {
    if (!this._editing) return;
    const { day, index } = this._editing;
    const blocks = this._blocksForDay(day).filter((_, i) => i !== index);
    this._setBlocksForDay(day, blocks);
    this._editing = undefined;
  }

  private _cancelBlockEdit(): void {
    this._editing = undefined;
  }

  // ------------------------------------------------------------
  // Title resolution
  // ------------------------------------------------------------

  private _resolveTitle(): string {
    if (this.dialogTitle) return this.dialogTitle;
    const lang = haLang(this.hass);
    return (
      this.hass?.states?.[this.scheduleEntityId]?.attributes?.friendly_name as string | undefined
      ?? tr(lang, "schedule.edit_dialog.default_title")
    );
  }

  protected willUpdate(): void {
    // Keep the title attribute in sync so the shell can render it.
    const resolved = this._resolveTitle();
    if (this.dialogTitle !== resolved && !this.dialogTitle) {
      this.dialogTitle = resolved;
    }
  }

  // ------------------------------------------------------------
  // Render hooks (consumed by PowerPilzDialogBase)
  // ------------------------------------------------------------

  protected renderBody(): TemplateResult {
    const lang = haLang(this.hass);
    if (this._loading) {
      return html`<div class="msg">${tr(lang, "common.loading") || "Loading…"}</div>`;
    }
    if (this._loadError) {
      return html`<div class="msg error">${this._loadError}</div>`;
    }

    // In same-for-all mode, render a single "All days" row that edits
    // the shared `_uniformBlocks` template. The per-day `_blocks` are
    // preserved so toggling back restores the original plan.
    const rows = this._sameForAll
      ? [{ key: "monday" as DayKey, label: tr(lang, "schedule.edit_dialog.all_days") }]
      : WEEK.map((w) => ({ key: w.key, label: weekdayShort(lang, w.dayIndex) }));

    return html`
      <div class="editor">
        <div class="pp-toolbar">
          <label class="pp-toggle">
            <input
              type="checkbox"
              .checked=${this._sameForAll}
              @change=${this._toggleSameForAll}
            />
            <span>${tr(lang, "schedule.edit_dialog.same_for_all")}</span>
          </label>
        </div>
        <div class="hour-header">
          <div class="day-col"></div>
          <div class="hour-labels">
            ${[0, 6, 12, 18, 24].map(
              (h) => html`<span style=${styleMap({ left: `${(h / 24) * 100}%` })}>${String(h).padStart(2, "0")}</span>`
            )}
          </div>
        </div>
        ${rows.map((row) => this._renderDayRow(row.key, row.label))}
        <div class="hint">${tr(lang, "schedule.edit_dialog.hint_v3")}</div>
      </div>
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
        ${this._saving
          ? tr(lang, "common.saving") || "Saving…"
          : tr(lang, "common.save") || "Save"}
      </button>
    `;
  }

  protected renderInner(): TemplateResult | typeof nothing {
    if (!this._editing) return nothing;
    const lang = haLang(this.hass);
    const edit = this._editing;
    const dayLabel = weekdayShort(
      lang,
      WEEK.find((w) => w.key === edit.day)?.dayIndex ?? 0
    );
    return html`
      <div class="inner-backdrop" @click=${this._cancelBlockEdit}>
        <div class="inner-dialog" @click=${(e: MouseEvent) => e.stopPropagation()}>
          <header>
            <h3>
              ${tr(lang, "schedule.edit_dialog.block_title", { day: dayLabel })}
            </h3>
            <button class="close-x" @click=${this._cancelBlockEdit} aria-label="Close">
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </header>
          <div class="inner-body">
            <label class="field">
              <span>${tr(lang, "schedule.edit_dialog.from")}</span>
              <input
                type="time"
                .value=${edit.from.slice(0, 5)}
                @change=${this._handleEditFromChange}
              />
            </label>
            <label class="field">
              <span>${tr(lang, "schedule.edit_dialog.to")}</span>
              <input
                type="time"
                .value=${edit.to.slice(0, 5)}
                @change=${this._handleEditToChange}
              />
            </label>
            <label class="field">
              <span>
                ${tr(lang, "schedule.edit_dialog.data")}
                <small>${tr(lang, "schedule.edit_dialog.data_help")}</small>
              </span>
              <textarea
                rows="4"
                spellcheck="false"
                placeholder='{"mode": "heat"}'
                .value=${edit.dataText}
                @input=${this._handleEditDataChange}
              ></textarea>
              ${edit.dataError
                ? html`<span class="err">${edit.dataError}</span>`
                : nothing}
            </label>
            ${edit.error ? html`<div class="err">${edit.error}</div>` : nothing}
          </div>
          <footer>
            <button class="ppd-btn danger" @click=${this._deleteEditingBlock}>
              ${tr(lang, "schedule.edit_dialog.delete")}
            </button>
            <div class="spacer"></div>
            <button class="ppd-btn flat" @click=${this._cancelBlockEdit}>
              ${tr(lang, "common.cancel")}
            </button>
            <button class="ppd-btn primary" @click=${() => this._saveBlockEdit()}>
              ${tr(lang, "common.save")}
            </button>
          </footer>
        </div>
      </div>
    `;
  }

  private _renderDayRow(key: DayKey, label: string): TemplateResult {
    const blocks = this._blocksForDay(key);

    // Ghost block during paint-new drag.
    let ghost: TemplateResult | typeof nothing = nothing;
    if (this._drag?.day === key) {
      const a = Math.min(this._drag.startMin, this._drag.endMin);
      const b = Math.max(this._drag.startMin, this._drag.endMin);
      if (b > a) {
        const left = (a / DAY_MINUTES) * 100;
        const width = ((b - a) / DAY_MINUTES) * 100;
        ghost = html`
          <div
            class="pp-block ghost"
            style=${styleMap({ left: `${left}%`, width: `${width}%` })}
          >
            <span class="pp-block-label">
              ${_minToHm(a)}–${_minToHm(b)}
            </span>
          </div>
        `;
      }
    }

    // Live cursor-time chip while pointer is over this track and we're
    // not in the middle of a drag.
    let cursorChip: TemplateResult | typeof nothing = nothing;
    if (this._cursor?.day === key && !this._drag && !this._moveDrag) {
      const left = (this._cursor.min / DAY_MINUTES) * 100;
      cursorChip = html`
        <div class="pp-cursor-chip" style=${styleMap({ left: `${left}%` })}>
          ${_minToHm(this._cursor.min)}
        </div>
      `;
    }

    return html`
      <div class="day-row">
        <div class="day-col">${label}</div>
        <div
          class="day-track"
          data-day=${key}
          @pointerdown=${this._handleTrackPointerDown}
          @pointermove=${this._handleTrackPointerMove}
          @pointerup=${this._handleTrackPointerUp}
          @pointercancel=${this._handleTrackPointerCancel}
          @pointerleave=${this._handleTrackPointerLeave}
        >
          ${blocks.map((b, idx) => {
            // While this block is being dragged-to-move, render it at
            // its temporary position. The actual storage isn't mutated
            // until pointerup.
            const isMoving = this._moveDrag?.day === key && this._moveDrag.index === idx;
            const baseFrom = _toMin(b.from);
            const baseTo = _toMin(b.to);
            const start = isMoving ? baseFrom + (this._moveDrag?.deltaMin ?? 0) : baseFrom;
            const end = isMoving ? baseTo + (this._moveDrag?.deltaMin ?? 0) : baseTo;
            const left = (start / DAY_MINUTES) * 100;
            const width = ((end - start) / DAY_MINUTES) * 100;
            const fromLabel = isMoving ? _minToHm(start) : b.from.slice(0, 5);
            const toLabel = isMoving ? _minToHm(end) : b.to.slice(0, 5);
            return html`
              <div
                class="pp-block ${isMoving ? "moving" : ""}"
                data-day=${key}
                data-index=${idx}
                style=${styleMap({ left: `${left}%`, width: `${width}%` })}
                @pointerdown=${this._handleBlockPointerDown}
                title="${fromLabel}–${toLabel}"
              >
                <span class="pp-block-label">${fromLabel}–${toLabel}</span>
              </div>
            `;
          })}
          ${ghost}
          ${cursorChip}
        </div>
      </div>
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

      /* ----- Weekly editor ----- */
      .editor { display: flex; flex-direction: column; gap: 6px; }
      .hour-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-left: 2px;
        font-size: 10px;
        color: var(--secondary-text-color, #757575);
      }
      .day-col {
        flex: none;
        width: 44px;
        font-size: 12px;
        font-weight: 600;
        color: var(--primary-text-color);
        text-align: left;
      }
      .hour-labels {
        position: relative;
        flex: 1;
        height: 14px;
      }
      .hour-labels span { position: absolute; transform: translateX(-50%); }
      .hour-labels span:first-child { transform: translateX(0); }
      .hour-labels span:last-child { transform: translateX(-100%); }
      .day-row {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .day-track {
        position: relative;
        flex: 1;
        height: 38px;
        border-radius: 8px;
        background:
          linear-gradient(to right,
            transparent 0%, transparent calc(25% - 1px),
            rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08) calc(25% - 1px),
            rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08) 25%,
            transparent 25%, transparent calc(50% - 1px),
            rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08) calc(50% - 1px),
            rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08) 50%,
            transparent 50%, transparent calc(75% - 1px),
            rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08) calc(75% - 1px),
            rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08) 75%,
            transparent 75%),
          rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.04);
        cursor: crosshair;
        /* overflow visible so the cursor-time chip can render above
         * the track. Block/ghost positions are clamped to 0..100% so
         * nothing else leaks out. */
        overflow: visible;
        user-select: none;
        touch-action: none;
      }
      .pp-block {
        position: absolute;
        top: 3px; bottom: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: color-mix(in srgb, var(--primary-color, #03a9f4) 40%, transparent);
        border-radius: 6px;
        cursor: pointer;
        overflow: hidden;
        transition: background 0.15s ease;
      }
      .pp-block:hover {
        background: color-mix(in srgb, var(--primary-color, #03a9f4) 60%, transparent);
      }
      .pp-block.ghost {
        background: color-mix(in srgb, var(--primary-color, #03a9f4) 25%, transparent);
        border: 1px dashed color-mix(in srgb, var(--primary-color, #03a9f4) 80%, transparent);
        pointer-events: none;
      }
      .pp-block-label {
        font-size: 10px;
        font-weight: 500;
        color: var(--primary-text-color);
        white-space: nowrap;
        padding: 0 6px;
        pointer-events: none;
      }
      .pp-block.moving {
        opacity: 0.85;
        cursor: grabbing;
      }

      /* ----- Toolbar (same-for-all toggle) ----- */
      .pp-toolbar {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 0 2px 8px;
      }
      .pp-toggle {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: var(--primary-text-color);
        cursor: pointer;
        user-select: none;
      }
      .pp-toggle input {
        accent-color: var(--primary-color, #03a9f4);
        cursor: pointer;
      }

      /* ----- Cursor time hint while hovering a track ----- */
      .pp-cursor-chip {
        position: absolute;
        top: -22px;
        transform: translateX(-50%);
        background: var(--primary-text-color);
        color: var(--card-background-color, #fff);
        font-size: 10px;
        font-weight: 600;
        padding: 2px 6px;
        border-radius: 4px;
        pointer-events: none;
        white-space: nowrap;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18);
        z-index: 5;
      }
      .pp-cursor-chip::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 3px solid transparent;
        border-top-color: var(--primary-text-color);
      }

      .hint {
        margin-top: 10px;
        font-size: 11px;
        color: var(--secondary-text-color, #757575);
        line-height: 1.4;
      }

      /* ----- Inner (block edit) modal ----- */
      .inner-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        animation: ppd-fade-in 0.14s ease;
        z-index: 10;
      }
      .inner-dialog {
        background: var(--card-background-color, var(--primary-background-color, #fff));
        border-radius: 14px;
        width: min(100%, 420px);
        max-height: calc(100vh - 120px);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        animation: ppd-pop-in 0.18s cubic-bezier(0.2, 0.9, 0.3, 1.1);
      }
      .inner-dialog header {
        padding: 14px 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
      }
      .inner-dialog header h3 {
        margin: 0;
        flex: 1;
        font-size: 16px;
        font-weight: 600;
      }
      .inner-dialog .close-x {
        border: none;
        background: transparent;
        cursor: pointer;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        color: var(--secondary-text-color);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .inner-dialog footer {
        padding: 12px 16px;
        display: flex;
        gap: 8px;
        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
      }
      .inner-body {
        padding: 14px 20px;
        overflow-y: auto;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .field {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 13px;
        color: var(--primary-text-color);
      }
      .field > span { font-weight: 500; }
      .field small {
        font-weight: 400;
        color: var(--secondary-text-color);
        margin-left: 6px;
      }
      .field input[type="time"],
      .field textarea {
        font: inherit;
        font-size: 14px;
        padding: 8px 10px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        background: var(--secondary-background-color, #fafafa);
        color: var(--primary-text-color);
      }
      .field textarea {
        resize: vertical;
        min-height: 80px;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 12px;
      }
      .err {
        color: var(--error-color, #c62828);
        font-size: 12px;
      }
      .spacer { flex: 1; }

      @media (max-width: 700px) {
        .day-col { width: 36px; font-size: 11px; }
        .day-track { height: 34px; }
      }
    `,
  ];
}

// ---------- Pure helpers ----------

function _toMin(hms: string): number {
  if (!hms || typeof hms !== "string") return 0;
  const parts = hms.split(":");
  const h = parseInt(parts[0] ?? "0", 10);
  const m = parseInt(parts[1] ?? "0", 10);
  const s = parseInt(parts[2] ?? "0", 10);
  if (isNaN(h) || isNaN(m)) return 0;
  return h * 60 + m + (isNaN(s) ? 0 : s / 60);
}

function _minToHms(total: number, keepSecondsFrom?: string): string {
  const clamped = Math.max(0, Math.min(DAY_MINUTES, total));
  const h = Math.floor(clamped / 60);
  const m = Math.floor(clamped % 60);
  let s = 0;
  if (keepSecondsFrom) {
    const parts = keepSecondsFrom.split(":");
    const ss = parseInt(parts[2] ?? "0", 10);
    if (!isNaN(ss)) s = ss;
  }
  if (h === 24 && m === 0 && s === 0) return "24:00:00";
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function _minToHm(total: number): string {
  const clamped = Math.max(0, Math.min(DAY_MINUTES, total));
  const h = Math.floor(clamped / 60);
  const m = clamped % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function _normaliseHms(value: string): string {
  if (!value) return "00:00:00";
  const parts = value.split(":");
  const h = (parts[0] ?? "00").padStart(2, "0");
  const m = (parts[1] ?? "00").padStart(2, "0");
  const s = (parts[2] ?? "00").padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function _withSeconds(value: string): string {
  return _normaliseHms(value);
}

function _rangesOverlap(a1: number, a2: number, b1: number, b2: number): boolean {
  return a1 < b2 && b1 < a2;
}

function _sortAndMerge(blocks: ScheduleBlock[]): ScheduleBlock[] {
  const norm = blocks
    .map((b) => ({
      from: b.from,
      to: b.to,
      data: b.data,
      s: _toMin(b.from),
      e: _toMin(b.to),
    }))
    .filter((b) => b.e > b.s)
    .sort((a, b) => a.s - b.s);
  const out: ScheduleBlock[] = [];
  for (const block of norm) {
    const last = out[out.length - 1];
    const hasData = !!block.data || !!last?.data;
    if (last && !hasData && _toMin(last.to) >= block.s) {
      if (_toMin(last.to) < block.e) last.to = block.to;
    } else {
      out.push({
        from: block.from,
        to: block.to,
        ...(block.data ? { data: block.data } : {}),
      });
    }
  }
  return out;
}

if (!customElements.get(DIALOG_TAG)) {
  customElements.define(DIALOG_TAG, PowerPilzScheduleEditDialog);
}

export function openScheduleEditDialog(opts: ScheduleEditDialogOptions): void {
  if (!opts.scheduleEntityId) return;
  const dlg = document.createElement(DIALOG_TAG) as PowerPilzScheduleEditDialog;
  dlg.hass = opts.hass;
  dlg.scheduleEntityId = opts.scheduleEntityId;
  if (opts.title) dlg.dialogTitle = opts.title;
  document.body.appendChild(dlg);
}

declare global {
  interface HTMLElementTagNameMap {
    [DIALOG_TAG]: PowerPilzScheduleEditDialog;
  }
}
