import { useEffect, useState } from 'react'
import { GalleryDataCorruptError, loadGalleryTemplates } from '../data'
import type { GalleryTemplate } from '../schema'

type GalleryState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; templates: GalleryTemplate[] }

export function useGalleryTemplates() {
  const [state, setState] = useState<GalleryState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  // Memuat data galeri statis (divalidasi Zod) saat halaman dibuka atau saat dicoba ulang.
  useEffect(() => {
    let cancelled = false

    loadGalleryTemplates()
      .then((templates) => {
        if (!cancelled) setState({ status: 'success', templates })
      })
      .catch((error: unknown) => {
        if (cancelled) return
        const message =
          error instanceof GalleryDataCorruptError
            ? error.message
            : 'Galeri tidak bisa dimuat. Coba lagi.'
        setState({ status: 'error', message })
      })

    return () => {
      cancelled = true
    }
  }, [attempt])

  function retry() {
    setState({ status: 'loading' })
    setAttempt((n) => n + 1)
  }

  return { state, retry }
}
