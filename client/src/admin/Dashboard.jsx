import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Bell, Image as ImageIcon, Users, ChevronRight, LayoutDashboard } from 'lucide-react';

const AdminDashboard = () => {
    const stats = [
        { label: 'Total Vacancies', count: '12', icon: <Briefcase size={24} />, color: 'bg-blue-500', link: '/admin/vacancies' },
        { label: 'Active Notices', count: '8', icon: <Bell size={24} />, color: 'bg-indigo-500', link: '/admin/notices' },
        { label: 'Gallery Images', count: '45', icon: <ImageIcon size={24} />, color: 'bg-purple-500', link: '/admin/gallery' },
        { label: 'Admin Users', count: '1', icon: <Users size={24} />, color: 'bg-emerald-500', link: '#' }
    ];

    return (
        <div className="pt-32 pb-20 bg-gray-50 dark:bg-gray-950 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="flex items-center space-x-3 mb-8">
                    <LayoutDashboard className="text-blue-600" size={32} />
                    <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="card p-6 flex items-center space-x-4"
                        >
                            <div className={`${stat.color} p-4 rounded-2xl text-white`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
                                <p className="text-2xl font-bold">{stat.count}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: 'Manage Vacancies', desc: 'Add, edit, or remove job opportunities.', link: '/admin/vacancies', color: 'blue' },
                        { title: 'Manage Notices', desc: 'Post new announcements for students.', link: '/admin/notices', color: 'indigo' },
                        { title: 'Manage Gallery', desc: 'Update institute photos and events.', link: '/admin/gallery', color: 'purple' }
                    ].map((action, idx) => (
                        <Link 
                            key={idx} 
                            to={action.link}
                            className="group"
                        >
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="card p-8 h-full flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{action.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6">{action.desc}</p>
                                </div>
                                <div className="flex items-center text-blue-600 font-bold">
                                    <span>Get Started</span>
                                    <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
