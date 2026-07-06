import { Client } from "@stomp/stompjs";
import { ApiError } from "@/modules/shared/api";
import { buildStaffWsUrl, venueStaffTopic } from "@/modules/shared/ws";

const RECONNECT_DELAY_MS = 1_500;

export type StaffVenueWsClientOptions = {
  venueId: string;
  fetchTicket: () => Promise<string>;
  onOrderEvent: () => void;
  onUnauthorized: () => void;
};

export class StaffVenueWsClient {
  private client: Client | null = null;

  private disposed = false;

  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private readonly options: StaffVenueWsClientOptions) {}

  connect(): void {
    void this.openConnection();
  }

  disconnect(): void {
    this.disposed = true;
    this.clearReconnectTimer();
    this.deactivateClient();
  }

  private async openConnection(): Promise<void> {
    if (this.disposed) {
      return;
    }

    try {
      const ticketId = await this.options.fetchTicket();

      if (this.disposed) {
        return;
      }

      const client = new Client({
        brokerURL: buildStaffWsUrl(ticketId),
        reconnectDelay: 0,
        onConnect: () => {
          client.subscribe(venueStaffTopic(this.options.venueId), () => {
            this.options.onOrderEvent();
          });
        },
        onWebSocketClose: () => {
          this.handleDisconnect();
        },
        onStompError: () => {
          this.handleDisconnect();
        },
      });

      this.deactivateClient();
      this.client = client;
      client.activate();
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        this.options.onUnauthorized();
        return;
      }

      this.scheduleReconnect();
    }
  }

  private handleDisconnect(): void {
    if (this.disposed) {
      return;
    }

    this.deactivateClient();
    this.scheduleReconnect();
  }

  private scheduleReconnect(): void {
    if (this.disposed) {
      return;
    }

    this.clearReconnectTimer();
    this.reconnectTimer = setTimeout(() => {
      void this.openConnection();
    }, RECONNECT_DELAY_MS);
  }

  private clearReconnectTimer(): void {
    if (this.reconnectTimer !== null) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  private deactivateClient(): void {
    if (this.client === null) {
      return;
    }

    const activeClient = this.client;
    this.client = null;
    void activeClient.deactivate();
  }
}
