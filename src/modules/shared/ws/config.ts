import { getApiBaseUrl } from "../api/config";

function toWebSocketOrigin(httpOrigin: string): string {
  return httpOrigin.replace(/^http/, "ws");
}

export function getWsBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_WS_URL;

  if (explicit !== undefined && explicit !== "") {
    return explicit.replace(/\/$/, "");
  }

  const apiUrl = getApiBaseUrl();

  if (apiUrl !== "") {
    return toWebSocketOrigin(apiUrl);
  }

  if (typeof window !== "undefined") {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    return `${protocol}//${window.location.host}`;
  }

  return "";
}

export function buildStaffWsUrl(ticketId: string): string {
  return `${getWsBaseUrl()}/ws?ticket=${encodeURIComponent(ticketId)}`;
}

export function venueStaffTopic(venueId: string): string {
  return `/topic/venue/${venueId}/staff`;
}
