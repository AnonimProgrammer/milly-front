"use client";

import { useCallback, useEffect, useRef, useState, type SubmitEvent } from "react";
import { MAX_CHAT_MESSAGES } from "../constants";
import { createChatMessage, type ChatMessage } from "../types/chatMessage";
import { useTableChatWs } from "../ws";
import type { ChatMessageEvent } from "../ws";

export function useChatConversation(tableId: string, active: boolean) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const limitReached = messages.length >= MAX_CHAT_MESSAGES;

  useEffect(() => {
    setMessages([]);
    setDraft("");
  }, [tableId]);

  const handleIncomingMessage = useCallback((event: ChatMessageEvent) => {
    if (!event.text) {
      return;
    }

    setMessages((current) => [
      ...current,
      createChatMessage("Milly AI", event.text, "assistant"),
    ]);
  }, []);

  const { sendMessage, connected } = useTableChatWs(tableId, active, handleIncomingMessage);

  useEffect(() => {
    if (!active) {
      return;
    }

    const container = messagesContainerRef.current;
    if (container === null) {
      return;
    }

    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [messages, active]);

  const submitDraft = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (limitReached) {
      return;
    }

    const text = draft.trim();
    if (text === "") {
      return;
    }

    const history = messages.map((message) => ({
      role: message.tone,
      content: message.text,
    }));

    setMessages((current) => {
      if (current.length >= MAX_CHAT_MESSAGES) {
        return current;
      }
      return [...current, createChatMessage("You", text, "user")];
    });
    sendMessage(text, history);
    setDraft("");
  };

  return {
    messages,
    draft,
    setDraft,
    connected,
    limitReached,
    messagesContainerRef,
    submitDraft,
  };
}
