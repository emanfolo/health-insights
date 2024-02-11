/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./atoms/**/*.{js,ts,jsx,tsx,mdx}",
    "./molecules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["cupcake", "synthwave"],
  },
  plugins: [daisyui],
};
