import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'student' | 'vendor'

export interface AuthState {
  token: string | null
  role: UserRole | null
  login: (token: string, role: UserRole) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(persist((set) => ({
  token: null,
  role: null,
  login: (token: string, role: UserRole) => {
    set({ token, role })
  },
  logout: () => {
    set({ token: null, role: null })
  },
}), {
  name: 'campus-food-auth',
  partialize: (state) => ({ token: state.token, role: state.role }),
}))
