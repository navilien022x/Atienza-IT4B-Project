import { useState } from 'react'
import heroImg from './assets/hero.png'
import './App.css'
import UserCard from './components/UserCard'
import CourseCard from './components/CourseCard'
import SubmissionBadge from './components/SubmissionBadge'
import type { User, FoodItem, Order } from './types/index'
import { OrderStatus } from './types/index'

const student: User = {
  id: 1,
  name: 'Neil Atienza',
  email: 'neil@gmail.com',
  role: 'student',
  isActive: true,
}

const vendorAdmin: User = {
  id: 2,
  name: 'Campus Food Admin',
  email: 'admin@campusfood.com',
  role: 'vendor_admin',
  isActive: true,
}

const featuredFood: FoodItem = {
  id: 1,
  name: 'Chicken Rice Meal',
  description: 'Grilled chicken with rice and vegetables',
  price: 85,
  category: 'Meals',
  available: true,
}

const foodItems: FoodItem[] = [
  featuredFood,
  {
    id: 2,
    name: 'Milk Tea',
    description: 'Classic milk tea with pearls',
    price: 75,
    category: 'Drinks',
    available: true,
  },
]

const currentOrder: Order = {
  id: 101,
  userId: 1,
  foodItemIds: [1, 2],
  totalAmount: 160,
  status: OrderStatus.Placed,
  createdAt: new Date(),
}

function App() {
  const [selectedUser, setSelectedUser] = useState<User>(student)
  const [selectedFood] = useState<FoodItem>(featuredFood)
  const [selectedOrder] = useState<Order>(currentOrder)
  const [selectionMessage, setSelectionMessage] = useState('')

  const handleSelectUser = (user: User): void => {
    setSelectedUser(user)
    setSelectionMessage('Profile selected')
  }

  const dismissSelectionMessage = (): void => {
    setSelectionMessage('')
  }

  return (
    <div className="app">
      <header className="hero">
        <img src={heroImg} className="base" width="170" height="179" alt="Campus food banner" />
        <div className="hero-copy">
          <p className="eyebrow">Campus Food Pre-Order</p>
          <h1>Make the pickup process smooth.</h1>
          <p className="hero-text">
            Review the student profile, confirm the featured meal, and track the current order status in one dashboard.
          </p>
        </div>
      </header>

      <section className="dashboard">
        {selectionMessage && (
          <div className="selection-message" role="status" aria-live="polite">
            <span>{selectionMessage}</span>
            <button type="button" className="selection-close" onClick={dismissSelectionMessage} aria-label="Close notification">
              ×
            </button>
          </div>
        )}

        <div className="summary-card">
          <h2>Quick overview</h2>
          <ul>
            {selectedUser.role === 'vendor_admin' ? (
              <>
                <li>Viewing as vendor: {selectedUser.name}</li>
                <li>Menu items: {foodItems.length}</li>
                <li>Known orders: 1</li>
              </>
            ) : (
              <>
                <li>Selected student: {selectedUser.name}</li>
                <li>Featured meal: {selectedFood.name}</li>
                <li>Current order total: ₱{selectedOrder.totalAmount}</li>
              </>
            )}
          </ul>
        </div>

        <div className="card-grid">
          {selectedUser.role === 'vendor_admin' ? (
            <>
              <UserCard user={selectedUser} onSelect={handleSelectUser} />
              {foodItems.map((fi) => (
                <CourseCard key={fi.id} foodItem={fi} label="Available Meals" />
              ))}
              <SubmissionBadge order={selectedOrder}>
                <p>Order items:</p>
                <ul>
                  {selectedOrder.foodItemIds.map((id) => {
                    const item = foodItems.find((f) => f.id === id)
                    return <li key={id}>{item ? item.name : `#${id}`}</li>
                  })}
                </ul>
              </SubmissionBadge>
            </>
          ) : (
            <>
              <UserCard user={selectedUser} onSelect={handleSelectUser} />
              <CourseCard foodItem={selectedFood} />
              <SubmissionBadge order={selectedOrder}>
                <p>{selectedUser.name} is ready for the next pickup update.</p>
                <p>Order items:</p>
                <ul>
                  {selectedOrder.foodItemIds.map((id) => {
                    const item = foodItems.find((f) => f.id === id)
                    return <li key={id}>{item ? item.name : `#${id}`}</li>
                  })}
                </ul>
              </SubmissionBadge>
            </>
          )}
        </div>
      </section>

      <section className="secondary-actions">
        <button
          type="button"
          onClick={() => {
            setSelectedUser(student)
            setSelectionMessage('')
          }}
        >
          View Student View
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedUser(vendorAdmin)
            setSelectionMessage('')
          }}
        >
          View Vendor View
        </button>
      </section>
    </div>
  )
}

export default App
