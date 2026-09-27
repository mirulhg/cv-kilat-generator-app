import { parseCustomBody } from './parseCustomBody'

interface CustomBlockProps {
  title: string
  body: string
}

export function CustomBlock({ title, body }: CustomBlockProps) {
  const blocks = parseCustomBody(body)
  if (blocks.length === 0) return null

  return (
    <section>
      <h3
        className="text-sm font-semibold uppercase tracking-wide text-[var(--portfolio-muted)]"
        style={{ fontFamily: 'var(--portfolio-font-heading)' }}
      >
        {title || 'Bagian Kustom'}
      </h3>
      <div className="mt-2 space-y-2">
        {blocks.map((block, index) =>
          block.type === 'list' ? (
            <ul key={index} className="list-disc space-y-1 pl-5 text-[var(--portfolio-body)]">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          ) : (
            <p key={index} className="text-[var(--portfolio-body)]">
              {block.text}
            </p>
          ),
        )}
      </div>
    </section>
  )
}
