import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-teal': {
          50: '#EDF9FC',
          100: '#CFF0F7',
          200: '#9DDFF0',
          300: '#5CCADF',
          400: '#1DB5D0',
          500: '#0193A8',
          600: '#017B8E',
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
