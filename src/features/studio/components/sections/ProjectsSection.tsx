import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { TextField } from '@/components/ui/TextField'
import { TextareaField } from '@/components/ui/TextareaField'
import { RepeatableList } from '../shared/RepeatableList'
import { ImageUploadField } from '../shared/ImageUploadField'
import type { Portfolio } from '../../schema'

export function ProjectsSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Portfolio>()
  const { fields, append, remove } = useFieldArray({ control, name: 'projects' })

  function handleAdd() {
    append({ id: crypto.randomUUID(), title: '' })
  }

  return (
    <section aria-labelledby="projects-heading" className="space-y-4">
      <h2 id="projects-heading" className="text-lg font-semibold text-ink">
        Proyek
      </h2>

      <RepeatableList
        items={fields}
        onAdd={handleAdd}
        onRemove={remove}
        addLabel="Tambah proyek"
        renderItem={(_, index) => (
          <div className="space-y-3">
            <TextField
              label="Judul proyek"
              {...register(`projects.${index}.title`)}
              error={errors.projects?.[index]?.title?.message}
            />
            <TextareaField
              label="Deskripsi (opsional)"
              {...register(`projects.${index}.description`)}
            />
            <TextField
              label="Tautan proyek (opsional)"
              {...register(`projects.${index}.url`)}
              error={errors.projects?.[index]?.url?.message}
            />
            <Controller
              control={control}
              name={`projects.${index}.image`}
              render={({ field }) => (
                <ImageUploadField
                  label="Gambar proyek"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        )}
      />
    </section>
  )
}
