/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#070b14',
          deep: '#081123',
          soft: '#121a2b',
        },
        ink: '#ebf1ff',
        muted: '#9aa8c7',
        sky: {
          DEFAULT: '#72b8ff',
          bright: '#8fc6ff',
        },
        teal: {
          300: '#78d296',
          500: '#83e09f',
          600: '#0d9488',
          700: '#0e7d69',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
        sans: [
          'Source Sans 3',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
