/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue_gray: {
          900: 'rgb(37, 41, 47)',
          600: 'rgb(122, 128, 134)',
        },
        'outline-black-light': 'rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
