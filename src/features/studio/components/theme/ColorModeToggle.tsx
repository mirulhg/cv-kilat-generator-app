import type { ColorMode } from '../../theme/schema'

interface ColorModeToggleProps {
  value: ColorMode
  onChange: (colorMode: ColorMode) => void
}

export function ColorModeToggle({ value, onChange }: ColorModeToggleProps) {
  return (
    <div>
      <span id="theme-color-mode-label" className="block text-sm font-medium text-ink">
        Mode tampilan portofolio
      </span>
      <div
        role="group"
        aria-labelledby="theme-color-mode-label"
        className="mt-1 flex gap-1 rounded-md border border-border p-1"
      >
        <button
          type="button"
          onClick={() => onChange('light')}
          aria-pressed={value === 'light'}
          className={`min-h-11 flex-1 rounded px-3 text-sm ${
            value === 'light' ? 'bg-primary text-primary-fg' : 'text-body'
          }`}
        >
          Terang
        </button>
        <button
          type="button"
          onClick={() => onChange('dark')}
          aria-pressed={value === 'dark'}
          className={`min-h-11 flex-1 rounded px-3 text-sm ${
            value === 'dark' ? 'bg-primary text-primary-fg' : 'text-body'
          }`}
        >
          Gelap
        </button>
      </div>
    </div>
  )
}
