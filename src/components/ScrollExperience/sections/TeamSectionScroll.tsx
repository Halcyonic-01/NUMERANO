import { motion } from 'framer-motion';
import { Team } from '../../../types/team';

interface TeamSectionScrollProps {
    team: Team;
    isActive: boolean;
    teamIndex: number;
}

export default function TeamSectionScroll({ team, isActive, teamIndex }: TeamSectionScrollProps) {
    const isEven = teamIndex % 2 === 0;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const headVariants = {
        hidden: { opacity: 0, x: isEven ? -100 : 100, scale: 0.8 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut" as const }
        }
    };

    const memberVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                delay: 0.3 + i * 0.05,
                ease: "easeOut" as const
            }
        })
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            className="relative z-10 flex flex-col h-full px-4 py-8 overflow-hidden"
        >
            {/* Header */}
            <motion.div
                variants={headVariants}
                className={`flex items-center gap-4 mb-8 ${isEven ? 'justify-start' : 'justify-end'}`}
            >
                <div className={!isEven ? 'text-right' : ''}>
                    <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                        {team.name}
                    </h2>
                    <div className={`h-1 w-24 bg-gradient-to-r ${team.color} rounded-full mt-2 ${!isEven && 'ml-auto'} shadow-lg shadow-cyan-400/30`} />
                </div>
            </motion.div>

            {/* Main Content - Head + Members */}
            <div className={`flex-1 flex ${isEven ? 'flex-row' : 'flex-row-reverse'} gap-6 items-start max-w-6xl mx-auto w-full`}>
                {/* Team Head */}
                <motion.div
                    variants={headVariants}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="flex-shrink-0 relative group"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition-opacity" />
                    <div className="relative w-48 md:w-56 bg-slate-900/80 backdrop-blur rounded-2xl overflow-hidden border border-cyan-500/30">
                        <div className="h-48 md:h-56 overflow-hidden">
                            <img
                                src={team.head.photo}
                                alt={team.head.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(team.head.name)}&size=300&background=0a192f&color=22d3ee&bold=true`;
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                        </div>
                        <div className="p-4 text-center">
                            <span className="inline-block px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-bold mb-2">
                                HEAD
                            </span>
                            <h3 className="text-lg font-bold text-white truncate">{team.head.name}</h3>
                        </div>
                    </div>
                </motion.div>

                {/* Members Grid */}
                <div className="flex-1 overflow-y-auto max-h-[60vh] pr-2 scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent">
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                        {team.members?.map((member, idx) => (
                            <motion.div
                                key={idx}
                                custom={idx}
                                variants={memberVariants}
                                whileHover={{ y: -5, scale: 1.05 }}
                                className="relative group"
                            >
                                <div className="absolute -inset-0.5 bg-cyan-400 rounded-xl blur-sm opacity-0 group-hover:opacity-40 transition-opacity" />
                                <div className="relative bg-slate-800/60 backdrop-blur rounded-xl overflow-hidden border border-cyan-500/20">
                                    <div className="h-24 md:h-28 overflow-hidden">
                                        <img
                                            src={member.photo}
                                            alt={member.name}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=150&background=1e293b&color=22d3ee&bold=true`;
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                                    </div>
                                    <div className="p-1.5 text-center">
                                        <p className="text-xs font-medium text-white truncate">{member.name}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
