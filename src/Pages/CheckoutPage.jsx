import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { user, cart, clearCart } = useAuth()
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderDetails, setOrderDetails] = useState(null)

  useEffect(() => {
    if (cart.length === 0 && !orderComplete) {
      navigate('/cart')
    }
  }, [cart, navigate, orderComplete])

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070F2B] px-6 py-16 text-white">
        <div className="max-w-md rounded-2xl border border-white/10 bg-[#0d1535] p-8 text-center shadow-2xl">
          <h1 className="mb-3 text-2xl font-bold">Please log in</h1>
          <p className="mb-6 text-slate-400">You need an account to checkout.</p>
          <Link to="/login" className="inline-block rounded-xl bg-[#231d65] px-5 py-2.5 font-semibold text-white hover:bg-[#2e2685]">
            Log in
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price || 39.99), 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  const handleCompleteOrder = () => {
    const order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toLocaleDateString(),
      items: cart,
      subtotal,
      tax,
      total,
    }
    setOrderDetails(order)
    setOrderComplete(true)
    clearCart()
  }

  if (orderComplete && orderDetails) {
    return (
      <div className="min-h-screen bg-[#070F2B] px-4 py-12 text-white sm:px-6 lg:px-12">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-white/10 bg-[#0d1535] p-8 text-center">
            <div className="mb-6 flex justify-center">
              <FaCheckCircle className="text-6xl text-green-400" />
            </div>

            <h1 className="mb-3 text-3xl font-bold">Thank you for your purchase!</h1>
            <p className="mb-8 text-slate-400">An email will be sent to you with order details.</p>

            <div className="mb-8 rounded-2xl border border-white/10 bg-[#070F2B] p-6 text-left">
              <h2 className="mb-6 text-xl font-bold">Order Summary</h2>

              <div className="space-y-4">
                {orderDetails.items.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-white/10 pb-4">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-800">
                      {item.background_image ? (
                        <img src={item.background_image} alt={item.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{item.name}</h3>
                      <p className="text-sm text-slate-400">1x Total</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">${(item.price || 39.99).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2 border-t border-white/10 pt-6 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-cyan-400">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mb-6 rounded-xl border border-white/10 bg-[#070F2B] p-4 text-left">
              <p className="text-sm text-slate-400">
                <span className="font-semibold text-white">Order ID:</span> {orderDetails.id}
              </p>
              <p className="mt-2 text-sm text-slate-400">
                <span className="font-semibold text-white">Order Date:</span> {orderDetails.date}
              </p>
            </div>

            <Link
              to="/"
              className="inline-block rounded-xl bg-[#231d65] px-8 py-3 font-semibold text-white transition hover:bg-[#2e2685]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#070F2B] px-4 py-12 text-white sm:px-6 lg:px-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
          <p className="mt-2 text-slate-400">Review and complete your purchase</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0d1535] p-8">
          <h2 className="mb-6 text-xl font-bold">Order Summary</h2>

          <div className="mb-8 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-white/10 pb-4">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-800">
                  {item.background_image ? (
                    <img src={item.background_image} alt={item.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
                      No image
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-white">{item.name}</h3>
                    <p className="text-sm text-slate-400">{item.description_raw || 'Game description'}</p>
                  </div>
                  <p className="font-semibold text-white">${(item.price || 39.99).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 rounded-xl border border-white/10 bg-[#070F2B] p-6">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-3 text-lg font-bold">
              <span>Total</span>
              <span className="text-cyan-400">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={handleCompleteOrder}
              className="flex-1 rounded-xl bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Complete Purchase
            </button>
            <Link
              to="/cart"
              className="flex-1 rounded-xl border border-white/30 py-3 text-center font-semibold text-white transition hover:bg-white/5"
            >
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
