/**
 * Energy node-detail dialog.
 *
 * Opened via long-press (or any explicit `powerpilz-energy-node-detail`
 * action) on a node of the PowerPilz Energy Flow Card. Shows the
 * historical trend of the focused node, plus optional overlay of any
 * other entity rendered on that card and a stacked-100% comparison view.
 *
 * Reuses `PowerPilzDialogBase` for the modal shell and
 * `chart-renderer.ts` for the canvas drawing.
 */

import { css, html, nothing, type CSSResultGroup, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import type { HomeAssistant, LovelaceCardConfig } from "../../types";
import {
  fetchHistoryTrendPointsBatch,
  type HistoryTrendPoint,
  type TrendDataSource
} from "../../utils/history";
import { resolveColor as resolveColorValue } from "../../utils/color";
import {
  renderChart,
  type ChartContext,
  type ChartMode,
  type ChartSeries
} from "../../utils/chart-renderer";
import { PowerPilzDialogBase } from "./dialog-shell";

const DIALOG_TAG = "power-pilz-energy-node-dialog";

/** Time-range presets exposed in the dialog header. */
interface RangePreset {
  id: string;
  label: string;
  hours: number;
}

const RANGE_PRESETS: RangePreset[] = [
  { id: "48h", label: "48 h", hours: 48 },
  { id: "7d", label: "7 d", hours: 24 * 7 },
  { id: "30d", label: "30 d", hours: 24 * 30 },
  { id: "90d", label: "90 d", hours: 24 * 90 },
  { id: "6m", label: "6 M", hours: 24 * 30 * 6 },
  { id: "1y", label: "1 J", hours: 24 * 365 }
];

const DEFAULT_PRESET_ID = "7d";

/** A single entity available for charting in the dialog. */
interface NodeSeriesDescriptor {
  /** Stable id (the entity_id when present, otherwise the synthesised key). */
  id: string;
  /** Logical node key (e.g. "solar", "home_sub_2", "battery_percentage"). */
  nodeKey: string;
  entityId: string;
  label: string;
  color: string;
  unit: string;
  isPercentage: boolean;
  /** True when this came from a sub-block — used purely for grouping in
   *  the entity selector UI. */
  isSubBlock: boolean;
  /** Display category for grouping (Solar / Grid / Home / Battery). */
  category: "solar" | "grid" | "grid_secondary" | "home" | "battery" | "battery_secondary" | "other";
}

export interface EnergyNodeDialogOptions {
  hass: HomeAssistant;
  config: LovelaceCardConfig;
  /** The node the user clicked — defaults the focused series and the
   *  dialog title. */
  focusedNodeKey: string;
}

/** Public API used by the energy card to open the dialog. */
export const openEnergyNodeDialog = (opts: EnergyNodeDialogOptions): void => {
  const dlg = document.createElement(DIALOG_TAG) as PowerPilzEnergyNodeDialog;
  dlg.hass = opts.hass;
  dlg.energyConfig = opts.config;
  dlg.focusedNodeKey = opts.focusedNodeKey;
  document.body.appendChild(dlg);
};

class PowerPilzEnergyNodeDialog extends PowerPilzDialogBase {
  @property({ attribute: false })
  public hass!: HomeAssistant;

  @property({ attribute: false })
  public energyConfig!: LovelaceCardConfig;

  @property({ type: String })
  public focusedNodeKey = "";

  @state() private _allSeries: NodeSeriesDescriptor[] = [];
  @state() private _selectedIds: Set<string> = new Set();
  @state() private _mode: ChartMode = "single";
  @state() private _presetId: string = DEFAULT_PRESET_ID;
  @state() private _useCustomRange = false;
  @state() private _customStartIso = "";
  @state() private _customEndIso = "";
  @state() private _historyByEntity: Map<string, HistoryTrendPoint[]> = new Map();
  @state() private _loading = false;
  @state() private _loadError?: string;
  @state() private _hover?: { canvasX: number; ts: number };
  @state() private _openPopover: "entities" | "date" | null = null;

  private _renderRaf?: number;
  private _resizeObserver?: ResizeObserver;
  private _fetchAbort = 0;
  private _chartContext: ChartContext | null = null;
  /** Logical canvas size used by the last render, kept for hit-testing
   *  pointermove events without re-querying the canvas rect each move. */
  private _canvasLogicalSize: { width: number; height: number } = { width: 0, height: 0 };

  // ------------------------------------------------------------
  // Lifecycle
  // ------------------------------------------------------------

  connectedCallback(): void {
    super.connectedCallback();
    this._allSeries = this._collectSeries();
    if (!this._customStartIso || !this._customEndIso) {
      const now = new Date();
      const start = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
      this._customEndIso = _toLocalIsoMinute(now);
      this._customStartIso = _toLocalIsoMinute(start);
    }
    this._selectedIds = new Set(this._defaultSelection().map((s) => s.id));
    this.dialogTitle = this._titleForFocusedNode();
    document.addEventListener("mousedown", this._onDocumentMouseDown, true);
    void this._fetchHistory();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("mousedown", this._onDocumentMouseDown, true);
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
    if (this._renderRaf !== undefined) {
      cancelAnimationFrame(this._renderRaf);
      this._renderRaf = undefined;
    }
  }

  /** Closes any open popover when the user clicks outside both its
   *  trigger and panel. Uses capture phase so we react before the
   *  trigger's own click handler that would re-open the popover. */
  private _onDocumentMouseDown = (event: MouseEvent): void => {
    if (this._openPopover === null) return;
    const path = event.composedPath();
    const stillInside = path.some((node) => {
      if (!(node instanceof HTMLElement)) return false;
      return node.dataset.ppPopover === this._openPopover
        || node.dataset.ppPopoverTrigger === this._openPopover;
    });
    if (!stillInside) this._openPopover = null;
  };

  private _togglePopover(name: "entities" | "date"): void {
    this._openPopover = this._openPopover === name ? null : name;
  }

  protected firstUpdated(): void {
    const canvas = this.renderRoot.querySelector<HTMLCanvasElement>(".pp-chart-canvas");
    if (canvas) {
      this._resizeObserver = new ResizeObserver(() => this._scheduleRender());
      this._resizeObserver.observe(canvas);
      this._scheduleRender();
    }
  }

  protected updated(): void {
    this._scheduleRender();
  }

  // ------------------------------------------------------------
  // Series collection from energy-card config
  // ------------------------------------------------------------

  private _readConfigString(value: unknown): string | undefined {
    if (typeof value !== "string") return undefined;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  private _collectSeries(): NodeSeriesDescriptor[] {
    const config = this.energyConfig as Record<string, unknown>;
    const out: NodeSeriesDescriptor[] = [];
    const states = this.hass.states;

    const push = (
      nodeKey: string,
      category: NodeSeriesDescriptor["category"],
      entityKey: string,
      labelKey: string | undefined,
      colorKey: string | undefined,
      isPercentage: boolean,
      isSubBlock: boolean
    ): void => {
      const entityId = this._readConfigString(config[entityKey]);
      if (!entityId) return;
      const label = this._readConfigString(labelKey ? config[labelKey] : undefined)
        ?? this._friendlyName(entityId)
        ?? entityId;
      const colorRaw = colorKey ? config[colorKey] : undefined;
      const color = this._resolveTrendColor(colorRaw, category);
      const unit = isPercentage
        ? "%"
        : (this._unit(entityId) ?? "");
      out.push({
        id: entityId,
        nodeKey,
        entityId,
        label,
        color,
        unit,
        isPercentage: isPercentage || unit === "%",
        isSubBlock,
        category
      });
    };

    if (config.solar_visible !== false) {
      push("solar", "solar", "solar_entity", "solar_label", "solar_trend_color", false, false);
    }
    if (config.grid_visible !== false) {
      push("grid", "grid", "grid_entity", "grid_label", "grid_trend_color", false, false);
      if (config.grid_secondary_visible === true) {
        push("grid_secondary", "grid_secondary", "grid_secondary_entity", "grid_secondary_label", "grid_secondary_trend_color", false, false);
      }
    }
    if (config.home_visible !== false) {
      push("home", "home", "home_entity", "home_label", "home_trend_color", false, false);
    }
    if (config.battery_visible !== false) {
      push("battery", "battery", "battery_entity", "battery_label", "battery_trend_color", false, false);
      const batteryPctEntity = this._readConfigString(config.battery_percentage_entity);
      if (batteryPctEntity) {
        out.push({
          id: batteryPctEntity,
          nodeKey: "battery_percentage",
          entityId: batteryPctEntity,
          label: `${this._readConfigString(config.battery_label) ?? "Battery"} %`,
          color: this._resolveTrendColor(undefined, "battery"),
          unit: "%",
          isPercentage: true,
          isSubBlock: false,
          category: "battery"
        });
      }
      if (config.battery_secondary_visible === true) {
        push("battery_secondary", "battery_secondary", "battery_secondary_entity", "battery_secondary_label", "battery_secondary_trend_color", false, false);
        const battery2PctEntity = this._readConfigString(config.battery_secondary_percentage_entity);
        if (battery2PctEntity) {
          out.push({
            id: battery2PctEntity,
            nodeKey: "battery_secondary_percentage",
            entityId: battery2PctEntity,
            label: `${this._readConfigString(config.battery_secondary_label) ?? "Battery 2"} %`,
            color: this._resolveTrendColor(undefined, "battery_secondary"),
            unit: "%",
            isPercentage: true,
            isSubBlock: false,
            category: "battery_secondary"
          });
        }
      }
    }

    // Sub-blocks: solar 1..4, grid 1..2, grid_secondary 1..2, home 1..8.
    const subSpecs: Array<{ prefix: NodeSeriesDescriptor["category"]; count: number; nodePrefix: string }> = [
      { prefix: "solar", count: 4, nodePrefix: "solar" },
      { prefix: "grid", count: 2, nodePrefix: "grid" },
      { prefix: "grid_secondary", count: 2, nodePrefix: "grid_secondary" },
      { prefix: "home", count: 8, nodePrefix: "home" }
    ];
    for (const spec of subSpecs) {
      for (let index = 1; index <= spec.count; index += 1) {
        const slot = `${spec.nodePrefix}_sub_${index}`;
        const enabled = config[`${slot}_enabled`] === true;
        if (!enabled) continue;
        push(
          slot,
          spec.prefix,
          `${slot}_entity`,
          `${slot}_label`,
          `${slot}_icon_color`,
          false,
          true
        );
      }
    }

    // De-duplicate by entityId — the same entity can appear under several
    // logical node keys (e.g. battery + battery_percentage), but for the
    // chart we want one series per entity.
    const seen = new Set<string>();
    return out.filter((descriptor) => {
      if (seen.has(descriptor.entityId)) return false;
      seen.add(descriptor.entityId);
      return true;
    });
  }

  private _friendlyName(entityId: string): string | undefined {
    const friendly = this.hass.states[entityId]?.attributes?.friendly_name;
    return typeof friendly === "string" && friendly.length > 0 ? friendly : undefined;
  }

  private _unit(entityId: string): string | undefined {
    const unit = this.hass.states[entityId]?.attributes?.unit_of_measurement;
    return typeof unit === "string" ? unit : undefined;
  }

  private _resolveTrendColor(value: unknown, category: NodeSeriesDescriptor["category"]): string {
    const fallbackByCategory: Record<NodeSeriesDescriptor["category"], string> = {
      solar: "amber",
      grid: "blue",
      grid_secondary: "indigo",
      home: "green",
      battery: "purple",
      battery_secondary: "deep-purple",
      other: "grey"
    };
    if (typeof value === "string" && value.trim().length > 0) {
      return resolveColorValue(value, fallbackByCategory[category]);
    }
    if (Array.isArray(value)) {
      return resolveColorValue(value as number[], fallbackByCategory[category]);
    }
    return resolveColorValue(fallbackByCategory[category], fallbackByCategory[category]);
  }

  private _titleForFocusedNode(): string {
    const focused = this._allSeries.find((s) => s.nodeKey === this.focusedNodeKey);
    if (focused) return focused.label;
    // Friendly fallback for a node key that has no entity (rare, but possible).
    const config = this.energyConfig as Record<string, unknown>;
    const labelKey = `${this.focusedNodeKey}_label`;
    const label = this._readConfigString(config[labelKey]);
    return label ?? this.focusedNodeKey;
  }

  private _defaultSelection(): NodeSeriesDescriptor[] {
    const focused = this._allSeries.find((s) => s.nodeKey === this.focusedNodeKey);
    return focused ? [focused] : this._allSeries.slice(0, 1);
  }

  // ------------------------------------------------------------
  // Range handling
  // ------------------------------------------------------------

  private _activeWindow(): { startMs: number; endMs: number } {
    if (this._useCustomRange) {
      const startMs = _parseLocalIso(this._customStartIso);
      const endMs = _parseLocalIso(this._customEndIso);
      if (startMs !== null && endMs !== null && endMs > startMs) {
        return { startMs, endMs };
      }
    }
    const preset = RANGE_PRESETS.find((p) => p.id === this._presetId) ?? RANGE_PRESETS[1];
    const endMs = Date.now();
    const startMs = endMs - preset.hours * 3600 * 1000;
    return { startMs, endMs };
  }

  /** True when the user has the custom range toggle on but their start
   *  / end inputs are not a valid window (start ≥ end or unparseable). */
  private _customRangeInvalid(): boolean {
    if (!this._useCustomRange) return false;
    const startMs = _parseLocalIso(this._customStartIso);
    const endMs = _parseLocalIso(this._customEndIso);
    return startMs === null || endMs === null || endMs <= startMs;
  }

  // ------------------------------------------------------------
  // History fetching
  // ------------------------------------------------------------

  private async _fetchHistory(): Promise<void> {
    const myFetch = ++this._fetchAbort;
    this._loading = true;
    this._loadError = undefined;
    const window = this._activeWindow();
    const windowMs = window.endMs - window.startMs;

    // Prefer statistics for ranges > 48h to keep the request small.
    const dataSource: TrendDataSource = windowMs > 48 * 3600 * 1000 ? "statistics" : "hybrid";

    const targetIds = this._activeEntityIds();
    if (targetIds.length === 0) {
      this._loading = false;
      this._historyByEntity = new Map();
      return;
    }

    try {
      const result = await fetchHistoryTrendPointsBatch(
        this.hass,
        targetIds,
        windowMs,
        { startMs: window.startMs, dataSource }
      );
      if (myFetch !== this._fetchAbort) return; // superseded
      const next = new Map<string, HistoryTrendPoint[]>();
      for (const id of targetIds) {
        next.set(id, result[id] ?? []);
      }
      this._historyByEntity = next;
    } catch (err) {
      if (myFetch !== this._fetchAbort) return;
      this._loadError = String((err as Error)?.message || err);
    } finally {
      if (myFetch === this._fetchAbort) {
        this._loading = false;
      }
    }
  }

  /** Entity ids that need fetching for the current selection + mode. */
  private _activeEntityIds(): string[] {
    const ids = new Set<string>();
    for (const id of this._selectedIds) ids.add(id);
    // Always include the focused series so the canvas keeps something
    // to draw even after the user un-checks it.
    const focused = this._allSeries.find((s) => s.nodeKey === this.focusedNodeKey);
    if (focused) ids.add(focused.entityId);
    return Array.from(ids);
  }

  // ------------------------------------------------------------
  // Chart rendering
  // ------------------------------------------------------------

  private _scheduleRender(): void {
    if (this._renderRaf !== undefined) return;
    this._renderRaf = requestAnimationFrame(() => {
      this._renderRaf = undefined;
      this._renderChart();
    });
  }

  private _renderChart(): void {
    const canvas = this.renderRoot.querySelector<HTMLCanvasElement>(".pp-chart-canvas");
    if (!canvas) return;
    const window = this._activeWindow();
    const seriesForChart = this._buildChartSeries();

    this._chartContext = renderChart(canvas, {
      mode: this._mode,
      series: seriesForChart,
      startMs: window.startMs,
      endMs: window.endMs,
      host: this.renderRoot as ParentNode & Element
    });
    const rect = canvas.getBoundingClientRect();
    this._canvasLogicalSize = {
      width: Math.max(1, rect.width),
      height: Math.max(1, rect.height)
    };

    // If we already have a hover, snap its timestamp to the new
    // pixel mapping so the line stays visually consistent.
    if (this._hover && this._chartContext) {
      const x = this._chartContext.timestampToPixel(this._hover.ts);
      this._hover = { canvasX: x, ts: this._hover.ts };
    }
  }

  private _buildChartSeries(): ChartSeries[] {
    const selectedDescriptors = this._allSeries.filter((s) => this._selectedIds.has(s.id));
    // Single mode: only the focused descriptor (or first selected).
    if (this._mode === "single") {
      const focused = this._allSeries.find((s) => s.nodeKey === this.focusedNodeKey)
        ?? selectedDescriptors[0];
      if (!focused) return [];
      return [this._descriptorToChartSeries(focused)];
    }
    return selectedDescriptors.map((d) => this._descriptorToChartSeries(d));
  }

  private _descriptorToChartSeries(d: NodeSeriesDescriptor): ChartSeries {
    return {
      id: d.id,
      label: d.label,
      color: d.color,
      unit: d.unit,
      isPercentage: d.isPercentage,
      points: this._historyByEntity.get(d.entityId) ?? []
    };
  }

  // ------------------------------------------------------------
  // UI handlers
  // ------------------------------------------------------------

  private _onPresetClick(presetId: string): void {
    this._presetId = presetId;
    this._useCustomRange = false;
    this._openPopover = null;
    void this._fetchHistory();
  }

  private _onCustomStartChange = (e: Event): void => {
    this._customStartIso = (e.target as HTMLInputElement).value;
    if (this._useCustomRange) void this._fetchHistory();
  };

  private _onCustomEndChange = (e: Event): void => {
    this._customEndIso = (e.target as HTMLInputElement).value;
    if (this._useCustomRange) void this._fetchHistory();
  };

  private _onModeChange(mode: ChartMode): void {
    this._mode = mode;
  }

  private _onToggleSeries(id: string): void {
    const next = new Set(this._selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    this._selectedIds = next;
    void this._fetchHistory();
  }

  private _onSelectAll(): void {
    this._selectedIds = new Set(this._allSeries.map((s) => s.id));
    void this._fetchHistory();
  }

  private _onSelectFocused(): void {
    const focused = this._allSeries.find((s) => s.nodeKey === this.focusedNodeKey);
    this._selectedIds = focused ? new Set([focused.id]) : new Set();
    void this._fetchHistory();
  }

  // ------------------------------------------------------------
  // Hover tooltip
  // ------------------------------------------------------------

  private _onChartPointerMove = (event: PointerEvent): void => {
    if (!this._chartContext) return;
    const canvas = this.renderRoot.querySelector<HTMLCanvasElement>(".pp-chart-canvas");
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
    const ts = ctx.pixelToTimestamp(localX);
    this._hover = { canvasX: localX, ts };
  };

  private _onChartPointerLeave = (): void => {
    if (this._hover) this._hover = undefined;
  };

  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------

  protected renderBody(): TemplateResult {
    return html`
      <div class="pp-toolbar">
        ${this._renderModeSwitch()}
        ${this._renderRangeBar()}
        ${this._mode !== "single" ? this._renderEntityTrigger() : nothing}
      </div>
      <div
        class="pp-chart-wrap"
        @pointermove=${this._onChartPointerMove}
        @pointerleave=${this._onChartPointerLeave}
      >
        <canvas class="pp-chart-canvas"></canvas>
        ${this._renderHoverOverlay()}
        ${this._loading ? html`<div class="pp-chart-overlay">Lade…</div>` : nothing}
        ${this._loadError ? html`<div class="pp-chart-overlay error">${this._loadError}</div>` : nothing}
      </div>
    `;
  }

  private _renderHoverOverlay(): TemplateResult | typeof nothing {
    if (!this._hover || !this._chartContext) return nothing;
    const ctx = this._chartContext;
    const { width, height } = this._canvasLogicalSize;
    if (width <= 0 || height <= 0) return nothing;
    const xPct = (this._hover.canvasX / width) * 100;

    const values = ctx.valuesAt(this._hover.ts).filter(
      (entry) => Number.isFinite(entry.value)
    );

    // Place tooltip on whichever side keeps it inside the chart area.
    const showOnRight = xPct < 60;

    return html`
      <div
        class="pp-hover-line"
        style=${styleMap({ left: `${xPct}%` })}
        aria-hidden="true"
      ></div>
      <div
        class="pp-tooltip ${showOnRight ? "right" : "left"}"
        style=${styleMap({
          left: showOnRight ? `${xPct}%` : "auto",
          right: showOnRight ? "auto" : `${100 - xPct}%`
        })}
      >
        <div class="pp-tooltip-time">${_formatHoverTime(this._hover.ts)}</div>
        ${values.length === 0
          ? html`<div class="pp-tooltip-row muted">—</div>`
          : values.map((entry) => html`
              <div class="pp-tooltip-row">
                <span class="pp-tooltip-swatch" style=${styleMap({ background: entry.resolvedColor })}></span>
                <span class="pp-tooltip-label">${entry.label}</span>
                <span class="pp-tooltip-value">${_formatHoverValue(entry.value, entry.rawUnit)}</span>
              </div>
            `)}
      </div>
    `;
  }

  private _renderModeSwitch(): TemplateResult {
    const modes: Array<{ id: ChartMode; label: string }> = [
      { id: "single", label: "Einzeln" },
      { id: "overlay", label: "Überlagert" },
      { id: "stacked-percent", label: "Gestapelt %" }
    ];
    return html`
      <div class="pp-segmented">
        ${modes.map((m) => html`
          <button
            class="pp-seg-btn ${this._mode === m.id ? "active" : ""}"
            @click=${() => this._onModeChange(m.id)}
          >${m.label}</button>
        `)}
      </div>
    `;
  }

  private _renderRangeBar(): TemplateResult {
    const dateOpen = this._openPopover === "date";
    const dateInvalid = this._customRangeInvalid();
    return html`
      <div class="pp-range-bar">
        ${RANGE_PRESETS.map((p) => html`
          <button
            class="pp-range-btn ${(!this._useCustomRange && this._presetId === p.id) ? "active" : ""}"
            @click=${() => this._onPresetClick(p.id)}
          >${p.label}</button>
        `)}
        <div class="pp-popover-anchor">
          <button
            class="pp-range-btn ${this._useCustomRange ? "active" : ""} ${dateInvalid ? "invalid" : ""}"
            data-pp-popover-trigger="date"
            @click=${() => this._onDateTriggerClick()}
            title="Eigener Zeitraum"
          >
            <ha-icon icon="mdi:calendar-range"></ha-icon>
          </button>
          ${dateOpen ? this._renderDatePopover() : nothing}
        </div>
      </div>
    `;
  }

  private _renderDatePopover(): TemplateResult {
    const invalid = this._customRangeInvalid();
    return html`
      <div class="pp-popover" data-pp-popover="date">
        <div class="pp-popover-title">Eigener Zeitraum</div>
        <label class="pp-popover-field">
          <span>Von</span>
          <input
            type="datetime-local"
            class=${invalid ? "invalid" : ""}
            .value=${this._customStartIso}
            @change=${this._onCustomStartChange}
          />
        </label>
        <label class="pp-popover-field">
          <span>Bis</span>
          <input
            type="datetime-local"
            class=${invalid ? "invalid" : ""}
            .value=${this._customEndIso}
            @change=${this._onCustomEndChange}
          />
        </label>
        ${invalid
          ? html`<div class="pp-popover-err">Start muss vor Ende liegen.</div>`
          : nothing}
      </div>
    `;
  }

  private _renderEntityTrigger(): TemplateResult {
    const open = this._openPopover === "entities";
    const total = this._allSeries.length;
    const selected = this._selectedIds.size;
    return html`
      <div class="pp-popover-anchor pp-entity-trigger-wrap">
        <button
          class="pp-range-btn ${open ? "active" : ""}"
          data-pp-popover-trigger="entities"
          @click=${() => this._togglePopover("entities")}
          title="Entitäten auswählen"
        >
          <ha-icon icon="mdi:format-list-checkbox"></ha-icon>
          <span class="pp-entity-trigger-count">${selected}/${total}</span>
        </button>
        ${open ? this._renderEntityPopover() : nothing}
      </div>
    `;
  }

  private _renderEntityPopover(): TemplateResult {
    const grouped = this._groupSeriesByCategory();
    const stackedExcludes = this._mode === "stacked-percent";

    return html`
      <div class="pp-popover pp-entity-popover" data-pp-popover="entities">
        <div class="pp-popover-title">
          <span>Entitäten</span>
          <div class="pp-entity-quick">
            <button class="pp-link" @click=${() => this._onSelectFocused()}>Nur fokussiert</button>
            <button class="pp-link" @click=${() => this._onSelectAll()}>Alle</button>
          </div>
        </div>
        ${stackedExcludes
          ? html`<div class="pp-popover-hint">Prozent-Entitäten sind in der Stacked-Ansicht ausgeschlossen.</div>`
          : nothing}
        <div class="pp-entity-scroll">
          ${grouped.map((group) => html`
            <div class="pp-entity-group">
              <div class="pp-entity-group-title">${group.title}</div>
              ${group.items.map((item) => {
                const disabled = stackedExcludes && item.isPercentage;
                const checked = this._selectedIds.has(item.id) && !disabled;
                return html`
                  <label
                    class="pp-entity-row ${disabled ? "disabled" : ""}"
                    title=${item.entityId}
                  >
                    <input
                      type="checkbox"
                      .checked=${checked}
                      ?disabled=${disabled}
                      @change=${() => this._onToggleSeries(item.id)}
                    />
                    <span class="pp-entity-swatch" style=${styleMap({ background: item.color })}></span>
                    <span class="pp-entity-label">${item.label}</span>
                    <span class="pp-entity-unit">${item.unit}</span>
                  </label>
                `;
              })}
            </div>
          `)}
        </div>
      </div>
    `;
  }

  private _onDateTriggerClick(): void {
    // First click: enable custom range (and open the popover so the
    // user lands on the date inputs immediately).
    if (!this._useCustomRange) {
      this._useCustomRange = true;
      this._openPopover = "date";
      void this._fetchHistory();
      return;
    }
    // If custom is already on, the trigger toggles the popover only —
    // tapping a preset is the documented way to leave custom mode.
    this._togglePopover("date");
  }

  private _groupSeriesByCategory(): Array<{ title: string; items: NodeSeriesDescriptor[] }> {
    const titles: Record<NodeSeriesDescriptor["category"], string> = {
      solar: "Solar",
      grid: "Grid",
      grid_secondary: "Grid 2",
      home: "Home",
      battery: "Batterie",
      battery_secondary: "Batterie 2",
      other: "Andere"
    };
    const order: Array<NodeSeriesDescriptor["category"]> = [
      "solar", "grid", "grid_secondary", "home", "battery", "battery_secondary", "other"
    ];
    const buckets: Map<NodeSeriesDescriptor["category"], NodeSeriesDescriptor[]> = new Map();
    for (const series of this._allSeries) {
      const bucket = buckets.get(series.category) ?? [];
      bucket.push(series);
      buckets.set(series.category, bucket);
    }
    return order
      .filter((cat) => buckets.has(cat))
      .map((cat) => ({ title: titles[cat], items: buckets.get(cat) ?? [] }));
  }

  // ------------------------------------------------------------
  // Styles
  // ------------------------------------------------------------

  static styles: CSSResultGroup = [
    PowerPilzDialogBase.styles,
    css`
      :host { --ppd-max-width: 980px; }

      .pp-toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
        margin-bottom: 12px;
      }

      .pp-segmented,
      .pp-range-bar {
        display: inline-flex;
        gap: 4px;
        flex-wrap: wrap;
        align-items: center;
        padding: 3px;
        border-radius: 10px;
        background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.06);
      }

      .pp-seg-btn,
      .pp-range-btn {
        font: inherit;
        font-size: 13px;
        font-weight: 500;
        border: none;
        background: transparent;
        color: var(--secondary-text-color);
        padding: 6px 12px;
        border-radius: 7px;
        cursor: pointer;
        line-height: 1;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .pp-seg-btn.active,
      .pp-range-btn.active {
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
      }
      .pp-seg-btn:hover:not(.active),
      .pp-range-btn:hover:not(.active) {
        color: var(--primary-text-color);
      }
      .pp-range-btn ha-icon { --mdc-icon-size: 16px; }

      .pp-range-btn.invalid {
        color: var(--error-color, #c62828);
      }

      /* ----- Popovers (entity list, date picker) ----- */
      .pp-popover-anchor {
        position: relative;
        display: inline-flex;
        align-items: center;
      }
      .pp-popover {
        position: absolute;
        top: calc(100% + 6px);
        right: 0;
        min-width: 240px;
        background: var(--card-background-color, var(--primary-background-color, #fff));
        color: var(--primary-text-color);
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 10px;
        box-shadow: 0 8px 28px rgba(0, 0, 0, 0.22);
        padding: 12px;
        z-index: 20;
        animation: pp-pop-fade 0.12s ease;
      }
      @keyframes pp-pop-fade {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .pp-popover-title {
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        color: var(--secondary-text-color);
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .pp-popover-title > span { flex: 1; }
      .pp-popover-field {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 12px;
        margin-bottom: 8px;
      }
      .pp-popover-field span {
        color: var(--secondary-text-color);
        font-size: 11px;
      }
      .pp-popover-field input {
        font: inherit;
        font-size: 13px;
        padding: 6px 8px;
        border-radius: 6px;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        background: var(--secondary-background-color, #fafafa);
        color: var(--primary-text-color);
      }
      .pp-popover-field input.invalid {
        border-color: var(--error-color, #c62828);
      }
      .pp-popover-hint,
      .pp-popover-err {
        font-size: 11px;
        margin-top: 4px;
      }
      .pp-popover-hint { color: var(--secondary-text-color); }
      .pp-popover-err { color: var(--error-color, #c62828); }

      .pp-entity-popover {
        min-width: 280px;
        max-width: 360px;
      }
      .pp-entity-trigger-wrap { margin-left: auto; }
      .pp-entity-trigger-count {
        font-size: 12px;
        font-variant-numeric: tabular-nums;
        margin-left: 2px;
      }
      .pp-entity-scroll {
        max-height: min(50vh, 360px);
        overflow-y: auto;
        margin: 0 -4px;
        padding: 0 4px;
      }

      .pp-chart-wrap {
        position: relative;
        width: 100%;
        min-height: 320px;
        height: clamp(280px, 40vh, 420px);
        background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.04);
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 14px;
      }
      .pp-chart-canvas {
        width: 100%;
        height: 100%;
        display: block;
      }
      .pp-chart-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        color: var(--secondary-text-color);
        background: rgba(var(--rgb-card-background-color, 255, 255, 255), 0.55);
        backdrop-filter: blur(1px);
        pointer-events: none;
      }
      .pp-chart-overlay.error {
        color: var(--error-color, #c62828);
      }

      .pp-hover-line {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 1px;
        background: var(--secondary-text-color, #757575);
        opacity: 0.55;
        pointer-events: none;
        transform: translateX(-0.5px);
      }
      .pp-tooltip {
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
      .pp-tooltip.right { transform: translateX(8px); }
      .pp-tooltip.left { transform: translateX(-8px); }
      .pp-tooltip-time {
        font-weight: 600;
        margin-bottom: 4px;
        white-space: nowrap;
      }
      .pp-tooltip-row {
        display: flex;
        align-items: center;
        gap: 6px;
        white-space: nowrap;
      }
      .pp-tooltip-row.muted { color: var(--secondary-text-color); }
      .pp-tooltip-swatch {
        width: 8px;
        height: 8px;
        border-radius: 2px;
        flex: none;
      }
      .pp-tooltip-label {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .pp-tooltip-value {
        font-variant-numeric: tabular-nums;
        font-weight: 500;
      }

      .pp-entity-quick { display: inline-flex; gap: 6px; }
      .pp-link {
        font: inherit;
        font-size: 11px;
        background: transparent;
        border: none;
        color: var(--primary-color, #03a9f4);
        cursor: pointer;
        padding: 2px 4px;
        text-transform: none;
        letter-spacing: 0;
      }
      .pp-link:hover { text-decoration: underline; }

      .pp-entity-group {
        margin-bottom: 10px;
      }
      .pp-entity-group-title {
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        color: var(--secondary-text-color);
        padding: 4px 0;
      }
      .pp-entity-row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 6px;
        border-radius: 6px;
        cursor: pointer;
      }
      .pp-entity-row:hover { background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05); }
      .pp-entity-row.disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }
      .pp-entity-row input[type="checkbox"] { accent-color: var(--primary-color); }
      .pp-entity-swatch {
        width: 12px;
        height: 12px;
        border-radius: 3px;
        flex: none;
      }
      .pp-entity-label {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .pp-entity-unit {
        color: var(--secondary-text-color);
        font-size: 12px;
        flex: none;
      }

      @media (max-width: 700px) {
        .pp-toolbar { gap: 8px; }
        .pp-chart-wrap { min-height: 240px; height: 36vh; }
      }
    `
  ];
}

if (!customElements.get(DIALOG_TAG)) {
  customElements.define(DIALOG_TAG, PowerPilzEnergyNodeDialog);
}

declare global {
  interface HTMLElementTagNameMap {
    [DIALOG_TAG]: PowerPilzEnergyNodeDialog;
  }
}

// ---------- Helpers ----------

const _toLocalIsoMinute = (date: Date): string => {
  const pad = (n: number): string => String(n).padStart(2, "0");
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  const hh = pad(date.getHours());
  const mm = pad(date.getMinutes());
  return `${y}-${m}-${d}T${hh}:${mm}`;
};

const _parseLocalIso = (iso: string): number | null => {
  if (!iso) return null;
  const ms = new Date(iso).getTime();
  return Number.isFinite(ms) ? ms : null;
};

const _pad2 = (n: number): string => String(n).padStart(2, "0");

const _formatHoverTime = (ts: number): string => {
  const date = new Date(ts);
  const datePart = `${_pad2(date.getDate())}.${_pad2(date.getMonth() + 1)}.${date.getFullYear()}`;
  const timePart = `${_pad2(date.getHours())}:${_pad2(date.getMinutes())}`;
  return `${datePart} ${timePart}`;
};

const _formatHoverValue = (value: number, unit: string): string => {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  const decimals = abs >= 100 ? 0 : abs >= 10 ? 1 : 2;
  const text = value.toFixed(decimals);
  return unit ? `${text} ${unit}` : text;
};
