import "./cards/energy-card";
import "./cards/graph-card";
import "./cards/graph-stack-card";
import "./cards/wallbox-card";
import "./cards/switch-card";
import "./cards/schedule-card";
import "./cards/event-schedule-card";
import "./cards/timer-card";
import "./cards/heating-curve-card";
import { POWER_PILZ_VERSION } from "./version";

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview: boolean;
    }>;
  }
}

window.customCards = window.customCards || [];

const cards = [
  {
    type: "power-pilz-energy-card",
    name: "PowerPilz Energy Card",
    description: "Mushroom-inspired card for live home energy metrics.",
    preview: true
  },
  {
    type: "power-pilz-wallbox-card",
    name: "PowerPilz Wallbox Card",
    description: "Mushroom-inspired card focused on EV wallbox telemetry.",
    preview: true
  },
  {
    type: "power-pilz-graph-card",
    name: "PowerPilz Graph Card",
    description: "Mushroom-style trend card with full-card historical graph.",
    preview: true
  },
  {
    type: "power-pilz-graph-stack-card",
    name: "PowerPilz Graph Stack Card",
    description: "Mushroom-style cumulative stacked trend card for up to four entities.",
    preview: true
  },
  {
    type: "power-pilz-switch-card",
    name: "PowerPilz Switch Card",
    description: "Mushroom-style mode selector with sliding pill for input_select / select entities.",
    preview: true
  },
  {
    type: "power-pilz-schedule-card",
    name: "PowerPilz Schedule Card",
    description: "Visual time schedule card with 24h timeline, day selector and override controls.",
    preview: true
  },
  {
    type: "power-pilz-event-schedule-card",
    name: "PowerPilz Event Schedule Card",
    description: "Weekly point-in-time triggers with pin-marker timeline, trigger-now button and cool-down state.",
    preview: true
  },
  {
    type: "power-pilz-timer-card",
    name: "PowerPilz Timer Card",
    description: "Schedule a one-time future on/off action for any device within the next 7 days.",
    preview: true
  },
  {
    type: "power-pilz-heating-curve-card",
    name: "PowerPilz Heating Curve Card",
    description: "Visual heating curve card with weekly setpoint shape, smooth interpolation and override modes.",
    preview: true
  }
];

for (const card of cards) {
  if (!window.customCards.some((registered) => registered.type === card.type)) {
    window.customCards.push(card);
  }
}

console.info(
  `%cPOWER PILZ%c v${POWER_PILZ_VERSION}`,
  "background: #1f7a45; color: white; padding: 4px 8px; border-radius: 8px 0 0 8px; font-weight: 700;",
  "background: #3e4b53; color: white; padding: 4px 8px; border-radius: 0 8px 8px 0;"
);
