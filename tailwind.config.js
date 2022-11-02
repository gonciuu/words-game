/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        colors: {
          primary: {
            50: '#e8f1fe',
            100: '#d1e3fc',
            200: '#a3c8f9',
            300: '#74acf6',
            400: '#4691f3',
            500: '#1875f0',
            600: '#135ec0',
            700: '#0e4690',
            800: '#0a2f60',
            900: '#051730',
          },
          secondary: {
            50: '#eaebeb',
            100: '#d5d6d8',
            200: '#abadb1',
            300: '#818589',
            400: '#575c62',
            500: '#2d333b',
            600: '#24292f',
            700: '#1b1f23',
            800: '#121418',
            900: '#090a0c',
          },
        },
      },
    },
  },
  plugins: [],
}
