/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        golden: "#c8a97e",
        footer: "#141313",
        topbarBg: '#FFFFFF0D'
      },
      fontFamily: {
        great: ['Great Vibes', 'cursive'],
        poppins: ['Poppins', 'sans-seri']

      }, //e
    },
  },
  plugins: [],
};
