import { THEME_PRESETS } from '../../theme/presets'

interface ThemePresetListProps {
  onApply: (presetId: string) => void
}

export function ThemePresetList({ onApply }: ThemePresetListProps) {
  return (
    <div>
      <span className="block text-sm font-medium text-ink">Tema siap pakai</span>
      <div className="mt-1 flex flex-wrap gap-2">
        {THEME_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => onApply(preset.id)}
            className="min-h-11 rounded-md border border-border px-3 text-sm text-body hover:border-primary"
          >
            {preset.name}
          </button>
        ))}
      </div>
    </div>
  )
}
