import http from './http'

/**
 * API 接口定义
 */

// 通用响应类型
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

// 示例：获取首页数据
export const homeApi = {
  // 获取首页信息
  getHomeInfo: () => http.get<ApiResponse>('/home/info'),
  
  // 获取公告列表
  getNotices: () => http.get<ApiResponse>('/home/notices'),
}

export default { homeApi }
