"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { VenueMembership } from "../api/types";

const VenueMembershipContext = createContext<VenueMembership | null>(null);

export function VenueMembershipProvider({
  membership,
  children,
}: {
  membership: VenueMembership;
  children: ReactNode;
}) {
  return (
    <VenueMembershipContext.Provider value={membership}>
      {children}
    </VenueMembershipContext.Provider>
  );
}

export function useVenueMembership(): VenueMembership {
  const membership = useContext(VenueMembershipContext);

  if (!membership) {
    throw new Error("useVenueMembership must be used within VenueMembershipProvider");
  }

  return membership;
}
