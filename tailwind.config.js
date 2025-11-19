/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // This is crucial: ensures Tailwind scans all your React files for classes
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}