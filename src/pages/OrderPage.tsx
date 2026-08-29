import { useParams, useNavigate } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { getOrder } from '../api/client'
import { OrderStatus } from '../types/index'

interface OrderParams extends Record<string, string | undefined> {
  id?: string
}

export function OrderPage() {
  const { id } = useParams<OrderParams>()
  const navigate = useNavigate()
  const { data: order, isLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrder(id!),
    enabled: Boolean(id),
  })

  if (isLoading) return <div className="p-8 text-center">Loading order...</div>

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-6 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6">
          <header className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8">
            <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100">Order Not Found</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">The order you're looking for doesn't exist.</p>
          </header>

          <button
            onClick={() => navigate('/orders')}
            className="inline-flex items-center rounded-full border border-orange-300 bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 dark:border-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600"
          >
            Back to Orders
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <button
          onClick={() => navigate('/orders')}
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          ← Back to Orders
        </button>

        <header className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100">Order #{order.id}</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Order Status</h2>
            <div className="mt-4 inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
              {OrderStatus[order.status]}
            </div>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              {order.status === OrderStatus.Placed && 'Your order has been placed and is waiting to be prepared.'}
              {order.status === OrderStatus.Preparing && 'Your order is currently being prepared.'}
              {order.status === OrderStatus.ReadyForPickup && 'Your order is ready for pickup!'}
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Order Total</h2>
            <div className="mt-4 text-4xl font-black text-orange-600 dark:text-orange-300">₱{order.totalAmount}</div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{order.foodItemIds.length} items</p>
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Order Details</h2>
          <dl className="mt-4 space-y-4">
            <div className="flex justify-between">
              <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">Order ID</dt>
              <dd className="text-sm font-semibold text-slate-800 dark:text-slate-200">{order.id}</dd>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-4 dark:border-slate-700">
              <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">Customer ID</dt>
              <dd className="text-sm font-semibold text-slate-800 dark:text-slate-200">{order.userId}</dd>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-4 dark:border-slate-700">
              <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">Items</dt>
              <dd className="text-sm font-semibold text-slate-800 dark:text-slate-200">{order.foodItemIds.join(', ')}</dd>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-4 dark:border-slate-700">
              <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">Created</dt>
              <dd className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {new Date(order.createdAt).toLocaleString()}
              </dd>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-4 dark:border-slate-700">
              <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">Note</dt>
              <dd className="max-w-xs text-right text-sm font-semibold text-slate-800 dark:text-slate-200">
                {order.notes ? order.notes : 'No special instructions'}
              </dd>
            </div>
          </dl>
        </section>

        <section className="flex gap-3">
          <button
            onClick={() => navigate('/orders')}
            className="flex-1 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            View All Orders
          </button>
          <button
            onClick={() => navigate('/menu')}
            className="flex-1 rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
          >
            Continue Shopping
          </button>
        </section>
      </div>
    </div>
  )
}
