import type { Portfolio } from '../../schema'
import type { Section } from '../../sections/schema'
import { HeaderBlock } from './blocks/HeaderBlock'
import { renderSectionBlock, sortVisibleSections } from './renderSectionBlock'

interface TwoColumnLayoutProps {
  portfolio: Portfolio
  sections: Section[]
}

const LEFT_COLUMN_KINDS = new Set(['ringkasan', 'pengalaman', 'pendidikan'])

export function TwoColumnLayout({ portfolio, sections }: TwoColumnLayoutProps) {
  const visibleSections = sortVisibleSections(sections)
  const leftSections = visibleSections.filter((section) => LEFT_COLUMN_KINDS.has(section.kind))
  const rightSections = visibleSections.filter((section) => !LEFT_COLUMN_KINDS.has(section.kind))

  return (
    <div className="space-y-6">
      <HeaderBlock profile={portfolio.profile} />

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-6">{leftSections.map((section) => renderSectionBlock(section, portfolio))}</div>
        <div className="space-y-6">{rightSections.map((section) => renderSectionBlock(section, portfolio))}</div>
      </div>
    </div>
  )
}
