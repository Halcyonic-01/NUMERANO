import { motion } from 'framer-motion';
import { clubLeadership } from '../../../data/teamData';

interface LeadershipSectionProps {
    isActive: boolean;
}

export default function LeadershipSection({ isActive }: LeadershipSectionProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut" as const }
        }
    };

    const LeaderCard = ({ member, isHead }: { member: typeof clubLeadership.head; isHead: boolean }) => (
        <motion.div
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            className="relative group"
        >
            {/* Glow effect */}
            <div className={`absolute -inset-1 rounded-2xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 ${
                isHead ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'
            }`} />
            
            {/* Card */}
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-cyan-500/30">
                {/* Photo */}
                <div className="relative h-72 md:h-80 overflow-hidden">
                    <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=400&background=0a192f&color=22d3ee&bold=true`;
                        }}
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                    
                    {/* Badge */}
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                        isHead 
                            ? 'bg-cyan-400 text-cyan-900 shadow-lg shadow-cyan-400/50' 
                            : 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                    }`}>
                        {isHead ? '⭐ CLUB HEAD' : '✦ CO-HEAD'}
                    </div>

                    {/* Quote on hover */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-slate-900/95 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                        <p className="text-cyan-100/90 text-center italic text-lg leading-relaxed">
                            "{member.quote}"
                        </p>
                    </motion.div>
                </div>

                {/* Info */}
                <div className="p-6 text-center">
                    <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                    <p className={`font-medium ${isHead ? 'text-cyan-400' : 'text-blue-400'}`}>
                        {member.role}
                    </p>
                </div>
            </div>
        </motion.div>
    );

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            className="relative z-10 flex flex-col items-center justify-center h-full px-4"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 mb-4">
                    MEET THE LEADERS
                </h2>
                <div className="w-32 h-1 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full" />
            </motion.div>

            {/* Leaders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl w-full">
                <LeaderCard member={clubLeadership.head} isHead={true} />
                <LeaderCard member={clubLeadership.coHead} isHead={false} />
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center text-cyan-400/60"
                >
                    <span className="text-sm tracking-widest mb-2">MEET THE TEAMS</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
