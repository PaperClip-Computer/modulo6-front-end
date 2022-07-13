/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'our-red': {
          light: '#E75252',
          dark: '#B53629',
        },
        'our-grey': {
          'very-light': '#F5F5F5',
          'medium-medium': '#D5D5D5',
          'kinda-dark': '#505050',
          'kinda-dark-transparent': '#50505050',
        },
      },
      fontFamily: {
        roboto: ['Roboto'],
      },
    },
  },
  plugins: [],
};
