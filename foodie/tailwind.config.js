/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'yellow': '#F54748',
        'red': '#FF6868',
        'secondary': '#555',
        'primarybg':'#FCFCFC'
      } 
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: false,
    darkTheme: "light",
    base: false, 
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root", 
  },
}

