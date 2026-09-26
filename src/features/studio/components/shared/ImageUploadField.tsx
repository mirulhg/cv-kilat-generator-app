import { useId, useState, type ChangeEvent } from 'react'
import { FieldError } from '@/components/ui/FieldError'
import { Button } from '@/components/ui/Button'
import { ImageTooLargeError, ImageTypeNotAllowedError, saveImage } from '../../api/image-storage'
import { useImageObjectUrl } from '../../hooks/useImageObjectUrl'
import { MAX_IMAGE_SIZE_LABEL } from '../../constants'
import type { ImageRef } from '../../schema'

interface ImageUploadFieldProps {
  label: string
  value: ImageRef | undefined
  onChange: (next: ImageRef | undefined) => void
}

export function ImageUploadField({ label, value, onChange }: ImageUploadFieldProps) {
  const inputId = useId()
  const errorId = useId()
  const [error, setError] = useState<string>()
  const previewUrl = useImageObjectUrl(value?.id)

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    try {
      setError(undefined)
      const ref = await saveImage(file)
      onChange(ref)
    } catch (err) {
      if (err instanceof ImageTooLargeError || err instanceof ImageTypeNotAllowedError) {
        setError(err.message)
      } else {
        setError('Gambar gagal disimpan. Coba lagi.')
      }
    }
  }

  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <p className="mt-1 text-xs text-muted">
        Format JPG, PNG, atau WebP. Maksimal {MAX_IMAGE_SIZE_LABEL} per file.
      </p>

      {previewUrl && (
        <img src={previewUrl} alt="" className="mt-2 h-24 w-24 rounded-md object-cover" />
      )}

      <div className="mt-2 flex items-center gap-3">
        <input
          id={inputId}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          aria-describedby={error ? errorId : undefined}
          className="text-sm text-body"
        />
        {value && (
          <Button type="button" variant="danger" onClick={() => onChange(undefined)}>
            Hapus gambar
          </Button>
        )}
      </div>

      <FieldError id={errorId} message={error} />
    </div>
  )
}
