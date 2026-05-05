/**
 * Tap-zoom overlay for an Energy Card main node.
 *
 * Renders an enlarged clone of the clicked node's visual: the same
 * rounded card with a filled trend curve in the background and a
 * compact header row of icon + value + label on top — just bigger.
 * On hover the user gets a vertical guide line and a tooltip with the
 * value at the cursor's timestamp, like in the graph cards.
 *
 * The opening animation is a FLIP-style transform: the shell starts
 * positioned at the original node's bounding rect and CSS-transitions
 * to the centered, larger size. Backdrop tap or ESC reverses it.
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
import {
  prepareCanvas,
  fillAreaUnderPolyline,
  resolveCssColor,
  strokePolyline,
  type CanvasPoint
} from "../../utils/chart-primitives";
import { mushroomIconStyle } from "../../utils/color";
import { formatValueWithUnitScaling } from "../../utils/unit-scaling";

const TAG = "power-pilz-energy-node-zoom-overlay";
const OPEN_ANIMATION_MS = 280;
const CLOSE_ANIMATION_MS = 200;
/** History window — matches the small-node trend so the zoomed view
 *  shows literally the same curve, just bigger. */
const TREND_WINDOW_MS = 24 * 60 * 60 * 1000;
const LINE_WIDTH = 1.8;

export interface EnergyNodeZoomOptions {
  hass: HomeAssistant;
  config: LovelaceCardConfig;
  focusedNodeKey: string;
  /** Bounding rect of the node element the user tapped — used as the
   *  start frame of the FLIP animation. */
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
  @state() private _hover?: { canvasX: number; canvasY: number; ts: number; value: number };

  private _series: NodeSeriesDescriptor[] = [];
  private _focused: NodeSeriesDescriptor | undefined;
  private _renderRaf?: number;
  private _resizeObserver?: ResizeObserver;
  private _liveTimer?: number;
  private _fetchAbort = 0;
  private _colorCache: { ctx?: CanvasRenderingContext2D | null } = {};
  /** Last-rendered canvas-space points for the focused series. Used by
   *  the pointer handler to derive the hover timestamp/value without
   *  re-running the projection math. */
  private _lastCanvasPoints: ReadonlyArray<CanvasPoint & { ts: number; value: number }> = [];
  private _lastCanvasSize = { width: 0, height: 0 };

  // ------------------------------------------------------------
  // Lifecycle
  // ------------------------------------------------------------

