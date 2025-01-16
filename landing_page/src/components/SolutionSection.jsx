import React from 'react';

const SolutionSection = () => {
    return (
        <div id="solution" className="bg-white py-16 px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800">Our Solution: The Virtual Employee Mind</h2>
                <p className="mt-4 text-gray-600">
                    AI-powered tools designed to retain institutional knowledge, streamline onboarding, and improve workflows.
                </p>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 shadow rounded-lg border">
                        <h3 className="font-bold text-xl text-blue-600">Ingestion</h3>
                        <p className="mt-2 text-gray-500">Pulls data from tools like Slack, Jira, and Otter.ai.</p>
                    </div>
                    <div className="p-6 shadow rounded-lg border">
                        <h3 className="font-bold text-xl text-blue-600">Processing</h3>
                        <p className="mt-2 text-gray-500">Transforms raw data into actionable insights using AI.</p>
                    </div>
                    <div className="p-6 shadow rounded-lg border">
                        <h3 className="font-bold text-xl text-blue-600">Output</h3>
                        <p className="mt-2 text-gray-500">Delivers personalized documentation and insights instantly.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SolutionSection;
