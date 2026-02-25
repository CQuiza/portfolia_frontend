/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                obsidian: {
                    DEFAULT: '#020617',
                    light: '#1e293b',
                },
                neon: {
                    cyan: '#00f0ff',
                }
            },
            boxShadow: {
                'neon-cyan': '0 0 15px rgba(0, 240, 255, 0.4)',
                'neon-cyan-lg': '0 0 25px rgba(0, 240, 255, 0.6)',
            },
            backgroundImage: {
                'obsidian-gradient': 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)',
            }
        },
    },
    plugins: [],
}
