# 🍄‍🟫 PowerPilz

[![hacs](https://img.shields.io/badge/hacs-custom-orange.svg?style=flat-square)](https://github.com/hacs/integration) [![version](https://img.shields.io/github/v/release/gregor-autischer/PowerPilz?sort=semver&style=flat-square&label=version)](https://github.com/gregor-autischer/PowerPilz/releases) [![downloads](https://img.shields.io/github/downloads/gregor-autischer/PowerPilz/total?style=flat-square&label=downloads&color=orange)](https://github.com/gregor-autischer/PowerPilz/releases)

<p align="center">
  <img src="https://raw.githubusercontent.com/gregor-autischer/PowerPilz/main/images/PowerPilz_main.png" alt="PowerPilz cards overview" width="100%">
</p>

## What is PowerPilz ?

PowerPilz is a collection of cards for the Home Assistant Dashboard UI, focused on energy and EV charging use cases.

The name is modeled after Mushroom. `Pilz` is German for `mushroom`, and the visual style follows that design language.

### Features

- Editor support for all cards and all important options
- Mushroom-like spacing, typography and controls
- **Energy flow** card with optional sub-nodes and trend overlays
- **Wallbox** card focused on EV charging control and status
- **Switch** card with sliding pill mode selector for input_select / select entities
- **Schedule** card — 24h timeline with weekday picker and mode override button
- **Timer** card — one-shot on/off time picker with countdown display
- **Graph** and **Graph stack** cards with up to 4 entities
- First-class integration with [PowerPilz Companion](https://github.com/gregor-autischer/PowerPilz-Companion) — a companion HA integration that collapses the Schedule card's 3 entities (or the Timer card's 4) down to a single Smart helper entity, and adds autonomous driving of the target device with no bridging automations needed
- HACS-ready project structure

## Installation

### HACS

Install PowerPilz through HACS by adding this repository as a custom repository:

- Repository URL: `https://github.com/gregor-autischer/PowerPilz`
- Category: `Dashboard`

Steps:

1. Open HACS in Home Assistant.
2. Open the menu (top-right) and click `Custom repositories`.
3. Paste `https://github.com/gregor-autischer/PowerPilz` into `Repository`.
4. Select `Dashboard` as the category.
5. Click `Add`.
6. Search for `PowerPilz` in HACS Frontend and click `Download`.
7. Reload browser when prompted.

If resource auto-registration is disabled or you use YAML dashboards, add:

```yaml
resources:
  - url: /hacsfiles/<repository-name>/power-pilz.js
    type: module
```

### Video guide (German)

If you prefer a walkthrough, this video explains the Energy card setup step by step (**in German**):

<p align="center">
  <a href="https://youtu.be/u9PQqn1xABs">
    <img src="https://img.youtube.com/vi/u9PQqn1xABs/maxresdefault.jpg" alt="Mushroom Dashboard für Energie in Home Assistant? Das geht jetzt - mit PowerPilz! (German)" width="720">
  </a>
</p>


## Usage

All PowerPilz cards can be configured with the Home Assistant dashboard UI editor.

1. Open your dashboard.
2. Click the 3-dot menu in the top-right.
3. Click `Edit dashboard`.
4. Click `+ Add card`.
5. Search for `Custom: PowerPilz ...` cards.

### Cards

- ⚡ [Energy card](docs/cards/energy.md)
- 🔌 [Wallbox card](docs/cards/wallbox.md)
- 🎚️ [Switch card](docs/cards/switch.md)
- 📅 [Schedule card](docs/cards/schedule.md)
- ⏱ [Timer card](docs/cards/timer.md)
- 📈 [Graph card](docs/cards/graph.md)
- 🧱 [Graph stack card](docs/cards/graph-stack.md)

## Companion integration

The [PowerPilz Companion](https://github.com/gregor-autischer/PowerPilz-Companion) integration adds two new helper types to Home Assistant that pair naturally with the Schedule and Timer cards:

| Companion helper | Paired card | What you save |
| :-- | :-- | :-- |
| **Smart Schedule** (`select` entity, 3 modes Off/On/Auto + linked native Schedule) | Schedule card | Configure 1 entity on the card instead of 3. The companion auto-creates the native HA Schedule helper, drives the target device when in Auto mode, supports manual overrides with optional auto-restore at the next schedule boundary. |
| **Smart Timer** (`switch` entity that autonomously drives a target at on/off times) | Timer card | Configure 1 entity on the card instead of 4. The companion fires the configured events at the set times with no bridging automations, and can target `select`/`input_select` entities (including another Smart Schedule!) to change their option at a boundary. |

The cards still work without the Companion integration — just fill in the legacy entity fields manually. But with it installed you get a drastically simpler setup and no YAML gluing.

**Install both:** [PowerPilz-Companion on HACS (Integration)](https://github.com/gregor-autischer/PowerPilz-Companion) + this repository on HACS (Dashboard).

## Development

### Local build

```sh
npm install
npm run build
```

### Dev server

```sh
npm run dev
```

### Production release workflow

Releases are built automatically when changes are merged into branch `build` (GitHub Action: `Production Release`).

Before merging to `build`, you must bump the version in both files:

1. `package.json`
2. `src/version.ts` (`POWER_PILZ_VERSION`)

Notes:

- The workflow creates tag/release `v<package.json version>` and uploads `power-pilz.js`.
- If that tag already exists, the workflow fails until you bump the version.
- After updating in HACS, reload browser when prompted.

## Troubleshooting

### I don't see the latest changes

1. Hard refresh the browser (or clear browser cache).
2. Confirm the newest `power-pilz.js` is loaded in dashboard resources.
3. If using HACS, re-download the latest version.

## Credits

Design direction is inspired by Mushroom cards.

<!-- Badges -->

[hacs-url]: https://github.com/hacs/integration
[hacs-badge]: https://img.shields.io/badge/hacs-custom-orange.svg?style=flat-square
[version-url]: https://github.com/gregor-autischer/PowerPilz/releases
[version-badge]: https://img.shields.io/github/v/release/gregor-autischer/PowerPilz?sort=semver&style=flat-square&label=version
