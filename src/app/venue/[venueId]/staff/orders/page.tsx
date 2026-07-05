import { OrdersStaffPage } from "@/modules/orders";

type OrdersStaffRouteProps = {
  params: Promise<{ venueId: string }>;
};

export default async function OrdersStaffRoute({ params }: OrdersStaffRouteProps) {
  const { venueId } = await params;
  return <OrdersStaffPage venueId={venueId} />;
}
