import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-orange': {
          50:  '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
        },
        'brand-blue': {
          50: '#E7EFF6',
          100: '#C5D5E8',
          200: '#8BACC9',
          300: '#5182AA',
          400: '#1F5A8B',
          500: '#003D6F',
          600: '#003362',
          700: '#1E3A5F',
          800: '#152B47',
          900: '#0D1B2E',
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
