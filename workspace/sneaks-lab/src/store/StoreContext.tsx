import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { initialProducts } from '../data/products'

export type Product = {
  id: string
  title: string
  brand: string
  category: 'sneakers' | 'hoodies' | 'jackets' | 'accessories'
  price: number
  image: string
  images?: string[]
  description?: string
}

export type CartItem = {
  productId: string
  size?: string
  quantity: number
}

export type Order = {
  id: string
  items: CartItem[]
  total: number
  customer: { name: string; phone: string; address: string; delivery: 'courier' | 'pickup' }
  createdAt: number
}

type StoreContextType = {
  products: Product[]
  favorites: string[]
  cart: CartItem[]
  orders: Order[]
  toggleFavorite: (id: string) => void
  addToCart: (item: CartItem) => void
  updateCartItem: (productId: string, size: string | undefined, quantity: number) => void
  removeFromCart: (productId: string, size?: string) => void
  clearCart: () => void
  placeOrder: (customer: Order['customer']) => Order
}

const StoreContext = createContext<StoreContextType | null>(null)

const LS_KEYS = {
  favorites: 'sneaks:favorites',
  cart: 'sneaks:cart',
  orders: 'sneaks:orders',
}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState(initialProducts)
  const [favorites, setFavorites] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(LS_KEYS.favorites) || '[]') } catch { return [] }
  })
  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem(LS_KEYS.cart) || '[]') } catch { return [] }
  })
  const [orders, setOrders] = useState<Order[]>(() => {
    try { return JSON.parse(localStorage.getItem(LS_KEYS.orders) || '[]') } catch { return [] }
  })

  useEffect(() => { localStorage.setItem(LS_KEYS.favorites, JSON.stringify(favorites)) }, [favorites])
  useEffect(() => { localStorage.setItem(LS_KEYS.cart, JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem(LS_KEYS.orders, JSON.stringify(orders)) }, [orders])

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const idx = prev.findIndex(ci => ci.productId === item.productId && ci.size === item.size)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity }
        return next
      }
      return [...prev, item]
    })
  }

  const updateCartItem = (productId: string, size: string | undefined, quantity: number) => {
    setCart(prev => prev.map(ci => (ci.productId === productId && ci.size === size) ? { ...ci, quantity } : ci))
  }

  const removeFromCart = (productId: string, size?: string) => {
    setCart(prev => prev.filter(ci => !(ci.productId === productId && ci.size === size)))
  }

  const clearCart = () => setCart([])

  const placeOrder = (customer: Order['customer']): Order => {
    const total = cart.reduce((sum, ci) => {
      const product = products.find(p => p.id === ci.productId)
      if (!product) return sum
      return sum + product.price * ci.quantity
    }, 0)
    const newOrder: Order = {
      id: Math.random().toString(36).slice(2, 10),
      items: cart,
      total,
      customer,
      createdAt: Date.now(),
    }
    setOrders(prev => [newOrder, ...prev])
    clearCart()
    return newOrder
  }

  const value = useMemo<StoreContextType>(() => ({
    products,
    favorites,
    cart,
    orders,
    toggleFavorite,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    placeOrder,
  }), [products, favorites, cart, orders])

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  )
}

export const useStore = () => {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}