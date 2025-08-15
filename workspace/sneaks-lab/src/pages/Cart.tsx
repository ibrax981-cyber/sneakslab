import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useStore } from '../store/StoreContext'

export default function CartPage() {
  const { cart, products, updateCartItem, removeFromCart, placeOrder } = useStore()
  const navigate = useNavigate()

  const items = cart.map(ci => ({
    cart: ci,
    product: products.find(p => p.id === ci.productId)!
  })).filter(x => !!x.product)

  const subtotal = useMemo(() => items.reduce((s, it) => s + it.product.price * it.cart.quantity, 0), [items])

  const [customer, setCustomer] = useState({ name: '', phone: '', address: '', delivery: 'courier' as 'courier' | 'pickup' })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const order = placeOrder(customer)
    navigate('/profile', { state: { orderId: order.id } })
  }

  return (
    <div className="safe-bottom">
      <Header />

      <h1 className="mt-4 text-xl font-bold">Корзина</h1>

      {items.length === 0 ? (
        <p className="mt-4 text-gray-600">Ваша корзина пуста</p>
      ) : (
        <>
          <ul className="mt-3 space-y-3">
            {items.map(({ cart: ci, product }) => (
              <li key={product.id} className="flex gap-3 rounded-xl border border-gray-200 bg-white p-3">
                <img src={product.image} alt={product.title} className="h-20 w-20 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{product.title}</div>
                  <div className="text-sm text-gray-600">{product.brand} {ci.size ? `• ${ci.size}` : ''}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <input type="number" min={1} value={ci.quantity} onChange={e => updateCartItem(product.id, ci.size, Math.max(1, Number(e.target.value)))} className="w-20 rounded-lg border border-gray-200 px-2 py-1 text-sm" />
                    <button onClick={() => removeFromCart(product.id, ci.size)} className="text-sm text-gray-500 underline">Удалить</button>
                  </div>
                </div>
                <div className="whitespace-nowrap text-right font-semibold">{(product.price * ci.quantity).toLocaleString('ru-RU')} ₽</div>
              </li>
            ))}
          </ul>

          <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Итого</span>
              <span className="text-xl font-extrabold">{subtotal.toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>

          <form onSubmit={submit} className="mt-4 space-y-3">
            <h2 className="text-lg font-semibold">Оформление</h2>
            <input required placeholder="Имя" value={customer.name} onChange={e => setCustomer({ ...customer, name: e.target.value })} className="w-full rounded-lg border border-gray-200 px-3 py-3" />
            <input required placeholder="Телефон" value={customer.phone} onChange={e => setCustomer({ ...customer, phone: e.target.value })} className="w-full rounded-lg border border-gray-200 px-3 py-3" />
            <div className="flex gap-2">
              <button type="button" onClick={() => setCustomer({ ...customer, delivery: 'courier' })} className={`flex-1 rounded-lg border px-3 py-3 text-sm ${customer.delivery === 'courier' ? 'border-black bg-black text-white' : 'border-gray-200 bg-white'}`}>Курьер</button>
              <button type="button" onClick={() => setCustomer({ ...customer, delivery: 'pickup' })} className={`flex-1 rounded-lg border px-3 py-3 text-sm ${customer.delivery === 'pickup' ? 'border-black bg-black text-white' : 'border-gray-200 bg-white'}`}>Самовывоз</button>
            </div>
            <input required placeholder="Адрес" value={customer.address} onChange={e => setCustomer({ ...customer, address: e.target.value })} className="w-full rounded-lg border border-gray-200 px-3 py-3" />
            <button type="submit" className="btn-neon w-full">Оплатить</button>
          </form>
        </>
      )}
    </div>
  )
}