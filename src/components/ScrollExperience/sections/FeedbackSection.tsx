import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, CheckCircle } from 'lucide-react';

interface FeedbackSectionProps {
    isActive: boolean;
}

export default function FeedbackSection({ isActive }: FeedbackSectionProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" as const }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Connect to backend
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setName('');
            setEmail('');
            setFeedback('');
        }, 3000);
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            className="relative z-10 flex flex-col items-center justify-center h-full px-4 py-12"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-10">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <MessageSquare className="w-10 h-10 text-cyan-400" />
                    <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300">
                        FEEDBACK
                    </h2>
                </div>
                <p className="text-cyan-200/60 text-lg">We'd love to hear from you!</p>
                <div className="w-32 h-1 mx-auto mt-4 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full" />
            </motion.div>

            {/* Feedback Form */}
            <motion.form
                variants={itemVariants}
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-cyan-500/20"
            >
                {submitted ? (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center py-8"
                    >
                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                        <p className="text-cyan-200/60">Your feedback has been submitted.</p>
                    </motion.div>
                ) : (
                    <>
                        {/* Name and Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-white font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your Name"
                                    required
                                    className="w-full bg-slate-900/50 border border-cyan-500/20 rounded-xl p-4 text-white placeholder-cyan-200/30 focus:outline-none focus:border-cyan-400 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-white font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    className="w-full bg-slate-900/50 border border-cyan-500/20 rounded-xl p-4 text-white placeholder-cyan-200/30 focus:outline-none focus:border-cyan-400 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Feedback Text */}
                        <div className="mb-6">
                            <label className="block text-white font-medium mb-3">Your feedback</label>
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder="Share your thoughts, suggestions, or ideas..."
                                rows={4}
                                className="w-full bg-slate-900/50 border border-cyan-500/20 rounded-xl p-4 text-white placeholder-cyan-200/30 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={!name.trim() || !email.trim() || !feedback.trim()}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/30"
                        >
                            <Send className="w-5 h-5" />
                            Submit Feedback
                        </motion.button>
                    </>
                )}
            </motion.form>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="mt-8 text-center">
                <p className="text-cyan-200/50 text-sm">
                    For inquiries, reach us at{' '}
                    <a href="mailto:numeranoclubdsce@gmail.com" className="text-cyan-400 hover:underline">
                        numeranoclubdsce@gmail.com
                    </a>
                </p>
            </motion.div>
        </motion.div>
    );
}
