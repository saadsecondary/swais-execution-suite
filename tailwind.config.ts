import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        display: ["Geist", "system-ui", "sans-serif"],
        body: ["Geist", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
        serif: ["Instrument Serif", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
        obsidian: "hsl(var(--obsidian))",
        ink: "hsl(var(--ink))",
        navy: {
          DEFAULT: "hsl(var(--navy))",
          deep: "hsl(var(--navy-deep))",
        },
        cobalt: {
          DEFAULT: "hsl(var(--cobalt))",
          bright: "hsl(var(--cobalt-bright))",
        },
        azure: "hsl(var(--azure))",
        ice: "hsl(var(--ice))",
      },
      backgroundImage: {
        "gradient-hero": "var(--gradient-hero)",
        "gradient-cobalt": "var(--gradient-cobalt)",
        "gradient-aurora": "var(--gradient-aurora)",
        "gradient-navy": "var(--gradient-navy)",
        "gradient-glow": "var(--gradient-glow)",
        "gradient-card": "var(--gradient-card)",
        "gradient-text": "var(--gradient-text)",
      },
      boxShadow: {
        glow: "var(--shadow-glow)",
        cobalt: "var(--shadow-cobalt)",
        elite: "var(--shadow-elite)",
        card: "var(--shadow-card)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "fade-in": { "0%": { opacity: "0", transform: "translateY(10px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s var(--ease-elite, ease-out)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
