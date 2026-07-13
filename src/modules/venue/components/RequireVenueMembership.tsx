"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { ApiError, endUiActivity, isServiceUnavailable } from "@/modules/shared/api";
import { pageMain, primaryButton, textMuted } from "@/modules/shared/theme/classNames";
import { ServiceUnavailable } from "@/modules/shared/ui";
import { AuthPageFallback } from "@/modules/auth";
import { getVenueMembership } from "../api/venueApi";
import { VenueMembershipProvider } from "../context/VenueMembershipContext";

type RequireVenueMembershipProps = {
  venueId: string;
  children: ReactNode;
};

type ForbiddenReason = "not-member" | "blocked";

export function RequireVenueMembership({ venueId, children }: RequireVenueMembershipProps) {
  const [membership, setMembership] = useState<Awaited<ReturnType<typeof getVenueMembership>> | null>(
    null,
  );
  const [status, setStatus] = useState<"loading" | "ready" | "forbidden" | "unavailable">(
    "loading",
  );
  const [forbiddenReason, setForbiddenReason] = useState<ForbiddenReason>("not-member");

  const loadMembership = useCallback(async () => {
    setStatus("loading");

    try {
      const data = await getVenueMembership(venueId);
      setMembership(data);
      setStatus("ready");
    } catch (error) {
      if (error instanceof ApiError && error.status === 403) {
        setForbiddenReason(error.errorCode === "MEMBERSHIP_INACTIVE" ? "blocked" : "not-member");
        setStatus("forbidden");
        return;
      }

      if (error instanceof ApiError && error.status === 404) {
        setForbiddenReason("not-member");
        setStatus("forbidden");
        return;
      }

      if (isServiceUnavailable(error)) {
        setStatus("unavailable");
        return;
      }

      setStatus("unavailable");
    } finally {
      endUiActivity();
    }
  }, [venueId]);

  useEffect(() => {
    void loadMembership();
  }, [loadMembership]);

  if (status === "loading") {
    return <AuthPageFallback />;
  }

  if (status === "unavailable") {
    return <ServiceUnavailable fullPage onRetry={() => void loadMembership()} />;
  }

  if (status === "forbidden") {
    const isBlocked = forbiddenReason === "blocked";

    return (
      <main className={`flex min-h-screen flex-col items-center justify-center p-6 text-center ${pageMain}`}>
        <h1 className="text-xl font-semibold text-foreground">Access denied</h1>
        <p className={`mt-2 max-w-sm text-sm font-light ${textMuted}`}>
          {isBlocked
            ? "Your access to this venue has been blocked. Contact the venue owner or a manager if you think this is a mistake."
            : "You are not a member of this venue. Join a venue or pick one from your list."}
        </p>
        <Link
          href="/join-venue"
          className={`mt-6 rounded-full px-6 py-2.5 text-sm font-medium ${primaryButton}`}
        >
          Go to my venues
        </Link>
      </main>
    );
  }

  if (!membership) {
    return null;
  }

  return <VenueMembershipProvider membership={membership}>{children}</VenueMembershipProvider>;
}
