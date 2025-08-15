import Header from '../components/Header'
import { useStore } from '../store/StoreContext'
import { Link, useLocation } from 'react-router-dom'

export default function ProfilePage() {
  const { orders } = useStore()
  const location = useLocation() as any
  const lastOrderId = location.state?.orderId

  return (
    <div className="safe-bottom">
      <Header />

      <h1 className="mt-4 text-xl font-bold">Профиль</h1>

      {lastOrderId && (
        <div className="mt-3 rounded-xl border border-gray-200 bg-white p-3">
          <div className="text-sm">Заказ <span className="font-semibold">#{lastOrderId}</span> оформлен</div>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Link to="/favorites" className="rounded-xl border border-gray-200 bg-white p-4 text-center font-medium">Избранное</Link>
        <Link to="/catalog" className="rounded-xl border border-gray-200 bg-white p-4 text-center font-medium">Каталог</Link>
      </div>

      <section className="mt-6">
        <h2 className="mb-3 text-lg font-semibold">Мои заказы</h2>
        {orders.length === 0 ? (
          <p className="text-gray-600">Заказов пока нет</p>
        ) : (
          <ul className="space-y-3">
            {orders.map(o => (
              <li key={o.id} className="rounded-xl border border-gray-200 bg-white p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Заказ #{o.id}</div>
                    <div className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleString('ru-RU')}</div>
                  </div>
                  <div className="text-right font-bold">{o.total.toLocaleString('ru-RU')} ₽</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-lg font-semibold">Настройки</h2>
        <div className="space-y-2">
          <button className="w-full rounded-xl border border-gray-200 bg-white p-3 text-left">Изменить данные</button>
          <button className="w-full rounded-xl border border-gray-200 bg-white p-3 text-left">Способы доставки</button>
        </div>
      </section>
    </div>
  )
}