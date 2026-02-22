import type { HassEntity, HomeAssistant } from "../types";

export const getEntity = (hass: HomeAssistant, entityId?: string): HassEntity | undefined => {
  if (!entityId) {
    return undefined;
  }
  return hass.states[entityId];
};

export const readNumber = (hass: HomeAssistant, entityId?: string): number | null => {
  const entity = getEntity(hass, entityId);
  if (!entity) {
    return null;
  }
  const value = Number(entity.state);
  return Number.isFinite(value) ? value : null;
};

export const readUnit = (hass: HomeAssistant, entityId?: string): string | undefined => {
  const entity = getEntity(hass, entityId);
  if (!entity) {
    return undefined;
  }

  const unit = entity.attributes.unit_of_measurement;
  return typeof unit === "string" ? unit : undefined;
};

export const readState = (hass: HomeAssistant, entityId?: string): string | undefined => {
  const entity = getEntity(hass, entityId);
  return entity?.state;
};
