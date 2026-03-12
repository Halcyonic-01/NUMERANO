import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQSectionProps {
    isActive: boolean;
}

const faqs = [
    {
        question: "How can I join Numerano?",
        answer: "You can join Numerano during our recruitment drive at the beginning of each semester. Keep an eye on our social media and college notices for announcements."
    },
    {
        question: "Do I need to be a math major to join?",
        answer: "No! Numerano welcomes students from all departments. All you need is curiosity and enthusiasm for mathematics."
    },
    {
        question: "What activities does Numerano organize?",
        answer: "We organize workshops, guest lectures, math competitions, Pi Day celebrations, and various interactive sessions throughout the year."
    },
    {
        question: "How often does the club meet?",
        answer: "We have regular weekly meetings along with special events and competitions throughout the semester."
    },
    {
        question: "What is Brain Buff?",
        answer: "Brain Buff is our weekly mathematical challenge where members can test their problem-solving skills with interesting puzzles and problems."
    }
];

export default function FAQSection({ isActive }: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" as const }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            className="relative z-10 flex flex-col items-center justify-center h-full px-4 py-12 overflow-y-auto"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-10">
                <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 mb-4">
                    FAQ
                </h2>
                <p className="text-cyan-200/60 text-lg">Frequently Asked Questions</p>
                <div className="w-32 h-1 mx-auto mt-4 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full" />
            </motion.div>

            {/* FAQ List */}
            <div className="max-w-2xl w-full space-y-3">
                {faqs.map((faq, idx) => (
                    <motion.div
                        key={idx}
                        variants={itemVariants}
                        className="bg-slate-800/40 backdrop-blur-xl rounded-xl border border-cyan-500/20 overflow-hidden"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-700/30 transition-colors"
                        >
                            <span className="text-white font-medium pr-4">{faq.question}</span>
                            <motion.div
                                animate={{ rotate: openIndex === idx ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronDown className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                            </motion.div>
                        </button>
                        
                        <AnimatePresence>
                            {openIndex === idx && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-4 pt-0 text-cyan-200/70 border-t border-cyan-500/10">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
