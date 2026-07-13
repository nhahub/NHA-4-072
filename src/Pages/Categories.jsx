import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaGamepad,
  FaRocket,
  FaPuzzlePiece,
  FaFutbol,
  FaGhost,
  FaChess,
  FaCar,
  FaFistRaised,
  FaHatWizard,
  FaCrosshairs,
} from 'react-icons/fa'
import { getGenres } from '../api/rawg'

const genreStyles = {
  Action: { icon: FaFistRaised, gradient: 'from-red-600/40 to-orange-600/20', accent: 'text-red-400' },
  Adventure: { icon: FaRocket, gradient: 'from-emerald-600/40 to-teal-600/20', accent: 'text-emerald-400' },
  RPG: { icon: FaHatWizard, gradient: 'from-purple-600/40 to-indigo-600/20', accent: 'text-purple-400' },
  Shooter: { icon: FaCrosshairs, gradient: 'from-amber-600/40 to-yellow-600/20', accent: 'text-amber-400' },
  Puzzle: { icon: FaPuzzlePiece, gradient: 'from-cyan-600/40 to-blue-600/20', accent: 'text-cyan-400' },
  Sports: { icon: FaFutbol, gradient: 'from-green-600/40 to-lime-600/20', accent: 'text-green-400' },
  Racing: { icon: FaCar, gradient: 'from-orange-600/40 to-red-600/20', accent: 'text-orange-400' },
  Strategy: { icon: FaChess, gradient: 'from-violet-600/40 to-purple-600/20', accent: 'text-violet-400' },
  Indie: { icon: FaGamepad, gradient: 'from-pink-600/40 to-rose-600/20', accent: 'text-pink-400' },
  Horror: { icon: FaGhost, gradient: 'from-slate-600/40 to-gray-600/20', accent: 'text-slate-300' },
}

const defaultStyle = {
  icon: FaGamepad,
  gradient: 'from-blue-600/40 to-indigo-600/20',
  accent: 'text-blue-400',
}

function getGenreStyle(name) {
  return genreStyles[name] || defaultStyle
}

export default function Categories() {
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadGenres() {
      try {
        const results = await getGenres()
        setGenres(results)
      } catch (error) {
        console.error('Failed to load genres:', error)
      } finally {
        setLoading(false)
      }
    }

    loadGenres()
  }, [])

  return (
    <div className="min-h-screen bg-[#070F2B] px-4 py-10 text-white sm:px-6 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Game Categories</h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Explore games by genre. Find your next adventure, RPG, shooter, and more.
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-[320px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
              <p className="text-slate-400">Loading categories...</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {genres.map((genre) => {
              const style = getGenreStyle(genre.name)
              const Icon = style.icon

              return (
                <Link
                  key={genre.id}
                  to={`/browse?genre=${genre.id}`}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1535] p-6 transition duration-300 hover:scale-[1.02] hover:border-white/20 hover:shadow-xl hover:shadow-black/30"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-60 transition group-hover:opacity-80`}
                  />
                  <div className="relative">
                    <div className={`mb-4 inline-flex rounded-xl bg-white/10 p-3 ${style.accent}`}>
                      <Icon className="text-2xl" />
                    </div>
                    <h2 className="text-xl font-bold">{genre.name}</h2>
                    {genre.games_count != null && (
                      <p className="mt-1 text-sm text-slate-400">
                        {genre.games_count.toLocaleString()} games
                      </p>
                    )}
                    <p className="mt-4 text-sm text-slate-300 opacity-0 transition group-hover:opacity-100">
                      Browse {genre.name} games →
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-r from-[#1c1853]/80 to-[#231d65]/60 p-8 text-center">
          <h2 className="text-2xl font-bold">Can&apos;t decide?</h2>
          <p className="mt-2 text-slate-400">Browse our full catalog and filter by genre, platform, and more.</p>
          <Link
            to="/browse"
            className="mt-5 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            View All Games
          </Link>
        </div>
      </div>
    </div>
  )
}
