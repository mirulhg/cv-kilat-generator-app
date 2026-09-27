import { useState } from 'react'
import type { DragEvent } from 'react'
import { getSectionLabel, type Section } from '../../sections/schema'
import { SectionListItem } from './SectionListItem'
import { AddCustomSectionForm } from './AddCustomSectionForm'

interface SectionsPanelProps {
  sections: Section[]
  onSectionsChange: (sections: Section[]) => void
}

function reindex(sections: Section[]): Section[] {
  return sections.map((section, index) => ({ ...section, order: index }))
}

function sortByOrder(sections: Section[]): Section[] {
  return [...sections].sort((a, b) => a.order - b.order)
}

export function SectionsPanel({ sections, onSectionsChange }: SectionsPanelProps) {
  const [draggedId, setDraggedId] = useState<string>()
  const sorted = sortByOrder(sections)

  function toggle(id: string) {
    onSectionsChange(
      sections.map((section) =>
        section.id === id ? { ...section, enabled: !section.enabled } : section,
      ),
    )
  }

  function move(id: string, direction: 'up' | 'down') {
    const index = sorted.findIndex((section) => section.id === id)
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= sorted.length) return

    const reordered = [...sorted]
    ;[reordered[index], reordered[targetIndex]] = [reordered[targetIndex], reordered[index]]
    onSectionsChange(reindex(reordered))
  }

  function handleDrop(targetId: string) {
    if (!draggedId || draggedId === targetId) return
    const fromIndex = sorted.findIndex((section) => section.id === draggedId)
    const toIndex = sorted.findIndex((section) => section.id === targetId)
    const reordered = [...sorted]
    const [moved] = reordered.splice(fromIndex, 1)
    reordered.splice(toIndex, 0, moved)
    onSectionsChange(reindex(reordered))
    setDraggedId(undefined)
  }

  function updateCustomField(id: string, field: 'title' | 'body', value: string) {
    onSectionsChange(
      sections.map((section) =>
        section.id === id && section.kind === 'custom' ? { ...section, [field]: value } : section,
      ),
    )
  }

  function removeCustom(id: string) {
    onSectionsChange(reindex(sections.filter((section) => section.id !== id)))
  }

  function addCustom(title: string, body: string) {
    onSectionsChange([
      ...sections,
      { id: crypto.randomUUID(), kind: 'custom', enabled: true, order: sections.length, title, body },
    ])
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault()
  }

  return (
    <section aria-labelledby="sections-panel-heading" className="space-y-4">
      <h2 id="sections-panel-heading" className="text-lg font-semibold text-ink">
        Pilih Bagian Tampil
      </h2>

      <ul className="space-y-3">
        {sorted.map((section, index) => (
          <SectionListItem
            key={section.id}
            section={section}
            label={getSectionLabel(section)}
            isFirst={index === 0}
            isLast={index === sorted.length - 1}
            onToggle={toggle}
            onMoveUp={(id) => move(id, 'up')}
            onMoveDown={(id) => move(id, 'down')}
            onUpdateCustomField={updateCustomField}
            onRemoveCustom={removeCustom}
            onDragStart={setDraggedId}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
      </ul>

      <AddCustomSectionForm onAdd={addCustom} />
    </section>
  )
}
