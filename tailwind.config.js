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
        tomato_red: 'rgb(255, 26, 0)',
        gray: {
          50: 'rgb(250, 250, 250)',
          500: 'rgb(158, 158, 158)',
        },
        blue_gray: {
          50: 'rgb(246,252,255)',
          100: 'rgb(241, 247, 255)',
          200: 'rgb(236 ,242, 250)',
          300: 'rgb(227, 233, 241)',
          500: 'rgb(164 169 176)',
          400: 'rgb(193 199 207)',
          600: 'rgb(122, 128, 134)',
          700: 'rgb(102, 107, 114)',
          800: 'rgb(70, 75, 82)',
          900: 'rgb(37, 41, 47)',
        },
        blue: {
          '600_P': 'rgb(60 141 255)',
        },
        black: {
          900: 'rgb(21,21,21)',
        },
        'outline-black-light': 'rgba(0, 0, 0, 0.05)',
      },
      height: {
        navigation: '54px',
      },
      minHeight: {
        full_without_navigation: 'calc(100vh - 54px)',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      borderWidth: {
        0.5: '0.5px',
      },
    },
  },
  plugins: [],
};
