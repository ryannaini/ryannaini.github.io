/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          300: '#78d296',
          500: '#83e09f',
          600: '#0d9488',
          700: '#0e7d69',
        },
      },
    },
  },
  plugins: [],
}
