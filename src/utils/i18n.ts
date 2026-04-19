/**
 * Lightweight i18n for PowerPilz cards.
 *
 * Usage:
 *   import { tr, haLang } from "../utils/i18n";
 *   const lang = haLang(this.hass);
 *   tr(lang, "common.cancel") // "Cancel" or "Abbrechen"
 *
 * Falls back to English when a key or language is missing.
 */

export type Lang = "en" | "de";

interface HassLike {
  locale?: { language?: string };
  language?: string;
}

/** Extract the normalized (2-letter, lowercase) language code from a HA object. */
export function haLang(hass?: HassLike): Lang {
  const raw = hass?.locale?.language ?? hass?.language ?? "en";
  const code = String(raw).split("-")[0].toLowerCase();
  return code === "de" ? "de" : "en";
}

type Dict = Record<string, string>;

const EN: Dict = {
  // --- Common ---
  "common.cancel": "Cancel",
  "common.set": "Set",
  "common.save": "Save",
  "common.on": "On",
  "common.off": "Off",
  "common.auto": "Auto",
  "common.active": "Active",
  "common.idle": "Idle",
  "common.unknown": "Unknown",
  "common.invalid_config": "Invalid configuration",
  "common.today": "Today",
  "common.tomorrow": "Tomorrow",
  "common.optional": "optional",
  "common.entity_required": "Entity is required",

  // --- Weekday short ---
  "weekday.short.0": "Sun",
  "weekday.short.1": "Mon",
  "weekday.short.2": "Tue",
  "weekday.short.3": "Wed",
  "weekday.short.4": "Thu",
  "weekday.short.5": "Fri",
  "weekday.short.6": "Sat",

  // --- Timer card ---
  "timer.default_name": "Timer",
  "timer.turn_on_at": "Turn ON at:",
  "timer.turn_off_at_optional": "Turn OFF at (optional):",
  "timer.only_on": "Only On",
  "timer.cancel_title": "Cancel this timer?",
  "timer.cancel_hint": "The scheduled action will be removed.",
  "timer.keep_timer": "Keep timer",
  "timer.cancel_timer": "Cancel timer",
  "timer.timer_active": "Timer active",
  "timer.no_timer_set": "No timer set",
  "timer.time_now": "now",
  "timer.time_in_m": "in {m}m",
  "timer.time_in_hm": "in {h}h {m}m",
  "timer.time_in_dh": "in {d}d {h}h",
  "timer.subtitle_on": "On {time}",
  "timer.subtitle_off": "Off {time}",

  // Timer editor
  "timer.editor.section_entities": "Entities",
  "timer.editor.section_identity": "Identity",
  "timer.editor.section_appearance": "Appearance",
  "timer.editor.use_companion": "Use PowerPilz Companion integration",
  "timer.editor.use_companion_help":
    "When enabled (default), configure only one entity — a PowerPilz Smart Timer from the Companion integration — and the card derives the target device, on/off times and active flag from its attributes. When disabled, configure the four entities manually (device / on-time / off-time / active flag).",
  "timer.editor.companion_entity": "PowerPilz Smart Timer entity",
  "timer.editor.companion_help":
    "A PowerPilz Smart Timer helper (switch.* entity created by the Companion integration). The card automatically reads its `target_entity`, `on_datetime` and `off_datetime` attributes and uses the `powerpilz_companion.set_timer` service to update times.",
  "timer.placeholder_companion": "Pick a PowerPilz Smart Timer entity in the card settings to configure this card.",
  "timer.placeholder_manual": "Pick the four timer entities in the card settings to configure this card.",
  "timer.editor.switch_entity": "Device to control",
  "timer.editor.on_datetime_entity": "Turn-ON datetime helper",
  "timer.editor.off_datetime_entity": "Turn-OFF datetime helper (optional)",
  "timer.editor.active_entity": "Timer active flag",
  "timer.editor.name": "Name",
  "timer.editor.subtitle": "Subtitle",
  "timer.editor.icon": "Icon",
  "timer.editor.icon_color": "Icon color",
  "timer.editor.active_color": "Active timer color",
  "timer.editor.switch_help":
    "The device to control (switch, light, or input_boolean). This entity will be turned on/off at the scheduled time.",
  "timer.editor.on_help":
    "An input_datetime helper (with date AND time enabled) that stores when to turn the device ON. Create in Settings > Helpers > Add > Date and/or time. Enable both 'Date' and 'Time'. Then create an automation: trigger at this entity's time → turn on the device.",
  "timer.editor.off_help":
    "Optional: an input_datetime helper for the turn-OFF time. Same setup as the ON helper. If not set, the card only schedules turning on. Create a second automation: trigger at this entity's time → turn off the device.",
  "timer.editor.active_help":
    "An input_boolean that indicates whether a timer is currently pending. The card turns this on when scheduling and off when cancelling. Use it as a condition in your automations so they only fire when the timer is active.",
  "timer.editor.active_color_help": "Color used for the active timer badge and highlights.",

  // --- Schedule card ---
  "schedule.default_name": "Schedule",
  "schedule.timer_label": "Timer",
  "schedule.no_timer_set": "No timer set",

  // Schedule editor
  "schedule.editor.section_entities": "Entities",
  "schedule.editor.section_identity": "Identity",
  "schedule.editor.section_layout": "Layout",
  "schedule.editor.section_appearance": "Appearance",
  "schedule.editor.section_display": "Display options",
  "schedule.placeholder_companion": "Pick a PowerPilz Smart Schedule entity in the card settings to configure this card.",
  "schedule.placeholder_manual": "Pick a schedule entity in the card settings to configure this card.",
  "schedule.editor.use_companion": "Use PowerPilz Companion integration",
  "schedule.editor.use_companion_help":
    "When enabled (default), configure only one entity — a PowerPilz Smart Schedule helper from the PowerPilz Companion integration — and the card reads the linked schedule and target device from its attributes. When disabled, configure the three entities manually (schedule / device / mode).",
  "schedule.editor.companion_entity": "PowerPilz Smart Schedule entity",
  "schedule.editor.companion_help":
    "A PowerPilz Smart Schedule helper (select.* entity created by the PowerPilz Companion integration). The card automatically reads its `linked_schedule` and `target_entity` attributes — no other entities needed.",
  "schedule.editor.schedule_entity": "Schedule entity",
  "schedule.editor.switch_entity": "Device entity",
  "schedule.editor.mode_entity": "Mode override entity",
  "schedule.editor.name": "Name",
  "schedule.editor.subtitle": "Subtitle",
  "schedule.editor.icon": "Icon",
  "schedule.editor.icon_color": "Icon color",
  "schedule.editor.card_layout": "Card layout",
  "schedule.editor.time_window": "Time window",
  "schedule.editor.active_color": "Active block color",
  "schedule.editor.show_day_selector": "Show day selector",
  "schedule.editor.show_mode_control": "Show mode button",
  "schedule.editor.show_now_indicator": "Show current time indicator",
  "schedule.editor.show_time_labels": "Show hour labels",
  "schedule.editor.layout_horizontal": "Horizontal",
  "schedule.editor.layout_vertical": "Vertical",
  "schedule.editor.tw_24": "24 hours (full day)",
  "schedule.editor.tw_12": "12 hours (±6h)",
  "schedule.editor.tw_6": "6 hours (±3h)",
  "schedule.editor.schedule_help":
    "A schedule helper entity (schedule domain). Create one in Settings > Devices & Services > Helpers > Add > Schedule. It defines the weekly on/off time blocks shown on the timeline. IMPORTANT: a schedule helper by itself does NOT turn any device on or off — it just has an on/off state based on the current time. You must create two automations that bridge the schedule to the device (see the 'Device entity' help text below for YAML).",
  "schedule.editor.switch_help":
    "The device this schedule controls (switch, light, or input_boolean). Automatically turned on/off when the mode changes to 'On' or 'Off' via the card. For the Auto mode (schedule-driven), you must create TWO automations in HA — one that fires when the schedule turns on and switches the device on, and one that does the opposite. Example YAML: triggers: [{trigger: state, entity_id: schedule.your_schedule, to: 'on'}], actions: [{action: switch.turn_on, target: {entity_id: switch.your_device}}]. Create a second mirror automation with to: 'off' and switch.turn_off. Optionally gate both with a condition that checks the mode entity is 'Auto' so manual overrides aren't immediately undone.",
  "schedule.editor.mode_help":
    "An input_select with options like 'Auto', 'On', 'Off' (create in Settings > Helpers > Dropdown). Controls the override mode: Timer/Auto = schedule runs normally, On = device always on, Off = device always off. Tap the card or mode button to cycle through modes. Use this entity as a condition in your schedule-to-device automations so they only fire when mode == 'Auto'.",
  "schedule.editor.time_window_help":
    "How many hours to display on the timeline. 24h shows the full day, 12h and 6h center on the current time.",
  "schedule.editor.active_color_help": "Color for the active (on) time blocks on the timeline.",
  "schedule.editor.card_layout_help":
    "Horizontal shows controls inline with the header. Vertical stacks everything for a taller card.",
  "schedule.editor.show_day_help": "Show or hide the weekday selector bar.",
  "schedule.editor.show_mode_help":
    "Show or hide the mode override button (Timer/On/Off) in the card header.",
  "schedule.editor.show_now_help": "Show a vertical line on the timeline at the current time.",
  "schedule.editor.show_labels_help": "Show hour labels above the timeline.",

  // --- Switch card ---
  "switch.default_name": "Mode",

  "switch.editor.section_identity": "Identity",
  "switch.editor.section_layout": "Layout",
  "switch.editor.section_slider": "Slider appearance",
  "switch.editor.section_state_custom": "State customization",
  "switch.editor.state_n_title": "State {n}",
  "switch.editor.state_1_title": "State 1 (Off / first option)",
  "switch.editor.name": "Name",
  "switch.editor.subtitle": "Subtitle",
  "switch.editor.icon": "Icon",
  "switch.editor.icon_color": "Icon color",
  "switch.editor.dim_inactive_icon": "Dim icon in first state (off)",
  "switch.editor.entity": "State entity",
  "switch.editor.card_layout": "Card layout",
  "switch.editor.slider_size": "Slider width",
  "switch.editor.slider_color": "Slider color",
  "switch.editor.use_custom_icons": "Custom icons per state",
  "switch.editor.state_color": "Color",
  "switch.editor.state_icon": "Icon",
  "switch.editor.layout_horizontal": "Horizontal (1 row)",
  "switch.editor.layout_vertical": "Vertical (2 rows)",
  "switch.editor.slider_small": "Small",
  "switch.editor.slider_medium": "Medium",
  "switch.editor.slider_large": "Large",

  // --- Wallbox card ---
  "wallbox.default_name": "Wallbox",
  "wallbox.ev_charger": "EV charger",
  "wallbox.start": "Start",
  "wallbox.stop": "Stop",
  "wallbox.mode_fallback": "Mode",
  "wallbox.status_charging": "Charging",
  "wallbox.status_ready": "Ready",
  "wallbox.status_idle": "Idle",
  "wallbox.status_paused": "Paused",
  "wallbox.status_complete": "Complete",

  "wallbox.editor.name": "Name",
  "wallbox.editor.icon": "Icon",
  "wallbox.editor.icon_color": "Icon color",
  "wallbox.editor.power_entity": "Power entity",
  "wallbox.editor.status_entity": "Status entity",
  "wallbox.editor.mode_entity": "Mode entity",
  "wallbox.editor.command_entity": "Command entity",
  "wallbox.editor.show_mode": "Show mode selector",
  "wallbox.editor.show_live": "Show live status and power",
  "wallbox.editor.show_button": "Show play/pause button",
  "wallbox.editor.decimals": "Decimals",
  "wallbox.editor.auto_scale": "Auto unit scaling (W↔kW, Wh↔kWh)",
  "wallbox.editor.decimals_base": "Decimals (base unit)",
  "wallbox.editor.decimals_prefixed": "Decimals (prefixed units)",

  // --- Graph cards (editor section titles + common labels) ---
  "graph.editor.section_graph_settings": "Graph settings",
  "graph.editor.section_display_options": "Display options",
  "graph.editor.section_stacked_percent": "Stacked percent",
  "graph.editor.section_units": "Units and format",
  "graph.editor.section_actions": "Actions",
  "graph.editor.section_display_format": "Display format",
  "graph.editor.section_auto_scaling": "Auto scaling",
  "graph.editor.entity_title": "Entity {n}",
  "graph.editor.layout": "Layout",
  "graph.editor.timeframe_hours": "Range",
  "graph.editor.hover_enabled": "Hover",
  "graph.editor.fill_area_enabled": "Area fill",
  "graph.editor.shared_trend_scale": "Shared scale",
  "graph.editor.trend_data_source": "Trend source",
  "graph.editor.clip_graph_to_labels": "Clip below labels",
  "graph.editor.line_thickness": "Line width",
  "graph.editor.unit": "Unit",
  "graph.editor.decimals": "Decimals",
  "graph.editor.auto_scale_units": "Auto unit scaling",
  "graph.editor.decimals_base_unit": "Decimals (base unit)",
  "graph.editor.decimals_prefixed_unit": "Decimals (prefixed units)",
  "graph.editor.normalize_stack_to_percent": "Normalize to 100%",
  "graph.editor.percent_reference_slot": "100% reference entity",
  "graph.editor.percent_reference_auto": "Auto-calculate reference",
  "graph.editor.entity": "Action entity",
  "graph.editor.tap_action": "Tap behavior",
  "graph.editor.hold_action": "Hold behavior",
  "graph.editor.double_tap_action": "Double tap behavior"
};

