/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        automotive: {
          navy: '#1e293b',
          'navy-light': '#334155',
          'navy-dark': '#0f172a',
          red: '#dc2626',
          'red-light': '#ef4444',
          'red-dark': '#b91c1c',
          silver: '#64748b',
          'silver-light': '#94a3b8',
          'silver-dark': '#475569',
          carbon: '#0f172a',
          gold: '#f59e0b',
          'gold-light': '#fbbf24',
        }
      },
      backgroundImage: {
        'gradient-automotive': 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        'gradient-silver': 'linear-gradient(135deg, #64748b 0%, #334155 100%)',
        'gradient-red': 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
      },
      fontFamily: {
        'automotive': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-in',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
};