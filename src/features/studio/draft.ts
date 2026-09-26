import { z } from 'zod'
import { portfolioSchema } from './schema'

export const draftSchema = z.object({
  id: z.literal('current-draft'),
  portfolio: portfolioSchema,
  updatedAt: z.string().datetime(),
})

export type Draft = z.infer<typeof draftSchema>
