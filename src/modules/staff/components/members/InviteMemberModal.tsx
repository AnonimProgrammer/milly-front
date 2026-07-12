"use client";

import { useEffect } from "react";
import {
  inputField,
  modalOverlay,
  modalPanel,
  primaryButton,
  secondaryButton,
} from "@/modules/shared/theme/classNames";
import type { VenueRole } from "@/modules/venue";
import { useInviteMember } from "../../hooks/useInviteMember";
import { InviteLinkReady } from "./InviteLinkReady";

type InviteMemberModalProps = {
  venueId: string;
  onClose: () => void;
};

export function InviteMemberModal({ venueId, onClose }: InviteMemberModalProps) {
  const {
    role,
    inviteUrl,
    isGenerating,
    isCopied,
    handleRoleChange,
    handleGenerateUrl,
    handleCopyLink,
  } = useInviteMember(venueId);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className={modalOverlay} onClick={onClose} role="presentation">
      <div
        className={modalPanel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="invite-member-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 id="invite-member-title" className="text-xl font-bold text-foreground">
          Invite new member
        </h3>

        <div className="mt-6 space-y-2">
          <label htmlFor="invite-role" className="text-sm font-medium text-foreground">
            Role
          </label>
          <select
            id="invite-role"
            value={role}
            onChange={(event) => handleRoleChange(event.target.value as VenueRole)}
            disabled={isGenerating}
            className={inputField}
          >
            <option value="WAITER">Waiter</option>
            <option value="MANAGER">Manager</option>
          </select>
        </div>

        {inviteUrl ? (
          <InviteLinkReady inviteUrl={inviteUrl} isCopied={isCopied} onCopy={() => void handleCopyLink()} />
        ) : (
          <button
            type="button"
            onClick={() => void handleGenerateUrl()}
            disabled={isGenerating}
            className={`mt-6 w-full cursor-pointer rounded-xl px-4 py-3 text-sm font-medium ${primaryButton}`}
          >
            {isGenerating ? "Generating..." : "Generate URL"}
          </button>
        )}

        <button
          type="button"
          onClick={onClose}
          className={`mt-6 w-full cursor-pointer rounded-xl px-4 py-3 text-sm font-medium active:scale-[0.99] ${secondaryButton}`}
        >
          Close
        </button>
      </div>
    </div>
  );
}
