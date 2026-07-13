import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { getGamePrice, formatPrice } from '../utils/gamePrice'

export default function CartPage() {
  const navigate = useNavigate()
  const { user, cart, removeFromCart, updateCartQuantity, clearCart } = useAuth()
  const [discountCode, setDiscountCode] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState(0)

  const subtotal = cart.reduce(
    (sum, item) => sum + getGamePrice(item) * (item.quantity || 1),
    0,
  )
  const discount = appliedDiscount
  const total = Math.max(0, subtotal - discount)
  const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0)

  function applyDiscount() {
    if (discountCode.trim().toUpperCase() === 'GAME10') {
      setAppliedDiscount(subtotal * 0.1)
    } else {
      setAppliedDiscount(0)
    }
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070F2B] px-6 py-16 text-white">
        <div className="max-w-md rounded-2xl border border-white/10 bg-[#0d1535] p-8 text-center shadow-2xl">
          <h1 className="mb-3 text-2xl font-bold">Please log in</h1>
          <p className="mb-6 text-slate-400">You need an account to view your cart.</p>
          <div className="flex justify-center gap-3">
            <Link to="/login" className="rounded-xl bg-[#231d65] px-5 py-2.5 font-semibold text-white hover:bg-[#2e2685]">
              Log in
            </Link>
            <Link to="/register" className="rounded-xl border border-white/20 px-5 py-2.5 font-semibold text-white hover:bg-white/5">
              Create account
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#070F2B] px-4 py-10 text-white sm:px-6 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
          <p className="mt-2 text-slate-400">
            {itemCount === 0
              ? 'Your cart is empty'
              : `You have ${itemCount} item${itemCount !== 1 ? 's' : ''} in your cart`}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#0d1535] p-12 text-center">
            <p className="mb-6 text-slate-400">Your cart is empty. Start browsing to add games!</p>
            <Link
              to="/browse"
              className="inline-block rounded-xl border border-white/30 px-6 py-3 font-medium text-white transition hover:bg-white/5"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <div className="rounded-2xl border border-white/10 bg-[#0d1535]">
              {cart.map((game, index) => {
                const price = getGamePrice(game)
                const qty = game.quantity || 1

                return (
                  <div
                    key={game.id}
                    className={`flex items-center gap-5 p-5 ${index < cart.length - 1 ? 'border-b border-white/10' : ''}`}
                  >
                    <Link to={`/game/${game.id}`} className="shrink-0">
                      <div className="h-20 w-20 overflow-hidden rounded-xl bg-slate-800">
                        {game.background_image ? (
                          <img
                            src={game.background_image}
                            alt={game.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
                            No image
                          </div>
                        )}
                      </div>
                    </Link>

                    <div className="min-w-0 flex-1">
                      <Link to={`/game/${game.id}`} className="font-semibold text-white hover:text-cyan-400">
                        {game.name}
                      </Link>

                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex items-center rounded-lg border border-white/15 bg-[#070F2B]">
                          <button
                            onClick={() => updateCartQuantity(game.id, qty - 1)}
                            className="px-3 py-1.5 text-slate-400 transition hover:text-white"
                            aria-label="Decrease quantity"
                          >
                            <FaMinus className="text-xs" />
                          </button>
                          <span className="min-w-[2rem] text-center text-sm font-medium">{qty}</span>
                          <button
                            onClick={() => updateCartQuantity(game.id, qty + 1)}
                            className="px-3 py-1.5 text-slate-400 transition hover:text-white"
                            aria-label="Increase quantity"
                          >
                            <FaPlus className="text-xs" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <button
                        onClick={() => removeFromCart(game.id)}
                        className="text-slate-500 transition hover:text-red-400"
                        aria-label="Remove item"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                      <span className="font-semibold text-white">{formatPrice(price * qty)}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="h-fit rounded-2xl border border-white/10 bg-[#0d1535] p-6">
              <h2 className="mb-6 text-lg font-bold">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Discount</span>
                  <span className="text-white">
                    {discount > 0 ? `-${formatPrice(discount)}` : formatPrice(0)}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex justify-between border-t border-white/10 pt-5">
                <span className="font-bold">Total</span>
                <span className="text-xl font-bold">{formatPrice(total)}</span>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="mt-6 w-full rounded-xl bg-[#231d65] py-3 font-semibold text-white transition hover:bg-[#2e2685]"
              >
                Proceed to Checkout
              </button>
              <Link
                to="/browse"
                className="mt-3 block w-full rounded-xl border border-white/30 py-3 text-center font-medium text-white transition hover:bg-white/5"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
