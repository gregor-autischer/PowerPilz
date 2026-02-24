import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor } from "../../types";

type GraphLegendLayout = "row" | "column";
type GraphTimeframeHours = 6 | 12 | 24;
type GraphSlot = 1 | 2 | 3 | 4;

interface GraphCardConfig extends LovelaceCardConfig {
  type: "custom:power-pilz-graph-card";
  legend_layout?: GraphLegendLayout;
  timeframe_hours?: GraphTimeframeHours | number | string;
  unit?: string;
  decimals?: number;
  line_thickness?: number;
  clip_graph_to_labels?: boolean;
  hover_enabled?: boolean;
  fill_area_enabled?: boolean;

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

type HaFormSchema = Record<string, unknown>;

const GRAPH_SLOT_COUNT = 4;
const TREND_DEFAULTS: Record<number, string> = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};

const entitySchema = (index: number): HaFormSchema => ({
  type: "expandable",
  name: "",
  title: `Entity ${index}`,
  icon: "mdi:chart-line",
  expanded: index === 1,
  schema: [
    { name: `entity_${index}_enabled`, selector: { boolean: {} } },
    {
      type: "grid",
      name: "",
      schema: [
        { name: `entity_${index}`, selector: { entity: { filter: { domain: "sensor" } } } },
        { name: `entity_${index}_name`, selector: { text: {} } },
        { name: `entity_${index}_show_icon`, selector: { boolean: {} } },
        { name: `entity_${index}_icon`, selector: { icon: {} }, context: { icon_entity: `entity_${index}` } },
        {
          name: `entity_${index}_icon_color`,
          selector: { ui_color: { include_state: true, include_none: true, default_color: "state" } }
        },
        {
          name: `entity_${index}_trend_color`,
          selector: {
            ui_color: {
              include_state: true,
              include_none: false,
              default_color: TREND_DEFAULTS[index] ?? "purple"
            }
          }
        }
      ]
    }
  ]
});

const SCHEMA: HaFormSchema[] = [
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "legend_layout",
        selector: {
          select: {
            mode: "dropdown",
            options: ["row", "column"]
          }
        }
      },
      {
        name: "timeframe_hours",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { label: "24 hours", value: 24 },
              { label: "12 hours", value: 12 },
              { label: "6 hours", value: 6 }
            ]
          }
        }
      }
    ]
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "hover_enabled", selector: { boolean: {} } },
      { name: "fill_area_enabled", selector: { boolean: {} } },
      { name: "clip_graph_to_labels", selector: { boolean: {} } },
      {
        name: "line_thickness",
        selector: { number: { mode: "box", min: 0.5, max: 6, step: 0.1 } }
      }
    ]
  },
  ...Array.from({ length: GRAPH_SLOT_COUNT }, (_, index) => entitySchema(index + 1)),
  {
    type: "grid",
    name: "",
    schema: [
      { name: "unit", selector: { text: {} } },
      { name: "decimals", selector: { number: { mode: "box", min: 0, max: 3, step: 1 } } }
    ]
  }
];

const LABELS: Record<string, string> = {
  legend_layout: "Label layout",
  timeframe_hours: "Time range",
  hover_enabled: "Enable hover",
  fill_area_enabled: "Enable area fill",
  clip_graph_to_labels: "Clip graph below labels",
  line_thickness: "Line thickness",
  unit: "Unit override",
  decimals: "Decimals"
};

