export type CustomBodyBlock = { type: 'list'; items: string[] } | { type: 'paragraph'; text: string }

export function parseCustomBody(body: string): CustomBodyBlock[] {
  const blocks: CustomBodyBlock[] = []

  for (const rawLine of body.split('\n')) {
    const line = rawLine.trim()
    if (!line) continue

    if (line.startsWith('- ')) {
      const item = line.slice(2).trim()
      const lastBlock = blocks.at(-1)
      if (lastBlock?.type === 'list') {
        lastBlock.items.push(item)
      } else {
        blocks.push({ type: 'list', items: [item] })
      }
      continue
    }

    blocks.push({ type: 'paragraph', text: line })
  }

  return blocks
}
