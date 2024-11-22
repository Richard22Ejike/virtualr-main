/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBrown: '#45392C',
        customGreen: '#3B4537',
        customGrey: "#161616",
        customlightBrown: '#6D6154',
      },
    },
  },
  plugins: [],
};
