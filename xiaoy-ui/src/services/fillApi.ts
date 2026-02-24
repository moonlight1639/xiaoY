import http from './http'

interface FillClassResponse {
    success: boolean;
    errorMsg?: string;
    data?: object;
    total?: number;
}
export const fillClassApi = {
  fillClass: (userContext: string,userClass: string , userClassVo : string):Promise<FillClassResponse> =>
    http.get('/fill/fillclass', {
        params: {
            userContext,
            userClass,
            userClassVo
        }

    }),
}

export default fillClassApi 