/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          DEFAULT: '#f97316'
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#11182c',
          DEFAULT: '#6b7280'
        },
        text: {
          primary: '#1f2937',
          secondary: '#4b5563',
          tertiary: '#6b7280',
          disabled: '#9ca3af',
          'on-primary': '#ffffff'
        },
        background: {
          app: '#f3f4f6',
          component: '#ffffff',
          'component-subtle': '#f9fafb'
        },
        border: {
          primary: '#e5e7eb',
          interactive: '#d1d5db',
          focus: '#f97316'
        },
        status: {
          success: {
            background: '#dcfce7',
            text: '#166534',
            DEFAULT: '#22c55e'
          },
          warning: {
            background: '#fef3c7',
            text: '#b45309',
            DEFAULT: '#f59e0b'
          },
          error: {
            background: '#fee2e2',
            text: '#991b1b',
            DEFAULT: '#ef4444'
          },
          info: {
            background: '#dbeafe',
            text: '#1e40af',
            DEFAULT: '#3b82f6'
          },
          'client-review': {
            background: '#ffedd5',
            text: '#9a3412',
            DEFAULT: '#f97316'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif']
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem'
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      },
      lineHeight: {
        tight: 1.25,
        normal: 1.5,
        loose: 2
      },
      borderRadius: {
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px'
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)'
      }
    },
  },
  plugins: [],
};