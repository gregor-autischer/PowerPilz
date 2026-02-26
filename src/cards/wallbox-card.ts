import { LitElement, css, html, type TemplateResult } from "lit";
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
import { getEntity, readNumber, readState, readUnit } from "../utils/entity";
import { mushroomIconStyle } from "../utils/color";
import "./editors/wallbox-card-editor";

const EPSILON = 0.01;
const MODE_MENU_PORTAL_STYLE_ID = "power-pilz-wallbox-mode-menu-portal-style";

interface ServiceCommand {
  domain: string;
  service: string;
  data: Record<string, unknown>;
}

interface PowerPilzWallboxCardConfig extends LovelaceCardConfig {
  type: "custom:power-pilz-wallbox-card";
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
  show_mode_selector?: boolean;
  show_live_value?: boolean;
  show_command_button?: boolean;
  decimals?: number;
}

export class PowerPilzWallboxCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement("power-pilz-wallbox-card-editor") as LovelaceCardEditor;
  }

  public static async getStubConfig(hass?: HomeAssistant): Promise<PowerPilzWallboxCardConfig> {
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
      type: "custom:power-pilz-wallbox-card",
      name: "Wallbox",
      power_entity: powerEntity,
      status_entity: pick("sensor.dev_wallbox_status", "sensor.wallbox_status"),
      mode_entity: modeEntity,
      command_entity: commandEntity,
      decimals: 1
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
  private _config?: PowerPilzWallboxCardConfig;

  @state()
  private _actionBusy = false;

  @state()
  private _modeMenuOpen = false;

  private _modeMenuPortal?: HTMLDivElement;
  private _modeMenuBackdrop?: HTMLDivElement;
  private _modeMenuOptionCount = 0;

  public setConfig(config: PowerPilzWallboxCardConfig): void {
    const powerEntity = config.power_entity ?? "sensor.dev_wallbox_power";
    this._config = {
      ...config,
      icon: config.icon ?? "mdi:power-plug",
      name: config.name ?? "Wallbox",
      show_mode_selector: config.show_mode_selector ?? true,
      show_live_value: config.show_live_value ?? true,
      show_command_button: config.show_command_button ?? true,
      decimals: config.decimals ?? 1,
      power_entity: powerEntity
    };
  }

  public getCardSize(): number {
    return 2;
  }

  public getGridOptions(): LovelaceGridOptions {
    return {
      columns: 6,
      rows: 2,
      min_columns: 4,
      min_rows: 1,
      max_rows: 3
    };
  }

  // For HA < 2024.11
  public getLayoutOptions(): LovelaceLayoutOptions {
    return {
      grid_columns: 2,
      grid_rows: this.getCardSize()
    };
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
    const modeOptions = this.getModeOptions(modeEntity);
    const isCharging = this.isCharging(status, power, config.command_entity);
    const command = this.resolveActionCommand(isCharging);
    const actionLabel = isCharging ? "Stop" : "Start";
    const actionIcon = isCharging ? "mdi:pause" : "mdi:play";
    const statusLabel = this.statusLabel(status, isCharging);
    const powerLabel = this.formatPower(power, powerUnit, config.decimals ?? 1);
    const showModeSelector = this.showModeSelector(config, modeOptions);
    const showLiveValue = this.showLiveValue(config);
    const showCommandButton = this.showCommandButton(config);
    const modeDisabled = this.isEditorPreview() || this._actionBusy || !config.mode_entity || modeOptions.length === 0;
    const selectedMode = modeValue || modeOptions[0] || "Mode";
    const modeChevron = this._modeMenuOpen ? "mdi:chevron-up" : "mdi:chevron-down";
    const iconStyle = this.iconStyle(config.icon_color);
    const trailingCount = Number(showLiveValue) + Number(showCommandButton);
    const inlineTrailing = trailingCount === 1;
    const forceButtonToHeader = showModeSelector && showLiveValue && showCommandButton;
    const showLiveInHeader = inlineTrailing && showLiveValue;
    const showButtonInHeader = (inlineTrailing && showCommandButton) || forceButtonToHeader;
    const showHeaderTrailing = showLiveInHeader || showButtonInHeader;
    const showLiveInActions = showLiveValue && !showLiveInHeader;
    const showButtonInActions = showCommandButton && !showButtonInHeader;
    const renderActions = showModeSelector || showLiveInActions || showButtonInActions;
    const actionsClass = !showModeSelector
      ? "actions no-mode"
      : showLiveInActions || showButtonInActions
        ? showButtonInActions
          ? "actions"
          : "actions no-command"
        : "actions mode-only";
    if ((!showModeSelector || modeDisabled) && this._modeMenuOpen) {
      this.closeModeMenuPortal();
    }
    return html`
      <ha-card>
        <div class="container">
          <div class="state-item ${showHeaderTrailing ? "compact-state" : ""}">
            <div class="icon-wrap">
              <div class="icon-shape" style=${styleMap(iconStyle)}>
                <ha-icon .icon=${config.icon ?? "mdi:ev-station"}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${config.name}</div>
              <div class="secondary">EV charger</div>
            </div>

            ${showHeaderTrailing
              ? html`
                  <div class="compact-trailing ${showButtonInHeader ? "button-only" : ""}">
                    ${showLiveInHeader
                      ? html`
                          <div class="compact-live-value">
                            <span>${statusLabel}</span>
                            <span class="dot">•</span>
                            <span>${powerLabel}</span>
                          </div>
                        `
                      : html``}

                    ${showButtonInHeader
                      ? html`
                          <button
                            type="button"
                            class="action-button"
                            ?disabled=${this.isEditorPreview() || this._actionBusy || !command}
                            @click=${this.handleActionClick}
                            title=${actionLabel}
                            aria-label=${actionLabel}
                          >
                            <ha-icon .icon=${actionIcon}></ha-icon>
                          </button>
                        `
                      : html``}
                  </div>
                `
              : html``}
          </div>

          ${renderActions
            ? html`
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
                            aria-expanded=${this._modeMenuOpen ? "true" : "false"}
                            title="Charging mode"
                          >
                            <span class="mode-select-label">${selectedMode}</span>
                            <ha-icon class="mode-select-chevron" .icon=${modeChevron}></ha-icon>
                          </button>
                        </div>
                      `
                    : html``}

                  ${showLiveInActions
                    ? html`
                        <div class="live-value">
                          <span>${statusLabel}</span>
                          <span class="dot">•</span>
                          <span>${powerLabel}</span>
                        </div>
                      `
                    : html``}

                  ${showButtonInActions
                    ? html`
                        <button
                          type="button"
                          class="action-button"
                          ?disabled=${this.isEditorPreview() || this._actionBusy || !command}
                          @click=${this.handleActionClick}
                          title=${actionLabel}
                          aria-label=${actionLabel}
                        >
                          <ha-icon .icon=${actionIcon}></ha-icon>
                        </button>
                      `
                    : html``}
                </div>
              `
            : html``}
        </div>
      </ha-card>
    `;
  }

  private getModeOptions(entity?: HassEntity): string[] {
    const entityOptions = entity?.attributes.options;
    if (Array.isArray(entityOptions)) {
      const values = entityOptions.filter(
        (option): option is string => typeof option === "string" && option.trim().length > 0
      );
      if (values.length > 0) {
        return Array.from(new Set(values));
      }
    }
    return [];
  }

  private showModeSelector(config: PowerPilzWallboxCardConfig, modeOptions?: string[]): boolean {
    if (config.show_mode_selector === false) {
      return false;
    }
    return Boolean(config.mode_entity) && Array.isArray(modeOptions) && modeOptions.length > 0;
  }

  private showCommandButton(config: PowerPilzWallboxCardConfig): boolean {
    return config.show_command_button !== false;
  }

  private showLiveValue(config: PowerPilzWallboxCardConfig): boolean {
    return config.show_live_value !== false;
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
    return mushroomIconStyle(value);
  }

  public disconnectedCallback(): void {
    this.closeModeMenuPortal();
    super.disconnectedCallback();
  }

  private isEditorPreview(): boolean {
    return this.preview || this.editMode || Boolean(this.closest("hui-card-preview"));
  }

  private ensureModeMenuPortalStyles(): void {
    if (document.getElementById(MODE_MENU_PORTAL_STYLE_ID)) {
      return;
    }
    const style = document.createElement("style");
    style.id = MODE_MENU_PORTAL_STYLE_ID;
    style.textContent = `
      .power-pilz-mode-menu-portal {
        position: fixed;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 6px;
        box-sizing: border-box;
        border-radius: var(--mush-control-border-radius, 12px);
        border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color, rgba(0, 0, 0, 0.12)));
        background: var(--ha-card-background, var(--card-background-color, #fff));
        box-shadow: var(--ha-card-box-shadow, 0 6px 16px rgba(0, 0, 0, 0.18));
        overflow-y: auto;
      }
      .power-pilz-mode-menu-backdrop {
        position: fixed;
        inset: 0;
        z-index: 9999;
        background: transparent;
      }
      .power-pilz-mode-menu-option {
        cursor: pointer;
        border: none;
        border-radius: calc(var(--mush-control-border-radius, 12px) - 2px);
        margin: 0;
        padding: 0 10px;
        height: 34px;
        width: 100%;
        text-align: left;
        box-sizing: border-box;
        background: transparent;
        color: var(--primary-text-color);
        font-family: var(--paper-font-body1_-_font-family, inherit);
        font-size: var(--mush-card-primary-font-size, 14px);
        font-weight: var(--mush-card-primary-font-weight, 500);
        line-height: var(--mush-card-primary-line-height, 20px);
        letter-spacing: var(--mush-card-primary-letter-spacing, 0.1px);
      }
      .power-pilz-mode-menu-option:hover {
        background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08);
      }
      .power-pilz-mode-menu-option.selected {
        background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.12);
      }
    `;
    document.head.append(style);
  }

  private currentModeButton(): HTMLButtonElement | null {
    return this.renderRoot?.querySelector(".mode-select") as HTMLButtonElement | null;
  }

  private positionModeMenuPortal(anchor?: HTMLElement): void {
    const portal = this._modeMenuPortal;
    if (!portal) {
      return;
    }

    const trigger = anchor ?? this.currentModeButton();
    if (!trigger) {
      return;
    }

    const rect = trigger.getBoundingClientRect();
    const viewportPadding = 8;
    const verticalGap = 6;
    const maxHeight = Math.max(96, Math.min(280, window.innerHeight - viewportPadding * 2));
    const estimatedHeight = Math.min(
      maxHeight,
      (this._modeMenuOptionCount * 34)
      + (Math.max(0, this._modeMenuOptionCount - 1) * 4)
      + 14
    );
    const measuredHeight = portal.offsetHeight > 0
      ? Math.min(maxHeight, portal.offsetHeight)
      : estimatedHeight;
    const width = Math.max(120, Math.round(rect.width));

    const spaceBelow = window.innerHeight - rect.bottom - viewportPadding;
    const openUp = spaceBelow < measuredHeight + verticalGap && rect.top - viewportPadding > spaceBelow;

    let left = rect.left;
    left = Math.max(viewportPadding, Math.min(left, window.innerWidth - width - viewportPadding));
    let top = openUp
      ? rect.top - verticalGap - measuredHeight
      : rect.bottom + verticalGap;
    top = Math.max(viewportPadding, Math.min(top, window.innerHeight - measuredHeight - viewportPadding));

    portal.style.maxHeight = `${maxHeight}px`;
    portal.style.width = `${width}px`;
    portal.style.left = `${Math.round(left)}px`;
    portal.style.top = `${Math.round(top)}px`;
  }

  private openModeMenuPortal(anchor: HTMLElement, options: string[], selectedMode: string): void {
    this.closeModeMenuPortal();
    this.ensureModeMenuPortalStyles();

    const backdrop = document.createElement("div");
    backdrop.className = "power-pilz-mode-menu-backdrop";
    backdrop.addEventListener("click", () => {
      this.closeModeMenuPortal();
    });

    const portal = document.createElement("div");
    portal.className = "power-pilz-mode-menu-portal";
    portal.setAttribute("role", "listbox");

    options.forEach((option) => {
      const optionButton = document.createElement("button");
      optionButton.type = "button";
      optionButton.className = `power-pilz-mode-menu-option ${option === selectedMode ? "selected" : ""}`;
      optionButton.dataset.option = option;
      optionButton.setAttribute("role", "option");
      optionButton.setAttribute("aria-selected", option === selectedMode ? "true" : "false");
      optionButton.textContent = option;
      optionButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const nextOption = (event.currentTarget as HTMLButtonElement | null)?.dataset.option ?? "";
        if (!nextOption) {
          return;
        }
        this.closeModeMenuPortal();
        void this.selectModeOption(nextOption);
      });
      portal.append(optionButton);
    });

    document.body.append(backdrop);
    document.body.append(portal);
    this._modeMenuBackdrop = backdrop;
    this._modeMenuPortal = portal;
    this._modeMenuOptionCount = options.length;
    this._modeMenuOpen = true;

    this.positionModeMenuPortal(anchor);
  }

  private closeModeMenuPortal(): void {
    if (this._modeMenuPortal) {
      this._modeMenuPortal.remove();
      this._modeMenuPortal = undefined;
    }
    if (this._modeMenuBackdrop) {
      this._modeMenuBackdrop.remove();
      this._modeMenuBackdrop = undefined;
    }
    this._modeMenuOptionCount = 0;
    if (this._modeMenuOpen) {
      this._modeMenuOpen = false;
    }
  };

  private toggleModeMenu = (event: Event): void => {
    event.stopPropagation();

    if (this.isEditorPreview() || !this._config?.mode_entity || this._actionBusy) {
      return;
    }

    const entity = getEntity(this.hass, this._config.mode_entity);
    const current = entity?.state ?? "";
    const options = this.getModeOptions(entity);
    if (options.length === 0) {
      return;
    }

    if (this._modeMenuOpen) {
      this.closeModeMenuPortal();
      return;
    }

    const anchor = event.currentTarget as HTMLElement | null;
    if (!anchor) {
      return;
    }

    this.openModeMenuPortal(anchor, options, current || options[0] || "Mode");
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
    if (this.isEditorPreview() || !this._config || this._actionBusy) {
      return;
    }

    event.stopPropagation();
    this.closeModeMenuPortal();
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
      height: 100%;
      overflow: visible;
    }

    .container {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      justify-content: space-between;
      height: 100%;
      min-height: 0;
      overflow: visible;
    }

    .state-item {
      display: flex;
      align-items: center;
      gap: var(--spacing);
      padding: var(--spacing);
      min-width: 0;
    }

    .state-item.compact-state {
      align-items: center;
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

    .compact-trailing {
      margin-left: auto;
      min-width: 0;
      max-width: min(52%, 280px);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--spacing);
    }

    .compact-trailing.button-only {
      max-width: none;
    }

    .compact-live-value {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 6px;
      min-width: 0;
      color: var(--primary-text-color);
      font-size: var(--card-primary-font-size);
      font-weight: var(--card-primary-font-weight);
      line-height: var(--card-primary-line-height);
      letter-spacing: var(--card-primary-letter-spacing);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .compact-live-value .dot {
      color: var(--secondary-text-color);
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
      grid-template-columns: clamp(122px, 46%, 220px) minmax(0, 1fr) auto;
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
      overflow: visible;
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

    .live-value {
      grid-column: 2;
      display: flex;
      align-items: center;
      justify-content: flex-start;
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

    .actions.no-command {
      grid-template-columns: minmax(0, 1fr) auto;
    }

    .actions.no-command .mode-select-wrap {
      grid-column: 1;
    }

    .actions.no-command .live-value {
      grid-column: 2;
      justify-content: flex-start;
    }

    .actions.no-mode.no-command {
      grid-template-columns: minmax(0, 1fr);
    }

    .actions.no-mode.no-command .live-value {
      grid-column: 1;
      justify-content: flex-start;
    }

    .actions.mode-only {
      grid-template-columns: minmax(0, 1fr);
    }

    .actions.mode-only .mode-select-wrap {
      grid-column: 1;
    }

    .state-item.compact-state .action-button {
      height: var(--icon-size);
      width: var(--icon-size);
      font-size: var(--icon-size);
      border-radius: calc(var(--control-border-radius) - 2px);
      margin-left: 0;
      flex: none;
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

    /* Keep wallbox control placement deterministic across viewport sizes. */
  `;
}

export class PowerPilzWallboxCardV2 extends PowerPilzWallboxCard {}

if (!customElements.get("power-pilz-wallbox-card")) {
  customElements.define("power-pilz-wallbox-card", PowerPilzWallboxCard);
}

if (!customElements.get("power-pilz-wallbox-card-v2")) {
  customElements.define("power-pilz-wallbox-card-v2", PowerPilzWallboxCardV2);
}

declare global {
  interface HTMLElementTagNameMap {
    "power-pilz-wallbox-card": PowerPilzWallboxCard;
    "power-pilz-wallbox-card-v2": PowerPilzWallboxCardV2;
  }
}
