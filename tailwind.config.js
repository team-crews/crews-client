import CrewsColors from './src/styles/color';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: 'Pretendard-Regular',
      },
      colors: CrewsColors,
    },
  },
};
