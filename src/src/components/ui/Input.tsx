import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'
import { useFormField } from '@/components/ui/form-field-context'

export const fieldClass =
  'w-full rounded-sm border border-border-strong bg-surface px-3 text-body text-text-primary ' +
  'placeholder:text-text-muted transition-colors duration-[var(--motion-fast)] ' +
  'hover:border-text-muted disabled:cursor-not-allowed disabled:bg-surface-disabled disabled:text-text-disabled ' +
  'aria-invalid:border-danger-border'

function useFieldWiring(invalidProp?: boolean) {
  const field = useFormField()
  return {
    id: field?.id,
    'aria-describedby': field?.errorId ?? field?.descriptionId,
    'aria-invalid': (invalidProp ?? field?.invalid) || undefined,
    required: field?.required || undefined,
  }
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean
}

export function Input({ invalid, className, ...rest }: InputProps) {
  const wiring = useFieldWiring(invalid)
  return <input {...wiring} className={cn(fieldClass, 'h-10', className)} {...rest} />
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean
}

export function Textarea({ invalid, className, rows = 4, ...rest }: TextareaProps) {
  const wiring = useFieldWiring(invalid)
  return <textarea {...wiring} rows={rows} className={cn(fieldClass, 'py-2', className)} {...rest} />
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean
}

export function Select({ invalid, className, children, ...rest }: SelectProps) {
  const wiring = useFieldWiring(invalid)
  return (
    <select {...wiring} className={cn(fieldClass, 'h-10 cursor-pointer', className)} {...rest}>
      {children}
    </select>
  )
}

interface AmountInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  invalid?: boolean
}

/**
 * Monetary input: Latin digits, tabular numerals, SAR suffix kept with the
 * value (04-typography.md §5). Formatting/parsing logic arrives with the
 * domain services in Step 07.
 */
export function AmountInput({ invalid, className, ...rest }: AmountInputProps) {
  const wiring = useFieldWiring(invalid)
  return (
    <div className="relative">
      <input
        {...wiring}
        type="text"
        inputMode="numeric"
        dir="ltr"
        className={cn(fieldClass, 'ef-financial h-10 pe-12 text-start', className)}
        {...rest}
      />
      <span
        aria-hidden="true"
        className="absolute inset-y-0 start-3 hidden items-center text-body text-text-muted rtl:flex"
      >
        ر.س
      </span>
    </div>
  )
}
