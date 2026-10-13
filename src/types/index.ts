export type Occasion = 'Sinh nhật' | 'Kỷ niệm' | 'Giáng sinh' | 'Tốt nghiệp' | 'Tân gia'

export interface Product {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  material: string
  occasions: Occasion[]
  stock: number
  image: string
  description: string
  rating: number
  reviews: number
  featured?: boolean
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
  active: boolean
}

export type OrderStatus = 'Chờ xác nhận' | 'Đang gói quà' | 'Đang giao' | 'Đã giao' | 'Đã hủy'

export interface Order {
  id: string
  customer: string
  email: string
  phone?: string
  date: string
  total: number
  status: OrderStatus
  items: number
  giftNote: string
  payment: 'COD' | 'Chuyển khoản QR'
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  orders: number
  spent: number
  joined: string
}

export type UserRole = 'admin' | 'customer'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface StoredAccount extends AuthUser {
  password: string
}

export interface CartLine {
  productId: string
  quantity: number
  giftWrap: boolean
  card: boolean
}