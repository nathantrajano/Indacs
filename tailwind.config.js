/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indacs: {
          dark: '#0F4D25',
          primary: '#145E2F',
          medium: '#1E7A3E',
          light: '#68B63E',
          accent: '#83C752',
          cream: '#E2EFD7',
          creamLight: '#F3F8EE',
          creamCard: '#FAFDF7',
          ink: '#132A1C',
          muted: '#3B5945',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

