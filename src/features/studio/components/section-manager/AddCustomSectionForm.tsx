import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { TextareaField } from '@/components/ui/TextareaField'

interface AddCustomSectionFormProps {
  onAdd: (title: string, body: string) => void
}

export function AddCustomSectionForm({ onAdd }: AddCustomSectionFormProps) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const canAdd = title.trim().length > 0 && body.trim().length > 0

  function handleAdd() {
    if (!canAdd) return
    onAdd(title.trim(), body.trim())
    setTitle('')
    setBody('')
  }

  return (
    <div className="space-y-3 rounded-md border border-dashed border-border p-4">
      <p className="text-sm font-medium text-ink">Tambah bagian kustom</p>
      <TextField label="Judul bagian" value={title} onChange={(event) => setTitle(event.target.value)} />
      <TextareaField
        label='Isi bagian (baris diawali "- " jadi daftar berpoin)'
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />
      <Button type="button" variant="ghost" onClick={handleAdd} disabled={!canAdd}>
        Tambah bagian
      </Button>
    </div>
  )
}
