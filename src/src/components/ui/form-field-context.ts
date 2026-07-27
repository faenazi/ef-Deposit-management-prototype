import { createContext, useContext } from 'react'

export interface FormFieldContextValue {
  id: string
  descriptionId?: string
  errorId?: string
  invalid: boolean
  required: boolean
}

export const FormFieldContext = createContext<FormFieldContextValue | null>(null)

/** Input primitives read their wiring (ids, invalid state) from this hook. */
export function useFormField(): FormFieldContextValue | null {
  return useContext(FormFieldContext)
}
