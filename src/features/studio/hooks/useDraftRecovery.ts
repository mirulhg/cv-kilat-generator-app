import { useEffect, useState } from 'react'
import { DraftCorruptError, readDraft } from '../api/draft-storage'
import { createEmptyPortfolio } from '../defaults'
import type { Portfolio } from '../schema'

type RecoveryState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'empty'; portfolio: Portfolio }
  | { status: 'success'; portfolio: Portfolio }

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
            ? { status: 'success', portfolio: draft.portfolio }
            : { status: 'empty', portfolio: createEmptyPortfolio() },
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
