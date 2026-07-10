export type OrderStatus = "pending" | "approved" | "completed";

export type OrderItem = {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
};

export type OrderAddition = {
  id: string;
  items: OrderItem[];
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
};

export type Order = {
  id: string;
  tableId: string;
  tableLabel: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  approvedAt: Date | null;
  estimatedPreparationMinutes: number | null;
  estimatedPreparationDisplay: string | null;
  pendingAddition: OrderAddition | null;
  rejectedAdditions: OrderAddition[];
  paidAmount: number;
  remaining: number;
  totalTipAmount: number;
};
