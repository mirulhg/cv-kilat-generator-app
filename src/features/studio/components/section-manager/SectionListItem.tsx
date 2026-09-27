import type { DragEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { TextareaField } from '@/components/ui/TextareaField'
import type { Section } from '../../sections/schema'

interface SectionListItemProps {
  section: Section
  label: string
  isFirst: boolean
  isLast: boolean
  onToggle: (id: string) => void
  onMoveUp: (id: string) => void
  onMoveDown: (id: string) => void
  onUpdateCustomField: (id: string, field: 'title' | 'body', value: string) => void
  onRemoveCustom: (id: string) => void
  onDragStart: (id: string) => void
  onDragOver: (event: DragEvent) => void
  onDrop: (id: string) => void
}

export function SectionListItem({
  section,
  label,
  isFirst,
  isLast,
  onToggle,
  onMoveUp,
  onMoveDown,
  onUpdateCustomField,
  onRemoveCustom,
  onDragStart,
  onDragOver,
  onDrop,
}: SectionListItemProps) {
  return (
    <li
      draggable
      onDragStart={() => onDragStart(section.id)}
      onDragOver={onDragOver}
      onDrop={() => onDrop(section.id)}
      className="rounded-md border border-border bg-surface p-4"
    >
      <div className="flex flex-wrap items-center gap-3">
        <span aria-hidden="true" className="cursor-grab text-muted">
          ⠿
        </span>

        <span className="flex-1 font-medium text-ink">{label}</span>

        <label className="flex items-center gap-2 text-sm text-body">
          <input
            type="checkbox"
            checked={section.enabled}
            onChange={() => onToggle(section.id)}
            className="h-4 w-4 rounded border-border"
          />
          Tampilkan
        </label>

        <div className="flex gap-1">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onMoveUp(section.id)}
            disabled={isFirst}
            aria-label={`Naikkan urutan ${label}`}
          >
            Naik
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => onMoveDown(section.id)}
            disabled={isLast}
            aria-label={`Turunkan urutan ${label}`}
          >
            Turun
          </Button>
        </div>

        {section.kind === 'custom' && (
          <Button type="button" variant="danger" onClick={() => onRemoveCustom(section.id)}>
            Hapus
          </Button>
        )}
      </div>

      {section.kind === 'custom' && (
        <div className="mt-3 space-y-3">
          <TextField
            label="Judul bagian"
            value={section.title}
            onChange={(event) => onUpdateCustomField(section.id, 'title', event.target.value)}
          />
          <TextareaField
            label='Isi bagian (baris diawali "- " jadi daftar berpoin)'
            value={section.body}
            onChange={(event) => onUpdateCustomField(section.id, 'body', event.target.value)}
          />
        </div>
      )}
    </li>
  )
}
