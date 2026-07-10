"use client";

import { Flame, Heart, Monitor, Moon, Palette, Sun, Waves } from "lucide-react";
import { useEffect, useState } from "react";
import type { ColorTheme } from "@/modules/shared/theme/constants";
import { tabActive, tabInactive } from "@/modules/shared/theme/classNames";
import { useTheme } from "@/modules/shared/theme/ThemeProvider";

const modeOptions = [
  {
    id: "light" as const,
    name: "Light",
    Icon: Sun,
    description: "Clean and classic bright mode",
  },
  {
    id: "dark" as const,
    name: "Dark",
    Icon: Moon,
    description: "Sleek and easy on the eyes",
  },
  {
    id: "system" as const,
    name: "System",
    Icon: Monitor,
    description: "Matches your device settings",
  },
];

const paletteOptions: {
  id: ColorTheme;
  name: string;
  Icon: typeof Palette;
  description: string;
  previewClass: string;
}[] = [
  {
    id: "default",
    name: "Classic",
    Icon: Palette,
    description: "Neutral black and white",
    previewClass: "bg-gradient-to-br from-white to-zinc-200",
  },
  {
    id: "orange",
    name: "Orange",
    Icon: Flame,
    description: "Warm sunset tones",
    previewClass: "bg-gradient-to-br from-orange-200 to-orange-500",
  },
  {
    id: "pink",
    name: "Pink",
    Icon: Heart,
    description: "Soft rose accents",
    previewClass: "bg-gradient-to-br from-pink-200 to-pink-500",
  },
  {
    id: "ocean",
    name: "Ocean",
    Icon: Waves,
    description: "Dark oceanic blues",
    previewClass: "bg-gradient-to-br from-sky-200 to-sky-900",
  },
];

export function AppearanceSection() {
  const { theme, setTheme, colorTheme, setColorTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeMode = mounted ? theme : null;
  const activePalette = mounted ? colorTheme : null;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-medium text-foreground">Color mode</h2>
        <div className="grid grid-cols-3 gap-3">
          {modeOptions.map((option) => {
            const isActive = activeMode === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setTheme(option.id)}
                className={[
                  "group flex cursor-pointer flex-col items-center justify-center rounded-2xl border p-5 text-center transition-all duration-300 hover:scale-[1.02]",
                  isActive ? tabActive : `${tabInactive} bg-transparent`,
                ].join(" ")}
              >
                <div
                  className={[
                    "rounded-xl p-2 transition-colors duration-300",
                    isActive ? "bg-primary-foreground/15" : "bg-muted group-hover:bg-accent",
                  ].join(" ")}
                >
                  <option.Icon className="h-5 w-5" />
                </div>
                <span className="mt-3 text-sm font-medium">{option.name}</span>
                <span
                  className={[
                    "mt-1 px-1 text-[11px] font-light leading-snug",
                    isActive ? "text-primary-foreground/70" : "text-muted-foreground",
                  ].join(" ")}
                >
                  {option.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-medium text-foreground">Color palette</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {paletteOptions.map((option) => {
            const isActive = activePalette === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setColorTheme(option.id)}
                className={[
                  "group flex cursor-pointer flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all duration-300 hover:scale-[1.02]",
                  isActive ? tabActive : `${tabInactive} bg-transparent`,
                ].join(" ")}
              >
                <div
                  className={[
                    "h-10 w-10 rounded-full border border-border/50 shadow-inner transition-transform duration-300 group-hover:scale-105",
                    option.previewClass,
                  ].join(" ")}
                />
                <span className="mt-3 text-sm font-medium">{option.name}</span>
                <span
                  className={[
                    "mt-1 px-1 text-[11px] font-light leading-snug",
                    isActive ? "text-primary-foreground/70" : "text-muted-foreground",
                  ].join(" ")}
                >
                  {option.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
