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
    <div className="flex flex-col gap-3 sm:gap-4">
      <h2 className="text-base font-medium text-foreground sm:text-lg">Color palette</h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {paletteOptions.map((option) => {
          const isActive = activePalette === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={[
                "group flex cursor-pointer flex-col items-center justify-center rounded-xl border p-2.5 text-center transition-all duration-300 hover:scale-[1.02] sm:rounded-2xl sm:p-4",
                isActive ? tabActive : `${tabInactive} bg-transparent`,
              ].join(" ")}
            >
              <div
                className={[
                  "h-7 w-7 rounded-full border border-border/50 shadow-inner transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10",
                  option.previewClass,
                ].join(" ")}
              />
              <span className="mt-2 text-xs font-medium sm:mt-3 sm:text-sm">{option.name}</span>
              <span
                className={[
                  "mt-0.5 hidden px-1 text-[11px] font-light leading-snug sm:mt-1 sm:block",
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
