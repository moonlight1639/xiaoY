import http from "./http";
export interface ResponsePublicUrl {
  success: boolean;
  errorMsg?: string;
  data?: string;//图片的公共访问URL
  total?: number;
}
//上传图片返回Url
export const uploadAvatar = (file: File , type : string): Promise<ResponsePublicUrl> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('path', `${type}/`); // 后端根据这个路径来区分存储位置
  return http.post("/upload", formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};