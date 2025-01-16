import React, { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SiAuthy } from 'react-icons/si';
import { FaMoneyCheck } from "react-icons/fa6";
import { IoLogOutOutline } from 'react-icons/io5';
import { FaRegUser } from 'react-icons/fa';
import { RiLoginCircleLine, RiDashboardLine } from 'react-icons/ri';
import { BiCategory, BiTransfer } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';

const PrivateNavbar = ({ isAuthenticated = true }) => {
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

    const handleLogout = () => {
        // Clear any authentication tokens from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Any other cleanup needed (e.g., clearing app state)

        // Redirect to login page
        navigate('/login');
    };

    const navigation = isAuthenticated ? [
        { name: 'Dashboard', href: '/dashboard', icon: RiDashboardLine },
        { name: 'Transactions', href: '/add-transaction', icon: BiTransfer },
        { name: 'Categories', href: '/categories', icon: BiCategory },
        { name: 'Profile', href: '/profile', icon: CgProfile },
    ] : [
        { name: 'Login', href: '/login', icon: RiLoginCircleLine },
        { name: 'Register', href: '/register', icon: FaRegUser },
    ];

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
                                    <FaMoneyCheck className="h-8 w-auto text-green-500 transition-transform duration-300 group-hover:scale-110" />
                                    <span className="hidden md:block text-lg font-semibold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
                                        Expense Tracker
                                    </span>
                                </Link>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center gap-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${isActive(item.href)
                                            ? 'bg-green-100 text-green-600'
                                            : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        <item.icon className={`h-5 w-5 ${isActive(item.href) ? 'text-green-500' : ''
                                            }`} />
                                        <span className="text-sm font-medium">{item.name}</span>
                                    </Link>
                                ))}
                                {isAuthenticated && (
                                    <button
                                        onClick={handleLogout}
                                        className="ml-2 px-4 py-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-300 flex items-center gap-2"
                                    >
                                        <IoLogOutOutline className="h-5 w-5" />
                                        <span className="text-sm font-medium">Logout</span>
                                    </button>
                                )}
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
                            <div className="space-y-1 px-4 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${isActive(item.href)
                                            ? 'bg-green-50 text-green-600'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            } flex items-center gap-3`}
                                    >
                                        <item.icon className={`h-5 w-5 ${isActive(item.href) ? 'text-green-500' : ''
                                            }`} />
                                        {item.name}
                                    </Link>
                                ))}
                                {isAuthenticated && (
                                    <button
                                        onClick={handleLogout}
                                        className="w-full mt-2 px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200 flex items-center gap-3"
                                    >
                                        <IoLogOutOutline className="h-5 w-5" />
                                        Logout
                                    </button>
                                )}
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    );
};

export default PrivateNavbar;