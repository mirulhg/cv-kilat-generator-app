import { useSearchParams } from 'react-router-dom'
import type { GalleryTemplate } from '../schema'

const ALL_CATEGORIES = 'semua'

export function useGalleryFilters(templates: GalleryTemplate[]) {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('kategori') ?? ALL_CATEGORIES
  const query = searchParams.get('q') ?? ''

  const normalizedQuery = query.trim().toLowerCase()
  const filtered = templates.filter((template) => {
    const matchesCategory = category === ALL_CATEGORIES || template.category === category
    const matchesQuery =
      normalizedQuery === '' ||
      `${template.name} ${template.headline}`.toLowerCase().includes(normalizedQuery)
    return matchesCategory && matchesQuery
  })

  function setCategory(next: string) {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev)
      if (next === ALL_CATEGORIES) params.delete('kategori')
      else params.set('kategori', next)
      return params
    })
  }

  function setQuery(next: string) {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev)
      if (next.trim() === '') params.delete('q')
      else params.set('q', next)
      return params
    })
  }

  return { category, query, filtered, setCategory, setQuery }
}
