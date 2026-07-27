import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

/**
 * Professional financial table primitives (00-shared §9, token plan §15).
 * Responsive strategy: keep the table with controlled horizontal scrolling
 * first; column-priority hiding and row-detail drawers are applied per page.
 */
export function TableContainer({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'overflow-x-auto rounded-md border border-border-default bg-surface',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export function Table({ className, children, ...rest }: HTMLAttributes<HTMLTableElement>) {
  return (
    <table className={cn('w-full border-collapse text-table', className)} {...rest}>
      {children}
    </table>
  )
}

export function TableHead({ className, children, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={cn('sticky top-0 z-[var(--z-sticky)] bg-canvas', className)} {...rest}>
      {children}
    </thead>
  )
}

export function TableBody({ children, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...rest}>{children}</tbody>
}

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  interactive?: boolean
}

export function TableRow({ interactive = false, className, children, ...rest }: TableRowProps) {
  return (
    <tr
      className={cn(
        'border-b border-border-default last:border-b-0',
        interactive &&
          'cursor-pointer transition-colors duration-[var(--motion-fast)] hover:bg-canvas focus-within:bg-canvas',
        className,
      )}
      {...rest}
    >
      {children}
    </tr>
  )
}

interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Monetary/numeric columns get stable tabular alignment. */
  numeric?: boolean
}

export function TableHeaderCell({ numeric = false, className, children, ...rest }: TableHeaderCellProps) {
  return (
    <th
      scope="col"
      className={cn(
        'whitespace-nowrap px-3 py-3 text-start text-table font-semibold text-text-secondary',
        numeric && 'text-end',
        className,
      )}
      {...rest}
    >
      {children}
    </th>
  )
}

interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  numeric?: boolean
}

export function TableCell({ numeric = false, className, children, ...rest }: TableCellProps) {
  return (
    <td
      className={cn(
        'px-3 py-3 text-start align-middle',
        numeric && 'ef-financial text-end font-medium',
        className,
      )}
      {...rest}
    >
      {children}
    </td>
  )
}
