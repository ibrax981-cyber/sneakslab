import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../store/StoreContext'
import ProductCard from '../components/ProductCard'
import { motion } from 'framer-motion'

const sizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44']

export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, addToCart } = useStore()

  const product = useMemo(() => products.find(p => p.id === id), [products, id])
  const [size, setSize] = useState<string>('')
  const [qty, setQty] = useState<number>(1)

  if (!product) return <div className="p-4">Товар не найден</div>

  const similar = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAdd = () => {
    addToCart({ productId: product.id, size: size || undefined, quantity: qty })
    navigate('/cart')
  }

  return (
    <div className="safe-bottom">
      <div className="-mx-4">
        <div className="relative">
          <img src={product.image} alt={product.title} className="h-80 w-full object-cover" />
          <button onClick={() => navigate(-1)} className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-2 text-sm">Назад</button>
        </div>
      </div>

      <div className="mt-4">
        <h1 className="text-xl font-bold">{product.title}</h1>
        <p className="mt-1 text-sm text-gray-600">{product.brand}</p>
        <div className="mt-2 text-2xl font-extrabold">{product.price.toLocaleString('ru-RU')} ₽</div>

        <div className="mt-4">
          <h3 className="mb-2 text-sm font-semibold">Размер</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map(s => (
              <button key={s} onClick={() => setSize(s)} className={`rounded-xl border px-3 py-2 text-sm ${size === s ? 'border-black bg-black text-white' : 'border-gray-200 bg-white'}`}>{s}</button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <label className="text-sm text-gray-600">Кол-во</label>
          <input type="number" min={1} value={qty} onChange={e => setQty(Math.max(1, Number(e.target.value)))} className="w-20 rounded-lg border border-gray-200 px-3 py-2" />
        </div>

        <motion.button whileTap={{ scale: 0.98 }} onClick={handleAdd} className="btn-neon mt-5 w-full">Добавить в корзину</motion.button>

        <p className="mt-4 text-sm text-gray-700">{product.description}</p>
      </div>

      {similar.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold">Похожие товары</h2>
          <div className="grid grid-cols-2 gap-3">
            {similar.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}