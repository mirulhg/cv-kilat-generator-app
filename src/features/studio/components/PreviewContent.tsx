import type { Portfolio } from '../schema'

interface PreviewContentProps {
  portfolio: Portfolio
}

export function PreviewContent({ portfolio }: PreviewContentProps) {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xl font-semibold text-ink">
          {portfolio.profile.fullName || 'Nama Lengkap'}
        </p>
        <p className="text-body">{portfolio.profile.headline || 'Headline profesi'}</p>
      </header>

      {portfolio.summary.text && <p className="text-body">{portfolio.summary.text}</p>}

      {portfolio.experience.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">Pengalaman</h3>
          <ul className="mt-2 space-y-2">
            {portfolio.experience.map((item) => (
              <li key={item.id}>
                <p className="font-medium text-ink">
                  {item.role || 'Jabatan'} — {item.company || 'Perusahaan'}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {portfolio.education.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">Pendidikan</h3>
          <ul className="mt-2 space-y-2">
            {portfolio.education.map((item) => (
              <li key={item.id} className="text-ink">
                {item.degree || 'Jenjang'} — {item.institution || 'Institusi'}
              </li>
            ))}
          </ul>
        </section>
      )}

      {portfolio.skills.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">Keahlian</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {portfolio.skills.map((item) => (
              <li
                key={item.id}
                className="rounded-full border border-border px-3 py-1 text-sm text-body"
              >
                {item.name || 'Keahlian'}
              </li>
            ))}
          </ul>
        </section>
      )}

      {portfolio.projects.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">Proyek</h3>
          <ul className="mt-2 space-y-2">
            {portfolio.projects.map((item) => (
              <li key={item.id} className="text-ink">
                {item.title || 'Judul proyek'}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">Kontak</h3>
        <p className="mt-2 text-body">{portfolio.contact.email || 'email@contoh.com'}</p>
      </section>
    </div>
  )
}
