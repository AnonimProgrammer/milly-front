import type { ApiOrderStatus } from "@/modules/orders";

export type PublicTableResponse = {
  id: string;
  venueId: string;
  label: string;
  status: "ACTIVE" | "INACTIVE";
};

export type PublicMenuItemResponse = {
  id: string;
  venueId: string;
  name: string;
  description: string | null;
  price: number;
  approximatePreparationMinutes: number;
  status: "ACTIVE" | "DELETED";
  createdAt: string;
  updatedAt: string;
};

export type PublicOrderItemResponse = {
  id: string;
  menuItemId: string;
  quantity: number;
  unitPrice: number;
};

export type PublicOrderResponse = {
  id: string;
  tableId: string;
  status: ApiOrderStatus;
  items: PublicOrderItemResponse[];
  paidAmount: number;
  remaining: number;
  createdAt: string;
  approvedAt: string | null;
  estimatedPreparationMinutes: number | null;
  estimatedPreparationDisplay: string | null;
};

export type CreatePublicOrderRequest = {
  items: { menuItemId: string; quantity: number }[];
};

export type AddPublicOrderItemsRequest = CreatePublicOrderRequest;
