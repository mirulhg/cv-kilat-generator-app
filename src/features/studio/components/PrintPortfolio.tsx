import { PreviewContent } from './PreviewContent'
import { themeToCssVars } from '../theme/cssVars'
import type { Portfolio } from '../schema'
import type { Theme } from '../theme/schema'
import type { Section } from '../sections/schema'

interface PrintPortfolioProps {
  portfolio: Portfolio
  theme: Theme
  sections: Section[]
}

export function PrintPortfolio({ portfolio, theme, sections }: PrintPortfolioProps) {
  const printTheme: Theme = { ...theme, colorMode: 'light' }

  return (
    <div
      className="print-portfolio hidden bg-[var(--portfolio-bg)] print:block"
      style={themeToCssVars(printTheme)}
    >
      <div style={{ fontFamily: 'var(--portfolio-font-body)' }}>
        <PreviewContent portfolio={portfolio} theme={printTheme} sections={sections} />
      </div>
    </div>
  )
}
