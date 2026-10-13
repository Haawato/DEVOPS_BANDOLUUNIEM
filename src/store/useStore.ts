import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { initialAccounts, initialCategories, initialCustomers, initialOrders, initialProducts } from '../data/mockData'
import type { AuthUser, CartLine, Category, Customer, Order, OrderStatus, Product, StoredAccount } from '../types'

interface StoreState {
  products: Product[]
  categories: Category[]
  orders: Order[]
  customers: Customer[]
  accounts: StoredAccount[]
  currentUser: AuthUser | null
  cart: CartLine[]
  voucherCode: string
  darkMode: boolean
  giftWrapFee: number
  shippingFee: number
  addToCart: (productId: string) => void
  changeQuantity: (productId: string, quantity: number) => void
  removeFromCart: (productId: string) => void
  toggleCartOption: (productId: string, option: 'giftWrap' | 'card') => void
  clearCart: () => void
  setVoucherCode: (code: string) => void
  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  deleteProduct: (id: string) => void
  addCategory: (category: Category) => void
  updateCategory: (category: Category) => void
  deleteCategory: (id: string) => void
  updateOrderStatus: (id: string, status: OrderStatus) => void
  addOrder: (order: Order) => void
  toggleTheme: () => void
  updateFees: (giftWrapFee: number, shippingFee: number) => void
  login: (email: string, password: string) => AuthUser | null
  register: (name: string, email: string, password: string) => AuthUser | null
  logout: () => void
}

export const useStore = create<StoreState>()(persist((set, get) => ({
  products: initialProducts,
  categories: initialCategories,
  orders: initialOrders,
  customers: initialCustomers,
  accounts: initialAccounts,
  currentUser: null,
  cart: [],
  voucherCode: '',
  darkMode: false,
  giftWrapFee: 25000,
  shippingFee: 30000,
  addToCart: (productId) => set((state) => {
    const existing = state.cart.find((line) => line.productId === productId)
    return { cart: existing ? state.cart.map((line) => line.productId === productId ? { ...line, quantity: line.quantity + 1 } : line) : [...state.cart, { productId, quantity: 1, giftWrap: false, card: false }] }
  }),
  changeQuantity: (productId, quantity) => set((state) => ({ cart: quantity <= 0 ? state.cart.filter((line) => line.productId !== productId) : state.cart.map((line) => line.productId === productId ? { ...line, quantity } : line) })),
  removeFromCart: (productId) => set((state) => ({ cart: state.cart.filter((line) => line.productId !== productId) })),
  toggleCartOption: (productId, option) => set((state) => ({ cart: state.cart.map((line) => line.productId === productId ? { ...line, [option]: !line[option] } : line) })),
  clearCart: () => set({ cart: [], voucherCode: '' }),
  setVoucherCode: (voucherCode) => set({ voucherCode }),
  addProduct: (product) => set((state) => ({ products: [product, ...state.products] })),
  updateProduct: (product) => set((state) => ({ products: state.products.map((item) => item.id === product.id ? product : item) })),
  deleteProduct: (id) => set((state) => ({ products: state.products.filter((item) => item.id !== id) })),
  addCategory: (category) => set((state) => ({ categories: [category, ...state.categories] })),
  updateCategory: (category) => set((state) => ({ categories: state.categories.map((item) => item.id === category.id ? category : item) })),
  deleteCategory: (id) => set((state) => ({ categories: state.categories.filter((item) => item.id !== id) })),
  updateOrderStatus: (id, status) => set((state) => ({ orders: state.orders.map((order) => order.id === id ? { ...order, status } : order) })),
  addOrder: (order) => set((state) => {
    const existingCustomer = state.customers.find((customer) => customer.email === order.email)
    const customers = existingCustomer
      ? state.customers.map((customer) => customer.email === order.email
        ? { ...customer, name: order.customer, phone: order.phone ?? customer.phone, orders: customer.orders + 1, spent: customer.spent + order.total }
        : customer)
      : [{ id: order.id.replace(/^DH-/, 'KH-'), name: order.customer, email: order.email, phone: order.phone ?? '', orders: 1, spent: order.total, joined: order.date }, ...state.customers]
    return { orders: [order, ...state.orders], customers }
  }),
  toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
  updateFees: (giftWrapFee, shippingFee) => set({ giftWrapFee, shippingFee }),
  login: (email, password) => {
    const account = get().accounts.find((item) => item.email === email.trim().toLowerCase() && item.password === password)
    if (!account) return null
    const user: AuthUser = { id: account.id, name: account.name, email: account.email, role: account.role }
    set({ currentUser: user })
    return user
  },
  register: (name, email, password) => {
    const normalizedEmail = email.trim().toLowerCase()
    if (get().accounts.some((item) => item.email === normalizedEmail)) return null
    const account: StoredAccount = { id: `user-${crypto.randomUUID()}`, name: name.trim(), email: normalizedEmail, password, role: 'customer' }
    const user: AuthUser = { id: account.id, name: account.name, email: account.email, role: account.role }
    set((state) => ({ accounts: [...state.accounts, account], currentUser: user }))
    return user
  },
  logout: () => set({ currentUser: null }),
}), {
  name: 'tiem-nha-may-store',
  version: 4,
  migrate: (persistedState) => {
    const saved = (persistedState ?? {}) as Partial<StoreState>
    const products = saved.products ?? initialProducts
    const categories = saved.categories ?? initialCategories
    return {
      ...saved,
      accounts: [
        ...(saved.accounts ?? []),
        ...initialAccounts.filter((account) => !(saved.accounts ?? []).some((item) => item.email === account.email)),
      ],
      currentUser: saved.currentUser ?? null,
      products: [
        ...products,
        ...initialProducts.filter((product) => Number(product.id.slice(3)) > 8 && !products.some((item) => item.id === product.id)),
      ],
      categories: [
        ...categories,
        ...initialCategories.filter((category) => Number(category.id.slice(4)) > 5 && !categories.some((item) => item.id === category.id)),
      ],
    } as StoreState
  },
}))