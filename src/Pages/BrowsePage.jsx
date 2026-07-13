import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import GameCard from '../Components/GameCard'
import { getGames, getGenres, getPlatforms } from '../api/rawg'
const sortOptions = [
  { value: '-added', label: 'Most Popular' },
  { value: '-rating', label: 'Top Rated' },
  { value: '-released', label: 'Newest' },
  { value: 'name', label: 'Name A-Z' },
]

export default function BrowsePage() {
  const [searchParams] = useSearchParams()
  const [games, setGames] = useState([])
  const [genres, setGenres] = useState([])
  const [platforms, setPlatforms] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    ordering: '-added',
    genre: searchParams.get('genre') || '',
    platform: '',
  })

  useEffect(() => {
    async function loadFilters() {
      try {
        const [genreList, platformList] = await Promise.all([getGenres(), getPlatforms()])
        setGenres(genreList)
        setPlatforms(platformList)
      } catch (error) {
        console.error('Failed to load filter options:', error)
      }
    }

    loadFilters()
  }, [])

  useEffect(() => {
    async function loadGames() {
      setLoading(true)
      try {
        const results = await getGames({
          search: filters.search,
          ordering: filters.ordering,
          genre: filters.genre,
          platform: filters.platform,
          page_size: 12,
        })

        setGames(results)
      } catch (error) {
        console.error('Failed to load browse games:', error)
        setGames([])
      } finally {
        setLoading(false)
      }
    }

    loadGames()
  }, [filters])

  function handleFilterChange(event) {
    const { name, value } = event.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  function resetFilters() {
    setFilters({ search: '', ordering: '-added', genre: '', platform: '' })
  }

  return (
    <div className="min-h-screen bg-[#070F2B] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-black/20">
          <h1 className="text-3xl font-bold tracking-tight">Browse Games</h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Explore a wide collection of games and narrow the results with filters.
          </p>
        </div>



        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-black/20">
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="search">
                Search
              </label>
              <input
                id="search"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search games"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="ordering">
                Sort By
              </label>
              <select
                id="ordering"
                name="ordering"
                value={filters.ordering}
                onChange={handleFilterChange}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="genre">
                Genre
              </label>
              <select
                id="genre"
                name="genre"
                value={filters.genre}
                onChange={handleFilterChange}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none"
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="platform">
                Platform
              </label>
              <select
                id="platform"
                name="platform"
                value={filters.platform}
                onChange={handleFilterChange}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none"
              >
                <option value="">All Platforms</option>
                {platforms.map((platform) => (
                  <option key={platform.id} value={platform.id}>
                    {platform.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={resetFilters}
              className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Reset Filters
            </button>
          </aside>

          <div>
            {loading ? (
              <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/80">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent"></div>
                  <p className="text-slate-300">Loading games...</p>
                </div>
              </div>
            ) : games.length === 0 ? (
              <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/80 p-6 text-center">
                <p className="text-slate-300">No games match these filters right now.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {games.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
