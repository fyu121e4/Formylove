/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Paleta de la página: cámbiala aquí y se actualiza en todo el sitio.
      colors: {
        wine: { DEFAULT: '#8B2E29', deep: '#6E2320' },
        rose: { DEFAULT: '#F4B6C2', soft: '#F8D7DC' },
        cream: '#FFF3DF',
        warm: '#FFFAF5',
      },
      fontFamily: {
        script: ['Caveat', 'cursive'],
        body: ['Nunito', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
