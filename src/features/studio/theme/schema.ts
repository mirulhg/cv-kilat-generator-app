import { z } from 'zod'
import { paletteIdSchema } from './palettes'
import { fontPairIdSchema } from './fontPairs'
import { layoutIdSchema } from './layouts'

export const colorModeSchema = z.enum(['light', 'dark'])
export type ColorMode = z.infer<typeof colorModeSchema>

export const themeSchema = z.object({
  paletteId: paletteIdSchema.default('biru-profesional'),
  fontPairId: fontPairIdSchema.default('sans-modern'),
  layoutId: layoutIdSchema.default('single-column'),
  colorMode: colorModeSchema.default('light'),
})

export type Theme = z.infer<typeof themeSchema>

export const DEFAULT_THEME: Theme = themeSchema.parse({})
