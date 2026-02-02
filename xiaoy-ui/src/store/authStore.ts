import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {UserInfo} from '../types/UserInfo'
// 用户信息类型

// 认证状态类型
interface AuthState {
  user: UserInfo | null
  token: string | null
  isAuthenticated: boolean
  
  // Actions
  setUser: (user: UserInfo, token: string) => void
  logout: () => void
}

/**
 * 认证状态 Store
 * 使用 persist 中间件实现状态持久化
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setUser: (user : UserInfo | null, token: string | null) => {
        if (token) {
          localStorage.setItem('token', token)
        } else {
          localStorage.removeItem('token')
        }
        set({ user, token, isAuthenticated: !!token })
      },

      logout: () => {
        localStorage.removeItem('token')
        set({ user: null, token: null, isAuthenticated: false })
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)

export default useAuthStore
