import { RequireAuth } from "@/modules/auth";
import { StaffPortalPage } from "@/modules/staff";

type StaffRouteProps = {
  params: Promise<{ venueId: string }>;
};

export default async function StaffRoute({ params }: StaffRouteProps) {
  const { venueId } = await params;

  return (
    <RequireAuth>
      <StaffPortalPage venueId={venueId} />
    </RequireAuth>
  );
}
