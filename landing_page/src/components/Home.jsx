import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import Features from '../components/Features';
import UseCaseSection from '../components/UseCaseSection';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <ProblemSection />
            <SolutionSection />
            <Features />
            <UseCaseSection />
            <Pricing />
            <Footer />
        </div>
    );
};

export default Home;
