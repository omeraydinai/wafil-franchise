/** @type {import('tailwindcss').Config} */
// Açık, ferah, editoryal tema (2026-10 yeniden tasarım). Build sırasında derlenir.
// Yeni sayfa token'ları: paper / mist / ink / ink-soft / line / sun.
// Eski koyu tema adları (background, on-surface, secondary …) yasal sayfalar
// hâlâ kullandığı için açık karşılıklarına eşlendi; yeni işaretlemede kullanma.
const ink = '#0B2E1F'
const inkSoft = '#4A655A'
const line = '#DCE2DF'
const sun = '#FFD21F'

export default {
  content: ['./index.html', './pages/**/*.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FFFFFF',
        mist: '#F2F5F3',
        ink,
        'ink-soft': inkSoft,
        line,
        sun,
        'sun-deep': '#F2C200',

        // Eski adlar → açık tema (yalnız yasal sayfalar için)
        background: '#FFFFFF',
        'on-background': ink,
        surface: '#FFFFFF',
        'on-surface': ink,
        'on-surface-variant': inkSoft,
        'text-muted': inkSoft,
        'outline-variant': line,
        secondary: sun,
        'secondary-fixed': '#F2C200',
        'on-secondary': ink,
      },
      fontFamily: {
        display: ['"League Spartan Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Hanken Grotesk Variable"', 'system-ui', 'sans-serif'],
        // Eski adlar
        'body-md': ['"Hanken Grotesk Variable"', 'system-ui', 'sans-serif'],
        'body-lg': ['"Hanken Grotesk Variable"', 'system-ui', 'sans-serif'],
        'label-sm': ['"Hanken Grotesk Variable"', 'system-ui', 'sans-serif'],
        'label-bold': ['"Hanken Grotesk Variable"', 'system-ui', 'sans-serif'],
        'headline-md': ['"League Spartan Variable"', 'system-ui', 'sans-serif'],
        'headline-lg': ['"League Spartan Variable"', 'system-ui', 'sans-serif'],
        'headline-lg-mobile': ['"League Spartan Variable"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Eski adlar (yasal sayfalar)
        'body-md': ['16px', { lineHeight: '1.65', fontWeight: '400' }],
        'label-sm': ['13px', { lineHeight: '1.3', fontWeight: '500' }],
        'label-bold': ['14px', { lineHeight: '1.2', letterSpacing: '0.02em', fontWeight: '600' }],
        'headline-md': ['22px', { lineHeight: '1.25', fontWeight: '600' }],
        'headline-lg': ['48px', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '600' }],
        'headline-lg-mobile': ['34px', { lineHeight: '1.08', letterSpacing: '-0.03em', fontWeight: '600' }],
      },
      maxWidth: {
        frame: '1360px',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
