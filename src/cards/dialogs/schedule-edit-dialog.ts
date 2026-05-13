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

interface ScheduleEvent {
  time: string; // "HH:MM:SS"
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

type WeekEvents = {
  monday: ScheduleEvent[];
  tuesday: ScheduleEvent[];
  wednesday: ScheduleEvent[];
  thursday: ScheduleEvent[];
  friday: ScheduleEvent[];
  saturday: ScheduleEvent[];
  sunday: ScheduleEvent[];
};

type ScheduleKind = "blocks" | "events";

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

interface EventDragState {
  day: DayKey;
  index: number;
  trackEl: HTMLElement;
  pointerId: number;
  startMin: number;       // initial position when drag started
  currentMin: number;     // current position
  moved: boolean;         // whether the pointer actually moved
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

interface EditingEventState {
  day: DayKey;
  index: number;
  time: string; // "HH:MM:SS"
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

function _emptyWeekEvents(): WeekEvents {
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
  @state() private _events: WeekEvents = _emptyWeekEvents();
  @state() private _kind: ScheduleKind = "blocks";
  @state() private _loading = true;
  @state() private _loadError?: string;
  @state() private _saving = false;
  @state() private _dirty = false;

  @state() private _drag?: DragState;
  @state() private _eventDrag?: EventDragState;
  @state() private _editing?: EditingState;
  @state() private _editingEvent?: EditingEventState;

  connectedCallback(): void {
    super.connectedCallback();
    void this._loadSchedule();
  }

  protected _handleEscape(_event: KeyboardEvent): void {
    if (this._saving) return;
    if (this._editingEvent) {
      this._cancelEventEdit();
    } else if (this._editing) {
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
      this._kind = state.attributes?.schedule_kind === "events" ? "events" : "blocks";

      // Blocks
      const rawBlocks = state.attributes?.week_blocks;
      const loaded = _emptyWeek();
      if (rawBlocks && typeof rawBlocks === "object" && !Array.isArray(rawBlocks)) {
        for (const day of Object.keys(loaded) as (keyof WeekBlocks)[]) {
          const list = (rawBlocks as Record<string, unknown>)[day];
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

      // Events
      const rawEvents = state.attributes?.week_events;
      const loadedEvents = _emptyWeekEvents();
      if (rawEvents && typeof rawEvents === "object" && !Array.isArray(rawEvents)) {
        for (const day of Object.keys(loadedEvents) as (keyof WeekEvents)[]) {
          const list = (rawEvents as Record<string, unknown>)[day];
          if (Array.isArray(list)) {
            loadedEvents[day] = list
              .filter((e) => e && typeof e === "object")
              .map((e) => {
                const ev = e as Record<string, unknown>;
                const out: ScheduleEvent = {
                  time: String(ev.time ?? "00:00:00"),
                };
                if (ev.data && typeof ev.data === "object" && !Array.isArray(ev.data)) {
                  out.data = ev.data as Record<string, unknown>;
                }
                return out;
              });
          }
        }
      }
      this._events = loadedEvents;
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
      if (this._kind === "events") {
        await this.hass.callService(
          "powerpilz_companion",
          "set_schedule_events",
          {
            entity_id: this.scheduleEntityId,
            events: this._events,
          },
        );
      } else {
        await this.hass.callService(
          "powerpilz_companion",
          "set_schedule_blocks",
          {
            entity_id: this.scheduleEntityId,
            blocks: this._blocks,
          },
        );
      }
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

  private _blocksForDay(key: DayKey): ScheduleBlock[] {
    const blocks = this._blocks[key];
    return Array.isArray(blocks) ? [...blocks] : [];
  }

  private _setBlocksForDay(key: DayKey, blocks: ScheduleBlock[]): void {
    const cleaned = _sortAndMerge(blocks);
    this._blocks = { ...this._blocks, [key]: cleaned };
    this._dirty = true;
  }

  private _eventsForDay(key: DayKey): ScheduleEvent[] {
    const events = this._events[key];
    return Array.isArray(events) ? [...events] : [];
  }

  private _setEventsForDay(key: DayKey, events: ScheduleEvent[]): void {
    const cleaned = _sortEvents(events);
    this._events = { ...this._events, [key]: cleaned };
    this._dirty = true;
  }

  // ------------------------------------------------------------
  // Drag-to-create interaction
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
    if ((event.target as HTMLElement).closest(".pp-block, .pp-pin")) return;

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
    if (!this._drag) return;
    if (event.pointerId !== this._drag.pointerId) return;
    const endMin = this._pxToMin(this._drag.trackEl, event.clientX);
    if (endMin !== this._drag.endMin) {
      this._drag = { ...this._drag, endMin };
    }
  };

  private _handleTrackPointerUp = (event: PointerEvent): void => {
    if (!this._drag) return;
    if (event.pointerId !== this._drag.pointerId) return;
    const drag = this._drag;
    this._drag = undefined;

    try { drag.trackEl.releasePointerCapture(drag.pointerId); } catch { /* ignore */ }

    if (this._kind === "events") {
      // Tap-to-insert: only fire if pointer didn't move beyond one snap step.
      if (Math.abs(drag.endMin - drag.startMin) > SNAP_MINUTES) return;
      const at = drag.startMin;
      const existing = this._eventsForDay(drag.day);
      if (existing.some((ev) => _toMin(ev.time) === at)) return;
      existing.push({ time: _minToHms(at) });
      this._setEventsForDay(drag.day, existing);
      return;
    }

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

  private _handleTrackPointerCancel = (event: PointerEvent): void => {
    if (!this._drag) return;
    if (event.pointerId !== this._drag.pointerId) return;
    try { this._drag.trackEl.releasePointerCapture(this._drag.pointerId); } catch { /* ignore */ }
    this._drag = undefined;
  };

  // -------- Event-pin drag handlers (events mode) --------

  private _handlePinPointerDown = (event: PointerEvent): void => {
    if (event.button !== 0) return;
    if (this._loading || this._loadError) return;
    const el = event.currentTarget as HTMLElement;
    const day = el.dataset.day as DayKey | undefined;
    const idx = parseInt(el.dataset.index ?? "-1", 10);
    if (!day || idx < 0) return;

    event.preventDefault();
    event.stopPropagation();
    const trackEl = el.parentElement as HTMLElement | null;
    if (!trackEl) return;
    try { trackEl.setPointerCapture(event.pointerId); } catch { /* ignore */ }

    const events = this._eventsForDay(day);
    const ev = events[idx];
    if (!ev) return;
    const startMin = _toMin(ev.time);
    this._eventDrag = {
      day,
      index: idx,
      trackEl,
      pointerId: event.pointerId,
      startMin,
      currentMin: startMin,
      moved: false,
    };
  };

  private _handlePinPointerMove = (event: PointerEvent): void => {
    if (!this._eventDrag) return;
    if (event.pointerId !== this._eventDrag.pointerId) return;
    const min = this._pxToMin(this._eventDrag.trackEl, event.clientX);
    if (min !== this._eventDrag.currentMin) {
      this._eventDrag = { ...this._eventDrag, currentMin: min, moved: true };
    }
  };

  private _handlePinPointerUp = (event: PointerEvent): void => {
    if (!this._eventDrag) return;
    if (event.pointerId !== this._eventDrag.pointerId) return;
    const drag = this._eventDrag;
    this._eventDrag = undefined;
    try { drag.trackEl.releasePointerCapture(drag.pointerId); } catch { /* ignore */ }

    if (!drag.moved) {
      // Treat as click → open edit modal.
      const events = this._eventsForDay(drag.day);
      const ev = events[drag.index];
      if (!ev) return;
      this._editingEvent = {
        day: drag.day,
        index: drag.index,
        time: _normaliseHms(ev.time),
        dataText: ev.data ? JSON.stringify(ev.data, null, 2) : "",
      };
      return;
    }

    // Persist the moved pin (with merge-by-time collision check).
    const events = this._eventsForDay(drag.day);
    const collision = events.some(
      (ev, i) => i !== drag.index && _toMin(ev.time) === drag.currentMin
    );
    if (collision) return;
    const moved = { ...events[drag.index], time: _minToHms(drag.currentMin) };
    events[drag.index] = moved;
    this._setEventsForDay(drag.day, events);
  };

  private _handlePinDoubleClick = (event: MouseEvent): void => {
    event.stopPropagation();
    const el = event.currentTarget as HTMLElement;
    const day = el.dataset.day as DayKey | undefined;
    const idx = parseInt(el.dataset.index ?? "-1", 10);
    if (!day || idx < 0) return;
    const events = this._eventsForDay(day).filter((_, i) => i !== idx);
    this._setEventsForDay(day, events);
  };

  // ------------------------------------------------------------
  // Block-edit modal
  // ------------------------------------------------------------

  private _handleBlockClick = (event: MouseEvent): void => {
    event.stopPropagation();
    const el = event.currentTarget as HTMLElement;
    const day = el.dataset.day as DayKey | undefined;
    const idx = parseInt(el.dataset.index ?? "-1", 10);
    if (!day || idx < 0) return;
    const blocks = this._blocksForDay(day);
    const block = blocks[idx];
    if (!block) return;

    this._editing = {
      day,
      index: idx,
      from: _normaliseHms(block.from),
      to: _normaliseHms(block.to),
      dataText: block.data
        ? JSON.stringify(block.data, null, 2)
        : "",
    };
  };

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

  // -------- Event-edit modal (events mode) --------

  private _updateEditingEventField(field: "time" | "dataText", value: string): void {
    if (!this._editingEvent) return;
    this._editingEvent = {
      ...this._editingEvent,
      [field]: value,
      error: undefined,
      dataError: undefined,
    };
  }

  private _handleEditEventTimeChange = (e: Event): void => {
    this._updateEditingEventField("time", _withSeconds((e.target as HTMLInputElement).value));
  };

  private _handleEditEventDataChange = (e: Event): void => {
    this._updateEditingEventField("dataText", (e.target as HTMLTextAreaElement).value);
  };

  private _saveEventEdit(): void {
    if (!this._editingEvent) return;
    const lang = haLang(this.hass);
    const { day, index, time, dataText } = this._editingEvent;
    const t = _toMin(time);
    if (isNaN(t)) {
      this._editingEvent = { ...this._editingEvent, error: tr(lang, "schedule.edit_dialog.err_time") };
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
        this._editingEvent = {
          ...this._editingEvent,
          dataError: tr(lang, "schedule.edit_dialog.err_data"),
        };
        return;
      }
    }
    const events = this._eventsForDay(day);
    const collision = events.some((ev, i) => i !== index && _toMin(ev.time) === t);
    if (collision) {
      this._editingEvent = { ...this._editingEvent, error: tr(lang, "schedule.edit_dialog.err_overlap") };
      return;
    }
    const updated: ScheduleEvent = { time: _minToHms(t, time) };
    if (data) updated.data = data;
    events[index] = updated;
    this._setEventsForDay(day, events);
    this._editingEvent = undefined;
  }

  private _deleteEditingEvent(): void {
    if (!this._editingEvent) return;
    const { day, index } = this._editingEvent;
    const events = this._eventsForDay(day).filter((_, i) => i !== index);
    this._setEventsForDay(day, events);
    this._editingEvent = undefined;
  }

  private _cancelEventEdit(): void {
    this._editingEvent = undefined;
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

    return html`
      <div class="editor">
        <div class="hour-header">
          <div class="day-col"></div>
          <div class="hour-labels">
            ${[0, 6, 12, 18, 24].map(
              (h) => html`<span style=${styleMap({ left: `${(h / 24) * 100}%` })}>${String(h).padStart(2, "0")}</span>`
            )}
          </div>
        </div>
        ${WEEK.map((w) => this._renderDayRow(w.key, w.dayIndex, lang))}
        <div class="hint">${tr(lang, "schedule.edit_dialog.hint_v2")}</div>
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
    if (this._editingEvent) return this._renderEventInner();
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
                step="1"
                .value=${edit.from.slice(0, 8)}
                @change=${this._handleEditFromChange}
              />
            </label>
            <label class="field">
              <span>${tr(lang, "schedule.edit_dialog.to")}</span>
              <input
                type="time"
                step="1"
                .value=${edit.to.slice(0, 8)}
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

  private _renderEventInner(): TemplateResult {
    const lang = haLang(this.hass);
    const edit = this._editingEvent!;
    const dayLabel = weekdayShort(
      lang,
      WEEK.find((w) => w.key === edit.day)?.dayIndex ?? 0
    );
    return html`
      <div class="inner-backdrop" @click=${this._cancelEventEdit}>
        <div class="inner-dialog" @click=${(e: MouseEvent) => e.stopPropagation()}>
          <header>
            <h3>
              ${tr(lang, "schedule.edit_dialog.event_title", { day: dayLabel })}
            </h3>
            <button class="close-x" @click=${this._cancelEventEdit} aria-label="Close">
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </header>
          <div class="inner-body">
            <label class="field">
              <span>${tr(lang, "schedule.edit_dialog.event_time")}</span>
              <input
                type="time"
                step="1"
                .value=${edit.time.slice(0, 8)}
                @change=${this._handleEditEventTimeChange}
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
                .value=${edit.dataText}
                @input=${this._handleEditEventDataChange}
              ></textarea>
              ${edit.dataError ? html`<span class="err">${edit.dataError}</span>` : nothing}
            </label>
            ${edit.error ? html`<div class="err">${edit.error}</div>` : nothing}
          </div>
          <footer>
            <button class="ppd-btn danger" @click=${() => this._deleteEditingEvent()}>
              ${tr(lang, "schedule.edit_dialog.delete")}
            </button>
            <div class="spacer"></div>
            <button class="ppd-btn flat" @click=${this._cancelEventEdit}>
              ${tr(lang, "common.cancel")}
            </button>
            <button class="ppd-btn primary" @click=${() => this._saveEventEdit()}>
              ${tr(lang, "common.save")}
            </button>
          </footer>
        </div>
      </div>
    `;
  }

  private _renderDayRow(key: DayKey, dayIndex: number, lang: "en" | "de"): TemplateResult {
    const isEvents = this._kind === "events";

    let ghost: TemplateResult | typeof nothing = nothing;
    if (!isEvents && this._drag?.day === key) {
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

    const markers = isEvents
      ? this._eventsForDay(key).map((ev, idx) => {
          let effectiveMin = _toMin(ev.time);
          if (this._eventDrag?.day === key && this._eventDrag.index === idx) {
            effectiveMin = this._eventDrag.currentMin;
          }
          const left = (effectiveMin / DAY_MINUTES) * 100;
          return html`
            <div
              class="pp-pin"
              data-day=${key}
              data-index=${idx}
              style=${styleMap({ left: `${left}%` })}
              title="${_minToHm(effectiveMin)}"
              @pointerdown=${this._handlePinPointerDown}
              @pointermove=${this._handlePinPointerMove}
              @pointerup=${this._handlePinPointerUp}
              @pointercancel=${(e: PointerEvent) => { void e; this._eventDrag = undefined; }}
              @dblclick=${this._handlePinDoubleClick}
            >
              <div class="pp-pin-stem"></div>
              <div class="pp-pin-head"></div>
              <span class="pp-pin-label">${_minToHm(effectiveMin)}</span>
            </div>
          `;
        })
      : this._blocksForDay(key).map((b, idx) => {
          const start = _toMin(b.from);
          const end = _toMin(b.to);
          const left = (start / DAY_MINUTES) * 100;
          const width = ((end - start) / DAY_MINUTES) * 100;
          return html`
            <div
              class="pp-block"
              data-day=${key}
              data-index=${idx}
              style=${styleMap({ left: `${left}%`, width: `${width}%` })}
              @click=${this._handleBlockClick}
              title="${b.from.slice(0, 5)}–${b.to.slice(0, 5)}"
            >
              <span class="pp-block-label">${b.from.slice(0, 5)}–${b.to.slice(0, 5)}</span>
            </div>
          `;
        });

    return html`
      <div class="day-row">
        <div class="day-col">${weekdayShort(lang, dayIndex)}</div>
        <div
          class="day-track ${isEvents ? "events" : "blocks"}"
          data-day=${key}
          @pointerdown=${this._handleTrackPointerDown}
          @pointermove=${this._handleTrackPointerMove}
          @pointerup=${this._handleTrackPointerUp}
          @pointercancel=${this._handleTrackPointerCancel}
        >
          ${markers}
          ${ghost}
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
        overflow: hidden;
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

      /* ----- Event-mode pin marker ----- */
      .day-track.events {
        overflow: visible;
        cursor: copy;
      }
      .pp-pin {
        position: absolute;
        top: -30%;
        bottom: 0;
        width: 18px;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: grab;
        touch-action: none;
      }
      .pp-pin:active { cursor: grabbing; }
      .pp-pin-stem {
        width: 2px;
        flex: 1;
        background-color: var(--primary-color, #03a9f4);
        border-radius: 1px;
        pointer-events: none;
      }
      .pp-pin-head {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: var(--primary-color, #03a9f4);
        box-shadow: 0 0 0 2px var(--card-background-color, #fff);
        margin-top: -2px;
        flex: none;
        pointer-events: none;
      }
      .pp-pin-label {
        position: absolute;
        top: -16px;
        font-size: 10px;
        font-weight: 500;
        color: var(--primary-text-color);
        white-space: nowrap;
        pointer-events: none;
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

function _sortEvents(events: ScheduleEvent[]): ScheduleEvent[] {
  return events
    .filter((e) => typeof e?.time === "string")
    .slice()
    .sort((a, b) => _toMin(a.time) - _toMin(b.time));
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
