"use client";

import { useState } from "react";
import Link from "next/link";

export function RegisterVenuePage() {
  const [venueName, setVenueName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (venueName.trim() && location.trim()) {
      setIsSuccess(true);
    }
  };

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

      {/* Centered Form Card */}
      <div className="flex-1 flex items-center justify-center py-10 z-10">
        <div className="w-full max-w-md bg-white border border-stone-200/60 rounded-3xl p-8 sm:p-10 shadow-xl shadow-stone-200/50 flex flex-col relative overflow-hidden">
          
          {!isSuccess ? (
            <>
              {/* Protected Route Info Banner */}
              <div className="mb-6 flex gap-2 p-3 bg-stone-50 border border-stone-200/50 rounded-2xl text-left">
                <span className="text-stone-400 mt-0.5 select-none">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <p className="text-[11px] text-[#7A7572] leading-normal font-light">
                  <strong className="text-[#2C2A29] font-medium">Protected Route Notice</strong> — Unauthenticated users will automatically redirect to <Link href="/login?intent=register-venue" className="text-[#D96B43] hover:underline font-medium">/login?intent=register-venue</Link> in the production build.
                </p>
              </div>

              {/* Title & Description */}
              <h2 className="text-2xl font-semibold tracking-tight text-[#2C2A29] text-center">
                Register Venue
              </h2>
              <p className="mt-2 text-sm text-[#7A7572] font-light text-center">
                Let's set up your venue ordering profile on Milly.
              </p>

              {/* Form Fields */}
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="venueName" className="text-xs font-medium text-[#7A7572]">
                    Venue Name <span className="text-[#D96B43]">*</span>
                  </label>
                  <input
                    id="venueName"
                    type="text"
                    required
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    placeholder="e.g. The Terracotta Café"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF9F5] text-sm text-[#2C2A29] transition-all focus:border-[#D96B43] focus:ring-1 focus:ring-[#D96B43] outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="location" className="text-xs font-medium text-[#7A7572]">
                    Location <span className="text-[#D96B43]">*</span>
                  </label>
                  <input
                    id="location"
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. 123 Main St, New York"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF9F5] text-sm text-[#2C2A29] transition-all focus:border-[#D96B43] focus:ring-1 focus:ring-[#D96B43] outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="description" className="text-xs font-medium text-[#7A7572]">
                    Description <span className="text-stone-400 font-light">(optional)</span>
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your venue, e.g. menu styles, ambiance..."
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF9F5] text-sm text-[#2C2A29] transition-all focus:border-[#D96B43] focus:ring-1 focus:ring-[#D96B43] outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full py-3.5 rounded-xl bg-[#D96B43] text-white text-sm font-medium transition-all duration-300 hover:bg-[#C25832] hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-[#D96B43]/10"
                >
                  Create Venue
                </button>
              </form>
            </>
          ) : (
            /* Success Feedback Card State */
            <div className="flex flex-col items-center justify-center p-2 text-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500 border border-green-100">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#2C2A29]">Registration Successful!</h3>
                <p className="mt-2 text-xs text-[#7A7572] leading-relaxed font-light">
                  Your venue <strong className="font-medium text-[#2C2A29]">"{venueName}"</strong> at <strong className="font-medium text-[#2C2A29]">{location}</strong> has been registered.
                </p>

                <div className="mt-6 p-4 bg-[#FAF9F5] border border-stone-200/60 rounded-2xl text-left">
                  <span className="text-[10px] uppercase tracking-wider text-[#A69F9B] font-semibold block mb-1">
                    Redirection Model (Future)
                  </span>
                  <p className="text-[11px] text-[#7A7572] leading-relaxed font-light">
                    The authenticated user will become the <strong className="text-[#D96B43] font-medium">Manager</strong> of this venue and automatically redirect to:
                  </p>
                  <code className="block mt-2 p-2 bg-[#FAF2EE] rounded-xl text-[#D96B43] font-mono break-all text-[10px] border border-[#D96B43]/10">
                    /venue/mock-venue-id/staff
                  </code>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 w-full">
                <Link
                  href="/venue/mock-venue-id/staff"
                  className="w-full py-3 rounded-xl bg-[#D96B43] text-white text-xs font-medium transition-all duration-300 hover:bg-[#C25832] text-center"
                >
                  Go to Venue Staff Settings
                </Link>
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setVenueName("");
                    setLocation("");
                    setDescription("");
                  }}
                  className="text-xs font-light text-[#7A7572] hover:text-[#2C2A29] hover:underline"
                >
                  Register another venue
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Footer copyright */}
      <footer className="w-full max-w-7xl mx-auto py-4 text-center text-xs text-[#A69F9B] z-10 font-light">
        &copy; {new Date().getFullYear()} Milly. All rights reserved.
      </footer>
    </main>
  );
}
