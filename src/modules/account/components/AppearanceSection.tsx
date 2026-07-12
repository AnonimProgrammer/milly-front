"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "@/modules/shared/theme/ThemeProvider";
import { ColorModeOptions } from "./ColorModeOptions";
import { ColorPaletteOptions } from "./ColorPaletteOptions";

const emptySubscribe = () => () => {};

export function AppearanceSection() {
  const { colorMode, setColorMode, colorTheme, setColorTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  return (
    <div className="flex flex-col gap-8">
      <ColorModeOptions
        activeMode={mounted ? colorMode : null}
        onSelect={setColorMode}
      />
      <ColorPaletteOptions
        activePalette={mounted ? colorTheme : null}
        onSelect={setColorTheme}
      />
    </div>
  );
}
