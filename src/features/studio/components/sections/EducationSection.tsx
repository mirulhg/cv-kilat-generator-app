import { useFieldArray, useFormContext } from 'react-hook-form'
import { TextField } from '@/components/ui/TextField'
import { RepeatableList } from '../shared/RepeatableList'
import type { Portfolio } from '../../schema'

export function EducationSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Portfolio>()
  const { fields, append, remove } = useFieldArray({ control, name: 'education' })

  function handleAdd() {
    append({
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      startDate: '',
    })
  }

  return (
    <section aria-labelledby="education-heading" className="space-y-4">
      <h2 id="education-heading" className="text-lg font-semibold text-ink">
        Pendidikan
      </h2>

      <RepeatableList
        items={fields}
        onAdd={handleAdd}
        onRemove={remove}
        addLabel="Tambah pendidikan"
        renderItem={(_, index) => (
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField
              label="Institusi"
              {...register(`education.${index}.institution`)}
              error={errors.education?.[index]?.institution?.message}
            />
            <TextField
              label="Jenjang/gelar"
              {...register(`education.${index}.degree`)}
              error={errors.education?.[index]?.degree?.message}
            />
            <TextField
              label="Mulai"
              type="month"
              {...register(`education.${index}.startDate`)}
              error={errors.education?.[index]?.startDate?.message}
            />
            <TextField
              label="Selesai (opsional)"
              type="month"
              {...register(`education.${index}.endDate`)}
            />
          </div>
        )}
      />
    </section>
  )
}
