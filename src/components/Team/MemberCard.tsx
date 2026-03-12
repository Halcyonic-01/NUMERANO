import { motion } from 'framer-motion';
import { TeamMember } from '../../types/team';

interface MemberCardProps {
    member: TeamMember;
    index?: number;
    variant?: 'leader' | 'head' | 'member';
}

export default function MemberCard({ member, index = 0, variant = 'member' }: MemberCardProps) {
    const isLeader = variant === 'leader';
    const isHead = variant === 'head';
    const isMember = variant === 'member';

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -8, scale: 1.03 }}
            className={`relative group ${isLeader ? 'w-72' : isHead ? 'w-60' : 'w-full max-w-[150px]'}`}
        >
            {/* Card */}
            <div className={`
                relative overflow-hidden bg-white shadow-xl
                ${isLeader ? 'rounded-2xl ring-4 ring-cyan-400/50' : isHead ? 'rounded-2xl ring-2 ring-blue-400/30' : 'rounded-xl ring-1 ring-cyan-400/20'}
            `}>
                {/* Photo Container */}
                <div
                    className={`relative overflow-hidden ${isLeader ? 'h-80' : isHead ? 'h-64' : 'h-44'}`}
                >
                    <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=400&background=0a192f&color=fff&bold=true`;
                        }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Quote on Hover */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-numerano-navy/90 flex flex-col items-center justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                    >
                        <p className={`text-white text-center italic ${isLeader ? 'text-sm leading-relaxed' : isHead ? 'text-sm leading-tight' : 'text-xs leading-tight'}`}>
                            "{member.quote}"
                        </p>
                    </motion.div>

                    {/* Name & Role */}
                    <div className={`absolute bottom-0 left-0 right-0 ${isMember ? 'p-2' : 'p-3'} text-white z-10`}>
                        <h3 className={`font-bold truncate ${isLeader ? 'text-xl' : isHead ? 'text-lg' : 'text-sm'}`}>
                            {member.name}
                        </h3>
                        <p className={`text-cyan-200 font-medium ${isLeader ? 'text-sm' : isHead ? 'text-xs' : 'text-[10.5px] truncate'}`}>
                            {member.role}
                        </p>
                    </div>
                </div>

                {/* Badge for Leaders */}
                {isLeader && (
                    <div className="absolute top-3 right-3 bg-cyan-400 text-cyan-900 px-2.5 py-1 rounded-full text-xs font-bold shadow-lg shadow-cyan-400/50">
                        ⭐ LEADER
                    </div>
                )}
            </div>

            {/* Floating decoration */}
            <div className={`
                absolute -z-10 rounded-2xl transition-all duration-300
                ${isLeader
                    ? '-inset-2 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-40 group-hover:opacity-60 blur-xl'
                    : isHead
                        ? '-inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-40 blur-lg'
                        : '-inset-0.5 bg-cyan-400 opacity-0 group-hover:opacity-30 blur-md'
                }
            `} />
        </motion.div>
    );
}
