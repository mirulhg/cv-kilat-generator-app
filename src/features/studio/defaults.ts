import type { Portfolio } from './schema'

export function createEmptyPortfolio(): Portfolio {
  return {
    profile: { fullName: '', headline: '' },
    summary: { text: '' },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    contact: { email: '', links: [] },
  }
}
