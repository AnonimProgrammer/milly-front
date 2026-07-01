"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const searchParams = useSearchParams();
  const intent = searchParams.get("intent");
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-[#2C2A29] flex flex-col justify-between selection:bg-[#D96B43]/10 selection:text-[#D96B43] font-sans antialiased relative overflow-hidden p-6">
      {/* Aesthetic background soft blur elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full bg-[#D96B43]/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full bg-[#FAF2EE] blur-[80px] pointer-events-none" />

      {/* Top Navigation */}
      <header className="w-full max-w-7xl mx-auto py-2 flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#7A7572] hover:text-[#2C2A29] transition-colors font-light"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </Link>
        <span className="text-sm font-medium tracking-tight text-[#2C2A29] select-none">
          milly<span className="text-[#D96B43]">.</span>
        </span>
      </header>

      {/* Centered Login Card */}
      <div className="flex-1 flex items-center justify-center py-10 z-10">
        <div className="w-full max-w-md bg-white border border-stone-200/60 rounded-3xl p-8 sm:p-10 shadow-xl shadow-stone-200/50 flex flex-col">
          {/* Dynamic Intent Banner */}
          {intent === "join-venue" && (
            <div className="mb-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-[#D96B43] bg-[#FAF2EE] border border-[#D96B43]/15 self-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D96B43] animate-pulse" />
              Joining Venue
            </div>
          )}
          {intent === "register-venue" && (
            <div className="mb-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-[#D96B43] bg-[#FAF2EE] border border-[#D96B43]/15 self-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D96B43] animate-pulse" />
              Registering Venue
            </div>
          )}

          {/* Form Title & Description */}
          <h2 className="text-2xl font-semibold tracking-tight text-[#2C2A29] text-center">
            {isSignUp ? "Create an account" : "Sign in"}
          </h2>
          <p className="mt-2 text-sm text-[#7A7572] font-light text-center">
            {isSignUp
              ? "Start your journey with Milly."
              : "Welcome back! Please enter your details."}
          </p>

          {/* Form Fields */}
          <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex flex-col gap-4">
            {isSignUp && (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-medium text-[#7A7572]">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF9F5] text-sm text-[#2C2A29] transition-all focus:border-[#D96B43] focus:ring-1 focus:ring-[#D96B43] outline-none"
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-medium text-[#7A7572]">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF9F5] text-sm text-[#2C2A29] transition-all focus:border-[#D96B43] focus:ring-1 focus:ring-[#D96B43] outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-medium text-[#7A7572]">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF9F5] text-sm text-[#2C2A29] transition-all focus:border-[#D96B43] focus:ring-1 focus:ring-[#D96B43] outline-none"
              />
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  className="text-xs font-medium text-[#D96B43] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="mt-2 w-full py-3.5 rounded-xl bg-[#D96B43] text-white text-sm font-medium transition-all duration-300 hover:bg-[#C25832] hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-[#D96B43]/10"
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </button>
          </form>

          {/* Form Mode Toggle */}
          <p className="mt-6 text-center text-xs text-[#7A7572]">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-medium text-[#D96B43] hover:underline cursor-pointer"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200/60"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
              <span className="bg-white px-3 text-[#A69F9B] font-light">or continue with</span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 text-sm font-medium text-[#2C2A29] hover:bg-stone-50 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 text-sm font-medium text-[#2C2A29] hover:bg-stone-50 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.51-.63.73-1.18 1.87-1.03 2.98.12.01.24.02.36.02.88 0 2.03-.54 2.62-1.45" />
              </svg>
              Apple
            </button>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <footer className="w-full max-w-7xl mx-auto py-4 text-center text-xs text-[#A69F9B] z-10 font-light">
        &copy; {new Date().getFullYear()} Milly. All rights reserved.
      </footer>
    </main>
  );
}

export function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#FAF9F5] flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-stone-200/60 rounded-3xl p-8 sm:p-10 shadow-xl shadow-stone-200/50 animate-pulse h-[400px]" />
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
