import { motion } from 'framer-motion';
import { useRef } from 'react';
import { teams, clubLeadership } from '../../../data/teamData';

interface AllTeamsSectionProps {
    isActive: boolean;
}

export default function AllTeamsSection({ isActive }: AllTeamsSectionProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    if (!isActive) return null;

    // Handle wheel event to keep scroll within the container
    const handleWheel = (e: React.WheelEvent) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const { scrollTop, scrollHeight, clientHeight } = container;
        const isAtTop = scrollTop === 0;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

        // Only stop propagation if we can scroll in the direction of the wheel
        if ((e.deltaY < 0 && !isAtTop) || (e.deltaY > 0 && !isAtBottom)) {
            e.stopPropagation();
        }
    };

    return (
        <motion.div
            ref={scrollContainerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 h-full px-4 py-6 overflow-y-auto scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-cyan-500/50"
            style={{ maxHeight: 'calc(100vh - 4rem)' }}
            onWheel={handleWheel}
        >
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center mb-6"
            >
                <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 mb-2">
                    OUR TEAM
                </h2>
                <div className="w-24 h-1 mx-auto bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
            </motion.div>

            {/* Club Leadership */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
            >
                <h3 className="text-lg font-bold text-cyan-400 text-center mb-4">Club Leadership</h3>
                <div className="flex justify-center gap-6 flex-wrap">
                    {[clubLeadership.head, clubLeadership.coHead].map((leader, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -3, scale: 1.02 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity" />
                            <div className="relative bg-slate-900/80 rounded-xl overflow-hidden border border-cyan-500/30 w-36">
                                <div className="h-36 overflow-hidden">
                                    <img
                                        src={leader.photo}
                                        alt={leader.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(leader.name)}&size=200&background=0a192f&color=22d3ee&bold=true`;
                                        }}
                                    />
                                </div>
                                <div className="p-2 text-center">
                                    <p className="text-xs text-cyan-400 font-bold">{idx === 0 ? 'HEAD' : 'CO-HEAD'}</p>
                                    <p className="text-sm font-bold text-white truncate">{leader.name}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* All Teams */}
            <div className="max-w-6xl mx-auto space-y-6 pb-20">
                {teams.map((team, teamIdx) => (
                    <motion.div
                        key={team.id}
                        initial={{ opacity: 0, x: teamIdx % 2 === 0 ? -30 : 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + teamIdx * 0.1 }}
                        className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-5 border border-cyan-500/20"
                    >
                        {/* Team Header */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${team.color}`} />
                            <h3 className="text-lg font-bold text-white">{team.name}</h3>
                            <div className={`h-px flex-1 bg-gradient-to-r ${team.color} opacity-30`} />
                        </div>

                        {/* Team Head + Members Row */}
                        <div className="flex gap-4 items-start">
                            {/* Team Head */}
                            <div className="flex-shrink-0 w-28">
                                <div className="bg-slate-900/60 rounded-lg overflow-hidden border border-cyan-500/30">
                                    <div className="h-28 overflow-hidden">
                                        <img
                                            src={team.head.photo}
                                            alt={team.head.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(team.head.name)}&size=150&background=1e293b&color=22d3ee&bold=true`;
                                            }}
                                        />
                                    </div>
                                    <div className="p-2 text-center">
                                        <p className="text-[10px] text-cyan-400 font-bold">HEAD</p>
                                        <p className="text-xs text-white truncate">{team.head.name}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Members Grid */}
                            <div className="flex-1 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
                                {team.members?.map((member, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-slate-800/60 rounded-lg overflow-hidden border border-cyan-500/10 hover:border-cyan-500/40 hover:scale-105 transition-all"
                                    >
                                        <div className="h-16 overflow-hidden">
                                            <img
                                                src={member.photo}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=100&background=1e293b&color=22d3ee`;
                                                }}
                                            />
                                        </div>
                                        <p className="text-[9px] text-white/80 truncate px-1 py-1 text-center">
                                            {member.name.replace(/[\[\]]/g, '').replace(/Member \d+/, `M${idx + 1}`)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
