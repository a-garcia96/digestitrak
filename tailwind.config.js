/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "evening-sea": {
          50: "#f0fdfa",
          100: "#cbfcf1",
          200: "#98f7e5",
          300: "#5cecd5",
          400: "#2bd6c1",
          500: "#12baa8",
          600: "#0b968a",
          700: "#0e776f",
          800: "#105f5a",
          900: "#124e4a",
          950: "#03302f",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
