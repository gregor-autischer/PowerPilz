export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  locale?: {
    language: string;
  };
  callApi?(
    method: string,
    path: string,
    parameters?: Record<string, unknown>
  ): Promise<unknown>;
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>
  ): Promise<unknown> | void;
}

export interface LovelaceCardConfig {
  type: string;
  [key: string]: unknown;
}

export interface LovelaceGridOptions {
  columns?: number;
  rows?: number;
  min_columns?: number;
  max_columns?: number;
  min_rows?: number;
  max_rows?: number;
}

export interface LovelaceLayoutOptions {
  grid_columns?: number;
  grid_rows?: number;
}

export interface LovelaceCard {
  hass: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
  getCardSize?(): number;
  getGridOptions?(): LovelaceGridOptions;
  getLayoutOptions?(): LovelaceLayoutOptions;
}

export interface LovelaceCardEditor {
  hass?: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-card": HTMLElement;
    "ha-icon": HTMLElement;
  }
}
