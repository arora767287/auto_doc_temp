import React from 'react';

const Hero = () => {
    return (
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-20 px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
                <div className="text-center md:text-left">
                    <h1 className="text-5xl font-bold leading-tight">
                        Turning Invisible Work into Institutional Wisdom
                    </h1>
                    <p className="mt-6 text-lg">
                        AI-powered tools to capture knowledge, accelerate onboarding, and future-proof your organization.
                    </p>
                    <div className="mt-10 space-x-4">
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100">
                            Learn More
                        </button>
                        <button className="bg-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-700">
                            Get Started
                        </button>
                    </div>
                </div>
                <img src="/hero-illustration.svg" alt="Hero Illustration" className="w-2/3 md:w-1/2 mt-10 md:mt-0" />
            </div>
        </div>
    );
};

export default Hero;
