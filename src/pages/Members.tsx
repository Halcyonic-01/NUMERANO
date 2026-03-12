import { motion } from 'framer-motion';

export default function Members() {
    const members = [
        { role: "President", name: "[Name]" },
        { role: "Vice President", name: "[Name]" },
        { role: "Secretary", name: "[Name]" },
        { role: "Treasurer", name: "[Name]" },
        { role: "Core Team", name: "[Name 1], [Name 2], [Name 3], [Name 4]" },
        { role: "Web Team", name: "[Name 1], [Name 2]" },
        { role: "Event Coordinators", name: "[Name 1], [Name 2], [Name 3]" },
    ];

    return (
        <div className="py-20 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto bg-slate-800/40 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-cyan-500/20"
            >
                <div className="bg-slate-900/80 py-10 px-6 text-center border-b border-cyan-500/20">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">Club Members</h1>
                    <p className="text-cyan-200/60 text-lg">The minds behind the magic</p>
                </div>

                <div className="divide-y divide-cyan-500/10">
                    {members.map((group, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center hover:bg-cyan-500/5 transition duration-200"
                        >
                            <div className="sm:w-1/3 mb-2 sm:mb-0">
                                <span className="text-lg font-bold text-white block border-l-4 border-cyan-400 pl-3">
                                    {group.role}
                                </span>
                            </div>
                            <div className="sm:w-2/3">
                                <span className="text-cyan-100/80 text-lg font-medium">{group.name}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-slate-900/30 p-8 text-center text-cyan-200/50 italic border-t border-cyan-500/20">
                    <p>And many more enthusiastic volunteers and participants!</p>
                </div>
            </motion.div>
        </div>
    );
}
