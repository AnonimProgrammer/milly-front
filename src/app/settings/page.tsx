"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/modules/auth";
import { useTheme } from "@/modules/shared/theme/ThemeProvider";
import { useState, useEffect } from "react";

function SunIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

const themeOptions = [
  {
    id: "light" as const,
    name: "Light",
    Icon: SunIcon,
    description: "Clean and classic bright mode",
  },
  {
    id: "dark" as const,
    name: "Dark",
    Icon: MoonIcon,
    description: "Sleek and easy on the eyes",
  },
  {
    id: "system" as const,
    name: "System",
    Icon: MonitorIcon,
    description: "Matches your device settings",
  },
];

export default function SettingsPage() {
  const router = useRouter();
  const { user, status } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = mounted ? theme : null;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-zinc-50 flex flex-col font-sans antialiased relative overflow-hidden">
      {/* Background blur decorations */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full bg-black/5 dark:bg-white/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full bg-black/5 dark:bg-white/5 blur-[80px] pointer-events-none" />

      {/* Top nav */}
      <div className="w-full max-w-xl mx-auto px-6 pt-6 pb-2 z-10 flex flex-col gap-5">
        <span className="text-lg font-semibold tracking-tight text-black dark:text-zinc-100 sm:text-xl">
          milly.
        </span>
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2.5 text-base text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100 transition-colors font-light w-fit"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 z-10">
        <div className="w-full max-w-xl bg-white dark:bg-zinc-900 border border-black/10 dark:border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/10 dark:shadow-black/30 flex flex-col gap-8">
          {/* Title */}
          <div>
            <h1 className="text-3xl font-light tracking-tight text-black dark:text-zinc-100">
              Settings
            </h1>
            <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400 font-light">
              Customize your Milly experience
            </p>
          </div>

          {/* Theme Selector */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-medium text-black dark:text-zinc-200">
              Appearance
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {themeOptions.map((option) => {
                const isActive = activeTheme === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setTheme(option.id)}
                    className={[
                      "flex flex-col items-center justify-center p-5 rounded-2xl border text-center transition-all duration-300 group hover:scale-[1.02] cursor-pointer",
                      isActive
                        ? "bg-black dark:bg-white border-black dark:border-white text-white dark:text-black shadow-lg shadow-black/10 dark:shadow-white/5"
                        : "bg-transparent border-black/10 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-black/30 dark:hover:border-zinc-700 hover:text-black dark:hover:text-zinc-200",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "p-2 rounded-xl transition-colors duration-300",
                        isActive
                          ? "bg-white/15 dark:bg-black/15"
                          : "bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10",
                      ].join(" ")}
                    >
                      <option.Icon />
                    </div>
                    <span className="mt-3 text-sm font-medium">{option.name}</span>
                    <span
                      className={[
                        "mt-1 text-[11px] font-light leading-snug px-1",
                        isActive ? "text-zinc-200 dark:text-zinc-700" : "text-zinc-500 dark:text-zinc-500",
                      ].join(" ")}
                    >
                      {option.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Profile section */}
          <div className="border-t border-black/5 dark:border-zinc-800 pt-6 flex flex-col gap-4">
            <h2 className="text-lg font-medium text-black dark:text-zinc-200">Profile</h2>
            {status === "loading" ? (
              <div className="h-16 w-full bg-black/5 dark:bg-white/5 rounded-2xl animate-pulse" />
            ) : status === "authenticated" && user ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-black/10 dark:border-zinc-800 bg-black/[0.01] dark:bg-white/[0.01]">
                <div>
                  <p className="text-base font-medium text-black dark:text-zinc-200">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-light mt-0.5">
                    {user.email ?? "No email provided"}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Signed In
                </span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-black/10 dark:border-zinc-800 bg-black/[0.01] dark:bg-white/[0.01]">
                <div>
                  <p className="text-base font-medium text-black dark:text-zinc-200">
                    Guest Account
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-light mt-0.5">
                    Sign in to sync your venue history and billing details.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 text-xs font-medium border border-zinc-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                  Guest
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-xl mx-auto px-6 py-4 text-center text-xs text-zinc-500 dark:text-zinc-400 z-10 font-light">
        © {new Date().getFullYear()} Milly. All rights reserved.
      </div>
    </div>
  );
}
