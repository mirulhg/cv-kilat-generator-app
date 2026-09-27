import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseDraftRecord, DraftCorruptError } from './parseDraftRecord.ts'
import { portfolioSchema, draftPortfolioReadSchema } from '../schema.ts'

const phase1Portfolio = {
  profile: { fullName: 'Budi Santoso', headline: 'Pengembang Web' },
  summary: { text: 'Ringkasan singkat.' },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  contact: { email: 'budi@contoh.id', links: [] },
}

test('draf gaya Fase 1 (tanpa theme/sections) mendapat default, portofolio tidak hilang', () => {
  const raw = {
    id: 'current-draft',
    portfolio: phase1Portfolio,
    updatedAt: '2025-01-01T00:00:00.000Z',
  }

  const draft = parseDraftRecord(raw)

  assert.deepEqual(draft.portfolio, phase1Portfolio)
  assert.equal(draft.theme.paletteId, 'biru-profesional')
  assert.equal(draft.sections.length, 6)
  assert.ok(draft.sections.every((section) => section.enabled))
})

test('endDate/url kosong ("") pada portofolio tidak membuat draf dianggap korup', () => {
  const raw = {
    id: 'current-draft',
    portfolio: {
      ...phase1Portfolio,
      experience: [
        {
          id: crypto.randomUUID(),
          role: 'Pengembang',
          company: 'PT Contoh',
          startDate: '2022-01',
          endDate: '',
          isCurrent: true,
        },
      ],
      projects: [
        {
          id: crypto.randomUUID(),
          title: 'Proyek Contoh',
          url: '',
        },
      ],
    },
    updatedAt: '2025-01-01T00:00:00.000Z',
  }

  const draft = parseDraftRecord(raw)

  assert.equal(draft.portfolio.experience[0]?.endDate, undefined)
  // projectItemSchema.url longgar total (z.string().optional()) di skema baca, jadi ''
  // tetap '' apa adanya — bedanya dengan endDate (masih pakai optionalString) karena
  // url tidak boleh lagi memvalidasi format (lihat perbaikan "beebaeb" di bawah).
  assert.equal(draft.portfolio.projects[0]?.url, '')
})

test('theme/sections rusak di-reset ke default, portofolio tetap dikembalikan', () => {
  const raw = {
    id: 'current-draft',
    portfolio: phase1Portfolio,
    theme: { paletteId: 'warna-tidak-ada' },
    sections: 'bukan-array',
    updatedAt: '2025-01-01T00:00:00.000Z',
  }

  const draft = parseDraftRecord(raw)

  assert.deepEqual(draft.portfolio, phase1Portfolio)
  assert.equal(draft.theme.paletteId, 'biru-profesional')
  assert.equal(draft.sections.length, 6)
})

test('portfolio yang struktural tidak valid (bukan cuma field kosong) tetap melempar DraftCorruptError', () => {
  const raw = {
    id: 'current-draft',
    portfolio: { ...phase1Portfolio, experience: 'bukan-array' },
    updatedAt: '2025-01-01T00:00:00.000Z',
  }

  assert.throws(() => parseDraftRecord(raw), DraftCorruptError)
})

test('entri kontak kosong (label & url "") dari klik "Tambah tautan" tidak membuat draf korup', () => {
  const raw = {
    id: 'current-draft',
    portfolio: {
      ...phase1Portfolio,
      contact: {
        ...phase1Portfolio.contact,
        links: [{ id: crypto.randomUUID(), label: '', url: '' }],
      },
    },
    updatedAt: '2025-01-01T00:00:00.000Z',
  }

  const draft = parseDraftRecord(raw)

  assert.equal(draft.portfolio.contact.links[0]?.label, '')
  assert.equal(draft.portfolio.contact.links[0]?.url, '')
})

