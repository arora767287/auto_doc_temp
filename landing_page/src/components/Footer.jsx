import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="max-w-7xl mx-auto text-center">
                <p className="text-sm">© 2025 Peppr AI. All rights reserved.</p>
                <div className="mt-4 flex justify-center space-x-6">
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        <i className="fab fa-linkedin"></i> LinkedIn
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        <i className="fab fa-twitter"></i> Twitter
                    </a>
                    <a href="mailto:support@peppr.ai" className="hover:text-blue-400">
                        <i className="fas fa-envelope"></i> Contact Us
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
