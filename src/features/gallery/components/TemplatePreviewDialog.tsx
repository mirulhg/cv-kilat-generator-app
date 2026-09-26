import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import type { GalleryTemplate } from '../schema'

interface TemplatePreviewDialogProps {
  template: GalleryTemplate | undefined
  onClose: () => void
  onApply: (template: GalleryTemplate) => void
}

export function TemplatePreviewDialog({ template, onClose, onApply }: TemplatePreviewDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Membuka/menutup elemen <dialog> native mengikuti template yang dipilih.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (template) {
      dialog.showModal()
    } else if (dialog.open) {
      dialog.close()
    }
  }, [template])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="w-full max-w-lg rounded-lg border border-border bg-surface p-6 shadow-elevated backdrop:bg-ink/40"
    >
      {template && (
        <div className="space-y-4">
          <header>
            <p className="text-xl font-semibold text-ink">{template.name}</p>
            <p className="text-body">{template.headline}</p>
            <p className="text-sm text-muted">{template.category}</p>
          </header>

          {template.portfolio.summary.text && (
            <p className="text-body">{template.portfolio.summary.text}</p>
          )}

          {template.portfolio.skills.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {template.portfolio.skills.map((skill) => (
                <li
                  key={skill.id}
                  className="rounded-full border border-border px-2 py-0.5 text-xs text-body"
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          )}

          <div className="flex justify-end gap-4 pt-2">
            <button type="button" onClick={onClose} className="min-h-11 text-sm text-body underline">
              Tutup
            </button>
            <Button type="button" onClick={() => onApply(template)}>
              Pakai contoh ini
            </Button>
          </div>
        </div>
      )}
    </dialog>
  )
}
