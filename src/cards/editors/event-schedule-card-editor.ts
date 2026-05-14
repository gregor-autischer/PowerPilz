import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor } from "../../types";
import { POWER_PILZ_VERSION } from "../../version";
import { tr, haLang } from "../../utils/i18n";

interface EventScheduleCardConfig extends LovelaceCardConfig {
  type: "custom:power-pilz-event-schedule-card";
  entity?: string;
  name?: string;
  subtitle?: string;
  icon?: string;
  icon_color?: string | number[];
  card_layout?: string;
  time_window?: string;
  active_color?: string | number[];
  show_day_selector?: boolean;
  show_mode_control?: boolean;
  show_trigger_button?: boolean;
  show_now_indicator?: boolean;
  show_time_labels?: boolean;
  long_press_opens_editor?: boolean;
  tap_action?: Record<string, unknown>;
  hold_action?: Record<string, unknown>;
  double_tap_action?: Record<string, unknown>;
}

type HaFormSchema = Record<string, unknown>;

@customElement("power-pilz-event-schedule-card-editor")
export class PowerPilzEventScheduleCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config?: EventScheduleCardConfig;

  public setConfig(config: EventScheduleCardConfig): void {
    this._config = {
      ...config,
      show_day_selector: config.show_day_selector ?? true,
      show_mode_control: config.show_mode_control ?? true,
      show_trigger_button: config.show_trigger_button ?? true,
      show_now_indicator: config.show_now_indicator ?? true,
      show_time_labels: config.show_time_labels ?? true,
      long_press_opens_editor: config.long_press_opens_editor ?? true,
      type: "custom:power-pilz-event-schedule-card"
    };
  }

  private buildSchema(): HaFormSchema[] {
    const lang = haLang(this.hass);

    const entitiesSection: HaFormSchema = {
      type: "expandable",
      name: "",
      title: tr(lang, "event_schedule.editor.section_entities"),
      icon: "mdi:connection",
      expanded: true,
      schema: [
        {
          name: "entity",
          selector: {
            entity: {
              filter: {
                domain: "select",
                integration: "powerpilz_companion"
              }
            }
          },
          helper: tr(lang, "event_schedule.editor.entity_help"),
          description: tr(lang, "event_schedule.editor.entity_help")
        }
      ]
    };

    return [
      entitiesSection,
      {
        type: "expandable",
        name: "",
        title: tr(lang, "event_schedule.editor.section_identity"),
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
              {
                name: "icon",
                selector: { icon: {} },
                context: { icon_entity: "entity" }
              },
              {
                name: "icon_color",
                selector: { ui_color: { include_state: true, include_none: true, default_color: "state" } }
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: tr(lang, "event_schedule.editor.section_layout"),
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
                      { label: tr(lang, "event_schedule.editor.layout_horizontal"), value: "horizontal" },
                      { label: tr(lang, "event_schedule.editor.layout_vertical"), value: "vertical" }
                    ]
                  }
                }
              },
              {
                name: "time_window",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: [
                      { label: tr(lang, "event_schedule.editor.tw_24"), value: "24" },
                      { label: tr(lang, "event_schedule.editor.tw_12"), value: "12" },
                      { label: tr(lang, "event_schedule.editor.tw_6"), value: "6" }
                    ]
                  }
                }
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: tr(lang, "event_schedule.editor.section_appearance"),
        icon: "mdi:palette-outline",
        expanded: false,
        schema: [
          {
            name: "active_color",
            selector: { ui_color: { include_state: false, include_none: true, default_color: "primary" } }
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: tr(lang, "event_schedule.editor.section_display"),
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
              { name: "show_trigger_button", selector: { boolean: {} } },
              { name: "show_now_indicator", selector: { boolean: {} } },
              { name: "show_time_labels", selector: { boolean: {} } }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: tr(lang, "event_schedule.editor.section_actions"),
        icon: "mdi:gesture-tap",
        expanded: false,
        schema: [
          { name: "long_press_opens_editor", selector: { boolean: {} } },
          { name: "tap_action", selector: { ui_action: {} } },
          { name: "hold_action", selector: { ui_action: {} } },
          { name: "double_tap_action", selector: { ui_action: {} } }
        ]
      }
    ];
  }

  private labelMap(): Record<string, string> {
    const lang = haLang(this.hass);
    return {
      entity: tr(lang, "event_schedule.editor.entity"),
      name: tr(lang, "event_schedule.editor.name"),
      subtitle: tr(lang, "event_schedule.editor.subtitle"),
      icon: tr(lang, "event_schedule.editor.icon"),
      icon_color: tr(lang, "event_schedule.editor.icon_color"),
      card_layout: tr(lang, "event_schedule.editor.card_layout"),
      time_window: tr(lang, "event_schedule.editor.time_window"),
      active_color: tr(lang, "event_schedule.editor.active_color"),
      show_day_selector: tr(lang, "event_schedule.editor.show_day_selector"),
      show_mode_control: tr(lang, "event_schedule.editor.show_mode_control"),
      show_trigger_button: tr(lang, "event_schedule.editor.show_trigger_button"),
      show_now_indicator: tr(lang, "event_schedule.editor.show_now_indicator"),
      show_time_labels: tr(lang, "event_schedule.editor.show_time_labels"),
      long_press_opens_editor: tr(lang, "event_schedule.editor.long_press_opens_editor"),
      tap_action: tr(lang, "event_schedule.editor.tap_action"),
      hold_action: tr(lang, "event_schedule.editor.hold_action"),
      double_tap_action: tr(lang, "event_schedule.editor.double_tap_action")
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
        .schema=${this.buildSchema()}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }

  private computeLabel = (schema: { name?: string }): string => {
    return this.labelMap()[schema.name ?? ""] ?? schema.name ?? "";
  };

  private valueChanged = (event: CustomEvent<{ value: unknown }>): void => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || target.tagName !== "HA-FORM") return;
    const raw = event.detail.value;
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return;
    const value = { ...(raw as EventScheduleCardConfig) };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: { ...value, type: "custom:power-pilz-event-schedule-card" } },
        bubbles: true,
        composed: true
      })
    );
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "power-pilz-event-schedule-card-editor": PowerPilzEventScheduleCardEditor;
  }
}
