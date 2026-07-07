"use client";

import { useEffect, useState } from "react";
import { showToast } from "@/modules/shared/feedback";
import { createVenueInvitation } from "@/modules/venue/api/invitationApi";
import type { VenueRole } from "@/modules/venue";

type InviteMemberModalProps = {
  venueId: string;
  onClose: () => void;
};

export function InviteMemberModal({ venueId, onClose }: InviteMemberModalProps) {
  const [role, setRole] = useState<VenueRole>("WAITER");
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleGenerateUrl = async () => {
    setIsGenerating(true);
    setIsCopied(false);

    try {
      const response = await createVenueInvitation(venueId, { role });
      setInviteUrl(response.inviteUrl);
    } catch {
      // Error toast is handled by the API client.
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyLink = async () => {
    if (!inviteUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(inviteUrl);
      setIsCopied(true);
      showToast("Invite link copied to clipboard.", "success");
    } catch {
      showToast("Could not copy the link. Please copy it manually.", "error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="invite-member-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 id="invite-member-title" className="text-xl font-bold text-black">
          Invite new member
        </h3>

        <div className="mt-6 space-y-2">
          <label htmlFor="invite-role" className="text-sm font-medium text-black">
            Role
          </label>
          <select
            id="invite-role"
            value={role}
            onChange={(event) => {
              setRole(event.target.value as VenueRole);
              setInviteUrl(null);
              setIsCopied(false);
            }}
            disabled={isGenerating}
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-black outline-none transition-colors focus:border-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="WAITER">Waiter</option>
            <option value="MANAGER">Manager</option>
          </select>
        </div>

        {inviteUrl ? (
          <div className="mt-6 space-y-3">
            <div className="rounded-2xl border border-black/8 bg-black/[0.02] p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/5 text-black">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.172 13.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-black">Invite link ready</p>
                  <p className="mt-1 text-xs font-light text-zinc-500">
                    Share this link with your new team member.
                  </p>
                  <p className="mt-3 break-all rounded-xl border border-black/8 bg-white px-3 py-2.5 font-mono text-xs leading-relaxed text-zinc-600">
                    {inviteUrl}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyLink}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-black/10 bg-black/[0.03] px-4 py-3 text-sm font-medium text-black transition-all hover:border-black/20 hover:bg-black/[0.06] active:scale-[0.99]"
            >
              {isCopied ? (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy link
                </>
              )}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleGenerateUrl}
            disabled={isGenerating}
            className="mt-6 w-full cursor-pointer rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isGenerating ? "Generating..." : "Generate URL"}
          </button>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full cursor-pointer rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-black transition-all hover:border-zinc-300 hover:bg-zinc-50 active:scale-[0.99]"
        >
          Close
        </button>
      </div>
    </div>
  );
}
