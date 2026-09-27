import { useEffect, useState } from 'react'
import { DraftCorruptError, readDraft } from '../api/draft-storage'
import { createEmptyPortfolio } from '../defaults'
import { DEFAULT_THEME } from '../theme/schema'
import { createDefaultSections } from '../sections/schema'
import type { Portfolio } from '../schema'
import type { Theme } from '../theme/schema'
import type { Section } from '../sections/schema'

type RecoveryState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'empty'; portfolio: Portfolio; theme: Theme; sections: Section[] }
  | { status: 'success'; portfolio: Portfolio; theme: Theme; sections: Section[] }

export function useDraftRecovery() {
  const [state, setState] = useState<RecoveryState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  // Memuat draf tersimpan dari IndexedDB saat halaman dibuka atau saat dicoba ulang.
  useEffect(() => {
    let cancelled = false

    readDraft()
      .then((draft) => {
        if (cancelled) return
        setState(
          draft
            ? {
                status: 'success',
                portfolio: draft.portfolio,
                theme: draft.theme,
                sections: draft.sections,
              }
            : {
                status: 'empty',
                portfolio: createEmptyPortfolio(),
                theme: DEFAULT_THEME,
                sections: createDefaultSections(),
              },
        )
      })
      .catch((error: unknown) => {
        if (cancelled) return
        const message =
          error instanceof DraftCorruptError
            ? error.message
            : 'Draf tidak bisa dimuat. Periksa penyimpanan perangkat lalu coba lagi.'
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
