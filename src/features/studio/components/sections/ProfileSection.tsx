import { Controller, useFormContext } from 'react-hook-form'
import { TextField } from '@/components/ui/TextField'
import { ImageUploadField } from '../shared/ImageUploadField'
import type { Portfolio } from '../../schema'

export function ProfileSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Portfolio>()

  return (
    <section aria-labelledby="profile-heading" className="space-y-4">
      <h2 id="profile-heading" className="text-lg font-semibold text-ink">
        Profil
      </h2>

      <TextField
        label="Nama lengkap"
        {...register('profile.fullName')}
        error={errors.profile?.fullName?.message}
      />

      <TextField
        label="Headline profesi"
        {...register('profile.headline')}
        error={errors.profile?.headline?.message}
      />

      <Controller
        control={control}
        name="profile.photo"
        render={({ field }) => (
          <ImageUploadField label="Foto profil" value={field.value} onChange={field.onChange} />
        )}
      />
    </section>
  )
}
