import { useEffect, useId, useRef, type ReactNode, type RefObject } from 'react'
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
  /** `dark` renders the navy navigation treatment (DEC-024). */
  tone?: 'light' | 'dark'
  widthClassName?: string
  returnFocusRef?: RefObject<HTMLElement | null>
  children: ReactNode
}

/** Side drawer built on the native <dialog> element (focus-managed). */
export function Drawer({
  open,
  onClose,
  title,
  side = 'left',
  tone = 'light',
  widthClassName = 'w-[360px] max-w-[85vw]',
  returnFocusRef,
  children,
}: DrawerProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      closeButtonRef.current?.focus()
    }
    if (!open && dialog.open) {
      dialog.close()
      returnFocusRef?.current?.focus()
    }
  }, [open, returnFocusRef])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      aria-labelledby={titleId}
      className={cn(
        'fixed inset-y-0 z-[var(--z-drawer)] m-0 hidden h-full max-h-none flex-col p-0 shadow-md open:flex',
        tone === 'dark' ? 'bg-sidebar-surface text-white' : 'bg-surface text-text-primary',
        'backdrop:bg-[rgba(15,24,34,0.34)] backdrop:backdrop-blur-[1px]',
        widthClassName,
        side === 'left'
          ? 'ef-motion-drawer-left start-auto left-0 right-auto'
          : 'ef-motion-drawer-right left-auto right-0',
      )}
    >
      <div
        className={cn(
          'flex min-h-[68px] items-center justify-between gap-4 border-b px-4 py-3',
          tone === 'dark' ? 'border-sidebar-border' : 'border-border-default',
        )}
      >
        <h2 id={titleId} className="text-h3 font-semibold">
          {title}
        </h2>
        <IconButton
          ref={closeButtonRef}
          icon={X}
          label="إغلاق"
          tone={tone}
          className="size-11"
          onClick={onClose}
        />
      </div>
      <div className="grow overflow-y-auto p-4">{children}</div>
    </dialog>
  )
}
