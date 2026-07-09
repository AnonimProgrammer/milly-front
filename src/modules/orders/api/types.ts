export type ApiOrderStatus = "PENDING" | "APPROVED" | "REJECTED" | "CLOSED";

export type OrderItemResponse = {
  id: string;
  menuItemId: string;
  quantity: number;
  unitPrice: number;
};

export type StaffOrderResponse = {
  id: string;
  tableId: string;
  status: ApiOrderStatus;
  createdAt: string;
  updatedAt: string;
  closedAt: string | null;
  approvedAt: string | null;
  estimatedPreparationMinutes: number | null;
  estimatedPreparationDisplay: string | null;
  items: OrderItemResponse[];
  paidAmount: number;
  remaining: number;
};
