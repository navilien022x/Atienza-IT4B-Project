# Campus Food Pre-Order System

## Project Concept

The Campus Food Pre-Order System is a TypeScript-based application designed to improve the food ordering experience within a campus environment.

The system allows students to browse available food items, place advance orders, and track their order status. Vendor administrators will be able to manage campus food offerings and monitor customer orders in the future.

This project serves as the foundation for future development using React and TypeScript.

## Core Features

- Student and vendor administrator roles
- Campus food menu management
- Food item listing and details
- Food pre-ordering system
- Order status tracking

## Main Entities

The application uses three core entities:

- **User** - represents students and vendor administrators
- **FoodItem** - represents available campus food products
- **Order** - represents student food orders and their status

## Order Status Lifecycle

Orders follow a multi-step process:

```
Placed
   ↓
Preparing
   ↓
ReadyForPickup
```

## Technologies Used

- TypeScript
- Node.js
- ts-node

## How to Run

Install project dependencies:

```bash
npm install
```

Run the application:

```bash
npm run dev
```

Check TypeScript errors:

```bash
npx tsc --noEmit
```

## Project Requirements Completed (GT1)

- Custom application interfaces in `types/index.ts`
- Generic interface `ApiResponse<T>`
- Generic functions (`getFirst`, `getById`)
- Utility types (`Partial`, `Pick`, `Omit`, `Record`, `ReturnType`)
- Enum implementation using `OrderStatus`
```