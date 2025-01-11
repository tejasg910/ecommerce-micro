import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        orangeFlavour: {
          DEFAULT: '#FF5722', // primary orange
          light: '#FF8A50',  // lighter shade
          dark: '#E64A19',   // darker shade
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
