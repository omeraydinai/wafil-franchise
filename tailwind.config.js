/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        wafil: {
          yellow: '#ffd21f',
          green: '#0b2e1f',
          white: '#ffffff',
        },
      },
      fontFamily: {
        // League Spartan for headings, Neue Montreal for body.
        heading: ['"League Spartan"', 'sans-serif'],
        body: ['"Neue Montreal"', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
