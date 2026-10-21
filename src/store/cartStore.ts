import { create } from 'zustand'
import type { FoodItem } from '../types/index'

export interface CartItem extends FoodItem {
  quantity: number
}

export interface CartState {
  items: CartItem[]
  addToCart: (item: FoodItem, quantity: number) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (item: FoodItem, quantity: number) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id)
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i,
          ),
        }
      }
      return {
        items: [...state.items, { ...item, quantity }],
      }
    })
  },
  removeFromCart: (itemId: string) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== itemId),
    }))
  },
  updateQuantity: (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeFromCart(itemId)
      return
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.id === itemId ? { ...i, quantity } : i,
      ),
    }))
  },
  clearCart: () => {
    set({ items: [] })
  },
  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
  },
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  },
}))
