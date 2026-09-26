import { Button } from '@/components/ui/Button'

interface GalleryLoadErrorProps {
  message: string
  onRetry: () => void
}

export function GalleryLoadError({ message, onRetry }: GalleryLoadErrorProps) {
  return (
    <div role="alert" className="mt-6 rounded-md border border-danger/30 bg-danger/5 p-6 text-center">
      <p className="text-ink">{message}</p>
      <Button type="button" onClick={onRetry} className="mt-4">
        Coba lagi
      </Button>
    </div>
  )
}
