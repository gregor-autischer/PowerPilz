# 🍄‍🟫 Wallbox card

![Wallbox card all options](https://raw.githubusercontent.com/gregor-autischer/PowerPilz/main/images/Wallbox_Card_all_options.png)

## Description

The Wallbox card is a Mushroom-style EV charging card. It combines charger state, power, mode selection and a play/pause action button in a compact control layout.

## Configuration variables

All options are available in the Lovelace editor, but you can also use YAML.

| Name | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `type` | string | Required | `custom:power-pilz-wallbox-card` |
| `name` | string | `Wallbox` | Card title |
| `icon` | string | `mdi:power-plug` | Icon in header |
| `icon_color` | string \| rgb array | `state`/theme | Icon color |
| `power_entity` | string | Required | Power sensor used for live kW value |
| `status_entity` | string | Optional | Charger status sensor (`idle`, `ready`, `charging`, ...) |
| `mode_entity` | string | Optional | `input_select`/`select` entity for charging modes |
| `command_entity` | string | Optional | `input_boolean`/`switch` entity for start/stop state |
| `show_mode_selector` | boolean | `true` | Show/hide mode selector |
| `show_live_value` | boolean | `true` | Show/hide status + power text |
| `show_command_button` | boolean | `true` | Show/hide play/pause button |
| `decimals` | number | `1` | Decimal precision for power value |
| `start_service` | string | Optional | Override start service (`domain.service`) |
| `stop_service` | string | Optional | Override stop service (`domain.service`) |
| `start_service_data` | object | Optional | Service data payload for start |
| `stop_service_data` | object | Optional | Service data payload for stop |

## Example YAML

```yaml
type: custom:power-pilz-wallbox-card
name: Garage Wallbox
power_entity: sensor.dev_wallbox_power
status_entity: sensor.dev_wallbox_status
mode_entity: input_select.dev_wallbox_mode
command_entity: input_boolean.dev_wallbox_enabled
show_mode_selector: true
show_live_value: true
show_command_button: true
```
