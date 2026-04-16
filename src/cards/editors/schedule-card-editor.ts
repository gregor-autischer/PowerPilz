import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor } from "../../types";
import { POWER_PILZ_VERSION } from "../../version";
import { tr, haLang } from "../../utils/i18n";

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

  private buildSchema(): HaFormSchema[] {
    const lang = haLang(this.hass);
    return [
      {
        type: "expandable",
        name: "",
        title: tr(lang, "schedule.editor.section_entities"),
        icon: "mdi:connection",
        expanded: true,
        schema: [
          {
            name: "schedule_entity",
            selector: { entity: { filter: { domain: "schedule" } } },
            helper: tr(lang, "schedule.editor.schedule_help"),
            description: tr(lang, "schedule.editor.schedule_help")
          },
          {
            name: "switch_entity",
            selector: { entity: { filter: { domain: ["switch", "light", "input_boolean"] } } },
            helper: tr(lang, "schedule.editor.switch_help"),
            description: tr(lang, "schedule.editor.switch_help")
          },
          {
            name: "mode_entity",
            selector: { entity: { filter: { domain: ["input_select", "select"] } } },
            helper: tr(lang, "schedule.editor.mode_help"),
            description: tr(lang, "schedule.editor.mode_help")
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: tr(lang, "schedule.editor.section_identity"),
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
      {
        type: "expandable",
        name: "",
        title: tr(lang, "schedule.editor.section_layout"),
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
                      { label: tr(lang, "schedule.editor.layout_horizontal"), value: "horizontal" },
                      { label: tr(lang, "schedule.editor.layout_vertical"), value: "vertical" }
                    ]
                  }
                },
                helper: tr(lang, "schedule.editor.card_layout_help"),
                description: tr(lang, "schedule.editor.card_layout_help")
              },
              {
                name: "time_window",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: [
                      { label: tr(lang, "schedule.editor.tw_24"), value: "24" },
                      { label: tr(lang, "schedule.editor.tw_12"), value: "12" },
                      { label: tr(lang, "schedule.editor.tw_6"), value: "6" }
                    ]
                  }
                },
                helper: tr(lang, "schedule.editor.time_window_help"),
                description: tr(lang, "schedule.editor.time_window_help")
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: tr(lang, "schedule.editor.section_appearance"),
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
                helper: tr(lang, "schedule.editor.active_color_help"),
                description: tr(lang, "schedule.editor.active_color_help")
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: tr(lang, "schedule.editor.section_display"),
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
  }

  private labelMap(): Record<string, string> {
    const lang = haLang(this.hass);
    return {
      schedule_entity: tr(lang, "schedule.editor.schedule_entity"),
      switch_entity: tr(lang, "schedule.editor.switch_entity"),
      mode_entity: tr(lang, "schedule.editor.mode_entity"),
      name: tr(lang, "schedule.editor.name"),
      subtitle: tr(lang, "schedule.editor.subtitle"),
      icon: tr(lang, "schedule.editor.icon"),
      icon_color: tr(lang, "schedule.editor.icon_color"),
      card_layout: tr(lang, "schedule.editor.card_layout"),
      time_window: tr(lang, "schedule.editor.time_window"),
      active_color: tr(lang, "schedule.editor.active_color"),
      show_day_selector: tr(lang, "schedule.editor.show_day_selector"),
      show_mode_control: tr(lang, "schedule.editor.show_mode_control"),
      show_now_indicator: tr(lang, "schedule.editor.show_now_indicator"),
      show_time_labels: tr(lang, "schedule.editor.show_time_labels")
    };
  }

  private helperMap(): Record<string, string> {
    const lang = haLang(this.hass);
    return {
      schedule_entity: tr(lang, "schedule.editor.schedule_help"),
      switch_entity: tr(lang, "schedule.editor.switch_help"),
      mode_entity: tr(lang, "schedule.editor.mode_help"),
      card_layout: tr(lang, "schedule.editor.card_layout_help"),
      time_window: tr(lang, "schedule.editor.time_window_help"),
      active_color: tr(lang, "schedule.editor.active_color_help"),
      show_day_selector: tr(lang, "schedule.editor.show_day_help"),
      show_mode_control: tr(lang, "schedule.editor.show_mode_help"),
      show_now_indicator: tr(lang, "schedule.editor.show_now_help"),
      show_time_labels: tr(lang, "schedule.editor.show_labels_help")
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
        .computeHelper=${this.computeHelper}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }

  private computeLabel = (schema: { name?: string }): string => {
    return this.labelMap()[schema.name ?? ""] ?? schema.name ?? "";
  };

  private computeHelper = (schema: { name?: string }): string | undefined => {
    return this.helperMap()[schema.name ?? ""];
  };

  private valueChanged = (event: CustomEvent<{ value: unknown }>): void => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || target.tagName !== "HA-FORM") return;
    const value = event.detail.value;
    if (!value || typeof value !== "object" || Array.isArray(value)) return;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: { ...(value as ScheduleCardConfig), type: "custom:power-pilz-schedule-card" } },
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
