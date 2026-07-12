"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TableChatWsClient } from "./tableChatWsClient";
import type { ChatHistoryMessage, ChatMessageEvent } from "./types";

export function useTableChatWs(
  tableId: string,
  active: boolean,
  onMessage: (message: ChatMessageEvent) => void,
) {
  const onMessageRef = useRef(onMessage);
  const clientRef = useRef<TableChatWsClient | null>(null);
  const [connected, setConnected] = useState(false);
  const [latched, setLatched] = useState(false);

  useEffect(() => {
    onMessageRef.current = onMessage;
  });

  useEffect(() => {
    if (active) {
      setLatched(true);
    }
  }, [active]);

  useEffect(() => {
    if (!latched) {
      return;
    }

    const client = new TableChatWsClient({
      tableId,
      onMessage: (message) => {
        onMessageRef.current(message);
      },
      onConnectionChange: setConnected,
    });

    clientRef.current = client;
    client.connect();

    return () => {
      client.disconnect();
      clientRef.current = null;
      setConnected(false);
    };
  }, [tableId, latched]);

  const sendMessage = useCallback((text: string, history: ChatHistoryMessage[] = []) => {
    clientRef.current?.sendMessage(text, history);
  }, []);

  return { sendMessage, connected };
}
