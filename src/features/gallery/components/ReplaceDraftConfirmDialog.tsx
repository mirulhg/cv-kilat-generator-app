import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'

interface ReplaceDraftConfirmDialogProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ReplaceDraftConfirmDialog({
  open,
  onConfirm,
  onCancel,
}: ReplaceDraftConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Membuka/menutup dialog konfirmasi mengikuti state `open` dari pemanggil.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) dialog.showModal()
    else if (dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      onClose={onCancel}
      className="w-full max-w-sm rounded-lg border border-border bg-surface p-6 shadow-elevated backdrop:bg-ink/40"
    >
      <p className="text-ink">Draf yang sedang tersimpan akan diganti dengan contoh ini. Lanjutkan?</p>
      <div className="mt-4 flex justify-end gap-4">
        <button type="button" onClick={onCancel} className="min-h-11 text-sm text-body underline">
          Batalkan
        </button>
        <Button type="button" variant="danger" onClick={onConfirm}>
          Ganti draf
        </Button>
      </div>
    </dialog>
  )
}
