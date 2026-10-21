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

Install project dependencies and configure the frontend API URL:

```bash
npm install
copy .env.example .env
```

Set `VITE_API_URL` in `.env` to the backend API URL, then run the frontend:

```bash
npm run dev
```

Build the frontend and check TypeScript errors:

```bash
npm run build
```

## Backend API

The Express/MongoDB API lives in `itelect4-backend`. From that directory, install
dependencies and copy `.env.example` to `.env`, then set `MONGODB_URI`, a random
`JWT_SECRET` of at least 32 characters, and `CORS_ORIGIN=http://localhost:5173`.
Start the API with `npm run dev` and seed the food catalog with `npm run seed`.

Authentication is available at `POST /api/auth/register` and
`POST /api/auth/login`. The owned-order endpoints are `GET /api/orders`,
`GET /api/orders/:id`, `POST /api/orders`, `PUT /api/orders/:id`, and
`DELETE /api/orders/:id`; each requires `Authorization: Bearer <token>`.

## Project Requirements Completed (GT1)

- Custom application interfaces in `types/index.ts`
- Generic interface `ApiResponse<T>`
- Generic functions (`getFirst`, `getById`)
- Utility types (`Partial`, `Pick`, `Omit`, `Record`, `ReturnType`)
- Enum implementation using `OrderStatus`
```