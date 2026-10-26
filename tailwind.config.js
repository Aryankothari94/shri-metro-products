/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#DC2626',      // Vibrant Red (Red-600)
          primaryDark: '#B91C1C',  // Deep Crimson (Red-700)
          primaryLight: '#EF4444', // Energetic Red (Red-500)
          redSoft: '#FEF2F2',      // Soft Red Tint (Red-50)
          redBorder: '#FECACA',    // Soft Red Border (Red-200)
          accent: '#DC2626',
          dark: '#0F172A',         // Slate Charcoal for high contrast text
          bg: '#FAFAFA',           // Clean crisp off-white canvas
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
