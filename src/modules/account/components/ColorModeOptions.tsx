"use client";

import type { ColorMode } from "@/modules/shared/theme/constants";
import { tabActive, tabInactive } from "@/modules/shared/theme/classNames";
import { modeOptions } from "./appearanceOptions";

type ColorModeOptionsProps = {
  activeMode: ColorMode | null;
  onSelect: (mode: ColorMode) => void;
};

export function ColorModeOptions({ activeMode, onSelect }: ColorModeOptionsProps) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <h2 className="text-base font-medium text-foreground sm:text-lg">Color mode</h2>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {modeOptions.map((option) => {
          const isActive = activeMode === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={[
                "group flex cursor-pointer flex-col items-center justify-center rounded-xl border p-2.5 text-center transition-all duration-300 hover:scale-[1.02] sm:rounded-2xl sm:p-5",
                isActive ? tabActive : `${tabInactive} bg-transparent`,
              ].join(" ")}
            >
              <div
                className={[
                  "rounded-lg p-1.5 transition-colors duration-300 sm:rounded-xl sm:p-2",
                  isActive ? "bg-primary-foreground/15" : "bg-muted group-hover:bg-accent",
                ].join(" ")}
              >
                <option.Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
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
