module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        DEFAULT: ['Scheherazade'],
      },
      colors: {
        'blue-black': '#2A3140',
        'white-pink': '#FFF9F9',
        'red-pink': '#FF6666',
      },
      dropShadow: {
        DEFAULT: '0px 4px 4px rgba(42, 49, 64, 0.5)',
      },
      lineHeight: {
        15: '3.75rem',
      },
    },
  },
  plugins: [],
}
