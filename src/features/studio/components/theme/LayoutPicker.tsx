import { LAYOUTS, type LayoutId } from '../../theme/layouts'

interface LayoutPickerProps {
  value: LayoutId
  onChange: (layoutId: LayoutId) => void
}

export function LayoutPicker({ value, onChange }: LayoutPickerProps) {
  const activeLayout = LAYOUTS.find((layout) => layout.id === value)

  return (
    <div>
      <label htmlFor="theme-layout" className="block text-sm font-medium text-ink">
        Tata letak
      </label>
      <select
        id="theme-layout"
        value={value}
        onChange={(event) => onChange(event.target.value as LayoutId)}
        className="mt-1 min-h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-body"
      >
        {LAYOUTS.map((layout) => (
          <option key={layout.id} value={layout.id}>
            {layout.name}
          </option>
        ))}
      </select>
      {activeLayout && <p className="mt-1 text-sm text-muted">{activeLayout.description}</p>}
    </div>
  )
}
