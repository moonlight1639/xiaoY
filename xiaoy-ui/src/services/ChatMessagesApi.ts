import http from './http'
import type { ChatMessage ,ChatForm ,SingleChatMessage , ChatMessageList , ChatMessageTitle } from '../types';


export interface ResponseSingleChatMessage{
  success: boolean;
  errorMsg?: string;
  data?: ChatMessage;
  total?: number;
}

export interface ResponseSingleChatMessageList{
  success: boolean;
  errorMsg?: string;
  data?: ChatMessageList;
  total?: number;
}
export interface ResponseSingleChatMessageTitle{
  success: boolean;
  errorMsg?: string;
  data?: ChatMessageTitle[];
  total?: number;
}
const baseUrl = '/chatmessagebyuser';
export const xiaoY_chat = (chatForm: ChatForm):Promise<ResponseSingleChatMessage> =>
    http.post(`${baseUrl}/xiaoY_chat`, chatForm)


export const getList =  ():Promise<ResponseSingleChatMessageTitle> =>
    http.get(`${baseUrl}/list`)

export const getMessages = (memoryId: string):Promise<ResponseSingleChatMessageList> =>
    http.get(`${baseUrl}/getmessages/${memoryId}`)


