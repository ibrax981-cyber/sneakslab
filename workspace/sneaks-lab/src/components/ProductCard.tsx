import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import type { Product } from '../store/StoreContext'
import { useStore } from '../store/StoreContext'

export default function ProductCard({ product }: { product: Product }) {
  const { favorites, toggleFavorite } = useStore()
  const isFav = favorites.includes(product.id)

  return (
    <div className="card overflow-hidden">
      <Link to={`/product/${product.id}`} className="block">
        <img src={product.image} alt={product.title} className="h-44 w-full object-cover" />
      </Link>
      <div className="p-3">
        <div className="mb-1 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-xs uppercase tracking-wide text-gray-500">{product.brand}</p>
            <h3 className="truncate text-base font-semibold">{product.title}</h3>
          </div>
          <button onClick={() => toggleFavorite(product.id)} aria-label="toggle favorite" className="shrink-0 rounded-full p-2 hover:bg-gray-100">
            <Heart size={18} className={isFav ? 'fill-black text-black' : 'text-gray-400'} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">{product.price.toLocaleString('ru-RU')} ₽</div>
          <Link to={`/product/${product.id}`} className="btn-primary">Купить</Link>
        </div>
      </div>
    </div>
  )
}