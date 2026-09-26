import { useState } from 'react'
import { PreviewContent } from './PreviewContent'
import type { Portfolio } from '../schema'

interface PreviewPaneProps {
  portfolio: Portfolio
}

export function PreviewPane({ portfolio }: PreviewPaneProps) {
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop')

  return (
    <aside aria-label="Pratinjau portofolio" className="lg:sticky lg:top-8 lg:self-start">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ink">Pratinjau</h2>
        <div
          role="group"
          aria-label="Pilih tampilan pratinjau"
          className="flex gap-1 rounded-md border border-border p-1"
        >
          <button
            type="button"
            onClick={() => setViewport('desktop')}
            aria-pressed={viewport === 'desktop'}
            className={`min-h-11 rounded px-3 text-sm ${
              viewport === 'desktop' ? 'bg-primary text-primary-fg' : 'text-body'
            }`}
          >
            Desktop
          </button>
          <button
            type="button"
            onClick={() => setViewport('mobile')}
            aria-pressed={viewport === 'mobile'}
            className={`min-h-11 rounded px-3 text-sm ${
              viewport === 'mobile' ? 'bg-primary text-primary-fg' : 'text-body'
            }`}
          >
            Seluler
          </button>
        </div>
      </div>

      <div
        className={`mt-4 rounded-lg border border-border bg-surface p-6 shadow-subtle ${
          viewport === 'mobile' ? 'mx-auto max-w-sm' : ''
        }`}
      >
        <PreviewContent portfolio={portfolio} />
      </div>
    </aside>
  )
}
