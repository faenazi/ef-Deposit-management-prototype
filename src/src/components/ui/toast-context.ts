import { createContext, useContext } from 'react'

export type ToastTone = 'success' | 'info' | 'danger'

export interface ToastOptions {
  tone: ToastTone
  title: string
  description?: string
}

export interface ToastContextValue {
  showToast: (toast: ToastOptions) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within <ToastProvider>')
  return context
}
