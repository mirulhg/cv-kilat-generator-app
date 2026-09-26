import { forwardRef, useId, type TextareaHTMLAttributes } from 'react'
import { FieldError } from './FieldError'

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  function TextareaField({ label, error, id, ...props }, ref) {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const errorId = `${inputId}-error`

    return (
      <div>
        <label htmlFor={inputId} className="block text-sm font-medium text-ink">
          {label}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          rows={4}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? true : undefined}
          className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink shadow-subtle focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          {...props}
        />
        <FieldError id={errorId} message={error} />
      </div>
    )
  },
)
