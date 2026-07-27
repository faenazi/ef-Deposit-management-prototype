import { useId, type ReactNode } from 'react'

import { cn } from '@/lib/cn'
import { FormFieldContext } from '@/components/ui/form-field-context'

interface FormFieldProps {
  label: string
  /** Required fields are marked consistently (00-shared §14). */
  required?: boolean
  helper?: string
  /** Clear Arabic validation message shown directly below the control. */
  error?: string
  className?: string
  children: ReactNode
}

/**
 * Field wrapper: visible label (placeholders are not labels), optional helper
 * text, and inline validation with correct aria wiring.
 */
export function FormField({ label, required = false, helper, error, className, children }: FormFieldProps) {
  const id = useId()
  const descriptionId = helper ? `${id}-helper` : undefined
  const errorId = error ? `${id}-error` : undefined

  return (
    <FormFieldContext.Provider
      value={{ id, descriptionId, errorId, invalid: Boolean(error), required }}
    >
      <div className={cn('flex flex-col gap-1.5', className)}>
        <label htmlFor={id} className="text-body font-medium text-text-primary">
          {label}
          {required && (
            <span aria-hidden="true" className="ms-1 text-danger-text">
              *
            </span>
          )}
        </label>
        {children}
        {helper && !error && (
          <p id={descriptionId} className="text-small text-text-secondary">
            {helper}
          </p>
        )}
        {error && (
          <p id={errorId} className="text-small font-medium text-danger-text">
            {error}
          </p>
        )}
      </div>
    </FormFieldContext.Provider>
  )
}

interface FormErrorSummaryProps {
  title?: string
  errors: string[]
  className?: string
}

/** Error summary for long forms (00-shared §14). */
export function FormErrorSummary({
  title = 'يرجى تصحيح الأخطاء التالية قبل المتابعة',
  errors,
  className,
}: FormErrorSummaryProps) {
  if (errors.length === 0) return null
  return (
    <div
      role="alert"
      className={cn(
        'rounded-md border border-danger-border/50 bg-danger-bg p-4 text-danger-text',
        className,
      )}
    >
      <p className="text-body font-semibold">{title}</p>
      <ul className="mt-2 list-inside list-disc space-y-1 text-body">
        {errors.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    </div>
  )
}
