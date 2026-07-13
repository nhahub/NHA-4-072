import { useEffect, useState } from 'react'
import logo from '../assets/G.svg'
import { FaSearch, FaHeart, FaShoppingCart } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import { searchGames } from '../api/rawg'
import { useAuth } from '../context/AuthContext'

export default function NavBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const { user, logout, wishlist, cartItemCount } = useAuth()

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([])
      return
    }

    async function fetchResults() {
      try {
        setSearchLoading(true)
        const results = await searchGames(searchTerm)
        setSearchResults(results)
      } catch (error) {
        console.error('Search failed:', error)
      } finally {
        setSearchLoading(false)
      }
    }

    const timer = setTimeout(fetchResults, 300)
    return () => clearTimeout(timer)
  }, [searchTerm])

  return (
    <nav className="flex w-full flex-wrap items-center justify-between gap-4 bg-gradient-to-b from-[#070F2B] to-[#070F2B]/20 px-4 py-5 sm:px-6 lg:px-12">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-11 w-auto" />
        </Link>

        <div className="relative">
          <div className="flex w-72 items-center gap-3 rounded-full border border-white/5 bg-[#1c1853]/90 px-4 py-2.5 backdrop-blur-sm">
            <FaSearch className="text-sm text-gray-400 opacity-70" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search store"
              className="w-full bg-transparent text-sm text-white outline-none placeholder-gray-400/70"
            />
          </div>

          {searchTerm.trim() && (
            <div className="absolute left-0 top-full z-20 mt-2 w-72 rounded-xl border border-slate-700 bg-slate-950 p-2 shadow-lg">
              {searchLoading && <p className="px-2 py-2 text-sm text-cyan-400">Searching...</p>}

              {!searchLoading && searchResults.length === 0 && (
                <p className="px-2 py-2 text-sm text-slate-400">No games found.</p>
              )}

              {!searchLoading &&
                searchResults.slice(0, 5).map((game) => (
                  <Link
                    key={game.id}
                    to={`/game/${game.id}`}
                    onClick={() => setSearchTerm('')}
                    className="block rounded-lg px-2 py-2 text-sm text-slate-200 transition hover:bg-slate-800 hover:text-white"
                  >
                    {game.name}
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>

      <ul className="flex items-center gap-8 text-[16px] font-medium tracking-wide text-gray-300">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'font-bold text-white' : 'text-gray-400 transition-colors hover:text-white')}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/browse" className={({ isActive }) => (isActive ? 'font-bold text-white' : 'text-gray-400 transition-colors hover:text-white')}>
            Browse
          </NavLink>
        </li>
        <li>
          <NavLink to="/categories" className={({ isActive }) => (isActive ? 'font-bold text-white' : 'text-gray-400 transition-colors hover:text-white')}>
            Categories
          </NavLink>
        </li>
      </ul>

      <div className="flex items-center gap-3">
        <Link to="/wishlist" className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20">
          <FaHeart className="text-sm" />
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-400 px-1 text-[10px] font-bold text-slate-950">
            {wishlist.length}
          </span>
        </Link>
        <Link to="/cart" className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20">
          <FaShoppingCart className="text-sm" />
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-fuchsia-500 px-1 text-[10px] font-bold text-white">
            {cartItemCount}
          </span>
        </Link>
        {user ? (
          <button onClick={logout} className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="rounded-full border border-white/60 px-6 py-2 text-center text-sm font-light text-white transition-all hover:bg-white/10">
              Log in
            </Link>
            <Link to="/register" className="rounded-full bg-[#231d65] px-6 py-2 text-center text-sm font-normal text-white transition-all hover:bg-[#2e2685]">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}