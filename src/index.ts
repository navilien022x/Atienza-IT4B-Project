import type {

  User,

  FoodItem,

  Order,

  ApiResponse,

  FoodItemUpdate,

  FoodPreview,

  PublicUser,

  OrderStatusCount

} from "./types";


import {

  OrderStatus,

  getFirst,

  getById,

  createOrder

} from "./types";



// ================================
// USERS
// ================================


const users: User[] = [

  {

    id: 1,

    name: "Neil Atienza",

    email: "neil@gmail.com",

    role: "student",

    isActive: true

  },


  {

    id: 2,

    name: "Campus Food Admin",

    email: "admin@campusfood.com",

    role: "vendor_admin",

    isActive: true

  }

];



// ================================
// FOOD MENU
// ================================


const foodItems: FoodItem[] = [

  {

    id: 1,

    name: "Chicken Rice Meal",

    description: "Grilled chicken with rice and vegetables",

    price: 85,

    category: "Meals",

    available: true

  },


  {

    id: 2,

    name: "Milk Tea",

    description: "Classic milk tea with pearls",

    price: 75,

    category: "Drinks",

    available: true

  }

];



// ================================
// CUSTOMER ORDER
// ================================


const order: Order = {

  id: 101,

  userId: 1,

  foodItemIds: [

    1,

    2

  ],

  totalAmount: 160,

  status: OrderStatus.Placed,

  createdAt: new Date()

};



// ================================
// DISPLAY APPLICATION DATA
// ================================


console.log(
  "=== CAMPUS FOOD PRE-ORDER SYSTEM ==="
);



console.log(
  "\nUSERS"
);


console.log(
  JSON.stringify(users, null, 2)
);



console.log(
  "\nFOOD MENU"
);


console.log(
  JSON.stringify(foodItems, null, 2)
);



console.log(
  "\nCUSTOMER ORDER"
);


console.log(
  JSON.stringify(order, null, 2)
);



// ================================
// ORDER STATUS LIFECYCLE
// ================================


console.log(
  "\nORDER STATUS"
);



console.log(
`Order ID: #${order.id}
Status: ${OrderStatus[order.status]}`
);



order.status = OrderStatus.Preparing;



console.log(
`Order ID: #${order.id}
Status: ${OrderStatus[order.status]}`
);



order.status = OrderStatus.ReadyForPickup;



console.log(
`Order ID: #${order.id}
Status: ${OrderStatus[order.status]}`
);


// ================================
// GT1 REQUIREMENTS
// ================================


// Generic Functions

const firstFood =
getFirst(foodItems);


const selectedFood =
getById(foodItems, 1);



// Partial

const updateFood: FoodItemUpdate = {

  price: 90

};



// Pick

const foodPreview: FoodPreview = {

  id: 1,

  name: "Chicken Rice Meal",

  price: 85

};


// Omit

const publicUser: PublicUser = {

  id: 1,

  name: "Neil Atienza",

  role: "student",

  isActive: true

};



// Record

const orderCount: OrderStatusCount = {

  placed: 1,

  preparing: 1,

  ready: 1

};



// ReturnType

const newOrder =
createOrder(
  1,
  [1,2]
);



// ApiResponse<T>

const response: ApiResponse<Order> = {

  success: true,

  data: order,

  message: "Order processed successfully"

};


console.log(
  "\n=== Activity Requirements - GT1 Part 2 ==="
);

console.log({ firstFood, selectedFood, newOrder, response });

console.log(
  "\n=== Partial ==="
);
console.log(updateFood);

console.log(
  "\n=== Pick ==="
);
console.log(foodPreview);

console.log(
  "\n=== Omit==="
);
console.log(publicUser);

console.log(
  "\n=== Record ==="
);
console.log(orderCount);