# 🍄‍🟫 Switch card

![Switch card showcase](https://raw.githubusercontent.com/gregor-autischer/PowerPilz/main/images/Switch_Card_all_options.png)

## Description

The Switch card is a Mushroom-style mode selector with a sliding pill indicator. It reads options from an `input_select` or `select` entity and lets you cycle through states by tapping the card or jumping directly to a state by tapping its segment.

The first segment always shows a circle symbol (representing off/idle), and each subsequent segment adds one bar. Alternatively, you can assign custom MDI icons and colors to each state.

## Features

- Sliding pill animation with smooth CSS transitions
- Up to 5 states (off + 4 more)
- Default symbols (circle + bars) or custom MDI icons per state
- Per-state colors or a single slider color
- Horizontal (1-row) and vertical (2-row) layout modes
- Configurable slider width (small / medium / large)
- Custom subtitle text override
- Tap card body to cycle to next state
- Tap segment to jump directly to that state

## Configuration variables

All options are available in the Lovelace editor, but you can also use YAML.

| Name | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `type` | string | Required | `custom:power-pilz-switch-card` |
| `entity` | string | Required | `input_select` or `select` entity |
| `name` | string | `Mode` | Card title |
| `subtitle` | string | Entity state | Override subtitle text below the name |
| `icon` | string | `mdi:toggle-switch-outline` | Icon in header |
| `icon_color` | string \| rgb array | `state`/theme | Icon color |
| `dim_inactive_icon` | boolean | `true` | Dim the icon to the theme's `disabled` color when the entity is in its first state (conventionally "off"). Set to `false` to keep the configured `icon_color` regardless of state. |
| `card_layout` | string | `horizontal` | `horizontal` (1 row) or `vertical` (2 rows, slider below) |
| `slider_size` | string | `medium` | Slider width: `small`, `medium`, or `large` (horizontal only) |
| `slider_color` | string \| rgb array | theme default | Single color for the slider pill (all states) |
| `use_custom_icons` | boolean | `false` | Enable custom MDI icons per state |
| `state_1_color` | string \| rgb array | Optional | Color for state 1 (overrides `slider_color`) |
| `state_2_color` | string \| rgb array | Optional | Color for state 2 |
| `state_3_color` | string \| rgb array | Optional | Color for state 3 |
| `state_4_color` | string \| rgb array | Optional | Color for state 4 |
| `state_5_color` | string \| rgb array | Optional | Color for state 5 |
| `state_1_icon` | string | Optional | MDI icon for state 1 (requires `use_custom_icons: true`) |
| `state_2_icon` | string | Optional | MDI icon for state 2 |
| `state_3_icon` | string | Optional | MDI icon for state 3 |
| `state_4_icon` | string | Optional | MDI icon for state 4 |
| `state_5_icon` | string | Optional | MDI icon for state 5 |

## Example YAML

### Basic (default symbols)

```yaml
type: custom:power-pilz-switch-card
name: Heating Mode
subtitle: Living Room
icon: mdi:radiator
icon_color: orange
entity: input_select.heating_mode
slider_size: large
```

### Vertical layout

```yaml
type: custom:power-pilz-switch-card
name: Fan Control
icon: mdi:fan
icon_color: teal
entity: input_select.fan_speed
card_layout: vertical
```

### Custom icons per state

```yaml
type: custom:power-pilz-switch-card
name: HVAC Mode
icon: mdi:hvac
icon_color: blue
entity: input_select.hvac_mode
slider_size: large
use_custom_icons: true
state_1_icon: mdi:power-standby
state_2_icon: mdi:snowflake
state_3_icon: mdi:fire
```

### Per-state colors

```yaml
type: custom:power-pilz-switch-card
name: Alert Level
icon: mdi:shield-alert
icon_color: amber
entity: input_select.alert_level
slider_size: large
state_1_color: green
state_2_color: amber
state_3_color: red
```

### Icons + colors combined

```yaml
type: custom:power-pilz-switch-card
name: Climate
subtitle: Living Room
icon: mdi:thermostat
icon_color: deep-orange
entity: input_select.climate_mode
slider_size: large
use_custom_icons: true
state_1_icon: mdi:power-standby
state_2_icon: mdi:snowflake
state_3_icon: mdi:fire
state_1_color: grey
state_2_color: blue
state_3_color: deep-orange
```
