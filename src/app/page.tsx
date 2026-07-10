import { HomeUserNav, VenueEntryButtons } from "@/modules/auth";
import { pageMain, selectionTheme, textMuted } from "@/modules/shared/theme/classNames";
import { MillyMark } from "@/modules/shared/ui";

export default function Home() {
  return (
    <div className={`min-h-screen flex flex-col justify-between relative overflow-hidden ${pageMain} ${selectionTheme}`}>
      <HomeUserNav />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center z-10 max-w-xl mx-auto">
        <div className="mb-8 flex items-center justify-center">
          <MillyMark className="h-16 w-16" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-foreground leading-tight">
          Welcome to <span className="font-semibold text-foreground">Milly</span>
        </h1>

        <p className={`mt-4 font-light text-base sm:text-lg leading-relaxed max-w-md ${textMuted}`}>
          Order, Enjoy, Pay
        </p>

        <VenueEntryButtons />
      </main>

      <footer className={`w-full max-w-7xl mx-auto px-6 py-6 text-center text-xs z-10 font-light ${textMuted}`}>
        &copy; {new Date().getFullYear()} Milly. All rights reserved.
      </footer>
    </div>
  );
}
