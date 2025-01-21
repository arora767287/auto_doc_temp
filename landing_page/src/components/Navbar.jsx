import React from 'react';
import black_pepper from "./black_pepper_mix.png";

const Navbar = () => {
    return (
        <nav className="bg-white shadow py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <img src={black_pepper} style={{width: 60}}/>
                    <h1 className="text-2xl font-bold text-black-600">Peppr AI</h1>
                </div>
                <div className="space-x-6">
                    <a href="#problem" className="text-gray-600 hover:text-pink-600">Problem</a>
                    <a href="#solution" className="text-gray-600 hover:text-pink-600">Solution</a>
                    {/* <a href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</a> */}
                    <a href="https://calendly.com/nitya-meeting-times/10-minute-meeting-with-nitya" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                        Book a Demo
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
