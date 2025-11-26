/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
  "./app/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./providers/**/*.{js,ts,jsx,tsx}",
  "./src/**/*.{js,ts,jsx,tsx}",
],


  theme: {
    extend: {
      colors: {
        gg: {
          primary: "#facc15",
          primaryDark: "#eab308",
        }
      },
      boxShadow: {
        soft: "0 2px 10px rgba(0,0,0,0.15)",
      },
    },
  },

  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
