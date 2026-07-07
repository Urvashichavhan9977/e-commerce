import { Routes, Route, Navigate } from 'react-router-dom'
  import { AdminAuthProvider } from '../context/AdminAuthContext'
  import { ToastProvider } from '../components/Toast'
  import ProtectedAdminRoute from '../components/ProtectedAdminRoute'
  import AdminLayout from '../components/layout/AdminLayout'
  import AdminLoginPage from '../pages/AdminLoginPage'
  import DashboardPage from '../pages/DashboardPage'
  import ProductsPage from '../pages/ProductsPage'
  import CategoriesPage from '../pages/CategoriesPage'
  import OrdersPage from '../pages/OrdersPage'
  import UsersPage from '../pages/UsersPage'
  import ReviewsPage from '../pages/ReviewsPage'
  import CouponsPage from '../pages/CouponsPage'
  import InventoryPage from '../pages/InventoryPage'
  import CombosPage from '../pages/CombosPage'
  import HeroSlidesPage from '../pages/HeroSlidesPage'
  import TrendingProductsPage from '../pages/TrendingProductsPage'
  import ShopByConcernPage from '../pages/ShopByConcernPage'
  import SettingsPage from '../pages/SettingsPage'
  import '../styles/admin.css'

  export default function AdminRoutes() {
    return (
      <AdminAuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="login" element={<AdminLoginPage />} />
            <Route element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard"       element={<DashboardPage />} />

              {/* Main */}
              <Route path="products"        element={<ProductsPage />} />
              <Route path="categories"      element={<CategoriesPage />} />
              <Route path="reviews"         element={<ReviewsPage />} />
              <Route path="coupons"         element={<CouponsPage />} />
              <Route path="inventory"       element={<InventoryPage />} />
              <Route path="orders"          element={<OrdersPage />} />
              <Route path="users"           element={<UsersPage />} />

              {/* Storefront */}
              <Route path="hero-slides"     element={<HeroSlidesPage />} />
              <Route path="combos"          element={<CombosPage />} />
              <Route path="trending"        element={<TrendingProductsPage />} />
              <Route path="shop-by-concern" element={<ShopByConcernPage />} />

              {/* Account */}
              <Route path="settings"        element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </ToastProvider>
      </AdminAuthProvider>
    )
  }
  