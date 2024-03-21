import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "#DFF5FF",
        subColor1: "#5356FF",
        subColor2: "#378CE7",
        subColor3: "#67C6E3",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
