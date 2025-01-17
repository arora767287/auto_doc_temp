import React from 'react';
import productivityTools from './productivity_tools.png';
import processingTools from './processing_tools.png';
import documentationUpdate from './documentation_update.gif';


const SolutionSection = () => {
    return (
        <div id="solution" className="bg-dark-primary py-16 px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-text-primary" data-aos="fade-down">
                        Our Solution: The Virtual Employee Mind
                    </h2>
                    <p className="mt-4 text-text-secondary" data-aos="fade-up" data-aos-delay="100">
                        AI-powered tools designed to retain institutional knowledge, streamline onboarding, and improve workflows.
                    </p>
                </div>

                {/* Horizontal Layout */}
                <div className="flex flex-col space-y-12">
                    {/* First Solution Row */}
                    <div className="flex flex-col md:flex-row items-center gap-8" data-aos="fade-right">
                        <div className="md:w-1/3 p-6 bg-dark-secondary rounded-lg">
                            <h3 className="font-bold text-xl text-text-primary">Holistic Data Ingestion</h3>
                            <p className="mt-2 text-text-secondary">Connects to APIs of enterprise tools like Slack, Jira, Confluence to pull conversations and project documentation securely in real time. </p>
                        </div>
                        <div className="md:w-2/3 p-6 bg-dark-secondary rounded-lg">
                            <div className="h-48 bg-light-accent/10 rounded-lg flex items-center justify-center">
                                <img src={productivityTools} alt="Productivity Tools" style={{borderRadius: 10}}/>
                                {/* <span className="text-text-secondary">Ingestion Process Visualization</span> */}
                            </div>
                        </div>
                    </div>

                    {/* Second Solution Row */}
                    <div className="flex flex-col md:flex-row items-center gap-8" data-aos="fade-left">
                        <div className="md:w-2/3 p-6 bg-dark-secondary rounded-lg order-2 md:order-1">
                            <div className="h-48 transparent rounded-lg flex items-center justify-center">
                                {/* Placeholder for illustration/diagram */}
                                <img src={processingTools} alt="Processing Tools" style={{borderRadius: 10, width: 300}}/>
                                {/* <span className="text-text-secondary">Processing Visualization</span> */}
                            </div>
                        </div>
                        <div className="md:w-1/3 p-6 bg-dark-secondary rounded-lg order-1 md:order-2">
                            <h3 className="font-bold text-xl text-text-primary">Processing</h3>
                            <p className="mt-2 text-text-secondary">Our NLP models parse and analyse communication for context and intent. AI-powered pipelines structure data into knowledge graphs</p>
                        </div>
                    </div>

                    {/* Third Solution Row */}
                    <div className="flex flex-col md:flex-row items-center gap-8" data-aos="fade-right">
                        <div className="md:w-1/3 p-6 bg-dark-secondary rounded-lg">
                            <h3 className="font-bold text-xl text-text-primary">Output</h3>
                            <p className="mt-2 text-text-secondary">Generates AI clone of your employee while creating onboarding guides, automatic documentation updates, decision histories and workflow summaries.</p>
                        </div>
                        <div className="md:w-2/3 p-6 bg-dark-secondary rounded-lg">
                            <div className="h-48 transparent rounded-lg flex items-center justify-center" style={{padding:100}}>
                                <img src={documentationUpdate} alt="Documentation Update" style={{borderRadius: 10, width: 400}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
// const SolutionSection = () => {
//     return (
//         <div className="bg-dark-primary py-16 px-8">
//             <div className="max-w-7xl mx-auto">
//                 <h2 className="text-4xl font-bold text-text-primary text-center mb-16" data-aos="fade-down">
//                     Our Solution
//                 </h2>
//                 <div className="space-y-24">
//                     <div className="flex flex-col md:flex-row items-center gap-12">
//                         <div className="md:w-1/3" data-aos="fade-right">
//                             <h3 className="text-2xl font-bold text-text-primary">Ingestion</h3>
//                             <p className="mt-4 text-text-secondary">Pulls data from tools like Slack, Jira, and Otter.ai.</p>
//                         </div>
//                         <div className="md:w-1/3" data-aos="fade-left">
//                             <img src="/ingestion.svg" alt="Ingestion" />
//                         </div>
//                     </div>
//                     <div className="flex flex-col md:flex-row-reverse items-center gap-12">
//                         <div className="md:w-1/3" data-aos="fade-left">
//                             <h3 className="text-2xl font-bold text-text-primary">Processing</h3>
//                             <p className="mt-4 text-text-secondary">Transforms raw data into actionable insights using AI.</p>
//                         </div>
//                         <div className="md:w-1/3" data-aos="fade-right">
//                             <img src="/processing.svg" alt="Processing" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const SolutionSection = () => {
//     return (
//         <div id="solution" className="bg-white py-16 px-8">
//             <div className="max-w-7xl mx-auto text-center">
//                 <h2 className="text-3xl font-bold text-gray-800">Our Solution: The Virtual Employee Mind</h2>
//                 <p className="mt-4 text-gray-600">
//                     AI-powered tools designed to retain institutional knowledge, streamline onboarding, and improve workflows.
//                 </p>
//                 <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
//                     <div className="p-6 shadow rounded-lg border">
//                         <h3 className="font-bold text-xl text-blue-600">Ingestion</h3>
//                         <p className="mt-2 text-gray-500">Pulls data from tools like Slack, Jira, and Otter.ai.</p>
//                     </div>
//                     <div className="p-6 shadow rounded-lg border">
//                         <h3 className="font-bold text-xl text-blue-600">Processing</h3>
//                         <p className="mt-2 text-gray-500">Transforms raw data into actionable insights using AI.</p>
//                     </div>
//                     <div className="p-6 shadow rounded-lg border">
//                         <h3 className="font-bold text-xl text-blue-600">Output</h3>
//                         <p className="mt-2 text-gray-500">Delivers personalized documentation and insights instantly.</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

export default SolutionSection;
