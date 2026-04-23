/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          900: '#0f1b16',
          800: '#15261f',
          700: '#1f352b',
          500: '#3f7a61'
        },
        glow: '#b6ffd5'
      },
      boxShadow: {
        aura: '0 20px 70px rgba(62, 150, 106, 0.35)'
      }
    }
  },
  plugins: []
};
