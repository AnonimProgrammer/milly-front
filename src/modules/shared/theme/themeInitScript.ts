import {
  COLOR_MODE_STORAGE_KEY,
  COLOR_THEME_STORAGE_KEY,
  LEGACY_COLOR_MODE_STORAGE_KEY,
} from "./constants";

/** Inline script injected before hydration to prevent theme flash. */
export function getThemeInitScript(): string {
  return `(function(){try{const colorMode=localStorage.getItem("${COLOR_MODE_STORAGE_KEY}")||localStorage.getItem("${LEGACY_COLOR_MODE_STORAGE_KEY}");const colorTheme=localStorage.getItem("${COLOR_THEME_STORAGE_KEY}");const root=document.documentElement;const isDark=colorMode==="dark"||(colorMode!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);root.classList.toggle("dark",isDark);if(colorTheme&&colorTheme!=="default"){root.setAttribute("data-theme",colorTheme);}else{root.removeAttribute("data-theme");}}catch(e){}})();`;
}
