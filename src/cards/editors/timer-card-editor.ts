import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor } from "../../types";
import { POWER_PILZ_VERSION } from "../../version";
import { tr, haLang } from "../../utils/i18n";

interface TimerCardConfig extends LovelaceCardConfig {
  type: "custom:power-pilz-timer-card";
  use_companion?: boolean;
  companion_entity?: string;
  switch_entity?: string;
  on_datetime_entity?: string;
  off_datetime_entity?: string;
  active_entity?: string;
  name?: string;
  subtitle?: string;
  icon?: string;
  icon_color?: string | number[];
  active_color?: string | number[];
}

type HaFormSchema = Record<string, unknown>;

@customElement("power-pilz-timer-card-editor")
export class PowerPilzTimerCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config?: TimerCardConfig;

  public setConfig(config: TimerCardConfig): void {
    // Smart default: explicit wins; legacy configs with switch_entity
    // default to manual mode; fresh configs default to companion mode.
    const useCompanion = config.use_companion !== undefined
      ? config.use_companion !== false
      : !config.switch_entity;
    this._config = {
      ...config,
      use_companion: useCompanion,
      type: "custom:power-pilz-timer-card"
    };
  }

  private buildSchema(): HaFormSchema[] {
    const lang = haLang(this.hass);
    const useCompanion = this._config?.use_companion !== false;

    const entitiesSection: HaFormSchema = {
      type: "expandable",
      name: "",
      title: tr(lang, "timer.editor.section_entities"),
      icon: "mdi:connection",
      expanded: true,
      schema: [
        {
          name: "use_companion",
          selector: { boolean: {} },
          helper: tr(lang, "timer.editor.use_companion_help"),
          description: tr(lang, "timer.editor.use_companion_help")
        },
        ...(useCompanion
          ? [
              {
                name: "companion_entity",
                selector: {
                  entity: {
                    filter: {
                      domain: "switch",
                      integration: "powerpilz_companion"
                    }
                  }
                },
                helper: tr(lang, "timer.editor.companion_help"),
                description: tr(lang, "timer.editor.companion_help")
              }
            ]
          : [
              {
                name: "switch_entity",
                selector: { entity: { filter: { domain: ["switch", "light", "input_boolean", "climate", "fan"] } } },
                helper: tr(lang, "timer.editor.switch_help"),
                description: tr(lang, "timer.editor.switch_help")
              },
              {
                name: "on_datetime_entity",
                selector: { entity: { filter: { domain: "input_datetime" } } },
                helper: tr(lang, "timer.editor.on_help"),
                description: tr(lang, "timer.editor.on_help")
              },
              {
                name: "off_datetime_entity",
                selector: { entity: { filter: { domain: "input_datetime" } } },
                helper: tr(lang, "timer.editor.off_help"),
                description: tr(lang, "timer.editor.off_help")
              },
              {
                name: "active_entity",
                selector: { entity: { filter: { domain: "input_boolean" } } },
                helper: tr(lang, "timer.editor.active_help"),
                description: tr(lang, "timer.editor.active_help")
              }
            ])
      ]
    };

    return [
      entitiesSection,
      {
        type: "expandable",
        name: "",
        title: tr(lang, "timer.editor.section_identity"),
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
                context: { icon_entity: useCompanion ? "companion_entity" : "switch_entity" }
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
        title: tr(lang, "timer.editor.section_appearance"),
        icon: "mdi:palette-outline",
        expanded: false,
        schema: [
          {
            name: "active_color",
            selector: { ui_color: { include_state: false, include_none: true, default_color: "primary" } },
            helper: tr(lang, "timer.editor.active_color_help"),
            description: tr(lang, "timer.editor.active_color_help")
          }
        ]
      }
    ];
  }

  private labelMap(): Record<string, string> {
    const lang = haLang(this.hass);
    return {
      use_companion: tr(lang, "timer.editor.use_companion"),
      companion_entity: tr(lang, "timer.editor.companion_entity"),
      switch_entity: tr(lang, "timer.editor.switch_entity"),
      on_datetime_entity: tr(lang, "timer.editor.on_datetime_entity"),
      off_datetime_entity: tr(lang, "timer.editor.off_datetime_entity"),
      active_entity: tr(lang, "timer.editor.active_entity"),
      name: tr(lang, "timer.editor.name"),
      subtitle: tr(lang, "timer.editor.subtitle"),
      icon: tr(lang, "timer.editor.icon"),
      icon_color: tr(lang, "timer.editor.icon_color"),
      active_color: tr(lang, "timer.editor.active_color")
    };
  }

  private helperMap(): Record<string, string> {
    const lang = haLang(this.hass);
    return {
      use_companion: tr(lang, "timer.editor.use_companion_help"),
      companion_entity: tr(lang, "timer.editor.companion_help"),
      switch_entity: tr(lang, "timer.editor.switch_help"),
      on_datetime_entity: tr(lang, "timer.editor.on_help"),
      off_datetime_entity: tr(lang, "timer.editor.off_help"),
      active_entity: tr(lang, "timer.editor.active_help"),
      active_color: tr(lang, "timer.editor.active_color_help")
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
    const raw = event.detail.value;
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return;

    // Enforce mutual exclusivity between companion + manual fields.
    const value = { ...(raw as TimerCardConfig) };
    if (value.use_companion !== false) {
      delete value.switch_entity;
      delete value.on_datetime_entity;
      delete value.off_datetime_entity;
      delete value.active_entity;
    } else {
      delete value.companion_entity;
    }

    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: { ...value, type: "custom:power-pilz-timer-card" } },
        bubbles: true,
        composed: true
      })
    );
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "power-pilz-timer-card-editor": PowerPilzTimerCardEditor;
  }
}
