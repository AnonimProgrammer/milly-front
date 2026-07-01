import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-between selection:bg-black selection:text-white font-sans antialiased relative overflow-hidden">
      {/* Aesthetic background soft blur elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full bg-black/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full bg-black/5 blur-[80px] pointer-events-none" />

      {/* Main Centered Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center z-10 max-w-xl mx-auto">
        {/* SVG Brand Mark */}
        <div className="mb-8 relative flex items-center justify-center">
          <div className="absolute inset-0 bg-black/10 rounded-full blur-xl scale-75 animate-pulse" />
          <svg className="w-16 h-16 relative" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="28" cy="28" r="16" fill="#E5E7EB" />
            <circle cx="36" cy="36" r="16" fill="#000000" fillOpacity="0.85" />
            <rect x="28" y="28" width="8" height="8" fill="#000000" className="mix-blend-multiply" />
          </svg>
        </div>

        {/* Welcome Title */}
        <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-black leading-tight">
          Welcome to <span className="font-semibold text-black">Milly</span>
        </h1>

        {/* Minimal Subtitle */}
        <p className="mt-4 text-zinc-600 font-light text-base sm:text-lg leading-relaxed max-w-md">
          Order, Enjoy, Pay
        </p>

        {/* Buttons Section */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/login?intent=join-venue"
            className="flex w-40 items-center justify-center whitespace-nowrap px-4 py-3.5 rounded-full font-medium text-sm text-white bg-black shadow-lg shadow-black/20 transition-all duration-300 hover:bg-zinc-800 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/30 active:scale-[0.98]"
          >
            Join Venue
          </Link>
          <Link
            href="/login?intent=register-venue"
            className="flex w-40 items-center justify-center whitespace-nowrap px-4 py-3.5 rounded-full font-medium text-sm text-black border border-black/30 bg-transparent shadow-lg shadow-black/20 transition-all duration-300 hover:bg-black/5 hover:border-black/60 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/30 active:scale-[0.98]"
          >
            Register Venue
          </Link>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 text-center text-xs text-zinc-500 z-10 font-light">
        &copy; {new Date().getFullYear()} Milly. All rights reserved.
      </footer>
    </div>
  );
}
