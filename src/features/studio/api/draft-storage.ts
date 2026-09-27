import type { Draft } from '../draft'
import type { Portfolio } from '../schema'
import type { Theme } from '../theme/schema'
import type { Section } from '../sections/schema'
import { getDb, DRAFTS_STORE } from './db'
import { parseDraftRecord, DraftCorruptError } from './parseDraftRecord'

const DRAFT_KEY = 'current-draft'

export { DraftCorruptError }

export async function readDraft(): Promise<Draft | undefined> {
  const db = await getDb()
  const raw = await db.get(DRAFTS_STORE, DRAFT_KEY)
  if (raw === undefined) return undefined

  return parseDraftRecord(raw)
}

export async function writeDraft(
  portfolio: Portfolio,
  theme: Theme,
  sections: Section[],
): Promise<Draft> {
  const draft: Draft = {
    id: DRAFT_KEY,
    portfolio,
    theme,
    sections,
    updatedAt: new Date().toISOString(),
  }
  const db = await getDb()
  await db.put(DRAFTS_STORE, draft, DRAFT_KEY)
  return draft
}

export async function deleteDraft(): Promise<void> {
  const db = await getDb()
  await db.delete(DRAFTS_STORE, DRAFT_KEY)
}
