/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      lg: { max: "1024px" },
      md: { max: "768px" },
      sm: { max: "640px" },
      "2sm": { max: "425px" },
    },
    extend: {
      textColor: {
        "prim-color": "#060710",
      },
      backgroundColor: {
        "prim-color": "#EDE8E3",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "1100px",
          padding: "0 20px",
          margin: "0 auto",
        },
      });
    },
  ],
};
