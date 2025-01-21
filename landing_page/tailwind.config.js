module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                dark: {
                    primary: '#1E3A8A',    // Deep navy blue
                    secondary: '#1E293B',   // Dark blue-gray
                    accent: '#0D9488',      // Teal
                },
                text: {
                    primary: '#F9FAFB',     // Soft white
                    secondary: '#94A3B8',    // Light gray
                },
                accent: {
                    light: '#2DD4BF',       // Lighter teal for hover states
                    DEFAULT: '#0D9488',      // Base teal
                    dark: '#0F766E',        // Darker teal for active states
                }
            },
        },
    },
    plugins: [],
};