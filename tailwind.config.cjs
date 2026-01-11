/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Share Tech", "sans-serif"],
        body: ["Google Sans Flex", "sans-serif"],
      },
    },
  },
  plugins: [],
};
