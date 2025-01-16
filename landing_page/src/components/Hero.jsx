import React from 'react';

const Hero = () => {
    return (
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-20 px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
                <div className="text-center md:text-left">
                    <h1 
                        className="text-5xl font-bold leading-tight"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        Turning Invisible Work into Institutional Wisdom
                    </h1>
                    <p 
                        className="mt-6 text-lg"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        AI-powered tools to capture knowledge, accelerate onboarding, and future-proof your organization.
                    </p>
                    <div 
                        className="mt-10 space-x-4"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        {/* buttons */}
                    </div>
                </div>
                <img 
                    src="/hero-illustration.svg" 
                    alt="Hero Illustration" 
                    className="w-2/3 md:w-1/2 mt-10 md:mt-0"
                    data-aos="fade-left"
                    data-aos-delay="400"
                />
            </div>
        </div>
    );
};

export default Hero;
