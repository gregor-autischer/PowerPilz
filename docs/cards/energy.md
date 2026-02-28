# 🍄‍🟫 Energy card

![Energy card all options](https://raw.githubusercontent.com/gregor-autischer/PowerPilz/main/images/Energy_Card_all_options.png)

## Description

The Energy card is the main PowerPilz flow card. It renders solar, grid, home and battery nodes in a Mushroom-style layout with animated flow lines, optional trends, and configurable sub-nodes.

## Configuration variables

All options are available in the Lovelace editor, but you can also use YAML.

| Name | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `type` | string | Required | `custom:power-pilz-energy-card` |
| `name` | string | `Energy Flow` | Card title |
| `home_entity` | string | Optional | Home consumption entity |
| `home_auto_calculate` | boolean | `false` | Calculate home value from selected node entities (`solar + grid + grid_secondary - battery - battery_secondary`) |
| `solar_entity` | string | Optional | Solar production entity |
| `grid_entity` | string | Optional | Grid power entity |
| `grid_secondary_entity` | string | Optional | Second grid power entity |
| `battery_entity` | string | Optional | Battery power entity |
| `battery_percentage_entity` | string | Optional | Battery SoC entity |
| `battery_secondary_entity` | string | Optional | Second battery power entity |
| `battery_secondary_percentage_entity` | string | Optional | Second battery SoC entity |
| `home_visible` | boolean | `true` | Show/hide home main node |
| `solar_visible` | boolean | `true` | Show/hide solar main node |
| `grid_visible` | boolean | `true` | Show/hide grid main node |
| `grid_secondary_visible` | boolean | `false` | Enable second grid main node |
| `battery_visible` | boolean | `true` | Show/hide battery main node |
| `battery_secondary_visible` | boolean | `false` | Enable second battery main node |
| `battery_dual_alignment` | `center` \| `left` \| `right` | `center` | Placement of battery 2 when dual battery is active |
| `*_label` | string | Per node default | Node label text (solar/grid/home/battery/secondary nodes) |
| `*_icon` | string | Per node default | Node icon (solar/grid/home/battery/core) |
| `*_icon_color` | string \| rgb array | `state`/theme | Node icon color |
| `*_trend` | boolean | `false` | Enable trend graph per node |
| `*_trend_color` | string \| rgb array | `purple` | Trend line color per node |
| `battery_low_alert` | boolean | `false` | Color battery icon/trend red under threshold |
| `battery_low_threshold` | number | `20` | Battery low threshold in `%` |
| `battery_secondary_low_alert` | boolean | `false` | Low alert for second battery |
| `battery_secondary_low_threshold` | number | `20` | Threshold for second battery in `%` |
| `flow_color` | string \| rgb array | theme neutral | Flow line color |
| `unit` | string | entity unit | Unit override for displayed values |
| `decimals` | number | `1` | Number precision |
| `details_navigation_path` | string | Optional | Path used by tap action |
| `details_entity` | string | Optional | Entity used by `more-info` action |
| `tap_action` | action object | `none` | Card tap action |

### Sub-node options

Energy sub-nodes are configured with repeated fields:

| Name pattern | Applies to | Description |
| :-- | :-- | :-- |
| `solar_sub_<n>_enabled` | `n=1..4` | Enable solar sub-node |
| `solar_sub_<n>_entity` | `n=1..4` | Solar sub-node entity |
| `solar_sub_<n>_label` | `n=1..4` | Solar sub-node label |
| `solar_sub_<n>_icon` | `n=1..4` | Solar sub-node icon |
| `solar_sub_<n>_icon_color` | `n=1..4` | Solar sub-node icon color |
| `home_sub_<n>_enabled` | `n=1..8` | Enable home sub-node |
| `home_sub_<n>_entity` | `n=1..8` | Home sub-node entity |
| `home_sub_<n>_label` | `n=1..8` | Home sub-node label |
| `home_sub_<n>_icon` | `n=1..8` | Home sub-node icon |
| `home_sub_<n>_icon_color` | `n=1..8` | Home sub-node icon color |
| `grid_sub_<n>_*` | `n=1..2` | Grid 1 sub-node options (same fields as above) |
| `grid_secondary_sub_<n>_*` | `n=1..2` | Grid 2 sub-node options (same fields as above) |

## Example YAML

```yaml
type: custom:power-pilz-energy-card
name: House Energy
home_entity: sensor.dev_home_power
home_auto_calculate: false
solar_entity: sensor.dev_solar_power
grid_entity: sensor.dev_grid_power
battery_entity: sensor.dev_battery_power
battery_percentage_entity: sensor.dev_battery_soc
home_visible: true
solar_visible: true
grid_visible: true
battery_visible: true
solar_trend: true
grid_trend: true
home_trend: true
battery_trend: true
```
