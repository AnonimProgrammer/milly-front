import Link from "next/link";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-white text-black flex flex-col justify-between selection:bg-black selection:text-white font-sans antialiased relative overflow-hidden p-6">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full bg-black/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full bg-black/5 blur-[80px] pointer-events-none" />

      <header className="w-full max-w-7xl mx-auto py-2 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-base text-zinc-500 hover:text-black transition-colors font-light"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center py-10 z-10">{children}</div>

      <footer className="w-full max-w-7xl mx-auto py-4 text-center text-xs text-zinc-500 z-10 font-light">
        &copy; {new Date().getFullYear()} Milly. All rights reserved.
      </footer>
    </main>
  );
}
