import { Client } from "@stomp/stompjs";
import { buildCustomerWsUrl, tableTopic } from "./config";

const RECONNECT_DELAY_MS = 1_500;

export type CustomerTableWsClientOptions = {
  tableId: string;
  onOrderEvent: () => void;
};

export class CustomerTableWsClient {
  private client: Client | null = null;

  private disposed = false;

  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private readonly options: CustomerTableWsClientOptions) {}

  connect(): void {
    this.openConnection();
  }

  disconnect(): void {
    this.disposed = true;
    this.clearReconnectTimer();
    this.deactivateClient();
  }

  private openConnection(): void {
    if (this.disposed) {
      return;
    }

    const client = new Client({
      brokerURL: buildCustomerWsUrl(),
      reconnectDelay: 0,
      onConnect: () => {
        client.subscribe(tableTopic(this.options.tableId), () => {
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
      this.openConnection();
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
