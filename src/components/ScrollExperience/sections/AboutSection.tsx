import { motion } from 'framer-motion';

interface AboutSectionProps {
    isActive: boolean;
}

export default function AboutSection({ isActive }: AboutSectionProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 }
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

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            className="relative z-10 flex flex-col items-center justify-center h-full px-4 py-12"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 mb-4">
                    WHO ARE WE?
                </h2>
                <div className="w-32 h-1 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full" />
            </motion.div>

            {/* Content */}
            <motion.div variants={itemVariants} className="max-w-4xl mx-auto text-center">
                <p className="text-lg md:text-xl text-cyan-100/80 leading-relaxed mb-8">
                    <span className="text-cyan-400 font-bold">NUMERANO</span> is a prominent technical-cultural student organization at 
                    <span className="text-blue-400 font-semibold"> Dayananda Sagar College of Engineering (DSCE)</span>, Bangalore, 
                    managed by the Department of Mathematics. We focus on building skills through technical workshops, 
                    seminars, and social responsibility activities for engineering students.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                    {[
                        { title: "Technical", desc: "Workshops, seminars, and skill-building sessions including UPSC guidance", icon: "💻" },
                        { title: "Cultural", desc: "Interactive events that bring together students across departments", icon: "🎭" },
                        { title: "Social Impact", desc: "Activities focused on social responsibility and community engagement", icon: "🤝" }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20"
                        >
                            <span className="text-4xl mb-4 block">{item.icon}</span>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-cyan-200/60 text-sm">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Stats & Recruitment */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-8 mt-12">
                {[
                    { number: "5", label: "Teams" },
                    { number: "PR • Tech • Org", label: "Core Teams" },
                    { number: "Media • Emcee", label: "Creative Teams" }
                ].map((stat, idx) => (
                    <div key={idx} className="text-center">
                        <div className="text-2xl md:text-3xl font-black text-cyan-400">{stat.number}</div>
                        <div className="text-cyan-200/60 text-sm">{stat.label}</div>
                    </div>
                ))}
            </motion.div>


        </motion.div>
    );
}
