"use client";

import { useState, type SubmitEvent } from "react";
import { VenueCard } from "./VenueCard";

export function JoinVenueSection() {
  const [inviteCode, setInviteCode] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRedeem = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inviteCode.trim()) {
      setIsSuccess(true);
    }
  };

  return (
    <VenueCard>
      {!isSuccess ? (
        <>
          <h2 className="text-lg font-semibold tracking-tight text-black mb-1">Join a Venue</h2>
          <p className="text-xs text-zinc-600 font-light mb-5">
            Paste an invitation link or code from your manager.
          </p>

          <form onSubmit={handleRedeem} className="flex flex-col gap-3">
            <input
              id="inviteCode"
              type="text"
              required
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              placeholder="e.g. milly.app/join/cafe-123 or CODE99"
              className="w-full px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-sm text-black transition-all focus:border-black/30 focus:ring-1 focus:ring-black/20 outline-none"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-black text-white text-sm font-medium transition-all duration-300 hover:bg-zinc-800 hover:scale-[1.01] active:scale-[0.99]"
            >
              Confirm Invite
            </button>
          </form>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-2 text-center gap-4">
          <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center text-black border border-black/10">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div>
            <h3 className="text-base font-semibold text-black">Invite received</h3>
            <p className="mt-1 text-xs text-zinc-600 leading-relaxed font-light">
              Redeeming invitations will be available in a future update.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              setInviteCode("");
            }}
            className="text-xs font-light text-zinc-600 hover:text-black hover:underline"
          >
            Enter another invite
          </button>
        </div>
      )}
    </VenueCard>
  );
}
