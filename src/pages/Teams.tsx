import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LeadershipSection from '../components/Team/LeadershipSection';
import TeamSection from '../components/Team/TeamSection';
import { clubLeadership, teams } from '../data/teamData';

export default function Teams() {
    const [activeTab, setActiveTab] = useState(teams[0].id);
    return (
        <div className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 pointer-events-none">
            {/* Leadership Section */}
            <div className="pointer-events-auto">
                <LeadershipSection leadership={clubLeadership} />

                {/* Teams Header */}
                <div className="py-16 text-center relative overflow-hidden">
                    {/* Neon accent glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-cyan-500/10 rounded-full blur-[100px]" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative z-10"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Teams</span>
                        </h2>
                        <p className="text-cyan-100/60 text-lg max-w-2xl mx-auto px-4">
                            Each team brings unique expertise to make Numerano extraordinary
                        </p>
                        <div className="mt-6 flex justify-center">
                            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full" />
                        </div>
                    </motion.div>
                </div>

                {/* Tabbed Navigation */}
                <div className="max-w-7xl mx-auto px-4 mb-4">
                    <div className="flex flex-wrap justify-center gap-4 bg-slate-800/40 backdrop-blur-xl p-2 rounded-2xl border border-cyan-500/20 shadow-xl shadow-cyan-500/10">
                        {teams.map((team) => (
                            <button
                                key={team.id}
                                onClick={() => setActiveTab(team.id)}
                                className={`relative px-6 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === team.id
                                    ? 'text-white shadow-lg'
                                    : 'text-cyan-200/50 hover:text-cyan-200 hover:bg-white/5'
                                    }`}
                            >
                                {activeTab === team.id && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className={`absolute inset-0 rounded-xl bg-gradient-to-r ${team.color} opacity-80`}
                                        style={{ zIndex: -1 }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    <span>{team.icon}</span>
                                    {team.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Selected Team Content */}
                <div className="min-h-[70vh] pointer-events-auto">
                    <AnimatePresence mode="wait">
                        {teams.map((team, index) => (
                            team.id === activeTab && (
                                <motion.div
                                    key={team.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <TeamSection team={team} index={index} />
                                </motion.div>
                            )
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
