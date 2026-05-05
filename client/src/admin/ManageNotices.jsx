import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Bell, Calendar, Type } from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const ManageNotices = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingNotice, setEditingNotice] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const res = await api.get('/api/notices');
            setNotices(res.data);
        } catch (err) {
            toast.error('Failed to fetch notices');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingNotice) {
                await api.put(`/api/notices/${editingNotice._id}`, formData);
                toast.success('Notice updated successfully');
            } else {
                await api.post('/api/notices', formData);
                toast.success('Notice posted successfully');
            }
            fetchNotices();
            closeModal();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this notice?')) {
            try {
                await api.delete(`/api/notices/${id}`);
                toast.success('Notice removed');
                fetchNotices();
            } catch (err) {
                toast.error('Failed to delete');
            }
        }
    };

    const openModal = (notice = null) => {
        if (notice) {
            setEditingNotice(notice);
            setFormData({
                title: notice.title,
                content: notice.content,
                date: new Date(notice.date).toISOString().split('T')[0]
            });
        } else {
            setEditingNotice(null);
            setFormData({ title: '', content: '', date: new Date().toISOString().split('T')[0] });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingNotice(null);
    };

    return (
        <div className="pt-32 pb-20 bg-gray-50 dark:bg-gray-950 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Manage Notices</h1>
                    <button onClick={() => openModal()} className="btn btn-primary flex items-center space-x-2">
                        <Plus size={20} />
                        <span>Post New Notice</span>
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {notices.map((n) => (
                            <motion.div
                                key={n._id}
                                layout
                                className="card p-6 flex items-center justify-between"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-xl text-indigo-600">
                                        <Bell size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{n.title}</h3>
                                        <p className="text-sm text-gray-500">{new Date(n.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button onClick={() => openModal(n)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Edit2 size={20} />
                                    </button>
                                    <button onClick={() => handleDelete(n._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 size={20} />
                                    </button>
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
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white dark:bg-gray-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
                            <div className="flex justify-between items-center p-8 border-b border-gray-100 dark:border-gray-800">
                                <h2 className="text-2xl font-bold">{editingNotice ? 'Edit Notice' : 'Post New Notice'}</h2>
                                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold flex items-center gap-2"><Type size={16} className="text-indigo-500" /> Title</label>
                                    <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold flex items-center gap-2"><Calendar size={16} className="text-indigo-500" /> Date</label>
                                    <input type="date" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold ml-1">Content</label>
                                    <textarea required rows="6" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                                </div>

                                <button type="submit" className="w-full btn bg-indigo-600 text-white hover:bg-indigo-700 py-4 text-lg">
                                    {editingNotice ? 'Update Notice' : 'Post Notice'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageNotices;
