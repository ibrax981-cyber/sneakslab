import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import { useStore } from '../store/StoreContext'

const categories = [
  { key: 'sneakers', label: 'Кроссовки' },
  { key: 'hoodies', label: 'Худи' },
  { key: 'jackets', label: 'Куртки' },
  { key: 'accessories', label: 'Аксессуары' },
]

export default function CatalogPage() {
  const { products } = useStore()
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const initialCategory = params.get('category') || ''

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [selectedBrand, setSelectedBrand] = useState<string>('')

  const brands = useMemo(() => Array.from(new Set(products.map(p => p.brand))), [products])

  const filtered = products.filter(p => {
    const byCat = selectedCategory ? p.category === selectedCategory : true
    const byBrand = selectedBrand ? p.brand === selectedBrand : true
    return byCat && byBrand
  })

  return (
    <div className="safe-bottom">
      <Header />

      <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-3">
        <div className="flex gap-2 overflow-x-auto">
          <button className={`whitespace-nowrap rounded-full border px-3 py-2 text-sm ${selectedCategory === '' ? 'border-black bg-black text-white' : 'border-gray-200 bg-white'}`} onClick={() => setSelectedCategory('')}>Все</button>
          {categories.map(c => (
            <button key={c.key} className={`whitespace-nowrap rounded-full border px-3 py-2 text-sm ${selectedCategory === c.key ? 'border-black bg-black text-white' : 'border-gray-200 bg-white'}`} onClick={() => setSelectedCategory(c.key)}>{c.label}</button>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <label className="text-sm text-gray-600">Бренд:</label>
          <select value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm">
            <option value="">Все</option>
            {brands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}