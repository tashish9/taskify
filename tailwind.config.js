/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bluishTeal: "#2C677E",
      },
      minHeight: {
        28: "7rem",
        24: "6rem",
      },
      fontFamily: {
        serif: ["Quattrocento", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
