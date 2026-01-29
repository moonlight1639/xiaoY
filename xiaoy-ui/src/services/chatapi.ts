import http from './http'

export interface SendMessageParams {
  memoryId: number;
  message: string;
}

export const chatApi = {
  sendMessage: ({ memoryId, message }: SendMessageParams) =>
    http.post('/chat', { memoryId, message }),
}

export default chatApi 