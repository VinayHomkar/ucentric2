// postcss.config.js (FIXED)

export default {
  plugins: {
    // FIX: Changed from 'tailwindcss' to '@tailwindcss/postcss'
    '@tailwindcss/postcss': {}, 
    autoprefixer: {},
  },
}