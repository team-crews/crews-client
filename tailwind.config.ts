import type { Config } from 'tailwindcss';

import { CrewsColors } from './src/styles/color';
import { CrewsBreakpoints } from './src/styles/breakpoints';

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
    screens: CrewsBreakpoints,
    boxShadow: {
      'custom-shadow': '0px -10px 50px 0px rgba(0, 0, 0, 0.1)',
      'custom-light-shadow': '0px -10px 50px 0px rgba(200, 200, 200, 0.2)',
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
        'shake-infinite': {
          '0%': { transform: 'translateX(0)' }, // 시작 위치
          '5%': { transform: 'translateX(-5px)' }, // 왼쪽으로 이동
          '10%': { transform: 'translateX(5px)' }, // 오른쪽으로 이동
          '15%': { transform: 'translateX(-5px)' }, // 왼쪽으로 다시 이동
          '20%': { transform: 'translateX(0)' }, // 원래 위치로 복귀
          '100%': { transform: 'translateX(0)' }, // 원래 위치로 복귀
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shake: 'shake 0.25s linear',
        'shake-infinite': 'shake-infinite 1.5s infinite linear',
        fadeIn: 'fadeIn 1s linear',
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
