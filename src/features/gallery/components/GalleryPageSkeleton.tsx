export function GalleryPageSkeleton() {
  return (
    <div
      className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      role="status"
      aria-label="Memuat galeri"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="animate-pulse space-y-3 rounded-lg border border-border p-5">
          <div className="h-12 w-12 rounded-full bg-border" />
          <div className="h-4 w-2/3 rounded bg-border" />
          <div className="h-3 w-1/2 rounded bg-border" />
        </div>
      ))}
    </div>
  )
}
