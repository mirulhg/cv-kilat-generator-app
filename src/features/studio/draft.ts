import { z } from 'zod'
import { portfolioSchema } from './schema'
import { themeSchema, DEFAULT_THEME } from './theme/schema'
import { sectionSchema, createDefaultSections } from './sections/schema'

export const draftSchema = z.object({
  id: z.literal('current-draft'),
  portfolio: portfolioSchema,
  theme: themeSchema.default(DEFAULT_THEME),
  sections: z.array(sectionSchema).default(createDefaultSections),
  updatedAt: z.string().datetime(),
})

export type Draft = z.infer<typeof draftSchema>
