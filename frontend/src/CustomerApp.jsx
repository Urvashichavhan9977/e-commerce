import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import Header from './Component/Header.jsx'
import Footer from './Component/Footer.jsx'

import HomePage from './pages/HomePage.jsx'
import ShopPage from './pages/ShopPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import IngredientsPage from './pages/IngredientsPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
import ResetPasswordPage from './pages/ResetPasswordPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import WishlistPage from './pages/WishlistPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import IngredientDetailPage from './pages/IngredientDetailPage.jsx'

// This is the original, unmodified customer storefront tree — extracted
// verbatim from App.jsx so it can be mounted alongside the new admin panel
// (see App.jsx) without changing any customer-facing behavior or markup.
function CustomerApp() {
  return (
    <AuthProvider>
      <CartProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/ingredients" element={<IngredientsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/ingredients/:slug" element={<IngredientDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </CartProvider>
    </AuthProvider>
  )
}

export default CustomerApp
