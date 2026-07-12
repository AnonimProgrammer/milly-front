export type ChatMessageRole = "user" | "assistant";

export type ChatHistoryMessage = {
  role: ChatMessageRole;
  content: string;
};

export type ChatMessageType = "WELCOME" | "ASSISTANT_REPLY" | "ERROR";

export type ChatMessageEvent = {
  type: ChatMessageType;
  text: string;
};
