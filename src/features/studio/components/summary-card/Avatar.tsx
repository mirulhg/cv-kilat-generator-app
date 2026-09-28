import { useImageObjectUrl } from '../../hooks/useImageObjectUrl'
import type { Profile } from '../../schema'

interface AvatarProps {
  profile: Profile
  size: number
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function Avatar({ profile, size }: AvatarProps) {
  const photoUrl = useImageObjectUrl(profile.photo?.id)
  const style = { width: size, height: size }

  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt=""
        style={style}
        className="shrink-0 rounded-full object-cover"
      />
    )
  }

  return (
    <div
      aria-hidden="true"
      style={{ ...style, fontSize: size * 0.36 }}
      className="flex shrink-0 items-center justify-center rounded-full bg-[var(--portfolio-primary)] font-semibold text-[var(--portfolio-primary-fg)]"
    >
      {getInitials(profile.fullName || '?')}
    </div>
  )
}
