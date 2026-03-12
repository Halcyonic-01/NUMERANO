import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ClubLeadership } from '../../types/team';
import MemberCard from './MemberCard';

interface LeadershipSectionProps {
    leadership: ClubLeadership;
}

export default function LeadershipSection({ leadership }: LeadershipSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax effects
    const bgY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
    const contentY = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const decorY1 = useTransform(scrollYProgress, [0, 1], [100, -200]);
    const decorY2 = useTransform(scrollYProgress, [0, 1], [50, -150]);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen py-24 overflow-hidden transparent"
        >
            {/* Animated Background */}
            <motion.div
                style={{ y: bgY }}
                className="absolute inset-0"
            >
                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}
                />

                {/* Neon Radial Glows */}
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/15 rounded-full blur-[80px]" />
            </motion.div>

            {/* Floating Decorations - Layer 1 */}
            <motion.div style={{ y: decorY1 }} className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[10%] left-[10%] text-8xl text-cyan-400/10">∞</div>
                <div className="absolute bottom-[20%] right-[15%] text-7xl text-blue-400/10">Σ</div>
                <div className="absolute top-[40%] right-[5%] w-40 h-40 border border-cyan-400/20 rounded-full" />
                <div className="absolute top-[60%] left-[8%] w-24 h-24 border border-blue-400/20 rounded-full" />
            </motion.div>

            {/* Floating Decorations - Layer 2 */}
            <motion.div style={{ y: decorY2 }} className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] right-[25%] text-6xl text-cyan-300/15">★</div>
                <div className="absolute bottom-[30%] left-[20%] text-5xl text-blue-300/10">π</div>
                <div className="absolute bottom-[10%] left-[30%] w-24 h-24 border border-cyan-300/20 rotate-45" />
                {/* Neon lines */}
                <div className="absolute top-[15%] left-[40%] w-32 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                <div className="absolute bottom-[25%] right-[30%] w-40 h-[2px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
            </motion.div>

            {/* Content */}
            <motion.div
                style={{ y: contentY }}
                className="relative z-10 max-w-6xl mx-auto px-4"
            >
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >

                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                        Club <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Leadership</span>
                    </h1>
                    <p className="text-xl text-cyan-100/70 max-w-2xl mx-auto">
                        Meet the visionaries leading Numerano towards excellence
                    </p>
                    <div className="mt-6 flex justify-center gap-2">
                        <span className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" />
                        <span className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full self-center" />
                        <span className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" />
                    </div>
                </motion.div>

                {/* Leaders */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
                    {/* Head */}
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <MemberCard member={leadership.head} variant="leader" />
                    </motion.div>

                    {/* Decorative Connector */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="hidden md:flex flex-col items-center gap-2"
                    >
                        <div className="w-px h-16 bg-gradient-to-b from-cyan-400 to-transparent" />
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-400/40 border border-cyan-300/30">
                            <span className="text-white font-bold text-2xl">&</span>
                        </div>
                        <div className="w-px h-16 bg-gradient-to-b from-transparent to-blue-400" />
                    </motion.div>

                    {/* Co-Head */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <MemberCard member={leadership.coHead} variant="leader" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
