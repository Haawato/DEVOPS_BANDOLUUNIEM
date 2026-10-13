import { createContext, useContext } from 'react'

export interface ToastMessage {
  id: number
  message: string
}

export const ToastContext = createContext<(message: string) => void>(() => undefined)
export const useToast = () => useContext(ToastContext)