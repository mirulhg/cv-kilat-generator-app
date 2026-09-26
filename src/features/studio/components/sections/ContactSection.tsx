import { useFieldArray, useFormContext } from 'react-hook-form'
import { TextField } from '@/components/ui/TextField'
import { RepeatableList } from '../shared/RepeatableList'
import type { Portfolio } from '../../schema'

export function ContactSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Portfolio>()
  const { fields, append, remove } = useFieldArray({ control, name: 'contact.links' })

  return (
    <section aria-labelledby="contact-heading" className="space-y-4">
      <h2 id="contact-heading" className="text-lg font-semibold text-ink">
        Kontak
      </h2>

      <TextField
        label="Email"
        type="email"
        {...register('contact.email')}
        error={errors.contact?.email?.message}
      />
      <TextField label="Telepon (opsional)" {...register('contact.phone')} />
      <TextField label="Lokasi (opsional)" {...register('contact.location')} />

      <RepeatableList
        items={fields}
        onAdd={() => append({ id: crypto.randomUUID(), label: '', url: '' })}
        onRemove={remove}
        addLabel="Tambah tautan"
        renderItem={(_, index) => (
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField
              label="Label tautan"
              {...register(`contact.links.${index}.label`)}
              error={errors.contact?.links?.[index]?.label?.message}
            />
            <TextField
              label="URL"
              {...register(`contact.links.${index}.url`)}
              error={errors.contact?.links?.[index]?.url?.message}
            />
          </div>
        )}
      />
    </section>
  )
}
