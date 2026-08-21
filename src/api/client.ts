import type { ApiFoodItem, ApiOrder, ApiUser, CreateOrderInput } from '../types'

const API_URL = 'http://localhost:3001'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!response.ok) throw new Error(`API request failed: ${response.status}`)
  return response.json() as Promise<T>
}

export const getFoodItems = () => request<ApiFoodItem[]>('/foodItems')
export const getUsers = () => request<ApiUser[]>('/users')
export const getOrders = () => request<ApiOrder[]>('/orders')
export const getOrder = (id: string) => request<ApiOrder>(`/orders/${id}`)
export const createOrder = (order: CreateOrderInput) =>
  request<ApiOrder>('/orders', { method: 'POST', body: JSON.stringify(order) })