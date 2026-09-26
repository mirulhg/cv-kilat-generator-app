export function DraftPageSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-2" role="status" aria-label="Memuat draf">
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-1/3 rounded bg-border" />
        <div className="h-10 rounded bg-border" />
        <div className="h-10 rounded bg-border" />
        <div className="h-24 rounded bg-border" />
      </div>
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-1/4 rounded bg-border" />
        <div className="h-48 rounded bg-border" />
      </div>
    </div>
  )
}
