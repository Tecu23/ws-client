/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        active: {
          light: "#7B61FF80",
          dark: "#7B61FF",
        },
        secondary: {
          DEFAULT: "#bac6fc",
        },
        square: {
          light: "#F4F7FA",
          dark: "#B7C0D8",
        },
        piece: {
          DEFAULT: "#34364C",
        },
      },
    },
  },
  plugins: [],
};
