import React from "react";
import {
    FaMoneyBillWave,
    FaRegCalendarAlt,
    FaSignInAlt,
    FaList,
    FaChartPie,
    FaQuoteLeft,
    FaArrowRight,
    FaMobileAlt,
    FaLock,
    FaCloud
} from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <>
            {/* Hero Section with Animated Gradient */}
            <div className="relative bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10"></div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <h1 className="text-6xl font-extrabold tracking-tight">
                                Smart Finance
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-300">
                                    Management
                                </span>
                            </h1>
                            <p className="text-xl text-gray-100">
                                Take control of your financial future with our intuitive expense tracking solution. Designed for modern life.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/register">
                                    <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300">
                                        Start Free Trial
                                    </button>
                                </Link>
                                <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-600 transition duration-300">
                                    Watch Demo
                                </button>
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <img src="./src/assets/expen.png" alt="Dashboard Preview" className="rounded-xl shadow-2xl transform rotate-2 hover:rotate-0 transition duration-300" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900">Powerful Features</h2>
                        <p className="mt-4 text-xl text-gray-600">Everything you need to manage your finances effectively</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <FaMoneyBillWave />, title: "Smart Tracking", desc: "Automated expense categorization" },
                            { icon: <FaMobileAlt />, title: "Mobile First", desc: "Manage on the go" },
                            { icon: <FaCloud />, title: "Cloud Sync", desc: "Access from anywhere" },
                            { icon: <FaLock />, title: "Secure", desc: "Bank-grade encryption" }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
                                <div className="text-4xl text-blue-500 mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* How it Works - Timeline Style */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">How It Works</h2>
                    <div className="relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
                        <div className="space-y-12">
                            {[
                                { icon: <FaSignInAlt />, title: "Create Account", desc: "Quick and easy setup process" },
                                { icon: <FaList />, title: "Add Transactions", desc: "Effortlessly track your spending" },
                                { icon: <FaChartPie />, title: "Generate Insights", desc: "Get powerful financial analytics" }
                            ].map((step, idx) => (
                                <div key={idx} className="relative flex items-center">
                                    <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full text-white relative z-10 mx-auto">
                                        {step.icon}
                                    </div>
                                    <div className="ml-8 bg-white p-6 rounded-xl shadow-lg flex-grow">
                                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                        <p className="text-gray-600">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials with Cards */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">User Stories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Sarah Johnson", role: "Small Business Owner", quote: "This app has transformed how I manage my business expenses." },
                            { name: "Mark Wilson", role: "Freelancer", quote: "The insights feature helps me make better financial decisions." },
                            { name: "Emily Chen", role: "Student", quote: "Perfect for tracking my budget and saving goals!" }
                        ].map((testimonial, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white mb-6">
                                    <FaQuoteLeft />
                                </div>
                                <p className="text-gray-600 mb-6">{testimonial.quote}</p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                    <div className="ml-4">
                                        <p className="font-bold">{testimonial.name}</p>
                                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-20">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-8">
                        Start Your Financial Journey Today
                    </h2>
                    <p className="text-xl text-gray-100 mb-12 max-w-2xl mx-auto">
                        Join thousands of users who have already transformed their financial management
                    </p>
                    <Link to="/register">
                        <button className="px-12 py-5 bg-white text-blue-600 font-bold rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition duration-300">
                            Get Started Now
                            <FaArrowRight className="inline-block ml-2" />
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default HeroSection;