import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import { FieldError } from './FieldError'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, error, id, ...props },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`

  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? true : undefined}
        className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink shadow-subtle focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        {...props}
      />
      <FieldError id={errorId} message={error} />
    </div>
  )
})
