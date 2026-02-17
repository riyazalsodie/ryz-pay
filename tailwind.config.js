/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0057d0',
                secondary: '#6D7F9A',
                accent: '#94A9C7',
                background: '#fbfcff',
                surface: '#ffffff',
                'blue-50': '#f4f9ff',
                'blue-100': '#e5efff', // light blue bg for headers
                'blue-200': '#cde1ff', // Pay button bg
                'red-500': '#ec1c24', // Nagad dot
                'pink-500': '#e2136e', // bKash personal
            },
            fontFamily: {
                sans: ['"Baloo Da 2"', 'cursive', 'sans-serif'],
                bangla: ['"Baloo Da 2"', 'cursive'],
            },
            boxShadow: {
                'card': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                'blue-sm': '0 4px 6px -1px rgb(0 87 208 / 0.05), 0 2px 4px -2px rgb(0 87 208 / 0.05)',
                'blue-lg': '0 10px 15px -3px rgb(0 87 208 / 0.1), 0 4px 6px -4px rgb(0 87 208 / 0.1)',
            }
        },
    },
    plugins: [],
}
