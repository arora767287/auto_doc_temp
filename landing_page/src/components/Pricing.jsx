import React from 'react';

const Pricing = () => {
    return (
        <div id="pricing" className="bg-gray-50 py-16 px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800">Simple, Transparent Pricing</h2>
                <p className="mt-4 text-gray-600">Choose a plan that fits your needs and team size.</p>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 border rounded-lg shadow">
                        <h3 className="font-bold text-xl">Small Teams</h3>
                        <p className="mt-4">$59/employee/month</p>
                    </div>
                    <div className="p-6 border rounded-lg shadow">
                        <h3 className="font-bold text-xl">Medium Teams</h3>
                        <p className="mt-4">$49/employee/month</p>
                    </div>
                    <div className="p-6 border rounded-lg shadow">
                        <h3 className="font-bold text-xl">Large Teams</h3>
                        <p className="mt-4">$39/employee/month</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
