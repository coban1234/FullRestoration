export default {
  content: ["./src/**/*.{astro,ts,tsx,js,md,mdx}"],
  theme: {
    extend: {
      colors: {
        plaster: "#F4F1EC",
        white: "#FFFFFF",
        concrete: "#E2DCD3",
        line: { DEFAULT: "#D4CCC1", strong: "#908374" },
        char: { DEFAULT: "#1C1A18", lt: "#2E2A26" },
        slate: "#6B645C",
        clay: { DEFAULT: "#B5512E", dk: "#93401F", br: "#E08A54", tint: "#F3E4DC" },
        oak: { DEFAULT: "#C89A5E", dk: "#7E5A22", lt: "#EFE2CD" },
        green: { DEFAULT: "#4A7C59", dk: "#376243", lt: "#E4EDE6", br: "#8FBE9D" },
        mist: "#C9C2B8",
      },
      fontFamily: {
        display: ['"Clash Display"', "Satoshi", "system-ui", "sans-serif"],
        sans: ["Satoshi", "system-ui", "-apple-system", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: { DEFAULT: "2px", sm: "2px" },
    },
  },
  plugins: [],
};
