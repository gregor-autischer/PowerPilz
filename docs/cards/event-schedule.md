# 🍄‍🟫 Event Schedule card

![Event Schedule card all options](https://raw.githubusercontent.com/gregor-autischer/PowerPilz/main/images/Event_Schedule_Card_all_options.png)

## Description

The Event Schedule card visualises a weekly list of point-in-time triggers (pins) on a 24h timeline. Each pin fires a single action at its configured time, instead of holding a value across a block. It pairs with the **PowerPilz Smart Event Schedule** helper from the [PowerPilz Companion](https://github.com/gregor-autischer/PowerPilz-Companion) integration: configure one `select.*` entity and the card reads everything (weekly events, target device, mode names, pulse cool-down state) straight from its attributes.

Use the Event Schedule when you want a schedule that **does something at a moment** rather than **runs across a window**. Typical examples: feed the cat at 07:30 and 18:00 every weekday, ring a chime at 06:00 on weekends, send a notification at 22:00 nightly.

## Features

- Weekly timeline with a pin for every scheduled event
- Weekday picker, live "now" indicator, optional hour labels (toggleable)
- Two-mode override button (Off / Auto) with custom mode names from the helper
- "Trigger now" button that fires the same action the next pin would (respects the helper's pulse cool-down)
- Horizontal (2-row) and vertical (3-row) card layout
- **Long-press the card** to open the inline weekly editor: drag pins, click any pin for minute-precise time editing and a free-form `data` payload, tap empty track to insert at 15-minute snap, "same for all days" toggle
- Cursor time-hint follows the pointer while editing
- Soft placeholder when no entity is configured yet

## Configuration variables

All options are available in the Lovelace editor, but you can also use YAML.

| Name | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `type` | string | Required | `custom:power-pilz-event-schedule-card` |
| `entity` | string | Required | The Smart Event Schedule `select.*` entity from PowerPilz Companion |
| `name` | string | Entity name | Card title |
| `subtitle` | string | Current mode | Subtitle override |
| `icon` | string | `mdi:bell-ring-outline` | Header icon |
| `icon_color` | string \| rgb array | theme | Icon color when the helper is in Auto mode |
| `card_layout` | string | `horizontal` | `horizontal` or `vertical` |
| `time_window` | string | `24` | `24`, `12`, or `6` (hours) |
| `active_color` | string \| rgb array | `primary` | Pin colour |
| `show_day_selector` | boolean | `true` | Show the Mo-Su picker row |
| `show_mode_control` | boolean | `true` | Show the Off/Auto button |
| `show_trigger_button` | boolean | `true` | Show the "Trigger now" button |
| `show_now_indicator` | boolean | `true` | Show the vertical line at the current time |
| `show_time_labels` | boolean | `true` | Show hour labels above the timeline |
| `long_press_opens_editor` | boolean | `true` | When enabled, a long-press on the card opens the inline editor. Set to `false` to disable, or override via `hold_action`. |
| `tap_action` | ActionConfig | toggle mode | Standard HA action config. Default cycles Off/Auto. |
| `hold_action` | ActionConfig | event editor | Standard HA action config. When unset, opens the inline editor if `long_press_opens_editor` is `true`. |
| `double_tap_action` | ActionConfig | none | Standard HA action config. |

## Example YAML

### Minimal

```yaml
type: custom:power-pilz-event-schedule-card
entity: select.feed_cat_schedule
name: Feed cat
icon: mdi:cat
icon_color: orange
```

### Compact (vertical, no day selector)

```yaml
type: custom:power-pilz-event-schedule-card
entity: select.feed_cat_schedule
card_layout: vertical
show_day_selector: false
time_window: "12"
```

## How it pairs with the Companion integration

The [PowerPilz Companion](https://github.com/gregor-autischer/PowerPilz-Companion) Smart Event Schedule helper bundles:

- A target device (switch / light / input_boolean / fan / climate / select / input_select)
- Two renameable mode options with custom icons: Off / Auto
- An action per event: Toggle, Pulse (fire on then off after N seconds), or a custom service call
- A weekly list of timestamped events, stored inside the integration and editable via this card
- A companion `button.<name>_trigger` that fires the same configured action manually and records every fire in its history
- A 10-second pulse cool-down window during which all triggers (auto or manual) are silently dropped, so a misclick or overlapping pin can't double-fire

The card reads the following attributes from the helper:

| Attribute on the Smart Event Schedule entity | Used by the card for |
| :-- | :-- |
| `week_events` | Pin positions on the weekly timeline |
| `target_entity` | The icon's on/off color state |
| `mode_names` / `mode_icons` | Mode button label + icon |
| `pulse_blocked_until` / `pulse_running` | "Trigger now" button cool-down state |
| `next_event` | (Optional) helpful for templates and automations |

Saves from the inline editor go through the `powerpilz_companion.set_schedule_events` service.

### Using events in automations

Trigger directly off the companion button entity so the trigger fires regardless of whether the event was scheduled or manual:

```yaml
trigger:
  platform: state
  entity_id: button.feed_cat_schedule_trigger
```

Or template against the helper's `next_event` attribute:

```yaml
template: >
  Next feeding: {{ state_attr('select.feed_cat_schedule', 'next_event') }}
```
