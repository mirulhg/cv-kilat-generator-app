import type { ReactNode } from 'react'
import { Button } from '@/components/ui/Button'

interface RepeatableListProps<T extends { id: string }> {
  items: T[]
  onAdd: () => void
  onRemove: (index: number) => void
  addLabel: string
  renderItem: (item: T, index: number) => ReactNode
}

export function RepeatableList<T extends { id: string }>({
  items,
  onAdd,
  onRemove,
  addLabel,
  renderItem,
}: RepeatableListProps<T>) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id} className="rounded-md border border-border p-4">
          {renderItem(item, index)}
          <Button type="button" variant="danger" onClick={() => onRemove(index)} className="mt-3">
            Hapus
          </Button>
        </div>
      ))}

      <Button type="button" variant="ghost" onClick={onAdd}>
        {addLabel}
      </Button>
    </div>
  )
}
