import { apiRequest } from "../api";
import type { WsTicketResponse } from "./types";

export async function issueWsTicket(): Promise<WsTicketResponse> {
  return apiRequest<WsTicketResponse>("/api/v1/ws-ticket", {
    method: "POST",
    silent: true,
  });
}
