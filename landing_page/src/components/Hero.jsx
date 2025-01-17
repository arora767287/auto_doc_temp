import React from 'react';

const Hero = () => {
    return (
        <div className="bg-dark-primary text-white py-40 px-8">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
                <div className="text-center max-w-3xl">
                    {/* YC Badge - Centered */}
                    <div className="flex justify-center items-center mb-8">
                        <div className="flex items-center bg-white rounded-md px-4 py-2">
                            <img 
                                src="https://cdn.prod.website-files.com/678080d1d91280220934c40e/6780878659cebb397e97a57f_YClogo.svg" 
                                loading="lazy" 
                                width="21" 
                                alt="Y Combinator Logo" 
                                className="mr-2"
                            />
                            <p className="text-black text-sm font-medium">
                                Backed by Y Combinator
                            </p>
                        </div>
                    </div>

                    <h1 
                        className="text-5xl font-bold leading-tight text-text-primary"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        Turning Invisible Work into Institutional Wisdom
                    </h1>
                    <p 
                        className="mt-6 text-lg text-text-secondary"
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
                        {/* Button placeholder */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
