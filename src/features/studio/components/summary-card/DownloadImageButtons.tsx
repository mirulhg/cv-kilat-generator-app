import { useRef } from 'react'
import { toPng } from 'html-to-image'
import { Button } from '@/components/ui/Button'
import { SummaryCard } from './SummaryCard'
import { CARD_DIMENSIONS, type CardVariant } from './cardVariant'
import type { Portfolio } from '../../schema'
import type { Theme } from '../../theme/schema'

interface DownloadImageButtonsProps {
  portfolio: Portfolio
  theme: Theme
}

const BUTTON_LABEL: Record<CardVariant, string> = {
  square: 'Unduh gambar persegi',
  banner: 'Unduh gambar banner',
}

const FILE_NAME: Record<CardVariant, string> = {
  square: 'ringkasan-persegi.png',
  banner: 'ringkasan-banner.png',
}

export function DownloadImageButtons({ portfolio, theme }: DownloadImageButtonsProps) {
  const squareRef = useRef<HTMLDivElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)

  async function handleDownload(variant: CardVariant) {
    const node = variant === 'square' ? squareRef.current : bannerRef.current
    if (!node) return

    const { width, height } = CARD_DIMENSIONS[variant]
    const dataUrl = await toPng(node, { width, height, pixelRatio: 1 })

    const link = document.createElement('a')
    link.href = dataUrl
    link.download = FILE_NAME[variant]
    link.click()
  }

  return (
    <div className="mb-6 flex flex-wrap gap-3 print:hidden">
      <Button type="button" variant="ghost" onClick={() => handleDownload('square')}>
        {BUTTON_LABEL.square}
      </Button>
      <Button type="button" variant="ghost" onClick={() => handleDownload('banner')}>
        {BUTTON_LABEL.banner}
      </Button>

      <div aria-hidden="true" className="pointer-events-none fixed left-[-9999px] top-0">
        <div ref={squareRef}>
          <SummaryCard portfolio={portfolio} theme={theme} variant="square" />
        </div>
        <div ref={bannerRef}>
          <SummaryCard portfolio={portfolio} theme={theme} variant="banner" />
        </div>
      </div>
    </div>
  )
}
