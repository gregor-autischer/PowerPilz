# 🍄‍🟫 Schedule card

## Description

The Schedule card visualises a weekly on/off plan on a 24h timeline with a weekday picker at the top, and exposes a mode-override button (Off / On / Auto) so you can force the controlled device on or off without touching the plan.

The card has two configuration dialects. Pick whichever fits your setup:

- **Companion mode (default for fresh cards, recommended):** point at a single `select.*` entity created by the [PowerPilz Companion](https://github.com/gregor-autischer/PowerPilz-Companion) integration's _Smart Schedule_ helper. The card derives the linked schedule, target device and mode entities from its attributes. One entity to configure, no bridging automations.
- **Manual mode (legacy):** configure three entities individually — a native HA `schedule.*`, the device to control, and an `input_select` with the three mode names. You then need two bridging automations in HA to actually turn the device on/off at schedule boundaries.

Existing dashboards keep working: cards with `schedule_entity` already saved default to manual mode on load.

## Features

- Timeline with configurable window (`24h`, `12h ±6h`, `6h ±3h`)
- Weekday picker — tap a day to preview its blocks
- Live "now" indicator line while viewing today
- Hour labels above the timeline (toggleable)
- Mode button (Off / On / Auto) in the header
- Horizontal (2-row) and vertical (3-row) card layout
- Drop single blocks with one tap, remove with another
- Soft placeholder when no entity is configured yet
- Internal rows always line up visually with single-row Mushroom cards placed next to it
- Full keyboard / voice compatibility via the underlying entities

## Configuration variables

All options are available in the Lovelace editor, but you can also use YAML.

| Name | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `type` | string | Required | `custom:power-pilz-schedule-card` |
| `use_companion` | boolean | `true` for new cards | `true` → configure one Companion helper; `false` → configure the three entities manually |
| `companion_entity` | string | — | (Companion mode) The Smart Schedule `select.*` entity |
| `schedule_entity` | string | — | (Manual mode) A native `schedule.*` helper |
| `switch_entity` | string | — | (Manual mode) Device to control |
| `mode_entity` | string | — | (Manual mode) `input_select` with three mode options |
| `name` | string | Entity name | Card title |
| `subtitle` | string | Mode label | Subtitle override |
| `icon` | string | `mdi:clock-outline` | Header icon |
| `icon_color` | string \| rgb array | theme | Icon color when the device is on |
| `card_layout` | string | `horizontal` | `horizontal` or `vertical` |
| `time_window` | string | `24` | `24`, `12`, or `6` (hours) |
| `active_color` | string \| rgb array | `primary` | Fill colour for active time blocks |
| `show_day_selector` | boolean | `true` | Show the Mo–Su picker row |
| `show_mode_control` | boolean | `true` | Show the Off/On/Auto button |
| `show_now_indicator` | boolean | `true` | Show the vertical line at the current time |
| `show_time_labels` | boolean | `true` | Show hour labels above the timeline |

## Example YAML

### Companion mode (one entity)

```yaml
type: custom:power-pilz-schedule-card
use_companion: true
companion_entity: select.living_room_heating
name: Heating
icon: mdi:radiator
icon_color: orange
time_window: "24"
```

### Manual mode (three entities)

```yaml
type: custom:power-pilz-schedule-card
use_companion: false
schedule_entity: schedule.heating_plan
switch_entity: switch.heating
mode_entity: input_select.heating_mode
name: Heating
icon: mdi:radiator
```

### Compact (vertical, no day selector)

```yaml
type: custom:power-pilz-schedule-card
use_companion: true
companion_entity: select.living_room_heating
card_layout: vertical
show_day_selector: false
time_window: "12"
```

## Companion integration

If the [PowerPilz Companion](https://github.com/gregor-autischer/PowerPilz-Companion) integration is installed and the dashboard has at least one Smart Schedule helper, new Schedule cards start in companion mode with that entity pre-filled. You can also flip the toggle in the visual editor at any time; legacy entity fields you already filled in are preserved when you toggle back.

In companion mode the card reads the following attributes from the helper, so you don't have to configure them manually:

| Attribute on the Smart Schedule entity | Used by the card for |
| :-- | :-- |
| `linked_schedule` | The weekly timeline blocks |
| `target_entity` | The icon's on/off color state |
| `mode_names` / `mode_icons` | Button label + icon |

If a user renames a mode in the Smart Schedule helper's options, the card picks up the new display name automatically on the next state update.
