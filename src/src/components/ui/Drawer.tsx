import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'

import { cn } from '@/lib/cn'
import { IconButton } from '@/components/ui/IconButton'

interface DrawerProps {
  open: boolean
  onClose: () => void
  title: string
  /**
   * Supporting-content drawers enter from the physical left, supplementing the
   * right-anchored RTL content (08-motion-system.md §5). The navigation drawer
   * uses `right` because it replaces the right sidebar.
   */
  side?: 'left' | 'right'
  widthClassName?: string
  children: ReactNode
}

/** Side drawer built on the native <dialog> element (focus-managed). */
export function Drawer({
  open,
  onClose,
  title,
  side = 'left',
  widthClassName = 'w-[360px] max-w-[85vw]',
  children,
}: DrawerProps) {
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
      aria-labelledby="drawer-title"
      className={cn(
        'fixed inset-y-0 m-0 hidden h-full max-h-none flex-col bg-surface p-0 text-text-primary shadow-md open:flex',
        'backdrop:bg-[rgba(15,24,34,0.4)]',
        widthClassName,
        side === 'left'
          ? 'ef-motion-drawer-left start-auto left-0 right-auto'
          : 'ef-motion-drawer-right left-auto right-0',
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-border-default p-4 px-5">
        <h2 id="drawer-title" className="text-h3 font-semibold">
          {title}
        </h2>
        <IconButton icon={X} label="إغلاق" onClick={onClose} />
      </div>
      <div className="grow overflow-y-auto p-5">{children}</div>
    </dialog>
  )
}
