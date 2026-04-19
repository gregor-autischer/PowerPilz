import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import type {
  HassEntity,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  LovelaceCardEditor,
  LovelaceGridOptions,
  LovelaceLayoutOptions
} from "../types";
import { getEntity } from "../utils/entity";
import { mushroomIconStyle, toRgbCss, type ColorValue } from "../utils/color";
import { tr, haLang } from "../utils/i18n";
import "./editors/switch-card-editor";

const MAX_OPTIONS = 5;
const PILL_INSET = 4;

type CardLayout = "horizontal" | "vertical";
type SliderSize = "small" | "medium" | "large";

const SLIDER_WIDTH: Record<SliderSize, string> = {
  small: "36%",
  medium: "48%",
  large: "62%"
};

interface PowerPilzSwitchCardConfig extends LovelaceCardConfig {
  type: "custom:power-pilz-switch-card";
  entity: string;
  name?: string;
  subtitle?: string;
  icon?: string;
  icon_color?: ColorValue;
  /** When true (default), dim the icon to the `disabled` color while the
   *  entity is in its first state (treated as the "off" state). Set to
   *  false to keep the configured `icon_color` regardless of state. */
  dim_inactive_icon?: boolean;
  card_layout?: CardLayout;
  slider_size?: SliderSize;
  slider_color?: ColorValue;
  state_1_color?: ColorValue;
  state_2_color?: ColorValue;
  state_3_color?: ColorValue;
  state_4_color?: ColorValue;
  state_5_color?: ColorValue;
  use_custom_icons?: boolean;
  state_1_icon?: string;
  state_2_icon?: string;
  state_3_icon?: string;
  state_4_icon?: string;
  state_5_icon?: string;
}

