import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00ABE4", // Bright blue (primary color)
          50: "#E9F1FA", // Very light shade
          100: "#D1E4F9", // Light shade
          200: "#B3D7F8", // Soft shade
          300: "#94C8F6", // Base shade
          400: "#76B9F5", // Medium shade
          500: "#00ABE4", // Bright blue (primary color)
          600: "#0098D4", // Darker shade
          700: "#0085B9", // Even darker shade
          800: "#00709E", // Dark shade
          900: "#005B84", // Darkest shade
        },
        paragraph: {
          DEFAULT: "#333333", // Dark gray for paragraphs
        },
        secondary: {
          DEFAULT: "#df2a19", // Soft red for secondary actions
          // DEFAULT: "#ffd700", // Soft red for secondary actions
          // DEFAULT: "#D1C4E9", // Soft red for secondary actions
        },
        accent: {
          DEFAULT: "#FFC107", // A vibrant yellow for accents
        },
        danger: {
          DEFAULT: "#FF4E3E", // A strong red for danger
        },
        warning: {
          DEFAULT: "#FFA500", // Orange for warning messages
        },
        success: {
          DEFAULT: "#17BD8D", // Green for success messages
        },
        important: {
          DEFAULT: "#FFCC00", // Bright yellow for important notices
        },
      },
    },
  },
  plugins: [],
};
export default config;
