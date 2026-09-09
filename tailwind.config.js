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
        // Background tokens
        stat: {
          bg: {
            primary: '#0B0F19',
            elevated: '#111827',
            card: '#161F33',
            secondary: '#1E293B',
            hover: '#243147',
          },
          // Text tokens
          text: {
            primary: '#F8FAFC',
            secondary: '#94A3B8',
            muted: '#64748B',
            bright: '#FFFFFF',
          },
          // Intelligence Accents
          cyan: {
            DEFAULT: '#06B6D4',
            light: '#38BDF8',
            dark: '#0284C7',
            glow: 'rgba(6, 182, 212, 0.15)',
          },
          blue: {
            DEFAULT: '#3B82F6',
            light: '#60A5FA',
            dark: '#1D4ED8',
            glow: 'rgba(59, 130, 246, 0.15)',
          },
          teal: {
            DEFAULT: '#14B8A6',
            light: '#2DD4BF',
            dark: '#0F766E',
            glow: 'rgba(20, 184, 166, 0.15)',
          },
          // Competency tokens
          competency: {
            strong: '#10B981',    // Green/Emerald
            moderate: '#F59E0B',  // Amber
            high: '#6366F1',      // Indigo
            critical: '#F43F5E',  // Soft Rose/Red
          },
          // Status tokens
          status: {
            success: '#10B981',
            warning: '#F59E0B',
            error: '#F43F5E',
            info: '#3B82F6',
          },
          // Border tokens
          border: {
            subtle: 'rgba(255, 255, 255, 0.06)',
            default: 'rgba(255, 255, 255, 0.10)',
            cyan: 'rgba(6, 182, 212, 0.25)',
            active: 'rgba(56, 189, 248, 0.4)',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'stat-glow-cyan': '0 0 20px -3px rgba(6, 182, 212, 0.35)',
        'stat-glow-blue': '0 0 20px -3px rgba(59, 130, 246, 0.35)',
        'stat-glow-teal': '0 0 20px -3px rgba(20, 184, 166, 0.35)',
        'stat-card': '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      },
      backgroundImage: {
        'stat-radial-cyan': 'radial-gradient(circle at center, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
        'stat-radial-blue': 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
        'stat-grid-pattern': "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
      },
      borderRadius: {
        'stat-sm': '0.375rem',
        'stat-md': '0.5rem',
        'stat-lg': '0.75rem',
        'stat-xl': '1rem',
        'stat-2xl': '1.5rem',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'stat-scan': 'scanLine 8s linear infinite',
      },
      keyframes: {
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
