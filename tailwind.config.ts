import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/flyonui/dist/js/*.js',
  ],

  flyonui: {
    themes: ["corporate"]
  },

  plugins: [
    require('flyonui'),
    require('flyonui/plugin')
  ],
} satisfies Config;
