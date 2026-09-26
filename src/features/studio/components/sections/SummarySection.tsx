import { useFormContext } from 'react-hook-form'
import { TextareaField } from '@/components/ui/TextareaField'
import type { Portfolio } from '../../schema'

export function SummarySection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<Portfolio>()

  return (
    <section aria-labelledby="summary-heading" className="space-y-4">
      <h2 id="summary-heading" className="text-lg font-semibold text-ink">
        Ringkasan
      </h2>

      <TextareaField
        label="Ringkasan singkat"
        {...register('summary.text')}
        error={errors.summary?.text?.message}
      />
    </section>
  )
}
