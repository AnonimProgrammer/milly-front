"use client";

import { useState } from "react";
import { showToast } from "@/modules/shared/feedback";
import type { VenueRole } from "@/modules/venue";
import { createVenueInvitation } from "@/modules/venue/api/invitationApi";

export function useInviteMember(venueId: string) {
  const [role, setRole] = useState<VenueRole>("WAITER");
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleRoleChange = (nextRole: VenueRole) => {
    setRole(nextRole);
    setInviteUrl(null);
    setIsCopied(false);
  };

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

  return {
    role,
    inviteUrl,
    isGenerating,
    isCopied,
    handleRoleChange,
    handleGenerateUrl,
    handleCopyLink,
  };
}
