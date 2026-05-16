import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor } from "../../types";
import { POWER_PILZ_VERSION } from "../../version";
import { tr, haLang } from "../../utils/i18n";

interface TimerCardConfig extends LovelaceCardConfig {
  type: "custom:power-pilz-timer-card";
  companion_entity?: string;
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
    // Drop legacy manual-mode fields from pre-0.7.2 configs so they
    // don't reappear in the saved YAML on the next config-changed
    // event. The card no longer supports manual mode; users must use a
    // Companion Smart Timer helper.
    const clean = { ...config } as TimerCardConfig & Record<string, unknown>;
    delete clean.use_companion;
    delete clean.switch_entity;
    delete clean.on_datetime_entity;
    delete clean.off_datetime_entity;
    delete clean.active_entity;
    this._config = {
      ...clean,
      type: "custom:power-pilz-timer-card"
    };
  }

  private buildSchema(): HaFormSchema[] {
    const lang = haLang(this.hass);

    return [
      {
        type: "expandable",
        name: "",
        title: tr(lang, "timer.editor.section_entities"),
        icon: "mdi:connection",
        expanded: true,
        schema: [
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
      },
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
                context: { icon_entity: "companion_entity" }
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
      companion_entity: tr(lang, "timer.editor.companion_entity"),
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
      companion_entity: tr(lang, "timer.editor.companion_help"),
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

    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: { ...(raw as TimerCardConfig), type: "custom:power-pilz-timer-card" } },
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
