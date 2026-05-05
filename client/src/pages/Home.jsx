import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Bell, Image as ImageIcon, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 -z-10" />
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-400/20 rounded-full blur-[100px] animate-pulse" />

                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
                            Icon Technical <span className="text-blue-600">Institute</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                            Empowering the youth of Bhainshaha, Kushinagar with technical skills and career opportunities. Your gateway to a professional future.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/vacancies" className="btn btn-primary flex items-center space-x-2 text-lg px-8 py-4">
                                <span>Browse Vacancies</span>
                                <ArrowRight size={20} />
                            </Link>
                            <Link to="/gallery" className="btn btn-outline flex items-center space-x-2 text-lg px-8 py-4">
                                <span>Explore Gallery</span>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative hidden md:block"
                    >
                        <div className="relative z-10 animate-float">
                             <div className="bg-white p-4 rounded-3xl shadow-2xl border border-gray-100">
                                <img 
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                                    alt="Students" 
                                    className="rounded-2xl w-full h-[400px] object-cover"
                                />
                             </div>
                             <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl shadow-xl max-w-[200px]">
                                <div className="text-blue-600 font-bold text-3xl mb-1">500+</div>
                                <div className="text-sm text-gray-600 font-medium">Successful Placements</div>
                             </div>
                             <div className="absolute -top-6 -left-6 glass p-6 rounded-2xl shadow-xl max-w-[200px]">
                                <div className="text-indigo-600 font-bold text-3xl mb-1">20+</div>
                                <div className="text-sm text-gray-600 font-medium">Partner Companies</div>
                             </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Highlights */}
            <section className="py-24 bg-white dark:bg-gray-950">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose Us?</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">We provide the best-in-class technical training and direct industry connections to kickstart your career.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        { [
                            { icon: <Briefcase className="text-blue-500" size={32} />, title: "Latest Vacancies", desc: "Stay updated with job opportunities from top companies specifically for our students.", link: "/vacancies" },
                            { icon: <Bell className="text-indigo-500" size={32} />, title: "Real-time Notices", desc: "Never miss an important update about classes, exams, or events.", link: "/notices" },
                            { icon: <ImageIcon className="text-purple-500" size={32} />, title: "Campus Life", desc: "Take a look at our vibrant campus life, workshops, and successful events.", link: "/gallery" }
                        ].map((item, idx) => (
                            <Link to={item.link} key={idx}>
                                <motion.div 
                                    whileHover={{ y: -10 }}
                                    className="card p-8 group h-full cursor-pointer"
                                >
                                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl inline-block group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6">{item.desc}</p>
                                    <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform mt-auto">
                                        <span>Learn More</span>
                                        <ChevronRight size={18} />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