  connectedCallback(): void {
    super.connectedCallback();
    this._series = collectEnergySeries(this.hass, this.energyConfig);
    this._focused = resolveFocusedSeries(this._series, this.focusedNodeKey);
    document.addEventListener("keydown", this._onKeyDown);
    void this._fetchHistory();
    // Refresh the live value text every 30s.
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
    requestAnimationFrame(() => {
      this._phase = "open";
    });

    const areaCanvas = this.renderRoot.querySelector<HTMLCanvasElement>(".pp-zoom-area");
    if (areaCanvas) {
      this._resizeObserver = new ResizeObserver(() => this._scheduleRender());
      this._resizeObserver.observe(areaCanvas);
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

    // 24h fits comfortably in the hybrid (history + statistics) path.
    const dataSource: TrendDataSource = "hybrid";
    const startMs = Date.now() - TREND_WINDOW_MS;

    try {
      const result = await fetchHistoryTrendPointsBatch(
        this.hass,
        ids,
        TREND_WINDOW_MS,
        { startMs, dataSource }
      );
      if (myFetch !== this._fetchAbort) return;
      const next = new Map<string, HistoryTrendPoint[]>();
      for (const id of ids) next.set(id, result[id] ?? []);
      this._historyByEntity = next;
    } catch {
      /* Silently ignore — the zoom shell still shows the live value. */
    }
  }

  // ------------------------------------------------------------
  // Trend drawing — direct area + line, no axes (matches the small
  // node's visual exactly).
  // ------------------------------------------------------------

  private _scheduleRender(): void {
    if (this._renderRaf !== undefined) return;
    this._renderRaf = requestAnimationFrame(() => {
      this._renderRaf = undefined;
      this._renderTrend();
    });
  }

  private _renderTrend(): void {
    if (!this._focused) return;
    const areaCanvas = this.renderRoot.querySelector<HTMLCanvasElement>(".pp-zoom-area");
    const lineCanvas = this.renderRoot.querySelector<HTMLCanvasElement>(".pp-zoom-line");
    if (!areaCanvas || !lineCanvas) return;
    const area = prepareCanvas(areaCanvas);
    const line = prepareCanvas(lineCanvas);
    if (!area || !line) return;

    const points = seriesPointsFor(this._focused, this._historyByEntity);
    if (points.length < 2) {
      this._lastCanvasPoints = [];
      this._lastCanvasSize = { width: area.width, height: area.height };
      return;
    }

    const endMs = Date.now();
    const startMs = endMs - TREND_WINDOW_MS;
    const visible = points.filter((p) => p.ts >= startMs && p.ts <= endMs);
    const series = visible.length >= 2 ? visible : points;

    let min = Infinity;
    let max = -Infinity;
    for (const p of series) {
      if (!Number.isFinite(p.value)) continue;
      if (p.value < min) min = p.value;
      if (p.value > max) max = p.value;
    }
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
      this._lastCanvasPoints = [];
      return;
    }
    if (min === max) {
      const pad = Math.abs(min) * 0.1 || 1;
      min -= pad;
      max += pad;
    }
    // Slight headroom so the curve isn't pinned to the canvas edge.
    const yPad = (max - min) * 0.06;
    const yMin = min - yPad;
    const yMax = max + yPad;
    const yRange = yMax - yMin;
    const tRange = endMs - startMs;

    const canvasPoints = series
      .filter((p) => Number.isFinite(p.ts) && Number.isFinite(p.value))
      .map((p) => {
        const tNorm = Math.max(0, Math.min(1, (p.ts - startMs) / tRange));
        const vNorm = Math.max(0, Math.min(1, (p.value - yMin) / yRange));
        return {
          x: tNorm * area.width,
          y: (1 - vNorm) * area.height,
          ts: p.ts,
          value: p.value
        };
      });

    if (canvasPoints.length < 2) {
      this._lastCanvasPoints = [];
      return;
    }

    const resolvedColor = resolveCssColor(this.renderRoot as ParentNode & Element, this._focused.color);
    fillAreaUnderPolyline(area.ctx, canvasPoints, resolvedColor, area.height, 0.24, 0, this._colorCache);
    strokePolyline(line.ctx, canvasPoints, resolvedColor, LINE_WIDTH);

    this._lastCanvasPoints = canvasPoints;
    this._lastCanvasSize = { width: area.width, height: area.height };
  }

  // ------------------------------------------------------------
  // Hover
  // ------------------------------------------------------------

  private _onPointerMove = (event: PointerEvent): void => {
    const areaCanvas = this.renderRoot.querySelector<HTMLCanvasElement>(".pp-zoom-area");
    if (!areaCanvas || this._lastCanvasPoints.length < 2) return;
    const rect = areaCanvas.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;
    if (localX < 0 || localX > rect.width || localY < 0 || localY > rect.height) {
      if (this._hover) this._hover = undefined;
      return;
    }
    // Map back from rect-space to logical canvas-space for the lookup.
    const logicalX = (localX / rect.width) * this._lastCanvasSize.width;
    const nearest = this._nearestPoint(logicalX);
    if (!nearest) {
      if (this._hover) this._hover = undefined;
      return;
    }
    this._hover = {
      canvasX: localX,
      canvasY: (nearest.y / this._lastCanvasSize.height) * rect.height,
      ts: nearest.ts,
      value: nearest.value
    };
  };

  private _onPointerLeave = (): void => {
    if (this._hover) this._hover = undefined;
  };

