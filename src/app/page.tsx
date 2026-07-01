import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#2C2A29] flex flex-col justify-between selection:bg-[#D96B43]/10 selection:text-[#D96B43] font-sans antialiased relative overflow-hidden">
      {/* Aesthetic background soft blur elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full bg-[#D96B43]/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full bg-[#FAF2EE] blur-[80px] pointer-events-none" />

      {/* Top Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="text-xl font-medium tracking-tight text-[#2C2A29] select-none">
            milly<span className="text-[#D96B43]">.</span>
          </span>
        </div>
      </header>

      {/* Main Centered Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center z-10 max-w-xl mx-auto">
        {/* SVG Brand Mark */}
        <div className="mb-8 relative flex items-center justify-center">
          <div className="absolute inset-0 bg-[#D96B43]/10 rounded-full blur-xl scale-75 animate-pulse" />
          <svg className="w-16 h-16 relative" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="28" cy="28" r="16" fill="#FAF2EE" />
            <circle cx="36" cy="36" r="16" fill="#D96B43" fillOpacity="0.85" />
            <rect x="28" y="28" width="8" height="8" fill="#D96B43" className="mix-blend-multiply" />
          </svg>
        </div>

        {/* Welcome Title */}
        <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-[#2C2A29] leading-tight">
          Welcome to <span className="font-normal text-[#D96B43]">Milly</span>
        </h1>

        {/* Minimal Subtitle */}
        <p className="mt-4 text-[#7A7572] font-light text-base sm:text-lg leading-relaxed max-w-md">
          A quiet, effortless way to explore menus, order table-side, and complete payments at your favorite venues.
        </p>

        {/* Buttons Section */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/login?intent=join-venue"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium text-sm text-white bg-[#D96B43] shadow-lg shadow-[#D96B43]/15 transition-all duration-300 hover:bg-[#C25832] hover:scale-[1.02] hover:shadow-xl hover:shadow-[#D96B43]/25 active:scale-[0.98]"
          >
            Join Venue
          </Link>
          <Link
            href="/login?intent=register-venue"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium text-sm text-[#D96B43] border border-[#D96B43]/30 bg-transparent transition-all duration-300 hover:bg-[#D96B43]/5 hover:border-[#D96B43]/60 hover:scale-[1.02] active:scale-[0.98]"
          >
            Register Venue
          </Link>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 text-center text-xs text-[#A69F9B] z-10 font-light">
        &copy; {new Date().getFullYear()} Milly. All rights reserved.
      </footer>
    </div>
  );
}
