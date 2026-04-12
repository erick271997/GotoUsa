/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0A1F44',
        gold: '#FFD700',
        gradientStart: '#667eea',
        gradientEnd: '#764ba2'
      }
    },
  },
  plugins: [],
}