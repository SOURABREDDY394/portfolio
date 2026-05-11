/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Ocean depth colors
        'ocean-black': '#040810',
        'ocean-dark': '#070d1a',
        'ocean-navy': '#0c1a3d',
        'ocean-deep': '#0a1a2e',
        'ocean-shallow': '#081828',
        'ocean-mid': '#061220',
        'ocean-discovery': '#030a14',
        'ocean-abyss': '#020810',
        // Accent colors
        'electric-cyan': '#00e5ff',
        'electric-blue': '#0077ff',
        'neon-cyan': '#5ee7ff',
        'neural-blue': '#5daeff',
        'deep-blue': '#0055cc',
        'cyan-gold': '#aaddff',
      },
      fontFamily: {
        'display': ['DM Sans', 'system-ui', 'sans-serif'],
        'heading': ['Instrument Serif', 'Georgia', 'serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        'glow': '0 0 20px rgba(0, 229, 255, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 229, 255, 0.2)',
        'glow-cyan': '0 0 60px rgba(0, 229, 255, 0.15)',
        'glow-blue': '0 0 30px rgba(0, 119, 255, 0.2)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        "pulse-glow-slow": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
        "wave": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "scroll-dot": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(12px)", opacity: "0" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "breathe": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.5" },
          "50%": { transform: "scale(1.02)", opacity: "0.7" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "float": "float 4s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "pulse-glow-slow": "pulse-glow-slow 4s ease-in-out infinite",
        "wave": "wave 8s linear infinite",
        "scroll-dot": "scroll-dot 2s ease-in-out infinite",
        "rotate-slow": "rotate-slow 20s linear infinite",
        "breathe": "breathe 6s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
