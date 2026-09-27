import type { Skill } from '../../../schema'

interface SkillsBlockProps {
  skills: Skill[]
}

export function SkillsBlock({ skills }: SkillsBlockProps) {
  if (skills.length === 0) return null

  return (
    <section>
      <h3
        className="text-sm font-semibold uppercase tracking-wide text-[var(--portfolio-muted)]"
        style={{ fontFamily: 'var(--portfolio-font-heading)' }}
      >
        Keahlian
      </h3>
      <ul className="mt-2 flex flex-wrap gap-2">
        {skills.map((item) => (
          <li
            key={item.id}
            className="rounded-full border border-[var(--portfolio-border)] px-3 py-1 text-sm text-[var(--portfolio-body)]"
          >
            {item.name || 'Keahlian'}
          </li>
        ))}
      </ul>
    </section>
  )
}
