// =====================================
// CAMPUS FOOD PRE-ORDER SYSTEM
// =====================================


// ====================================
// CORE ENTITIES FOR THE APPLICATION
// ====================================


export interface User {

  id: string;

  name: string;

  email: string;

  role: "student" | "vendor_admin";

  isActive: boolean;

}



export interface FoodItem {

  id: string;

  name: string;

  description: string;

  price: number;

  category: string;

  available: boolean;

}



export interface Order {

  id: string;

  userId: string;

  foodItemIds: string[];

  totalAmount: number;

  status: OrderStatus;

  createdAt: Date;
  notes?: string;

}



// ================================
// ENUM
// ================================


export type OrderStatus = 0 | 1 | 2

export const OrderStatus = {
  Placed: 0,
  Preparing: 1,
  ReadyForPickup: 2,
  0: 'Placed',
  1: 'Preparing',
  2: 'ReadyForPickup',
} as const



// ================================
// GENERIC INTERFACE
// ================================


export interface ApiResponse<T> {

  success: boolean;

  data: T;

  message?: string;

}



// ================================
// UTILITY TYPES
// ================================


// Partial

export type FoodItemUpdate =
Partial<FoodItem>;


// Pick

export type FoodPreview =
Pick<
  FoodItem,
  "id" | "name" | "price"
>;


// Omit

export type PublicUser =
Omit<
  User,
  "email"
>;


// Record

export type OrderStatusCount =
Record<
  "placed" | "preparing" | "ready",
  number
>;


// ReturnType

export function createOrder(
  userId: string,
  foodItemIds: string[]
) {

  return {

    id: Date.now().toString(),

    userId,

    foodItemIds,

    status: OrderStatus.Placed,

    createdAt: new Date()

  };

}


export type NewOrder =
ReturnType<typeof createOrder>;



// ================================
// GENERIC FUNCTIONS
// ================================


export function getFirst<T>(
  items: T[]
): T | undefined {

  return items[0];

}



export function getById<T extends { id: string | number }>(
  items: T[],
  id: T['id']
): T | undefined {

  return items.find(
    item => item.id === id
  );

}

export type ApiFoodItem = FoodItem
export type ApiUser = User
export type ApiOrder = Omit<Order, 'createdAt'> & { createdAt: string }
export type AuthResponse = { token: string; user: ApiUser }
export type CreateOrderInput = Pick<ApiOrder, 'foodItemIds' | 'totalAmount' | 'notes'>

export type AiReply = {
  summary: string
  recommendations: {
    name: string
    description: string
    category: 'quick' | 'balanced' | 'comfort'
  }[]
  tips: string[]
}