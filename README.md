# PowerSchwammerl

PowerSchwammerl is a Home Assistant Lovelace card bundle with a visual language inspired by Mushroom cards, built for personal energy and wallbox dashboards.

## Included Cards

- `custom:power-schwammerl-energy-card`
- `custom:power-schwammerl-energy-breakdown-card`
- `custom:power-schwammerl-wallbox-card`

## Installation (HACS)

1. Push this repository to GitHub.
2. In Home Assistant, open HACS -> Frontend -> menu (top-right) -> Custom repositories.
3. Add your repository URL and select category `Dashboard`.
4. Install `PowerSchwammerl` from HACS.
5. Add the dashboard resource:
   - URL: `/hacsfiles/<your-repo-name>/power-schwammerl.js`
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
decimals: 1
unit: kW
tap_action:
  action: navigate
  navigation_path: /energy-details
```

Energy breakdown card (target view):

```yaml
type: custom:power-schwammerl-energy-breakdown-card
name: Home Energy Details
home_entity: sensor.house_consumption_power
solar_entity: sensor.solar_production_power
grid_entity: sensor.grid_power
battery_entity: sensor.home_battery_power
battery_percentage_entity: sensor.home_battery_soc
daily_consumption_entity: sensor.energy_daily_consumption
daily_production_entity: sensor.energy_daily_solar
daily_grid_import_entity: sensor.energy_daily_grid_import
daily_grid_export_entity: sensor.energy_daily_grid_export
voltage_entity: sensor.grid_voltage
current_entity: sensor.grid_current
frequency_entity: sensor.grid_frequency
unit: kW
energy_unit: kWh
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
- Start/Stop button labels are fixed defaults in the card.
- For custom services instead of `command_entity`, use:
  - `start_service` + optional `start_service_data`
  - `stop_service` + optional `stop_service_data`

## Release for HACS

To ship a HACS-friendly artifact (`power-schwammerl.js`):

1. Create and push a tag such as `v0.1.0`.
2. Create a GitHub Release for that tag.
3. The included release workflow builds and uploads the card bundle as a release asset.

## License

MIT
