import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ApiUser } from '../types'

export type UserRole = ApiUser['role']

export interface AuthState {
  token: string | null
  user: ApiUser | null
  login: (token: string, user: ApiUser) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(persist((set) => ({
  token: null,
  user: null,
  login: (token: string, user: ApiUser) => {
    set({ token, user })
  },
  logout: () => {
    set({ token: null, user: null })
  },
}), {
  name: 'campus-food-auth-v2',
  partialize: (state) => ({ token: state.token, user: state.user }),
}))
