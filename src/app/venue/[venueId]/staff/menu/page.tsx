import { MenuStaffPage } from "@/modules/menu";
import { RequireManagerRole } from "@/modules/venue/components/RequireManagerRole";

type MenuStaffRouteProps = {
  params: Promise<{ venueId: string }>;
};

export default async function MenuStaffRoute({ params }: MenuStaffRouteProps) {
  const { venueId } = await params;

  return (
    <RequireManagerRole venueId={venueId}>
      <MenuStaffPage venueId={venueId} />
    </RequireManagerRole>
  );
}
