/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        phone: { max: "767px" },
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to right, #22272e 25%, #2d333b 50%, #22272e 75%)",
      },
    },
  },
  plugins: [],
};
