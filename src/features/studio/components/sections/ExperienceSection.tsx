import { useFieldArray, useFormContext } from 'react-hook-form'
import { TextField } from '@/components/ui/TextField'
import { TextareaField } from '@/components/ui/TextareaField'
import { RepeatableList } from '../shared/RepeatableList'
import type { Portfolio } from '../../schema'

export function ExperienceSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Portfolio>()
  const { fields, append, remove } = useFieldArray({ control, name: 'experience' })

  function handleAdd() {
    append({
      id: crypto.randomUUID(),
      role: '',
      company: '',
      startDate: '',
      isCurrent: false,
    })
  }

  return (
    <section aria-labelledby="experience-heading" className="space-y-4">
      <h2 id="experience-heading" className="text-lg font-semibold text-ink">
        Pengalaman
      </h2>

      <RepeatableList
        items={fields}
        onAdd={handleAdd}
        onRemove={remove}
        addLabel="Tambah pengalaman"
        renderItem={(_, index) => (
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField
              label="Jabatan"
              {...register(`experience.${index}.role`)}
              error={errors.experience?.[index]?.role?.message}
            />
            <TextField
              label="Perusahaan"
              {...register(`experience.${index}.company`)}
              error={errors.experience?.[index]?.company?.message}
            />
            <TextField
              label="Mulai"
              type="month"
              {...register(`experience.${index}.startDate`)}
              error={errors.experience?.[index]?.startDate?.message}
            />
            <TextField
              label="Selesai (kosongkan jika masih berjalan)"
              type="month"
              {...register(`experience.${index}.endDate`)}
            />
            <label className="flex items-center gap-2 text-sm text-body sm:col-span-2">
              <input
                type="checkbox"
                {...register(`experience.${index}.isCurrent`)}
                className="h-4 w-4 rounded border-border"
              />
              Masih berjalan di sini
            </label>
            <div className="sm:col-span-2">
              <TextareaField
                label="Deskripsi (opsional)"
                {...register(`experience.${index}.description`)}
              />
            </div>
          </div>
        )}
      />
    </section>
  )
}
