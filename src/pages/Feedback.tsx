import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_ENDPOINTS } from '../config/api';

export default function Feedback() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        description: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting'>('idle');
    const [notification, setNotification] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({
        show: false,
        type: 'success',
        message: ''
    });

    const validateName = (name: string) => {
        // Check if name contains only numbers
        if (name && /^\d+$/.test(name.trim())) {
            return false;
        }
        return true;
    };

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ show: true, type, message });
        setTimeout(() => {
            setNotification((prev) => ({ ...prev, show: false }));
        }, 3000);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateName(formData.name)) {
            showNotification('error', 'Name cannot be just numbers.');
            return;
        }

        setStatus('submitting');

        try {
            const response = await fetch(API_ENDPOINTS.feedback, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit feedback');
            }

            showNotification('success', 'Feedback submitted successfully!');

            // Reset form
            setFormData({
                name: '',
                email: '',
                description: ''
            });
        } catch (error) {
            console.error('Error submitting feedback:', error);
            showNotification('error', 'Something went wrong. Please try again.');
        } finally {
            setStatus('idle');
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const formItem = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden pointer-events-none z-10">
            {/* Toast Notification */}
            <AnimatePresence>
                {notification.show && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className={`fixed top-24 right-4 z-50 px-6 py-4 rounded-lg shadow-xl flex items-center space-x-3 pointer-events-auto ${notification.type === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-700' : 'bg-red-100 border-l-4 border-red-500 text-red-700'
                            }`}
                    >
                        <span className="font-bold">{notification.type === 'success' ? 'Success' : 'Error'}</span>
                        <span>{notification.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto bg-[#0B1120] rounded-2xl shadow-2xl p-8 md:p-12 border border-cyan-500/20 pointer-events-auto"
            >
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 mb-4 text-center">Feedback Form</h1>
                <p className="text-cyan-200/60 text-center mb-10 text-lg">Help us improve future events.</p>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={formItem} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <label className="block text-cyan-200 font-semibold mb-2">Name (Optional)</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-4 bg-slate-900/50 border border-cyan-500/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:outline-none transition text-white placeholder-cyan-200/30"
                                placeholder="Your Name"
                            />
                        </motion.div>

                        <motion.div variants={formItem} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }}>
                            <label className="block text-cyan-200 font-semibold mb-2">Email (Optional)</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-4 bg-slate-900/50 border border-cyan-500/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:outline-none transition text-white placeholder-cyan-200/30"
                                placeholder="your@email.com"
                            />
                        </motion.div>
                    </div>

                    <motion.div variants={formItem} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }}>
                        <label className="block text-cyan-200 font-semibold mb-2">Feedback <span className="text-red-500">*</span></label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="w-full p-4 bg-slate-900/50 border border-cyan-500/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:outline-none transition resize-none text-white placeholder-cyan-200/30"
                            placeholder="Share your thoughts, suggestions, or ideas..."
                        ></textarea>
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={status === 'submitting'}
                        className={`w-full text-white text-lg font-bold py-4 rounded-xl transition shadow-lg flex items-center justify-center gap-2 ${status === 'submitting' ? 'bg-slate-600 cursor-not-allowed opacity-50' : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-cyan-500/30 shadow-lg'
                            }`}
                    >
                        {status === 'submitting' ? 'Submitting...' : 'Submit Feedback'}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
