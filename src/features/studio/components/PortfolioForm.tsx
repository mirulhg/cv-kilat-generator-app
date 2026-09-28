import { useState } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { portfolioSchema, type Portfolio } from '../schema'
import type { Theme } from '../theme/schema'
import type { Section } from '../sections/schema'
import { useAutosaveDraft } from '../hooks/useAutosaveDraft'
import { ProfileSection } from './sections/ProfileSection'
import { SummarySection } from './sections/SummarySection'
import { ExperienceSection } from './sections/ExperienceSection'
import { EducationSection } from './sections/EducationSection'
import { SkillsSection } from './sections/SkillsSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { ContactSection } from './sections/ContactSection'
import { AutosaveStatus } from './AutosaveStatus'
import { PreviewPane } from './PreviewPane'
import { ThemePanel } from './theme/ThemePanel'
import { SectionsPanel } from './section-manager/SectionsPanel'
import { DownloadPdfButton } from './DownloadPdfButton'
import { PrintPortfolio } from './PrintPortfolio'

interface PortfolioFormProps {
  defaultValues: Portfolio
  defaultTheme: Theme
  defaultSections: Section[]
}

export function PortfolioForm({ defaultValues, defaultTheme, defaultSections }: PortfolioFormProps) {
  const [theme, setTheme] = useState(defaultTheme)
  const [sections, setSections] = useState(defaultSections)

  const methods = useForm<Portfolio>({
    resolver: zodResolver(portfolioSchema),
    defaultValues,
    mode: 'onBlur',
  })

  const portfolio = useWatch({ control: methods.control }) as Portfolio
  const { status, retry } = useAutosaveDraft(portfolio, theme, sections)

  return (
    <FormProvider {...methods}>
      <DownloadPdfButton portfolio={portfolio} />

      <div className="grid gap-8 lg:grid-cols-2 print:hidden">
        <form className="space-y-8" onSubmit={(event) => event.preventDefault()}>
          <AutosaveStatus status={status} onRetry={retry} />
          <ThemePanel theme={theme} onThemeChange={setTheme} />
          <SectionsPanel sections={sections} onSectionsChange={setSections} />
          <ProfileSection />
          <SummarySection />
          <ExperienceSection />
          <EducationSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </form>

        <PreviewPane portfolio={portfolio} theme={theme} sections={sections} />
      </div>

      <PrintPortfolio portfolio={portfolio} theme={theme} sections={sections} />
    </FormProvider>
  )
}
