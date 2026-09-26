import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE_BYTES, MAX_IMAGE_SIZE_LABEL } from '../constants'
import type { ImageRef } from '../schema'
import { getDb, IMAGES_STORE } from './db'

type AllowedImageType = (typeof ALLOWED_IMAGE_TYPES)[number]

export class ImageTooLargeError extends Error {
  constructor() {
    super(
      `Ukuran gambar melebihi batas ${MAX_IMAGE_SIZE_LABEL}. Pilih file yang lebih kecil atau kompres gambarnya lebih dulu.`,
    )
    this.name = 'ImageTooLargeError'
  }
}

export class ImageTypeNotAllowedError extends Error {
  constructor() {
    super('Format gambar tidak didukung. Gunakan file JPG, PNG, atau WebP.')
    this.name = 'ImageTypeNotAllowedError'
  }
}

function isAllowedImageType(type: string): type is AllowedImageType {
  return (ALLOWED_IMAGE_TYPES as readonly string[]).includes(type)
}

export async function saveImage(file: File): Promise<ImageRef> {
  if (!isAllowedImageType(file.type)) {
    throw new ImageTypeNotAllowedError()
  }
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new ImageTooLargeError()
  }

  const id = crypto.randomUUID()
  const db = await getDb()
  await db.put(IMAGES_STORE, file, id)

  return { id, type: file.type, sizeBytes: file.size }
}

export async function getImageBlob(id: string): Promise<Blob | undefined> {
  const db = await getDb()
  return db.get(IMAGES_STORE, id)
}

export async function deleteImage(id: string): Promise<void> {
  const db = await getDb()
  await db.delete(IMAGES_STORE, id)
}
