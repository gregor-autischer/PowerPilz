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
  seriesPointsFor,
  type NodeSeriesDescriptor
} from "../../utils/energy-series";
import {
  buildRunsFromSegments,
  fillAreaUnderPolyline,
  prepareCanvas,
  resolveCssColor,
  splitByThresholdSegments,
  strokePolyline,
  strokeSegmentedPolyline,
  type CanvasPoint,
  type CanvasValuePoint
} from "../../utils/chart-primitives";
import { mushroomIconStyle, resolveColor } from "../../utils/color";

const readString = (value: unknown): string | undefined => {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};
import {
  clampUnitDecimals,
  formatValueWithUnitScaling,
  parseConvertibleUnit,
  type UnitFormatOptions
} from "../../utils/unit-scaling";
import { readNumber, readUnit } from "../../utils/entity";

const TAG = "power-pilz-energy-node-zoom-overlay";
const OPEN_ANIMATION_MS = 280;
const CLOSE_ANIMATION_MS = 200;
/** History window — matches the small-node trend so the zoomed view
 *  shows literally the same curve, just bigger. */
const TREND_WINDOW_MS = 24 * 60 * 60 * 1000;
const LINE_WIDTH = 1.8;

interface BoundingRectLike {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface EnergyNodeZoomOptions {
  hass: HomeAssistant;
  config: LovelaceCardConfig;
  focusedNodeKey: string;
  /** Bounding rect of the node element the user tapped — used as the
   *  start frame of the FLIP animation. */
  originRect: DOMRect | BoundingRectLike;
  /** Bounding rect of the parent energy card. The zoom popover never
   *  expands outside this rect so it cannot overflow the dashboard
   *  tile. Falls back to the viewport if omitted. */
  cardRect?: DOMRect | BoundingRectLike;
}

/** Public API used by the energy card. */
export const openEnergyNodeZoomOverlay = (opts: EnergyNodeZoomOptions): void => {
  const overlay = document.createElement(TAG) as PowerPilzEnergyNodeZoomOverlay;
  overlay.hass = opts.hass;
  overlay.energyConfig = opts.config;
  overlay.focusedNodeKey = opts.focusedNodeKey;
  overlay.originRect = opts.originRect;
  overlay.cardRect = opts.cardRect;
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
  public originRect!: DOMRect | BoundingRectLike;

  @property({ attribute: false })
  public cardRect?: DOMRect | BoundingRectLike;

  @state() private _phase: "opening" | "open" | "closing" = "opening";
  @state() private _historyByEntity: Map<string, HistoryTrendPoint[]> = new Map();
  /** Hovered point in LOGICAL canvas coordinates (same space as
   *  `_lastCanvasPoints`). Converted to screen pixels at render time. */
  @state() private _hover?: { logicalX: number; logicalY: number; ts: number; value: number };

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
    // Zoom view plots the entity behind the clicked node, with one
    // intentional override: a battery node's chart plots the SOC
    // entity (when configured) so the trend matches the value shown
    // in the header (battery view shows SOC %, not power).
    const direct = this._series.find((s) => s.nodeKey === this.focusedNodeKey);
    if (this.focusedNodeKey === "battery") {
      this._focused = this._series.find((s) => s.nodeKey === "battery_percentage") ?? direct;
    } else if (this.focusedNodeKey === "battery_secondary") {
      this._focused = this._series.find((s) => s.nodeKey === "battery_secondary_percentage") ?? direct;
    } else {
      this._focused = direct;
    }
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

    const host = this.renderRoot as ParentNode & Element;
    const resolvedColor = resolveCssColor(host, this._focused.color);
    const threshold = this._thresholdConfig();

    if (threshold.threshold === null) {
      fillAreaUnderPolyline(area.ctx, canvasPoints, resolvedColor, area.height, 0.24, 0, this._colorCache);
      strokePolyline(line.ctx, canvasPoints, resolvedColor, LINE_WIDTH);
    } else {
      // Bichromatic rendering for thresholds (grid export, battery low).
      // Same approach the small node uses: split at the crossing, fill
      // each contiguous run with its own gradient, stroke per segment.
      const valuePoints: CanvasValuePoint[] = canvasPoints.map((p) => ({
        x: p.x, y: p.y, value: p.value
      }));
      const lowColor = resolveCssColor(host, threshold.color);
      const segments = splitByThresholdSegments(valuePoints, threshold.threshold);
      const runs = buildRunsFromSegments(segments);
      for (const run of runs) {
        fillAreaUnderPolyline(
          area.ctx,
          run.points,
          run.low ? lowColor : resolvedColor,
          area.height,
          0.24,
          0,
          this._colorCache
        );
      }
      strokeSegmentedPolyline(line.ctx, segments, resolvedColor, lowColor, LINE_WIDTH);
    }

    this._lastCanvasPoints = canvasPoints;
    this._lastCanvasSize = { width: area.width, height: area.height };
  }

