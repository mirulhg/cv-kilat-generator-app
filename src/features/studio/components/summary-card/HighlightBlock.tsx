import type { CardHighlight } from './getCardHighlight'

interface HighlightBlockProps {
  highlight: NonNullable<CardHighlight>
  isSquare: boolean
}

export function HighlightBlock({ highlight, isSquare }: HighlightBlockProps) {
  if (highlight.type === 'experience') {
    return (
      <p
        style={{ fontSize: isSquare ? 26 : 24 }}
        className="text-[var(--portfolio-body)]"
      >
        {highlight.role} · {highlight.company}
      </p>
    )
  }

  return (
    <div className={`flex flex-wrap gap-3 ${isSquare ? 'justify-center' : 'justify-start'}`}>
      {highlight.items.map((name) => (
        <span
          key={name}
          style={{ fontSize: isSquare ? 24 : 22 }}
          className="rounded-full border border-[var(--portfolio-border)] px-6 py-2 text-[var(--portfolio-body)]"
        >
          {name}
        </span>
      ))}
    </div>
  )
}
