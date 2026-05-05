import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Facebook = ({ size = 24, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);

const Twitter = ({ size = 24, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);

const Instagram = ({ size = 24, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Icon Technical Institute</h3>
                    <p className="mb-6">Leading the way in technical excellence and professional training in Bhainshaha, Kushinagar.</p>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-blue-500 transition-colors"><Facebook size={20} /></a>
                        <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="hover:text-pink-500 transition-colors"><Instagram size={20} /></a>
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
                        <li><a href="/vacancies" className="hover:text-blue-400 transition-colors">Vacancies</a></li>
                        <li><a href="/notices" className="hover:text-blue-400 transition-colors">Notices</a></li>
                        <li><a href="/gallery" className="hover:text-blue-400 transition-colors">Gallery</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
                    <ul className="space-y-4">
                        <li className="flex items-start space-x-3">
                            <MapPin className="text-blue-500 mt-1" size={18} />
                            <span>Bhainshaha, Kushinagar, Uttar Pradesh, India</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <Phone className="text-blue-500" size={18} />
                            <span>+91 98765 43210</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <Mail className="text-blue-500" size={18} />
                            <span>info@iconinstitute.com</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} Icon Technical Institute. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
