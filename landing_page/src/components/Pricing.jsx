import React from 'react';

const Pricing = () => {
    return (
        <div className="bg-dark-secondary py-16 px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-text-primary text-center mb-16" data-aos="fade-down">
                    Simple, Transparent Pricing
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div className="p-8 bg-dark-primary rounded-lg" data-aos="fade-up">
                        <h3 className="text-xl font-bold text-text-primary">Starter</h3>
                        <p className="mt-4 text-3xl font-bold text-text-primary">$59<span className="text-sm">/employee/month</span></p>
                    </div>
                    <div className="p-8 bg-dark-accent rounded-lg transform md:scale-110 relative" data-aos="fade-up" data-aos-delay="100">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <span className="bg-text-primary text-dark-primary px-4 py-1 rounded-full text-sm font-bold">
                                Most Popular
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-text-primary">Professional</h3>
                        <p className="mt-4 text-3xl font-bold text-text-primary">$99<span className="text-sm">/employee/month</span></p>
                    </div>
                    <div className="p-8 bg-dark-primary rounded-lg" data-aos="fade-up" data-aos-delay="200">
                        <h3 className="text-xl font-bold text-text-primary">Enterprise (2000 + employees)</h3>
                        <p className="mt-4 text-3xl font-bold text-text-primary">Custom</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
// const Pricing = () => {
//     return (
//         <div id="pricing" className="bg-gray-50 py-16 px-8">
//             <div className="max-w-7xl mx-auto text-center">
//                 <h2 className="text-3xl font-bold text-gray-800">Simple, Transparent Pricing</h2>
//                 <p className="mt-4 text-gray-600">Choose a plan that fits your needs and team size.</p>
//                 <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
//                     <div className="p-6 border rounded-lg shadow">
//                         <h3 className="font-bold text-xl">Small Teams</h3>
//                         <p className="mt-4">$59/employee/month</p>
//                     </div>
//                     <div className="p-6 border rounded-lg shadow">
//                         <h3 className="font-bold text-xl">Medium Teams</h3>
//                         <p className="mt-4">$49/employee/month</p>
//                     </div>
//                     <div className="p-6 border rounded-lg shadow">
//                         <h3 className="font-bold text-xl">Large Teams</h3>
//                         <p className="mt-4">$39/employee/month</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

export default Pricing;
