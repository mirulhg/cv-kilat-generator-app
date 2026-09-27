import { useState } from 'react'
import type { Theme } from '../../theme/schema'
import { THEME_PRESETS } from '../../theme/presets'
import { PalettePicker } from './PalettePicker'
import { FontPairPicker } from './FontPairPicker'
import { LayoutPicker } from './LayoutPicker'
import { ColorModeToggle } from './ColorModeToggle'
import { ThemePresetList } from './ThemePresetList'
import { ThemeAppliedBanner } from './ThemeAppliedBanner'

interface ThemePanelProps {
  theme: Theme
  onThemeChange: (theme: Theme) => void
}

export function ThemePanel({ theme, onThemeChange }: ThemePanelProps) {
  const [previousTheme, setPreviousTheme] = useState<Theme>()

  function applyPreset(presetId: string) {
    const preset = THEME_PRESETS.find((item) => item.id === presetId)
    if (!preset) return
    setPreviousTheme(theme)
    onThemeChange(preset.theme)
  }

  function undoPreset() {
    if (!previousTheme) return
    onThemeChange(previousTheme)
    setPreviousTheme(undefined)
  }

  function updateField<K extends keyof Theme>(key: K, fieldValue: Theme[K]) {
    setPreviousTheme(undefined)
    onThemeChange({ ...theme, [key]: fieldValue })
  }

  return (
    <section aria-labelledby="theme-panel-heading" className="space-y-4">
      <h2 id="theme-panel-heading" className="text-lg font-semibold text-ink">
        Kustomisasi Tema
      </h2>

      <ThemePresetList onApply={applyPreset} />

      {previousTheme && <ThemeAppliedBanner onUndo={undoPreset} />}

      <PalettePicker value={theme.paletteId} onChange={(v) => updateField('paletteId', v)} />
      <FontPairPicker value={theme.fontPairId} onChange={(v) => updateField('fontPairId', v)} />
      <LayoutPicker value={theme.layoutId} onChange={(v) => updateField('layoutId', v)} />
      <ColorModeToggle value={theme.colorMode} onChange={(v) => updateField('colorMode', v)} />
    </section>
  )
}
