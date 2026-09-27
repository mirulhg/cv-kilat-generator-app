import type { Contact } from '../../../schema'

interface ContactBlockProps {
  contact: Contact
}

export function ContactBlock({ contact }: ContactBlockProps) {
  return (
    <section>
      <h3
        className="text-sm font-semibold uppercase tracking-wide text-[var(--portfolio-muted)]"
        style={{ fontFamily: 'var(--portfolio-font-heading)' }}
      >
        Kontak
      </h3>
      <p className="mt-2 text-[var(--portfolio-body)]">{contact.email || 'email@contoh.com'}</p>
    </section>
  )
}
