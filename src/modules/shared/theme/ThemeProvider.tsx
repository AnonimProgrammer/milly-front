"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  // On mount, read the stored theme from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored === "dark" || stored === "light" || stored === "system") {
      setThemeState(stored);
    }
  }, []);

  // Apply the theme class to <html> whenever the theme changes
  useEffect(() => {
    const root = document.documentElement;

    function applyTheme() {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const activeTheme = theme === "system" ? (systemDark ? "dark" : "light") : theme;

      root.classList.toggle("dark", activeTheme === "dark");
      setResolvedTheme(activeTheme);
    }

    applyTheme();

    if (theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      media.addEventListener("change", applyTheme);
      return () => media.removeEventListener("change", applyTheme);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem("theme", newTheme);
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
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
