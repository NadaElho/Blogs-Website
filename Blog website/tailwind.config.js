/** @type {import('tailwindcss').Config} */
const defaultTheme =require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
  fontFamily:
  {
    "noto": ['Noto Naskh Arabic', ...defaultTheme.fontFamily.sans],
  }
}


