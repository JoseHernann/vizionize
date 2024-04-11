/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {},
    colors: {
      primary: '#0007AEF0',
      secondary: '#3439B0F0',
      tertiary: '#5C61E0F0',
      clear: '#898DE8F0',
      auxiliar: '#F4F6FF',
      white: '#ffffff',

      silver: {
        50: 'rgba(247,247,247,0.85)',
        100: '#F4F4F5',
        200: '#dfdfdf',
        300: '#c9c9c9',
        400: '#adadad',
        500: '#999999',
        600: '#888888',
        700: '#7b7b7b',
        800: '#676767',
        900: '#545454',
        950: '#363636',
      },
    },
  },
  plugins: [],
};
