import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { CircleCheckBig, CircleX, Info, X } from 'lucide-react'

import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
import { ToastContext, type ToastOptions, type ToastTone } from '@/components/ui/toast-context'

interface ToastItem extends ToastOptions {
  id: number
}

const toneClass: Record<ToastTone, string> = {
  success: 'border-success-border/60 text-success-text',
  info: 'border-info-border/50 text-info-text',
  danger: 'border-danger-border/50 text-danger-text',
}

const toneIcon = { success: CircleCheckBig, info: Info, danger: CircleX }

/**
 * Toast feedback. Toasts enter from the bottom-left edge, pairing with the
 * left-entering drawers (token plan §14, assumption A-04). Errors do not
 * auto-dismiss (08-motion-system.md §11).
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const nextId = useRef(1)

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (toast: ToastOptions) => {
      const id = nextId.current++
      setToasts((current) => [...current, { ...toast, id }])
      if (toast.tone !== 'danger') {
        window.setTimeout(() => dismiss(id), 5000)
      }
    },
    [dismiss],
  )

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-4 left-4 z-[var(--z-toast)] flex w-[320px] max-w-[calc(100vw-2rem)] flex-col gap-2"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role={toast.tone === 'danger' ? 'alert' : 'status'}
            className={cn(
              'ef-motion-fade-in flex items-start gap-3 rounded-md border bg-surface p-3 pe-2 shadow-sm',
              toneClass[toast.tone],
            )}
          >
            <Icon icon={toneIcon[toast.tone]} size="sm" className="mt-0.5" />
            <div className="grow">
              <p className="text-body font-semibold">{toast.title}</p>
              {toast.description && (
                <p className="mt-0.5 text-small text-text-secondary">{toast.description}</p>
              )}
            </div>
            <button
              type="button"
              aria-label="إغلاق التنبيه"
              onClick={() => dismiss(toast.id)}
              className="rounded-xs p-1 text-text-muted hover:text-text-primary"
            >
              <Icon icon={X} size="xs" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
