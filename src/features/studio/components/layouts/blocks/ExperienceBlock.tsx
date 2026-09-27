import type { ExperienceItem } from '../../../schema'

interface ExperienceBlockProps {
  experience: ExperienceItem[]
}

export function ExperienceBlock({ experience }: ExperienceBlockProps) {
  if (experience.length === 0) return null

  return (
    <section>
      <h3
        className="text-sm font-semibold uppercase tracking-wide text-[var(--portfolio-muted)]"
        style={{ fontFamily: 'var(--portfolio-font-heading)' }}
      >
        Pengalaman
      </h3>
      <ul className="mt-2 space-y-2">
        {experience.map((item) => (
          <li key={item.id}>
            <p className="font-medium text-[var(--portfolio-ink)]">
              {item.role || 'Jabatan'} — {item.company || 'Perusahaan'}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
