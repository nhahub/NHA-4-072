import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { formatPrice, getGamePrice } from '../utils/gamePrice'

export default function WishlistPage() {
  const navigate = useNavigate()
  const { user, wishlist, removeFromWishlist, addToCart } = useAuth()

  function handleAddToCart(game) {
    addToCart(game)
    navigate('/cart')
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070F2B] px-6 py-16 text-white">
        <div className="max-w-md rounded-2xl border border-white/10 bg-[#0d1535] p-8 text-center shadow-2xl">
          <h1 className="mb-3 text-2xl font-bold">Please log in</h1>
          <p className="mb-6 text-slate-400">You need an account to view your wishlist.</p>
          <div className="flex justify-center gap-3">
            <Link to="/login" className="rounded-full bg-[#231d65] px-5 py-2.5 font-semibold text-white hover:bg-[#2e2685]">
              Log in
            </Link>
            <Link to="/register" className="rounded-full border border-white/30 px-5 py-2.5 font-semibold text-white hover:bg-white/5">
              Create account
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#070F2B] px-4 py-10 text-white sm:px-6 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Wishlist</h1>
          <p className="mt-2 text-slate-400">
            {wishlist.length === 0
              ? 'Your wishlist is empty'
              : `You have ${wishlist.length} saved game${wishlist.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#0d1535] p-12 text-center">
            <p className="mb-6 text-slate-400">Save games you love and come back to them later.</p>
            <Link
              to="/browse"
              className="inline-block rounded-full border border-white/30 px-6 py-3 font-medium text-white transition hover:bg-white/5"
            >
              Browse Games
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[#161b33] p-2">
            {wishlist.map((game, index) => (
              <div
                key={game.id}
                className={`flex gap-5 p-5 ${index < wishlist.length - 1 ? 'border-b border-white/10' : ''}`}
              >
                <Link to={`/game/${game.id}`} className="shrink-0">
                  <div className="h-24 w-24 overflow-hidden rounded-xl bg-slate-800">
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

                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <Link
                      to={`/game/${game.id}`}
                      className="text-lg font-bold text-white hover:text-cyan-400"
                    >
                      {game.name}
                    </Link>
                    <span className="shrink-0 text-lg font-bold text-white">
                      {formatPrice(getGamePrice(game))}
                    </span>
                  </div>

                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      onClick={() => removeFromWishlist(game.id)}
                      className="rounded-full border border-white/40 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/5"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => handleAddToCart(game)}
                      className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#070F2B] transition hover:bg-slate-200"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
