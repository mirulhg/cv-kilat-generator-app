import { galleryTemplatesSchema, type GalleryTemplate } from './schema'

export class GalleryDataCorruptError extends Error {
  constructor(cause: unknown) {
    super('Data galeri tidak valid dan tidak bisa dimuat.')
    this.name = 'GalleryDataCorruptError'
    this.cause = cause
  }
}

export async function loadGalleryTemplates(): Promise<GalleryTemplate[]> {
  const { default: raw } = await import('./templates.json')
  const result = galleryTemplatesSchema.safeParse(raw)
  if (!result.success) {
    throw new GalleryDataCorruptError(result.error)
  }
  return result.data
}
