import React from 'react';

const Features = () => {
    return (
        <div id="features" className="bg-dark-primary py-16 px-8"> 
            <div className="max-w-7xl mx-auto text-center">
                <h2 
                    className="text-3xl font-bold text-text-primary"
                    data-aos="fade-up"
                >
                    Why Choose Peppr AI?
                </h2>
                <p 
                    className="mt-4 text-text-secondary"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    Future-proof your organization with AI-driven tools designed for growth and efficiency.
                </p>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div 
                        className="p-6 bg-dark-secondary shadow rounded-lg hover:shadow-lg transition-shadow" 
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <div className="p-6 bg-dark-secondary shadow rounded-lg hover:shadow-lg transition-shadow">
                            <h3 className="font-bold text-xl text-dark-accent">Knowledge Capture</h3>
                            <p className="mt-2 text-text-secondary">Seamlessly integrates with Slack, Jira, Otter.ai, and more to collect critical data. We help uncover organizational inefficiencies by having a more granular understanding of each individual's work</p>
                        </div>
                    </div>
                    <div 
                        className="p-6 bg-dark-secondary shadow rounded-lg hover:shadow-lg transition-shadow"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <div className="p-6 bg-dark-secondary shadow rounded-lg hover:shadow-lg transition-shadow">
                            <h3 className="font-bold text-xl text-dark-accent">Accelerated Onboarding</h3>
                            <p className="mt-2 text-text-secondary">Empower new hires with institutional knowledge from day one. Reduce offboarding time while increasing total documented knowledge by over 70%</p>
                        </div>
                    </div>
                    <div 
                        className="p-6 bg-dark-secondary shadow rounded-lg hover:shadow-lg transition-shadow"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        <div className="p-6 bg-dark-secondary shadow rounded-lg hover:shadow-lg transition-shadow">
                            <h3 className="font-bold text-xl text-dark-accent">Organizational Insights</h3>
                            <p className="mt-2 text-text-secondary">Leverage AI to identify bottlenecks and optimize processes; a detailed knowledge base gives AI agents the context they need to operate 10x better</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;