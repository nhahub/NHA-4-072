import { Link, Navigate, useLocation } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { formatPrice, getGamePrice } from '../utils/gamePrice'

export default function CheckoutSuccessPage() {
  const location = useLocation()
  const { user } = useAuth()
  const order = location.state?.order

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!order?.items?.length) {
    return <Navigate to="/cart" replace />
  }

  return (
    <div className="min-h-screen bg-[#070F2B] px-4 py-16 text-white sm:px-6">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#4ADE80]">
          <FaCheck className="text-3xl text-[#070F2B]" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight">Thank you for your purchase!</h1>
        <p className="mt-3 text-slate-400">
          An email will be sent to you with order details.
        </p>

        <div className="mt-10 text-left">
          <h2 className="mb-4 text-lg font-bold">Order Summary</h2>

          <div className="rounded-2xl border border-white/10 bg-[#0d1535]">
            {order.items.map((item, index) => {
              const qty = item.quantity || 1
              const price = getGamePrice(item)

              return (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 p-4 ${index < order.items.length - 1 ? 'border-b border-white/10' : ''}`}
                >
                  <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-800">
                    {item.background_image ? (
                      <img
                        src={item.background_image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-500">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-sm text-slate-400">{qty}x Total</p>
                  </div>

                  <span className="shrink-0 font-semibold text-white">
                    {formatPrice(price * qty)}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="mt-4 flex justify-between px-1 text-sm">
            <span className="text-slate-400">Total paid</span>
            <span className="font-bold text-white">{formatPrice(order.total)}</span>
          </div>
        </div>

        <Link
          to="/browse"
          className="mt-8 inline-block rounded-full bg-[#231d65] px-8 py-3 font-semibold text-white transition hover:bg-[#2e2685]"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
