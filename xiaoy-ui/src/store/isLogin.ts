import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 用户信息类型

/**
 * 认证状态 Store
 * 使用 persist 中间件实现状态持久化
 */
export const useLoginStore = create()(
  persist(
    (set) => ({
      isLogin: false,
      setIsLogin: (status: boolean) => set({ isLogin: status })
    }),
    {
      name: 'isLogin'
    }
  )
)

export default useLoginStore
