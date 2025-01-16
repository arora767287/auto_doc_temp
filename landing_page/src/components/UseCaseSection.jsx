import React from 'react';

const UseCaseSection = () => {
    return (
        <div id="use-cases" className="bg-white py-16 px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800">Who Benefits from Peppr AI?</h2>
                <p className="mt-4 text-gray-600">From HR teams to managers and employees, Peppr AI creates value across your organization.</p>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 shadow rounded-lg border">
                        <h3 className="font-bold text-xl text-blue-600">HR Teams</h3>
                        <p className="mt-2 text-gray-500">Reduce turnover costs and preserve institutional knowledge.</p>
                    </div>
                    <div className="p-6 shadow rounded-lg border">
                        <h3 className="font-bold text-xl text-blue-600">Managers</h3>
                        <p className="mt-2 text-gray-500">Ensure continuity by centralizing workflows and processes.</p>
                    </div>
                    <div className="p-6 shadow rounded-lg border">
                        <h3 className="font-bold text-xl text-blue-600">Employees</h3>
                        <p className="mt-2 text-gray-500">Access information faster and reduce time spent waiting for answers.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UseCaseSection;
