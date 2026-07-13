import { FaHeart } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { formatPrice, getGamePrice } from '../utils/gamePrice'
import Toast from './Toast'
import { useState } from 'react'

export default function GameCard({ game }) {
    const hasImage = Boolean(game.background_image)
    const { user, addToWishlist, addToCart, removeFromWishlist, isInWishlist } = useAuth()
    const navigate = useNavigate()
    const [toast, setToast] = useState(null)
    const inWishlist = isInWishlist(game.id)

    const handleWishlist = (event) => {
        event.preventDefault()
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

    const handleCart = (event) => {
        event.preventDefault()
        if (!user) {
            navigate('/login')
            return
        }
        addToCart(game)
        setToast({ message: 'Added to cart successfully! ', type: 'success' })
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
            
            <div className="group my-7 relative overflow-hidden rounded-[2rem] p-4 bg-gradient-to-r from-black/10 to-white/15 backdrop-blur-sm border-none shadow-md shadow-black/40 transition duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/50">
                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation()
                        handleWishlist(event)
                    }}
                    aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                    className="absolute z-20 left-3 top-3 rounded-full p-2.5 backdrop-blur-md transition duration-200 hover:scale-110"
                    style={{
                        backgroundColor: inWishlist ? 'rgba(239, 68, 68, 0.9)' : 'rgba(0, 0, 0, 0.4)',
                        color: 'white'
                    }}
                >
                    <FaHeart
                        className="w-5 h-5"
                        color="white"
                    />
                </button>

                <Link to={`/game/${game.id}`} className="block">
                    {/* حاوية الصورة الحاضنة لزر المفضلة */}
                    <div className="relative h-[180px] w-full overflow-hidden rounded-2xl bg-slate-900">
                        {hasImage ? (
                            <img
                                src={game.background_image}
                                alt={game.name}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                        ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-700 px-4 text-center">
                                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-400">
                                    No image
                                </p>
                                <h3 className="text-base font-semibold text-white">{game.name}</h3>
                            </div>
                        )}
                    </div>

                    {/* تفاصيل الكارت السفلي (Card Footer) */}
                    <div className="pt-4 px-1 pb-1 flex flex-col gap-2">
                        <h3 className="text-lg font-semibold text-white tracking-wide truncate">{game.name}</h3>
                        
                        <div className="flex items-center justify-between mt-1">
                            <span className="text-lg font-medium text-slate-300">{formatPrice(getGamePrice(game))}</span>
                            <button onClick={handleCart} className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}
