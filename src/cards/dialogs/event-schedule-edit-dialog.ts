/**
 * Event Schedule edit dialog — PowerPilz's weekly point-in-time editor.
 *
 * Primary UX:
 *   - 7 horizontal tracks (Mon–Sun) covering 24 hours.
 *   - Click empty track → insert a pin at the clicked position
 *     (15-minute snap).
 *   - Click an existing pin → opens a second modal for minute-precise
 *     time editing, an optional `data` payload, and a Delete action.
 *
 * All edits are buffered on `this._events` until the user hits Save,
 * which calls the PowerPilz Companion `set_schedule_events` service.
 * Events are read straight from the companion select entity's
 * `week_events` attribute.
 */

import { css, html, nothing, type CSSResultGroup, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import type { HomeAssistant } from "../../types";
import { tr, haLang, weekdayShort } from "../../utils/i18n";
import { PowerPilzDialogBase } from "./dialog-shell";

interface ScheduleEvent {
  time: string; // "HH:MM:SS"
  data?: Record<string, unknown>;
}

type WeekEvents = {
  monday: ScheduleEvent[];
  tuesday: ScheduleEvent[];
  wednesday: ScheduleEvent[];
  thursday: ScheduleEvent[];
  friday: ScheduleEvent[];
  saturday: ScheduleEvent[];
  sunday: ScheduleEvent[];
};

const DIALOG_TAG = "power-pilz-event-schedule-edit-dialog";

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

interface EditingEventState {
  day: DayKey;
  index: number;
  time: string; // "HH:MM:SS"
  dataText: string;
  dataError?: string;
  error?: string;
}

/** State while dragging an existing pin to a new time. */
interface PinDragState {
  day: DayKey;
  index: number;
  trackEl: HTMLElement;
  pointerId: number;
  origMin: number;
  anchorClientX: number;
  deltaMin: number;
  moved: boolean;
}

export interface EventScheduleEditDialogOptions {
  hass: HomeAssistant;
  /** The PowerPilz Smart Event Schedule `select.*` entity id. Events
   *  are read from its `week_events` attribute and saved via the
   *  Companion integration's `set_schedule_events` service. */
  scheduleEntityId: string;
  title?: string;
}

function _emptyWeek(): WeekEvents {
  return {
    monday: [], tuesday: [], wednesday: [], thursday: [],
    friday: [], saturday: [], sunday: [],
  };
}

class PowerPilzEventScheduleEditDialog extends PowerPilzDialogBase {
  @property({ attribute: false })
  public hass!: HomeAssistant;

  @property({ type: String })
  public scheduleEntityId = "";

  @state() private _events: WeekEvents = _emptyWeek();
  /** Single "uniform" template used when same-for-all-days is enabled.
   *  Stored independently from `_events` so toggling the flag off
   *  restores the per-day data the user had before. */
  @state() private _uniformEvents: ScheduleEvent[] = [];
  @state() private _sameForAll = false;
  @state() private _loading = true;
  @state() private _loadError?: string;
  @state() private _saving = false;
  @state() private _dirty = false;
  @state() private _editing?: EditingEventState;
  @state() private _pinDrag?: PinDragState;
  /** Cursor position over a track for the live time hint. */
  @state() private _cursor?: { day: DayKey; min: number };

  connectedCallback(): void {
    super.connectedCallback();
    void this._load();
  }

  protected _handleEscape(_event: KeyboardEvent): void {
    if (this._saving) return;
    if (this._editing) {
      this._cancelEdit();
    } else {
      this.close();
    }
  }

  // ------------------------------------------------------------
  // Load + save
  // ------------------------------------------------------------

  private async _load(): Promise<void> {
    const lang = haLang(this.hass);
    try {
      const state = this.hass?.states?.[this.scheduleEntityId];
      if (!state) {
        this._loadError = tr(lang, "event_schedule.edit_dialog.error_not_found", {
          entity: this.scheduleEntityId,
        });
        return;
      }
      const raw = state.attributes?.week_events;
      const loaded = _emptyWeek();
      if (raw && typeof raw === "object" && !Array.isArray(raw)) {
        for (const day of Object.keys(loaded) as (keyof WeekEvents)[]) {
          const list = (raw as Record<string, unknown>)[day];
          if (Array.isArray(list)) {
            loaded[day] = list
              .filter((e) => e && typeof e === "object")
              .map((e) => {
                const ev = e as Record<string, unknown>;
                const out: ScheduleEvent = { time: String(ev.time ?? "00:00:00") };
                if (ev.data && typeof ev.data === "object" && !Array.isArray(ev.data)) {
                  out.data = ev.data as Record<string, unknown>;
                }
                return out;
              });
          }
        }
      }
      this._events = loaded;
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
      // onto every day in the saved payload. The per-day `_events`
      // state is left untouched so the user can toggle back.
      const payload = this._sameForAll
        ? {
            monday: this._uniformEvents,
            tuesday: this._uniformEvents,
            wednesday: this._uniformEvents,
            thursday: this._uniformEvents,
            friday: this._uniformEvents,
            saturday: this._uniformEvents,
            sunday: this._uniformEvents,
          }
        : this._events;
      await this.hass.callService(
        "powerpilz_companion",
        "set_schedule_events",
        {
          entity_id: this.scheduleEntityId,
          events: payload,
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
  // Event list helpers
  // ------------------------------------------------------------

  /** Reads the events for a given day, transparently routing to the
   *  uniform template when same-for-all-days is enabled. */
  private _eventsForDay(key: DayKey): ScheduleEvent[] {
    if (this._sameForAll) return [...this._uniformEvents];
    const events = this._events[key];
    return Array.isArray(events) ? [...events] : [];
  }

  private _setEventsForDay(key: DayKey, events: ScheduleEvent[]): void {
    const cleaned = _sortEvents(events);
    if (this._sameForAll) {
      this._uniformEvents = cleaned;
    } else {
      this._events = { ...this._events, [key]: cleaned };
    }
    this._dirty = true;
  }

  private _toggleSameForAll = (): void => {
    const next = !this._sameForAll;
    if (next) {
      // Seed the uniform template from the first day that has events.
      const seed = WEEK
        .map((w) => this._events[w.key])
        .find((e) => Array.isArray(e) && e.length > 0);
      this._uniformEvents = seed ? [...seed] : [];
    }
    this._sameForAll = next;
    this._dirty = true;
  };

  // ------------------------------------------------------------
  // Click-to-insert interaction
  // ------------------------------------------------------------

  private _pxToMin(trackEl: HTMLElement, clientX: number): number {
    const rect = trackEl.getBoundingClientRect();
    const pct = (clientX - rect.left) / rect.width;
    const raw = Math.max(0, Math.min(DAY_MINUTES, Math.round(pct * DAY_MINUTES)));
    return Math.round(raw / SNAP_MINUTES) * SNAP_MINUTES;
  }

  private _handleTrackClick = (event: MouseEvent): void => {
    if (this._loading || this._loadError) return;
    if ((event.target as HTMLElement).closest(".pp-pin")) return;
    // Suppress when a pin-drag just released — the up-event fires both
    // pointerup AND a click; without this guard the click would insert
    // a phantom pin at the drop location.
    if (this._pinDrag) return;
    const trackEl = event.currentTarget as HTMLElement;
    const day = trackEl.dataset.day as DayKey | undefined;
    if (!day) return;
    const at = this._pxToMin(trackEl, event.clientX);
    const existing = this._eventsForDay(day);
    if (existing.some((ev) => _toMin(ev.time) === at)) return;
    existing.push({ time: _minToHms(at) });
    this._setEventsForDay(day, existing);
  };

  // ------------------------------------------------------------
  // Cursor hint + drag-to-move pin
  // ------------------------------------------------------------

  private _handleTrackPointerMove = (event: PointerEvent): void => {
    const trackEl = event.currentTarget as HTMLElement;
    const day = trackEl.dataset.day as DayKey | undefined;

    if (this._pinDrag && event.pointerId === this._pinDrag.pointerId) {
      const rect = trackEl.getBoundingClientRect();
      const dxPx = event.clientX - this._pinDrag.anchorClientX;
      const dxMinRaw = (dxPx / rect.width) * DAY_MINUTES;
      let delta = Math.round(dxMinRaw / SNAP_MINUTES) * SNAP_MINUTES;
      const minDelta = -this._pinDrag.origMin;
      const maxDelta = DAY_MINUTES - this._pinDrag.origMin;
      if (delta < minDelta) delta = minDelta;
      if (delta > maxDelta) delta = maxDelta;
      if (delta !== this._pinDrag.deltaMin) {
        this._pinDrag = {
          ...this._pinDrag,
          deltaMin: delta,
          moved: this._pinDrag.moved || delta !== 0,
        };
      }
      return;
    }

    if (day) {
      const min = this._pxToMin(trackEl, event.clientX);
      if (!this._cursor || this._cursor.day !== day || this._cursor.min !== min) {
        this._cursor = { day, min };
      }
    }
  };

  private _handleTrackPointerLeave = (_event: PointerEvent): void => {
    if (this._pinDrag) return;
    this._cursor = undefined;
  };

  private _handlePinPointerDown = (event: PointerEvent): void => {
    if (event.button !== 0) return;
    if (this._loading || this._loadError) return;
    const el = event.currentTarget as HTMLElement;
    const day = el.dataset.day as DayKey | undefined;
    const idx = parseInt(el.dataset.index ?? "-1", 10);
    if (!day || idx < 0) return;
    const trackEl = el.parentElement as HTMLElement | null;
    if (!trackEl) return;

    const events = this._eventsForDay(day);
    const ev = events[idx];
    if (!ev) return;

    event.preventDefault();
    event.stopPropagation();
    try { trackEl.setPointerCapture(event.pointerId); } catch { /* ignore */ }

    this._pinDrag = {
      day,
      index: idx,
      trackEl,
      pointerId: event.pointerId,
      origMin: _toMin(ev.time),
      anchorClientX: event.clientX,
      deltaMin: 0,
      moved: false,
    };
  };

  private _handlePinPointerUp = (event: PointerEvent): void => {
    if (!this._pinDrag) return;
    if (event.pointerId !== this._pinDrag.pointerId) return;
    const drag = this._pinDrag;
    try { drag.trackEl.releasePointerCapture(drag.pointerId); } catch { /* ignore */ }

    // No real drag → open the edit modal. Clear `_pinDrag` AFTER the
    // upcoming `_handleTrackClick` so its guard kicks in and suppresses
    // a stray phantom insert.
    if (!drag.moved || drag.deltaMin === 0) {
      const events = this._eventsForDay(drag.day);
      const ev = events[drag.index];
      // Defer the click guard release by one task tick so the click
      // event (which fires right after pointerup) sees `_pinDrag` set.
      setTimeout(() => { this._pinDrag = undefined; }, 0);
      if (!ev) return;
      this._editing = {
        day: drag.day,
        index: drag.index,
        time: _normaliseHms(ev.time),
        dataText: ev.data ? JSON.stringify(ev.data, null, 2) : "",
      };
      return;
    }

    // Apply the move; reject if another pin already occupies the
    // target time.
    const events = this._eventsForDay(drag.day);
    const moved = events[drag.index];
    if (moved) {
      const newMin = drag.origMin + drag.deltaMin;
      const collision = events.some((ev, i) => i !== drag.index && _toMin(ev.time) === newMin);
      if (!collision) {
        const updated: ScheduleEvent = { time: _minToHms(newMin) };
        if (moved.data) updated.data = moved.data;
        events[drag.index] = updated;
        this._setEventsForDay(drag.day, events);
      }
    }
    setTimeout(() => { this._pinDrag = undefined; }, 0);
  };

  // ------------------------------------------------------------
  // Edit modal
  // ------------------------------------------------------------

  private _updateEditingField(field: "time" | "dataText", value: string): void {
    if (!this._editing) return;
    this._editing = {
      ...this._editing,
      [field]: value,
      error: undefined,
      dataError: undefined,
    };
  }

  private _handleEditTimeChange = (e: Event): void => {
    this._updateEditingField("time", _normaliseHms((e.target as HTMLInputElement).value));
  };

  private _handleEditDataChange = (e: Event): void => {
    this._updateEditingField("dataText", (e.target as HTMLTextAreaElement).value);
  };

  private _saveEdit(): void {
    if (!this._editing) return;
    const lang = haLang(this.hass);
    const { day, index, time, dataText } = this._editing;
    const t = _toMin(time);
    if (isNaN(t)) {
      this._editing = { ...this._editing, error: tr(lang, "schedule.edit_dialog.err_time") };
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
    const events = this._eventsForDay(day);
    const collision = events.some((ev, i) => i !== index && _toMin(ev.time) === t);
    if (collision) {
      this._editing = { ...this._editing, error: tr(lang, "schedule.edit_dialog.err_overlap") };
      return;
    }
    const updated: ScheduleEvent = { time: _minToHms(t, time) };
    if (data) updated.data = data;
    events[index] = updated;
    this._setEventsForDay(day, events);
    this._editing = undefined;
  }

  private _deleteEditing(): void {
    if (!this._editing) return;
    const { day, index } = this._editing;
    const events = this._eventsForDay(day).filter((_, i) => i !== index);
    this._setEventsForDay(day, events);
    this._editing = undefined;
  }

  private _cancelEdit(): void {
    this._editing = undefined;
  }

  // ------------------------------------------------------------
  // Title + lifecycle
  // ------------------------------------------------------------

  private _resolveTitle(): string {
    if (this.dialogTitle) return this.dialogTitle;
    const lang = haLang(this.hass);
    return (
      this.hass?.states?.[this.scheduleEntityId]?.attributes?.friendly_name as string | undefined
      ?? tr(lang, "event_schedule.edit_dialog.default_title")
    );
  }

  protected willUpdate(): void {
    const resolved = this._resolveTitle();
    if (this.dialogTitle !== resolved && !this.dialogTitle) {
      this.dialogTitle = resolved;
    }
  }

  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------

  protected renderBody(): TemplateResult {
    const lang = haLang(this.hass);
    if (this._loading) {
      return html`<div class="msg">${tr(lang, "common.loading") || "Loading…"}</div>`;
    }
    if (this._loadError) {
      return html`<div class="msg error">${this._loadError}</div>`;
    }
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
        <div class="hint">${tr(lang, "event_schedule.edit_dialog.hint_v2")}</div>
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
      <div class="inner-backdrop" @click=${() => this._cancelEdit()}>
        <div class="inner-dialog" @click=${(e: MouseEvent) => e.stopPropagation()}>
          <header>
            <h3>${tr(lang, "event_schedule.edit_dialog.edit_title", { day: dayLabel })}</h3>
            <button class="close-x" @click=${() => this._cancelEdit()} aria-label="Close">
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </header>
          <div class="inner-body">
            <label class="field">
              <span>${tr(lang, "event_schedule.edit_dialog.time")}</span>
              <input
                type="time"
                .value=${edit.time.slice(0, 5)}
                @change=${this._handleEditTimeChange}
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
                @input=${this._handleEditDataChange}
              ></textarea>
              ${edit.dataError ? html`<span class="err">${edit.dataError}</span>` : nothing}
            </label>
            ${edit.error ? html`<div class="err">${edit.error}</div>` : nothing}
          </div>
          <footer>
            <button class="ppd-btn danger" @click=${() => this._deleteEditing()}>
              ${tr(lang, "schedule.edit_dialog.delete")}
            </button>
            <div class="spacer"></div>
            <button class="ppd-btn flat" @click=${() => this._cancelEdit()}>
              ${tr(lang, "common.cancel")}
            </button>
            <button class="ppd-btn primary" @click=${() => this._saveEdit()}>
              ${tr(lang, "common.save")}
            </button>
          </footer>
        </div>
      </div>
    `;
  }

  private _renderDayRow(key: DayKey, label: string): TemplateResult {
    // Cursor chip while pointer is over this track (and not dragging).
    let cursorChip: TemplateResult | typeof nothing = nothing;
    if (this._cursor?.day === key && !this._pinDrag) {
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
          @click=${this._handleTrackClick}
          @pointermove=${this._handleTrackPointerMove}
          @pointerleave=${this._handleTrackPointerLeave}
          @pointerup=${this._handlePinPointerUp}
        >
          ${this._eventsForDay(key).map((ev, idx) => {
            const baseMin = _toMin(ev.time);
            const isMoving = this._pinDrag?.day === key && this._pinDrag.index === idx;
            const min = isMoving ? baseMin + (this._pinDrag?.deltaMin ?? 0) : baseMin;
            const left = (min / DAY_MINUTES) * 100;
            return html`
              <div
                class="pp-pin ${isMoving ? "moving" : ""}"
                data-day=${key}
                data-index=${idx}
                style=${styleMap({ left: `${left}%` })}
                title="${_minToHm(min)}"
                @pointerdown=${this._handlePinPointerDown}
              ></div>
            `;
          })}
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
      .hour-labels { position: relative; flex: 1; height: 14px; }
      .hour-labels span { position: absolute; transform: translateX(-50%); }
      .hour-labels span:first-child { transform: translateX(0); }
      .hour-labels span:last-child { transform: translateX(-100%); }

      .day-row { display: flex; align-items: center; gap: 8px; }
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
        cursor: copy;
        /* overflow visible so the cursor-time chip can render above
         * the track. Pin positions are clamped, nothing else leaks. */
        overflow: visible;
        user-select: none;
      }

      .pp-pin {
        position: absolute;
        top: 50%;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: var(--primary-color, #03a9f4);
        box-shadow: 0 0 0 2px var(--card-background-color, #fff);
        transform: translate(-50%, -50%);
        cursor: grab;
        touch-action: none;
        transition: transform 0.12s ease;
      }
      .pp-pin:hover {
        transform: translate(-50%, -50%) scale(1.15);
      }
      .pp-pin.moving {
        cursor: grabbing;
        opacity: 0.9;
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

      /* ----- Inner edit modal ----- */
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
      .inner-dialog header h3 { margin: 0; flex: 1; font-size: 16px; font-weight: 600; }
      .inner-dialog .close-x {
        border: none;
        background: transparent;
        cursor: pointer;
        width: 32px; height: 32px;
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
      .field { display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: var(--primary-text-color); }
      .field > span { font-weight: 500; }
      .field small { font-weight: 400; color: var(--secondary-text-color); margin-left: 6px; }
      .field input[type="time"], .field textarea {
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
      .err { color: var(--error-color, #c62828); font-size: 12px; }
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

function _sortEvents(events: ScheduleEvent[]): ScheduleEvent[] {
  return events
    .filter((e) => typeof e?.time === "string")
    .slice()
    .sort((a, b) => _toMin(a.time) - _toMin(b.time));
}

if (!customElements.get(DIALOG_TAG)) {
  customElements.define(DIALOG_TAG, PowerPilzEventScheduleEditDialog);
}

export function openEventScheduleEditDialog(opts: EventScheduleEditDialogOptions): void {
  if (!opts.scheduleEntityId) return;
  const dlg = document.createElement(DIALOG_TAG) as PowerPilzEventScheduleEditDialog;
  dlg.hass = opts.hass;
  dlg.scheduleEntityId = opts.scheduleEntityId;
  if (opts.title) dlg.dialogTitle = opts.title;
  document.body.appendChild(dlg);
}

declare global {
  interface HTMLElementTagNameMap {
    [DIALOG_TAG]: PowerPilzEventScheduleEditDialog;
  }
}
