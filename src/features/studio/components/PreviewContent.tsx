import type { Portfolio } from '../schema'
import type { Theme } from '../theme/schema'
import type { Section } from '../sections/schema'
import { SingleColumnLayout } from './layouts/SingleColumnLayout'
import { SidebarLayout } from './layouts/SidebarLayout'
import { TwoColumnLayout } from './layouts/TwoColumnLayout'

interface PreviewContentProps {
  portfolio: Portfolio
  theme: Theme
  sections: Section[]
}

export function PreviewContent({ portfolio, theme, sections }: PreviewContentProps) {
  if (theme.layoutId === 'sidebar-left') {
    return <SidebarLayout portfolio={portfolio} sections={sections} />
  }
  if (theme.layoutId === 'two-column') {
    return <TwoColumnLayout portfolio={portfolio} sections={sections} />
  }
  return <SingleColumnLayout portfolio={portfolio} sections={sections} />
}
