/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      colors: {
        "primary": "#F67366",
        "secondary": "#FFF6DF",
        "terciary": "#2C2D5B",
        "background": "#F67366",
      },
      boxShadow: {
        home: "0 0 25px rgba(151, 151, 151, 0.2)"
      }
    },
  },
  plugins: [],
}