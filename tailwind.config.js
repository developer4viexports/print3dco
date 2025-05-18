module.exports = {
    darkMode: 'class', // Enable class-based dark mode
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/app/**/*.{js,ts,jsx,tsx}' // If using Next.js App Router
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                accent: 'var(--color-accent)',
                background: 'var(--color-background)',
                foreground: 'var(--color-foreground)',
            },
            // You can also extend fonts, spacing, etc. here
        },
    },
    plugins: [],
};
