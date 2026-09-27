import type { CSSProperties } from 'react'
import type { Theme } from './schema'
import { getPalette } from './palettes'
import { getFontPair } from './fontPairs'

export function themeToCssVars(theme: Theme): CSSProperties {
  const palette = getPalette(theme.paletteId)
  const colors = theme.colorMode === 'dark' ? palette.dark : palette.light
  const fontPair = getFontPair(theme.fontPairId)

  return {
    '--portfolio-bg': colors.bg,
    '--portfolio-surface': colors.surface,
    '--portfolio-ink': colors.ink,
    '--portfolio-body': colors.body,
    '--portfolio-muted': colors.muted,
    '--portfolio-border': colors.border,
    '--portfolio-primary': colors.primary,
    '--portfolio-primary-fg': colors.primaryFg,
    '--portfolio-font-heading': fontPair.headingFontFamily,
    '--portfolio-font-body': fontPair.bodyFontFamily,
  } as CSSProperties
}
