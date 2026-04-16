import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor } from "../../types";
import { POWER_PILZ_VERSION } from "../../version";

interface ScheduleCardConfig extends LovelaceCardConfig {
  type: "custom:power-pilz-schedule-card";
  schedule_entity?: string;
  switch_entity?: string;
  mode_entity?: string;
  name?: string;
  subtitle?: string;
  icon?: string;
  icon_color?: string | number[];
  card_layout?: string;
  time_window?: string;
  active_color?: string | number[];
  show_day_selector?: boolean;
  show_mode_control?: boolean;
  show_now_indicator?: boolean;
  show_time_labels?: boolean;
}

type HaFormSchema = Record<string, unknown>;

// --- Helper texts ---

const SCHEDULE_ENTITY_HELP =
  "A schedule helper entity (schedule domain). Create one in Settings > Devices & Services > Helpers > Add > Schedule. It defines the weekly on/off time blocks shown on the timeline.";
const SWITCH_ENTITY_HELP =
  "The device this schedule controls (switch, light, or input_boolean). Automatically turned on/off when the mode changes to 'On' or 'Off'. The card icon reflects the device state (colored = on, grey = off).";
const MODE_ENTITY_HELP =
  "An input_select with options like 'Auto', 'On', 'Off' (create in Settings > Helpers > Dropdown). Controls the override mode: Timer = schedule runs normally, On = device always on, Off = device always off. Tap the card or mode button to cycle through modes.";
const TIME_WINDOW_HELP =
  "How many hours to display on the timeline. 24h shows the full day, 12h and 6h center on the current time.";
const ACTIVE_COLOR_HELP =
  "Color for the active (on) time blocks on the timeline.";
const CARD_LAYOUT_HELP =
  "Horizontal shows controls inline with the header. Vertical stacks everything for a taller card.";

const SCHEMA: HaFormSchema[] = [
  // --- Entities ---
  {
    type: "expandable",
    name: "",
    title: "Entities",
    icon: "mdi:connection",
    expanded: true,
    schema: [
      {
        name: "schedule_entity",
        selector: { entity: { filter: { domain: "schedule" } } },
        helper: SCHEDULE_ENTITY_HELP,
        description: SCHEDULE_ENTITY_HELP
      },
      {
        name: "switch_entity",
        selector: { entity: { filter: { domain: ["switch", "light", "input_boolean"] } } },
        helper: SWITCH_ENTITY_HELP,
        description: SWITCH_ENTITY_HELP
      },
      {
        name: "mode_entity",
        selector: { entity: { filter: { domain: ["input_select", "select"] } } },
        helper: MODE_ENTITY_HELP,
        description: MODE_ENTITY_HELP
      }
    ]
  },

  // --- Identity ---
  {
    type: "expandable",
    name: "",
    title: "Identity",
    icon: "mdi:card-text-outline",
    expanded: false,
    schema: [
      {
        type: "grid",
        name: "",
        columns: 2,
        schema: [
          { name: "name", selector: { text: {} } },
          { name: "subtitle", selector: { text: {} } }
        ]
      },
      {
        type: "grid",
        name: "",
        columns: 2,
        schema: [
          { name: "icon", selector: { icon: {} }, context: { icon_entity: "schedule_entity" } },
          {
            name: "icon_color",
            selector: { ui_color: { include_state: true, include_none: true, default_color: "state" } }
          }
        ]
      }
    ]
  },

  // --- Layout ---
  {
    type: "expandable",
    name: "",
    title: "Layout",
    icon: "mdi:page-layout-body",
    expanded: false,
    schema: [
      {
        type: "grid",
        name: "",
        columns: 2,
        schema: [
          {
            name: "card_layout",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { label: "Horizontal", value: "horizontal" },
                  { label: "Vertical", value: "vertical" }
                ]
              }
            },
            helper: CARD_LAYOUT_HELP,
            description: CARD_LAYOUT_HELP
          },
          {
            name: "time_window",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { label: "24 hours (full day)", value: "24" },
                  { label: "12 hours (±6h)", value: "12" },
                  { label: "6 hours (±3h)", value: "6" }
                ]
              }
            },
            helper: TIME_WINDOW_HELP,
            description: TIME_WINDOW_HELP
          }
        ]
      }
    ]
  },

  // --- Appearance ---
  {
    type: "expandable",
    name: "",
    title: "Appearance",
    icon: "mdi:palette-outline",
    expanded: false,
    schema: [
      {
        type: "grid",
        name: "",
        columns: 2,
        schema: [
          {
            name: "active_color",
            selector: { ui_color: { include_state: false, include_none: true, default_color: "primary" } },
            helper: ACTIVE_COLOR_HELP,
            description: ACTIVE_COLOR_HELP
          }
        ]
      }
    ]
  },

  // --- Display options ---
  {
    type: "expandable",
    name: "",
    title: "Display options",
    icon: "mdi:tune-variant",
    expanded: false,
    schema: [
      {
        type: "grid",
        name: "",
        columns: 2,
        schema: [
          { name: "show_day_selector", selector: { boolean: {} } },
          { name: "show_mode_control", selector: { boolean: {} } },
          { name: "show_now_indicator", selector: { boolean: {} } },
          { name: "show_time_labels", selector: { boolean: {} } }
        ]
      }
    ]
  }
];

