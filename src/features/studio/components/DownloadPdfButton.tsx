import { Button } from '@/components/ui/Button'
import type { Portfolio } from '../schema'

interface DownloadPdfButtonProps {
  portfolio: Portfolio
}

export function DownloadPdfButton({ portfolio }: DownloadPdfButtonProps) {
  function handleDownload() {
    const previousTitle = document.title
    const name = portfolio.profile.fullName || 'Portofolio Kilat'
    document.title = `Portofolio - ${name}`

    function restoreTitle() {
      document.title = previousTitle
      window.removeEventListener('afterprint', restoreTitle)
    }
    window.addEventListener('afterprint', restoreTitle)

    window.print()
  }

  return (
    <div className="mb-6 print:hidden">
      <Button type="button" onClick={handleDownload}>
        Unduh PDF
      </Button>
      <p className="mt-1 text-xs text-muted">
        Membuka dialog cetak browser — pilih "Simpan sebagai PDF" untuk mengunduh.
      </p>
    </div>
  )
}
