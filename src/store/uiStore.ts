import { create } from 'zustand'

export interface UiState {
  isDark: boolean
  toggleDark: () => void
}

export const useUiStore = create<UiState>((set) => ({
  isDark: false,
  toggleDark: () => set((state) => ({ isDark: !state.isDark })),
}))