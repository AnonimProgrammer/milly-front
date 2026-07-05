import type { ReactNode } from "react";
import { RequireAuth } from "@/modules/auth";
import { RequireVenueMembership } from "@/modules/venue/components/RequireVenueMembership";
import { StaffLayout } from "@/modules/staff/components/StaffLayout";

type StaffLayoutRouteProps = {
  children: ReactNode;
  params: Promise<{ venueId: string }>;
};

export default async function StaffLayoutRoute({ children, params }: StaffLayoutRouteProps) {
  const { venueId } = await params;
  const loginIntent = `staff:${venueId}`;

  return (
    <RequireAuth loginIntent={loginIntent}>
      <RequireVenueMembership venueId={venueId}>
        <StaffLayout venueId={venueId}>{children}</StaffLayout>
      </RequireVenueMembership>
    </RequireAuth>
  );
}
