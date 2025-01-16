import React from 'react';

const ProblemSection = () => {
    return (
        <div id="problem" className="bg-dark-primary py-16 px-8">
            <div className="max-w-7xl mx-auto">
                <h2 
                    className="text-3xl font-bold text-text-primary text-center"
                    data-aos="fade-down"
                >
                    The Problem
                </h2>
                <p 
                    className="mt-4 text-text-secondary text-center"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    Organizations struggle with lost knowledge, inefficient onboarding, and limited process visibility.
                </p>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div 
                        className="p-6 bg-dark-secondary border border-text-secondary/20 rounded-lg transform hover:-translate-y-1 transition-all"
                        data-aos="flip-left"
                        data-aos-delay="200"
                    >
                        <h3 className="font-bold text-xl text-text-primary">90% of critical work is undocumented</h3>
                        <p className="mt-2 text-text-secondary">Key knowledge is lost in Slack, meetings, and Jira tickets.</p>
                    </div>
                    <div className="p-6 bg-white shadow rounded-lg"
                        className="p-6 bg-dark-secondary border border-text-secondary/20 rounded-lg transform hover:-translate-y-1 transition-all"
                        data-aos="flip-left"
                        data-aos-delay="200"
                    >
                        <h3 className="font-bold text-xl text-text-primary">$47M annual productivity loss</h3>
                        <p className="mt-2 text-text-secondary">Due to inefficient knowledge sharing and process delays.</p>
                    </div>
                    <div className="p-6 bg-white shadow rounded-lg"
                        className="p-6 bg-dark-secondary border border-text-secondary/20 rounded-lg transform hover:-translate-y-1 transition-all"
                        data-aos="flip-left"
                        data-aos-delay="200"
                    >
                        <h3 className="font-bold text-xl text-text-primary">5.3 hours/week spent waiting</h3>
                        <p className="mt-2 text-text-secondary">Employees waste valuable time searching for information.</p>
                    </div>
                    {/* Similar blocks with different animations */}
                </div>


            </div>
        </div>
    );
}; 


export default ProblemSection;
