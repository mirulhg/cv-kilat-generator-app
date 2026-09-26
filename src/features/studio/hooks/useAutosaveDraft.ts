import { useCallback, useEffect, useRef, useState } from 'react'
import { writeDraft } from '../api/draft-storage'
import type { Portfolio } from '../schema'

const DEBOUNCE_MS = 2000

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export function useAutosaveDraft(portfolio: Portfolio) {
  const [status, setStatus] = useState<SaveStatus>('idle')
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const skipNextSave = useRef(true)

  // useCallback di sini menstabilkan referensi agar tidak memicu ulang setTimeout di effect debounce setiap render.
  const save = useCallback(() => {
    setStatus('saving')
    writeDraft(portfolio)
      .then(() => setStatus('saved'))
      .catch(() => setStatus('error'))
  }, [portfolio])

  // Menulis draf ke IndexedDB setiap perubahan form, didebounce ~2 detik.
  useEffect(() => {
    if (skipNextSave.current) {
      skipNextSave.current = false
      return
    }

    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(save, DEBOUNCE_MS)

    return () => clearTimeout(timeoutRef.current)
  }, [portfolio, save])

  return { status, retry: save }
}
