/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#38bdf8",
      },
      boxShadow: {
        glow: "0 0 25px rgba(56,189,248,0.25)",
      },
    },
  },
  plugins: [],
};