@customElement("power-pilz-graph-card-editor")
export class PowerPilzGraphCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config?: GraphCardConfig;

  public setConfig(config: GraphCardConfig): void {
    const next: GraphCardConfig = {
      ...config,
      type: "custom:power-pilz-graph-card",
      legend_layout: config.legend_layout === "column" ? "column" : "row",
      timeframe_hours: this.normalizeTimeframeHours(config.timeframe_hours),
      hover_enabled: config.hover_enabled ?? true,
      fill_area_enabled: config.fill_area_enabled ?? true,
      line_thickness:
        typeof config.line_thickness === "number" && Number.isFinite(config.line_thickness)
          ? Math.max(0.5, Math.min(6, config.line_thickness))
          : 1.5,
      clip_graph_to_labels: config.clip_graph_to_labels ?? false,

      entity_1: this.readString(config.entity_1) ?? this.readString(config.entity),
      entity_1_name: this.readString(config.entity_1_name),
      entity_1_enabled: config.entity_1_enabled ?? true,
      entity_1_show_icon: config.entity_1_show_icon ?? true,
      entity_1_icon: config.entity_1_icon ?? config.icon,
      entity_1_icon_color: config.entity_1_icon_color ?? config.icon_color,
      entity_1_trend_color: this.normalizeTrendColor(config.entity_1_trend_color, config.trend_color, 1),

      entity_2: this.readString(config.entity_2),
      entity_2_name: this.readString(config.entity_2_name),
      entity_2_enabled: config.entity_2_enabled ?? false,
      entity_2_show_icon: config.entity_2_show_icon ?? true,
      entity_2_icon: config.entity_2_icon,
      entity_2_trend_color: this.normalizeTrendColor(config.entity_2_trend_color, undefined, 2),

      entity_3: this.readString(config.entity_3),
      entity_3_name: this.readString(config.entity_3_name),
      entity_3_enabled: config.entity_3_enabled ?? false,
      entity_3_show_icon: config.entity_3_show_icon ?? true,
      entity_3_icon: config.entity_3_icon,
      entity_3_trend_color: this.normalizeTrendColor(config.entity_3_trend_color, undefined, 3),

      entity_4: this.readString(config.entity_4),
      entity_4_name: this.readString(config.entity_4_name),
      entity_4_enabled: config.entity_4_enabled ?? false,
      entity_4_show_icon: config.entity_4_show_icon ?? true,
      entity_4_icon: config.entity_4_icon,
      entity_4_trend_color: this.normalizeTrendColor(config.entity_4_trend_color, undefined, 4)
    };

    this._config = next;
  }

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }

  private readString(value: unknown): string | undefined {
    if (typeof value !== "string") {
      return undefined;
    }
    return value.length > 0 ? value : undefined;
  }

  private normalizeTimeframeHours(value: unknown): GraphTimeframeHours {
    const parsed =
      typeof value === "number"
        ? value
        : typeof value === "string"
          ? Number.parseInt(value, 10)
          : NaN;
    if (parsed === 6 || parsed === 12 || parsed === 24) {
      return parsed;
    }
    return 24;
  }

  private normalizeTrendColor(
    value: string | number[] | undefined,
    legacy: string | number[] | undefined,
    slot: GraphSlot
  ): string | number[] {
    const candidate = value ?? legacy;
    if (Array.isArray(candidate)) {
      return candidate;
    }
    if (typeof candidate === "string" && candidate.trim().length > 0) {
      return candidate;
    }
    return TREND_DEFAULTS[slot] ?? "purple";
  }

  private computeLabel = (schema: { name?: string }): string => {
    const name = schema.name ?? "";

    const match = name.match(/^entity_(\d+)_(enabled|name|show_icon|icon|icon_color|trend_color)$/);
    if (match) {
      const [, index, field] = match;
      const fieldLabel: Record<string, string> = {
        enabled: "Enabled",
        name: "Name",
        show_icon: "Show icon",
        icon: "Icon",
        icon_color: "Icon color",
        trend_color: "Graph color"
      };
      return `Entity ${index} ${fieldLabel[field] ?? field}`;
    }

    const entityMatch = name.match(/^entity_(\d+)$/);
    if (entityMatch) {
      return `Entity ${entityMatch[1]}`;
    }

    return LABELS[name] ?? name;
  };

  private valueChanged = (event: CustomEvent<{ value: GraphCardConfig }>): void => {
    const nextConfig: GraphCardConfig = {
      ...event.detail.value,
      type: "custom:power-pilz-graph-card"
    };
    this._config = nextConfig;
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
    "power-pilz-graph-card-editor": PowerPilzGraphCardEditor;
  }
}
