import type { EducationItem } from '../../../schema'

interface EducationBlockProps {
  education: EducationItem[]
}

export function EducationBlock({ education }: EducationBlockProps) {
  if (education.length === 0) return null

  return (
    <section>
      <h3
        className="text-sm font-semibold uppercase tracking-wide text-[var(--portfolio-muted)]"
        style={{ fontFamily: 'var(--portfolio-font-heading)' }}
      >
        Pendidikan
      </h3>
      <ul className="mt-2 space-y-2">
        {education.map((item) => (
          <li key={item.id} className="text-[var(--portfolio-ink)]">
            {item.degree || 'Jenjang'} — {item.institution || 'Institusi'}
          </li>
        ))}
      </ul>
    </section>
  )
}
