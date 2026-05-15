# 🍄‍🟫 Heating Curve card

![Heating Curve card all options](https://raw.githubusercontent.com/gregor-autischer/PowerPilz/main/images/Heating_Curve_Card_all_options.png)

## Description

The Heating Curve card visualises a smooth weekly temperature curve, sampled from a handful of points per day. It pairs with the **PowerPilz Smart Curve** helper from the [PowerPilz Companion](https://github.com/gregor-autischer/PowerPilz-Companion) integration: configure one `select.*` entity and the card reads the daily points, current curve value, mode and unit straight from its attributes.

Use the Heating Curve when you want a setpoint that **changes smoothly across the day** instead of stepping between on/off windows. Typical examples: 17 °C overnight rising to 21 °C in the morning, dropping during the day, peaking again in the evening.

## Features

- Smooth monotone-cubic interpolation between curve points (no overshoot at peaks)
- Weekday picker with live "now" indicator on today's curve
- Two/three-mode override button (Off / On / Auto) from the helper's renameable modes
- Optional hour labels above the curve (toggleable)
- **Long-press the card** to open the inline curve editor: tap empty area to add a point at 15-minute snap, drag points to move (clamped against neighbours), click any point for time/temperature editing plus a delete button, "same for all days" toggle, copy/paste between days
- Cursor time-hint follows the pointer while editing
- Soft placeholder when no entity is configured yet
- Companion `sensor.<name>_setpoint` mirrors the live curve value for history graphs and templates

## Configuration variables

All options are available in the Lovelace editor, but you can also use YAML.

| Name | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `type` | string | Required | `custom:power-pilz-heating-curve-card` |
| `entity` | string | Required | The Smart Curve `select.*` entity from PowerPilz Companion |
| `name` | string | Entity name | Card title |
| `subtitle` | string | Current value + mode | Subtitle override |
| `icon` | string | `mdi:chart-bell-curve-cumulative` | Header icon |
| `icon_color` | string \| rgb array | theme | Icon color when the helper is on/auto |
| `active_color` | string \| rgb array | `primary` | Curve stroke + fill colour |
| `show_day_selector` | boolean | `true` | Show the Mo-Su picker row |
| `show_mode_control` | boolean | `true` | Show the Off/On/Auto button |
| `show_now_indicator` | boolean | `true` | Show the vertical line at the current time |
| `show_time_labels` | boolean | `true` | Show hour labels above the curve |
| `long_press_opens_editor` | boolean | `true` | When enabled, a long-press on the card opens the inline editor. Set to `false` to disable, or override via `hold_action`. |
| `tap_action` | ActionConfig | toggle mode | Standard HA action config. Default cycles Off/On/Auto. |
| `hold_action` | ActionConfig | curve editor | Standard HA action config. When unset, opens the inline editor if `long_press_opens_editor` is `true`. |
| `double_tap_action` | ActionConfig | none | Standard HA action config. |

## Example YAML

### Minimal

```yaml
type: custom:power-pilz-heating-curve-card
entity: select.living_room_curve
name: Living room curve
icon: mdi:radiator
icon_color: orange
```

### Custom colour, no day selector

```yaml
type: custom:power-pilz-heating-curve-card
entity: select.living_room_curve
active_color: '#ec4899'
show_day_selector: false
```

## How it pairs with the Companion integration

The [PowerPilz Companion](https://github.com/gregor-autischer/PowerPilz-Companion) Smart Curve helper bundles:

- One or more target devices (climate / number / input_number)
- Three renameable mode options with custom icons: Off / On / Auto
- A configurable On-value, used when the helper is forced On
- A weekly list of curve points per day, stored inside the integration and editable via this card
- A configurable sampling cadence (default 5 min) at which the helper recomputes the current curve value and writes it to the target(s)
- A companion `sensor.<name>_setpoint` that mirrors the current curve value as a numeric measurement, ready for the Energy / Graph cards or as a `numeric_state` trigger

The card reads the following attributes from the helper:

| Attribute on the Smart Curve entity | Used by the card for |
| :-- | :-- |
| `week_points` | The weekly curve points per day |
| `current_value` | Live curve value (also shown in the subtitle) |
| `value_min` / `value_max` | Curve Y-axis range |
| `unit` | Subtitle unit (e.g. `°C`) |
| `mode_names` / `mode_icons` | Mode button label + icon |

Saves from the inline editor go through the `powerpilz_companion.set_curve_points` service.

### What "Off" does

Switching the helper to Off only acts on `climate.*` targets (they get `climate.turn_off`). Setpoint-number targets (`number.*` / `input_number.*`) are intentionally left untouched, because there is no meaningful "off" value for a number. Set a parallel automation if you want a number to drop to a specific value when the curve is off.

### Using the curve in automations

The companion `sensor.<name>_setpoint` is a regular numeric sensor with long-term statistics. Trigger off it the usual way:

```yaml
trigger:
  platform: numeric_state
  entity_id: sensor.living_room_curve_setpoint
  above: 20
```

Or read attributes off the parent select for templates:

```yaml
template: >
  {% set p = state_attr('select.living_room_curve', 'today_points') %}
  Today's first point: {{ p[0].time }} = {{ p[0].value }}°C
```
