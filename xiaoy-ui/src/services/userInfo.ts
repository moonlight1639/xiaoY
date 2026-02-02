import http from "./http";
import type { UserInfo } from "../types/UserInfo";

export interface ResponseUserInfo {
  success: boolean;
  errorMsg?: string;
  data?: UserInfo;
  total?: number;
}


export const getUserInfo = (): Promise<ResponseUserInfo> => {
  return http.get("/userinfo/1");
};