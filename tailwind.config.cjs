/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,svelte}",
  ],
  theme: {
    extend: {
      colors: {
        'spotify-green': '#1cd760',
        'spotify-black-1': '#070707',
        'spotify-black-2': '#121212',
        'spotify-black-3': '#181818',
        'spotify-black-4': '#282828',
        'linkedin-blue-1': '#0077b5',
        'gmail-red-1': '#c71610',
        'discord-blurple': '#7289DA',
        'twitter-blue-1': '#00acee',
        'x-black-1': '#000',
        'zasifer-yellow-1': '#FFD600',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
