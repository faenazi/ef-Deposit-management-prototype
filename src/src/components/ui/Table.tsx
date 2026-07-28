import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

export function TableContainer({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'overflow-x-auto rounded-xl border border-divider-soft bg-surface shadow-xs',
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
    <thead className={cn('bg-surface-subtle', className)} {...rest}>
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
        'h-[var(--table-row-height)] border-b border-divider-soft last:border-b-0',
        interactive &&
          'cursor-pointer transition-colors duration-[var(--motion-fast)] hover:bg-surface-raised focus-within:bg-surface-brand-muted',
        className,
      )}
      {...rest}
    >
      {children}
    </tr>
  )
}

interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  numeric?: boolean
}

export function TableHeaderCell({ numeric = false, className, children, ...rest }: TableHeaderCellProps) {
  return (
    <th
      scope="col"
      className={cn(
        'whitespace-nowrap border-b border-divider-soft px-4 py-3 text-start text-table font-semibold text-text-secondary',
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
        'px-4 py-3 text-start align-middle text-text-primary',
        numeric && 'ef-financial text-end font-medium',
        className,
      )}
      {...rest}
    >
      {children}
    </td>
  )
}
