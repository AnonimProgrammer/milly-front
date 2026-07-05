import { TableClient } from "./TableClient";

type CustomerTablePageProps = {
  tableId: string;
};

export function CustomerTablePage({ tableId }: CustomerTablePageProps) {
  return <TableClient tableId={tableId} />;
}
