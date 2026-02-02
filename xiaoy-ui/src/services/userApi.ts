import http from "./http";
import type { User } from "../types/User";
import type { UserInfo } from "../types/UserInfo";
export interface ResponseUser {
  success: boolean;
  errorMsg?: string;
  data?: User;
  total?: number;
}
export interface ResponseUserInfo {
  success: boolean;
  errorMsg?: string;
  data?: UserInfo;
  total?: number;
}

export const registerApi = (user : User): Promise<ResponseUser> => {
  return http.post("/user/register" , user);
};

export const loginApi = (user : { username: string; password: string; }): Promise<ResponseUserInfo> => {
  return http.post("/user/login" , user);
}


