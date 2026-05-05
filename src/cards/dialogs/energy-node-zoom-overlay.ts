/**
 * Tap-zoom overlay for an Energy Card main node.
 *
 * On tap the node is rendered into a fixed-position container that
 * starts at the node's original on-screen rect and animates (FLIP-style
 * via CSS `transform`) to a centered, larger size. The enlarged view
 * keeps the node's icon, label and live value but adds a full-size
 * trend chart with a hover tooltip — the same primitives the detail
 * dialog uses, minus mode/range/entity controls.
 *
 * Tap on the dimmed backdrop (or ESC) reverses the animation and
 * removes the overlay from the DOM.
 */

import { LitElement, css, html, nothing, type CSSResultGroup, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import type { HomeAssistant, LovelaceCardConfig } from "../../types";
import {
  fetchHistoryTrendPointsBatch,
  type HistoryTrendPoint,
  type TrendDataSource
} from "../../utils/history";
import {
  collectEnergySeries,
  entityIdsForSeries,
  resolveFocusedSeries,
  seriesPointsFor,
  type NodeSeriesDescriptor
} from "../../utils/energy-series";
import { renderChart, type ChartContext } from "../../utils/chart-renderer";
import { mushroomIconStyle } from "../../utils/color";
import { formatValueWithUnitScaling } from "../../utils/unit-scaling";

const TAG = "power-pilz-energy-node-zoom-overlay";
const OPEN_ANIMATION_MS = 280;
const CLOSE_ANIMATION_MS = 200;
const DEFAULT_WINDOW_HOURS = 24 * 7;

export interface EnergyNodeZoomOptions {
  hass: HomeAssistant;
  config: LovelaceCardConfig;
  focusedNodeKey: string;
  /** Bounding rect of the node element the user tapped — the overlay
   *  uses it as the start frame of the zoom animation. */
  originRect: DOMRect | { left: number; top: number; width: number; height: number };
}

/** Public API used by the energy card. */
export const openEnergyNodeZoomOverlay = (opts: EnergyNodeZoomOptions): void => {
  const overlay = document.createElement(TAG) as PowerPilzEnergyNodeZoomOverlay;
  overlay.hass = opts.hass;
  overlay.energyConfig = opts.config;
  overlay.focusedNodeKey = opts.focusedNodeKey;
  overlay.originRect = opts.originRect;
  document.body.appendChild(overlay);
};

class PowerPilzEnergyNodeZoomOverlay extends LitElement {
  @property({ attribute: false })
  public hass!: HomeAssistant;

  @property({ attribute: false })
  public energyConfig!: LovelaceCardConfig;

  @property({ type: String })
  public focusedNodeKey = "";

  @property({ attribute: false })
  public originRect!: DOMRect | { left: number; top: number; width: number; height: number };

  @state() private _phase: "opening" | "open" | "closing" = "opening";
  @state() private _historyByEntity: Map<string, HistoryTrendPoint[]> = new Map();
  @state() private _hover?: { canvasX: number; ts: number };

  private _series: NodeSeriesDescriptor[] = [];
  private _focused: NodeSeriesDescriptor | undefined;
  private _renderRaf?: number;
  private _resizeObserver?: ResizeObserver;
  private _chartContext: ChartContext | null = null;
  private _canvasLogicalSize = { width: 0, height: 0 };
  private _fetchAbort = 0;
  private _liveTimer?: number;

  // ------------------------------------------------------------
  // Lifecycle
  // ------------------------------------------------------------

  connectedCallback(): void {
    super.connectedCallback();
    this._series = collectEnergySeries(this.hass, this.energyConfig);
    this._focused = resolveFocusedSeries(this._series, this.focusedNodeKey);
    document.addEventListener("keydown", this._onKeyDown);
    void this._fetchHistory();
    // Drive the live value (icon, kW number) like the card does — every
    // 30s is plenty for a focused view.
    this._liveTimer = window.setInterval(() => this.requestUpdate(), 30_000);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("keydown", this._onKeyDown);
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
    if (this._renderRaf !== undefined) {
      cancelAnimationFrame(this._renderRaf);
      this._renderRaf = undefined;
    }
    if (this._liveTimer !== undefined) {
      clearInterval(this._liveTimer);
      this._liveTimer = undefined;
    }
  }

  protected firstUpdated(): void {
    // After the initial render at the origin rect, flip phase to "open"
    // on the next frame so the CSS transition kicks in.
    requestAnimationFrame(() => {
      this._phase = "open";
    });

    const canvas = this.renderRoot.querySelector<HTMLCanvasElement>(".pp-zoom-canvas");
    if (canvas) {
      this._resizeObserver = new ResizeObserver(() => this._scheduleRender());
      this._resizeObserver.observe(canvas);
      this._scheduleRender();
    }
  }

  protected updated(): void {
    this._scheduleRender();
  }

  private _onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "Escape") this._close();
  };

  private _close(): void {
    if (this._phase === "closing") return;
    this._phase = "closing";
    setTimeout(() => this.remove(), CLOSE_ANIMATION_MS);
  }

  private _onBackdropClick = (event: MouseEvent): void => {
    if (event.target === event.currentTarget) this._close();
  };

  // ------------------------------------------------------------
  // Data
  // ------------------------------------------------------------

  private async _fetchHistory(): Promise<void> {
    const myFetch = ++this._fetchAbort;
    if (!this._focused) return;
    const ids = entityIdsForSeries([this._focused]);
    if (ids.length === 0) return;

    const windowMs = DEFAULT_WINDOW_HOURS * 3600 * 1000;
    const dataSource: TrendDataSource = windowMs > 48 * 3600 * 1000 ? "statistics" : "hybrid";
    const startMs = Date.now() - windowMs;

    try {
      const result = await fetchHistoryTrendPointsBatch(
        this.hass,
        ids,
        windowMs,
        { startMs, dataSource }
      );
      if (myFetch !== this._fetchAbort) return;
      const next = new Map<string, HistoryTrendPoint[]>();
      for (const id of ids) next.set(id, result[id] ?? []);
      this._historyByEntity = next;
    } catch {
      /* Silently ignore — the overlay still shows the live value. */
    }
  }

  // ------------------------------------------------------------
  // Chart
  // ------------------------------------------------------------

  private _scheduleRender(): void {
    if (this._renderRaf !== undefined) return;
    this._renderRaf = requestAnimationFrame(() => {
      this._renderRaf = undefined;
      this._renderChart();
    });
  }

  private _renderChart(): void {
    if (!this._focused) return;
    const canvas = this.renderRoot.querySelector<HTMLCanvasElement>(".pp-zoom-canvas");
    if (!canvas) return;
    const endMs = Date.now();
    const startMs = endMs - DEFAULT_WINDOW_HOURS * 3600 * 1000;
    const points = seriesPointsFor(this._focused, this._historyByEntity);
    this._chartContext = renderChart(canvas, {
      mode: "single",
      series: [{
        id: this._focused.id,
        label: this._focused.label,
        color: this._focused.color,
        unit: this._focused.unit,
        isPercentage: this._focused.isPercentage,
        points
      }],
      startMs,
      endMs,
      host: this.renderRoot as ParentNode & Element
    });
    const rect = canvas.getBoundingClientRect();
    this._canvasLogicalSize = {
      width: Math.max(1, rect.width),
      height: Math.max(1, rect.height)
    };
    if (this._hover && this._chartContext) {
      const x = this._chartContext.timestampToPixel(this._hover.ts);
      this._hover = { canvasX: x, ts: this._hover.ts };
    }
  }

  // ------------------------------------------------------------
  // Hover tooltip — same approach as the detail dialog
  // ------------------------------------------------------------

  private _onChartPointerMove = (event: PointerEvent): void => {
    if (!this._chartContext) return;
    const canvas = this.renderRoot.querySelector<HTMLCanvasElement>(".pp-zoom-canvas");
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;
    const ctx = this._chartContext;
    if (
      localX < ctx.innerLeft || localX > ctx.innerRight
      || localY < ctx.innerTop || localY > ctx.innerBottom
    ) {
      if (this._hover) this._hover = undefined;
      return;
    }
    this._hover = { canvasX: localX, ts: ctx.pixelToTimestamp(localX) };
  };

  private _onChartPointerLeave = (): void => {
    if (this._hover) this._hover = undefined;
  };

  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------

  protected render(): TemplateResult {
    if (!this._focused) {
      // No focusable series — render an empty closeable backdrop so the
      // user can dismiss without seeing a stuck overlay.
      return html`<div class="pp-zoom-backdrop" @click=${this._onBackdropClick}></div>`;
    }

    // FLIP transform: starting frame puts the shell at the origin rect's
    // exact size; the "open" phase removes the transform, letting the
    // shell snap to its centered, full-size CSS layout via transition.
    const targetWidth = Math.min(window.innerWidth - 32, 720);
    const targetHeight = Math.min(window.innerHeight - 32, 520);
    const targetLeft = (window.innerWidth - targetWidth) / 2;
    const targetTop = (window.innerHeight - targetHeight) / 2;

    const opening = this._phase !== "open";
    const closing = this._phase === "closing";
    const collapse = opening || closing;

    const startScaleX = this.originRect.width / targetWidth;
    const startScaleY = this.originRect.height / targetHeight;
    const startTranslateX = this.originRect.left - targetLeft;
    const startTranslateY = this.originRect.top - targetTop;

    const shellStyle = collapse
      ? {
          left: `${targetLeft}px`,
          top: `${targetTop}px`,
          width: `${targetWidth}px`,
          height: `${targetHeight}px`,
          transform: `translate(${startTranslateX}px, ${startTranslateY}px) scale(${startScaleX}, ${startScaleY})`,
          transformOrigin: "0 0",
          opacity: closing ? "0" : "1"
        }
      : {
          left: `${targetLeft}px`,
          top: `${targetTop}px`,
          width: `${targetWidth}px`,
          height: `${targetHeight}px`,
          transform: "translate(0, 0) scale(1, 1)",
          transformOrigin: "0 0",
          opacity: "1"
        };

    return html`
      <div
        class="pp-zoom-backdrop ${closing ? "closing" : ""} ${this._phase === "opening" ? "opening" : ""}"
        @click=${this._onBackdropClick}
      >
        <div class="pp-zoom-shell" style=${styleMap(shellStyle)}>
          ${this._renderHeader()}
          <div
            class="pp-zoom-chart-wrap"
            @pointermove=${this._onChartPointerMove}
            @pointerleave=${this._onChartPointerLeave}
          >
            <canvas class="pp-zoom-canvas"></canvas>
            ${this._renderHoverOverlay()}
          </div>
          <button class="pp-zoom-close" aria-label="Close" @click=${this._close}>
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>
      </div>
    `;
  }

  private _renderHeader(): TemplateResult {
    const focused = this._focused!;
    const config = this.energyConfig as Record<string, unknown>;
    const iconKey = `${this._iconConfigKey(focused.nodeKey)}_icon`;
    const fallbackIcon = this._fallbackIcon(focused.nodeKey);
    const icon = (config[iconKey] as string | undefined) ?? fallbackIcon;
    const iconColor = config[`${this._iconConfigKey(focused.nodeKey)}_icon_color`];
    const iconStyle = mushroomIconStyle(iconColor as string | number[] | undefined);
    const liveValue = this._liveValueText(focused);

    return html`
      <div class="pp-zoom-header">
        <div class="pp-zoom-icon-wrap" style=${styleMap(iconStyle)}>
          <ha-icon class="pp-zoom-icon" .icon=${icon}></ha-icon>
        </div>
        <div class="pp-zoom-text">
          <div class="pp-zoom-value">${liveValue}</div>
          <div class="pp-zoom-label">${focused.label}</div>
        </div>
      </div>
    `;
  }

  private _renderHoverOverlay(): TemplateResult | typeof nothing {
    if (!this._hover || !this._chartContext) return nothing;
    const ctx = this._chartContext;
    const { width, height } = this._canvasLogicalSize;
    if (width <= 0 || height <= 0) return nothing;
    const xPct = (this._hover.canvasX / width) * 100;
    const values = ctx.valuesAt(this._hover.ts).filter((entry) => Number.isFinite(entry.value));
    const showOnRight = xPct < 60;

    return html`
      <div class="pp-zoom-hover-line" style=${styleMap({ left: `${xPct}%` })} aria-hidden="true"></div>
      <div
        class="pp-zoom-tooltip ${showOnRight ? "right" : "left"}"
        style=${styleMap({
          left: showOnRight ? `${xPct}%` : "auto",
          right: showOnRight ? "auto" : `${100 - xPct}%`
        })}
      >
        <div class="pp-zoom-tooltip-time">${_formatHoverTime(this._hover.ts)}</div>
        ${values.length === 0
          ? html`<div class="pp-zoom-tooltip-row muted">—</div>`
          : values.map((entry) => html`
              <div class="pp-zoom-tooltip-row">
                <span class="pp-zoom-tooltip-swatch" style=${styleMap({ background: entry.resolvedColor })}></span>
                <span class="pp-zoom-tooltip-label">${entry.label}</span>
                <span class="pp-zoom-tooltip-value">${_formatHoverValue(entry.value, entry.rawUnit)}</span>
              </div>
            `)}
      </div>
    `;
  }

  // ------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------

  /** Maps a node key (which can be a sub-block like "home_sub_3") to the
   *  prefix used for icon/icon_color config keys in the energy card. */
  private _iconConfigKey(nodeKey: string): string {
    // For battery_percentage / battery_secondary_percentage we want the
    // matching battery node's icon, not a separate one.
    if (nodeKey === "battery_percentage") return "battery";
    if (nodeKey === "battery_secondary_percentage") return "battery_secondary";
    return nodeKey;
  }

  private _fallbackIcon(nodeKey: string): string {
    if (nodeKey.startsWith("solar")) return "mdi:weather-sunny";
    if (nodeKey.startsWith("grid_secondary")) return "mdi:transmission-tower";
    if (nodeKey.startsWith("grid")) return "mdi:transmission-tower";
    if (nodeKey.startsWith("home")) return "mdi:home-lightning-bolt";
    if (nodeKey.startsWith("battery_secondary")) return "mdi:battery-outline";
    if (nodeKey.startsWith("battery")) return "mdi:battery";
    return "mdi:flash";
  }

  private _liveValueText(focused: NodeSeriesDescriptor): string {
    const state = this.hass.states[focused.entityId];
    if (!state) return "—";
    const num = Number(state.state);
    if (!Number.isFinite(num)) return state.state;
    const unit = focused.unit;
    return formatValueWithUnitScaling(num, unit, 1, {
      enabled: (this.energyConfig as Record<string, unknown>).auto_scale_units === true,
      baseDecimals: 1,
      prefixedDecimals: 1,
      nullWithUnit: true
    });
  }

  // ------------------------------------------------------------
  // Styles
  // ------------------------------------------------------------

  static styles: CSSResultGroup = css`
    :host {
      position: fixed;
      inset: 0;
      z-index: 10000;
      font-family: var(--paper-font-body1_-_font-family, inherit);
    }

    .pp-zoom-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0);
      transition: background 0.22s ease;
    }
    .pp-zoom-backdrop.opening,
    .pp-zoom-backdrop.closing {
      background: rgba(0, 0, 0, 0);
    }
    .pp-zoom-backdrop:not(.opening):not(.closing) {
      background: rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(2px);
    }

    .pp-zoom-shell {
      position: fixed;
      background: var(--card-background-color, var(--primary-background-color, #fff));
      color: var(--primary-text-color);
      border-radius: 18px;
      box-shadow: 0 18px 60px rgba(0, 0, 0, 0.32);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transition:
        transform ${OPEN_ANIMATION_MS}ms cubic-bezier(0.2, 0.85, 0.3, 1),
        opacity ${OPEN_ANIMATION_MS}ms ease;
      will-change: transform, opacity;
    }

    .pp-zoom-header {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 18px 20px 6px;
    }
    .pp-zoom-icon-wrap {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--shape-color, rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05));
      flex: none;
    }
    .pp-zoom-icon {
      --mdc-icon-size: 32px;
      color: var(--icon-color, var(--primary-text-color));
    }
    .pp-zoom-text {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .pp-zoom-value {
      font-size: 28px;
      font-weight: 600;
      line-height: 1.1;
      font-variant-numeric: tabular-nums;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .pp-zoom-label {
      font-size: 14px;
      color: var(--secondary-text-color);
      margin-top: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .pp-zoom-chart-wrap {
      position: relative;
      flex: 1;
      min-height: 0;
      margin: 6px 16px 18px;
      border-radius: 14px;
      background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.04);
      overflow: hidden;
    }
    .pp-zoom-canvas {
      width: 100%;
      height: 100%;
      display: block;
    }

    .pp-zoom-close {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.06);
      color: var(--secondary-text-color);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .pp-zoom-close:hover {
      background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.12);
    }
    .pp-zoom-close ha-icon { --mdc-icon-size: 18px; }

    /* Hover overlay (mirrors the detail dialog tooltip styling). */
    .pp-zoom-hover-line {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 1px;
      background: var(--secondary-text-color, #757575);
      opacity: 0.55;
      pointer-events: none;
      transform: translateX(-0.5px);
    }
    .pp-zoom-tooltip {
      position: absolute;
      top: 8px;
      background: var(--card-background-color, var(--primary-background-color, #fff));
      color: var(--primary-text-color);
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 8px;
      padding: 8px 10px;
      font-size: 12px;
      line-height: 1.45;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
      pointer-events: none;
      max-width: 240px;
      min-width: 140px;
      z-index: 5;
    }
    .pp-zoom-tooltip.right { transform: translateX(8px); }
    .pp-zoom-tooltip.left { transform: translateX(-8px); }
    .pp-zoom-tooltip-time {
      font-weight: 600;
      margin-bottom: 4px;
      white-space: nowrap;
    }
    .pp-zoom-tooltip-row {
      display: flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
    }
    .pp-zoom-tooltip-row.muted { color: var(--secondary-text-color); }
    .pp-zoom-tooltip-swatch {
      width: 8px;
      height: 8px;
      border-radius: 2px;
      flex: none;
    }
    .pp-zoom-tooltip-label {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .pp-zoom-tooltip-value {
      font-variant-numeric: tabular-nums;
      font-weight: 500;
    }
  `;
}

if (!customElements.get(TAG)) {
  customElements.define(TAG, PowerPilzEnergyNodeZoomOverlay);
}

declare global {
  interface HTMLElementTagNameMap {
    [TAG]: PowerPilzEnergyNodeZoomOverlay;
  }
}

// ---------- Hover formatting (kept local, mirrors the detail dialog) ----------

const _pad2 = (n: number): string => String(n).padStart(2, "0");

const _formatHoverTime = (ts: number): string => {
  const date = new Date(ts);
  return `${_pad2(date.getDate())}.${_pad2(date.getMonth() + 1)}.${date.getFullYear()} `
    + `${_pad2(date.getHours())}:${_pad2(date.getMinutes())}`;
};

const _formatHoverValue = (value: number, unit: string): string => {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  const decimals = abs >= 100 ? 0 : abs >= 10 ? 1 : 2;
  const text = value.toFixed(decimals);
  return unit ? `${text} ${unit}` : text;
};
