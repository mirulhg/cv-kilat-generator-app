import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { portfolioSchema, type Portfolio } from '../schema'
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

interface PortfolioFormProps {
  defaultValues: Portfolio
}

export function PortfolioForm({ defaultValues }: PortfolioFormProps) {
  const methods = useForm<Portfolio>({
    resolver: zodResolver(portfolioSchema),
    defaultValues,
    mode: 'onBlur',
  })

  const portfolio = useWatch({ control: methods.control }) as Portfolio
  const { status, retry } = useAutosaveDraft(portfolio)

  return (
    <FormProvider {...methods}>
      <div className="grid gap-8 lg:grid-cols-2">
        <form className="space-y-8" onSubmit={(event) => event.preventDefault()}>
          <AutosaveStatus status={status} onRetry={retry} />
          <ProfileSection />
          <SummarySection />
          <ExperienceSection />
          <EducationSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </form>

        <PreviewPane portfolio={portfolio} />
      </div>
    </FormProvider>
  )
}
