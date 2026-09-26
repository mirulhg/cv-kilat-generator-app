interface FieldErrorProps {
  id: string
  message: string | undefined
}

export function FieldError({ id, message }: FieldErrorProps) {
  if (!message) return null

  return (
    <p id={id} role="alert" className="mt-1 text-sm text-danger">
      {message}
    </p>
  )
}
