export function getGamePrice(game) {
  if (game?.price != null) return Number(game.price)

  const id = String(game?.id ?? 0)
  const hash = id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return Number((19.99 + (hash % 40)).toFixed(2))
}

export function formatPrice(price) {
  return `$${Number(price).toFixed(2)}`
}
