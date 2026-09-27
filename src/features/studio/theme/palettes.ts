import { z } from 'zod'
import paletteData from './palettes.json'

export const PALETTE_IDS = [
  'biru-profesional',
  'hijau-zamrud',
  'ungu-kreatif',
  'oranye-hangat',
  'merah-marun',
  'teal-modern',
  'abu-monokrom',
  'cokelat-bumi',
] as const

export const paletteIdSchema = z.enum(PALETTE_IDS)
export type PaletteId = z.infer<typeof paletteIdSchema>

const paletteColorsSchema = z.object({
  bg: z.string(),
  surface: z.string(),
  ink: z.string(),
  body: z.string(),
  muted: z.string(),
  border: z.string(),
  primary: z.string(),
  primaryFg: z.string(),
})

const paletteDefinitionSchema = z.object({
  id: paletteIdSchema,
  name: z.string(),
  light: paletteColorsSchema,
  dark: paletteColorsSchema,
})

export type PaletteColors = z.infer<typeof paletteColorsSchema>
export type PaletteDefinition = z.infer<typeof paletteDefinitionSchema>

export const PALETTES: PaletteDefinition[] = z.array(paletteDefinitionSchema).parse(paletteData)

export function getPalette(id: PaletteId): PaletteDefinition {
  const palette = PALETTES.find((item) => item.id === id)
  if (!palette) throw new Error(`Palet tidak ditemukan: ${id}`)
  return palette
}
