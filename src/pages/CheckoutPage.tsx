import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import { OrderStatus } from '../types/index'

export function CheckoutPage() {
  const navigate = useNavigate()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { token } = useAuthStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])

  useEffect(() => {
    if (items.length === 0 && token) {
      navigate('/cart')
    }
  }, [items.length, token, navigate])

  const handlePlaceOrder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate order placement
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Create order
    const newOrder = {
      id: Math.floor(Math.random() * 10000) + 1000,
      userId: 1,
      foodItemIds: items.map((item) => item.id),
      totalAmount: getTotalPrice(),
      status: OrderStatus.Placed,
      createdAt: new Date(),
      notes,
    }

    console.log('Order placed:', newOrder)

    // Clear cart and redirect
    clearCart()
    navigate('/order-confirmation', { state: { order: newOrder } })
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8">
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100">Checkout</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Review and confirm your order</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Order Summary</h2>
              <div className="mt-4 space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between border-b border-slate-200 pb-3 dark:border-slate-700">
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{item.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-orange-600 dark:text-orange-300">₱{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Special Instructions */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Special Instructions</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any special requests or notes..."
                className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-500 transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:ring-orange-500/30"
                rows={4}
              />
            </section>
          </div>

          {/* Order Total */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 h-fit">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Order Total</h3>
            <div className="mt-4 space-y-3 border-b border-slate-200 pb-4 dark:border-slate-700">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                <span className="font-semibold">₱{getTotalPrice()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Delivery</span>
                <span className="font-semibold">₱0</span>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <span className="font-bold text-slate-800 dark:text-slate-100">Total</span>
              <span className="text-2xl font-black text-orange-600 dark:text-orange-300">₱{getTotalPrice()}</span>
            </div>

            <form onSubmit={handlePlaceOrder} className="mt-6 space-y-3">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 disabled:opacity-50 dark:bg-orange-500 dark:hover:bg-orange-600"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/cart')}
                disabled={isProcessing}
                className="w-full rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Back to Cart
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}
