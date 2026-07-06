"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { ApiError, endUiActivity, isServiceUnavailable } from "@/modules/shared/api";
import { ServiceUnavailable } from "@/modules/shared/ui";
import { AuthPageFallback } from "@/modules/auth";
import { getVenueMembership } from "../api/venueApi";
import { VenueMembershipProvider } from "../context/VenueMembershipContext";

type RequireVenueMembershipProps = {
  venueId: string;
  children: ReactNode;
};

export function RequireVenueMembership({ venueId, children }: RequireVenueMembershipProps) {
  const [membership, setMembership] = useState<Awaited<ReturnType<typeof getVenueMembership>> | null>(
    null,
  );
  const [status, setStatus] = useState<"loading" | "ready" | "forbidden" | "unavailable">(
    "loading",
  );

  const loadMembership = useCallback(async () => {
    setStatus("loading");

    try {
      const data = await getVenueMembership(venueId);
      setMembership(data);
      setStatus("ready");
    } catch (error) {
      if (error instanceof ApiError && (error.status === 403 || error.status === 404)) {
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
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center">
        <h1 className="text-xl font-semibold text-black">Access denied</h1>
        <p className="mt-2 max-w-sm text-sm font-light text-zinc-500">
          You are not a member of this venue. Join a venue or pick one from your list.
        </p>
        <Link
          href="/join-venue"
          className="mt-6 rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
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
