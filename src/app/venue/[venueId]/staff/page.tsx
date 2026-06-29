import { StaffPortalPage } from "@/modules/staff";

type StaffRouteProps = {
  params: Promise<{ venueId: string }>;
};

export default async function StaffRoute({ params }: StaffRouteProps) {
  const { venueId } = await params;

  return <StaffPortalPage venueId={venueId} />;
}
