import { z } from 'zod'
import type { Draft } from '../draft'
import { draftPortfolioReadSchema } from '../schema'
import { themeSchema, DEFAULT_THEME } from '../theme/schema'
import { sectionSchema, createDefaultSections } from '../sections/schema'

const sectionsListSchema = z.array(sectionSchema)

export class DraftCorruptError extends Error {
  constructor(cause: unknown) {
    super('Draf tersimpan tidak valid dan tidak bisa dibaca.')
    this.name = 'DraftCorruptError'
    this.cause = cause
  }
}

const DRAFT_KEY = 'current-draft'

/**
 * Portofolio (isi yang diketik pengguna) divalidasi terpisah dari theme/sections
 * (data kosmetik/struktural). Kalau theme/sections hilang atau rusak, keduanya
 * di-reset ke default — hanya portfolio yang tidak valid yang membuat draf dianggap korup.
 *
 * Portofolio sendiri divalidasi dengan `draftPortfolioReadSchema` (longgar terhadap field
 * wajib yang masih '' — lihat komentar di schema.ts), bukan `portfolioSchema` yang ketat
 * dipakai form. Draf yang belum lengkap tetap harus bisa dibuka lagi apa adanya.
 */
export function parseDraftRecord(raw: unknown): Draft {
  if (typeof raw !== 'object' || raw === null) {
    throw new DraftCorruptError(new Error('Draf tersimpan bukan objek yang valid.'))
  }

  const record = raw as Record<string, unknown>

  const portfolioResult = draftPortfolioReadSchema.safeParse(record.portfolio)
  if (!portfolioResult.success) {
    throw new DraftCorruptError(portfolioResult.error)
  }

  const themeResult = themeSchema.safeParse(record.theme)
  const sectionsResult = sectionsListSchema.safeParse(record.sections)
  const updatedAt = typeof record.updatedAt === 'string' ? record.updatedAt : new Date().toISOString()

  return {
    id: DRAFT_KEY,
    portfolio: portfolioResult.data,
    theme: themeResult.success ? themeResult.data : DEFAULT_THEME,
    sections: sectionsResult.success ? sectionsResult.data : createDefaultSections(),
    updatedAt,
  }
}
