import axios from 'axios'

/**
 * Axios 实例配置
 * 请求前缀为 /xiaozhi
 */
const http = axios.create({
  baseURL: 'http://localhost:8080/xiaoY',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 可以在这里添加 token 等认证信息
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    // console.log('响应数据:', response.data)
    return response.data
  },
  (error) => {
    // 统一错误处理
    const message = error.response?.data?.message || error.message || '请求失败'
    console.error('请求错误:', message)
    // return Promise.reject(error)
    return '服务器错误'
  }
)

export default http
