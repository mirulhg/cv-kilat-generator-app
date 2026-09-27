import { z } from 'zod'
import { ALLOWED_IMAGE_TYPES } from './constants'

// React Hook Form mengirim input kosong sebagai '', bukan undefined — field opsional
// harus menoleransi keduanya. Pakai .transform() (bukan .preprocess()) supaya tipe input
// tetap `string | undefined`, bukan `unknown`, agar tetap cocok dengan Resolver<Portfolio>.
const optionalString = z
  .string()
  .transform((value) => (value === '' ? undefined : value))
  .optional()
const optionalUrlString = z
  .string()
  .transform((value) => (value === '' ? undefined : value))
  .pipe(z.string().url().optional())
  .optional()

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
  endDate: optionalString,
  isCurrent: z.boolean(),
  description: z.string().optional(),
})

export const educationItemSchema = z.object({
  id: z.string().uuid(),
  institution: z.string().min(1, 'Nama institusi wajib diisi'),
  degree: z.string().min(1, 'Jenjang/gelar wajib diisi'),
  startDate: z.string().min(1, 'Tanggal mulai wajib diisi'),
  endDate: optionalString,
})

export const skillSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Nama keahlian wajib diisi'),
})

export const projectItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'Judul proyek wajib diisi'),
  description: z.string().optional(),
  url: optionalUrlString,
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

/**
 * Skema longgar dipakai KHUSUS saat membaca draf tersimpan dari IndexedDB
 * (lihat parseDraftRecord.ts). `portfolioSchema` di atas tetap dipakai apa adanya
 * oleh zodResolver di form (pesan "wajib diisi" tetap tampil saat mengetik).
 *
 * Masalah: field wajib (mis. contactLinkSchema.label/url, experienceItemSchema.role)
 * bisa untuk sementara berisi '' — form mengizinkan entri baru ditambah kosong (RepeatableList
 * "Tambah ..."), dan field top-level (profile.fullName, summary.text, contact.email) dimulai
 * '' dari createEmptyPortfolio(). Autosave (~2 detik) menulis draf tanpa menunggu semua field
 * wajib terisi. Kalau draf itu dibaca ulang lewat `portfolioSchema` yang ketat, seluruh
 * portofolio dianggap korup dan HILANG — bukan cuma bagian yang belum diisi.
 *
 * Solusinya BUKAN menghapus skema ini: skema ini sengaja hanya melonggarkan constraint
 * (min length/format) pada field yang di atas, sambil tetap memvalidasi bentuk/tipe data.
 * Kalau menambah field wajib baru ke salah satu skema portofolio, tambahkan juga padanannya
 * di sini — ada test (parseDraftRecord.test.ts) yang membandingkan key-set kedua skema ini
 * dan akan gagal kalau keduanya tidak lagi sinkron.
 *
 * JEBAKAN yang sudah pernah terjadi: jangan pakai ulang konstanta yang masih membawa
 * validator format ketat (mis. `optionalUrlString`, yang tetap memvalidasi `.url()` untuk
 * nilai non-kosong) di sini — field bertipe string di skema INI harus `z.string()`/
 * `z.string().optional()` polos, tanpa `.url()`/`.email()`/format apa pun, karena draf
 * tersimpan bisa berisi teks belum-valid ("beebaeb") yang autosave tulis apa adanya.
 * Test anti-drift key-set TIDAK menangkap ini (field-nya tetap ada di kedua skema) — yang
 * menangkap adalah test toleransi nilai di parseDraftRecord.test.ts.
 */
const draftProfileSchema = z.object({
  fullName: z.string(),
  headline: z.string(),
  photo: imageRefSchema.optional(),
})

const draftSummarySchema = z.object({
  text: z.string(),
})

const draftExperienceItemSchema = z.object({
  id: z.string().uuid(),
  role: z.string(),
  company: z.string(),
  startDate: z.string(),
  endDate: optionalString,
  isCurrent: z.boolean(),
  description: z.string().optional(),
})

const draftEducationItemSchema = z.object({
  id: z.string().uuid(),
  institution: z.string(),
  degree: z.string(),
  startDate: z.string(),
  endDate: optionalString,
})

const draftSkillSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
})

const draftProjectItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().optional(),
  url: z.string().optional(),
  image: imageRefSchema.optional(),
})

const draftContactLinkSchema = z.object({
  id: z.string().uuid(),
  label: z.string(),
  url: z.string(),
})

const draftContactSchema = z.object({
  email: z.string(),
  phone: z.string().optional(),
  location: z.string().optional(),
  links: z.array(draftContactLinkSchema),
})

export const draftPortfolioReadSchema = z.object({
  profile: draftProfileSchema,
  summary: draftSummarySchema,
  experience: z.array(draftExperienceItemSchema),
  education: z.array(draftEducationItemSchema),
  skills: z.array(draftSkillSchema),
  projects: z.array(draftProjectItemSchema),
  contact: draftContactSchema,
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
