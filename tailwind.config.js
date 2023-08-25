/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        white: {
          light: '#F5F5F5',
          DEFAULT: '#FFF'
        },
        brown: {
          light: '#515151',
          DEFAULT: '#515151',
          dark: '#353434'
        },
      }
    },
  },
  plugins: [],
}

