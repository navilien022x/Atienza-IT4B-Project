import type { ReactNode } from 'react'
import type { Order } from '../types/index'
import { OrderStatus } from '../types/index'

interface SubmissionBadgeProps {
  order: Order
  children?: ReactNode
}

function SubmissionBadge({ order, children }: SubmissionBadgeProps) {
  return (
    <div className="submission-badge card">
      <p className="card-label">Order status</p>
      <h3>Order #{order.id}</h3>
      <p>Total: ₱{order.totalAmount}</p>
      <p className="meta">Items: {order.foodItemIds.length}</p>
      <p className="pill">{OrderStatus[order.status]}</p>
      {children}
    </div>
  )
}

export default SubmissionBadge