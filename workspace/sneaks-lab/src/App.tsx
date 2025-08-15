import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { StoreProvider } from './store/StoreContext'
import HomePage from './pages/Home'
import CatalogPage from './pages/Catalog'
import ProductPage from './pages/Product'
import FavoritesPage from './pages/Favorites'
import ProfilePage from './pages/Profile'
import CartPage from './pages/Cart'
import BottomNav from './components/BottomNav'

function App() {
  const location = useLocation()
  const hideNav = location.pathname.startsWith('/product')

  return (
    <StoreProvider>
      <div className="min-h-screen bg-background">
        <div className="container-mobile pb-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        {!hideNav && <BottomNav />}
      </div>
    </StoreProvider>
  )
}

export default App
