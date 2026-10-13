import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { ToastStack } from './components/common/feedback'
import { ToastContext, type ToastMessage } from './components/common/toastContext'
import { useStore } from './store/useStore'
import { StoreLayout } from './components/layout/StoreLayout'
import { CartPage, CheckoutPage, HomePage, ProductPage, ShopPage } from './components/storefront/Storefront'
import './App.css'

const LoginPage = lazy(() => import('./components/auth/AuthPages').then((module) => ({ default: module.LoginPage })))
const RegisterPage = lazy(() => import('./components/auth/AuthPages').then((module) => ({ default: module.RegisterPage })))
const AdminLayout = lazy(() => import('./components/admin/AdminPages').then((module) => ({ default: module.AdminLayout })))
const DashboardPage = lazy(() => import('./components/admin/AdminPages').then((module) => ({ default: module.DashboardPage })))
const ProductsPage = lazy(() => import('./components/admin/AdminPages').then((module) => ({ default: module.ProductsPage })))
const CategoriesPage = lazy(() => import('./components/admin/AdminPages').then((module) => ({ default: module.CategoriesPage })))
const OrdersPage = lazy(() => import('./components/admin/AdminPages').then((module) => ({ default: module.OrdersPage })))
const CustomersPage = lazy(() => import('./components/admin/AdminPages').then((module) => ({ default: module.CustomersPage })))
const AnalyticsPage = lazy(() => import('./components/admin/AdminPages').then((module) => ({ default: module.AnalyticsPage })))
const SettingsPage = lazy(() => import('./components/admin/AdminPages').then((module) => ({ default: module.SettingsPage })))

function RequireAdmin() {
  const currentUser = useStore((state) => state.currentUser)
  const location = useLocation()
  if (!currentUser) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  if (currentUser.role !== 'admin') return <Navigate to="/" replace />
  return <Outlet />
}

function App() {
  const darkMode = useStore((state) => state.darkMode)
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  function notify(message: string) {
    const id = Date.now() + Math.random()
    setToasts((current) => [...current, { id, message }])
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 3600)
  }
  useEffect(() => { document.documentElement.dataset.theme = darkMode ? 'dark' : 'light' }, [darkMode])
  return <div className={`app-root ${darkMode ? 'theme-dark' : ''}`}>
    <ToastContext.Provider value={notify}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Suspense fallback={<div className="route-loading">Đang mở trang đăng nhập...</div>}><LoginPage /></Suspense>} />
          <Route path="/register" element={<Suspense fallback={<div className="route-loading">Đang mở trang đăng ký...</div>}><RegisterPage /></Suspense>} />
          <Route element={<StoreLayout />}>
            <Route index element={<HomePage />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
          </Route>
          <Route element={<RequireAdmin />}>
            <Route path="admin" element={<Suspense fallback={<div className="route-loading">Đang mở không gian Nhà Mây...</div>}><AdminLayout /></Suspense>}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="customers" element={<CustomersPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <ToastStack toasts={toasts} onDismiss={(id) => setToasts((current) => current.filter((toast) => toast.id !== id))} />
    </ToastContext.Provider>
  </div>
}

export default App
