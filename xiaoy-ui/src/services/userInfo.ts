import http from "./http";
import type { UserInfo , updateUserInfoParams} from "../types/UserInfo";

export interface ResponseUserInfo {
  success: boolean;
  errorMsg?: string;
  data?: UserInfo;
  total?: number;
}

export interface ResponseUserInfoList {
  success: boolean;
  errorMsg?: string;
  data?: UserInfo[];
  total?: number;
}

export const getUserInfo = (): Promise<ResponseUserInfo> => {
  return http.get("/userinfo/1");
};
export const getUserInfoList = (pageNum?: number, pageSize?: number): Promise<ResponseUserInfoList> => {
  return http.get("/userinfo/list", {
    params: {
      pageNum,
      pageSize,
    },
  });
};

export const updateUserInfo = (userinfo:updateUserInfoParams): Promise<ResponseUserInfoList> => {
  return http.put("/userinfo/update", userinfo);
};