const LABELS: Record<string, string> = {
  schedule_entity: "Schedule entity",
  switch_entity: "Device entity",
  mode_entity: "Mode override entity",
  name: "Name",
  subtitle: "Subtitle",
  icon: "Icon",
  icon_color: "Icon color",
  card_layout: "Card layout",
  time_window: "Time window",
  active_color: "Active block color",
  show_day_selector: "Show day selector",
  show_mode_control: "Show mode button",
  show_now_indicator: "Show current time indicator",
  show_time_labels: "Show hour labels"
};

const HELPERS: Record<string, string> = {
  schedule_entity: SCHEDULE_ENTITY_HELP,
  switch_entity: SWITCH_ENTITY_HELP,
  mode_entity: MODE_ENTITY_HELP,
  card_layout: CARD_LAYOUT_HELP,
  time_window: TIME_WINDOW_HELP,
  active_color: ACTIVE_COLOR_HELP,
  show_day_selector: "Show or hide the weekday selector bar.",
  show_mode_control: "Show or hide the mode override button (Timer/On/Off) in the card header.",
  show_now_indicator: "Show a vertical line on the timeline at the current time.",
  show_time_labels: "Show hour labels above the timeline."
};

@customElement("power-pilz-schedule-card-editor")
export class PowerPilzScheduleCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config?: ScheduleCardConfig;

  public setConfig(config: ScheduleCardConfig): void {
    this._config = {
      ...config,
      show_day_selector: config.show_day_selector ?? true,
      show_mode_control: config.show_mode_control ?? true,
      show_now_indicator: config.show_now_indicator ?? true,
      show_time_labels: config.show_time_labels ?? true,
      type: "custom:power-pilz-schedule-card"
    };
  }

  protected render() {
    if (!this.hass || !this._config) return nothing;

    return html`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${POWER_PILZ_VERSION}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${this.computeLabel}
        .computeHelper=${this.computeHelper}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }

  private computeLabel = (schema: { name?: string }): string => {
    const name = schema.name ?? "";
    return LABELS[name] ?? name;
  };

  private computeHelper = (schema: { name?: string }): string | undefined => {
    const name = schema.name ?? "";
    return HELPERS[name];
  };

  private valueChanged = (event: CustomEvent<{ value: unknown }>): void => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || target.tagName !== "HA-FORM") return;
    const value = event.detail.value;
    if (!value || typeof value !== "object" || Array.isArray(value)) return;
    const nextConfig: ScheduleCardConfig = {
      ...(value as ScheduleCardConfig),
      type: "custom:power-pilz-schedule-card"
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
    "power-pilz-schedule-card-editor": PowerPilzScheduleCardEditor;
  }
}
