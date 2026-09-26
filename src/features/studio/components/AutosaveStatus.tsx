interface AutosaveStatusProps {
  status: 'idle' | 'saving' | 'saved' | 'error'
  onRetry: () => void
}

const STATUS_TEXT: Record<AutosaveStatusProps['status'], string> = {
  idle: 'Draf akan tersimpan otomatis saat kamu mengisi formulir.',
  saving: 'Menyimpan…',
  saved: 'Tersimpan',
  error: 'Gagal menyimpan draf.',
}

export function AutosaveStatus({ status, onRetry }: AutosaveStatusProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-md border border-border bg-surface px-4 py-3 text-sm">
      <span role="status" aria-live="polite" className="text-body">
        {STATUS_TEXT[status]}
      </span>

      {status === 'error' && (
        <button type="button" onClick={onRetry} className="font-medium text-primary underline">
          Coba lagi
        </button>
      )}

      <span className="text-muted">
        Draf hanya tersimpan di perangkat ini dan akan hilang jika data browser dihapus.
      </span>
    </div>
  )
}
