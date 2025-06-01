/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: 'rgb(250, 250, 250)',
        },
        blue_gray: {
          50: 'rgb(246,252,255)',
          100: 'rgb(241, 247, 255)',
          500: 'rgb(164 169 176)',
          600: 'rgb(122, 128, 134)',
          700: 'rgb(102, 107, 114)',
          900: 'rgb(37, 41, 47)',
        },
        blue: {
          '600_P': 'rgb(60 141 255)',
        },
        'outline-black-light': 'rgba(0, 0, 0, 0.05)',
      },
      height: {
        navigation: '54px',
        'full-without-navigation': 'calc(100vh - 54px)',
      },
    },
  },
  plugins: [],
};
