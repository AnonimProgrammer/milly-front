import { redirect } from "next/navigation";
import { staffPath } from "@/modules/staff";

type StaffIndexRouteProps = {
  params: Promise<{ venueId: string }>;
};

export default async function StaffIndexRoute({ params }: StaffIndexRouteProps) {
  const { venueId } = await params;
  redirect(staffPath(venueId, "orders"));
}
