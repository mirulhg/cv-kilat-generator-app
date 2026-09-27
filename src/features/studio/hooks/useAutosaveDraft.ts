import { useCallback, useEffect, useRef, useState } from 'react'
import { writeDraft } from '../api/draft-storage'
import type { Portfolio } from '../schema'
import type { Theme } from '../theme/schema'
import type { Section } from '../sections/schema'

const DEBOUNCE_MS = 2000

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export function useAutosaveDraft(portfolio: Portfolio, theme: Theme, sections: Section[]) {
  const [status, setStatus] = useState<SaveStatus>('idle')
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const skipNextSave = useRef(true)

  // useCallback di sini menstabilkan referensi agar tidak memicu ulang setTimeout di effect debounce setiap render.
  const save = useCallback(() => {
    setStatus('saving')
    writeDraft(portfolio, theme, sections)
      .then(() => setStatus('saved'))
      .catch(() => setStatus('error'))
  }, [portfolio, theme, sections])

  // Menulis draf ke IndexedDB setiap perubahan form, tema, atau bagian, didebounce ~2 detik.
  useEffect(() => {
    if (skipNextSave.current) {
      skipNextSave.current = false
      return
    }

    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(save, DEBOUNCE_MS)

    return () => clearTimeout(timeoutRef.current)
  }, [portfolio, theme, sections, save])

  return { status, retry: save }
}
