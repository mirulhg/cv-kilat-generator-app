import { z } from 'zod'

export const BUILTIN_SECTION_KINDS = [
  'ringkasan',
  'pengalaman',
  'pendidikan',
  'keahlian',
  'proyek',
  'kontak',
] as const

export const builtinSectionKindSchema = z.enum(BUILTIN_SECTION_KINDS)
export type BuiltinSectionKind = z.infer<typeof builtinSectionKindSchema>

export const SECTION_KIND_LABELS: Record<BuiltinSectionKind, string> = {
  ringkasan: 'Ringkasan',
  pengalaman: 'Pengalaman',
  pendidikan: 'Pendidikan',
  keahlian: 'Keahlian',
  proyek: 'Proyek',
  kontak: 'Kontak',
}

const builtinSectionSchema = z.object({
  id: z.string().uuid(),
  kind: builtinSectionKindSchema,
  enabled: z.boolean(),
  order: z.number().int(),
})

const customSectionSchema = z.object({
  id: z.string().uuid(),
  kind: z.literal('custom'),
  enabled: z.boolean(),
  order: z.number().int(),
  title: z.string().min(1, 'Judul bagian wajib diisi'),
  body: z.string().min(1, 'Isi bagian wajib diisi'),
})

export const sectionSchema = z.union([builtinSectionSchema, customSectionSchema])
export type Section = z.infer<typeof sectionSchema>
export type BuiltinSection = z.infer<typeof builtinSectionSchema>
export type CustomSection = z.infer<typeof customSectionSchema>

export function getSectionLabel(section: Section): string {
  return section.kind === 'custom'
    ? section.title || 'Bagian kustom'
    : SECTION_KIND_LABELS[section.kind]
}

export function createDefaultSections(): Section[] {
  return BUILTIN_SECTION_KINDS.map((kind, index) => ({
    id: crypto.randomUUID(),
    kind,
    enabled: true,
    order: index,
  }))
}
