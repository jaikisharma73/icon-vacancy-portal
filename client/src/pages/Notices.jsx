import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, ChevronRight } from 'lucide-react';
import api from '../services/api';

const Notices = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const res = await api.get('/api/notices');
            setNotices(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-32 pb-20 bg-gray-50 dark:bg-gray-950 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">Notices & Announcements</h1>
                    
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : notices.length > 0 ? (
                        <div className="space-y-6">
                            {notices.map((notice, idx) => (
                                <motion.div
                                    key={notice._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="card p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start"
                                >
                                    <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl text-blue-600">
                                        <Bell size={28} />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-center space-x-3 text-sm text-gray-500 mb-2">
                                            <Calendar size={16} />
                                            <span>{new Date(notice.date).toLocaleDateString()}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3">{notice.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                                            {notice.content}
                                        </p>
                                    </div>
                                    <button className="self-end md:self-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                        <ChevronRight className="text-gray-400" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl">
                            <Bell className="mx-auto text-gray-300 mb-4" size={48} />
                            <p className="text-xl text-gray-500">No active notices at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notices;
