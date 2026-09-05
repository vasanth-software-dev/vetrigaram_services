/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1677FF', // Electric Blue
          dark: '#0050b3',
          light: '#e6f4ff',
        },
        navy: {
          DEFAULT: '#0B1F3A', // Deep Navy
          light: '#1A365D',
          dark: '#030d1a',
        },
        orange: {
          DEFAULT: '#FF8A34', // Orange
          dark: '#e06b12',
          light: '#fff2e8',
        },
        neutralBg: '#F7F9FC', // Light Background
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(11, 31, 58, 0.1)',
        'premium-hover': '0 20px 40px -15px rgba(11, 31, 58, 0.18)',
        'button-orange': '0 4px 14px 0 rgba(255, 138, 52, 0.4)',
        'button-blue': '0 4px 14px 0 rgba(22, 119, 255, 0.4)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 2s infinite ease-in-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
