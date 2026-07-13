import { lazy, Suspense } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import BrowsePage from './Pages/BrowsePage'
import Categories from './Pages/Categories'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import WishlistPage from './Pages/WishlistPage'
import CartPage from './Pages/CartPage'
import CheckoutPage from './Pages/CheckoutPage'

const HomePage = lazy(() => import('./Pages/HomePage'))
const GameDetailsPage = lazy(() => import('./Pages/GameDetailsPage'))

function App() {
  return (
    <>
      <NavBar />
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#070F2B] text-white">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/:id" element={<GameDetailsPage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App
