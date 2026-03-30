import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor } from "../../types";
import { POWER_PILZ_VERSION } from "../../version";
import {
  clampLineThickness,
  computeGraphEditorLabel,
  createGraphSchema,
  normalizeGraphEntityFields,
  normalizeLegendLayout,
  normalizeTimeframeHours,
  type GraphLegendLayout,
  type TrendDataSource,
  type GraphTimeframeHours
} from "./graph-editor-shared";

interface GraphStackCardConfig extends LovelaceCardConfig {
  type: "custom:power-pilz-graph-stack-card";
  legend_layout?: GraphLegendLayout;
  timeframe_hours?: GraphTimeframeHours | number | string;
  unit?: string;
  decimals?: number;
  line_thickness?: number;
  clip_graph_to_labels?: boolean;
  hover_enabled?: boolean;
  fill_area_enabled?: boolean;
  shared_trend_scale?: boolean;
  trend_data_source?: TrendDataSource | "auto";
  debug_performance?: boolean;
  normalize_stack_to_percent?: boolean;
  percent_reference_slot?: number;
  percent_reference_auto?: boolean;
  auto_scale_units?: boolean;
  decimals_base_unit?: number;
  decimals_prefixed_unit?: number;
  tap_action?: Record<string, unknown>;
  hold_action?: Record<string, unknown>;
  double_tap_action?: Record<string, unknown>;

  entity?: string;
  icon?: string;
  icon_color?: string | number[];
  trend_color?: string | number[];

  entity_1?: string;
  entity_1_name?: string;
  entity_1_enabled?: boolean;
  entity_1_icon?: string;
  entity_1_show_icon?: boolean;
  entity_1_icon_color?: string | number[];
  entity_1_trend_color?: string | number[];

  entity_2?: string;
  entity_2_name?: string;
  entity_2_enabled?: boolean;
  entity_2_icon?: string;
  entity_2_show_icon?: boolean;
  entity_2_icon_color?: string | number[];
  entity_2_trend_color?: string | number[];

  entity_3?: string;
  entity_3_name?: string;
  entity_3_enabled?: boolean;
  entity_3_icon?: string;
  entity_3_show_icon?: boolean;
  entity_3_icon_color?: string | number[];
  entity_3_trend_color?: string | number[];

  entity_4?: string;
  entity_4_name?: string;
  entity_4_enabled?: boolean;
  entity_4_icon?: string;
  entity_4_show_icon?: boolean;
  entity_4_icon_color?: string | number[];
  entity_4_trend_color?: string | number[];
}

@customElement("power-pilz-graph-stack-card-editor")
export class PowerPilzGraphStackCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config?: GraphStackCardConfig;

  public setConfig(config: GraphStackCardConfig): void {
    const next: GraphStackCardConfig = {
      ...config,
      type: "custom:power-pilz-graph-stack-card",
      legend_layout: normalizeLegendLayout(config.legend_layout),
      timeframe_hours: normalizeTimeframeHours(config.timeframe_hours),
      hover_enabled: config.hover_enabled ?? true,
      fill_area_enabled: config.fill_area_enabled ?? true,
      shared_trend_scale: config.shared_trend_scale ?? false,
      debug_performance: config.debug_performance ?? false,
      normalize_stack_to_percent: config.normalize_stack_to_percent ?? false,
      percent_reference_slot: config.percent_reference_slot,
      percent_reference_auto: config.percent_reference_auto ?? false,
      decimals: config.decimals ?? 1,
      auto_scale_units: config.auto_scale_units ?? false,
      decimals_base_unit: config.decimals_base_unit ?? config.decimals ?? 1,
      decimals_prefixed_unit: config.decimals_prefixed_unit ?? config.decimals ?? 1,
      line_thickness: clampLineThickness(config.line_thickness),
      clip_graph_to_labels: config.clip_graph_to_labels ?? false,
      ...normalizeGraphEntityFields(config)
    };

    this._config = next;
  }

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    const percentEnabled = this._config.normalize_stack_to_percent ?? false;
    const schema = createGraphSchema(true, percentEnabled);

    return html`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${POWER_PILZ_VERSION}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${schema}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }

  private computeLabel = (schema: { name?: string }): string => {
    return computeGraphEditorLabel(schema);
  };

  private valueChanged = (event: CustomEvent<{ value: unknown }>): void => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || target.tagName !== "HA-FORM") {
      return;
    }
    const value = event.detail.value;
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return;
    }
    const nextConfig: GraphStackCardConfig = {
      ...(value as GraphStackCardConfig),
      type: "custom:power-pilz-graph-stack-card"
    };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: nextConfig },
        bubbles: true,
        composed: true
      })
    );
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "power-pilz-graph-stack-card-editor": PowerPilzGraphStackCardEditor;
  }
}
