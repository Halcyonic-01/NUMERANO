import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';

export default function Home() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="min-h-screen text-white pt-0 overflow-x-hidden relative z-10 pointer-events-none">

            {/* ANIMATED HERO SECTION */}
            <HeroSection />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-3 gap-12">
                <motion.div
                    className="md:col-span-2 space-y-6 pointer-events-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h2 className="text-4xl font-bold mb-6 border-l-8 border-cyan-400 pl-4 text-white">
                        Who We Are
                    </h2>
                    <p className="text-lg leading-relaxed text-cyan-100/70">
                        Numerano is not just a club; it's a movement. We are a vibrant community of mathematics enthusiasts dedicated to fostering a love for problem-solving and critical thinking.
                    </p>
                    <p className="text-lg leading-relaxed text-cyan-100/70">
                        We organize weekly challenges, workshops, and inter-college competitions to push the boundaries of mathematical understanding. From easy puzzles to complex theorems, we cover it all.
                    </p>
                </motion.div>

                {/* Brain Buffs Column */}
                <motion.div
                    className="bg-slate-800/40 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-cyan-500/20 pointer-events-auto"
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                        <span>🧠</span> Weekly Brain Buff
                    </h3>
                    <div className="bg-slate-900/50 p-6 rounded-xl mb-6 border border-cyan-500/20">
                        <p className="font-semibold text-lg mb-3 text-cyan-300">Problem #42</p>
                        <p className="italic text-cyan-100/80 font-medium">"If you have a 3-liter jug and a 5-liter jug, how can you measure exactly 4 liters?"</p>
                    </div>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-cyan-200">Your Solution</label>
                            <textarea
                                className="w-full p-3 bg-slate-900/50 border border-cyan-500/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:outline-none transition resize-none text-white placeholder-cyan-200/30"
                                rows={3}
                                placeholder="Type your logic here..."
                            ></textarea>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/30 transition-all"
                        >
                            Submit Answer
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
