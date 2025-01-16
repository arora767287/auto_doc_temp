import React from 'react';

const ProblemSection = () => {
    return (
        <div id="problem" className="bg-gray-100 py-16 px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800">The Problem</h2>
                <p className="mt-4 text-gray-600">
                    Organizations struggle with lost knowledge, inefficient onboarding, and limited process visibility.
                </p>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-white shadow rounded-lg">
                        <h3 className="font-bold text-xl">90% of critical work is undocumented</h3>
                        <p className="mt-2 text-gray-500">Key knowledge is lost in Slack, meetings, and Jira tickets.</p>
                    </div>
                    <div className="p-6 bg-white shadow rounded-lg">
                        <h3 className="font-bold text-xl">$47M annual productivity loss</h3>
                        <p className="mt-2 text-gray-500">Due to inefficient knowledge sharing and process delays.</p>
                    </div>
                    <div className="p-6 bg-white shadow rounded-lg">
                        <h3 className="font-bold text-xl">5.3 hours/week spent waiting</h3>
                        <p className="mt-2 text-gray-500">Employees waste valuable time searching for information.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemSection;
