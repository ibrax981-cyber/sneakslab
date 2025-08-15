import { Link, useLocation } from 'react-router-dom'
import { Home, ShoppingBag, Heart, User } from 'lucide-react'

const tabs = [
  { to: '/', label: 'Главная', icon: Home },
  { to: '/catalog', label: 'Каталог', icon: ShoppingBag },
  { to: '/favorites', label: 'Избранное', icon: Heart },
  { to: '/profile', label: 'Профиль', icon: User },
]

export default function BottomNav() {
  const { pathname } = useLocation()
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-md items-stretch justify-between">
        {tabs.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to !== '/' && pathname.startsWith(to))
          return (
            <Link key={to} to={to} className="flex w-full flex-col items-center justify-center gap-1 py-2 text-xs">
              <Icon size={22} className={active ? 'text-black' : 'text-gray-400'} />
              <span className={active ? 'font-semibold text-black' : 'text-gray-500'}>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}