import type { Product } from '../store/StoreContext'

export const initialProducts: Product[] = [
  {
    id: 's1',
    title: 'Air Runner V1',
    brand: 'Nike',
    category: 'sneakers',
    price: 16990,
    image: '/assets/sneaker1.jpg',
    images: ['/assets/sneaker1.jpg'],
    description: 'Лёгкие кроссовки для города с амортизацией и дышащим верхом.'
  },
  {
    id: 's2',
    title: 'Street Classic',
    brand: 'Adidas',
    category: 'sneakers',
    price: 14990,
    image: '/assets/sneaker1.jpg',
    images: ['/assets/sneaker1.jpg'],
    description: 'Классический силуэт с современными материалами.'
  },
  {
    id: 'h1',
    title: 'Essential Hoodie',
    brand: 'Nike',
    category: 'hoodies',
    price: 8990,
    image: '/assets/sneaker1.jpg',
    images: ['/assets/sneaker1.jpg'],
    description: 'Плотный хлопок, минималистичный крой.'
  },
  {
    id: 'j1',
    title: 'Tech Shell Jacket',
    brand: 'New Balance',
    category: 'jackets',
    price: 15990,
    image: '/assets/sneaker1.jpg',
    images: ['/assets/sneaker1.jpg'],
    description: 'Лёгкая защита от ветра и дождя.'
  },
  {
    id: 'a1',
    title: 'Logo Cap',
    brand: 'Puma',
    category: 'accessories',
    price: 2990,
    image: '/assets/sneaker1.jpg',
    images: ['/assets/sneaker1.jpg'],
    description: 'Бейсболка в фирменном стиле.'
  },
]