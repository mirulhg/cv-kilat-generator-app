import { z } from 'zod'

export const FONT_PAIR_IDS = [
  'sans-modern',
  'serif-klasik',
  'editorial-elegan',
  'mono-teknis',
  'humanis',
] as const

export const fontPairIdSchema = z.enum(FONT_PAIR_IDS)
export type FontPairId = z.infer<typeof fontPairIdSchema>

export interface FontPairDefinition {
  id: FontPairId
  name: string
  headingFontFamily: string
  bodyFontFamily: string
}

export const FONT_PAIRS: FontPairDefinition[] = [
  {
    id: 'sans-modern',
    name: 'Sans Modern',
    headingFontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    bodyFontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  },
  {
    id: 'serif-klasik',
    name: 'Serif Klasik',
    headingFontFamily: 'Georgia, "Times New Roman", serif',
    bodyFontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  },
  {
    id: 'editorial-elegan',
    name: 'Editorial Elegan',
    headingFontFamily: '"Times New Roman", Georgia, serif',
    bodyFontFamily: 'Georgia, "Times New Roman", serif',
  },
  {
    id: 'mono-teknis',
    name: 'Mono Teknis',
    headingFontFamily: '"Courier New", "Consolas", monospace',
    bodyFontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  },
  {
    id: 'humanis',
    name: 'Humanis',
    headingFontFamily: 'Verdana, Geneva, sans-serif',
    bodyFontFamily: '"Trebuchet MS", Verdana, sans-serif',
  },
]

export function getFontPair(id: FontPairId): FontPairDefinition {
  const fontPair = FONT_PAIRS.find((item) => item.id === id)
  if (!fontPair) throw new Error(`Pasangan huruf tidak ditemukan: ${id}`)
  return fontPair
}
