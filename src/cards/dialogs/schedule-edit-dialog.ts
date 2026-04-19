/**
 * Schedule edit dialog — PowerPilz's own weekly-plan editor.
 *
 * Primary UX:
 *   - 7 horizontal tracks (Mon–Sun) covering 24 hours.
 *   - Pointer-drag on empty track → paints a new block with 15-minute
 *     snapping, persisted on pointer-up.
 *   - Click on an existing block → opens a second modal for minute/
 *     second-precise time editing, a free-form `data` field (matching
 *     HA's Schedule helper model) and a Delete action.
 *
 * All changes are buffered on `this._schedule` until the user hits
 * Save, which calls the stable `schedule/update` websocket command.
 *
 * This implementation deliberately does NOT depend on HA's own
 * `<ha-schedule-form>` custom element: that component is lazy-loaded
 * only after the Settings → Helpers dialog has been opened at least
 * once per browser session, leading to a broken first-use experience.
 * We use the same `schedule/update` contract HA's form does, so saves
 * write back through the supported path.
 */

import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import type { HomeAssistant } from "../../types";
import { tr, haLang, weekdayShort } from "../../utils/i18n";

interface ScheduleBlock {
  from: string; // "HH:MM:SS"
  to: string;   // "HH:MM:SS"
  data?: Record<string, unknown>;
}

interface ScheduleData {
  id: string;
  name: string;
  icon?: string;
  monday: ScheduleBlock[];
  tuesday: ScheduleBlock[];
  wednesday: ScheduleBlock[];
  thursday: ScheduleBlock[];
  friday: ScheduleBlock[];
  saturday: ScheduleBlock[];
  sunday: ScheduleBlock[];
  [key: string]: unknown;
}

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
  scheduleEntityId: string;
  title?: string;
}

class PowerPilzScheduleEditDialog extends LitElement {
  @property({ attribute: false })
  public hass!: HomeAssistant;

  @property({ type: String })
  public scheduleEntityId = "";

  @property({ type: String })
  public dialogTitle = "";

  @state() private _schedule?: ScheduleData;
  @state() private _loading = true;
  @state() private _loadError?: string;
  @state() private _saving = false;
  @state() private _closing = false;
  @state() private _dirty = false;

