import type { Profile } from '../../../schema'

interface HeaderBlockProps {
  profile: Profile
}

export function HeaderBlock({ profile }: HeaderBlockProps) {
  return (
    <header>
      <p
        className="text-xl font-semibold text-[var(--portfolio-ink)]"
        style={{ fontFamily: 'var(--portfolio-font-heading)' }}
      >
        {profile.fullName || 'Nama Lengkap'}
      </p>
      <p className="text-[var(--portfolio-body)]">{profile.headline || 'Headline profesi'}</p>
    </header>
  )
}
