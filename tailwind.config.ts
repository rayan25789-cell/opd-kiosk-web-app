import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#0041c8",
        "primary-container": "#0055ff",
        "on-primary": "#ffffff",
        "on-primary-container": "#e3e6ff",
        "primary-fixed": "#dce1ff",
        "primary-fixed-dim": "#b6c4ff",
        "secondary": "#006a6a",
        "secondary-container": "#8cf3f3",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#007070",
        "secondary-fixed": "#8cf3f3",
        "secondary-fixed-dim": "#6fd7d6",
        "tertiary": "#495157",
        "tertiary-container": "#616970",
        "tertiary-fixed": "#dce3eb",
        "surface": "#f9f9fc",
        "surface-dim": "#dadadc",
        "surface-bright": "#f9f9fc",
        "surface-variant": "#e2e2e5",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f3f3f6",
        "surface-container": "#eeeef0",
        "surface-container-high": "#e8e8ea",
        "surface-container-highest": "#e2e2e5",
        "background": "#f9f9fc",
        "on-background": "#1a1c1e",
        "on-surface": "#1a1c1e",
        "on-surface-variant": "#434656",
        "outline": "#737688",
        "outline-variant": "#c3c5d9",
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
      },
      fontFamily: {
        sans: ["Sora", "sans-serif"],
        sora: ["Sora", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        sm: "0.25rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
      spacing: {
        "touch-target-min": "80px",
        "margin-edge": "64px",
        "gutter": "32px",
        "stack-gap": "24px",
        "section-gap": "80px",
      },
    },
  },
  plugins: [],
};

export default config;

