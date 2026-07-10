import { Client, type IMessage } from "@stomp/stompjs";
import { buildCustomerWsUrl } from "@/modules/shared/ws";
import { tableChatSendDestination, tableChatTopic } from "./config";
import type { ChatMessageEvent } from "./types";

const RECONNECT_DELAY_MS = 1_500;

export type TableChatWsClientOptions = {
  tableId: string;
  onMessage: (message: ChatMessageEvent) => void;
  onConnectionChange?: (connected: boolean) => void;
};

export class TableChatWsClient {
  private client: Client | null = null;

  private disposed = false;

  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private readonly options: TableChatWsClientOptions) {}

  connect(): void {
    this.openConnection();
  }

  disconnect(): void {
    this.disposed = true;
    this.clearReconnectTimer();
    this.deactivateClient();
    this.options.onConnectionChange?.(false);
  }

  sendMessage(text: string): void {
    if (this.client === null || !this.client.connected) {
      return;
    }

    this.client.publish({
      destination: tableChatSendDestination(this.options.tableId),
      body: JSON.stringify({ text }),
    });
  }

  private openConnection(): void {
    if (this.disposed) {
      return;
    }

    const client = new Client({
      brokerURL: buildCustomerWsUrl(),
      reconnectDelay: 0,
      onConnect: () => {
        this.options.onConnectionChange?.(true);
        client.subscribe(tableChatTopic(this.options.tableId), (message: IMessage) => {
          this.options.onMessage(JSON.parse(message.body) as ChatMessageEvent);
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
    this.options.onConnectionChange?.(false);

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
