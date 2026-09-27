import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const palettesPath = fileURLToPath(
  new URL('../src/features/studio/theme/palettes.json', import.meta.url),
)
const palettes = JSON.parse(readFileSync(palettesPath, 'utf8'))

const MIN_CONTRAST = 4.5

function hexToRgb(hex) {
  const value = hex.replace('#', '')
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16))
}

function relativeLuminance([r, g, b]) {
  const [rs, gs, bs] = [r, g, b].map((channel) => {
    const c = channel / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

function contrastRatio(hexA, hexB) {
  const lumA = relativeLuminance(hexToRgb(hexA))
  const lumB = relativeLuminance(hexToRgb(hexB))
  const lighter = Math.max(lumA, lumB)
  const darker = Math.min(lumA, lumB)
  return (lighter + 0.05) / (darker + 0.05)
}

const results = []
let failCount = 0

for (const palette of palettes) {
  for (const mode of ['light', 'dark']) {
    const colors = palette[mode]
    const textOnBgPairs = [
      ['ink', 'bg'],
      ['ink', 'surface'],
      ['body', 'bg'],
      ['body', 'surface'],
      ['muted', 'bg'],
      ['muted', 'surface'],
      ['primaryFg', 'primary'],
    ]

    for (const [textKey, bgKey] of textOnBgPairs) {
      const ratio = contrastRatio(colors[textKey], colors[bgKey])
      const pass = ratio >= MIN_CONTRAST
      if (!pass) failCount += 1
      results.push({
        palette: palette.id,
        mode,
        pair: `${textKey}/${bgKey}`,
        ratio: Number(ratio.toFixed(2)),
        pass,
      })
    }
  }
}

for (const result of results) {
  const status = result.pass ? 'LOLOS' : 'GAGAL'
  console.log(
    `[${status}] ${result.palette} (${result.mode}) ${result.pair}: ${result.ratio}:1`,
  )
}

console.log('')
console.log(`Total kombinasi diperiksa: ${results.length}`)
console.log(`Lolos: ${results.length - failCount}`)
console.log(`Gagal: ${failCount}`)

if (failCount > 0) {
  process.exitCode = 1
}
