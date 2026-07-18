// =====================================
// CAMPUS FOOD PRE-ORDER SYSTEM
// =====================================


// ====================================
// CORE ENTITIES FOR THE APPLICATION
// ====================================


export interface User {

  id: number;

  name: string;

  email: string;

  role: "student" | "vendor_admin";

  isActive: boolean;

}



export interface FoodItem {

  id: number;

  name: string;

  description: string;

  price: number;

  category: string;

  available: boolean;

}



export interface Order {

  id: number;

  userId: number;

  foodItemIds: number[];

  totalAmount: number;

  status: OrderStatus;

  createdAt: Date;

}



// ================================
// ENUM
// ================================


export enum OrderStatus {

  Placed,

  Preparing,

  ReadyForPickup

}



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
  userId: number,
  foodItemIds: number[]
) {

  return {

    id: Date.now(),

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



export function getById<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {

  return items.find(
    item => item.id === id
  );

}