"use client";

import { useRouter } from "next/navigation";
import { useState, type SubmitEvent } from "react";
import { staffPath } from "@/modules/staff";
import { inputField, primaryButton, textMuted } from "@/modules/shared/theme/classNames";
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
        <h2 className="text-lg font-semibold tracking-tight text-foreground mb-1">Join a Venue</h2>
        <p className={`text-xs font-light mb-5 ${textMuted}`}>
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
            className={inputField}
          />

          {validationError ? (
            <p className="text-xs text-red-600 dark:text-red-400">{validationError}</p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:hover:scale-100 ${primaryButton}`}
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
