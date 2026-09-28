# Portofolio Kilat

Aplikasi web untuk membuat portofolio profesional dengan cepat. Lihat
`Docs/PRD — Portofolio Kilat.md` untuk kebutuhan produk dan `Docs/CLAUDE.md`
untuk aturan teknis proyek.

## Menjalankan proyek

```bash
npm install
npm run dev
```

## Perintah lain

- `npm run build` — build produksi (`tsc -b && vite build`)
- `npm run lint` — jalankan oxlint
- `npm run preview` — pratinjau hasil build
- `npm test` — jalankan test regresi (`node:test` bawaan, lewat `tsx`)
- `npm run validate:theme-contrast` — validasi kontras WCAG AA seluruh palet tema
