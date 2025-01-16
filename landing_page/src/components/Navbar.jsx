import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-white shadow py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
                <h1 className="text-2xl font-bold text-blue-600">Peppr AI</h1>
                <div className="space-x-6">
                    <a href="#problem" className="text-gray-600 hover:text-blue-600">Problem</a>
                    <a href="#solution" className="text-gray-600 hover:text-blue-600">Solution</a>
                    <a href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</a>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                        Get Started
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
