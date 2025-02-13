/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        primary:'#007BFF',
        secondary: '#FFFFFF',
        text: '#333333',
        titles:'#283593',
        content:'#4C9CCF'
      }
    },
  },
  plugins: [],
}

