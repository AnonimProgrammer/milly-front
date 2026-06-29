import { CustomerTablePage } from "@/modules/customer";

type TableRouteProps = {
  params: Promise<{ tableId: string }>;
};

export default async function TableRoute({ params }: TableRouteProps) {
  const { tableId } = await params;

  return <CustomerTablePage tableId={tableId} />;
}
