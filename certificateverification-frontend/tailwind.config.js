/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPurple: '#58468c',
        customGreen: '#00ff00',
        // Add more custom colors as needed
      },
      zero: {
        // Reset all properties to zero
        all: '0',
      },
    },
    // container: {
    //   screens: {
    //     mobile: "600px",
    //     tablet: "900px",
    //     desktop: "1200px",
    //   },
    fontSize: {
      'xs': '0.625rem',
      'sm': '0.75rem',
      'md': '0.8125rem',
      'base': '0.875rem',
      'lg': '1rem',
      'xl': '1.125rem',
      '2xl': '1.25rem',
      '3xl': '1.5rem',
      '4xl': '2rem',
      '5xl': '2.25rem',
      '6xl': '2.5rem',
      '7xl': '3rem',
      '8xl': '4rem',
      '9xl': '6rem',
      '10xl': '8rem'
    },

    // screens:{
    //   'xs': '475px',
    // }
  },
  plugins: [],
}

