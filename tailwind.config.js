/** @type {import('tailwindcss').Config} */
module.exports = {
  // prefix: 'yeslem-',
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-background": "var(--primary-background)",
        "secondary-background": "var(--secondary-background)",
        "header-background": "var(--header-background)",
        "primary-border": "var(--border)",
        "primary-border-hover": "rgb(244, 165, 96)",
        "title": "var(--title)",
        "sub-title": "var(--sub-title)",
        "icon-hover": "var(--icon-hover)",
        "blue-color": "var(--blue)",
        "container-padding": "var(--container-padding)",
        "border-radius": "var(--border-radius)",
        "padding": "var(--padding)",
        "main-buttons-backgraound-color": "rgb(36, 37, 46, 1)"
      },
      padding: {
        'container-padding': 'var(--container-padding)',
      }
    },
  },
  plugins: [],
}

