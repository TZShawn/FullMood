/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      ...require('tailwindcss/colors'),
      'brown': '#B08968',
      'back-brown': '#b08968',
      'mid-brown' : '#ebcfbc',
      'green-grey' : '#cfd2cd',
      'palette-green': '#ADC280',
      'off-white': '#DFE0DE',
      'paper-brown': '#D5B59C',
      'background-brown': '#B18C65'
    }
  },
  plugins: [],
}