  /**
   * Returns the per-node threshold + color override that the small
   * node uses for bichromatic rendering, or `{threshold: null}` when
   * no threshold applies for the focused node.
   *
   * - Grid / Grid 2: when `*_export_highlight` is on, samples below 0
   *   render in `*_export_trend_color`.
   * - Battery / Battery 2 (zoomed → SOC chart): when
   *   `*_low_alert` is on AND we're plotting a percentage entity,
   *   samples below `*_low_threshold` render in `*_low_alert_color`.
   */
  private _thresholdConfig(): { threshold: number | null; color: string } {
    const config = this.energyConfig as Record<string, unknown>;
    const node = this.focusedNodeKey;
    const GRID_EXPORT_THRESHOLD = -0.000001;

    if (node === "grid" && config.grid_export_highlight === true) {
      return {
        threshold: GRID_EXPORT_THRESHOLD,
        color: resolveColor(
          (config.grid_export_trend_color as string | number[] | undefined) ?? "red",
          "red"
        )
      };
    }
    if (node === "grid_secondary" && config.grid_secondary_export_highlight === true) {
      return {
        threshold: GRID_EXPORT_THRESHOLD,
        color: resolveColor(
          (config.grid_secondary_export_trend_color as string | number[] | undefined) ?? "red",
          "red"
        )
      };
    }
    if ((node === "battery" || node === "battery_secondary")
        && this._focused?.isPercentage
        && config[`${node}_low_alert`] === true) {
      const rawThreshold = config[`${node}_low_threshold`];
      const threshold = typeof rawThreshold === "number" && Number.isFinite(rawThreshold)
        ? Math.max(0, Math.min(100, rawThreshold))
        : 20;
      return {
        threshold,
        color: resolveColor(
          (config[`${node}_low_alert_color`] as string | number[] | undefined) ?? "red",
          "red"
        )
      };
    }
    return { threshold: null, color: "" };
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
    const logicalX = (localX / rect.width) * this._lastCanvasSize.width;
    const nearest = this._nearestPoint(logicalX);
    if (!nearest) {
      if (this._hover) this._hover = undefined;
      return;
    }
    this._hover = {
      logicalX: nearest.x,
      logicalY: nearest.y,
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
      return html`<div class="pp-zoom-catcher" @click=${this._onBackdropClick}></div>`;
    }

    // Popover sizing & placement: the popover stays inside the parent
    // energy card's bounding rect (so it never escapes the dashboard
    // tile), is sized at ~2x the original node up to the available
    // space, and is centered on the original node — then clamped so
    // the entire popover fits inside the card. If a node sits at the
    // bottom of the card, the popover therefore shifts upward.
    const card = this._effectiveContainerRect();
    const PAD = 6;
    const SCALE = 2;
    const originCenterX = this.originRect.left + this.originRect.width / 2;
    const originCenterY = this.originRect.top + this.originRect.height / 2;
    const maxW = Math.max(this.originRect.width, card.width - PAD * 2);
    const maxH = Math.max(this.originRect.height, card.height - PAD * 2);
    const targetWidth = Math.min(maxW, this.originRect.width * SCALE);
    const targetHeight = Math.min(maxH, this.originRect.height * SCALE);
    let targetLeft = originCenterX - targetWidth / 2;
    let targetTop = originCenterY - targetHeight / 2;
    targetLeft = Math.max(card.left + PAD, Math.min(card.left + card.width - targetWidth - PAD, targetLeft));
    targetTop = Math.max(card.top + PAD, Math.min(card.top + card.height - targetHeight - PAD, targetTop));

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

    const view = this._buildView();

    return html`
      <div
        class="pp-zoom-catcher"
        @click=${this._onBackdropClick}
      >
        <div
          class="pp-zoom-shell ${this._focused.category}"
          style=${styleMap(shellStyle)}
          @click=${(e: MouseEvent) => e.stopPropagation()}
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
            <ha-icon
              class="pp-zoom-icon"
              .icon=${view.iconName}
              style=${styleMap(view.iconStyle)}
            ></ha-icon>
            <div class="pp-zoom-value">${this._displayValueText(view.formattedValue)}</div>
            <div class="pp-zoom-label">${view.label}</div>
          </div>
          ${this._renderHoverDot()}
        </div>
      </div>
    `;
  }

