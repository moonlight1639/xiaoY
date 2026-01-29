import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 主题类型
export type Theme = 'light' | 'dark'

// 应用全局状态类型
interface AppState {
  // 主题
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  
  // 全局加载状态
  loading: boolean
  setLoading: (loading: boolean) => void
}

/**
 * 应用全局状态 Store（持久化）
 */
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
      
      loading: false,
      setLoading: (loading) => set({ loading })
    }),
    {
      name: 'app-storage'
    }
  )
)

export default useAppStore
