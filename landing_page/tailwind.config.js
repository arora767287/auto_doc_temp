module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                dark: {
                    primary: '#000000',    // Jet black
                    secondary: '#111111',   // Slightly lighter black
                    accent: '#6366F1',      // Indigo instead of teal
                },
                text: {
                    primary: '#F9FAFB',     // Soft white
                    secondary: '#94A3B8',    // Light gray
                },
                accent: {
                    light: '#818CF8',       // Lighter indigo for hover states
                    DEFAULT: '#6366F1',      // Base indigo
                    dark: '#4F46E5',        // Darker indigo for active states
                }
            },
        },
    },
    plugins: [],
};