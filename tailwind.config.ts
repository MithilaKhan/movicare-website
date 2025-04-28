import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "20px",
      screens: {
        "2xl": "1300px",
      },
    },
    extend: {
      colors: {
        primary: "#286A25",
        secondary: "#54A7C3",
        base: "#5C5C5C", 
        content1:"#070707" , 
        content2:"#828282" , 
        content3:"#525252"
      },
    },
  },
  plugins: [],
} satisfies Config;