const DE: Dict = {
  // --- Common ---
  "common.cancel": "Abbrechen",
  "common.set": "Setzen",
  "common.save": "Speichern",
  "common.on": "Ein",
  "common.off": "Aus",
  "common.auto": "Auto",
  "common.active": "Aktiv",
  "common.idle": "Inaktiv",
  "common.unknown": "Unbekannt",
  "common.invalid_config": "Ungültige Konfiguration",
  "common.today": "Heute",
  "common.tomorrow": "Morgen",
  "common.optional": "optional",
  "common.entity_required": "Entity ist erforderlich",

  // --- Weekday short ---
  "weekday.short.0": "So",
  "weekday.short.1": "Mo",
  "weekday.short.2": "Di",
  "weekday.short.3": "Mi",
  "weekday.short.4": "Do",
  "weekday.short.5": "Fr",
  "weekday.short.6": "Sa",

  // --- Timer card ---
  "timer.default_name": "Timer",
  "timer.turn_on_at": "Einschalten um:",
  "timer.turn_off_at_optional": "Ausschalten um (optional):",
  "timer.only_on": "Nur Ein",
  "timer.cancel_title": "Diesen Timer abbrechen?",
  "timer.cancel_hint": "Die geplante Aktion wird entfernt.",
  "timer.keep_timer": "Timer behalten",
  "timer.cancel_timer": "Timer abbrechen",
  "timer.timer_active": "Timer aktiv",
  "timer.no_timer_set": "Kein Timer gesetzt",
  "timer.time_now": "jetzt",
  "timer.time_in_m": "in {m} Min",
  "timer.time_in_hm": "in {h}h {m}m",
  "timer.time_in_dh": "in {d}d {h}h",
  "timer.subtitle_on": "Ein {time}",
  "timer.subtitle_off": "Aus {time}",

  "timer.editor.section_entities": "Entitäten",
  "timer.editor.section_identity": "Erscheinungsbild",
  "timer.editor.section_appearance": "Farben",
  "timer.editor.use_companion": "PowerPilz Companion Integration nutzen",
  "timer.editor.use_companion_help":
    "Wenn aktiviert (Standard), musst du nur eine einzige Entität angeben — einen PowerPilz Smart Timer aus der Companion Integration — die Karte liest Zielgerät, Ein/Aus-Zeiten und Aktiv-Flag automatisch aus deren Attributen. Wenn deaktiviert, gibst du die vier Entitäten manuell an (Gerät / Einschalt-Zeit / Ausschalt-Zeit / Aktiv-Flag).",
  "timer.editor.companion_entity": "PowerPilz Smart Timer-Entität",
  "timer.editor.companion_help":
    "Ein PowerPilz Smart Timer-Helfer (switch.* Entität, angelegt von der Companion Integration). Die Karte liest automatisch deren `target_entity`-, `on_datetime`- und `off_datetime`-Attribute und nutzt den `powerpilz_companion.set_timer`-Service zum Setzen der Zeiten.",
  "timer.placeholder_companion": "Wähle in den Karten-Einstellungen eine PowerPilz Smart Timer-Entität aus, um diese Karte zu konfigurieren.",
  "timer.placeholder_manual": "Wähle in den Karten-Einstellungen die vier Timer-Entitäten aus, um diese Karte zu konfigurieren.",
  "timer.editor.switch_entity": "Zu steuerndes Gerät",
  "timer.editor.on_datetime_entity": "Einschalt-Zeit Helfer",
  "timer.editor.off_datetime_entity": "Ausschalt-Zeit Helfer (optional)",
  "timer.editor.active_entity": "Timer-Aktiv Flag",
  "timer.editor.name": "Name",
  "timer.editor.subtitle": "Untertitel",
  "timer.editor.icon": "Symbol",
  "timer.editor.icon_color": "Symbolfarbe",
  "timer.editor.active_color": "Farbe für aktiven Timer",
  "timer.editor.switch_help":
    "Das zu steuernde Gerät (switch, light oder input_boolean). Diese Entität wird zur geplanten Zeit ein- oder ausgeschaltet.",
  "timer.editor.on_help":
    "Ein input_datetime Helfer (mit Datum UND Zeit aktiviert), der den Einschaltzeitpunkt speichert. Erstellen unter Einstellungen > Geräte & Dienste > Helfer > Hinzufügen > Datum und/oder Zeit. Beide Optionen 'Datum' und 'Zeit' aktivieren. Dann eine Automation erstellen: Trigger bei Zeit dieser Entität → Gerät einschalten.",
  "timer.editor.off_help":
    "Optional: ein input_datetime Helfer für den Ausschaltzeitpunkt. Gleiches Setup wie der Einschalt-Helfer. Wenn nicht gesetzt, plant die Karte nur das Einschalten. Eine zweite Automation erstellen: Trigger bei Zeit dieser Entität → Gerät ausschalten.",
  "timer.editor.active_help":
    "Ein input_boolean, das anzeigt, ob ein Timer aktuell geplant ist. Die Karte schaltet ihn beim Planen ein und beim Abbrechen aus. Nutze ihn als Bedingung in den Automationen, damit sie nur feuern wenn der Timer aktiv ist.",
  "timer.editor.active_color_help": "Farbe für das Aktiv-Badge und Hervorhebungen.",

  // --- Schedule card ---
  "schedule.default_name": "Zeitplan",
  "schedule.timer_label": "Zeitschaltuhr",
  "schedule.no_timer_set": "Kein Timer gesetzt",

  "schedule.editor.section_entities": "Entitäten",
  "schedule.editor.section_identity": "Erscheinungsbild",
  "schedule.editor.section_layout": "Layout",
  "schedule.editor.section_appearance": "Farben",
  "schedule.editor.section_display": "Anzeige-Optionen",
  "schedule.placeholder_companion": "Wähle in den Karten-Einstellungen eine PowerPilz Smart-Zeitschaltuhr-Entität aus, um diese Karte zu konfigurieren.",
  "schedule.placeholder_manual": "Wähle in den Karten-Einstellungen eine Zeitplan-Entität aus, um diese Karte zu konfigurieren.",
  "schedule.editor.use_companion": "PowerPilz Companion Integration nutzen",
  "schedule.editor.use_companion_help":
    "Wenn aktiviert (Standard), musst du nur eine einzige Entität angeben — einen PowerPilz Smart-Zeitschaltuhr-Helfer aus der PowerPilz Companion Integration — die Karte liest den verknüpften Zeitplan und das Zielgerät automatisch aus deren Attributen. Wenn deaktiviert, gibst du die drei Entitäten (Zeitplan / Gerät / Modus) manuell an.",
  "schedule.editor.companion_entity": "PowerPilz Smart-Zeitschaltuhr-Entität",
  "schedule.editor.companion_help":
    "Ein PowerPilz Smart-Zeitschaltuhr-Helfer (select.* Entität, angelegt von der PowerPilz Companion Integration). Die Karte liest automatisch deren `linked_schedule`- und `target_entity`-Attribute — keine weiteren Entitäten nötig.",
  "schedule.editor.schedule_entity": "Zeitplan-Entität",
  "schedule.editor.switch_entity": "Geräte-Entität",
  "schedule.editor.mode_entity": "Modus-Override Entität",
  "schedule.editor.name": "Name",
  "schedule.editor.subtitle": "Untertitel",
  "schedule.editor.icon": "Symbol",
  "schedule.editor.icon_color": "Symbolfarbe",
  "schedule.editor.card_layout": "Karten-Layout",
  "schedule.editor.time_window": "Zeitfenster",
  "schedule.editor.active_color": "Farbe aktiver Blöcke",
  "schedule.editor.show_day_selector": "Wochentag-Auswahl anzeigen",
  "schedule.editor.show_mode_control": "Modus-Button anzeigen",
  "schedule.editor.show_now_indicator": "Aktuelle Zeit anzeigen",
  "schedule.editor.show_time_labels": "Stunden-Labels anzeigen",
  "schedule.editor.layout_horizontal": "Horizontal",
  "schedule.editor.layout_vertical": "Vertikal",
  "schedule.editor.tw_24": "24 Stunden (ganzer Tag)",
  "schedule.editor.tw_12": "12 Stunden (±6h)",
  "schedule.editor.tw_6": "6 Stunden (±3h)",
  "schedule.editor.schedule_help":
    "Ein Schedule-Helfer (Domain 'schedule'). Anlegen unter Einstellungen > Geräte & Dienste > Helfer > Hinzufügen > Zeitplan. Definiert die wöchentlichen Ein/Aus-Zeitblöcke für die Zeitleiste. WICHTIG: Ein Schedule-Helfer schaltet selbst KEIN Gerät ein oder aus — er hat nur einen eigenen Ein/Aus-Status basierend auf der aktuellen Zeit. Du musst zwei Automations anlegen, die den Schedule mit dem Gerät verbinden (siehe Hilfetext beim Feld 'Geräte-Entität' unten für YAML-Beispiel).",
  "schedule.editor.switch_help":
    "Das Gerät, das dieser Zeitplan steuert (switch, light oder input_boolean). Wird automatisch ein- bzw. ausgeschaltet wenn der Modus auf 'Ein' oder 'Aus' wechselt (manueller Override über die Karte). Für den Auto-Modus (Schedule-gesteuert) musst du ZWEI Automations in HA anlegen — eine die feuert wenn der Schedule angeht und das Gerät einschaltet, und eine die das Gegenteil tut. YAML-Beispiel: triggers: [{trigger: state, entity_id: schedule.dein_zeitplan, to: 'on'}], actions: [{action: switch.turn_on, target: {entity_id: switch.dein_geraet}}]. Zweite Automation spiegelverkehrt mit to: 'off' und switch.turn_off. Optional beide Automations mit einer Bedingung versehen, die prüft ob die Modus-Entität auf 'Auto' steht, damit manuelle Overrides nicht sofort wieder überschrieben werden.",
  "schedule.editor.mode_help":
    "Ein input_select mit Optionen wie 'Auto', 'On', 'Off' (anlegen unter Einstellungen > Helfer > Dropdown). Steuert den Override-Modus: Timer/Auto = Zeitplan läuft normal, Ein = Gerät immer an, Aus = Gerät immer aus. Tippen auf die Karte oder den Modus-Button wechselt den Modus. Nutze diese Entität als Bedingung in deinen Schedule-zu-Gerät Automations, damit sie nur feuern wenn Modus == 'Auto'.",
  "schedule.editor.time_window_help":
    "Wie viele Stunden auf der Zeitleiste angezeigt werden. 24h zeigt den ganzen Tag, 12h und 6h zentrieren sich auf die aktuelle Zeit.",
  "schedule.editor.active_color_help": "Farbe für die aktiven (eingeschalteten) Zeitblöcke.",
  "schedule.editor.card_layout_help":
    "Horizontal zeigt die Controls neben dem Header. Vertikal stapelt alles für eine höhere Karte.",
  "schedule.editor.show_day_help": "Wochentag-Auswahlleiste anzeigen oder verbergen.",
  "schedule.editor.show_mode_help":
    "Modus-Button (Timer/Ein/Aus) im Karten-Header anzeigen oder verbergen.",
  "schedule.editor.show_now_help":
    "Vertikale Linie auf der Zeitleiste bei der aktuellen Zeit anzeigen.",
  "schedule.editor.show_labels_help": "Stunden-Beschriftungen über der Zeitleiste anzeigen.",

  // --- Switch card ---
  "switch.default_name": "Modus",

  "switch.editor.section_identity": "Erscheinungsbild",
  "switch.editor.section_layout": "Layout",
  "switch.editor.section_slider": "Slider-Design",
  "switch.editor.section_state_custom": "Zustands-Anpassung",
  "switch.editor.state_n_title": "Zustand {n}",
  "switch.editor.state_1_title": "Zustand 1 (Aus / erste Option)",
  "switch.editor.name": "Name",
  "switch.editor.subtitle": "Untertitel",
  "switch.editor.icon": "Symbol",
  "switch.editor.icon_color": "Symbolfarbe",
  "switch.editor.dim_inactive_icon": "Symbol im ersten Zustand (Aus) ausgrauen",
  "switch.editor.entity": "Zustands-Entität",
  "switch.editor.card_layout": "Karten-Layout",
  "switch.editor.slider_size": "Slider-Breite",
  "switch.editor.slider_color": "Slider-Farbe",
  "switch.editor.use_custom_icons": "Eigene Symbole pro Zustand",
  "switch.editor.state_color": "Farbe",
  "switch.editor.state_icon": "Symbol",
  "switch.editor.layout_horizontal": "Horizontal (1 Zeile)",
  "switch.editor.layout_vertical": "Vertikal (2 Zeilen)",
  "switch.editor.slider_small": "Klein",
  "switch.editor.slider_medium": "Mittel",
  "switch.editor.slider_large": "Groß",

  // --- Wallbox card ---
  "wallbox.default_name": "Wallbox",
  "wallbox.ev_charger": "Ladestation",
  "wallbox.start": "Start",
  "wallbox.stop": "Stopp",
  "wallbox.mode_fallback": "Modus",
  "wallbox.status_charging": "Lädt",
  "wallbox.status_ready": "Bereit",
  "wallbox.status_idle": "Inaktiv",
  "wallbox.status_paused": "Pausiert",
  "wallbox.status_complete": "Abgeschlossen",

  "wallbox.editor.name": "Name",
  "wallbox.editor.icon": "Symbol",
  "wallbox.editor.icon_color": "Symbolfarbe",
  "wallbox.editor.power_entity": "Leistungs-Entität",
  "wallbox.editor.status_entity": "Status-Entität",
  "wallbox.editor.mode_entity": "Modus-Entität",
  "wallbox.editor.command_entity": "Steuer-Entität",
  "wallbox.editor.show_mode": "Modus-Auswahl anzeigen",
  "wallbox.editor.show_live": "Live-Status und Leistung anzeigen",
  "wallbox.editor.show_button": "Play/Pause-Button anzeigen",
  "wallbox.editor.decimals": "Nachkommastellen",
  "wallbox.editor.auto_scale": "Einheiten-Skalierung (W↔kW, Wh↔kWh)",
  "wallbox.editor.decimals_base": "Nachkommastellen (Basis-Einheit)",
  "wallbox.editor.decimals_prefixed": "Nachkommastellen (skalierte Einheit)",

  // --- Graph cards ---
  "graph.editor.section_graph_settings": "Graph-Einstellungen",
  "graph.editor.section_display_options": "Anzeige-Optionen",
  "graph.editor.section_stacked_percent": "Gestapelt in Prozent",
  "graph.editor.section_units": "Einheiten & Format",
  "graph.editor.section_actions": "Aktionen",
  "graph.editor.section_display_format": "Anzeige-Format",
  "graph.editor.section_auto_scaling": "Auto-Skalierung",
  "graph.editor.entity_title": "Entität {n}",
  "graph.editor.layout": "Layout",
  "graph.editor.timeframe_hours": "Zeitraum",
  "graph.editor.hover_enabled": "Hover",
  "graph.editor.fill_area_enabled": "Flächenfüllung",
  "graph.editor.shared_trend_scale": "Gemeinsame Skala",
  "graph.editor.trend_data_source": "Datenquelle",
  "graph.editor.clip_graph_to_labels": "Unterhalb Labels abschneiden",
  "graph.editor.line_thickness": "Linienstärke",
  "graph.editor.unit": "Einheit",
  "graph.editor.decimals": "Nachkommastellen",
  "graph.editor.auto_scale_units": "Einheiten-Skalierung",
  "graph.editor.decimals_base_unit": "Nachkommastellen (Basis-Einheit)",
  "graph.editor.decimals_prefixed_unit": "Nachkommastellen (skalierte Einheit)",
  "graph.editor.normalize_stack_to_percent": "Auf 100% normalisieren",
  "graph.editor.percent_reference_slot": "100%-Referenz-Entität",
  "graph.editor.percent_reference_auto": "Referenz automatisch berechnen",
  "graph.editor.entity": "Aktions-Entität",
  "graph.editor.tap_action": "Verhalten bei Tap",
  "graph.editor.hold_action": "Verhalten bei Halten",
  "graph.editor.double_tap_action": "Verhalten bei Doppeltap"
};

const TRANSLATIONS: Record<Lang, Dict> = { en: EN, de: DE };

/** Translate a key with optional placeholder substitution `{name}`. */
export function tr(lang: Lang | string | undefined, key: string, vars?: Record<string, string | number>): string {
  const l: Lang = (lang === "de" ? "de" : "en");
  const dict = TRANSLATIONS[l] ?? EN;
  let s = dict[key] ?? EN[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
    }
  }
  return s;
}

/** Short weekday label for a JS getDay() index (0 = Sunday). */
export function weekdayShort(lang: Lang | string | undefined, index: number): string {
  return tr(lang, `weekday.short.${((index % 7) + 7) % 7}`);
}
