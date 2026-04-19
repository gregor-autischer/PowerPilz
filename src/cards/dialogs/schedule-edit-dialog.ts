/**
 * Schedule edit dialog — a lightweight HA-style modal that embeds
 * `<ha-schedule-form>` (HA's native FullCalendar drag-and-drop editor)
 * and persists changes back to the linked schedule via the
 * `schedule/update` websocket command.
 *
 * `<ha-schedule-form>` is lazy-loaded in HA: it's only registered once
 * the user has opened the helper detail dialog at least once in the
 * current browser session. If it isn't registered yet when our dialog
 * opens, we show a fallback explaining how to activate it.
 */

import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import type { HomeAssistant } from "../../types";
import { tr, haLang } from "../../utils/i18n";

interface ScheduleBlock {
  from: string;
  to: string;
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
const HA_SCHEDULE_FORM_TAG = "ha-schedule-form";

export interface ScheduleEditDialogOptions {
  hass: HomeAssistant;
  /** Schedule entity id (e.g. `schedule.living_room_plan`). */
  scheduleEntityId: string;
  /** Optional display title. Falls back to entity friendly name. */
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
  @state() private _formReady = false;

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("keydown", this._onKeyDown);
    void this._init();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("keydown", this._onKeyDown);
  }

  private _onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "Escape" && !this._saving) {
      this._close();
    }
  };

  private async _init(): Promise<void> {
    this._formReady = !!customElements.get(HA_SCHEDULE_FORM_TAG);
    if (!this._formReady) {
      // Poll once more after a short delay — HA sometimes registers
      // form components asynchronously when their chunk loads.
      setTimeout(() => {
        if (!this._formReady && customElements.get(HA_SCHEDULE_FORM_TAG)) {
          this._formReady = true;
          this.requestUpdate();
        }
      }, 500);
    }
    await this._loadSchedule();
  }

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

      // Match by the slug portion of the entity_id.
      const slug = this.scheduleEntityId.split(".", 2)[1] ?? "";
      const friendlyName = this.hass.states?.[this.scheduleEntityId]?.attributes
        ?.friendly_name;

      let found = list.find((s) => s.id === slug);
      if (!found && friendlyName) {
        found = list.find((s) => s.name === friendlyName);
      }
      if (!found) {
        this._loadError = tr(lang, "schedule.edit_dialog.error_not_found", {
          entity: this.scheduleEntityId,
        });
      } else {
        // Clone so the form can mutate without affecting our copy until save.
        this._schedule = JSON.parse(JSON.stringify(found));
      }
    } catch (err) {
      this._loadError = String((err as Error)?.message || err);
    } finally {
      this._loading = false;
    }
  }

  private _handleFormChange = (event: CustomEvent<{ value: unknown }>): void => {
    const value = event.detail?.value;
    if (!value || typeof value !== "object") return;
    this._schedule = { ...(this._schedule ?? {}), ...(value as ScheduleData) };
  };

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
      this._close();
    } catch (err) {
      this._saving = false;
      this._loadError = String((err as Error)?.message || err);
    }
  }

  private _handleBackdropClick = (event: MouseEvent): void => {
    if (event.target === event.currentTarget && !this._saving) this._close();
  };

  private _openHelperConfigHint = (): void => {
    // Fire a HA `hass-more-info` for the schedule entity — opens the
    // default more-info dialog, which users can then use as an entry to
    // the helper-edit view. This also triggers the frontend to load
    // the schedule-related chunks, registering `ha-schedule-form` for
    // subsequent opens of our dialog.
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId: this.scheduleEntityId },
        bubbles: true,
        composed: true,
      })
    );
    this._close();
  };

  private _close(): void {
    if (this._closing) return;
    this._closing = true;
    setTimeout(() => this.remove(), 180);
  }

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
              ?disabled=${this._saving || !this._schedule || !this._formReady || !!this._loadError}
            >
              ${this._saving
                ? tr(lang, "common.saving") || "Saving…"
                : tr(lang, "common.save") || "Save"}
            </button>
          </footer>
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
    if (!this._formReady) {
      return html`
        <div class="msg">
          ${tr(lang, "schedule.edit_dialog.form_not_loaded")}
        </div>
        <div class="fallback-actions">
          <button class="flat" @click=${this._openHelperConfigHint}>
            ${tr(lang, "schedule.edit_dialog.open_native_info")}
          </button>
        </div>
      `;
    }

    // The `<ha-schedule-form>` custom element is registered lazily by
    // HA's frontend. Pass the schedule payload in and listen for
    // value-changed events to track user edits.
    const formHtml = `<${HA_SCHEDULE_FORM_TAG}></${HA_SCHEDULE_FORM_TAG}>`;
    void formHtml; // placate unused-expression lints
    return html`
      <div class="form-host">
        <ha-schedule-form
          .hass=${this.hass}
          .schedule=${this._schedule}
          @value-changed=${this._handleFormChange}
        ></ha-schedule-form>
      </div>
      ${this._schedule ? nothing : html`<div class="msg">—</div>`}
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
      background: var(--card-background-color, var(--primary-background-color, #fff));
      color: var(--primary-text-color, #212121);
      border-radius: 16px;
      box-shadow: 0 12px 48px rgba(0,0,0,0.3);
      width: min(100%, 1100px);
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
    header h2 {
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
    .form-host { width: 100%; }
    .form-host ha-schedule-form { display: block; width: 100%; }

    .msg {
      padding: 32px 8px; text-align: center;
      color: var(--secondary-text-color, #757575); font-size: 14px;
    }
    .msg.error { color: var(--error-color, #c62828); }
    .fallback-actions { display: flex; justify-content: center; margin-top: 4px; }

    footer {
      padding: 12px 16px;
      display: flex; justify-content: flex-end; gap: 8px;
      border-top: 1px solid var(--divider-color, rgba(0,0,0,0.08));
      background: var(--secondary-background-color, transparent);
    }
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

    @media (max-width: 700px) {
      .backdrop { padding: 0; }
      .dialog {
        border-radius: 0; width: 100%; height: 100%; max-height: 100%;
      }
    }
  `;
}

if (!customElements.get(DIALOG_TAG)) {
  customElements.define(DIALOG_TAG, PowerPilzScheduleEditDialog);
}

/**
 * Programmatically open the dialog. Appends it to document.body; the
 * element removes itself on save / cancel.
 */
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
