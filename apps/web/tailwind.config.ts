import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-yellow': {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        'brand-blue': {
          50: '#E7EFF6',
          100: '#C5D5E8',
          200: '#8BACC9',
          300: '#5182AA',
          400: '#1F5A8B',
          500: '#003D6F',
          600: '#003362',
          700: '#024A58',
          800: '#012F47',
          900: '#011A28',
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
