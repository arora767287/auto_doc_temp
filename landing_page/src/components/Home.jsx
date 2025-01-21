import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import Features from '../components/Features';
import UseCaseSection from '../components/UseCaseSection';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import stripes from './vanishing-stripes.svg';

const Home = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true
        });
    }, []);

    return (
        <div>
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${stripes})` }}></div>

            <Navbar />
            <Hero />
            <div className="opacity-10" style={{ backgroundImage: `url(${stripes})` }}></div>

            <ProblemSection />
            <SolutionSection />
            <Features />
            {/* <UseCaseSection /> */}
            <Pricing />
            <Footer />
        </div>
    );
};

export default Home;