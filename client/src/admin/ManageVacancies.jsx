import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Calendar, Building2 } from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const ManageVacancies = () => {
    const [vacancies, setVacancies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingVacancy, setEditingVacancy] = useState(null);
    const [formData, setFormData] = useState({
        companyName: '',
        interviewDate: '',
        description: '',
        image: null
    });
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        fetchVacancies();
    }, []);

    const fetchVacancies = async () => {
        try {
            const res = await api.get('/api/vacancy');
            setVacancies(res.data);
        } catch (err) {
            toast.error('Failed to fetch vacancies');
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
        data.append('companyName', formData.companyName);
        data.append('interviewDate', formData.interviewDate);
        data.append('description', formData.description);
        if (formData.image) data.append('image', formData.image);

        try {
            if (editingVacancy) {
                await api.put(`/api/vacancy/${editingVacancy._id}`, data);
                toast.success('Vacancy updated successfully');
            } else {
                await api.post('/api/vacancy', data);
                toast.success('Vacancy added successfully');
            }
            fetchVacancies();
            closeModal();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this vacancy?')) {
            try {
                await api.delete(`/api/vacancy/${id}`);
                toast.success('Vacancy deleted');
                fetchVacancies();
            } catch (err) {
                toast.error('Failed to delete');
            }
        }
    };

    const openModal = (vacancy = null) => {
        if (vacancy) {
            setEditingVacancy(vacancy);
            setFormData({
                companyName: vacancy.companyName,
                interviewDate: new Date(vacancy.interviewDate).toISOString().split('T')[0],
                description: vacancy.description,
                image: null
            });
            setPreviewUrl(vacancy.imageUrl.startsWith('http') ? vacancy.imageUrl : `${import.meta.env.VITE_API_URL}${vacancy.imageUrl}`);
        } else {
            setEditingVacancy(null);
            setFormData({ companyName: '', interviewDate: '', description: '', image: null });
            setPreviewUrl(null);
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingVacancy(null);
        setFormData({ companyName: '', interviewDate: '', description: '', image: null });
        setPreviewUrl(null);
    };

    return (
        <div className="pt-32 pb-20 bg-gray-50 dark:bg-gray-950 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Manage Vacancies</h1>
                    <button onClick={() => openModal()} className="btn btn-primary flex items-center space-x-2">
                        <Plus size={20} />
                        <span>Add New Vacancy</span>
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 uppercase text-xs font-bold">
                                    <tr>
                                        <th className="px-6 py-4">Image</th>
                                        <th className="px-6 py-4">Company</th>
                                        <th className="px-6 py-4">Interview Date</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {vacancies.map((v) => (
                                        <tr key={v._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <img 
                                                    src={v.imageUrl.startsWith('http') ? v.imageUrl : `${import.meta.env.VITE_API_URL}${v.imageUrl}`} 
                                                    className="w-16 h-10 object-cover rounded-lg shadow-sm"
                                                    alt={v.companyName}
                                                />
                                            </td>
                                            <td className="px-6 py-4 font-semibold">{v.companyName}</td>
                                            <td className="px-6 py-4 text-gray-500">{new Date(v.interviewDate).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <button onClick={() => openModal(v)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                    <Edit2 size={18} />
                                                </button>
                                                <button onClick={() => handleDelete(v._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white dark:bg-gray-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
                        >
                            <div className="flex justify-between items-center p-8 border-b border-gray-100 dark:border-gray-800">
                                <h2 className="text-2xl font-bold">{editingVacancy ? 'Edit Vacancy' : 'Add New Vacancy'}</h2>
                                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold ml-1 flex items-center gap-2">
                                            <Building2 size={16} className="text-blue-500" />
                                            Company Name
                                        </label>
                                        <input 
                                            type="text"
                                            required
                                            value={formData.companyName}
                                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                            placeholder="Enter company name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold ml-1 flex items-center gap-2">
                                            <Calendar size={16} className="text-blue-500" />
                                            Interview Date
                                        </label>
                                        <input 
                                            type="date"
                                            required
                                            value={formData.interviewDate}
                                            onChange={(e) => setFormData({ ...formData, interviewDate: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold ml-1">Description</label>
                                    <textarea 
                                        required
                                        rows="4"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        placeholder="Enter job description..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold ml-1">Image Upload</label>
                                    <div className="flex items-center gap-6">
                                        <div className="w-32 h-20 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700">
                                            {previewUrl ? (
                                                <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                                            ) : (
                                                <ImageIcon size={24} className="text-gray-400" />
                                            )}
                                        </div>
                                        <label className="btn btn-outline cursor-pointer text-sm">
                                            <span>Choose Image</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                        </label>
                                    </div>
                                </div>

                                <button type="submit" className="w-full btn btn-primary py-4 text-lg">
                                    {editingVacancy ? 'Update Vacancy' : 'Create Vacancy'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageVacancies;
