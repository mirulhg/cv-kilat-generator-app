import type { GalleryTemplate } from '../schema'

interface TemplateCardProps {
  template: GalleryTemplate
  onView: () => void
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function TemplateCard({ template, onView }: TemplateCardProps) {
  return (
    <button
      type="button"
      onClick={onView}
      className="flex min-h-11 flex-col items-start gap-3 rounded-lg border border-border bg-surface p-5 text-left shadow-subtle hover:border-primary"
    >
      <span
        aria-hidden="true"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-fg"
      >
        {getInitials(template.name)}
      </span>

      <span className="block font-semibold text-ink">{template.name}</span>
      <span className="block text-sm text-muted">{template.headline}</span>

      <span className="rounded-full border border-border px-2 py-0.5 text-xs text-body">
        {template.category}
      </span>
    </button>
  )
}
