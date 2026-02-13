export interface ChatMessageTitle {
    memoryId: string;
    title: string;
    createTime : string;
}

export interface SingleChatMessage {
    type: 'user' | 'assistant';
    content: string;
    createTime: string;
}
export interface ChatMessageList {
    memoryId: string;
    title: string;
    messages: SingleChatMessage[];
    createTime: string;
}

export interface ChatMessage {
    memoryId: string;
    title: string;
    type: 'user' | 'assistant';
    content: string;
    createTime: string;
}

export interface ChatForm {
  memoryId?: string;
  content: string;
}