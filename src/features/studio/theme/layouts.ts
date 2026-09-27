import { z } from 'zod'

export const LAYOUT_IDS = ['single-column', 'sidebar-left', 'two-column'] as const

export const layoutIdSchema = z.enum(LAYOUT_IDS)
export type LayoutId = z.infer<typeof layoutIdSchema>

export interface LayoutDefinition {
  id: LayoutId
  name: string
  description: string
}

export const LAYOUTS: LayoutDefinition[] = [
  {
    id: 'single-column',
    name: 'Satu Kolom',
    description: 'Semua bagian tersusun berurutan ke bawah dalam satu kolom penuh.',
  },
  {
    id: 'sidebar-left',
    name: 'Sidebar Kiri',
    description:
      'Profil, kontak, dan keahlian tetap terlihat di kolom kiri sementara konten utama ada di kanan.',
  },
  {
    id: 'two-column',
    name: 'Dua Kolom',
    description: 'Konten dibagi rata kiri-kanan agar portofolio padat tidak terlalu panjang.',
  },
]

export function getLayout(id: LayoutId): LayoutDefinition {
  const layout = LAYOUTS.find((item) => item.id === id)
  if (!layout) throw new Error(`Tata letak tidak ditemukan: ${id}`)
  return layout
}
