import { Avatar } from './Avatar'
import { HighlightBlock } from './HighlightBlock'
import { getCardHighlight } from './getCardHighlight'
import { CARD_DIMENSIONS, type CardVariant } from './cardVariant'
import { themeToCssVars } from '../../theme/cssVars'
import type { Portfolio } from '../../schema'
import type { Theme } from '../../theme/schema'

interface SummaryCardProps {
  portfolio: Portfolio
  theme: Theme
  variant: CardVariant
}

export function SummaryCard({ portfolio, theme, variant }: SummaryCardProps) {
  const { width, height } = CARD_DIMENSIONS[variant]
  const highlight = getCardHighlight(portfolio)
  const isSquare = variant === 'square'

  return (
    <div
      style={{
        width,
        height,
        ...themeToCssVars(theme),
        fontFamily: 'var(--portfolio-font-body)',
      }}
      className={`flex bg-[var(--portfolio-bg)] p-20 ${
        isSquare
          ? 'flex-col items-center justify-center gap-8 text-center'
          : 'flex-row items-center gap-12 text-left'
      }`}
    >
      <Avatar profile={portfolio.profile} size={isSquare ? 280 : 220} />

      <div className={`flex flex-col gap-4 ${isSquare ? 'items-center' : 'items-start'}`}>
        <div>
          <p
            style={{ fontFamily: 'var(--portfolio-font-heading)', fontSize: isSquare ? 56 : 48 }}
            className="font-semibold text-[var(--portfolio-ink)]"
          >
            {portfolio.profile.fullName || 'Nama Lengkap'}
          </p>
          <p
            style={{ fontSize: isSquare ? 30 : 26 }}
            className="text-[var(--portfolio-body)]"
          >
            {portfolio.profile.headline || 'Headline profesi'}
          </p>
        </div>

        {highlight && <HighlightBlock highlight={highlight} isSquare={isSquare} />}
      </div>
    </div>
  )
}
