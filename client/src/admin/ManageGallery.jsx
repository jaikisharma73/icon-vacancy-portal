import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X, Image as ImageIcon, Type, Edit2 } from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const ManageGallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingImage, setEditingImage] = useState(null);
    const [formData, setFormData] = useState({
        caption: '',
        image: null
    });
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            const res = await api.get('/api/gallery');
            setImages(res.data);
        } catch (err) {
            toast.error('Failed to fetch gallery');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('caption', formData.caption);
        if (formData.image) data.append('image', formData.image);

        try {
            if (editingImage) {
                await api.put(`/api/gallery/${editingImage._id}`, data);
                toast.success('Image updated');
            } else {
                await api.post('/api/gallery', data);
                toast.success('Image uploaded');
            }
            fetchGallery();
            closeModal();
        } catch (err) {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this image?')) {
            try {
                await api.delete(`/api/gallery/${id}`);
                toast.success('Image deleted');
                fetchGallery();
            } catch (err) {
                toast.error('Failed to delete');
            }
        }
    };

    const openModal = (image = null) => {
        if (image) {
            setEditingImage(image);
            setFormData({ caption: image.caption, image: null });
            setPreviewUrl(image.imageUrl.startsWith('http') ? image.imageUrl : `${import.meta.env.VITE_API_URL}${image.imageUrl}`);
        } else {
            setEditingImage(null);
            setFormData({ caption: '', image: null });
            setPreviewUrl(null);
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingImage(null);
        setPreviewUrl(null);
    };

    return (
        <div className="pt-32 pb-20 bg-gray-50 dark:bg-gray-950 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Manage Gallery</h1>
                    <button onClick={() => openModal()} className="btn bg-purple-600 text-white hover:bg-purple-700 flex items-center space-x-2">
                        <Plus size={20} />
                        <span>Upload Photo</span>
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {images.map((img) => (
                            <motion.div key={img._id} layout className="card group relative">
                                <img src={img.imageUrl.startsWith('http') ? img.imageUrl : `${import.meta.env.VITE_API_URL}${img.imageUrl}`} className="w-full h-48 object-cover" alt={img.caption} />
                                <div className="p-4">
                                    <p className="text-sm font-medium truncate">{img.caption}</p>
                                </div>
                                <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => openModal(img)} className="p-2 bg-white/90 text-blue-600 rounded-lg shadow-lg hover:bg-white"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(img._id)} className="p-2 bg-white/90 text-red-600 rounded-lg shadow-lg hover:bg-white"><Trash2 size={16} /></button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white dark:bg-gray-900 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden">
                            <div className="flex justify-between items-center p-8 border-b border-gray-100 dark:border-gray-800">
                                <h2 className="text-2xl font-bold">{editingImage ? 'Edit Photo' : 'Upload New Photo'}</h2>
                                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold flex items-center gap-2"><Type size={16} className="text-purple-500" /> Caption</label>
                                    <input type="text" required value={formData.caption} onChange={(e) => setFormData({ ...formData, caption: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold ml-1">Photo</label>
                                    <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700 relative group">
                                        {previewUrl ? (
                                            <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                                        ) : (
                                            <ImageIcon size={48} className="text-gray-300" />
                                        )}
                                        <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white font-bold">
                                            Change Photo
                                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                        </label>
                                    </div>
                                </div>

                                <button type="submit" className="w-full btn bg-purple-600 text-white hover:bg-purple-700 py-4 text-lg">
                                    {editingImage ? 'Update Info' : 'Upload Photo'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageGallery;