  @state() private _drag?: DragState;
  @state() private _editing?: EditingState;

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("keydown", this._onKeyDown);
    void this._loadSchedule();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("keydown", this._onKeyDown);
  }

  private _onKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== "Escape" || this._saving) return;
    if (this._editing) {
      this._cancelBlockEdit();
    } else {
      this._close();
    }
  };

  // ------------------------------------------------------------
  // Load + save
  // ------------------------------------------------------------

  private async _loadSchedule(): Promise<void> {
    const lang = haLang(this.hass);
    try {
      if (!this.hass?.callWS) {
        this._loadError = tr(lang, "schedule.edit_dialog.error_no_ws");
        this._loading = false;
        return;
      }
      const list: ScheduleData[] = await this.hass.callWS({
        type: "schedule/list",
      });
      const slug = this.scheduleEntityId.split(".", 2)[1] ?? "";
      const friendly = this.hass.states?.[this.scheduleEntityId]?.attributes
        ?.friendly_name;
      let found = list.find((s) => s.id === slug);
      if (!found && friendly) {
        found = list.find((s) => s.name === friendly);
      }
      if (!found) {
        this._loadError = tr(lang, "schedule.edit_dialog.error_not_found", {
          entity: this.scheduleEntityId,
        });
      } else {
        this._schedule = JSON.parse(JSON.stringify(found));
      }
    } catch (err) {
      this._loadError = String((err as Error)?.message || err);
    } finally {
      this._loading = false;
    }
  }

  private async _handleSave(): Promise<void> {
    if (!this._schedule || this._saving || !this.hass?.callWS) return;
    this._saving = true;
    try {
      await this.hass.callWS!({
        type: "schedule/update",
        schedule_id: this._schedule.id,
        name: this._schedule.name,
        icon: this._schedule.icon,
        monday: this._schedule.monday ?? [],
        tuesday: this._schedule.tuesday ?? [],
        wednesday: this._schedule.wednesday ?? [],
        thursday: this._schedule.thursday ?? [],
        friday: this._schedule.friday ?? [],
        saturday: this._schedule.saturday ?? [],
        sunday: this._schedule.sunday ?? [],
      });
      this._dirty = false;
      this._close();
    } catch (err) {
      this._saving = false;
      this._loadError = String((err as Error)?.message || err);
    }
  }

  private _handleBackdropClick = (event: MouseEvent): void => {
    if (event.target === event.currentTarget && !this._saving) this._close();
  };

  private _close(): void {
    if (this._closing) return;
    this._closing = true;
    setTimeout(() => this.remove(), 180);
  }

  // ------------------------------------------------------------
  // Block list helpers
  // ------------------------------------------------------------

  private _blocksForDay(key: DayKey): ScheduleBlock[] {
    const blocks = (this._schedule?.[key] as ScheduleBlock[] | undefined) ?? [];
    return Array.isArray(blocks) ? [...blocks] : [];
  }

  private _setBlocksForDay(key: DayKey, blocks: ScheduleBlock[]): void {
    if (!this._schedule) return;
    const cleaned = _sortAndMerge(blocks);
    this._schedule = { ...this._schedule, [key]: cleaned } as ScheduleData;
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
    if (!this._schedule) return;
    // Ignore pointerdown that originated on an existing block — that's
    // a click-to-edit gesture, handled by `_handleBlockClick`.
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

    // Check against other blocks on the same day for overlap.
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
  // Render
  // ------------------------------------------------------------

  protected render(): TemplateResult {
    const lang = haLang(this.hass);
    const title =
      this.dialogTitle ||
      this.hass?.states?.[this.scheduleEntityId]?.attributes?.friendly_name ||
      tr(lang, "schedule.edit_dialog.default_title");

    return html`
      <div
        class="backdrop ${this._closing ? "closing" : ""}"
        @click=${this._handleBackdropClick}
      >
        <div
          class="dialog"
          role="dialog"
          aria-modal="true"
          aria-label=${title}
          @click=${(e: MouseEvent) => e.stopPropagation()}
        >
          <header>
            <h2>${title}</h2>
            <button class="close-x" @click=${this._close} aria-label="Close">
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </header>
          <div class="body">${this._renderBody(lang)}</div>
          <footer>
            <button class="flat" @click=${this._close} ?disabled=${this._saving}>
              ${tr(lang, "common.cancel")}
            </button>
            <button
              class="primary"
              @click=${this._handleSave}
              ?disabled=${this._saving || !this._schedule || !this._dirty || !!this._loadError}
            >
              ${this._saving
                ? tr(lang, "common.saving") || "Saving…"
                : tr(lang, "common.save") || "Save"}
            </button>
          </footer>
          ${this._editing ? this._renderBlockEditor(lang) : nothing}
        </div>
      </div>
    `;
  }

  private _renderBody(lang: "en" | "de"): TemplateResult {
    if (this._loading) {
      return html`<div class="msg">${tr(lang, "common.loading") || "Loading…"}</div>`;
    }
    if (this._loadError) {
      return html`<div class="msg error">${this._loadError}</div>`;
    }
    if (!this._schedule) {
      return html`<div class="msg error">
        ${tr(lang, "schedule.edit_dialog.error_not_found", { entity: this.scheduleEntityId })}
      </div>`;
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

  private _renderDayRow(key: DayKey, dayIndex: number, lang: "en" | "de"): TemplateResult {
    const blocks = this._blocksForDay(key);

    // If we're mid-drag on this day, render a ghost block showing the
    // pending selection so the user gets live feedback.
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

    return html`
      <div class="day-row">
        <div class="day-col">${weekdayShort(lang, dayIndex)}</div>
        <div
          class="day-track"
          data-day=${key}
          @pointerdown=${this._handleTrackPointerDown}
          @pointermove=${this._handleTrackPointerMove}
          @pointerup=${this._handleTrackPointerUp}
          @pointercancel=${this._handleTrackPointerCancel}
        >
          ${blocks.map((b, idx) => {
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
          })}
          ${ghost}
        </div>
      </div>
    `;
  }

  private _renderBlockEditor(lang: "en" | "de"): TemplateResult {
    if (!this._editing) return html``;
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
            <button class="danger" @click=${this._deleteEditingBlock}>
              ${tr(lang, "schedule.edit_dialog.delete")}
            </button>
            <div class="spacer"></div>
            <button class="flat" @click=${this._cancelBlockEdit}>
              ${tr(lang, "common.cancel")}
            </button>
            <button class="primary" @click=${() => this._saveBlockEdit()}>
              ${tr(lang, "common.save")}
            </button>
          </footer>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      position: fixed; inset: 0; z-index: 10000;
      font-family: var(--paper-font-body1_-_font-family, inherit);
    }
    .backdrop {
      position: fixed; inset: 0;
      background: rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(2px);
      display: flex; align-items: center; justify-content: center;
      padding: 24px 16px;
      animation: fade-in 0.18s ease;
    }
    .backdrop.closing { animation: fade-out 0.15s ease forwards; }
    @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }

    .dialog {
      position: relative;
      background: var(--card-background-color, var(--primary-background-color, #fff));
      color: var(--primary-text-color, #212121);
      border-radius: 16px;
      box-shadow: 0 12px 48px rgba(0,0,0,0.3);
      width: min(100%, 900px);
      max-height: calc(100vh - 48px);
      display: flex; flex-direction: column;
      overflow: hidden;
      animation: pop-in 0.22s cubic-bezier(0.2, 0.9, 0.3, 1.1);
    }
    @keyframes pop-in {
      from { opacity: 0; transform: translateY(10px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    header {
      padding: 14px 20px;
      display: flex; align-items: center; gap: 12px;
      border-bottom: 1px solid var(--divider-color, rgba(0,0,0,0.08));
    }
    header h2, header h3 {
      margin: 0; flex: 1;
      font-size: 18px; font-weight: 600;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .close-x {
      border: none; background: transparent; cursor: pointer;
      width: 36px; height: 36px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      color: var(--secondary-text-color);
    }
    .close-x:hover { background: color-mix(in srgb, currentColor 10%, transparent); }

    .body {
      padding: 16px 20px; overflow-y: auto; flex: 1;
      min-height: 260px;
    }
    .msg {
      padding: 32px 8px; text-align: center;
      color: var(--secondary-text-color, #757575); font-size: 14px;
    }
    .msg.error { color: var(--error-color, #c62828); }

    footer {
      padding: 12px 16px;
      display: flex; justify-content: flex-end; gap: 8px;
      border-top: 1px solid var(--divider-color, rgba(0,0,0,0.08));
      background: var(--secondary-background-color, transparent);
    }
    footer .spacer { flex: 1; }
    button {
      font: inherit; font-size: 14px; font-weight: 500;
      padding: 8px 20px; border-radius: 8px; border: none; cursor: pointer;
      transition: background 0.15s ease;
    }
    button:disabled { opacity: 0.55; cursor: default; }
    button.flat { background: transparent; color: var(--primary-text-color, #212121); }
    button.flat:hover:not(:disabled) {
      background: color-mix(in srgb, currentColor 10%, transparent);
    }
    button.primary {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    button.primary:hover:not(:disabled) {
      background: color-mix(in srgb, var(--primary-color, #03a9f4) 90%, #000);
    }
    button.danger {
      background: var(--error-color, #c62828);
      color: #fff;
    }
    button.danger:hover:not(:disabled) {
      background: color-mix(in srgb, var(--error-color, #c62828) 85%, #000);
    }

    /* ----- Weekly editor ----- */
    .editor { display: flex; flex-direction: column; gap: 6px; }
    .hour-header {
      display: flex; align-items: center; gap: 8px;
      margin-left: 2px;
      font-size: 10px;
      color: var(--secondary-text-color, #757575);
    }
    .day-col {
      flex: none; width: 44px;
      font-size: 12px; font-weight: 600;
      color: var(--primary-text-color);
      text-align: left;
    }
    .hour-labels {
      position: relative; flex: 1; height: 14px;
    }
    .hour-labels span { position: absolute; transform: translateX(-50%); }
    .hour-labels span:first-child { transform: translateX(0); }
    .hour-labels span:last-child { transform: translateX(-100%); }
    .day-row {
      display: flex; align-items: center; gap: 8px;
    }
    .day-track {
      position: relative; flex: 1;
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
      display: flex; align-items: center; justify-content: center;
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
      font-size: 10px; font-weight: 500;
      color: var(--primary-text-color);
      white-space: nowrap; padding: 0 6px;
      pointer-events: none;
    }
    .hint {
      margin-top: 10px; font-size: 11px;
      color: var(--secondary-text-color, #757575);
      line-height: 1.4;
    }

    /* ----- Inner (block edit) modal ----- */
    .inner-backdrop {
      position: absolute; inset: 0;
      background: rgba(0, 0, 0, 0.45);
      display: flex; align-items: center; justify-content: center;
      padding: 24px;
      animation: fade-in 0.14s ease;
      z-index: 10;
    }
    .inner-dialog {
      background: var(--card-background-color, var(--primary-background-color, #fff));
      border-radius: 14px;
      width: min(100%, 420px);
      max-height: calc(100vh - 120px);
      display: flex; flex-direction: column; overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      animation: pop-in 0.18s cubic-bezier(0.2, 0.9, 0.3, 1.1);
    }
    .inner-body {
      padding: 14px 20px; overflow-y: auto; flex: 1;
      display: flex; flex-direction: column; gap: 14px;
    }
    .field {
      display: flex; flex-direction: column; gap: 4px;
      font-size: 13px; color: var(--primary-text-color);
    }
    .field > span { font-weight: 500; }
    .field small {
      font-weight: 400; color: var(--secondary-text-color);
      margin-left: 6px;
    }
    .field input[type="time"],
    .field textarea {
      font: inherit; font-size: 14px;
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      background: var(--secondary-background-color, #fafafa);
      color: var(--primary-text-color);
    }
    .field textarea {
      resize: vertical; min-height: 80px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 12px;
    }
    .err {
      color: var(--error-color, #c62828);
      font-size: 12px;
    }

    @media (max-width: 700px) {
      .backdrop { padding: 0; }
      .dialog {
        border-radius: 0; width: 100%; height: 100%; max-height: 100%;
      }
      .day-col { width: 36px; font-size: 11px; }
      .day-track { height: 34px; }
    }
  `;
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
  // If the value was edited via minute-level UI and the caller wants to
  // retain the original seconds (round-trip), use them. Otherwise 00.
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
  // Native <input type="time" step="1"> returns "HH:MM:SS" or "HH:MM".
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
    // Only merge truly contiguous/overlapping blocks that carry no
    // `data` payload. Data-carrying blocks should stay distinct, since
    // their data may differ.
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
