import type { Config } from 'tailwindcss';
import { CrewsColors } from './src/styles/color';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    screens: {
      sm: '576px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        shake: {
          '0%': { transform: 'translateX(0)' }, // 시작 위치
          '25%': { transform: 'translateX(-5px)' }, // 왼쪽으로 이동
          '50%': { transform: 'translateX(5px)' }, // 오른쪽으로 이동
          '75%': { transform: 'translateX(-5px)' }, // 왼쪽으로 다시 이동
          '100%': { transform: 'translateX(0)' }, // 원래 위치로 복귀
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shake: 'shake 0.25s linear',
      },
      colors: CrewsColors,
      fontFamily: {
        pretendard: 'Pretendard-Regular',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
