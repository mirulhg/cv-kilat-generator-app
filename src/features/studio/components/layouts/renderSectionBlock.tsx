import type { Portfolio } from '../../schema'
import type { Section } from '../../sections/schema'
import { SummaryBlock } from './blocks/SummaryBlock'
import { ExperienceBlock } from './blocks/ExperienceBlock'
import { EducationBlock } from './blocks/EducationBlock'
import { SkillsBlock } from './blocks/SkillsBlock'
import { ProjectsBlock } from './blocks/ProjectsBlock'
import { ContactBlock } from './blocks/ContactBlock'
import { CustomBlock } from './blocks/CustomBlock'

export function renderSectionBlock(section: Section, portfolio: Portfolio) {
  switch (section.kind) {
    case 'ringkasan':
      return <SummaryBlock key={section.id} summary={portfolio.summary} />
    case 'pengalaman':
      return <ExperienceBlock key={section.id} experience={portfolio.experience} />
    case 'pendidikan':
      return <EducationBlock key={section.id} education={portfolio.education} />
    case 'keahlian':
      return <SkillsBlock key={section.id} skills={portfolio.skills} />
    case 'proyek':
      return <ProjectsBlock key={section.id} projects={portfolio.projects} />
    case 'kontak':
      return <ContactBlock key={section.id} contact={portfolio.contact} />
    case 'custom':
      return <CustomBlock key={section.id} title={section.title} body={section.body} />
  }
}

export function sortVisibleSections(sections: Section[]): Section[] {
  return sections.filter((section) => section.enabled).sort((a, b) => a.order - b.order)
}
