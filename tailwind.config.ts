import type { Config } from 'tailwindcss'

// Skala spasi mengikuti default Tailwind (kelipatan 4px / 0.25rem) — tidak diubah.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F8FAFC',
        surface: '#FFFFFF',
        ink: '#0F172A',
        body: '#334155',
        muted: '#64748B',
        border: '#E2E8F0',
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          fg: '#FFFFFF',
        },
        success: '#16A34A',
        warning: '#D97706',
        danger: '#DC2626',
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        subtle: '0 1px 2px 0 rgb(15 23 42 / 0.04)',
        elevated: '0 4px 12px -2px rgb(15 23 42 / 0.10)',
      },
      zIndex: {
        dropdown: '10',
        sticky: '20',
        overlay: '30',
        modal: '40',
        toast: '50',
      },
    },
  },
  plugins: [],
} satisfies Config
