export function tableChatTopic(tableId: string): string {
  return `/topic/table/${tableId}/chat`;
}

export function tableChatSendDestination(tableId: string): string {
  return `/app/table/${tableId}/chat`;
}
