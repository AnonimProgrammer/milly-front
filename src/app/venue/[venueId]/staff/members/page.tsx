import { MembersStaffPage } from "@/modules/staff";
import { RequireManagerRole } from "@/modules/venue";

type MembersStaffRouteProps = {
  params: Promise<{ venueId: string }>;
};

export default async function MembersStaffRoute({ params }: MembersStaffRouteProps) {
  const { venueId } = await params;

  return (
    <RequireManagerRole venueId={venueId}>
      <MembersStaffPage venueId={venueId} />
    </RequireManagerRole>
  );
}
