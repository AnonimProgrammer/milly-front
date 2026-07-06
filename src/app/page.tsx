import { HomeUserNav, VenueEntryButtons } from "@/modules/auth";
import { MillyMark } from "@/modules/shared/ui";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-between selection:bg-black selection:text-white font-sans antialiased relative overflow-hidden">
      <HomeUserNav />

      {/* Aesthetic background soft blur elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full bg-black/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full bg-black/5 blur-[80px] pointer-events-none" />

      {/* Main Centered Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center z-10 max-w-xl mx-auto">
        {/* SVG Brand Mark */}
        <div className="mb-8 relative flex items-center justify-center">
          <div className="absolute inset-0 bg-black/10 rounded-full blur-xl scale-75 animate-pulse" />
          <MillyMark className="relative h-16 w-16" />
        </div>

        {/* Welcome Title */}
        <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-black leading-tight">
          Welcome to <span className="font-semibold text-black">Milly</span>
        </h1>

        {/* Minimal Subtitle */}
        <p className="mt-4 text-zinc-600 font-light text-base sm:text-lg leading-relaxed max-w-md">
          Order, Enjoy, Pay
        </p>

        <VenueEntryButtons />
      </main>

      {/* Bottom Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 text-center text-xs text-zinc-500 z-10 font-light">
        &copy; {new Date().getFullYear()} Milly. All rights reserved.
      </footer>
    </div>
  );
}
