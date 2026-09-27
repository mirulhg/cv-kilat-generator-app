import { PALETTES, type PaletteId } from '../../theme/palettes'

interface PalettePickerProps {
  value: PaletteId
  onChange: (paletteId: PaletteId) => void
}

export function PalettePicker({ value, onChange }: PalettePickerProps) {
  return (
    <div>
      <label htmlFor="theme-palette" className="block text-sm font-medium text-ink">
        Palet warna
      </label>
      <select
        id="theme-palette"
        value={value}
        onChange={(event) => onChange(event.target.value as PaletteId)}
        className="mt-1 min-h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-body"
      >
        {PALETTES.map((palette) => (
          <option key={palette.id} value={palette.id}>
            {palette.name}
          </option>
        ))}
      </select>
    </div>
  )
}
