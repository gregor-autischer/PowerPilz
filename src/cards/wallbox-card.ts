import { LitElement, css, html, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import type {
  HassEntity,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  LovelaceCardEditor
} from "../types";
import { getEntity, readNumber, readState, readUnit } from "../utils/entity";
import "./editors/wallbox-card-editor";

const EPSILON = 0.01;
const COLOR_RGB_FALLBACK: Record<string, string> = {
  red: "244, 67, 54",
  pink: "233, 30, 99",
  purple: "156, 39, 176",
  "deep-purple": "103, 58, 183",
  indigo: "63, 81, 181",
  blue: "33, 150, 243",
  "light-blue": "3, 169, 244",
  cyan: "0, 188, 212",
  teal: "0, 150, 136",
  green: "76, 175, 80",
  "light-green": "139, 195, 74",
  lime: "205, 220, 57",
  yellow: "255, 235, 59",
  amber: "255, 193, 7",
  orange: "255, 152, 0",
  "deep-orange": "255, 87, 34",
  brown: "121, 85, 72",
  "light-grey": "189, 189, 189",
  grey: "158, 158, 158",
  "dark-grey": "97, 97, 97",
  "blue-grey": "96, 125, 139",
  black: "0, 0, 0",
  white: "255, 255, 255",
  disabled: "189, 189, 189"
};

interface ServiceCommand {
  domain: string;
  service: string;
  data: Record<string, unknown>;
}

interface PowerSchwammerlWallboxCardConfig extends LovelaceCardConfig {
  type: "custom:power-schwammerl-wallbox-card";
  name?: string;
  icon?: string;
  icon_color?: string | number[];
  power_entity: string;
  status_entity?: string;
  mode_entity?: string;
  mode_options?: string[];
  command_entity?: string;
  start_service?: string;
  stop_service?: string;
  start_service_data?: Record<string, unknown>;
  stop_service_data?: Record<string, unknown>;
  decimals?: number;
}

export class PowerSchwammerlWallboxCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement("power-schwammerl-wallbox-card-editor") as LovelaceCardEditor;
  }

  public static async getStubConfig(hass?: HomeAssistant): Promise<PowerSchwammerlWallboxCardConfig> {
    const states = hass?.states ?? {};
    const entityIds = Object.keys(states);
    const pick = (...candidates: string[]): string | undefined =>
      candidates.find((entityId) => entityId in states);
    const firstByDomain = (domain: string): string | undefined =>
      entityIds.find((entityId) => entityId.startsWith(`${domain}.`));

    const powerEntity = pick("sensor.dev_wallbox_power", "sensor.wallbox_power")
      ?? firstByDomain("sensor")
      ?? "sensor.dev_wallbox_power";
    const modeEntity = pick("input_select.dev_wallbox_mode", "select.wallbox_charging_mode")
      ?? firstByDomain("input_select")
      ?? firstByDomain("select");
    const commandEntity = pick("input_boolean.dev_wallbox_enabled", "switch.wallbox_charging_enabled")
      ?? firstByDomain("input_boolean")
      ?? firstByDomain("switch");

    return {
      type: "custom:power-schwammerl-wallbox-card",
      name: "Wallbox",
      power_entity: powerEntity,
      status_entity: pick("sensor.dev_wallbox_status", "sensor.wallbox_status"),
      mode_entity: modeEntity,
      mode_options: ["Eco", "Fast", "Solar"],
      command_entity: commandEntity,
      decimals: 1
    };
  }

  @property({ attribute: false })
  public hass!: HomeAssistant;

  @state()
  private _config?: PowerSchwammerlWallboxCardConfig;

  @state()
  private _actionBusy = false;

  @state()
  private _modeMenuOpen = false;

  public setConfig(config: PowerSchwammerlWallboxCardConfig): void {
    const powerEntity = config.power_entity ?? "sensor.dev_wallbox_power";
    this._config = {
      ...config,
      icon: config.icon ?? "mdi:power-plug",
      name: config.name ?? "Wallbox",
      decimals: config.decimals ?? 1,
      power_entity: powerEntity
    };
  }

  public getCardSize(): number {
    return 3;
  }

  protected render(): TemplateResult {
    if (!this._config) {
      return html`<ha-card>Invalid configuration</ha-card>`;
    }

    if (!this.hass) {
      return html``;
    }

    const config = this._config;
    const power = readNumber(this.hass, config.power_entity);
    const powerUnit = readUnit(this.hass, config.power_entity) ?? "kW";
    const status = readState(this.hass, config.status_entity);
    const modeEntity = getEntity(this.hass, config.mode_entity);
    const modeValue = modeEntity?.state ?? "";
    const modeOptions = this.getModeOptions(modeEntity, config.mode_options, modeValue);
    const isCharging = this.isCharging(status, power, config.command_entity);
    const command = this.resolveActionCommand(isCharging);
    const actionLabel = isCharging ? "Stop" : "Start";
    const actionIcon = isCharging ? "mdi:pause" : "mdi:play";
    const statusLabel = this.statusLabel(status, isCharging);
    const powerLabel = this.formatPower(power, powerUnit, config.decimals ?? 1);
    const showModeSelector = Boolean(config.mode_entity) || modeOptions.length > 0;
    const modeDisabled = this._actionBusy || !config.mode_entity || modeOptions.length === 0;
    const selectedMode = modeValue || modeOptions[0] || "Mode";
    const modeMenuOpen = this._modeMenuOpen && !modeDisabled && modeOptions.length > 0;
    const modeChevron = modeMenuOpen ? "mdi:chevron-up" : "mdi:chevron-down";
    const iconStyle = this.iconStyle(config.icon_color);
    const actionsClass = showModeSelector ? "actions" : "actions no-mode";

    return html`
      <ha-card>
        <div class="container">
          <div class="state-item">
            <div class="icon-wrap">
              <div class="icon-shape" style=${styleMap(iconStyle)}>
                <ha-icon .icon=${config.icon ?? "mdi:ev-station"}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${config.name}</div>
              <div class="secondary">EV charger</div>
            </div>
          </div>

          <div class=${actionsClass}>
            ${showModeSelector
              ? html`
                  <div class="mode-select-wrap">
                    <button
                      type="button"
                      class="mode-select"
                      ?disabled=${modeDisabled}
                      @click=${this.toggleModeMenu}
                      aria-haspopup="listbox"
                      aria-expanded=${modeMenuOpen ? "true" : "false"}
                      title="Charging mode"
                    >
                      <span class="mode-select-label">${selectedMode}</span>
                      <ha-icon class="mode-select-chevron" .icon=${modeChevron}></ha-icon>
                    </button>
                    ${modeMenuOpen
                      ? html`
                          <div class="mode-menu" role="listbox">
                            ${modeOptions.map(
                              (option) => html`
                                <button
                                  type="button"
                                  class="mode-option ${option === selectedMode ? "selected" : ""}"
                                  data-option=${option}
                                  role="option"
                                  aria-selected=${option === selectedMode ? "true" : "false"}
                                  @click=${this.handleModeOptionClick}
                                >
                                  ${option}
                                </button>
                              `
                            )}
                          </div>
                        `
                      : html``}
                  </div>
                `
              : html``}

            <div class="live-value">
              <span>${statusLabel}</span>
              <span class="dot">•</span>
              <span>${powerLabel}</span>
            </div>

            <button
              type="button"
              class="action-button"
              ?disabled=${this._actionBusy || !command}
              @click=${this.handleActionClick}
              title=${actionLabel}
              aria-label=${actionLabel}
            >
              <ha-icon .icon=${actionIcon}></ha-icon>
            </button>
          </div>
        </div>
      </ha-card>
    `;
  }

  private getModeOptions(entity?: HassEntity, configured?: string[], current?: string): string[] {
    const configuredOptions = Array.isArray(configured)
      ? configured.filter((option): option is string => typeof option === "string" && option.trim().length > 0)
      : [];
    if (configuredOptions.length > 0) {
      return Array.from(new Set(configuredOptions));
    }

    const entityOptions = entity?.attributes.options;
    if (Array.isArray(entityOptions)) {
      const values = entityOptions.filter(
        (option): option is string => typeof option === "string" && option.trim().length > 0
      );
      if (values.length > 0) {
        return Array.from(new Set(values));
      }
    }

    if (typeof current === "string" && current.trim().length > 0) {
      return [current];
    }
    return [];
  }

  private statusLabel(status: string | undefined, charging: boolean): string {
    if (!status) {
      return charging ? "Charging" : "Idle";
    }
    return status
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  private formatPower(value: number | null, unit: string, decimals: number): string {
    if (value === null) {
      return `-- ${unit}`;
    }
    return `${Math.abs(value).toFixed(decimals)} ${unit}`;
  }

  private isCharging(status: string | undefined, power: number | null, commandEntity?: string): boolean {
    if (status) {
      const normalized = status.toLowerCase();
      if (["charging", "active", "running", "on", "start", "started"].includes(normalized)) {
        return true;
      }
      if (["idle", "paused", "stopped", "off", "standby", "complete"].includes(normalized)) {
        return false;
      }
    }

    if (commandEntity) {
      const commandState = readState(this.hass, commandEntity)?.toLowerCase();
      if (commandState === "on") {
        return true;
      }
      if (commandState === "off") {
        return false;
      }
    }

    return power !== null && power > EPSILON;
  }

  private parseServiceAction(value?: string): { domain: string; service: string } | null {
    if (!value) {
      return null;
    }
    const [domain, service] = value.split(".");
    if (!domain || !service) {
      return null;
    }
    return { domain, service };
  }

  private entityDomain(entityId: string): string {
    return entityId.split(".")[0];
  }

  private objectValue(value: unknown): Record<string, unknown> {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value as Record<string, unknown>;
    }
    return {};
  }

  private resolveActionCommand(isCharging: boolean): ServiceCommand | null {
    if (!this._config) {
      return null;
    }

    const config = this._config;
    const explicit = this.parseServiceAction(isCharging ? config.stop_service : config.start_service);

    if (explicit) {
      const data = this.objectValue(isCharging ? config.stop_service_data : config.start_service_data);
      if (config.command_entity && data.entity_id === undefined) {
        data.entity_id = config.command_entity;
      }
      return { ...explicit, data };
    }

    if (config.command_entity) {
      return {
        domain: this.entityDomain(config.command_entity),
        service: isCharging ? "turn_off" : "turn_on",
        data: { entity_id: config.command_entity }
      };
    }

    return null;
  }

  private iconStyle(value?: string | number[]): Record<string, string> {
    const rgbCss = this.toRgbCss(value);
    if (rgbCss) {
      return {
        "--icon-color": `rgb(${rgbCss})`,
        "--shape-color": `rgba(${rgbCss}, 0.2)`
      };
    }

    if (typeof value === "string" && value.trim().length > 0 && value !== "none") {
      const cssColor = value.trim();
      return {
        "--icon-color": cssColor,
        "--shape-color": `color-mix(in srgb, ${cssColor} 20%, transparent)`
      };
    }

    return {};
  }

  private toRgbCss(value?: string | number[]): string | null {
    if (Array.isArray(value) && value.length >= 3) {
      const nums = value.slice(0, 3).map((channel) => Number(channel));
      if (nums.every((channel) => Number.isFinite(channel))) {
        const [r, g, b] = nums.map((channel) => Math.max(0, Math.min(255, Math.round(channel))));
        return `${r}, ${g}, ${b}`;
      }
      return null;
    }

    if (typeof value !== "string") {
      return null;
    }

    const raw = value.trim().toLowerCase();
    if (raw === "none") {
      return null;
    }
    if (raw.startsWith("var(--rgb-")) {
      return raw;
    }
    if (raw === "state") {
      return "var(--rgb-state-entity, var(--rgb-primary-color, 3, 169, 244))";
    }
    if (raw === "primary") {
      return "var(--rgb-primary-color, 3, 169, 244)";
    }
    if (raw === "accent") {
      return "var(--rgb-accent-color, 255, 152, 0)";
    }
    if (raw in COLOR_RGB_FALLBACK) {
      return `var(--rgb-${raw}, ${COLOR_RGB_FALLBACK[raw]})`;
    }

    const hex = raw;
    const short = /^#([a-fA-F0-9]{3})$/;
    const long = /^#([a-fA-F0-9]{6})$/;

    if (short.test(hex)) {
      const [, raw] = hex.match(short) ?? [];
      if (!raw) {
        return null;
      }
      const r = parseInt(raw[0] + raw[0], 16);
      const g = parseInt(raw[1] + raw[1], 16);
      const b = parseInt(raw[2] + raw[2], 16);
      return `${r}, ${g}, ${b}`;
    }

    if (long.test(hex)) {
      const [, raw] = hex.match(long) ?? [];
      if (!raw) {
        return null;
      }
      const r = parseInt(raw.slice(0, 2), 16);
      const g = parseInt(raw.slice(2, 4), 16);
      const b = parseInt(raw.slice(4, 6), 16);
      return `${r}, ${g}, ${b}`;
    }

    return null;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("pointerdown", this.handleGlobalPointerDown, true);
    window.addEventListener("keydown", this.handleGlobalKeyDown, true);
  }

  public disconnectedCallback(): void {
    window.removeEventListener("pointerdown", this.handleGlobalPointerDown, true);
    window.removeEventListener("keydown", this.handleGlobalKeyDown, true);
    super.disconnectedCallback();
  }

  private handleGlobalPointerDown = (event: Event): void => {
    if (!this._modeMenuOpen) {
      return;
    }
    const path = event.composedPath();
    if (!path.includes(this)) {
      this._modeMenuOpen = false;
    }
  };

  private handleGlobalKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "Escape" && this._modeMenuOpen) {
      this._modeMenuOpen = false;
    }
  };

  private toggleModeMenu = (event: Event): void => {
    event.stopPropagation();

    if (!this._config?.mode_entity) {
      return;
    }

    if (this._actionBusy) {
      return;
    }

    const entity = getEntity(this.hass, this._config.mode_entity);
    const current = entity?.state ?? "";
    const options = this.getModeOptions(entity, this._config.mode_options, current);
    if (options.length === 0) {
      return;
    }

    this._modeMenuOpen = !this._modeMenuOpen;
  };

  private handleModeOptionClick = async (event: Event): Promise<void> => {
    event.stopPropagation();
    const option = (event.currentTarget as HTMLElement | null)?.dataset.option ?? "";
    if (!option) {
      return;
    }

    this._modeMenuOpen = false;
    await this.selectModeOption(option);
  };

  private selectModeOption = async (option: string): Promise<void> => {
    if (!this._config?.mode_entity) {
      return;
    }

    const entity = getEntity(this.hass, this._config.mode_entity);
    if (!entity || entity.state === option) {
      return;
    }

    const domain = this.entityDomain(this._config.mode_entity);
    await Promise.resolve(
      this.hass.callService(domain, "select_option", {
        entity_id: this._config.mode_entity,
        option
      })
    );
  };

  private handleActionClick = async (event: Event): Promise<void> => {
    if (!this._config || this._actionBusy) {
      return;
    }

    event.stopPropagation();
    this._modeMenuOpen = false;

    const power = readNumber(this.hass, this._config.power_entity);
    const status = readState(this.hass, this._config.status_entity);
    const isCharging = this.isCharging(status, power, this._config.command_entity);
    const command = this.resolveActionCommand(isCharging);

    if (!command) {
      return;
    }

    this._actionBusy = true;
    try {
      await Promise.resolve(this.hass.callService(command.domain, command.service, command.data));
    } finally {
      window.setTimeout(() => {
        this._actionBusy = false;
      }, 250);
    }
  }

  static styles = css`
    :host {
      display: block;
      container-type: inline-size;
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
      --control-button-ratio: var(--mush-control-button-ratio, 1);
      --control-icon-size: var(--mush-control-icon-size, 0.5em);
      --control-spacing: var(--mush-control-spacing, 12px);
      --icon-size: var(--mush-icon-size, 36px);
      --icon-border-radius: var(--mush-icon-border-radius, 50%);
      --icon-symbol-size: var(--mush-icon-symbol-size, 0.667em);
      --icon-color: var(--primary-text-color);
      --icon-color-disabled: rgb(var(--rgb-disabled, 189, 189, 189));
      --shape-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
      --shape-color-disabled: rgba(var(--rgb-disabled, 189, 189, 189), 0.2);
    }

    ha-card {
      display: flex;
      flex-direction: column;
      justify-content: var(--mush-layout-align, center);
      box-sizing: border-box;
      height: auto;
    }

    .container {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      justify-content: space-between;
    }

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

    .actions {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto auto;
      align-items: center;
      column-gap: var(--control-spacing);
      row-gap: 8px;
      padding: var(--control-spacing);
      padding-top: 0;
      box-sizing: border-box;
      overflow: visible;
    }

    .mode-select-wrap {
      grid-column: 1;
      min-width: 0;
      max-width: none;
      width: 100%;
      height: var(--control-height);
      position: relative;
    }

    .mode-select {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      border: none;
      border-radius: var(--control-border-radius);
      margin: 0;
      padding: 0 12px;
      box-sizing: border-box;
      background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
      color: var(--primary-text-color);
      font-family: var(--paper-font-body1_-_font-family, inherit);
      font-size: var(--card-primary-font-size);
      font-weight: var(--card-primary-font-weight);
      line-height: var(--card-primary-line-height);
      letter-spacing: var(--card-primary-letter-spacing);
      text-align: left;
    }

    .mode-select:disabled {
      cursor: not-allowed;
      color: rgb(var(--rgb-disabled, 189, 189, 189));
      background-color: rgba(var(--rgb-disabled, 189, 189, 189), 0.2);
    }

    .mode-select-label {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .mode-select-chevron {
      --mdc-icon-size: 18px;
      color: var(--secondary-text-color);
      flex: none;
      margin-left: 10px;
      pointer-events: none;
    }

    .mode-select:disabled .mode-select-chevron {
      color: rgb(var(--rgb-disabled, 189, 189, 189));
    }

    .mode-menu {
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      right: 0;
      z-index: 2;
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 6px;
      border-radius: var(--control-border-radius);
      box-sizing: border-box;
      background: var(--ha-card-background, var(--card-background-color, white));
      border: var(--ha-card-border-width, 1px) solid
        var(--ha-card-border-color, var(--divider-color, rgba(0, 0, 0, 0.12)));
      box-shadow: var(--ha-card-box-shadow, 0 6px 16px rgba(0, 0, 0, 0.18));
    }

    .mode-option {
      cursor: pointer;
      border: none;
      border-radius: calc(var(--control-border-radius) - 2px);
      margin: 0;
      padding: 0 10px;
      height: 34px;
      width: 100%;
      text-align: left;
      box-sizing: border-box;
      background: transparent;
      color: var(--primary-text-color);
      font-family: var(--paper-font-body1_-_font-family, inherit);
      font-size: var(--card-primary-font-size);
      font-weight: var(--card-primary-font-weight);
      line-height: var(--card-primary-line-height);
      letter-spacing: var(--card-primary-letter-spacing);
    }

    .mode-option:hover {
      background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08);
    }

    .mode-option.selected {
      background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.12);
    }

    .live-value {
      grid-column: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      min-width: 0;
      padding: 0 2px;
      color: var(--primary-text-color);
      font-size: var(--card-primary-font-size);
      font-weight: var(--card-primary-font-weight);
      line-height: var(--card-primary-line-height);
      letter-spacing: var(--card-primary-letter-spacing);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .live-value .dot {
      color: var(--secondary-text-color);
    }

    .action-button {
      grid-column: 3;
      justify-self: end;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--control-height);
      width: calc(var(--control-height) * var(--control-button-ratio));
      border-radius: var(--control-border-radius);
      border: none;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
      line-height: 0;
      font-size: var(--control-height);
      margin-left: auto;
    }

    .actions.no-mode {
      grid-template-columns: minmax(0, 1fr) auto;
    }

    .actions.no-mode .live-value {
      grid-column: 1;
      justify-content: flex-start;
    }

    .actions.no-mode .action-button {
      grid-column: 2;
    }

    .action-button:disabled {
      cursor: not-allowed;
      background-color: rgba(var(--rgb-disabled, 189, 189, 189), 0.2);
    }

    .action-button ha-icon {
      --mdc-icon-size: var(--control-icon-size);
      color: var(--primary-text-color);
      pointer-events: none;
    }

    .action-button:disabled ha-icon {
      color: var(--icon-color-disabled);
    }

    @container (max-width: 420px) {
      .actions {
        grid-template-columns: minmax(0, 1fr) auto;
      }

      .mode-select-wrap {
        grid-column: 1 / -1;
        grid-row: 1;
      }

      .live-value {
        grid-column: 1;
        grid-row: 2;
        justify-content: flex-start;
      }

      .action-button {
        grid-column: 2;
        grid-row: 2;
      }

      .actions.no-mode .live-value {
        grid-row: 1;
      }

      .actions.no-mode .action-button {
        grid-row: 1;
      }
    }
  `;
}

export class PowerSchwammerlWallboxCardV2 extends PowerSchwammerlWallboxCard {}

if (!customElements.get("power-schwammerl-wallbox-card")) {
  customElements.define("power-schwammerl-wallbox-card", PowerSchwammerlWallboxCard);
}

if (!customElements.get("power-schwammerl-wallbox-card-v2")) {
  customElements.define("power-schwammerl-wallbox-card-v2", PowerSchwammerlWallboxCardV2);
}

declare global {
  interface HTMLElementTagNameMap {
    "power-schwammerl-wallbox-card": PowerSchwammerlWallboxCard;
    "power-schwammerl-wallbox-card-v2": PowerSchwammerlWallboxCardV2;
  }
}
