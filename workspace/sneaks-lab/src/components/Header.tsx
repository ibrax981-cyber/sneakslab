import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useStore } from '../store/StoreContext'

export default function Header() {
  const { cart } = useStore()
  const cartCount = cart.reduce((n, i) => n + i.quantity, 0)
  return (
    <header className="sticky top-0 z-40 -mx-4 border-b border-gray-200 bg-white/80 px-4 py-3 backdrop-blur">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-xl font-extrabold tracking-tight">Sneaks <span className="text-gray-500">LAB</span></Link>
        <Link to="/cart" className="relative">
          <ShoppingCart />
          {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 rounded-full bg-black px-2 text-xs font-semibold text-white">{cartCount}</span>
          )}
        </Link>
      </div>
    </header>
  )
}