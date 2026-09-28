import type { Portfolio } from '../../schema'

export type CardHighlight =
  | { type: 'skills'; items: string[] }
  | { type: 'experience'; role: string; company: string }
  | undefined

export function getCardHighlight(portfolio: Portfolio): CardHighlight {
  const skillNames = portfolio.skills.map((skill) => skill.name).filter(Boolean)
  if (skillNames.length > 0) {
    return { type: 'skills', items: skillNames.slice(0, 3) }
  }

  const experience = portfolio.experience.find((item) => item.isCurrent) ?? portfolio.experience[0]
  if (experience) {
    return { type: 'experience', role: experience.role, company: experience.company }
  }

  return undefined
}
