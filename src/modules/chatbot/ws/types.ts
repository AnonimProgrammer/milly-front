export type ChatMessageType = "WELCOME";

export type ChatMessageEvent = {
  type: ChatMessageType;
  text: string;
};
