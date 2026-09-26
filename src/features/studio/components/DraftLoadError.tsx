import { Button } from '@/components/ui/Button'

interface DraftLoadErrorProps {
  message: string
  onRetry: () => void
}

export function DraftLoadError({ message, onRetry }: DraftLoadErrorProps) {
  return (
    <div role="alert" className="rounded-md border border-danger/30 bg-danger/5 p-6 text-center">
      <p className="text-ink">{message}</p>
      <Button type="button" onClick={onRetry} className="mt-4">
        Coba lagi
      </Button>
    </div>
  )
}
