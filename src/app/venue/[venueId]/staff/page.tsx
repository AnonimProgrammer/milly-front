import { redirect } from "next/navigation";
import { staffPath } from "@/modules/staff/utils/staffRoutes";

type StaffIndexRouteProps = {
  params: Promise<{ venueId: string }>;
};

export default async function StaffIndexRoute({ params }: StaffIndexRouteProps) {
  const { venueId } = await params;
  redirect(staffPath(venueId, "orders"));
}
