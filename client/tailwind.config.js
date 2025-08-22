/* eslint-env node */
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-40px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'navbar-float': {
          '0%': { opacity: 0, transform: 'translateY(-30px) scale(0.98)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: 0.1, transform: 'scale(1)' },
          '50%': { opacity: 0.2, transform: 'scale(1.05)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out',
        'slide-down': 'slide-down 0.8s cubic-bezier(0.4,0,0.2,1)',
        'navbar-float': 'navbar-float 0.8s cubic-bezier(0.4,0,0.2,1)',
        'pulse-slow': 'pulse-slow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};