// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F46E5",
          dark: "#3730A3",
          light: "#6366F1",
        },
        secondary: {
          DEFAULT: "#0D9488",
          dark: "#0F766E",
          light: "#14B8A6",
        },
        accent: {
          DEFAULT: "#F59E0B",
          light: "#FBBF24",
          dark: "#D97706",
        },
        background: {
          DEFAULT: "#F3F4F6",
          light: "#FFFFFF",
        },
        text: {
          DEFAULT: "#1F2937",
          muted: "#6B7280",
        },
        error: {
          DEFAULT: "#DC2626",
          light: "#F87171",
        },
      },
    },
  },
  plugins: [],
};
