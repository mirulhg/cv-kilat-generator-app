export type CardVariant = 'square' | 'banner'

export const CARD_DIMENSIONS: Record<CardVariant, { width: number; height: number }> = {
  square: { width: 1080, height: 1080 },
  banner: { width: 1200, height: 630 },
}
