import type { ColorMode, ColorTheme } from "./constants";

export function resolveColorMode(colorMode: ColorMode): "light" | "dark" {
  if (colorMode === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  return colorMode;
}

export function applyThemeToDocument(
  root: HTMLElement,
  colorMode: ColorMode,
  colorTheme: ColorTheme,
): "light" | "dark" {
  const resolvedColorMode = resolveColorMode(colorMode);

  root.classList.toggle("dark", resolvedColorMode === "dark");

  if (colorTheme === "default") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", colorTheme);
  }

  return resolvedColorMode;
}
