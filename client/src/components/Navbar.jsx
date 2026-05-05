import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Vacancies', path: '/vacancies' },
        { name: 'Notices', path: '/notices' },
        { name: 'Gallery', path: '/gallery' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    ICON INSTITUTE
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`font-medium transition-colors hover:text-blue-600 ${isActive(link.path) ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <Link to="/admin" className="btn btn-primary flex items-center space-x-2">
                                <LayoutDashboard size={18} />
                                <span>Dashboard</span>
                            </Link>
                            <button onClick={logout} className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary flex items-center space-x-2">
                            <LogIn size={18} />
                            <span>Login</span>
                        </Link>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden p-2 text-gray-600" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass absolute top-full left-0 w-full border-t border-gray-100 animate-in slide-in-from-top duration-300">
                    <div className="flex flex-col p-6 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`text-lg font-medium ${isActive(link.path) ? 'text-blue-600' : 'text-gray-600'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        {user ? (
                            <>
                                <Link to="/admin" onClick={() => setIsOpen(false)} className="text-lg font-medium text-blue-600">Dashboard</Link>
                                <button onClick={() => { logout(); setIsOpen(false); }} className="text-lg font-medium text-red-600 text-left">Logout</button>
                            </>
                        ) : (
                            <Link to="/login" onClick={() => setIsOpen(false)} className="text-lg font-medium text-blue-600">Login</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
