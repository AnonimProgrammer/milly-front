"use client";

import { useState } from "react";
import Link from "next/link";

interface VenueMock {
  id: string;
  name: string;
  role: "Manager" | "Waiter";
}

const INITIAL_MOCK_VENUES: VenueMock[] = [
  { id: "terracotta-cafe", name: "The Terracotta Café", role: "Manager" },
  { id: "le-bistrot", name: "Le Bistrot Parisien", role: "Waiter" },
  { id: "sage-salt", name: "Sage & Salt Eatery", role: "Waiter" },
];

export function JoinVenuePage() {
  const [venues, setVenues] = useState<VenueMock[]>(INITIAL_MOCK_VENUES);
  const [inviteCode, setInviteCode] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [joinedVenueName, setJoinedVenueName] = useState("");
  const [showEmptyState, setShowEmptyState] = useState(false);

  const handleToggleState = () => {
    setShowEmptyState(!showEmptyState);
  };

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteCode.trim()) {
      const mockName = inviteCode.includes("http") 
        ? "New Invited Restaurant" 
        : `Venue #${inviteCode.toUpperCase()}`;
      setJoinedVenueName(mockName);
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

      {/* Centered Cards Container */}
      <div className="flex-1 flex flex-col items-center justify-center py-8 z-10 w-full max-w-md mx-auto gap-6">
        
        {/* Protected Route Info Banner */}
        <div className="w-full flex gap-2 p-3 bg-stone-50 border border-stone-200/50 rounded-2xl text-left shadow-sm bg-white/40 backdrop-blur-sm">
          <span className="text-stone-400 mt-0.5 select-none">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </span>
          <p className="text-[11px] text-[#7A7572] leading-normal font-light">
            <strong className="text-[#2C2A29] font-medium">Protected Route</strong> — Requires login. Unauthenticated requests will redirect to <Link href="/login?intent=join-venue" className="text-[#D96B43] hover:underline font-medium">/login?intent=join-venue</Link>.
          </p>
        </div>

        {/* SECTION 1: My Venues */}
        <div className="w-full bg-white border border-stone-200/60 rounded-3xl p-6 sm:p-8 shadow-xl shadow-stone-200/50 flex flex-col relative">
          {/* State Toggle for audit convenience */}
          <button 
            onClick={handleToggleState}
            className="absolute top-4 right-4 text-[10px] text-[#A69F9B] hover:text-[#D96B43] transition-colors border border-stone-200 bg-stone-50 hover:bg-[#FAF2EE] px-2 py-0.5 rounded-md font-light cursor-pointer select-none"
            title="Toggle empty state view"
          >
            {showEmptyState ? "Show List" : "Show Empty State"}
          </button>

          <h2 className="text-lg font-semibold tracking-tight text-[#2C2A29] mb-4">
            My Venues
          </h2>

          {!showEmptyState ? (
            <div className="flex flex-col gap-2.5">
              {venues.map((venue) => (
                <div 
                  key={venue.id} 
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-stone-100 bg-[#FAF9F5]/40 hover:bg-[#FAF2EE]/30 hover:border-[#D96B43]/20 transition-all duration-300 group"
                >
                  <span className="text-sm font-medium text-[#2C2A29] group-hover:text-[#D96B43] transition-colors">
                    {venue.name}
                  </span>
                  
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${
                    venue.role === "Manager" 
                      ? "bg-[#FAF2EE] text-[#D96B43] border border-[#D96B43]/20" 
                      : "bg-stone-100 text-stone-600 border border-stone-200"
                  }`}>
                    {venue.role}
                  </span>
                </div>
              ))}
              <span className="text-[10px] text-center text-[#A69F9B] mt-2 font-light">
                Clicking a venue redirects to staff dashboard in production.
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <span className="text-stone-300 mb-2">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </span>
              <p className="text-sm text-[#7A7572] font-light">
                You haven't joined any venues yet.
              </p>
            </div>
          )}
        </div>

        {/* SECTION 2: Join New Venue */}
        <div className="w-full bg-white border border-stone-200/60 rounded-3xl p-6 sm:p-8 shadow-xl shadow-stone-200/50 flex flex-col">
          
          {!isSuccess ? (
            <>
              <h2 className="text-lg font-semibold tracking-tight text-[#2C2A29] mb-1">
                Join a Venue
              </h2>
              <p className="text-xs text-[#7A7572] font-light mb-5">
                Paste an invitation link or code from your manager.
              </p>

              <form onSubmit={handleRedeem} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <input
                    id="inviteCode"
                    type="text"
                    required
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    placeholder="e.g. milly.app/join/cafe-123 or CODE99"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FAF9F5] text-sm text-[#2C2A29] transition-all focus:border-[#D96B43] focus:ring-1 focus:ring-[#D96B43] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#D96B43] text-white text-xs font-medium transition-all duration-300 hover:bg-[#C25832] hover:scale-[1.01] active:scale-[0.99]"
                >
                  Confirm Invite
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-2 text-center gap-4">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-500 border border-green-100">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#2C2A29]">Invite Confirmed!</h3>
                <p className="mt-1 text-xs text-[#7A7572] leading-relaxed font-light">
                  Successfully redeemed invite for <strong className="font-medium text-[#2C2A29]">"{joinedVenueName}"</strong>.
                </p>

                <div className="mt-4 p-3 bg-[#FAF9F5] border border-stone-200/60 rounded-xl text-left">
                  <span className="text-[9px] uppercase tracking-wider text-[#A69F9B] font-semibold block mb-0.5">
                    Redirection Model (Future)
                  </span>
                  <p className="text-[10px] text-[#7A7572] leading-relaxed font-light">
                    The client will be redirected to the venue staff dashboard:
                  </p>
                  <code className="block mt-1.5 p-1.5 bg-[#FAF2EE] rounded-lg text-[#D96B43] font-mono break-all text-[9px] border border-[#D96B43]/10">
                    /venue/mock-invite-venue-id/staff
                  </code>
                </div>
              </div>

              <div className="mt-3 flex flex-col gap-2 w-full">
                <Link
                  href="/venue/mock-invite-venue-id/staff"
                  className="w-full py-2.5 rounded-xl bg-[#D96B43] text-white text-xs font-medium transition-all duration-300 hover:bg-[#C25832] text-center"
                >
                  Go to Venue Settings
                </Link>
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setInviteCode("");
                  }}
                  className="text-xs font-light text-[#7A7572] hover:text-[#2C2A29] hover:underline"
                >
                  Enter another invite
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
