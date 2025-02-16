

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    
    
    extend: {
      colors:{
        hero : {
          100: '#1c2536',
          200: 'hsl(194.4, 69.6%, 27.1%)',
          300: '#1c2536',
          400: '#1c2536',
        },
      },
      
    },
  },
  plugins: [],
}