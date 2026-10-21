import { useAuthStore } from '../store/authStore'
import type {
  ApiFoodItem,
  ApiOrder,
  AuthResponse,
  CreateOrderInput,
} from '../types'

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, '')

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!API_URL) {
    throw new Error('VITE_API_URL is not configured.')
  }

  const headers = new Headers(options.headers)
  headers.set('Content-Type', 'application/json')

  const token = useAuthStore.getState().token
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const payload: unknown = await response.json()
    const message =
      typeof payload === 'object' &&
      payload !== null &&
      'message' in payload &&
      typeof payload.message === 'string'
        ? payload.message
        : `API request failed: ${response.status}`
    throw new Error(message)
  }

  return response.json() as Promise<T>
}

export const registerAccount = (name: string, email: string, password: string) =>
  request<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })

export const loginAccount = (email: string, password: string) =>
  request<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

export const getFoodItems = () => request<ApiFoodItem[]>('/api/food-items')
export const getOrders = () => request<ApiOrder[]>('/api/orders')
export const getOrder = (id: string) => request<ApiOrder>(`/api/orders/${id}`)
export const createOrder = (order: CreateOrderInput) =>
  request<ApiOrder>('/api/orders', { method: 'POST', body: JSON.stringify(order) })
