import { useFieldArray, useFormContext } from 'react-hook-form'
import { TextField } from '@/components/ui/TextField'
import { RepeatableList } from '../shared/RepeatableList'
import type { Portfolio } from '../../schema'

export function SkillsSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Portfolio>()
  const { fields, append, remove } = useFieldArray({ control, name: 'skills' })

  return (
    <section aria-labelledby="skills-heading" className="space-y-4">
      <h2 id="skills-heading" className="text-lg font-semibold text-ink">
        Keahlian
      </h2>

      <RepeatableList
        items={fields}
        onAdd={() => append({ id: crypto.randomUUID(), name: '' })}
        onRemove={remove}
        addLabel="Tambah keahlian"
        renderItem={(_, index) => (
          <TextField
            label={`Keahlian ${index + 1}`}
            {...register(`skills.${index}.name`)}
            error={errors.skills?.[index]?.name?.message}
          />
        )}
      />
    </section>
  )
}
