import { draftSchema, type Draft } from '../draft'
import type { Portfolio } from '../schema'
import { getDb, DRAFTS_STORE } from './db'

const DRAFT_KEY = 'current-draft'

export class DraftCorruptError extends Error {
  constructor(cause: unknown) {
    super('Draf tersimpan tidak valid dan tidak bisa dibaca.')
    this.name = 'DraftCorruptError'
    this.cause = cause
  }
}

export async function readDraft(): Promise<Draft | undefined> {
  const db = await getDb()
  const raw = await db.get(DRAFTS_STORE, DRAFT_KEY)
  if (raw === undefined) return undefined

  const result = draftSchema.safeParse(raw)
  if (!result.success) {
    throw new DraftCorruptError(result.error)
  }
  return result.data
}

export async function writeDraft(portfolio: Portfolio): Promise<Draft> {
  const draft: Draft = {
    id: DRAFT_KEY,
    portfolio,
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
