"use client";

import { useRouter } from "next/navigation";
import { useState, type SubmitEvent } from "react";
import { staffPath } from "@/modules/staff";
import { redeemVenueInvitation } from "../api/invitationApi";
import type { VenueMembership } from "../api/types";
import { parseInvitationToken } from "../utils/parseInvitationToken";
import { JoinVenueConfirmModal } from "./JoinVenueConfirmModal";
import { VenueCard } from "./VenueCard";

type JoinVenueSectionProps = {
  initialInviteCode?: string;
};

export function JoinVenueSection({ initialInviteCode = "" }: JoinVenueSectionProps) {
  const router = useRouter();
  const [inviteCode, setInviteCode] = useState(initialInviteCode);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redeemedMembership, setRedeemedMembership] = useState<VenueMembership | null>(null);

  const handleRedeem = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError(null);

    const token = parseInvitationToken(inviteCode);
    if (!token) {
      setValidationError("Enter a valid invitation link or token.");
      return;
    }

    setIsSubmitting(true);

    try {
      const membership = await redeemVenueInvitation({ token });
      setRedeemedMembership(membership);
    } catch {
      // Error toast is handled by the API client.
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmNavigation = () => {
    if (!redeemedMembership) {
      return;
    }

    router.push(staffPath(redeemedMembership.venueId, "orders"));
  };

  const handleDismissModal = () => {
    setRedeemedMembership(null);
    setInviteCode("");
  };

  return (
    <>
      <VenueCard>
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
            onChange={(e) => {
              setInviteCode(e.target.value);
              if (validationError) {
                setValidationError(null);
              }
            }}
            placeholder="e.g. milly.app/join-venue/invite/..."
            className="w-full px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-sm text-black transition-all focus:border-black/30 focus:ring-1 focus:ring-black/20 outline-none"
          />

          {validationError ? (
            <p className="text-xs text-red-600">{validationError}</p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-black text-white text-sm font-medium transition-all duration-300 hover:bg-zinc-800 hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            {isSubmitting ? "Confirming..." : "Confirm Invite"}
          </button>
        </form>
      </VenueCard>

      {redeemedMembership ? (
        <JoinVenueConfirmModal
          venueName={redeemedMembership.venueName}
          onConfirm={handleConfirmNavigation}
          onClose={handleDismissModal}
        />
      ) : null}
    </>
  );
}
