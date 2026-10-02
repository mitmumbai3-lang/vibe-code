/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#070605',
          900: '#0c0a09',
          850: '#12100e',
          800: '#171513',
          750: '#1f1c19',
          700: '#2b2723',
        },
        parchment: {
          50: '#fdfbf7',
          100: '#f7f3eb',
          200: '#ede5d6',
          300: '#dfd2bc',
          400: '#cbb89b',
          500: '#b49c7a',
          600: '#947c5b',
        },
        gold: {
          100: '#f9f3db',
          200: '#f2e5b1',
          300: '#e5d181',
          400: '#d8b952',
          500: '#c59f33',
          600: '#aa8222',
          700: '#846018',
        },
        crimson: {
          400: '#ab3232',
          500: '#8c2424',
          600: '#701919',
          700: '#541010',
          800: '#3e0909',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', '"Cinzel"', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'widest-plus': '0.35em',
        'epic': '0.5em',
      },
      boxShadow: {
        'divine': '0 0 60px -10px rgba(229, 209, 129, 0.18)',
        'candle': '0 0 40px -5px rgba(216, 185, 82, 0.25)',
      },
    },
  },
  plugins: [],
}
