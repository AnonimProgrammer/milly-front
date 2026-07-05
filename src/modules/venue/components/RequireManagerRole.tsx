"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AuthPageFallback } from "@/modules/auth/components/AuthPageFallback";
import { staffPath } from "@/modules/staff/utils/staffRoutes";
import { useVenueMembership } from "../context/VenueMembershipContext";

type RequireManagerRoleProps = {
  venueId: string;
  children: ReactNode;
};

export function RequireManagerRole({ venueId, children }: RequireManagerRoleProps) {
  const membership = useVenueMembership();
  const router = useRouter();
  const isManager = membership.role === "MANAGER";

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
