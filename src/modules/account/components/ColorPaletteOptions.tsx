"use client";

import type { ColorTheme } from "@/modules/shared/theme/constants";
import { tabActive, tabInactive } from "@/modules/shared/theme/classNames";
import { paletteOptions } from "./appearanceOptions";

type ColorPaletteOptionsProps = {
  activePalette: ColorTheme | null;
  onSelect: (palette: ColorTheme) => void;
};

export function ColorPaletteOptions({ activePalette, onSelect }: ColorPaletteOptionsProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-medium text-foreground">Color palette</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {paletteOptions.map((option) => {
          const isActive = activePalette === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
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
  );
}
