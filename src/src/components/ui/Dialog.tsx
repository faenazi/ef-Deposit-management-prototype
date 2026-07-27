import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'

import { cn } from '@/lib/cn'
import { IconButton } from '@/components/ui/IconButton'

interface DialogProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  /** Action row rendered at the logical end. Complex forms belong in pages, not dialogs. */
  footer?: ReactNode
  children?: ReactNode
  className?: string
}

/**
 * Modal dialog built on the native <dialog> element: focus is trapped and
 * moved into the dialog immediately, Escape closes it (00-shared §13).
 */
export function Dialog({ open, onClose, title, description, footer, children, className }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onCancel={onClose}
      aria-labelledby="dialog-title"
      className={cn(
        'ef-motion-dialog m-auto w-full max-w-lg rounded-lg bg-surface p-0 text-text-primary shadow-md',
        'backdrop:bg-[rgba(15,24,34,0.4)]',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4 p-6 pb-0">
        <div>
          <h2 id="dialog-title" className="text-h3 font-semibold">
            {title}
          </h2>
          {description && <p className="mt-1 text-body text-text-secondary">{description}</p>}
        </div>
        <IconButton icon={X} label="إغلاق" onClick={onClose} className="-me-2 -mt-1" />
      </div>
      {children && <div className="p-6">{children}</div>}
      {footer && (
        <div className="flex flex-wrap justify-end gap-3 border-t border-border-default p-4 px-6">
          {footer}
        </div>
      )}
    </dialog>
  )
}
