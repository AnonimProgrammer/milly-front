export type OrderEventType =
  | "ORDER_PLACED"
  | "ORDER_APPROVED"
  | "ORDER_REJECTED"
  | "ORDER_CLOSED"
  | "ORDER_UPDATED";

export type OrderEvent = {
  type: OrderEventType;
  orderId: string;
  venueId: string;
  tableId: string;
};

export type WsTicketResponse = {
  ticketId: string;
  expiresAt: string;
};
