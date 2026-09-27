import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { readDraft, writeDraft, createDefaultSections } from '@/features/studio'
import type { GalleryTemplate } from '../schema'

export function useApplyTemplate() {
  const navigate = useNavigate()
  const [pendingTemplate, setPendingTemplate] = useState<GalleryTemplate>()

  async function requestApply(template: GalleryTemplate) {
    let hasExistingDraft: boolean
    try {
      hasExistingDraft = (await readDraft()) !== undefined
    } catch {
      // Draf lama tidak terbaca (korup) — tetap minta konfirmasi sebelum menimpanya.
      hasExistingDraft = true
    }

    if (hasExistingDraft) {
      setPendingTemplate(template)
      return
    }

    await writeDraft(template.portfolio, template.theme, createDefaultSections())
    navigate('/studio')
  }

  async function confirmReplace() {
    if (!pendingTemplate) return
    await writeDraft(pendingTemplate.portfolio, pendingTemplate.theme, createDefaultSections())
    setPendingTemplate(undefined)
    navigate('/studio')
  }

  function cancelReplace() {
    setPendingTemplate(undefined)
  }

  return { pendingTemplate, requestApply, confirmReplace, cancelReplace }
}
