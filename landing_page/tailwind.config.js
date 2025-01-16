module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                dark: {
                    primary: '#0F172A',    // Very dark blue
                    secondary: '#1E293B',  // Dark blue-gray
                    accent: '#3B82F6',     // Bright blue for accents
                },
                text: {
                    primary: '#F8FAFC',    // Almost white
                    secondary: '#94A3B8',  // Light gray
                }
            },
        },
    },
    plugins: [],
};