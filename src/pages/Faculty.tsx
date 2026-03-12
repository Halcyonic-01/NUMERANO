import { motion } from 'framer-motion';

export default function Faculty() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-center text-white mb-16"
                >
                    Our Mentors
                </motion.h1>

                {/* HOD Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-slate-800/40 backdrop-blur-md p-8 md:p-12 mb-20 rounded-2xl flex flex-col md:flex-row items-center gap-10 border border-cyan-500/20 shadow-xl"
                >
                    <div className="w-48 h-48 bg-slate-900/50 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg border border-cyan-500/20">
                        <span className="text-cyan-600 font-semibold">HOD Image</span>
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold text-white mb-2">Dr. [Name]</h2>
                        <h3 className="text-lg text-cyan-400 font-semibold mb-4 uppercase tracking-wide">Head of Department</h3>
                        <p className="text-cyan-100/70 leading-relaxed text-lg max-w-2xl">
                            "[Message from HOD about the club's vision and importance of mathematics in modern education.
                            Mathematics is not just about numbers; it is about understanding the patterns of the universe.]"
                        </p>
                    </div>
                </motion.div>

                {/* Teachers Grid */}
                <h2 className="text-3xl font-bold text-white mb-10 text-center">Faculty Coordinators</h2>
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {[1, 2, 3].map((id) => (
                        <motion.div
                            key={id}
                            variants={item}
                            whileHover={{ y: -10 }}
                            className="bg-slate-800/40 backdrop-blur-md p-6 text-center rounded-xl hover:shadow-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 border border-cyan-500/20 shadow-lg"
                        >
                            <div className="w-32 h-32 bg-slate-900/50 rounded-full mx-auto mb-4 flex items-center justify-center shadow-inner border border-cyan-500/20">
                                <span className="text-cyan-600 text-sm">Photo</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">Teacher Name</h3>
                            <p className="text-cyan-400 font-medium mb-3">Designation</p>
                            <p className="text-cyan-100/70 text-sm leading-relaxed">
                                Dedicated mentor guiding students to explore the depths of mathematical concepts and applications.
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
