import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screen: {
        "2xl": { max: "1535px" },
        // => @media (max-width: 1535px) { ... }

        xl: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        lg: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        md: { max: "767px" },
        // => @media (max-width: 767px) { ... }

        sm: { max: "639px" },
        // => @media (max-width: 639px) { ... }

        xs: { max: "479px" },
        // => @media (max-width: 479px) { ... }

        xxs: { max: "320px" },
        // => @media (max-width: 320px) { ... }
      },

      colors: {
        black: "#1b1b1b",
        white: "#f5f5f5",
        orange: "#ffc172",
        secondOrange:"#f1d245",
        blue: "#26798e",
        green: "#63caa7",
        cream: "#ffe3b3",
        grayicons:'#687076',
        orangeicons:'#FF3D00',
        violet:'#9510B8',
        red:'#FF0303',
        yellow:'#F9A825'
      },
      fontFamily: {
        main: ["./public/fonts/ITCKRIST/ITCKRIST.ttf"],
        sans: ["Roboto", "sans-serif"],
        fredoka: ['Fredoka One']
      },
    },
  },
  plugins: [],
}
export default config
