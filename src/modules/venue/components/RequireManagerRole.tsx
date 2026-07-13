"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AuthPageFallback } from "@/modules/auth";
import { staffPath } from "@/modules/staff";
import { canManageVenue } from "../utils/venueRole";
import { useVenueMembership } from "../context/VenueMembershipContext";

type RequireManagerRoleProps = {
  venueId: string;
  children: ReactNode;
};

export function RequireManagerRole({ venueId, children }: RequireManagerRoleProps) {
  const membership = useVenueMembership();
  const router = useRouter();
  const isManager = canManageVenue(membership.role);

  useEffect(() => {
    if (!isManager) {
      router.replace(staffPath(venueId, "orders"));
    }
  }, [isManager, venueId, router]);

  if (!isManager) {
    return <AuthPageFallback />;
  }

  return children;
}
