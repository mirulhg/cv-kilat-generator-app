import { useEffect, useState } from 'react'
import { getImageBlob } from '../api/image-storage'

export function useImageObjectUrl(imageId: string | undefined) {
  const [url, setUrl] = useState<string>()

  // Mengubah blob gambar tersimpan jadi object URL untuk pratinjau, lalu membersihkannya saat berganti/unmount.
  useEffect(() => {
    if (!imageId) return

    let objectUrl: string | undefined
    let cancelled = false

    getImageBlob(imageId).then((blob) => {
      if (cancelled || !blob) return
      objectUrl = URL.createObjectURL(blob)
      setUrl(objectUrl)
    })

    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [imageId])

  return imageId ? url : undefined
}
