/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#e07b5b",
        secondary: "#77615a",
        muted: "#47403d",
        card: "#2b2726",
        background: "#1a1919",
        dark: "#111111",
      },
      fontFamily: {
        heading: ["Share Tech", "sans-serif"],
        body: ["Google Sans Flex", "sans-serif"],
      },
    },
  },
  plugins: [],
};