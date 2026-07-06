"use client";

import { useEffect, useState } from "react";
import type { VenueRole } from "@/modules/venue";

type InviteMemberModalProps = {
  venueId: string;
  onClose: () => void;
};

function generateMockInviteUrl(venueId: string, role: VenueRole): string {
  const token = `inv-${role.toLowerCase()}-${Date.now().toString(36)}`;
  return `${typeof window !== "undefined" ? window.location.origin : ""}/join-venue?venue=${venueId}&token=${token}`;
}

export function InviteMemberModal({ venueId, onClose }: InviteMemberModalProps) {
  const [role, setRole] = useState<VenueRole>("WAITER");
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleGenerateUrl = () => {
    setInviteUrl(generateMockInviteUrl(venueId, role));
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
            }}
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-black outline-none transition-colors focus:border-black"
          >
            <option value="WAITER">Waiter</option>
            <option value="MANAGER">Manager</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleGenerateUrl}
          className="mt-6 w-full cursor-pointer rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          Generate URL
        </button>

        {inviteUrl ? (
          <div className="mt-4 space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">Invite link</p>
            <p className="break-all rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 font-mono text-xs text-zinc-600">
              {inviteUrl}
            </p>
          </div>
        ) : null}

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full cursor-pointer py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-black"
        >
          Close
        </button>
      </div>
    </div>
  );
}
