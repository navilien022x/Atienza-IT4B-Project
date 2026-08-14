import { create } from 'zustand'

export type UserRole = 'student' | 'vendor'

export interface AuthState {
  token: string | null
  role: UserRole | null
  login: (token: string, role: UserRole) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('authToken'),
  role: (localStorage.getItem('userRole') as UserRole) || null,
  login: (token: string, role: UserRole) => {
    localStorage.setItem('authToken', token)
    localStorage.setItem('userRole', role)
    set({ token, role })
  },
  logout: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userRole')
    set({ token: null, role: null })
  },
}))
