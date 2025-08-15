import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { useStore } from '../store/StoreContext'
import ProductCard from '../components/ProductCard'
import { motion } from 'framer-motion'

export default function HomePage() {
  const { products } = useStore()
  const latest = products.slice(0, 6)

  return (
    <div className="safe-bottom">
      <Header />

      <section className="mt-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-5">
          <h1 className="text-2xl font-extrabold">Sneaks <span className="text-gray-500">LAB</span></h1>
          <p className="mt-1 text-sm text-gray-600">Последние поступления и лимитированные релизы</p>
          <img src="/assets/sneaker1.jpg" alt="banner" className="pointer-events-none absolute -right-6 bottom-0 w-40 rotate-12 opacity-90" />
          <div className="mt-4 flex gap-2">
            <Link to="/catalog" className="btn-neon">В каталог</Link>
            <Link to="/catalog" className="btn-outline">Новинки</Link>
          </div>
        </motion.div>
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-lg font-semibold">Категории</h2>
        <div className="grid grid-cols-4 gap-2">
          {[
            { key: 'sneakers', label: 'Кроссы' },
            { key: 'hoodies', label: 'Худи' },
            { key: 'jackets', label: 'Куртки' },
            { key: 'accessories', label: 'Аксесс.' },
          ].map(cat => (
            <Link key={cat.key} to={`/catalog?category=${cat.key}`} className="rounded-xl border border-gray-200 bg-white px-2 py-3 text-center text-xs font-medium hover:bg-gray-50">
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-lg font-semibold">Последние поступления</h2>
        <div className="grid grid-cols-2 gap-3">
          {latest.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  )
}