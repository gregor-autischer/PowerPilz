# PowerSchwammerl

PowerSchwammerl is a Home Assistant Lovelace card bundle with a visual language inspired by Mushroom cards, built for personal energy and wallbox dashboards.

## Included Cards

- `custom:power-schwammerl-energy-card`
- `custom:power-schwammerl-graph-card`
- `custom:power-schwammerl-graph-stack-card`
- `custom:power-schwammerl-wallbox-card`

## Installation (HACS)

1. Push this repository to GitHub.
2. In Home Assistant, open HACS -> Frontend -> menu (top-right) -> Custom repositories.
3. Add your repository URL and select category `Dashboard`.
4. Install `PowerSchwammerl` from HACS.
5. HACS should auto-register the dashboard resource in storage mode.
6. If your dashboard is in YAML mode or auto-registration is disabled, add this resource manually:
   - URL: `/hacsfiles/<your-repository-name>/power-schwammerl.js`
   - Type: `module`

## Installation (Manual)

1. Build the project with `npm install && npm run build`.
2. Copy `dist/power-schwammerl.js` to your Home Assistant `www` folder.
3. Add a dashboard resource:
   - URL: `/local/power-schwammerl.js`
   - Type: `module`

## Development

```bash
npm install
npm run dev
```

Build production bundle:

```bash
npm run build
```

## Example Card Configurations

Energy card:

```yaml
type: custom:power-schwammerl-energy-card
name: Energy Flow
home_entity: sensor.house_consumption_power
solar_entity: sensor.solar_production_power
grid_entity: sensor.grid_power
battery_entity: sensor.home_battery_power
battery_percentage_entity: sensor.home_battery_soc
grid_label: Grid
solar_label: Solar
home_label: House
battery_label: Battery
solar_icon: mdi:weather-sunny
grid_icon: mdi:transmission-tower
home_icon: mdi:home-lightning-bolt
battery_icon: mdi:battery-outline
core_icon: mdi:home
solar_icon_color: state
grid_icon_color: state
home_icon_color: state
battery_icon_color: state
core_icon_color: purple
flow_color: purple
decimals: 1
unit: kW
tap_action:
  action: navigate
  navigation_path: /energy-details
```

Energy sign convention:
- `grid_entity`: positive = import from grid, negative = export to grid
- `battery_entity`: positive = charging, negative = discharging

Tap action options on `power-schwammerl-energy-card`:
- `tap_action.action: navigate` with `tap_action.navigation_path`
- `tap_action.action: more-info` with optional `tap_action.entity`
- `details_navigation_path` as a shorthand for navigate

Compatibility aliases:
- `consumption_entity` can be used instead of `home_entity`
- `production_entity` can be used instead of `solar_entity`

Wallbox card:

```yaml
type: custom:power-schwammerl-wallbox-card
name: Garage Wallbox
icon: mdi:ev-station
power_entity: sensor.wallbox_power
status_entity: sensor.wallbox_status
mode_entity: select.wallbox_charging_mode
mode_options:
  - Eco
  - Fast
  - Solar
command_entity: switch.wallbox_charging_enabled
decimals: 1
```

Wallbox control options:
- `mode_entity` expects `select.*` or `input_select.*` and updates via `select_option`.
- `mode_options` can be set as a fallback list if your mode entity has delayed/missing options.
- `command_entity` toggles with `turn_on`/`turn_off` for Start/Stop.
- `show_mode_selector` toggles visibility of the charging mode selector (default: `true`).
- `show_live_value` toggles visibility of live status and power (`Idle • 7.2 kW`) (default: `true`).
- `show_command_button` toggles visibility of the play/pause action button (default: `true`).
- Start/Stop button labels are fixed defaults in the card.
- For custom services instead of `command_entity`, use:
  - `start_service` + optional `start_service_data`
  - `stop_service` + optional `stop_service_data`

Graph card:

```yaml
type: custom:power-schwammerl-graph-card
legend_layout: row
timeframe_hours: 24
hover_enabled: true
fill_area_enabled: true
normalize_stack_to_percent: false
line_thickness: 1.5
clip_graph_to_labels: false
entity_1: sensor.dev_home_power
entity_1_enabled: true
entity_1_show_icon: true
entity_1_icon: mdi:chart-line
entity_1_icon_color: state
entity_1_trend_color: purple
entity_2: sensor.dev_solar_power
entity_2_enabled: true
entity_2_show_icon: true
entity_2_icon: mdi:chart-line-variant
entity_2_trend_color: blue
decimals: 1
```

Graph stack card:

```yaml
type: custom:power-schwammerl-graph-stack-card
legend_layout: row
timeframe_hours: 24
hover_enabled: true
fill_area_enabled: true
line_thickness: 1.5
clip_graph_to_labels: false
entity_1: sensor.dev_home_power
entity_1_enabled: true
entity_1_show_icon: true
entity_1_icon: mdi:chart-line
entity_1_icon_color: state
entity_1_trend_color: purple
entity_2: sensor.dev_solar_power
entity_2_enabled: true
entity_2_show_icon: true
entity_2_icon: mdi:chart-line-variant
entity_2_trend_color: blue
decimals: 1
```

## Release for HACS

To ship a HACS-friendly artifact (`power-schwammerl.js` in repository root):

1. Run `npm run build:hacs` and commit updated `power-schwammerl.js`.
2. Create and push a tag such as `v0.1.0`.
3. Create a GitHub Release for that tag.
4. The included release workflow uploads `power-schwammerl.js` as a release asset.

## License

MIT
