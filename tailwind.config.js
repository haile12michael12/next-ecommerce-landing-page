/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4da6ff',
          DEFAULT: '#0080ff',
          dark: '#0066cc',
        },
        secondary: {
          light: '#ff7e6b',
          DEFAULT: '#ff5a40',
          dark: '#cc4833',
        },
        accent: {
          light: '#ffd166',
          DEFAULT: '#ffc233',
          dark: '#cc9b29',
        },
        neutral: {
          lightest: '#f4f4f5',
          light: '#e4e4e7',
          DEFAULT: '#71717a',
          dark: '#3f3f46',
          darkest: '#18181b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      spacing: {
        '128': '32rem',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
