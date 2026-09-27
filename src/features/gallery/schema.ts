import { z } from 'zod'
import { portfolioSchema, themeSchema } from '@/features/studio'
import { GALLERY_CATEGORIES } from './constants'

export const galleryCategorySchema = z.enum(GALLERY_CATEGORIES)

export const galleryTemplateSchema = z.object({
  id: z.string().uuid(),
  category: galleryCategorySchema,
  name: z.string().min(1),
  headline: z.string().min(1),
  portfolio: portfolioSchema,
  theme: themeSchema,
})

export const galleryTemplatesSchema = z.array(galleryTemplateSchema)

export type GalleryCategory = z.infer<typeof galleryCategorySchema>
export type GalleryTemplate = z.infer<typeof galleryTemplateSchema>
