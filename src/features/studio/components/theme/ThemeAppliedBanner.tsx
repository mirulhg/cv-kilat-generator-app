interface ThemeAppliedBannerProps {
  onUndo: () => void
}

export function ThemeAppliedBanner({ onUndo }: ThemeAppliedBannerProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-md border border-primary bg-primary/10 px-4 py-3 text-sm">
      <span role="status" className="text-ink">
        Tema diterapkan
      </span>
      <button type="button" onClick={onUndo} className="font-medium text-primary underline">
        Batalkan
      </button>
    </div>
  )
}
