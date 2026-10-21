import type { ReactNode } from 'react'
import type { Order } from '../types/index'
import { OrderStatus } from '../types/index'

interface SubmissionBadgeProps {
  order: Order
  children?: ReactNode
  variant?: 'default' | 'compact'
}

function SubmissionBadge({ order, children, variant = 'default' }: SubmissionBadgeProps) {
  const isCompact = variant === 'compact'

  return (
    <article
      className={[
        'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900',
        isCompact ? 'space-y-3' : 'space-y-4',
      ].join(' ')}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-300">Order status</p>
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Order #{order.id}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">Total: ₱{order.totalAmount}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Items: {order.foodItemIds.length}</p>
      </div>
      <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
        {OrderStatus[order.status]}
      </span>
      {children}
    </article>
  )
}

export default SubmissionBadge