test('entri pengalaman/pendidikan/keahlian/proyek yang baru ditambah (masih kosong) tidak membuat draf korup', () => {
  const raw = {
    id: 'current-draft',
    portfolio: {
      ...phase1Portfolio,
      experience: [
        { id: crypto.randomUUID(), role: '', company: '', startDate: '', isCurrent: false },
      ],
      education: [{ id: crypto.randomUUID(), institution: '', degree: '', startDate: '' }],
      skills: [{ id: crypto.randomUUID(), name: '' }],
      projects: [{ id: crypto.randomUUID(), title: '' }],
    },
    updatedAt: '2025-01-01T00:00:00.000Z',
  }

  const draft = parseDraftRecord(raw)

  assert.equal(draft.portfolio.experience[0]?.role, '')
  assert.equal(draft.portfolio.education[0]?.institution, '')
  assert.equal(draft.portfolio.skills[0]?.name, '')
  assert.equal(draft.portfolio.projects[0]?.title, '')
})

test('field top-level yang masih kosong (fullName/headline/summary/email) tidak membuat draf korup', () => {
  const raw = {
    id: 'current-draft',
    portfolio: {
      profile: { fullName: '', headline: '' },
      summary: { text: '' },
      experience: [],
      education: [],
      skills: [],
      projects: [],
      contact: { email: '', links: [] },
    },
    updatedAt: '2025-01-01T00:00:00.000Z',
  }

  const draft = parseDraftRecord(raw)

  assert.equal(draft.portfolio.profile.fullName, '')
  assert.equal(draft.portfolio.profile.headline, '')
  assert.equal(draft.portfolio.summary.text, '')
  assert.equal(draft.portfolio.contact.email, '')
})

test('teks belum-valid-URL/email ("beebaeb", bukan kosong) pada field berformat tidak membuat draf korup', () => {
  const raw = {
    id: 'current-draft',
    portfolio: {
      ...phase1Portfolio,
      projects: [{ id: crypto.randomUUID(), title: 'Proyek Contoh', url: 'beebaeb' }],
      contact: {
        email: 'beebaeb',
        links: [{ id: crypto.randomUUID(), label: 'Tautan', url: 'beebaeb' }],
      },
    },
    updatedAt: '2025-01-01T00:00:00.000Z',
  }

  const draft = parseDraftRecord(raw)

  assert.equal(draft.portfolio.projects[0]?.url, 'beebaeb')
  assert.equal(draft.portfolio.contact.email, 'beebaeb')
  assert.equal(draft.portfolio.contact.links[0]?.url, 'beebaeb')
})

// --- Anti-drift: portfolioSchema (ketat, dipakai form) dan draftPortfolioReadSchema (longgar,
// dipakai baca draf) wajib punya key-set yang sama di semua level. Kalau field wajib baru
// ditambah ke salah satu skema tapi lupa ke yang lain, test ini gagal duluan sebelum jadi
// laporan bug dari pengguna.

type ShapeTree = true | { [key: string]: ShapeTree }

function unwrapToObjectOrArray(schema: unknown): { def: { type: string } } | undefined {
  let current = schema as { def?: { type: string; innerType?: unknown } } | undefined
  while (current?.def) {
    const type = current.def.type
    if (type === 'object' || type === 'array') return current as { def: { type: string } }
    if (type === 'optional' || type === 'nullable' || type === 'default' || type === 'nonoptional') {
      current = current.def.innerType as typeof current
      continue
    }
    return undefined
  }
  return undefined
}

function getShapeTree(schema: unknown): ShapeTree {
  const unwrapped = unwrapToObjectOrArray(schema)
  if (!unwrapped) return true

  if (unwrapped.def.type === 'array') {
    const element = (unwrapped as unknown as { def: { element: unknown } }).def.element
    return getShapeTree(element)
  }

  const shape = (unwrapped as unknown as { shape: Record<string, unknown> }).shape
  const tree: ShapeTree = {}
  for (const [key, fieldSchema] of Object.entries(shape)) {
    tree[key] = getShapeTree(fieldSchema)
  }
  return tree
}

test('portfolioSchema dan draftPortfolioReadSchema punya key-set yang sama di semua level', () => {
  assert.deepEqual(getShapeTree(draftPortfolioReadSchema), getShapeTree(portfolioSchema))
})
