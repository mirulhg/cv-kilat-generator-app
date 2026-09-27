import { FONT_PAIRS, type FontPairId } from '../../theme/fontPairs'

interface FontPairPickerProps {
  value: FontPairId
  onChange: (fontPairId: FontPairId) => void
}

export function FontPairPicker({ value, onChange }: FontPairPickerProps) {
  return (
    <div>
      <label htmlFor="theme-font-pair" className="block text-sm font-medium text-ink">
        Gaya huruf
      </label>
      <select
        id="theme-font-pair"
        value={value}
        onChange={(event) => onChange(event.target.value as FontPairId)}
        className="mt-1 min-h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-body"
      >
        {FONT_PAIRS.map((fontPair) => (
          <option key={fontPair.id} value={fontPair.id}>
            {fontPair.name}
          </option>
        ))}
      </select>
    </div>
  )
}
