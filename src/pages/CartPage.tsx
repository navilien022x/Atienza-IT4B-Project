import { useNavigate } from 'react-router'
import { useCartStore } from '../store/cartStore'

export function CartPage() {
  const navigate = useNavigate()
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-6 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <header className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8">
            <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100">Shopping Cart</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Your cart is empty</p>
          </header>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/menu')}
              className="flex-1 rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8">
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100">Shopping Cart</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">{items.length} item(s) in cart</p>
        </header>

        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{item.name}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                <p className="mt-2 text-sm font-semibold text-orange-600 dark:text-orange-300">₱{item.price} each</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-bold text-slate-800 dark:text-slate-100">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Subtotal</p>
                  <p className="text-lg font-black text-orange-600 dark:text-orange-300">₱{item.price * item.quantity}</p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="rounded-full bg-red-100 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-200 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8">
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
              <span className="font-semibold text-slate-800 dark:text-slate-100">₱{getTotalPrice()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Delivery Fee</span>
              <span className="font-semibold text-slate-800 dark:text-slate-100">₱0</span>
            </div>
            <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
              <div className="flex justify-between">
                <span className="text-lg font-bold text-slate-800 dark:text-slate-100">Total</span>
                <span className="text-2xl font-black text-orange-600 dark:text-orange-300">₱{getTotalPrice()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate('/menu')}
            className="flex-1 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate('/checkout')}
            className="flex-1 rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
          >
            Proceed to Checkout
          </button>
          <button
            onClick={clearCart}
            className="rounded-full border border-red-300 bg-white px-6 py-3 text-sm font-semibold text-red-700 shadow-sm transition hover:bg-red-50 dark:border-red-600 dark:bg-slate-800 dark:text-red-400 dark:hover:bg-red-500/10"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  )
}
