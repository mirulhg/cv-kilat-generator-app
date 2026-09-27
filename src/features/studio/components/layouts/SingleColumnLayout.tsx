import type { Portfolio } from '../../schema'
import type { Section } from '../../sections/schema'
import { HeaderBlock } from './blocks/HeaderBlock'
import { renderSectionBlock, sortVisibleSections } from './renderSectionBlock'

interface SingleColumnLayoutProps {
  portfolio: Portfolio
  sections: Section[]
}

export function SingleColumnLayout({ portfolio, sections }: SingleColumnLayoutProps) {
  const visibleSections = sortVisibleSections(sections)

  return (
    <div className="space-y-6">
      <HeaderBlock profile={portfolio.profile} />
      {visibleSections.map((section) => renderSectionBlock(section, portfolio))}
    </div>
  )
}
