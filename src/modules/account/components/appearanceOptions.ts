import { Flame, Heart, Monitor, Moon, Palette, Sun, Waves, type LucideIcon } from "lucide-react";
import type { ColorMode, ColorTheme } from "@/modules/shared/theme/constants";

export type AppearanceOption<T extends string> = {
  id: T;
  name: string;
  Icon: LucideIcon;
  description: string;
};

export type PaletteOption = AppearanceOption<ColorTheme> & {
  previewClass: string;
};

export const modeOptions: AppearanceOption<ColorMode>[] = [
  {
    id: "light",
    name: "Light",
    Icon: Sun,
    description: "Clean and classic bright mode",
  },
  {
    id: "dark",
    name: "Dark",
    Icon: Moon,
    description: "Sleek and easy on the eyes",
  },
  {
    id: "system",
    name: "System",
    Icon: Monitor,
    description: "Matches your device settings",
  },
];

export const paletteOptions: PaletteOption[] = [
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
