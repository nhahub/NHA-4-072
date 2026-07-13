const RAWG_BASE_URL = 'https://api.rawg.io/api'
const RAWG_API_KEY = 'f933abb393c7462dab8b12f34dfaaf4f'

const fallbackGames = [
  {
    id: 1,
    name: 'The Witcher 3',
    background_image: '',
    description_raw: 'A monster hunter embarks on a personal journey through war-torn lands.',
    price: 39.99,
    rating: 4.8,
    released: '2015-05-19',
    genres: [{ id: 5, name: 'RPG' }],
    parent_platforms: [{ platform: { id: 4, name: 'PC' } }],
  },
  {
    id: 2,
    name: 'Elden Ring',
    background_image: '',
    description_raw: 'An epic action RPG set in a shattered realm filled with mystery.',
    price: 59.99,
    rating: 4.9,
    released: '2022-02-25',
    genres: [{ id: 5, name: 'RPG' }],
    parent_platforms: [{ platform: { id: 4, name: 'PC' } }],
  },
  {
    id: 3,
    name: 'God of War Ragnarök',
    background_image: '',
    description_raw: 'A father and son journey through Norse mythology in a brutal adventure.',
    price: 49.99,
    rating: 4.7,
    released: '2022-11-09',
    genres: [{ id: 3, name: 'Adventure' }],
    parent_platforms: [{ platform: { id: 2, name: 'PlayStation' } }],
  },
  {
    id: 4,
    name: 'Cyberpunk 2077',
    background_image: '',
    description_raw: 'A futuristic open-world RPG with deep customization and choice.',
    price: 29.99,
    rating: 4.2,
    released: '2020-12-10',
    genres: [{ id: 5, name: 'RPG' }],
    parent_platforms: [{ platform: { id: 4, name: 'PC' } }],
  },
  {
    id: 5,
    name: 'Hades',
    background_image: '',
    description_raw: 'A fast-paced rogue-like with Greek mythology and satisfying combat.',
    price: 24.99,
    rating: 4.6,
    released: '2020-09-17',
    genres: [{ id: 1, name: 'Action' }],
    parent_platforms: [{ platform: { id: 4, name: 'PC' } }],
  },
  {
    id: 6,
    name: 'Portal 2',
    background_image: '',
    description_raw: 'A clever co-op puzzle adventure that still feels fresh and inventive.',
    price: 9.99,
    rating: 4.5,
    released: '2011-04-19',
    genres: [{ id: 7, name: 'Puzzle' }],
    parent_platforms: [{ platform: { id: 4, name: 'PC' } }],
  },
]

const fallbackGenres = [
  { id: 1, name: 'Action' },
  { id: 3, name: 'Adventure' },
  { id: 5, name: 'RPG' },
  { id: 7, name: 'Puzzle' },
]

const fallbackPlatforms = [
  { id: 4, name: 'PC' },
  { id: 2, name: 'PlayStation' },
]

function sortFallbackGames(list, ordering) {
  const sorted = [...list]

  switch (ordering) {
    case '-rating':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    case '-released':
      return sorted.sort((a, b) => new Date(b.released || 0) - new Date(a.released || 0))
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return sorted
  }
}

function filterFallbackGames({ search = '', ordering = '-added', genre = '', platform = '', page_size = 12 } = {}) {
  let filtered = [...fallbackGames]

  if (search) {
    const query = search.toLowerCase()
    filtered = filtered.filter((game) => game.name.toLowerCase().includes(query))
  }

  if (genre) {
    filtered = filtered.filter((game) => game.genres?.some((item) => String(item.id) === String(genre)))
  }

  if (platform) {
    filtered = filtered.filter((game) => game.parent_platforms?.some((item) => String(item.platform?.id) === String(platform)))
  }

  const sorted = sortFallbackGames(filtered, ordering)
  return sorted.slice(0, page_size)
}

async function rawgRequest(path, params = {}) {
  const url = new URL(`${RAWG_BASE_URL}${path}`)
  url.searchParams.set('key', RAWG_API_KEY)

  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value != null) {
      url.searchParams.set(key, value)
    }
  })

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`RAWG request failed with status ${response.status}`)
    }

    return response.json()
  } catch (error) {
    if (path === '/games' || path === '/genres' || path === '/platforms' || path.startsWith('/games/')) {
      if (path === '/genres') return { results: fallbackGenres }
      if (path === '/platforms') return { results: fallbackPlatforms }
      if (path.startsWith('/games/')) return null
      return { results: filterFallbackGames(params) }
    }

    throw error
  }
}

// Get featured games for the hero slider.
export async function getFeaturedGames() {
  const data = await rawgRequest('/games', {
    ordering: '-rating',
    page_size: 4,
  })

  return data.results
}

// Get upcoming games for the upcoming section.
export async function getUpcomingGames() {
  const data = await rawgRequest('/games', {
    ordering: '-released',
    page_size: 4,
  })

  return data.results
}

// Get trending games for the trending section.
export async function getTrendingGames() {
  const data = await rawgRequest('/games', {
    ordering: '-added',
    page_size: 4,
  })

  return data.results
}

// Get top rated games for the best sellers section.
export async function getTopRatedGames() {
  const data = await rawgRequest('/games', {
    ordering: '-rating',
    page_size: 4,
  })

  return data.results
}

// Get popular games for the best deals section.
export async function getPopularGames() {
  const data = await rawgRequest('/games', {
    ordering: '-metacritic',
    page_size: 4,
  })

  return data.results
}

// Search for games by name.
export async function searchGames(query) {
  const data = await rawgRequest('/games', {
    search: query,
    page_size: 6,
  })

  return data.results
}

// Get a filtered list of games for the browse page.
export async function getGames({ search = '', ordering = '-added', genre = '', platform = '', page_size = 12 } = {}) {
  const data = await rawgRequest('/games', {
    search,
    ordering,
    genres: genre,
    platforms: platform,
    page_size,
  })

  return data.results
}

// Get available genres for filtering.
export async function getGenres() {
  const data = await rawgRequest('/genres', {
    page_size: 50,
  })

  return data.results
}

// Get available platforms for filtering.
export async function getPlatforms() {
  const data = await rawgRequest('/platforms', {
    page_size: 50,
  })

  return data.results
}

// Get full details for one specific game.
export async function getGameDetails(id) {
  const data = await rawgRequest(`/games/${id}`)
  return data || null
}
