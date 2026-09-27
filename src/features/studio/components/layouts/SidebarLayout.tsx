import type { Portfolio } from '../../schema'
import type { Section } from '../../sections/schema'
import { HeaderBlock } from './blocks/HeaderBlock'
import { renderSectionBlock, sortVisibleSections } from './renderSectionBlock'

interface SidebarLayoutProps {
  portfolio: Portfolio
  sections: Section[]
}

const SIDEBAR_KINDS = new Set(['kontak', 'keahlian'])

export function SidebarLayout({ portfolio, sections }: SidebarLayoutProps) {
  const visibleSections = sortVisibleSections(sections)
  const sidebarSections = visibleSections.filter((section) => SIDEBAR_KINDS.has(section.kind))
  const mainSections = visibleSections.filter((section) => !SIDEBAR_KINDS.has(section.kind))

  return (
    <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
      <div className="space-y-6">
        <HeaderBlock profile={portfolio.profile} />
        {sidebarSections.map((section) => renderSectionBlock(section, portfolio))}
      </div>

      <div className="space-y-6">
        {mainSections.map((section) => renderSectionBlock(section, portfolio))}
      </div>
    </div>
  )
}
