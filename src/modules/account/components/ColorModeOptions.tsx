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
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-medium text-foreground">Color mode</h2>
      <div className="grid grid-cols-3 gap-3">
        {modeOptions.map((option) => {
          const isActive = activeMode === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
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
  );
}
