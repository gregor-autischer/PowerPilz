import "./cards/energy-card";
import "./cards/energy-breakdown-card";
import "./cards/wallbox-card";

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

const VERSION = "0.1.0";

window.customCards = window.customCards || [];

const cards = [
  {
    type: "custom:power-schwammerl-energy-card",
    name: "PowerSchwammerl Energy Card",
    description: "Mushroom-inspired card for live home energy metrics.",
    preview: true
  },
  {
    type: "custom:power-schwammerl-energy-breakdown-card",
    name: "PowerSchwammerl Energy Breakdown Card",
    description: "Detailed energy telemetry card for drill-down dashboards.",
    preview: true
  },
  {
    type: "custom:power-schwammerl-wallbox-card",
    name: "PowerSchwammerl Wallbox Card",
    description: "Mushroom-inspired card focused on EV wallbox telemetry.",
    preview: true
  }
];

for (const card of cards) {
  if (!window.customCards.some((registered) => registered.type === card.type)) {
    window.customCards.push(card);
  }
}

console.info(
  `%cPOWER SCHWAMMERL%c v${VERSION}`,
  "background: #1f7a45; color: white; padding: 4px 8px; border-radius: 8px 0 0 8px; font-weight: 700;",
  "background: #3e4b53; color: white; padding: 4px 8px; border-radius: 0 8px 8px 0;"
);
