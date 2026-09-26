import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { GALLERY_CATEGORIES } from '../constants'
import { useApplyTemplate } from '../hooks/useApplyTemplate'
import { useGalleryFilters } from '../hooks/useGalleryFilters'
import { useGalleryTemplates } from '../hooks/useGalleryTemplates'
import { GalleryFilters } from '../components/GalleryFilters'
import { GalleryLoadError } from '../components/GalleryLoadError'
import { GalleryPageSkeleton } from '../components/GalleryPageSkeleton'
import { ReplaceDraftConfirmDialog } from '../components/ReplaceDraftConfirmDialog'
import { TemplateCard } from '../components/TemplateCard'
import { TemplatePreviewDialog } from '../components/TemplatePreviewDialog'
import type { GalleryTemplate } from '../schema'

export function GalleryPage() {
  const { state, retry } = useGalleryTemplates()
  const templates = state.status === 'success' ? state.templates : []
  const { category, query, filtered, setCategory, setQuery } = useGalleryFilters(templates)
  const [previewTemplate, setPreviewTemplate] = useState<GalleryTemplate>()
  const { pendingTemplate, requestApply, confirmReplace, cancelReplace } = useApplyTemplate()

  function handleResetFilters() {
    setCategory('semua')
    setQuery('')
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-ink">Galeri Contoh</h1>

      {state.status === 'loading' && <GalleryPageSkeleton />}
      {state.status === 'error' && <GalleryLoadError message={state.message} onRetry={retry} />}

      {state.status === 'success' && (
        <>
          <div className="mt-6">
            <GalleryFilters
              categories={GALLERY_CATEGORIES}
              category={category}
              query={query}
              onCategoryChange={setCategory}
              onQueryChange={setQuery}
            />
          </div>

          <p className="mt-4 text-sm text-muted">{filtered.length} contoh ditemukan</p>

          {filtered.length === 0 ? (
            <div className="mt-8 rounded-md border border-border p-6 text-center">
              <p className="text-body">Tidak ada contoh yang cocok dengan filter ini.</p>
              <Button type="button" variant="ghost" onClick={handleResetFilters} className="mt-4">
                Atur ulang filter
              </Button>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onView={() => setPreviewTemplate(template)}
                />
              ))}
            </div>
          )}
        </>
      )}

      <TemplatePreviewDialog
        template={previewTemplate}
        onClose={() => setPreviewTemplate(undefined)}
        onApply={(template) => {
          setPreviewTemplate(undefined)
          void requestApply(template)
        }}
      />

      <ReplaceDraftConfirmDialog
        open={pendingTemplate !== undefined}
        onConfirm={() => void confirmReplace()}
        onCancel={cancelReplace}
      />
    </main>
  )
}
