/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Identity Colors from Logo
        brand: {
          midnight: '#071A33', // Deepest background / dark text
          navy: '#0B2345',     // Deep Navy card/section surface
          royal: '#1459B8',    // Royal Blue metallic
          electric: '#2385E8', // Electric Blue accent
          orange: '#FF7A00',   // Vibrant Orange CTA & Momentum Arrow
          brightOrange: '#FF9A1F', // Secondary warm gradient
          amber: '#FFB13B',    // Accent highlight
          offwhite: '#F5F7FA', // Crisp canvas neutral
          coolgray: '#D9DEE5', // Borders & muted accents
        },
        // Backwards-compatible aliases
        primary: {
          DEFAULT: '#2385E8', // Electric Blue
          dark: '#1459B8',    // Royal Blue
          light: '#e8f2fe',
        },
        navy: {
          DEFAULT: '#071A33', // Midnight Navy
          surface: '#0B2345', // Deep Navy
          light: '#1459B8',
          dark: '#040d1a',
        },
        orange: {
          DEFAULT: '#FF7A00', // Vibrant Orange
          dark: '#e06600',
          light: '#fff2e5',
          bright: '#FF9A1F',
          amber: '#FFB13B',
        },
        neutralBg: '#F5F7FA', // Off-white Background
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'Poppins', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Poppins', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(7, 26, 51, 0.08)',
        'premium-hover': '0 20px 40px -12px rgba(7, 26, 51, 0.16)',
        'glow-orange': '0 8px 24px -4px rgba(255, 122, 0, 0.4)',
        'glow-orange-lg': '0 12px 36px -4px rgba(255, 122, 0, 0.55)',
        'glow-blue': '0 8px 24px -4px rgba(35, 133, 232, 0.4)',
        'glow-blue-lg': '0 12px 36px -4px rgba(35, 133, 232, 0.55)',
        'card-dark': '0 12px 32px -8px rgba(0, 0, 0, 0.35)',
        'button-orange': '0 4px 16px 0 rgba(255, 122, 0, 0.38)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 2s infinite ease-in-out',
        'float': 'float 4s ease-in-out infinite',
        'orbital-slow': 'orbitalRotate 35s linear infinite',
        'orbital-reverse': 'orbitalRotateReverse 28s linear infinite',
        'arrow-momentum': 'arrowMomentum 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.88', transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        orbitalRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        orbitalRotateReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        arrowMomentum: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(3px, -5px)' },
        },
      },
    },
  },
  plugins: [],
}
