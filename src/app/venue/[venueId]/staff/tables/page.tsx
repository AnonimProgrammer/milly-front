import { TablesStaffPage } from "@/modules/tables";
import { RequireManagerRole } from "@/modules/venue";

type TablesStaffRouteProps = {
  params: Promise<{ venueId: string }>;
};

export default async function TablesStaffRoute({ params }: TablesStaffRouteProps) {
  const { venueId } = await params;

  return (
    <RequireManagerRole venueId={venueId}>
      <TablesStaffPage venueId={venueId} />
    </RequireManagerRole>
  );
}
