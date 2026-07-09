export type ChatMessageTone = "user" | "assistant";

export type ChatMessage = {
  id: string;
  author: string;
  text: string;
  tone: ChatMessageTone;
};

export function createChatMessage(
  author: string,
  text: string,
  tone: ChatMessageTone,
): ChatMessage {
  return {
    id: crypto.randomUUID(),
    author,
    text,
    tone,
  };
}
