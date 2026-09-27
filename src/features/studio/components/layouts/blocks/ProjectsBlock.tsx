import type { ProjectItem } from '../../../schema'

interface ProjectsBlockProps {
  projects: ProjectItem[]
}

export function ProjectsBlock({ projects }: ProjectsBlockProps) {
  if (projects.length === 0) return null

  return (
    <section>
      <h3
        className="text-sm font-semibold uppercase tracking-wide text-[var(--portfolio-muted)]"
        style={{ fontFamily: 'var(--portfolio-font-heading)' }}
      >
        Proyek
      </h3>
      <ul className="mt-2 space-y-2">
        {projects.map((item) => (
          <li key={item.id} className="text-[var(--portfolio-ink)]">
            {item.title || 'Judul proyek'}
          </li>
        ))}
      </ul>
    </section>
  )
}
