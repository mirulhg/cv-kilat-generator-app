import { TextField } from '@/components/ui/TextField'

interface GalleryFiltersProps {
  categories: readonly string[]
  category: string
  query: string
  onCategoryChange: (next: string) => void
  onQueryChange: (next: string) => void
}

export function GalleryFilters({
  categories,
  category,
  query,
  onCategoryChange,
  onQueryChange,
}: GalleryFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <div>
        <label htmlFor="gallery-category" className="block text-sm font-medium text-ink">
          Kategori profesi
        </label>
        <select
          id="gallery-category"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="mt-1 min-h-11 rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink"
        >
          <option value="semua">Semua kategori</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <TextField
          id="gallery-search"
          label="Cari kata kunci"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Cari nama atau headline…"
        />
      </div>
    </div>
  )
}
