import type { Config } from "tailwindcss";
const { addDynamicIconSelectors } = require("@iconify/tailwind")

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/flyonui/dist/js/*.js',
    './node_modules/notyf/*.js'
  ],

  flyonui: {
    themes: ['light', 'dark', 'gourmet', 'corporate', 'luxury', 'soft'],
    vendors: true
  },

  plugins: [
    require('flyonui'),
    require('flyonui/plugin'),
    addDynamicIconSelectors()
  ],
} satisfies Config;
