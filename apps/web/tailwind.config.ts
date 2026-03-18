import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-pink': {
          50: '#FFF0F5',
          100: '#FFE0EB',
          200: '#FFC2D6',
          300: '#FF94B8',
          400: '#FF6699',
          500: '#F0447A',
          600: '#E64D80',
        },
        'brand-blue': {
          50: '#EBF0F7',
          100: '#D6E0EF',
          200: '#A8BDD9',
          300: '#7A9AC3',
          400: '#4C77AD',
          500: '#2B5698',
          600: '#1E3F73',
          700: '#1A365D',
          800: '#122647',
          900: '#0A162E',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