export class PowerPilzSwitchCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement("power-pilz-switch-card-editor") as LovelaceCardEditor;
  }

  public static async getStubConfig(hass?: HomeAssistant): Promise<PowerPilzSwitchCardConfig> {
    const states = hass?.states ?? {};
    const entityIds = Object.keys(states);
    const firstByDomain = (domain: string): string | undefined =>
      entityIds.find((id) => id.startsWith(`${domain}.`));

    const entity = firstByDomain("input_select") ?? firstByDomain("select") ?? "input_select.mode";

    return {
      type: "custom:power-pilz-switch-card",
      entity,
      name: "Mode"
    };
  }

  @property({ attribute: false })
  public hass!: HomeAssistant;

  @property({ type: Boolean })
  public preview = false;

  @property({ type: Boolean })
  public editMode = false;

  @property({ reflect: true, type: String })
  public layout: string | undefined;

  @state()
  private _config?: PowerPilzSwitchCardConfig;

  public setConfig(config: PowerPilzSwitchCardConfig): void {
    if (!config.entity) {
      throw new Error("Entity is required");
    }
    const prevLayout = this._config?.card_layout;
    this._config = {
      ...config,
      icon: config.icon ?? "mdi:toggle-switch-outline",
      name: config.name ?? tr(haLang(this.hass), "switch.default_name")
    };
    // When card_layout changes, tell HA to rebuild the grid cell sizing.
    if (prevLayout !== undefined && prevLayout !== config.card_layout) {
      this.requestGridRebuild();
    }
  }

  private requestGridRebuild(): void {
    // HA listens for this event to re-query getGridOptions / getCardSize.
    setTimeout(() => {
      this.dispatchEvent(
        new Event("ll-rebuild", { bubbles: true, composed: true })
      );
    }, 0);
  }

  public getCardSize(): number {
    const layout = this._config?.card_layout ?? "horizontal";
    return layout === "vertical" ? 2 : 1;
  }

  public getGridOptions(): LovelaceGridOptions {
    const layout = this._config?.card_layout ?? "horizontal";
    return layout === "vertical"
      ? { columns: 6, rows: 2, min_columns: 2, min_rows: 2, max_rows: 3 }
      : { columns: 6, rows: 1, min_columns: 4, min_rows: 1, max_rows: 2 };
  }

  public getLayoutOptions(): LovelaceLayoutOptions {
    return {
      grid_columns: 2,
      grid_rows: this.getCardSize()
    };
  }

  // --- Helpers ---

  private isEditorPreview(): boolean {
    return this.preview || this.editMode;
  }

  private entityDomain(entityId: string): string {
    const dot = entityId.indexOf(".");
    return dot > 0 ? entityId.substring(0, dot) : "input_select";
  }

  private getOptions(entity?: HassEntity): string[] {
    const options = entity?.attributes?.options;
    if (!Array.isArray(options)) return [];
    const values = options.filter(
      (opt): opt is string => typeof opt === "string" && opt.trim().length > 0
    );
    return Array.from(new Set(values)).slice(0, MAX_OPTIONS);
  }

  private activeIndex(options: string[], currentState: string): number {
    const idx = options.indexOf(currentState);
    return idx >= 0 ? idx : 0;
  }

  private iconStyle(color?: ColorValue): Record<string, string> {
    return mushroomIconStyle(color);
  }

  private resolvedCardLayout(): CardLayout {
    const raw = this._config?.card_layout;
    return raw === "vertical" ? "vertical" : "horizontal";
  }

  private resolvedSliderSize(): SliderSize {
    const raw = this._config?.slider_size;
    if (raw === "small" || raw === "medium" || raw === "large") return raw;
    return "medium";
  }

  /** Resolve the pill background color for the active state index. */
  private pillColor(activeIdx: number): string | null {
    const config = this._config;
    if (!config) return null;

    const stateColorKey = `state_${activeIdx + 1}_color` as keyof PowerPilzSwitchCardConfig;
    const stateColor = config[stateColorKey] as ColorValue | undefined;
    const stateRgb = toRgbCss(stateColor);
    if (stateRgb) return `rgba(${stateRgb}, 0.25)`;

    const sliderRgb = toRgbCss(config.slider_color);
    if (sliderRgb) return `rgba(${sliderRgb}, 0.25)`;

    return null;
  }

  /** Resolve segment text color for the active state index. */
  private segmentActiveColor(activeIdx: number): string | null {
    const config = this._config;
    if (!config) return null;

    const stateColorKey = `state_${activeIdx + 1}_color` as keyof PowerPilzSwitchCardConfig;
    const stateColor = config[stateColorKey] as ColorValue | undefined;
    const stateRgb = toRgbCss(stateColor);
    if (stateRgb) return `rgb(${stateRgb})`;

    const sliderRgb = toRgbCss(config.slider_color);
    if (sliderRgb) return `rgb(${sliderRgb})`;

    return null;
  }

  /** Get custom icon for a state index, or null. */
  private stateIcon(index: number): string | null {
    const config = this._config;
    if (!config?.use_custom_icons) return null;
    const key = `state_${index + 1}_icon` as keyof PowerPilzSwitchCardConfig;
    const icon = config[key];
    return typeof icon === "string" && icon.length > 0 ? icon : null;
  }

  private segmentContent(index: number): TemplateResult {
    const customIcon = this.stateIcon(index);
    if (customIcon) {
      return html`<ha-icon class="seg-icon" .icon=${customIcon}></ha-icon>`;
    }
    if (index === 0) {
      return html`<span class="seg-symbol"><span class="seg-dot"></span></span>`;
    }
    const bars = Array.from({ length: index }, () => html`<span class="seg-bar"></span>`);
    return html`<span class="seg-symbol seg-bars">${bars}</span>`;
  }

  // --- Slider template (shared between layouts) ---

  private renderSlider(
    options: string[],
    activeIdx: number,
    pillStyle: Record<string, string>,
    activeColor: string | null
  ): TemplateResult {
    return html`
      <div class="slider-track">
        <div class="slider-pill" style=${styleMap(pillStyle)}></div>
        ${options.map(
          (opt, idx) => html`
            <button
              type="button"
              class="slider-segment ${idx === activeIdx ? "active" : ""}"
              style=${idx === activeIdx && activeColor ? styleMap({ color: activeColor }) : nothing}
              data-option=${opt}
              ?disabled=${this.isEditorPreview()}
              @click=${this.handleSegmentTap}
              title=${opt}
              aria-label=${opt}
            >
              ${this.segmentContent(idx)}
            </button>
          `
        )}
      </div>
    `;
  }

  // --- Service calls ---

  private async selectOption(option: string): Promise<void> {
    if (!this._config?.entity || this.isEditorPreview()) return;

    const domain = this.entityDomain(this._config.entity);
    await Promise.resolve(
      this.hass.callService(domain, "select_option", {
        entity_id: this._config.entity,
        option
      })
    );
  }

  // --- Event handlers ---

  private handleSegmentTap = (event: Event): void => {
    event.stopPropagation();
    const target = event.currentTarget;
    if (!(target instanceof HTMLElement)) return;
    const option = target.dataset.option;
    if (option) {
      void this.selectOption(option);
    }
  };

  private handleCardTap = (): void => {
    if (!this._config?.entity || this.isEditorPreview()) return;

    const entity = getEntity(this.hass, this._config.entity);
    if (!entity) return;

    const options = this.getOptions(entity);
    if (options.length === 0) return;

    const current = this.activeIndex(options, entity.state);
    const next = (current + 1) % options.length;
    void this.selectOption(options[next]);
  };

  // --- Render ---

  protected render(): TemplateResult {
    if (!this._config) {
      return html`<ha-card>Invalid configuration</ha-card>`;
    }
    if (!this.hass) {
      return html``;
    }

    const config = this._config;
    const entity = getEntity(this.hass, config.entity);
    const currentState = entity?.state ?? "";
    const options = this.getOptions(entity);
    const activeIdx = this.activeIndex(options, currentState);
    // First state (index 0) is treated as the "off" state: dim the icon
    // to the disabled color unless the user explicitly opts out via
    // `dim_inactive_icon: false`.
    const dimIcon = activeIdx === 0 && config.dim_inactive_icon !== false;
    const iconStyle = this.iconStyle(dimIcon ? "disabled" : config.icon_color);
    const segmentCount = options.length;
    const pillOffset = segmentCount > 0 ? (activeIdx / segmentCount) * 100 : 0;
    const pillWidth = segmentCount > 0 ? 100 / segmentCount : 100;
    const friendlyName = entity?.attributes?.friendly_name;
    const subtitle = config.subtitle || currentState || tr(haLang(this.hass), "common.unknown");
    const cardLayout = this.resolvedCardLayout();
    const sliderSize = this.resolvedSliderSize();
    const sliderWidth = SLIDER_WIDTH[sliderSize];
    const hasSlider = segmentCount > 1;

    // Pill styling
    const customPillColor = this.pillColor(activeIdx);
    const pillStyle: Record<string, string> = {
      width: `calc(${pillWidth}% - ${PILL_INSET * 2}px)`,
      left: `calc(${pillOffset}% + ${PILL_INSET}px)`
    };
    if (customPillColor) {
      pillStyle["background-color"] = customPillColor;
    }
    const activeColor = this.segmentActiveColor(activeIdx);

    // Vertical layout: slider in separate row below
    if (cardLayout === "vertical") {
      return html`
        <ha-card @click=${this.handleCardTap}>
          <div class="container vertical">
            <div class="state-item">
              <div class="icon-wrap">
                <div class="icon-shape" style=${styleMap(iconStyle)}>
                  <ha-icon .icon=${config.icon ?? "mdi:toggle-switch-outline"}></ha-icon>
                </div>
              </div>
              <div class="info">
                <div class="primary">${config.name || friendlyName || tr(haLang(this.hass), "switch.default_name")}</div>
                <div class="secondary">${subtitle}</div>
              </div>
            </div>
            ${hasSlider
              ? html`
                  <div class="slider-row">
                    ${this.renderSlider(options, activeIdx, pillStyle, activeColor)}
                  </div>
                `
              : html``}
          </div>
        </ha-card>
      `;
    }

    // Horizontal layout (default): slider inline
    return html`
      <ha-card @click=${this.handleCardTap}>
        <div class="container horizontal">
          <div class="state-item">
            <div class="icon-wrap">
              <div class="icon-shape" style=${styleMap(iconStyle)}>
                <ha-icon .icon=${config.icon ?? "mdi:toggle-switch-outline"}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${config.name || friendlyName || tr(haLang(this.hass), "switch.default_name")}</div>
              <div class="secondary">${subtitle}</div>
            </div>
            ${hasSlider
              ? html`
                  <div class="slider-wrap" style=${styleMap({ width: sliderWidth })}>
                    ${this.renderSlider(options, activeIdx, pillStyle, activeColor)}
                  </div>
                `
              : html``}
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    :host {
      display: block;
      container-type: inline-size;
      height: 100%;
      box-sizing: border-box;
      --spacing: var(--mush-spacing, 10px);
      --card-primary-font-size: var(--mush-card-primary-font-size, 14px);
      --card-secondary-font-size: var(--mush-card-secondary-font-size, 12px);
      --card-primary-font-weight: var(--mush-card-primary-font-weight, 500);
      --card-secondary-font-weight: var(--mush-card-secondary-font-weight, 400);
      --card-primary-line-height: var(--mush-card-primary-line-height, 20px);
      --card-secondary-line-height: var(--mush-card-secondary-line-height, 16px);
      --card-primary-letter-spacing: var(--mush-card-primary-letter-spacing, 0.1px);
      --card-secondary-letter-spacing: var(--mush-card-secondary-letter-spacing, 0.4px);
      --control-border-radius: var(--mush-control-border-radius, 12px);
      --control-height: var(--mush-control-height, 42px);
      --control-spacing: var(--mush-control-spacing, 12px);
      --icon-size: var(--mush-icon-size, 36px);
      --icon-border-radius: var(--mush-icon-border-radius, 50%);
      --icon-symbol-size: var(--mush-icon-symbol-size, 0.667em);
      --icon-color: var(--primary-text-color);
      --shape-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
    }

    ha-card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      height: 100%;
      cursor: pointer;
      overflow: hidden;
    }

    /* --- Container layouts --- */

    .container.horizontal {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      justify-content: center;
      height: 100%;
      min-height: 0;
    }

    .container.vertical {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      justify-content: space-between;
      height: 100%;
      min-height: 0;
    }

    /* --- Header row --- */

    .state-item {
      display: flex;
      align-items: center;
      gap: var(--spacing);
      padding: var(--spacing);
      min-width: 0;
    }

    .icon-wrap {
      position: relative;
      flex: none;
    }

    .icon-shape {
      position: relative;
      width: var(--icon-size);
      height: var(--icon-size);
      font-size: var(--icon-size);
      border-radius: var(--icon-border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--shape-color);
      transition-property: background-color, box-shadow;
      transition-duration: 280ms;
      transition-timing-function: ease-out;
      box-shadow: 0 0 0 1px transparent;
    }

    .icon-shape ha-icon {
      --mdc-icon-size: var(--icon-symbol-size);
      color: var(--icon-color);
      display: flex;
      line-height: 0;
      transition: color 280ms ease-in-out;
    }

    .info {
      min-width: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .primary {
      font-weight: var(--card-primary-font-weight);
      font-size: var(--card-primary-font-size);
      line-height: var(--card-primary-line-height);
      letter-spacing: var(--card-primary-letter-spacing);
      color: var(--primary-text-color);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .secondary {
      font-weight: var(--card-secondary-font-weight);
      font-size: var(--card-secondary-font-size);
      line-height: var(--card-secondary-line-height);
      letter-spacing: var(--card-secondary-letter-spacing);
      color: var(--secondary-text-color);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    /* --- Slider: horizontal (inline) --- */

    .slider-wrap {
      margin-left: auto;
      flex: 0 1 auto;
      min-width: 0;
      max-width: 100%;
    }

    /* --- Slider: vertical (own row) --- */

    .slider-row {
      padding: 0 var(--control-spacing) var(--control-spacing);
      box-sizing: border-box;
    }

    /* --- Slider track (shared) --- */

    .slider-track {
      position: relative;
      display: flex;
      align-items: stretch;
      /* Match the icon circle height so the slider sits visually
         centered at the same Y as the icon to its left (and the
         schedule-card mode button, timer toggle, etc.). */
      height: var(--icon-size);
      border-radius: var(--control-border-radius);
      background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
      overflow: hidden;
    }

    .slider-pill {
      position: absolute;
      top: 3px;
      bottom: 3px;
      left: 0;
      border-radius: calc(var(--control-border-radius) - 4px);
      background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
      transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                  background-color 0.3s ease;
      pointer-events: none;
      z-index: 0;
    }

    .slider-segment {
      position: relative;
      z-index: 1;
      flex: 1 1 0;
      min-width: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: none;
      margin: 0;
      padding: 0;
      cursor: pointer;
      color: var(--secondary-text-color);
      transition: color 0.2s ease;
      -webkit-tap-highlight-color: transparent;
      overflow: hidden;
    }

    .slider-segment.active {
      color: var(--primary-text-color);
    }

    /* --- Segment symbols --- */

    .seg-symbol {
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      pointer-events: none;
    }

    .seg-dot {
      display: block;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      border: 1.5px solid currentColor;
      box-sizing: border-box;
    }

    .seg-bars {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2px;
    }

    .seg-bar {
      display: block;
      width: 1.5px;
      height: 12px;
      border-radius: 1px;
      background-color: currentColor;
    }

    .seg-icon {
      --mdc-icon-size: 18px;
      display: flex;
      line-height: 0;
      pointer-events: none;
    }
  `;
}

export class PowerPilzSwitchCardV2 extends PowerPilzSwitchCard {}

if (!customElements.get("power-pilz-switch-card")) {
  customElements.define("power-pilz-switch-card", PowerPilzSwitchCard);
}

if (!customElements.get("power-pilz-switch-card-v2")) {
  customElements.define("power-pilz-switch-card-v2", PowerPilzSwitchCardV2);
}

declare global {
  interface HTMLElementTagNameMap {
    "power-pilz-switch-card": PowerPilzSwitchCard;
    "power-pilz-switch-card-v2": PowerPilzSwitchCardV2;
  }
}
