import http from './http'
import type {ChatForm} from '../types';
export const chatApi = {
  sendMessage: (chatForm: ChatForm):Promise<string> =>
    http.post('/chat', chatForm),
}

export default chatApi 