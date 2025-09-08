/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        feldgrau: '#627264',
        celadon: '#A1CDA8',
        'celadon-light': '#B5DFCA',
        'mint-green': '#C5E7E2',
        'rose-quartz': '#AD9BAA',
        'han-blue': '#3B71CA',
        'cerulean-blue': '#3566B6',
        'backdrop': '#0009'
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
  darkMode: 'media'
}

