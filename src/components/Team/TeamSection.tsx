import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Team } from '../../types/team';
import MemberCard from './MemberCard';

interface TeamSectionProps {
    team: Team;
    index: number;
}

export default function TeamSection({ team, index }: TeamSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax transforms
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

    // Floating elements parallax (different speeds)
    const floatY1 = useTransform(scrollYProgress, [0, 1], [50, -150]);
    const floatY2 = useTransform(scrollYProgress, [0, 1], [100, -200]);
    const floatY3 = useTransform(scrollYProgress, [0, 1], [30, -80]);

    const isEven = index % 2 === 0;

    return (
        <motion.section
            ref={sectionRef}
            style={{ opacity }}
            className="relative min-h-[70vh] py-8 overflow-hidden"
        >
            {/* Background Parallax Layer */}
            <motion.div
                style={{ y: floatY1 }}
                className={`absolute inset-0 bg-gradient-to-br ${team.color} opacity-0`}
            />

            {/* Neon glow spots */}
            <div className={`absolute ${isEven ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]`} />
            <div className={`absolute ${isEven ? 'right-1/4' : 'left-1/4'} bottom-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[80px]`} />

            {/* Floating Math Symbols - Parallax Layer 1 (Slow) */}
            <motion.div
                style={{ y: floatY1 }}
                className="absolute inset-0 pointer-events-none"
            >
                <span className="absolute top-[10%] left-[5%] text-6xl text-cyan-400/10">∑</span>
                <span className="absolute top-[60%] right-[10%] text-5xl text-blue-400/10">∫</span>
            </motion.div>

            {/* Floating Math Symbols - Parallax Layer 2 (Medium) */}
            <motion.div
                style={{ y: floatY2 }}
                className="absolute inset-0 pointer-events-none"
            >
                <span className="absolute top-[30%] right-[20%] text-4xl text-cyan-300/15">π</span>
                <span className="absolute bottom-[20%] left-[15%] text-5xl text-blue-300/10">√</span>
                {/* Neon lines */}
                <div className={`absolute top-[25%] ${isEven ? 'left-[10%]' : 'right-[10%]'} w-24 h-[1px] bg-gradient-to-r from-cyan-400/50 to-transparent`} />
                <div className={`absolute bottom-[35%] ${isEven ? 'right-[15%]' : 'left-[15%]'} w-32 h-[1px] bg-gradient-to-r from-transparent to-blue-400/50`} />
            </motion.div>

            {/* Floating Shapes - Parallax Layer 3 (Fast) */}
            <motion.div
                style={{ y: floatY3 }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className={`absolute top-[20%] ${isEven ? 'left-[8%]' : 'right-[8%]'} w-20 h-20 rounded-full bg-gradient-to-br ${team.color} opacity-20 blur-2xl`} />
                <div className={`absolute bottom-[30%] ${isEven ? 'right-[5%]' : 'left-[5%]'} w-32 h-32 rounded-full bg-gradient-to-br ${team.color} opacity-15 blur-3xl`} />
                {/* Geometric shapes */}
                <div className={`absolute top-[45%] ${isEven ? 'left-[3%]' : 'right-[3%]'} w-16 h-16 border border-cyan-400/20 rotate-45`} />
                <div className={`absolute bottom-[15%] ${isEven ? 'right-[8%]' : 'left-[8%]'} w-12 h-12 border border-blue-400/20 rounded-full`} />
            </motion.div>

            {/* Content */}
            <motion.div
                style={{ y, scale }}
                className="relative z-10 max-w-6xl mx-auto px-4"
            >
                {/* Team Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center gap-3 mb-8 text-center"
                >
                    {team.icon && <span className="text-5xl drop-shadow-lg">{team.icon}</span>}
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        {team.name}
                    </h2>
                    <div className={`h-1 w-32 bg-gradient-to-r ${team.color} rounded-full mt-2 shadow-lg shadow-cyan-400/30`} />
                </motion.div>

                {/* Team Layout - Top-Down Hierarchy */}
                <div className="flex flex-col items-center gap-12 w-full">
                    {/* Team Head Card Center */}
                    <div className="flex justify-center w-full">
                        <MemberCard member={team.head} variant="head" />
                    </div>

                    {/* Team Members Grid - Responsive full width */}
                    {team.members && team.members.length > 0 && (
                        <div className="w-full">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 justify-center justify-items-center">
                                {team.members.map((member, idx) => (
                                    <MemberCard
                                        key={idx}
                                        member={member}
                                        index={idx}
                                        variant="member"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.section>
    );
}
