/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          500: "#CDA349",
          600: "#B9973B",
          700: "#9C7B2B",
        },
        navy: {
          900: "#1B254B",
        },
        green: {
          700: "#2E7D32",
        },
        luxury: {
          gold: "#ffd700",
          dark: "#0a0a0a",
          darker: "#1a1a1a",
          light: "#ffffff",
          gray: "#9ca3af",
          success: "#10b981",
          warning: "#f59e0b",
          danger: "#ef4444"
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ['Inter', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif']
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        'gold-gradient': 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
        'glass': 'rgba(255, 255, 255, 0.05)',
        'glass-gold': 'rgba(255, 215, 0, 0.1)'
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'particle': 'particle 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(255, 215, 0, 0.6)' },
        },
        particle: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)' },
          '100%': { transform: 'translateY(-100vh) rotate(360deg)' },
        }
      },
      boxShadow: {
        'luxury': '0 20px 60px rgba(255, 215, 0, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'gold': '0 10px 30px rgba(255, 215, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
