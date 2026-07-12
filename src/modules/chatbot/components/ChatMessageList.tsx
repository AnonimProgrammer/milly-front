import type { RefObject } from "react";
import type { ChatMessage } from "../types/chatMessage";
import { ChatMessageBubble } from "./ChatMessageBubble";

type ChatMessageListProps = {
  messages: ChatMessage[];
  containerRef: RefObject<HTMLDivElement | null>;
};

export function ChatMessageList({ messages, containerRef }: ChatMessageListProps) {
  return (
    <div ref={containerRef} className="min-h-0 flex-1 overflow-y-auto bg-muted px-4 py-4">
      {messages.length === 0 ? (
        <p className="text-sm text-muted-foreground">Send a message to chat with Milly.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((message) => (
            <ChatMessageBubble key={message.id} message={message} />
          ))}
        </div>
      )}
    </div>
  );
}
