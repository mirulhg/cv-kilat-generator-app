import type { Theme } from './schema'

export interface ThemePreset {
  id: string
  name: string
  theme: Theme
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'preset-korporat',
    name: 'Korporat Tenang',
    theme: {
      paletteId: 'biru-profesional',
      fontPairId: 'sans-modern',
      layoutId: 'single-column',
      colorMode: 'light',
    },
  },
  {
    id: 'preset-kreatif',
    name: 'Kreatif Berani',
    theme: {
      paletteId: 'ungu-kreatif',
      fontPairId: 'editorial-elegan',
      layoutId: 'sidebar-left',
      colorMode: 'light',
    },
  },
  {
    id: 'preset-teknis',
    name: 'Teknis Modern',
    theme: {
      paletteId: 'teal-modern',
      fontPairId: 'mono-teknis',
      layoutId: 'two-column',
      colorMode: 'dark',
    },
  },
  {
    id: 'preset-editorial',
    name: 'Editorial Klasik',
    theme: {
      paletteId: 'cokelat-bumi',
      fontPairId: 'serif-klasik',
      layoutId: 'single-column',
      colorMode: 'light',
    },
  },
  {
    id: 'preset-malam',
    name: 'Malam Elegan',
    theme: {
      paletteId: 'abu-monokrom',
      fontPairId: 'humanis',
      layoutId: 'sidebar-left',
      colorMode: 'dark',
    },
  },
]
