/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          50: '#f0f9ff',
          200: '#bae6fd',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca'
        },
        secondary: {
          50: '#f3e8ff',
          100: '#e9d5ff',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9'
        },
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          700: '#047857'
        },
        surface: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827'
        }
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui']
      },
      backdropBlur: {
        'xs': '2px'
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-gentle': 'pulse-gentle 2s ease-in-out infinite'
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        }
      }
    },
  },
  plugins: [],
}