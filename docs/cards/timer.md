# 🍄‍🟫 Timer card

## Description

The Timer card is a one-shot "turn this device on at X, optionally off at Y" picker with a compact countdown display and a cancel flow.

Two configuration dialects:

- **Companion mode (default for fresh cards, recommended):** point at a single `switch.*` entity created by the [PowerPilz Companion](https://github.com/gregor-autischer/PowerPilz-Companion) integration's _Smart Timer_ helper. The companion stores the on/off datetimes internally, drives the target device at the scheduled times, and self-deactivates afterwards. The card reads direction, state icons + labels from the helper's attributes.
- **Manual mode (legacy):** configure four entities individually — the target device plus three HA input helpers (`input_datetime` for on, `input_datetime` for off, `input_boolean` for the active flag). You also need two bridging automations to actually fire the on/off events.

## Features

- One-tap time picker for on-time (+ optional off-time)
- Smart countdown (`in 12m`, `in 2h 15m`, `in 3d 4h`)
- Cancel flow with confirmation step
- Soft placeholder while the card is being configured
- Dynamic icon based on timer state (different icon/label for idle vs. running)
- Target-device status (on/off) reflected on the card icon colour
- Works with regular switches/lights OR with `select`/`input_select` targets (Companion mode) — the timer can change a multi-state entity's option at each boundary

## Configuration variables

All options are available in the Lovelace editor, but you can also use YAML.

| Name | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `type` | string | Required | `custom:power-pilz-timer-card` |
| `use_companion` | boolean | `true` for new cards | `true` → configure one Companion helper; `false` → configure four entities manually |
| `companion_entity` | string | — | (Companion mode) The Smart Timer `switch.*` entity |
| `switch_entity` | string | — | (Manual mode) Device to control |
| `on_datetime_entity` | string | — | (Manual mode) `input_datetime` storing the turn-on time |
| `off_datetime_entity` | string | — | (Manual mode, optional) `input_datetime` for the turn-off time |
| `active_entity` | string | — | (Manual mode) `input_boolean` flag for active timer |
| `name` | string | `Timer` | Card title |
| `subtitle` | string | State/time | Subtitle override |
| `icon` | string | `mdi:timer-outline` | Header icon (Companion mode: overridden by the helper's `state_icons`) |
| `icon_color` | string \| rgb array | theme | Icon color when device is on |
| `active_color` | string \| rgb array | `primary` | Color of the active-timer pill badge |

## Example YAML

### Companion mode (one entity)

```yaml
type: custom:power-pilz-timer-card
use_companion: true
companion_entity: switch.dishwasher_timer
name: Dishwasher
icon_color: blue
```

### Manual mode (four entities)

```yaml
type: custom:power-pilz-timer-card
use_companion: false
name: Dishwasher
icon: mdi:dishwasher
icon_color: blue
switch_entity: switch.dishwasher
on_datetime_entity: input_datetime.dishwasher_on
off_datetime_entity: input_datetime.dishwasher_off
active_entity: input_boolean.dishwasher_timer_active
```

## Companion integration

If [PowerPilz Companion](https://github.com/gregor-autischer/PowerPilz-Companion) is installed, you can create a _Smart Timer_ helper under **Settings → Devices & Services → Helpers → Create Helper → PowerPilz Smart Helpers → Smart Timer**. It bundles:

- The target device (switch / light / input_boolean / fan / climate / select / input_select)
- The on-time and optional off-time (stored in the helper, not as separate input_datetimes)
- An active flag (the entity's state itself)
- A direction setting (`on_only` / `both` / `off_only`)
- Customizable icon + label per state (inactive / active)

The card reads the following Companion attributes:

| Attribute | Used by the card for |
| :-- | :-- |
| `target_entity` | Device icon state |
| `on_datetime` / `off_datetime` | Countdown + "on at…" / "off at…" subtitle |
| `direction` | Picker flow: skips unused boundaries |
| `state_icons` / `state_names` | Dynamic icon + label per active/inactive state |

Updates to the on/off times from the card go through the `powerpilz_companion.set_timer` service.

### Select-target timers (multi-state)

A powerful pattern when both repositories are installed: a Smart Timer can target a Smart Schedule's `select` entity and change its mode at on/off times. Example: "force the heating plan to `On` mode at 18:00, resume `Auto` at 23:00". The companion uses stable logical keys (off/on/auto) internally so renaming modes in the Schedule helper doesn't break the binding.
