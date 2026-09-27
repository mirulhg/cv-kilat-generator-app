import { useDraftRecovery } from '../hooks/useDraftRecovery'
import { PortfolioForm } from '../components/PortfolioForm'
import { DraftPageSkeleton } from '../components/DraftPageSkeleton'
import { DraftLoadError } from '../components/DraftLoadError'

export function StudioPage() {
  const { state, retry } = useDraftRecovery()

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-ink">Studio Portofolio</h1>

      <div className="mt-6">
        {state.status === 'loading' && <DraftPageSkeleton />}

        {state.status === 'error' && <DraftLoadError message={state.message} onRetry={retry} />}

        {state.status === 'empty' && (
          <>
            <p className="mb-4 text-sm text-muted">
              Belum ada draf tersimpan. Mulai isi formulir di bawah.
            </p>
            <PortfolioForm
              defaultValues={state.portfolio}
              defaultTheme={state.theme}
              defaultSections={state.sections}
            />
          </>
        )}

        {state.status === 'success' && (
          <>
            <p className="mb-4 text-sm text-muted">Draf sebelumnya berhasil dipulihkan.</p>
            <PortfolioForm
              defaultValues={state.portfolio}
              defaultTheme={state.theme}
              defaultSections={state.sections}
            />
          </>
        )}
      </div>
    </main>
  )
}
