# 🍄‍🟫 Timer card

![Timer card all options](https://raw.githubusercontent.com/gregor-autischer/PowerPilz/main/images/Timer_Card_all_options.png)

## Description

The Timer card is a one-shot "turn this device on at X, optionally off at Y" picker with a compact countdown display and a cancel flow.

The card is built exclusively around the **PowerPilz Smart Timer** helper from the [PowerPilz Companion](https://github.com/gregor-autischer/PowerPilz-Companion) integration. Configure one `switch.*` entity created by the helper. The companion stores the on/off datetimes internally, drives the target device at the scheduled times, and self-deactivates afterwards. The card reads direction, state icons and labels from the helper's attributes.

## Features

- One-tap time picker for on-time (+ optional off-time)
- Smart countdown (`in 12m`, `in 2h 15m`, `in 3d 4h`)
- Cancel flow with confirmation step
- Soft placeholder while the card is being configured
- Dynamic icon based on timer state (different icon/label for idle vs. running)
- Target-device status (on/off) reflected on the card icon colour
- Works with regular switches/lights OR with `select`/`input_select` targets - the timer can change a multi-state entity's option at each boundary

## Configuration variables

All options are available in the Lovelace editor, but you can also use YAML.

| Name | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `type` | string | Required | `custom:power-pilz-timer-card` |
| `companion_entity` | string | Required | The Smart Timer `switch.*` entity from PowerPilz Companion |
| `name` | string | `Timer` | Card title |
| `subtitle` | string | State/time | Subtitle override |
| `icon` | string | `mdi:timer-outline` | Header icon (overridden by the helper's `state_icons` when set) |
| `icon_color` | string \| rgb array | theme | Icon color when device is on |
| `active_color` | string \| rgb array | `primary` | Color of the active-timer pill badge |

## Example YAML

```yaml
type: custom:power-pilz-timer-card
companion_entity: switch.dishwasher_timer
name: Dishwasher
icon_color: blue
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
