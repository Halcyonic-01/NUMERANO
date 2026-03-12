import { motion } from 'framer-motion';

interface MentorsSectionProps {
    isActive: boolean;
}

// Placeholder data - replace with actual mentor data
const mentors = [
    { name: "[HOD Name]", role: "Head of Department", department: "Mathematics", photo: "/team/hod.jpg" },
    { name: "[Mentor 1]", role: "Faculty Mentor", department: "Mathematics", photo: "/team/mentor1.jpg" },
    { name: "[Mentor 2]", role: "Faculty Mentor", department: "Mathematics", photo: "/team/mentor2.jpg" },
];

export default function MentorsSection({ isActive }: MentorsSectionProps) {
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
                    OUR MENTORS
                </h2>
                <p className="text-cyan-200/60 text-lg">Guiding us on our mathematical journey</p>
                <div className="w-32 h-1 mx-auto mt-4 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full" />
            </motion.div>

            {/* Mentors Grid */}
            <div className="flex flex-wrap justify-center gap-8 max-w-5xl">
                {mentors.map((mentor, idx) => (
                    <motion.div
                        key={idx}
                        variants={itemVariants}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="relative group"
                    >
                        {/* Glow */}
                        <div className={`absolute -inset-2 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity ${
                            idx === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gradient-to-r from-cyan-400 to-blue-500'
                        }`} />
                        
                        {/* Card */}
                        <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-cyan-500/30 w-64">
                            {/* Photo */}
                            <div className="h-72 overflow-hidden">
                                <img
                                    src={mentor.photo}
                                    alt={mentor.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}&size=400&background=0a192f&color=22d3ee&bold=true`;
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                            </div>

                            {/* Badge */}
                            {idx === 0 && (
                                <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500 text-yellow-900 rounded-full text-xs font-bold shadow-lg shadow-yellow-500/50">
                                    HOD
                                </div>
                            )}

                            {/* Info */}
                            <div className="p-5 text-center">
                                <h3 className="text-xl font-bold text-white mb-1">{mentor.name}</h3>
                                <p className={`font-medium ${idx === 0 ? 'text-yellow-400' : 'text-cyan-400'}`}>
                                    {mentor.role}
                                </p>
                                <p className="text-cyan-200/50 text-sm mt-1">{mentor.department}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
