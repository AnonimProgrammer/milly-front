export const COLOR_MODE_STORAGE_KEY = "milly:color-mode";
export const LEGACY_COLOR_MODE_STORAGE_KEY = "theme";
export const COLOR_THEME_STORAGE_KEY = "milly:color-theme";

/** Light/dark appearance — toggled via the `.dark` class on `<html>`. */
export const COLOR_MODES = ["light", "dark", "system"] as const;

/**
 * Accent palettes — toggled via `data-theme` on `<html>`.
 * Add new entries here and matching CSS variable blocks in globals.css.
 */
export const COLOR_THEMES = ["default", "orange", "pink", "ocean"] as const;

export type ColorMode = (typeof COLOR_MODES)[number];
export type ColorTheme = (typeof COLOR_THEMES)[number];

export function isColorMode(value: string | null): value is ColorMode {
  return value === "light" || value === "dark" || value === "system";
}

export function isColorTheme(value: string | null): value is ColorTheme {
  return value === "default" || value === "orange" || value === "pink" || value === "ocean";
}
