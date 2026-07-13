import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const STORAGE_KEY = 'gamehub-auth-data'

function normalizeCartItem(item) {
  return { ...item, quantity: item.quantity || 1 }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setUser(parsed.user || null)
        setUsers(parsed.users || [])
        setWishlist(parsed.wishlist || [])
        setCart((parsed.cart || []).map(normalizeCartItem))
      }
    } catch (error) {
      console.error('Failed to load auth data:', error)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, users, wishlist, cart }))
  }, [user, users, wishlist, cart])

  const login = (email, password) => {
    const foundUser = users.find((item) => item.email === email)

    if (!foundUser) {
      return { success: false, message: 'No account found with this email.' }
    }

    if (foundUser.password !== password) {
      return { success: false, message: 'Incorrect password.' }
    }

    setUser({ id: foundUser.id, name: foundUser.name, email: foundUser.email })
    return { success: true }
  }

  const register = ({ name, email, password }) => {
    const exists = users.some((item) => item.email === email)

    if (exists) {
      return { success: false, message: 'An account with this email already exists.' }
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    }

    setUsers((prev) => [...prev, newUser])
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email })
    return { success: true }
  }

  const logout = () => {
    setUser(null)
  }

  const addToWishlist = (item) => {
    if (!user) return false

    setWishlist((prev) => {
      if (prev.some((game) => game.id === item.id)) {
        return prev
      }

      return [...prev, item]
    })

    return true
  }

  const addToCart = (item) => {
    if (!user) return false

    setCart((prev) => {
      const existing = prev.find((game) => game.id === item.id)

      if (existing) {
        return prev.map((game) =>
          game.id === item.id ? { ...game, quantity: game.quantity + 1 } : game,
        )
      }

      return [...prev, { ...item, quantity: 1 }]
    })

    return true
  }

  const updateCartQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id)
      return
    }

    setCart((prev) =>
      prev.map((game) => (game.id === id ? { ...game, quantity } : game)),
    )
  }

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((game) => game.id !== id))
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((game) => game.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  const cartItemCount = useMemo(
    () => cart.reduce((sum, item) => sum + (item.quantity || 1), 0),
    [cart],
  )

  const isInWishlist = (id) => wishlist.some((game) => game.id === id)
  const isInCart = (id) => cart.some((game) => game.id === id)

  const value = useMemo(
    () => ({
      user,
      users,
      wishlist,
      cart,
      cartItemCount,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      addToWishlist,
      addToCart,
      updateCartQuantity,
      removeFromWishlist,
      removeFromCart,
      clearCart,
      isInWishlist,
      isInCart,
    }),
    [user, users, wishlist, cart, cartItemCount],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
