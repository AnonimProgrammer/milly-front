/** Shared Tailwind class groups mapped to theme CSS variables. */

export const pageShell = "text-foreground font-sans antialiased";

export const pageMain =
  "min-h-screen bg-transparent text-foreground font-sans antialiased relative overflow-hidden";

export const selectionTheme =
  "selection:bg-primary selection:text-primary-foreground";

export const surfaceCard =
  "rounded-xl border border-border bg-card text-card-foreground";

export const surfacePanel = "rounded-3xl border border-border bg-card text-card-foreground shadow-xl";

export const textMuted = "text-muted-foreground";

export const inputField =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60";

export const spinnerRing =
  "animate-spin rounded-full border-2 border-border border-t-primary";

export const primaryButton =
  "bg-primary text-primary-foreground transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60";

export const loginButton =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full px-5 py-2.5 text-base font-medium shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 bg-primary text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60";

export const secondaryButton =
  "border border-border bg-card text-foreground transition-colors hover:bg-muted";

export const modalOverlay =
  "fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs";

export const modalPanel =
  "w-full max-w-md rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-2xl sm:p-8";

export const tabActive =
  "bg-primary text-primary-foreground shadow-sm";

export const tabInactive =
  "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground";

export const listRow =
  "rounded-2xl border border-border bg-card/50 transition-colors hover:bg-muted hover:border-primary/30";

