/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        backgroundColor: "#2F5651",
        text: "#BFD7B7",
        "text-hover": "#abbfa4",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        // "bg-image-example": "url('/src/assets/imageExample.jpeg')",
      },
    },
  },
  plugins: [],
}