  /** Renders just a small dot at the hovered data point. The value is
   *  shown via `_displayValueText` in the header (graph-card UX).
   *
   *  The dot is a sibling of the trend canvases inside the shell, all
   *  filling the shell from corner to corner (`.pp-zoom-trend` uses
   *  `inset: 0` and the canvas inside has 100% width/height with no
   *  margin or padding). That means the canvas's content-box origin is
   *  at the shell's `(0, 0)`, so we can map logical canvas coordinates
   *  to shell-local pixels with a simple ratio — no offsetParent walk
   *  needed. */
  private _renderHoverDot(): TemplateResult | typeof nothing {
    if (!this._hover || !this._focused) return nothing;
    const canvas = this.renderRoot.querySelector<HTMLCanvasElement>(".pp-zoom-area");
    if (!canvas) return nothing;
    const { width, height } = this._lastCanvasSize;
    if (width <= 0 || height <= 0) return nothing;
    const layoutW = canvas.offsetWidth || canvas.getBoundingClientRect().width;
    const layoutH = canvas.offsetHeight || canvas.getBoundingClientRect().height;
    const xPx = (this._hover.logicalX / width) * layoutW;
    const yPx = (this._hover.logicalY / height) * layoutH;
    return html`
      <div
        class="pp-zoom-hover-dot"
        aria-hidden="true"
        style=${styleMap({
          left: `${xPx}px`,
          top: `${yPx}px`,
          background: this._focused.color
        })}
      ></div>
    `;
  }

  /** Header value text: live state when not hovering, hovered value
   *  + timestamp during hover. Hover formatting uses the same auto-
   *  scaling and decimal options the small node would use, so a
   *  paused-on-trend header reads the same way as the live one. */
  private _displayValueText(liveValue: string): string {
    if (!this._hover || !this._focused) return liveValue;
    const config = this.energyConfig as Record<string, unknown>;
    const decimals = this._configDecimals(config);
    const formatted = formatValueWithUnitScaling(
      this._hover.value,
      this._focused.unit,
      decimals,
      this._unitFormatOptions(config)
    );
    return `${formatted} · ${_formatHoverTime(this._hover.ts)}`;
  }

  private _areaCanvasRect(): DOMRect {
    const c = this.renderRoot.querySelector<HTMLCanvasElement>(".pp-zoom-area");
    return c?.getBoundingClientRect() ?? new DOMRect(0, 0, 1, 1);
  }

