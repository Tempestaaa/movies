import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        primary: "#0f0f0f",
        secondary: "#C81E1E",
        text: "#fff",
        sub: "#222222",
      },
      fontFamily: {
        default: '"Montserrat", sans-serif',
      },
    },
  },
  plugins: [flowbite.plugin(), require("tailwind-scrollbar")],
};
