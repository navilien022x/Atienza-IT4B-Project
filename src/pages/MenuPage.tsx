import { useState, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import CourseCard from '../components/CourseCard'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import { getFoodItems } from '../api/client'
import type { FoodItem } from '../types/index'

export function MenuPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [addedItem, setAddedItem] = useState<string | null>(null)
  const navigate = useNavigate()
  const { addToCart, getTotalItems } = useCartStore()
  const { user } = useAuthStore()
  const role = user?.role
  const { data: menuItems = [], isLoading, isError } = useQuery({
    queryKey: ['foodItems'],
    queryFn: getFoodItems,
  })

  const handleAddToCart = (item: FoodItem) => {
    if (role !== 'student') {
      alert('Only students can place orders')
      return
    }
    addToCart(item, 1)
    setAddedItem(item.id)
    setTimeout(() => setAddedItem(null), 2000)
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value)
  }

  const categories = Array.from(new Set(menuItems.map((item) => item.category)))

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === null || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100">Menu</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Explore our full selection of food and beverages</p>
            </div>
            {role === 'student' && (
              <button
                onClick={() => navigate('/cart')}
                className="relative rounded-full border border-orange-300 bg-orange-100 px-4 py-3 font-semibold text-orange-700 transition hover:bg-orange-200 dark:border-orange-600 dark:bg-orange-500/10 dark:text-orange-300 dark:hover:bg-orange-500/20"
              >
                🛒 Cart
                {getTotalItems() > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white dark:bg-red-500">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            )}
          </div>
        </header>

        <section className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div>
            <label htmlFor="search" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Search items
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search for food items..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-500 transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:ring-orange-500/30"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Filter by category
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  selectedCategory === null
                    ? 'bg-orange-600 text-white dark:bg-orange-500'
                    : 'border border-slate-300 text-slate-700 hover:border-slate-400 dark:border-slate-600 dark:text-slate-300 dark:hover:border-slate-500'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    selectedCategory === category
                      ? 'bg-orange-600 text-white dark:bg-orange-500'
                      : 'border border-slate-300 text-slate-700 hover:border-slate-400 dark:border-slate-600 dark:text-slate-300 dark:hover:border-slate-500'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            {isLoading ? 'Loading menu...' : isError ? 'Menu unavailable' : `${filteredItems.length} items available`}
          </h2>
          {filteredItems.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
              <p className="text-slate-600 dark:text-slate-300">No items found. Try adjusting your search.</p>
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="relative rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
              >
                <CourseCard foodItem={item} />
                {role === 'student' && (
                  <div className="border-t border-slate-200 p-4 dark:border-slate-700">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                    >
                      {addedItem === item.id ? '✓ Added!' : 'Add to Cart'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
