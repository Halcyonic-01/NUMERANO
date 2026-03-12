import { motion } from 'framer-motion';
import { Calendar, Users, Trophy, BookOpen } from 'lucide-react';

interface ActivitiesSectionProps {
    isActive: boolean;
}

const activities = [
    {
        title: "Math Olympiad",
        description: "Annual mathematics competition testing problem-solving skills",
        icon: Trophy,
        color: "from-yellow-400 to-orange-500"
    },
    {
        title: "Weekly Workshops",
        description: "Interactive sessions exploring advanced mathematical concepts",
        icon: BookOpen,
        color: "from-cyan-400 to-blue-500"
    },
    {
        title: "Guest Lectures",
        description: "Learn from industry experts and renowned mathematicians",
        icon: Users,
        color: "from-purple-400 to-pink-500"
    },
    {
        title: "Pi Day Celebration",
        description: "Annual celebration of mathematics on March 14th",
        icon: Calendar,
        color: "from-green-400 to-emerald-500"
    }
];

export default function ActivitiesSection({ isActive }: ActivitiesSectionProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
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
                    ACTIVITIES
                </h2>
                <p className="text-cyan-200/60 text-lg">What we do at Numerano</p>
                <div className="w-32 h-1 mx-auto mt-4 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full" />
            </motion.div>

            {/* Activities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
                {activities.map((activity, idx) => (
                    <motion.div
                        key={idx}
                        variants={itemVariants}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="relative group"
                    >
                        <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${activity.color} opacity-20 group-hover:opacity-40 blur-lg transition-opacity`} />
                        
                        <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 h-full">
                            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${activity.color} mb-4`}>
                                <activity.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{activity.title}</h3>
                            <p className="text-cyan-200/60">{activity.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Upcoming Events Banner */}
            <motion.div 
                variants={itemVariants}
                className="mt-10 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-6 border border-cyan-500/30 max-w-2xl w-full text-center"
            >
                <p className="text-cyan-400 font-bold text-lg">🎉 Stay tuned for upcoming events!</p>
                <p className="text-cyan-200/60 text-sm mt-1">Follow our social media for the latest updates</p>
            </motion.div>
        </motion.div>
    );
}