  private _nearestPoint(logicalX: number): typeof this._lastCanvasPoints[number] | undefined {
    const points = this._lastCanvasPoints;
    if (points.length === 0) return undefined;
    // Binary search by x.
    let lo = 0;
    let hi = points.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (points[mid].x <= logicalX) lo = mid;
      else hi = mid;
    }
    const a = points[lo];
    const b = points[hi];
    if (!a) return b;
    if (!b) return a;
    return Math.abs(a.x - logicalX) <= Math.abs(b.x - logicalX) ? a : b;
  }

  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------

  protected render(): TemplateResult {
    if (!this._focused) {
      return html`<div class="pp-zoom-backdrop opening" @click=${this._onBackdropClick}></div>`;
    }

    // FLIP transform — start at the origin rect via translate+scale.
    const targetWidth = Math.min(window.innerWidth - 32, 720);
    const targetHeight = Math.min(window.innerHeight - 32, 460);
    const targetLeft = (window.innerWidth - targetWidth) / 2;
    const targetTop = (window.innerHeight - targetHeight) / 2;
    const opening = this._phase !== "open";
    const closing = this._phase === "closing";
    const collapse = opening || closing;
    const scaleX = this.originRect.width / targetWidth;
    const scaleY = this.originRect.height / targetHeight;
    const tx = this.originRect.left - targetLeft;
    const ty = this.originRect.top - targetTop;

    const shellStyle = {
      left: `${targetLeft}px`,
      top: `${targetTop}px`,
      width: `${targetWidth}px`,
      height: `${targetHeight}px`,
      transform: collapse
        ? `translate(${tx}px, ${ty}px) scale(${scaleX}, ${scaleY})`
        : "translate(0, 0) scale(1, 1)",
      transformOrigin: "0 0",
      opacity: closing ? "0" : "1"
    };

    const config = this.energyConfig as Record<string, unknown>;
    const focused = this._focused;
    const iconKey = this._iconConfigKey(focused.nodeKey);
    const iconName = (config[`${iconKey}_icon`] as string | undefined) ?? this._fallbackIcon(focused.nodeKey);
    const iconStyle = mushroomIconStyle(config[`${iconKey}_icon_color`] as string | number[] | undefined);
    const liveValue = this._liveValueText(focused);

    return html`
      <div
        class="pp-zoom-backdrop ${closing ? "closing" : ""} ${this._phase === "opening" ? "opening" : ""}"
        @click=${this._onBackdropClick}
      >
        <div
          class="pp-zoom-shell ${focused.category}"
          style=${styleMap(shellStyle)}
          @pointermove=${this._onPointerMove}
          @pointerleave=${this._onPointerLeave}
        >
          <div class="pp-zoom-trend" aria-hidden="true">
            <canvas class="pp-zoom-area"></canvas>
          </div>
          <div class="pp-zoom-line-layer" aria-hidden="true">
            <canvas class="pp-zoom-line"></canvas>
          </div>
          <div class="pp-zoom-content">
            <div class="pp-zoom-icon-shape" style=${styleMap(iconStyle)}>
              <ha-icon class="pp-zoom-icon" .icon=${iconName}></ha-icon>
            </div>
            <div class="pp-zoom-value">${liveValue}</div>
            <div class="pp-zoom-label">${focused.label}</div>
          </div>
          ${this._renderHoverOverlay()}
          <button class="pp-zoom-close" aria-label="Close" @click=${this._close}>
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>
      </div>
    `;
  }

  private _renderHoverOverlay(): TemplateResult | typeof nothing {
    if (!this._hover || !this._focused) return nothing;
    const { width, height } = this._lastCanvasSize;
    if (width <= 0 || height <= 0) return nothing;
    const xPct = (this._hover.canvasX / this._areaCanvasRect().width) * 100;
    const showOnRight = xPct < 60;
    return html`
      <div
        class="pp-zoom-hover-line"
        style=${styleMap({ left: `${xPct}%` })}
        aria-hidden="true"
      ></div>
      <div
        class="pp-zoom-tooltip ${showOnRight ? "right" : "left"}"
        style=${styleMap({
          left: showOnRight ? `${xPct}%` : "auto",
          right: showOnRight ? "auto" : `${100 - xPct}%`
        })}
      >
        <div class="pp-zoom-tooltip-time">${_formatHoverTime(this._hover.ts)}</div>
        <div class="pp-zoom-tooltip-row">
          <span class="pp-zoom-tooltip-swatch" style=${styleMap({ background: this._focused.color })}></span>
          <span class="pp-zoom-tooltip-label">${this._focused.label}</span>
          <span class="pp-zoom-tooltip-value">${_formatHoverValue(this._hover.value, this._focused.unit)}</span>
        </div>
      </div>
    `;
  }

  private _areaCanvasRect(): DOMRect {
    const c = this.renderRoot.querySelector<HTMLCanvasElement>(".pp-zoom-area");
    return c?.getBoundingClientRect() ?? new DOMRect(0, 0, 1, 1);
  }

  // ------------------------------------------------------------
  // Helpers (mirror the small node's icon/label semantics)
  // ------------------------------------------------------------

  private _iconConfigKey(nodeKey: string): string {
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
    return formatValueWithUnitScaling(num, focused.unit, 1, {
      enabled: (this.energyConfig as Record<string, unknown>).auto_scale_units === true,
      baseDecimals: 1,
      prefixedDecimals: 1,
      nullWithUnit: true
    });
  }

  // ------------------------------------------------------------
  // Styles (mirror energy-card .energy-value visual at a larger scale)
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

    /* The shell mirrors the .energy-value styling from the card, scaled up. */
    .pp-zoom-shell {
      position: fixed;
      box-sizing: border-box;
      border-radius: 18px;
      background: var(--ha-card-background, var(--card-background-color, #fff));
      border: 1px solid rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.1);
      box-shadow: 0 18px 60px rgba(0, 0, 0, 0.32);
      overflow: hidden;
      transition:
        transform ${OPEN_ANIMATION_MS}ms cubic-bezier(0.2, 0.85, 0.3, 1),
        opacity ${OPEN_ANIMATION_MS}ms ease;
      will-change: transform, opacity;
    }

    /* Trend canvases fill the entire shell behind the content — same z-order
       as in the small node. */
    .pp-zoom-trend,
    .pp-zoom-line-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
    }
    .pp-zoom-line-layer { opacity: 0.96; }
    .pp-zoom-area,
    .pp-zoom-line {
      width: 100%;
      height: 100%;
      display: block;
    }

    /* Top-row content: icon left, value next to it, label right. */
    .pp-zoom-content {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 18px 22px;
    }
    .pp-zoom-icon-shape {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--shape-color, rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05));
      flex: none;
    }
    .pp-zoom-icon {
      --mdc-icon-size: 28px;
      color: var(--icon-color, var(--primary-text-color));
      display: flex;
      line-height: 0;
    }
    .pp-zoom-value {
      font-size: 28px;
      font-weight: 600;
      line-height: 1.1;
      font-variant-numeric: tabular-nums;
      color: var(--primary-text-color);
      white-space: nowrap;
    }
    .pp-zoom-label {
      margin-left: auto;
      font-size: 14px;
      font-weight: 500;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-left: 12px;
    }

    .pp-zoom-close {
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 3;
      width: 28px;
      height: 28px;
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
    .pp-zoom-close ha-icon { --mdc-icon-size: 16px; }

    /* Hover overlay: vertical guide + floating tooltip. */
    .pp-zoom-hover-line {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 1px;
      background: var(--secondary-text-color, #757575);
      opacity: 0.55;
      pointer-events: none;
      transform: translateX(-0.5px);
      z-index: 2;
    }
    .pp-zoom-tooltip {
      position: absolute;
      top: 12px;
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
      z-index: 3;
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

    @media (max-width: 520px) {
      .pp-zoom-value { font-size: 22px; }
      .pp-zoom-icon-shape { width: 40px; height: 40px; }
      .pp-zoom-icon { --mdc-icon-size: 22px; }
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

// ---------- Hover formatting (kept local) ----------

const _pad2 = (n: number): string => String(n).padStart(2, "0");

const _formatHoverTime = (ts: number): string => {
  const date = new Date(ts);
  return `${_pad2(date.getDate())}.${_pad2(date.getMonth() + 1)}. `
    + `${_pad2(date.getHours())}:${_pad2(date.getMinutes())}`;
};

const _formatHoverValue = (value: number, unit: string): string => {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  const decimals = abs >= 100 ? 0 : abs >= 10 ? 1 : 2;
  const text = value.toFixed(decimals);
  return unit ? `${text} ${unit}` : text;
};
