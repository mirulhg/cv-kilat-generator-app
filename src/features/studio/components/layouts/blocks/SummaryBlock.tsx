import type { Summary } from '../../../schema'

interface SummaryBlockProps {
  summary: Summary
}

export function SummaryBlock({ summary }: SummaryBlockProps) {
  if (!summary.text) return null

  return <p className="text-[var(--portfolio-body)]">{summary.text}</p>
}
