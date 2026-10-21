import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import heroImg from '../assets/hero.png'
import CourseCard from '../components/CourseCard'
import { useToggle } from '../hooks/useToggle'
import type { FoodItem } from '../types/index'
import { getFoodItems, getOrders } from '../api/client'
import { useAuthStore } from '../store/authStore'
import { useUiStore } from '../store/uiStore'

export function HomePage() {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [previousSearchTerm, setPreviousSearchTerm] = useState<string | null>(null)
  const navigate = useNavigate()
  const { token, user } = useAuthStore()
  const { isDark, toggleDark } = useUiStore()
  const { isEnabled: isExpanded, toggle: toggleExpanded } = useToggle(false)
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const foodQuery = useQuery({ queryKey: ['foodItems'], queryFn: getFoodItems, retry: false })
  const ordersQuery = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
    enabled: Boolean(token),
    retry: false,
  })
  const isLoading = foodQuery.isPending || (Boolean(token) && ordersQuery.isPending)
  const hasError = foodQuery.isError || (Boolean(token) && ordersQuery.isError)
  const foodItems: FoodItem[] = foodQuery.data ?? []

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isLoading])

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPreviousSearchTerm(searchTerm)
    setSearchTerm(event.target.value)
  }

  const visibleFoodItems =
    searchTerm.trim() === ''
      ? []
      : foodItems.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )

  const fallbackFood = selectedFood ?? foodItems[0]
  const firstApiOrder = ordersQuery.data?.[0]
  const fallbackOrder = firstApiOrder ?? null

  const showSummary = user?.role === 'vendor_admin'
  const isReady = !isLoading

  if (!isLoading && hasError) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-800 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[28px] border border-red-200 bg-red-50 p-8 text-center dark:border-red-500/20 dark:bg-red-500/10">
          <h1 className="text-3xl font-black text-red-700 dark:text-red-300">Dashboard unavailable</h1>
          <p className="mt-3 text-sm text-red-700 dark:text-red-200">Check that the backend API and database are available, then reload this page.</p>
        </div>
      </div>
    )
  }

  if (!isReady) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <header className="overflow-hidden rounded-[28px] border border-orange-200 bg-gradient-to-r from-orange-100 via-amber-50 to-yellow-100 p-6 shadow-xl shadow-orange-200/40 dark:border-orange-500/20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 dark:shadow-none sm:p-8">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <img src={heroImg} className="h-20 w-20 rounded-2xl object-cover ring-2 ring-white/80 dark:ring-slate-700 sm:h-24 sm:w-24" alt="Campus food banner" />
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-orange-600 dark:text-orange-300">Campus Food Pre-Order</p>
                <h1 className="text-3xl font-black tracking-tight text-orange-700 dark:text-orange-200 sm:text-4xl">Loading your dashboard…</h1>
                <p className="text-sm text-slate-600 dark:text-slate-300">Preparing your campus order overview.</p>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-orange-200 bg-white/70 p-4 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200">
              <span className="h-3 w-3 animate-pulse rounded-full bg-orange-500" aria-hidden="true" />
              <span>Loading campus data from the API...</span>
            </div>
          </header>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="overflow-hidden rounded-[28px] border border-orange-200 bg-gradient-to-r from-orange-100 via-amber-50 to-yellow-100 p-5 shadow-xl shadow-orange-200/40 dark:border-orange-500/20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 dark:shadow-none sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <img src={heroImg} className="h-20 w-20 rounded-2xl object-cover ring-2 ring-white/80 dark:ring-slate-700 sm:h-24 sm:w-24" alt="Campus food banner" />
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-orange-600 dark:text-orange-300">Campus Food Pre-Order</p>
                <h1 className="text-3xl font-black tracking-tight text-orange-700 dark:text-orange-200 sm:text-4xl">Make the pickup process smooth.</h1>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleDark}
              className="inline-flex items-center justify-center rounded-full border border-orange-300 bg-white/80 px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm transition hover:border-orange-400 hover:bg-orange-50 dark:border-slate-600 dark:bg-slate-800 dark:text-orange-200 dark:hover:bg-slate-700"
            >
              {isDark ? 'Light mode' : 'Dark mode'}
            </button>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
            Review the student profile, confirm the featured meal, and track the current order status in one dashboard.
          </p>
        </header>

        <section className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Live data status</h2>
              <div className="mt-3 inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                {isLoading ? 'Loading data' : 'Loaded from API'}
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Previous search: {previousSearchTerm ?? 'none'}</p>
              <button
                type="button"
                onClick={toggleExpanded}
                className="mt-4 inline-flex items-center rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                {isExpanded ? 'Collapse details' : 'Expand details'}
              </button>
              {isExpanded && (
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  Search input is focused once the API data finishes loading.
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Quick overview</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {showSummary ? (
                  <>
                    <li>Viewing as vendor: {user?.name}</li>
                    <li>Menu items: {foodItems.length}</li>
                    <li>Your orders: {ordersQuery.data?.length ?? 0}</li>
                  </>
                ) : (
                  <>
                    <li>{user ? `Logged in as: ${user.name}` : 'Browse the menu as a guest'}</li>
                    <li>Current order ID: {fallbackOrder?.id ?? 'None'}</li>
                    <li>Total items in order: {fallbackOrder?.foodItemIds.length ?? 0}</li>
                  </>
                )}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Featured food</h2>
              <p className="mt-3 text-sm font-semibold text-orange-600 dark:text-orange-300">{fallbackFood?.name}</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{fallbackFood?.description}</p>
              <div className="mt-3 inline-flex items-center rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-500/10 dark:text-orange-300">
                ₱{fallbackFood?.price}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Current order</h2>
              <p className="mt-3 text-sm text-amber-700 dark:text-amber-300 font-semibold">
                {fallbackOrder ? `Order #${fallbackOrder.id}` : 'No orders yet'}
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Total: <span className="font-bold">{fallbackOrder ? `₱${fallbackOrder.totalAmount}` : '—'}</span>
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Your Account</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Your account is used to securely associate your orders.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            {user ? (
              <>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{user.name}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{user.email}</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Role: {user.role}</p>
              </>
            ) : (
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-600 dark:text-slate-300">Sign in or create an account to place and track orders.</p>
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                >
                  Sign in
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Available Food Items</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Search to filter items</p>
          </div>
          <div className="space-y-3">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for food items..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-500 transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:ring-orange-500/30"
            />
            {searchTerm && visibleFoodItems.length === 0 && (
              <p className="py-4 text-center text-sm text-slate-600 dark:text-slate-300">No items found for "{searchTerm}"</p>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleFoodItems.length > 0
              ? visibleFoodItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedFood(item)}
                    className={`transform transition-all ${
                      selectedFood?.id === item.id ? 'ring-2 ring-orange-500 dark:ring-orange-300' : 'hover:scale-105'
                    }`}
                  >
                    <CourseCard foodItem={item} />
                  </button>
                ))
              : foodItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedFood(item)}
                    className={`transform transition-all ${
                      selectedFood?.id === item.id ? 'ring-2 ring-orange-500 dark:ring-orange-300' : 'hover:scale-105'
                    }`}
                  >
                    <CourseCard foodItem={item} />
                  </button>
                ))}
          </div>
        </section>
      </div>
    </div>
  )
}
