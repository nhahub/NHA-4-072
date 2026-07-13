import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaStar, FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa'
import { getGameDetails } from '../api/rawg'
import { formatPrice, getGamePrice } from '../utils/gamePrice'
import { useAuth } from '../context/AuthContext'
import Toast from '../Components/Toast'

export default function GameDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, addToWishlist, addToCart, removeFromWishlist, isInWishlist } = useAuth()
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toast, setToast] = useState(null)
  const inWishlist = game ? isInWishlist(game.id) : false

  useEffect(() => {
    async function loadGameDetails() {
      try {
        setLoading(true)
        const data = await getGameDetails(id)
        setGame(data)
      } catch (err) {
        console.error('Failed to load game details:', err)
        setError('Could not load game details right now.')
      } finally {
        setLoading(false)
      }
    }

    loadGameDetails()
  }, [id])

  const handleWishlist = () => {
    if (!user) {
      navigate('/login')
      return
    }
    
    if (inWishlist) {
      removeFromWishlist(game.id)
    } else {
      addToWishlist(game)
    }
  }

  const handleCart = () => {
    if (!user) {
      navigate('/login')
      return
    }
    addToCart(game)
    setToast({ message: 'Added to cart successfully! ', type: 'success' })
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070F2B] text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent"></div>
          <p className="text-lg">Loading game details...</p>
        </div>
      </div>
    )
  }

  if (error || !game) {
    return (
      <div className="min-h-screen bg-[#070F2B] px-4 py-10 text-white">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
          <p className="mb-4 text-red-400">{error || 'No game found.'}</p>
          <Link to="/" className="text-cyan-400 underline">
            Go back home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="min-h-screen bg-[#070F2B] px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link to="/" className="mb-6 inline-flex items-center gap-2 text-cyan-400">
            <FaArrowLeft /> Back to Home
          </Link>

          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl">
            <img
              src={game.background_image || 'https://via.placeholder.com/1200x700'}
              alt={game.name}
              className="h-80 w-full object-cover sm:h-[420px]"
            />

            <div className="p-6 sm:p-8">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-3xl font-bold">{game.name}</h1>
                <span className="rounded-full bg-[#231d65] px-4 py-1.5 text-sm font-semibold text-white">
                  {formatPrice(getGamePrice(game))}
                </span>
              </div>

              <div className="mb-5 flex flex-wrap gap-4 text-sm text-slate-300">
                <span className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" /> {game.rating}
                </span>
                <span>Release: {game.released}</span>
                <span>Metacritic: {game.metacritic || 'N/A'}</span>
              </div>

              <p className="mb-6 leading-7 text-slate-300">
                {game.description_raw || 'No description available for this game yet.'}
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h2 className="mb-2 text-xl font-semibold">Genres</h2>
                  <div className="flex flex-wrap gap-2">
                    {game.genres?.map((genre) => (
                      <span key={genre.id} className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="mb-2 text-xl font-semibold">Platforms</h2>
                  <div className="flex flex-wrap gap-2">
                    {game.platforms?.map((platform) => (
                      <span key={platform.platform.id} className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">
                        {platform.platform.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={handleCart}
                  className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-200"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
                <button
                  onClick={handleWishlist}
                  className={`flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition ${
                    inWishlist
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                >
                  {inWishlist ? (
                    <FaHeart className="text-base" />
                  ) : (
                    <FaRegHeart className="text-base" />
                  )}
                  {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
