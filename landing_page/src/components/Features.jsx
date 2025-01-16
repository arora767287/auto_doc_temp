import React from 'react';

const Features = () => {
    return (
        <div id="features" className="bg-gray-100 py-16 px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800">Why Choose Peppr AI?</h2>
                <p className="mt-4 text-gray-600">Future-proof your organization with AI-driven tools designed for growth and efficiency.</p>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition-shadow">
                        <h3 className="font-bold text-xl text-blue-600">Knowledge Capture</h3>
                        <p className="mt-2 text-gray-500">Seamlessly integrates with Slack, Jira, Otter.ai, and more to collect critical data.</p>
                    </div>
                    <div className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition-shadow">
                        <h3 className="font-bold text-xl text-blue-600">Accelerated Onboarding</h3>
                        <p className="mt-2 text-gray-500">Empower new hires with institutional knowledge from day one.</p>
                    </div>
                    <div className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition-shadow">
                        <h3 className="font-bold text-xl text-blue-600">Organizational Insights</h3>
                        <p className="mt-2 text-gray-500">Leverage AI to identify bottlenecks and optimize processes.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
