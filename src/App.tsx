import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import heroImg from './assets/hero.png'
import './App.css'
import UserCard from './components/UserCard'
import CourseCard from './components/CourseCard'
import SubmissionBadge from './components/SubmissionBadge'
import { useToggle } from './hooks/useToggle'
import type { User, FoodItem, Order } from './types/index'
import { OrderStatus } from './types/index'

const initialUsers: User[] = [
  {
    id: 1,
    name: 'Neil Atienza',
    email: 'neil@gmail.com',
    role: 'student',
    isActive: true,
  },
  {
    id: 2,
    name: 'Campus Food Admin',
    email: 'admin@campusfood.com',
    role: 'vendor_admin',
    isActive: true,
  },
]

const initialFoodItems: FoodItem[] = [
  {
    id: 1,
    name: 'Chicken Rice Meal',
    description: 'Grilled chicken with rice and vegetables',
    price: 85,
    category: 'Meals',
    available: true,
  },
  {
    id: 2,
    name: 'Milk Tea',
    description: 'Classic milk tea with pearls',
    price: 75,
    category: 'Drinks',
    available: true,
  },
]

const initialOrder: Order = {
  id: 101,
  userId: 1,
  foodItemIds: [1, 2],
  totalAmount: 160,
  status: OrderStatus.Placed,
  createdAt: new Date(),
}

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)
  const [selectionMessage, setSelectionMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [previousSearchTerm, setPreviousSearchTerm] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { isEnabled: isExpanded, toggle: toggleExpanded } = useToggle(false)
  const searchInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setUsers(initialUsers)
      setFoodItems(initialFoodItems)
      setSelectedOrder(initialOrder)
      setSelectedFood(initialFoodItems[0])
      setSelectedUser(initialUsers[0])
      setIsLoading(false)
    }, 350)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isLoading])

  const handleSelectUser = (user: User): void => {
    setSelectedUser(user)
    setSelectionMessage('Profile selected')
  }

  const dismissSelectionMessage = (): void => {
    setSelectionMessage('')
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPreviousSearchTerm(searchTerm)
    setSearchTerm(event.target.value)
  }

  const visibleFoodItems = searchTerm.trim() === ''
    ? []
    : foodItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )

  const fallbackUser = selectedUser ?? users[0]
  const fallbackFood = selectedFood ?? foodItems[0]
  const fallbackOrder = selectedOrder ?? initialOrder

  const showSummary = fallbackUser?.role === 'vendor_admin'
  const isReady = !isLoading && Boolean(fallbackUser) && Boolean(fallbackFood) && Boolean(selectedOrder)

  if (!isReady) {
    return (
      <div className="app">
        <header className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="Campus food banner" />
          <div className="hero-copy">
            <p className="eyebrow">Campus Food Pre-Order</p>
            <h1>Loading your dashboard…</h1>
            <p className="hero-text">Preparing your mock data and cards.</p>
          </div>
        </header>
      </div>
    )
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
        <div className="summary-card">
          <h2>Mock data status</h2>
          <p>{isLoading ? 'Loading mock data...' : 'Mock data loaded from state.'}</p>
          <p>Previous search: {previousSearchTerm ?? 'none'}</p>
          <button type="button" onClick={toggleExpanded}>
            {isExpanded ? 'Collapse details' : 'Expand details'}
          </button>
          {isExpanded && <p>Search input is focused once the mock data finishes loading.</p>}
        </div>
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
            {showSummary ? (
              <>
                <li>Viewing as vendor: {fallbackUser?.name}</li>
                <li>Menu items: {foodItems.length}</li>
                <li>Known orders: 1</li>
              </>
            ) : (
              <>
                <li>Selected student: {fallbackUser?.name}</li>
                <li>Featured meal: {fallbackFood?.name}</li>
                <li>Current order total: ₱{fallbackOrder.totalAmount}</li>
              </>
            )}
          </ul>
        </div>

        <div className="summary-card">
          <h3>Find a meal</h3>
          <input
            ref={searchInputRef}
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search meals"
          />
          <p>Showing {visibleFoodItems.length} matching items</p>
        </div>

        <div className="card-grid">
          {showSummary ? (
            <>
              <UserCard user={fallbackUser as User} onSelect={handleSelectUser} />
              {visibleFoodItems.map((fi) => (
                <CourseCard key={fi.id} foodItem={fi} label="Available Meals" />
              ))}
              <SubmissionBadge order={fallbackOrder}>
                <p>Order items:</p>
                <ul>
                  {fallbackOrder.foodItemIds.map((id) => {
                    const item = foodItems.find((f) => f.id === id)
                    return <li key={id}>{item ? item.name : `#${id}`}</li>
                  })}
                </ul>
              </SubmissionBadge>
            </>
          ) : (
            <>
              <UserCard user={fallbackUser as User} onSelect={handleSelectUser} />
              <CourseCard foodItem={fallbackFood as FoodItem} />
              {searchTerm.trim() === '' ? null : visibleFoodItems.length > 0 ? (
                visibleFoodItems.map((fi) => (
                  <CourseCard key={fi.id} foodItem={fi} label="Search result" />
                ))
              ) : (
                <div className="summary-card">
                  <p>No matching meals found.</p>
                </div>
              )}
              <SubmissionBadge order={fallbackOrder}>
                <p>{fallbackUser?.name} is ready for the next pickup update.</p>
                <p>Order items:</p>
                <ul>
                  {fallbackOrder.foodItemIds.map((id) => {
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
            setSelectedUser(users[0] ?? null)
            setSelectionMessage('')
          }}
        >
          View Student View
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedUser(users[1] ?? null)
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
