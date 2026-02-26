export type ColorValue = string | number[] | undefined;

const COLOR_RGB_FALLBACK: Record<string, string> = {
  red: "244, 67, 54",
  pink: "233, 30, 99",
  purple: "156, 39, 176",
  violet: "156, 39, 176",
  "deep-purple": "103, 58, 183",
  "deep-violet": "103, 58, 183",
  indigo: "63, 81, 181",
  blue: "33, 150, 243",
  "light-blue": "3, 169, 244",
  cyan: "0, 188, 212",
  teal: "0, 150, 136",
  green: "76, 175, 80",
  "light-green": "139, 195, 74",
  lime: "205, 220, 57",
  yellow: "255, 235, 59",
  amber: "255, 193, 7",
  orange: "255, 152, 0",
  "deep-orange": "255, 87, 34",
  brown: "121, 85, 72",
  "light-grey": "189, 189, 189",
  grey: "158, 158, 158",
  "dark-grey": "97, 97, 97",
  "blue-grey": "96, 125, 139",
  black: "0, 0, 0",
  white: "255, 255, 255",
  disabled: "189, 189, 189"
};

export const toRgbCss = (value?: ColorValue): string | null => {
  if (Array.isArray(value) && value.length >= 3) {
    const nums = value.slice(0, 3).map((channel) => Number(channel));
    if (nums.every((channel) => Number.isFinite(channel))) {
      const [r, g, b] = nums.map((channel) => Math.max(0, Math.min(255, Math.round(channel))));
      return `${r}, ${g}, ${b}`;
    }
    return null;
  }

  if (typeof value !== "string") {
    return null;
  }

  const raw = value.trim().toLowerCase();
  if (raw === "none") {
    return null;
  }
  if (raw.startsWith("var(--rgb-")) {
    return raw;
  }
  if (raw === "state") {
    return "var(--rgb-state-entity, var(--rgb-primary-color, 3, 169, 244))";
  }
  if (raw === "primary") {
    return "var(--rgb-primary-color, 3, 169, 244)";
  }
  if (raw === "accent") {
    return "var(--rgb-accent-color, 255, 152, 0)";
  }
  if (raw in COLOR_RGB_FALLBACK) {
    return `var(--rgb-${raw}, ${COLOR_RGB_FALLBACK[raw]})`;
  }

  const shortHex = /^#([a-fA-F0-9]{3})$/;
  const longHex = /^#([a-fA-F0-9]{6})$/;

  if (shortHex.test(raw)) {
    const [, hex] = raw.match(shortHex) ?? [];
    if (!hex) {
      return null;
    }
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    return `${r}, ${g}, ${b}`;
  }

  if (longHex.test(raw)) {
    const [, hex] = raw.match(longHex) ?? [];
    if (!hex) {
      return null;
    }
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }

  return null;
};

export const resolveColor = (value?: ColorValue, fallback = ""): string => {
  const rgbCss = toRgbCss(value);
  if (rgbCss) {
    return `rgb(${rgbCss})`;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const raw = value.trim();
    const normalized = raw.toLowerCase();
    if (normalized !== "none" && normalized !== "default") {
      return raw;
    }
  }

  return fallback;
};

export const mushroomIconStyle = (value?: ColorValue): Record<string, string> => {
  const rgbCss = toRgbCss(value);
  if (rgbCss) {
    return {
      "--icon-color": `rgb(${rgbCss})`,
      "--shape-color": `rgba(${rgbCss}, 0.2)`
    };
  }

  if (typeof value === "string" && value.trim().length > 0 && value !== "none") {
    const cssColor = value.trim();
    return {
      "--icon-color": cssColor,
      "--shape-color": `color-mix(in srgb, ${cssColor} 20%, transparent)`
    };
  }

  return {};
};
