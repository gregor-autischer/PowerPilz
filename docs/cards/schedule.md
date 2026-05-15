# 🍄‍🟫 Schedule card

![Schedule card all options](https://raw.githubusercontent.com/gregor-autischer/PowerPilz/main/images/Schedule_Card_all_options.png)

## Description

The Schedule card visualises a weekly on/off plan on a 24h timeline with a weekday picker at the top, and exposes a mode-override button (Off / On / Auto) so you can force the controlled device on or off without touching the plan.

Since v0.4 the card is built exclusively around the **PowerPilz Smart Schedule** helper from the [PowerPilz Companion](https://github.com/gregor-autischer/PowerPilz-Companion) integration. Configure one `select.*` entity — the card reads the weekly blocks, target device and mode options straight from its attributes. **Edit the weekly plan by long-pressing the card** — no separate schedule helper is involved anymore.

## Features

- Timeline with configurable window (`24h`, `12h ±6h`, `6h ±3h`)
- Weekday picker — tap a day to preview its blocks
- Live "now" indicator line while viewing today
- Hour labels above the timeline (toggleable)
- Mode button (Off / On / Auto) in the header with the helper's custom mode names (e.g. "Heizen" / "Aus" / "Zeitplan")
- Horizontal (2-row) and vertical (3-row) card layout
- **Long-press the card** to open the inline weekly-plan editor — drag to create 15-minute-precision blocks, click any block for minute/second-precise time editing plus a free-form `data` payload, tap-to-delete, then save
- **Timeline-tap** toggles 1-hour blocks on 30-minute snap as a quick-edit gesture
- Soft placeholder when no entity is configured yet
- Internal rows always line up visually with single-row Mushroom cards placed next to it

## Configuration variables

All options are available in the Lovelace editor, but you can also use YAML.

| Name | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `type` | string | Required | `custom:power-pilz-schedule-card` |
| `entity` | string | Required | The Smart Schedule `select.*` entity from PowerPilz Companion |
| `name` | string | Entity name | Card title |
| `subtitle` | string | Current mode | Subtitle override |
| `icon` | string | `mdi:clock-outline` | Header icon |
| `icon_color` | string \| rgb array | theme | Icon color when the device is on |
| `card_layout` | string | `horizontal` | `horizontal` or `vertical` |
| `time_window` | string | `24` | `24`, `12`, or `6` (hours) |
| `active_color` | string \| rgb array | `primary` | Fill colour for active time blocks |
| `show_day_selector` | boolean | `true` | Show the Mo–Su picker row |
| `show_mode_control` | boolean | `true` | Show the Off/On/Auto button |
| `show_now_indicator` | boolean | `true` | Show the vertical line at the current time |
| `show_time_labels` | boolean | `true` | Show hour labels above the timeline |
| `long_press_opens_editor` | boolean | `true` | When enabled, a long-press on the card opens the inline weekly-plan editor. Set to `false` to disable the gesture, or override it via `hold_action`. |
| `tap_action` | ActionConfig | toggle mode | Standard HA action config. Default cycles through Off/On/Auto. |
| `hold_action` | ActionConfig | schedule editor | Standard HA action config. When unset, opens the inline editor if `long_press_opens_editor` is `true`. Power-user YAML: set `action: powerpilz-schedule-edit` to force the edit modal. |
| `double_tap_action` | ActionConfig | none | Standard HA action config. |

## Example YAML

### Minimal

```yaml
type: custom:power-pilz-schedule-card
entity: select.living_room_heating
name: Heating
icon: mdi:radiator
icon_color: orange
```

### Compact (vertical, no day selector)

```yaml
type: custom:power-pilz-schedule-card
entity: select.living_room_heating
card_layout: vertical
show_day_selector: false
time_window: "12"
```

## How it pairs with the Companion integration

The [PowerPilz Companion](https://github.com/gregor-autischer/PowerPilz-Companion) Smart Schedule helper bundles:

- A target device (switch / light / input_boolean / fan / climate)
- Three renameable mode options with custom icons: Off / On / Auto
- A weekly schedule, stored inside the integration, editable via this card
- A `schedule_active` attribute on the select entity that flips on/off at each block boundary, ready as an automation state trigger

The card reads the following attributes from the helper:

| Attribute on the Smart Schedule entity | Used by the card for |
| :-- | :-- |
| `week_blocks` | The weekly timeline blocks |
| `target_entity` | The icon's on/off color state |
| `mode_names` / `mode_icons` | Button label + icon (custom names survive renaming) |
| `schedule_active` | The card's on/off state detection in Auto mode |

Saves from the inline editor or a timeline-tap go through the `powerpilz_companion.set_schedule_blocks` service.

### Using the schedule in automations

You don't need a separate `schedule.*` helper or `binary_sensor.*`. Trigger directly off the `schedule_active` attribute on the helper's `select`:

```yaml
# Trigger when the schedule becomes active
trigger:
  platform: state
  entity_id: select.living_room_heating
  attribute: schedule_active
  to: true

# Or condition
condition:
  condition: template
  value_template: "{{ state_attr('select.living_room_heating', 'schedule_active') }}"

# Or template, rich attributes give you the next transition time
template: >
  Next schedule event: {{ state_attr('select.living_room_heating', 'next_event') }}
```
