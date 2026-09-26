import { z } from 'zod'
import { ALLOWED_IMAGE_TYPES } from './constants'

export const imageRefSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(ALLOWED_IMAGE_TYPES),
  sizeBytes: z.number().int().positive(),
})

export const profileSchema = z.object({
  fullName: z.string().min(1, 'Nama lengkap wajib diisi'),
  headline: z.string().min(1, 'Ringkasan profesi wajib diisi'),
  photo: imageRefSchema.optional(),
})

export const summarySchema = z.object({
  text: z.string().min(1, 'Ringkasan wajib diisi'),
})

export const experienceItemSchema = z.object({
  id: z.string().uuid(),
  role: z.string().min(1, 'Jabatan wajib diisi'),
  company: z.string().min(1, 'Nama perusahaan wajib diisi'),
  startDate: z.string().min(1, 'Tanggal mulai wajib diisi'),
  endDate: z.string().min(1).optional(),
  isCurrent: z.boolean(),
  description: z.string().optional(),
})

export const educationItemSchema = z.object({
  id: z.string().uuid(),
  institution: z.string().min(1, 'Nama institusi wajib diisi'),
  degree: z.string().min(1, 'Jenjang/gelar wajib diisi'),
  startDate: z.string().min(1, 'Tanggal mulai wajib diisi'),
  endDate: z.string().min(1).optional(),
})

export const skillSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Nama keahlian wajib diisi'),
})

export const projectItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'Judul proyek wajib diisi'),
  description: z.string().optional(),
  url: z.string().url().optional(),
  image: imageRefSchema.optional(),
})

export const contactLinkSchema = z.object({
  id: z.string().uuid(),
  label: z.string().min(1, 'Label tautan wajib diisi'),
  url: z.string().url(),
})

export const contactSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  phone: z.string().optional(),
  location: z.string().optional(),
  links: z.array(contactLinkSchema),
})

export const portfolioSchema = z.object({
  profile: profileSchema,
  summary: summarySchema,
  experience: z.array(experienceItemSchema),
  education: z.array(educationItemSchema),
  skills: z.array(skillSchema),
  projects: z.array(projectItemSchema),
  contact: contactSchema,
})

export type ImageRef = z.infer<typeof imageRefSchema>
export type Profile = z.infer<typeof profileSchema>
export type Summary = z.infer<typeof summarySchema>
export type ExperienceItem = z.infer<typeof experienceItemSchema>
export type EducationItem = z.infer<typeof educationItemSchema>
export type Skill = z.infer<typeof skillSchema>
export type ProjectItem = z.infer<typeof projectItemSchema>
export type ContactLink = z.infer<typeof contactLinkSchema>
export type Contact = z.infer<typeof contactSchema>
export type Portfolio = z.infer<typeof portfolioSchema>