  /** The container the popover must stay inside. Falls back to the
   *  viewport when no card rect was provided (e.g. unit tests). */
  private _effectiveContainerRect(): { left: number; top: number; width: number; height: number } {
    if (this.cardRect) {
      return {
        left: this.cardRect.left,
        top: this.cardRect.top,
        width: this.cardRect.width,
        height: this.cardRect.height
      };
    }
    return { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
  }

  // ------------------------------------------------------------
  // View construction — mirrors the small node's render-time logic so
  // the zoomed shell shows the SAME icon, color, formatted value and
  // label that the user sees on the energy card. Anything that affects
  // the small node visually has to be reflected here.
  // ------------------------------------------------------------

  private _buildView(): {
    iconName: string;
    iconStyle: Record<string, string>;
    formattedValue: string;
    label: string;
  } {
    const focused = this._focused!;
    const config = this.energyConfig as Record<string, unknown>;
    const formatOpts = this._unitFormatOptions(config);
    const decimals = this._configDecimals(config);

    // Branch on the ORIGINAL clicked node key — `_focused` may have
    // been swapped to the SOC descriptor for batteries, but the view
    // logic needs to know it's still a battery node so it picks the
    // dynamic battery icon and SOC formatting.
    if (this.focusedNodeKey === "battery" || this.focusedNodeKey === "battery_secondary") {
      return this._buildBatteryView(this.focusedNodeKey, config, focused.label);
    }
    return this._buildPowerView(focused, config, formatOpts, decimals);
  }

  private _configDecimals(config: Record<string, unknown>): number {
    const raw = config.decimals;
    if (typeof raw === "number" && Number.isFinite(raw)) {
      return Math.min(3, Math.max(0, Math.round(raw)));
    }
    return 1;
  }

  private _unitFormatOptions(config: Record<string, unknown>): UnitFormatOptions {
    const decimals = this._configDecimals(config);
    return {
      enabled: config.auto_scale_units === true,
      baseDecimals: clampUnitDecimals(config.decimals_base_unit, decimals),
      prefixedDecimals: clampUnitDecimals(config.decimals_prefixed_unit, decimals),
      nullWithUnit: true
    };
  }

  /** Power/energy nodes — also handles auto-calculated home/solar by
   *  replaying the descriptor's compute spec on current entity states. */
  private _buildPowerView(
    focused: NodeSeriesDescriptor,
    config: Record<string, unknown>,
    formatOpts: UnitFormatOptions,
    decimals: number
  ): { iconName: string; iconStyle: Record<string, string>; formattedValue: string; label: string } {
    const liveValue = this._liveValueOf(focused);
    const formattedValue = formatValueWithUnitScaling(liveValue, focused.unit, decimals, formatOpts);

    const iconName = (config[`${focused.nodeKey}_icon`] as string | undefined) ?? this._fallbackIcon(focused.nodeKey);

    // Grid nodes flip to the export icon color when their live value is
    // negative AND the user enabled the export-icon-highlight option.
    let iconColorValue = config[`${focused.nodeKey}_icon_color`];
    const exportsToGrid = liveValue !== null && Number.isFinite(liveValue) && liveValue < 0;
    if (focused.nodeKey === "grid"
        && config.grid_export_icon_highlight === true
        && exportsToGrid) {
      iconColorValue = config.grid_export_icon_color ?? "red";
    } else if (focused.nodeKey === "grid_secondary"
        && config.grid_secondary_export_icon_highlight === true
        && exportsToGrid) {
      iconColorValue = config.grid_secondary_export_icon_color ?? "red";
    }

    return {
      iconName,
      iconStyle: mushroomIconStyle(iconColorValue as string | number[] | undefined),
      formattedValue,
      label: focused.label
    };
  }

  /** Battery nodes — show the SOC value, the dynamic battery icon
   *  reflecting both charge direction and SOC level, and the low-alert
   *  color override when the configured threshold is reached. */
  private _buildBatteryView(
    nodeKey: "battery" | "battery_secondary",
    config: Record<string, unknown>,
    fallbackLabel: string
  ): { iconName: string; iconStyle: Record<string, string>; formattedValue: string; label: string } {
    const pctEntityKey = nodeKey === "battery" ? "battery_percentage_entity" : "battery_secondary_percentage_entity";
    const powerEntityKey = nodeKey === "battery" ? "battery_entity" : "battery_secondary_entity";
    const iconKey = `${nodeKey}_icon`;
    const iconColorKey = `${nodeKey}_icon_color`;
    const lowAlertKey = `${nodeKey}_low_alert`;
    const lowThresholdKey = `${nodeKey}_low_threshold`;
    const lowAlertColorKey = `${nodeKey}_low_alert_color`;

    const pctEntity = readString(config[pctEntityKey]);
    const powerEntity = readString(config[powerEntityKey]);
    const powerUnit = powerEntity ? readUnit(this.hass, powerEntity) : undefined;
    const isPctUnit = typeof powerUnit === "string" && powerUnit.trim() === "%";

    const pctValue = pctEntity ? readNumber(this.hass, pctEntity) : null;
    const powerValue = powerEntity ? readNumber(this.hass, powerEntity) : null;

    // Resolved SOC (mirrors energy-card.resolveBatteryPercentage).
    const soc = pctValue !== null
      ? pctValue
      : (isPctUnit ? powerValue : null);

    const formattedValue = soc !== null
      ? `${Math.round(Math.max(0, Math.min(100, soc)))}%`
      : "—";

    // Charge direction is read from the raw power entity. When the
    // power "entity" itself reports percentage units, the small node
    // skips this hint — match that behaviour exactly.
    const iconName = this._batteryIcon(
      soc,
      isPctUnit ? null : powerValue,
      config[iconKey] as string | undefined
    );

    // Low-alert color override.
    const lowEnabled = config[lowAlertKey] === true;
    const lowThreshold = this._normalizeBatteryThreshold(config[lowThresholdKey]);
    const isLow = lowEnabled && soc !== null && soc <= lowThreshold;
    const iconColorValue = isLow
      ? (config[lowAlertColorKey] ?? "red")
      : config[iconColorKey];

    const labelText = readString(config[`${nodeKey}_label`]) ?? fallbackLabel;

    return {
      iconName,
      iconStyle: mushroomIconStyle(iconColorValue as string | number[] | undefined),
      formattedValue,
      label: labelText
    };
  }

  /** Mirrors energy-card.batteryIcon. Different MDI variants by SOC
   *  bucket; charging gets its own icon regardless of level. */
  private _batteryIcon(
    percentage: number | null,
    batteryPower: number | null,
    fallbackIcon: string | undefined
  ): string {
    const EPSILON = 0.01;
    if (batteryPower !== null && batteryPower > EPSILON) {
      return "mdi:battery-charging";
    }
    if (percentage === null) {
      return fallbackIcon ?? "mdi:battery-outline";
    }
    const clamped = Math.max(0, Math.min(100, percentage));
    if (clamped < 5) return "mdi:battery-outline";
    if (clamped >= 95) return "mdi:battery";
    const step = Math.max(10, Math.min(90, Math.round(clamped / 10) * 10));
    return `mdi:battery-${step}`;
  }

  private _normalizeBatteryThreshold(value: unknown): number {
    if (typeof value !== "number" || !Number.isFinite(value)) return 20;
    return Math.max(0, Math.min(100, value));
  }

  /** Live value for a non-battery descriptor. Replays auto-calc on
   *  current entity states for home/solar when the descriptor was
   *  built with a compute spec, so the zoom header shows the same
   *  computed value the small node displays. */
  private _liveValueOf(focused: NodeSeriesDescriptor): number | null {
    if (focused.computed) {
      let canonical = 0;
      let outputFamily: "power" | "energy" | null = null;
      for (const depId of focused.computed.dependencies) {
        const stateVal = readNumber(this.hass, depId);
        if (stateVal === null) return null;
        const depUnit = focused.computed.unitsByEntityId[depId] ?? "";
        const sign = focused.computed.signsByEntityId[depId] ?? 1;
        const parsed = parseConvertibleUnit(depUnit);
        const factor = parsed?.factor ?? 1;
        canonical += sign * stateVal * factor;
        outputFamily ??= parsed?.family ?? null;
      }
      const outputParsed = parseConvertibleUnit(focused.computed.outputUnit);
      const outputFactor = outputParsed && outputParsed.family === outputFamily
        ? outputParsed.factor
        : 1;
      return outputFactor > 0 ? canonical / outputFactor : canonical;
    }
    return readNumber(this.hass, focused.entityId);
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

  // ------------------------------------------------------------
  // Styles (mirror energy-card .energy-value visual at a larger scale)
  // ------------------------------------------------------------

  static styles: CSSResultGroup = css`
    :host {
      position: fixed;
      inset: 0;
      z-index: 10000;
      font-family: var(--paper-font-body1_-_font-family, inherit);
      /* Mirror the energy-card's :host vars so the inner content has
         the exact same typography, icon size and shape colors as the
         small node. */
      --card-primary-font-size: var(--mush-card-primary-font-size, 14px);
      --card-secondary-font-size: var(--mush-card-secondary-font-size, 12px);
      --card-primary-font-weight: var(--mush-card-primary-font-weight, 500);
      --card-secondary-font-weight: var(--mush-card-secondary-font-weight, 400);
      --card-primary-line-height: var(--mush-card-primary-line-height, 20px);
      --card-secondary-line-height: var(--mush-card-secondary-line-height, 16px);
      --icon-size: var(--mush-icon-size, 36px);
      --icon-symbol-size: var(--mush-icon-symbol-size, 0.667em);
      --icon-color: var(--primary-text-color);
    }

    /* Transparent click-catcher so taps outside the shell close the
       popover, but the page underneath stays fully visible. */
    .pp-zoom-catcher {
      position: fixed;
      inset: 0;
      background: transparent;
    }

    /* The shell mirrors .energy-value styling from the card, scaled up,
       and floats like a dropdown anchored on the clicked node. */
    .pp-zoom-shell {
      position: fixed;
      box-sizing: border-box;
      border-radius: 16px;
      background: var(--ha-card-background, var(--card-background-color, #fff));
      border: 1px solid rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.1);
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.22);
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

    /* Header bar at the top: icon left, value middle, label right.
       Same font and icon sizes as the small node's content so the
       text feels identical, just laid out horizontally to take
       advantage of the wider zoomed shell. The trend canvases
       continue to fill the entire shell behind this header. */
    .pp-zoom-content {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      box-sizing: border-box;
      pointer-events: none; /* clicks fall through to backdrop catcher */
    }
    .pp-zoom-icon {
      --mdc-icon-size: calc(var(--icon-size) * 0.667);
      color: var(--icon-color);
      flex: none;
      display: flex;
      line-height: 0;
    }
    .pp-zoom-value {
      font-size: var(--card-primary-font-size);
      line-height: var(--card-primary-line-height);
      font-weight: var(--card-primary-font-weight);
      color: var(--primary-text-color);
      letter-spacing: 0.1px;
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }
    .pp-zoom-label {
      margin-left: auto;
      font-size: var(--card-secondary-font-size);
      line-height: var(--card-secondary-line-height);
      font-weight: var(--card-secondary-font-weight);
      color: var(--secondary-text-color);
      letter-spacing: 0.4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-left: 8px;
    }

    /* Hover indicator: a small dot at the data point — same look as
       the graph card's hover-dot. The header value swap (handled in
       _displayValueText) carries the actual reading. */
    .pp-zoom-hover-dot {
      position: absolute;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 0 2px var(--card-background-color, #fff);
      pointer-events: none;
      z-index: 2;
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

