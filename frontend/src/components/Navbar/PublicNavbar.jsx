import React, { useState, useEffect } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaMoneyCheck } from "react-icons/fa6";
import { RiLoginCircleLine } from 'react-icons/ri';
import { FaRegUser } from 'react-icons/fa';
import { BiHomeAlt2 } from 'react-icons/bi';

const PublicNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const isActive = (path) => location.pathname === path;

    return (
        <Disclosure as="nav"
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-white'
                }`}>
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            {/* Logo and Brand */}
                            <div className="flex items-center">
                                <Link to="/" className="flex items-center gap-2 group">
                                    <div className="relative">
                                        <FaMoneyCheck className="h-8 w-auto text-green-500 transition-transform duration-300 group-hover:scale-110" />
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                                    </div>
                                    <span className="hidden md:block text-lg font-semibold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
                                        Expense Tracker
                                    </span>
                                </Link>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center gap-2">
                                {/* Home link */}
                                <Link
                                    to="/"
                                    className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${isActive('/')
                                            ? 'bg-green-100 text-green-600'
                                            : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    <BiHomeAlt2 className={`h-5 w-5 ${isActive('/') ? 'text-green-500' : ''}`} />
                                    <span className="text-sm font-medium">Home</span>
                                </Link>

                                {/* Auth buttons */}
                                <div className="flex items-center gap-2 ml-2">
                                    <Link
                                        to="/register"
                                        className="px-4 py-2 rounded-full border-2 border-green-500 text-green-600 hover:bg-green-50 transition-all duration-300 flex items-center gap-2"
                                    >
                                        <FaRegUser className="h-4 w-4" />
                                        <span className="text-sm font-medium">Register</span>
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
                                    >
                                        <RiLoginCircleLine className="h-4 w-4" />
                                        <span className="text-sm font-medium">Login</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Mobile menu button */}
                            <Disclosure.Button className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                                <span className="sr-only">Open main menu</span>
                                {open ? (
                                    <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </Disclosure.Button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <Disclosure.Panel className="md:hidden">
                            <div className="space-y-2 px-4 pb-3 pt-2">
                                {/* Home link */}
                                <Link
                                    to="/"
                                    className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${isActive('/')
                                            ? 'bg-green-50 text-green-600'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        } flex items-center gap-3`}
                                >
                                    <BiHomeAlt2 className={`h-5 w-5 ${isActive('/') ? 'text-green-500' : ''}`} />
                                    Home
                                </Link>

                                {/* Mobile auth buttons */}
                                <Link
                                    to="/register"
                                    className="w-full px-3 py-2 rounded-lg text-base font-medium bg-green-50 text-green-600 hover:bg-green-100 transition-all duration-200 flex items-center gap-3"
                                >
                                    <FaRegUser className="h-5 w-5" />
                                    Register
                                </Link>
                                <Link
                                    to="/login"
                                    className="w-full px-3 py-2 rounded-lg text-base font-medium bg-green-500 text-white hover:bg-green-600 transition-all duration-200 flex items-center gap-3"
                                >
                                    <RiLoginCircleLine className="h-5 w-5" />
                                    Login
                                </Link>
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    );
};

export default PublicNavbar;