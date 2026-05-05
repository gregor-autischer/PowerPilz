/**
 * Reusable PowerPilz dialog shell.
 *
 * Provides the common chrome used by every PowerPilz modal:
 *  - Full-viewport backdrop with fade animation
 *  - Centered card with pop-in animation, mobile-fullscreen below 700px
 *  - Header (title + close button), Body (scrollable), Footer (action row)
 *  - ESC-to-close, click-outside-to-close
 *  - Inner-modal layer for nested dialogs (e.g. confirm sub-modals)
 *
 * Subclasses extend `PowerPilzDialogBase` and implement `renderBody()` plus
 * optionally `renderFooter()` and `renderInner()`. They control the title via
 * `dialogTitle` and the maximum width via the `--ppd-max-width` CSS variable.
 */

import { LitElement, css, html, nothing, type CSSResultGroup, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";

const CLOSE_ANIMATION_MS = 180;

export abstract class PowerPilzDialogBase extends LitElement {
  @property({ type: String })
  public dialogTitle = "";

  @state() protected _closing = false;

  /** When true, ESC and backdrop clicks are ignored (e.g. while saving). */
  protected lockClose = false;

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("keydown", this._onKeyDown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("keydown", this._onKeyDown);
  }

  // ESC handling — subclasses can override `_handleEscape` to intercept
  // (for example to close an inner sub-modal first).
  private _onKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== "Escape" || this.lockClose) return;
    this._handleEscape(event);
  };

  protected _handleEscape(_event: KeyboardEvent): void {
    this.close();
  }

  // Close the dialog with the fade-out animation, then remove from DOM.
  public close(): void {
    if (this._closing) return;
    this._closing = true;
    setTimeout(() => this.remove(), CLOSE_ANIMATION_MS);
  }

  private _onBackdropClick = (event: MouseEvent): void => {
    if (event.target === event.currentTarget && !this.lockClose) this.close();
  };

  private _stopClick = (event: MouseEvent): void => {
    event.stopPropagation();
  };

  protected abstract renderBody(): TemplateResult | typeof nothing;

  protected renderFooter(): TemplateResult | typeof nothing {
    return nothing;
  }

  /** Render an inner sub-modal that lives above the main dialog. */
  protected renderInner(): TemplateResult | typeof nothing {
    return nothing;
  }

  protected renderHeaderExtras(): TemplateResult | typeof nothing {
    return nothing;
  }

  protected render(): TemplateResult {
    return html`
      <div
        class="ppd-backdrop ${this._closing ? "closing" : ""}"
        @click=${this._onBackdropClick}
      >
        <div
          class="ppd-dialog"
          role="dialog"
          aria-modal="true"
          aria-label=${this.dialogTitle}
          @click=${this._stopClick}
        >
          <header class="ppd-header">
            <h2 class="ppd-title">${this.dialogTitle}</h2>
            ${this.renderHeaderExtras()}
            <button
              class="ppd-close-x"
              aria-label="Close"
              @click=${() => this.close()}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </header>
          <div class="ppd-body">${this.renderBody()}</div>
          ${this._maybeFooter()}
          ${this.renderInner()}
        </div>
      </div>
    `;
  }

  private _maybeFooter(): TemplateResult | typeof nothing {
    const footer = this.renderFooter();
    if (footer === nothing) return nothing;
    return html`<footer class="ppd-footer">${footer}</footer>`;
  }

  static styles: CSSResultGroup = css`
    :host {
      position: fixed;
      inset: 0;
      z-index: 10000;
      font-family: var(--paper-font-body1_-_font-family, inherit);
      --ppd-max-width: 900px;
    }

    .ppd-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(2px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
      animation: ppd-fade-in 0.18s ease;
    }
    .ppd-backdrop.closing { animation: ppd-fade-out 0.15s ease forwards; }

    @keyframes ppd-fade-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes ppd-fade-out { from { opacity: 1; } to { opacity: 0; } }

    .ppd-dialog {
      position: relative;
      background: var(--card-background-color, var(--primary-background-color, #fff));
      color: var(--primary-text-color, #212121);
      border-radius: 16px;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3);
      width: min(100%, var(--ppd-max-width));
      max-height: calc(100vh - 48px);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: ppd-pop-in 0.22s cubic-bezier(0.2, 0.9, 0.3, 1.1);
    }
    @keyframes ppd-pop-in {
      from { opacity: 0; transform: translateY(10px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .ppd-header {
      padding: 14px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
    }
    .ppd-title {
      margin: 0;
      flex: 1;
      font-size: 18px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ppd-close-x {
      border: none;
      background: transparent;
      cursor: pointer;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--secondary-text-color);
    }
    .ppd-close-x:hover {
      background: color-mix(in srgb, currentColor 10%, transparent);
    }

    .ppd-body {
      padding: 16px 20px;
      overflow-y: auto;
      flex: 1;
      min-height: 200px;
    }

    .ppd-footer {
      padding: 12px 16px;
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
      background: var(--secondary-background-color, transparent);
    }

    /* Standard button styling shared across PowerPilz dialogs. */
    button.ppd-btn {
      font: inherit;
      font-size: 14px;
      font-weight: 500;
      padding: 8px 20px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: background 0.15s ease;
    }
    button.ppd-btn:disabled { opacity: 0.55; cursor: default; }
    button.ppd-btn.flat {
      background: transparent;
      color: var(--primary-text-color, #212121);
    }
    button.ppd-btn.flat:hover:not(:disabled) {
      background: color-mix(in srgb, currentColor 10%, transparent);
    }
    button.ppd-btn.primary {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    button.ppd-btn.primary:hover:not(:disabled) {
      background: color-mix(in srgb, var(--primary-color, #03a9f4) 90%, #000);
    }
    button.ppd-btn.danger {
      background: var(--error-color, #c62828);
      color: #fff;
    }
    button.ppd-btn.danger:hover:not(:disabled) {
      background: color-mix(in srgb, var(--error-color, #c62828) 85%, #000);
    }

    @media (max-width: 700px) {
      .ppd-backdrop { padding: 0; }
      .ppd-dialog {
        border-radius: 0;
        width: 100%;
        height: 100%;
        max-height: 100%;
      }
    }
  `;
}
