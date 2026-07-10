"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { applyThemeToDocument } from "./applyTheme";
import {
  COLOR_MODE_STORAGE_KEY,
  COLOR_THEME_STORAGE_KEY,
  LEGACY_COLOR_MODE_STORAGE_KEY,
  type ColorMode,
  type ColorTheme,
  isColorMode,
  isColorTheme,
} from "./constants";

interface ThemeContextType {
  /** Light/dark appearance preference. */
  colorMode: ColorMode;
  /** Accent palette preference. */
  colorTheme: ColorTheme;
  /** Resolved light/dark value after applying system preference. */
  resolvedColorMode: "light" | "dark";
  setColorMode: (colorMode: ColorMode) => void;
  setColorTheme: (colorTheme: ColorTheme) => void;
  /** @deprecated Use `colorMode` instead. */
  theme: ColorMode;
  /** @deprecated Use `resolvedColorMode` instead. */
  resolvedTheme: "light" | "dark";
  /** @deprecated Use `setColorMode` instead. */
  setTheme: (colorMode: ColorMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function readStoredColorMode(): ColorMode {
  const stored =
    localStorage.getItem(COLOR_MODE_STORAGE_KEY) ??
    localStorage.getItem(LEGACY_COLOR_MODE_STORAGE_KEY);

  return isColorMode(stored) ? stored : "system";
}

function readStoredColorTheme(): ColorTheme {
  const stored = localStorage.getItem(COLOR_THEME_STORAGE_KEY);
  return isColorTheme(stored) ? stored : "default";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorMode, setColorModeState] = useState<ColorMode>("system");
  const [colorTheme, setColorThemeState] = useState<ColorTheme>("default");
  const [resolvedColorMode, setResolvedColorMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedColorMode = readStoredColorMode();
    const storedColorTheme = readStoredColorTheme();

    setColorModeState(storedColorMode);
    setColorThemeState(storedColorTheme);

    if (localStorage.getItem(LEGACY_COLOR_MODE_STORAGE_KEY) && !localStorage.getItem(COLOR_MODE_STORAGE_KEY)) {
      localStorage.setItem(COLOR_MODE_STORAGE_KEY, storedColorMode);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    function syncTheme() {
      setResolvedColorMode(applyThemeToDocument(root, colorMode, colorTheme));
    }

    syncTheme();

    if (colorMode === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      media.addEventListener("change", syncTheme);
      return () => media.removeEventListener("change", syncTheme);
    }
  }, [colorMode, colorTheme]);

  const setColorMode = (nextColorMode: ColorMode) => {
    localStorage.setItem(COLOR_MODE_STORAGE_KEY, nextColorMode);
    localStorage.removeItem(LEGACY_COLOR_MODE_STORAGE_KEY);
    setColorModeState(nextColorMode);
  };

  const setColorTheme = (nextColorTheme: ColorTheme) => {
    if (nextColorTheme === "default") {
      localStorage.removeItem(COLOR_THEME_STORAGE_KEY);
    } else {
      localStorage.setItem(COLOR_THEME_STORAGE_KEY, nextColorTheme);
    }

    setColorThemeState(nextColorTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        colorMode,
        colorTheme,
        resolvedColorMode,
        setColorMode,
        setColorTheme,
        theme: colorMode,
        resolvedTheme: resolvedColorMode,
        setTheme: setColorMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
