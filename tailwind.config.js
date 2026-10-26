/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          50: '#FDF2F2',
          100: '#FDE4E4',
          200: '#FBCACA',
          300: '#F69D9D',
          400: '#D62828',
          500: '#B8001F', // Sharp Carmine Blood Red
          600: '#9B111E', // True Ruby Blood Red (Signature)
          700: '#7E0C17', // Deep Blood Velvet
          800: '#5F0911',
          900: '#43060C',
        },
        brand: {
          primary: '#9B111E',      // Sharp Blood Red
          primaryDark: '#7E0C17',  // Deep Blood Velvet
          primaryLight: '#B8001F', // Vivid Blood Red
          redSoft: '#FDF2F2',      // Soft Tint
          redBorder: '#FBCACA',    // Subtle Border
          accent: '#9B111E',
          dark: '#0F172A',         // Slate Charcoal
          bg: '#FAFAFA',           // Off-white canvas
          surface: '#FFFFFF',      // Pure White Cards & Panels
          muted: '#64748B',
          border: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
        'card': '0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)',
        'elevated': '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05)',
      }
    },
  },
  plugins: [],
}
