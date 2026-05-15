import { css, type CSSResultGroup } from "lit";

/** Mushroom-style scaffolding shared between the schedule card (blocks)
 *  and the event-schedule card (point-in-time triggers). Both cards have
 *  the same header / day-selector / timeline-track / mode-button layout;
 *  only the marker on the timeline differs (`.timeline-block` for
 *  blocks-mode, `.timeline-pin` for events-mode). Each card adds its
 *  own delta on top of this shared block via the `styles` array. */
export const scheduleSharedStyles: CSSResultGroup = css`
  .placeholder {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    color: var(--secondary-text-color);
  }
  .placeholder ha-icon {
    --mdc-icon-size: 28px;
    opacity: 0.6;
    flex: none;
  }
  .placeholder-text {
    font-size: 13px;
    line-height: 1.4;
  }

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
    overflow: hidden;
    cursor: pointer;
  }

  .container {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 100%;
    min-height: 0;
    justify-content: stretch;
  }

  .container > .row {
    flex: 1 1 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .container > .row-days,
  .container > .row-timeline {
    padding-left: var(--control-spacing);
    padding-right: var(--control-spacing);
  }

  .state-item {
    display: flex;
    align-items: center;
    gap: var(--spacing);
    padding: var(--spacing);
    min-width: 0;
  }

  .icon-wrap { position: relative; flex: none; }

  .icon-shape {
    width: var(--icon-size);
    height: var(--icon-size);
    font-size: var(--icon-size);
    border-radius: var(--icon-border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--shape-color);
    transition: background-color 280ms ease-out;
  }

  .icon-shape ha-icon {
    --mdc-icon-size: var(--icon-symbol-size);
    color: var(--icon-color);
    display: flex;
    line-height: 0;
  }

  .info { min-width: 0; flex: 1; display: flex; flex-direction: column; }

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

  .day-selector {
    display: flex;
    gap: 2px;
    border-radius: 8px;
    overflow: hidden;
    background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.04);
  }

  .day-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    padding: 4px 0;
    margin: 0;
    cursor: pointer;
    font-family: var(--paper-font-body1_-_font-family, inherit);
    font-size: 11px;
    font-weight: 500;
    color: var(--secondary-text-color);
    transition: background-color 0.2s, color 0.2s;
    -webkit-tap-highlight-color: transparent;
    border-radius: 6px;
  }

  .day-btn.today {
    font-weight: 700;
    color: var(--primary-text-color);
  }

  .day-btn.active {
    background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08);
    color: var(--primary-text-color);
  }

  .timeline-container { position: relative; }

  .time-labels {
    position: absolute;
    left: 0;
    right: 0;
    bottom: calc(100% + 2px);
    height: 14px;
    font-size: 10px;
    color: var(--secondary-text-color);
    user-select: none;
    pointer-events: none;
  }

  .time-label {
    position: absolute;
    transform: translateX(-50%);
    white-space: nowrap;
  }

  .timeline-track {
    position: relative;
    height: var(--icon-size);
    border-radius: var(--control-border-radius);
    background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
    overflow: hidden;
    cursor: pointer;
  }

  .now-indicator {
    position: absolute;
    top: 2px;
    bottom: 2px;
    width: 2px;
    border-radius: 1px;
    transform: translateX(-1px);
    pointer-events: none;
    opacity: 0.9;
  }

  .mode-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    border: none;
    background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
    border-radius: calc(var(--control-border-radius) - 2px);
    height: var(--icon-size);
    min-width: var(--icon-size);
    padding: 0 10px;
    margin: 0 0 0 auto;
    box-sizing: border-box;
    cursor: pointer;
    color: var(--primary-text-color);
    font-family: var(--paper-font-body1_-_font-family, inherit);
    font-size: var(--card-secondary-font-size);
    font-weight: 500;
    white-space: nowrap;
    transition: background-color 0.2s;
    -webkit-tap-highlight-color: transparent;
    flex: none;
  }

  .mode-btn ha-icon {
    --mdc-icon-size: 18px;
    display: flex;
    line-height: 0;
    flex: none;
  }

  .mode-label {
    min-width: 28px;
    text-align: center;
  }
`;
