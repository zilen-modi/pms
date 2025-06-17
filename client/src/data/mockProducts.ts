import { IProduct } from '@/types'

export const mockProducts: IProduct[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description: 'The most advanced iPhone ever with titanium design, powerful A17 Pro chip, and professional camera system.',
    price: 999.99,
    status: 'active',
    tags: ['electronics', 'smartphone', 'apple']
  },
  {
    id: '2',
    name: 'MacBook Air M2',
    description: 'Supercharged by the M2 chip, featuring a 13.6-inch Liquid Retina display and all-day battery life.',
    price: 1199.99,
    status: 'active',
    tags: ['electronics', 'laptop', 'apple', 'productivity']
  },
  {
    id: '3',
    name: 'AirPods Pro',
    description: 'Active Noise Cancellation, Adaptive Transparency, and spatial audio for an immersive listening experience.',
    price: 249.99,
    status: 'active',
    tags: ['electronics', 'audio', 'apple', 'wireless']
  },
  {
    id: '4',
    name: 'Samsung Galaxy S24',
    description: 'Premium Android smartphone with AI-powered features, exceptional camera system, and sleek design.',
    price: 899.99,
    status: 'archived',
    tags: ['electronics', 'smartphone', 'samsung']
  },
  {
    id: '5',
    name: 'Dell XPS 13',
    description: 'Ultra-thin laptop with InfinityEdge display, premium build quality, and exceptional performance.',
    price: 1299.99,
    status: 'active',
    tags: ['electronics', 'laptop', 'dell', 'productivity']
  }
]

// In-memory storage for development
const products = [...mockProducts]
let nextId = 6

export const mockProductService = {
  // Get all products
  getProducts: (): Promise<IProduct[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...products]), 500) // Simulate API delay
    })
  },

  // Add a new product
  addProduct: (productData: Omit<IProduct, 'id'>): Promise<IProduct> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct: IProduct = {
          ...productData,
          id: nextId.toString()
        }
        nextId++
        products.push(newProduct)
        resolve(newProduct)
      }, 300)
    })
  },

  // Update a product
  updateProduct: (id: string, productData: Partial<IProduct>): Promise<IProduct> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = products.findIndex(p => p.id === id)
        if (index === -1) {
          reject(new Error('Product not found'))
          return
        }
        
        products[index] = { ...products[index], ...productData }
        resolve(products[index])
      }, 300)
    })
  },

  // Delete a product
  deleteProduct: (id: string): Promise<IProduct> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = products.findIndex(p => p.id === id)
        if (index === -1) {
          reject(new Error('Product not found'))
          return
        }
        
        const deletedProduct = products[index]
        products.splice(index, 1)
        resolve(deletedProduct)
      }, 300)
    })
  }
} 