import { useNavigate } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { getOrders } from '../api/client'
import { OrderStatus } from '../types/index'

export function OrdersPage() {
  const navigate = useNavigate()
  const { data: allOrders = [], isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  })

  const handleOrderClick = (orderId: number) => {
    navigate(`/orders/${orderId}`)
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8">
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100">Orders</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">View and manage all your food orders</p>
        </header>

        {isLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">Loading orders...</div>
        ) : isError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700">Unable to load orders.</div>
        ) : allOrders.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
            <p className="text-slate-600 dark:text-slate-300">No orders found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {allOrders.map((order) => (
              <button
                key={order.id}
                onClick={() => handleOrderClick(order.id)}
                className="w-full transform rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:scale-105 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 sm:p-6"
              >
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Order #{order.id}</h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      {order.foodItemIds.length} item{order.foodItemIds.length !== 1 ? 's' : ''}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-black text-orange-600 dark:text-orange-300">₱{order.totalAmount}</p>
                    </div>
                    <div className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                      {OrderStatus[order.status]}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        <section className="flex gap-3">
          <button
            onClick={() => navigate('/menu')}
            className="flex-1 rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
          >
            Order More
          </button>
        </section>
      </div>
    </div>
  )
}
