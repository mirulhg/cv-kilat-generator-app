import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger'
}

const VARIANT_CLASS: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-primary text-primary-fg hover:bg-primary-hover',
  ghost: 'bg-transparent text-body hover:bg-border/40',
  danger: 'bg-transparent text-danger hover:bg-danger/10',
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  const classes = [
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60',
    VARIANT_CLASS[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <button {...props} className={classes} />
}
