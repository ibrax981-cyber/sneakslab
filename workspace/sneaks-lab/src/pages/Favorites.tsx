import Header from '../components/Header'
import { useStore } from '../store/StoreContext'
import ProductCard from '../components/ProductCard'

export default function FavoritesPage() {
  const { favorites, products } = useStore()
  const items = products.filter(p => favorites.includes(p.id))

  return (
    <div className="safe-bottom">
      <Header />
      <h1 className="mt-4 text-xl font-bold">Избранное</h1>
      {items.length === 0 ? (
        <p className="mt-4 text-gray-600">Пока пусто</p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {items.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}