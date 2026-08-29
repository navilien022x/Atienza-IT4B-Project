import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import { createOrder } from '../api/client'
import { OrderStatus } from '../types/index'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { checkoutSchema, type CheckoutFormValues } from '@/schemas/checkoutSchema'

export function CheckoutPage() {
  const navigate = useNavigate()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { token } = useAuthStore()
  const queryClient = useQueryClient()
  const orderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      clearCart()
      navigate('/order-confirmation', { state: { order } })
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      notes: '',
    },
  })

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

  const handlePlaceOrder = (values: CheckoutFormValues) => {
    orderMutation.mutate({
      userId: 1,
      foodItemIds: items.map((item) => item.id),
      totalAmount: getTotalPrice(),
      status: OrderStatus.Placed,
      createdAt: new Date().toISOString(),
      notes: values.notes,
    })
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
              <div className="mt-3 space-y-2">
                <Label htmlFor="notes">Delivery notes</Label>
                <Input
                  id="notes"
                  type="text"
                  placeholder="Add any special requests or notes..."
                  aria-invalid={Boolean(errors.notes)}
                  {...register('notes')}
                  className={errors.notes ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}
                />
                {errors.notes && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.notes.message}</p>
                )}
              </div>
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

            <form onSubmit={handleSubmit(handlePlaceOrder)} className="mt-6 space-y-3">
              <Button type="submit" disabled={orderMutation.isPending} className="w-full">
                {orderMutation.isPending ? 'Processing...' : 'Place Order'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/cart')}
                disabled={orderMutation.isPending}
                className="w-full"
              >
                Back to Cart
              </Button>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}
