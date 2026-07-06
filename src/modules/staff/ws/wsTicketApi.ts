import { apiRequest } from "@/modules/shared/api";
import type { WsTicketResponse } from "@/modules/shared/ws";

export async function issueWsTicket(): Promise<WsTicketResponse> {
  return apiRequest<WsTicketResponse>("/api/v1/ws-ticket", {
    method: "POST",
    silent: true,
  });
}
