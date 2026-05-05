import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Building2, Search, Filter, Download, X } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

const Vacancies = () => {
    const [vacancies, setVacancies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetchVacancies();
    }, []);

    const fetchVacancies = async () => {
        try {
            const res = await api.get('/api/vacancy');
            setVacancies(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (imageUrl, companyName) => {
        try {
            const response = await fetch(imageUrl);
            if (!response.ok) throw new Error('Network response was not ok');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${companyName.replace(/\s+/g, '_')}_vacancy.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success('Image download started');
        } catch (err) {
            console.error('Download failed:', err);
            toast.error('Failed to download image');
        }
    };

    const filteredVacancies = vacancies.filter(v => 
        v.companyName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="pt-32 pb-20 bg-gray-50 dark:bg-gray-950 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Available Vacancies</h1>
                        <p className="text-gray-600 dark:text-gray-400">Find your dream job with Icon Technical Institute.</p>
                    </div>
                    
                    <div className="mt-6 md:mt-0 relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text"
                            placeholder="Search by company name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : filteredVacancies.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredVacancies.map((vacancy, idx) => {
                            const fullImageUrl = vacancy.imageUrl.startsWith('http') 
                                ? vacancy.imageUrl 
                                : `${import.meta.env.VITE_API_URL}${vacancy.imageUrl}`;
                                
                            return (
                                <motion.div
                                    key={vacancy._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="card group overflow-hidden"
                                >
                                    <div className="h-48 overflow-hidden relative">
                                        <img 
                                            src={fullImageUrl} 
                                            alt={vacancy.companyName}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                                            onClick={() => setSelectedImage(fullImageUrl)}
                                        />
                                        <div className="absolute top-4 right-4 glass px-3 py-1 rounded-lg flex items-center space-x-2 text-sm font-medium">
                                            <Calendar size={14} />
                                            <span>{new Date(vacancy.interviewDate).toLocaleDateString()}</span>
                                        </div>
                                        <button 
                                            onClick={() => handleDownload(fullImageUrl, vacancy.companyName)}
                                            className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-blue-600 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                                            title="Download Vacancy Image"
                                        >
                                            <Download size={20} />
                                        </button>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center space-x-2 text-blue-600 mb-2">
                                            <Building2 size={18} />
                                            <span className="font-bold text-lg">{vacancy.companyName}</span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-6">
                                            {vacancy.description}
                                        </p>
                                        <button 
                                            onClick={() => setSelectedImage(fullImageUrl)}
                                            className="w-full btn btn-outline py-3"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500">No vacancies found matching your search.</p>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10 cursor-zoom-out"
                    >
                        <button 
                            className="absolute top-10 right-10 text-white hover:text-gray-300 transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={40} />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={selectedImage}
                            alt="Full Screen Preview"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Vacancies;
