import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ImageIcon } from 'lucide-react';
import api from '../services/api';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            const res = await api.get('/api/gallery');
            setImages(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-32 pb-20 bg-gray-50 dark:bg-gray-950 min-h-screen">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold mb-4 text-center">Institute Gallery</h1>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                    Capturing moments of learning, achievement, and campus life at Icon Technical Institute.
                </p>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : images.length > 0 ? (
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                        {images.map((image, idx) => (
                            <motion.div
                                key={image._id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="break-inside-avoid relative group overflow-hidden rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800"
                            >
                                <img 
                                    src={image.imageUrl.startsWith('http') ? image.imageUrl : `${import.meta.env.VITE_API_URL}${image.imageUrl}`} 
                                    alt={image.caption}
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <p className="text-white font-medium text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        {image.caption}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                         <ImageIcon className="mx-auto text-gray-300 mb-4" size={48} />
                         <p className="text-xl text-gray-500">No images in the gallery yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;
