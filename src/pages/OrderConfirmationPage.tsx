import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { OrderStatus } from '../types/index'

export function OrderConfirmationPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const order = location.state?.order

  useEffect(() => {
    if (!order) {
      navigate('/orders')
    }
  }, [order, navigate])

  if (!order) {
    return null
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-6 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <div className="rounded-[28px] border border-emerald-200 bg-white p-6 text-center shadow-sm dark:border-emerald-500/20 dark:bg-slate-900 sm:p-8">
          <div className="flex justify-center">
            <div className="rounded-full bg-emerald-100 p-4 dark:bg-emerald-500/10">
              <svg
                className="h-12 w-12 text-emerald-600 dark:text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="mt-6 text-3xl font-black text-emerald-700 dark:text-emerald-300">Order Confirmed!</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Your order has been placed successfully
          </p>

          <div className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex justify-between border-b border-slate-200 pb-2 dark:border-slate-700">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Order ID</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-100">#{order.id}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2 dark:border-slate-700">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Amount</span>
              <span className="text-lg font-black text-orange-600 dark:text-orange-300">₱{order.totalAmount}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2 dark:border-slate-700">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Status</span>
              <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                {OrderStatus[order.status as keyof typeof OrderStatus]}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Items</span>
              <span className="font-bold text-slate-800 dark:text-slate-100">{order.foodItemIds.length}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3 rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-500/20 dark:bg-blue-500/10">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">What's next?</p>
            <ul className="space-y-2 text-left text-sm text-blue-800 dark:text-blue-200">
              <li>• Your order is being prepared</li>
              <li>• Check back on the Orders page for updates</li>
              <li>• Pickup time will be confirmed shortly</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate('/orders')}
            className="flex-1 rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
          >
            View Orders
          </button>
          <button
            onClick={() => navigate('/menu')}
            className="flex-1 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            Order More
          </button>
        </div>
      </div>
    </div>
  )
}
