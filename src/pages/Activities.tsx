import { useState } from 'react';
import EventModal, { Event } from '../components/EventModal';
import { motion } from 'framer-motion';

export default function Activities() {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const events: Event[] = [
        {
            id: 1,
            title: "Matrix 2026",
            date: "Upcoming 2026",
            description: "The next iteration of our flagship mathematics and technology fest. Stay tuned for bigger competitions, more exciting workshops, and incredible guest speakers.",
            imageUrl: "https://placehold.co/600x400/0a192f/06b6d4?text=Matrix+2026",
            highlights: ["Mega Competitions", "Workshops", "Guest Lectures"],
            videoUrl: ""
        },
        {
            id: 2,
            title: "Matrix 2025",
            date: "March 2025",
            description: "Our highly anticipated annual fest featuring intense mathematical challenges, competitive events, and interactive exhibitions showcasing the beauty of numbers.",
            imageUrl: "https://placehold.co/600x400/0a192f/06b6d4?text=Matrix+2025",
            highlights: ["Math Exhibitions", "Quizzes", "Cash Prizes"]
        },
        {
            id: 3,
            title: "Matrix 2024",
            date: "March 2024",
            description: "A tremendously successful event with massive participation across various colleges. Featured flagship events like the Integration Bee and challenging Treasure Hunts.",
            imageUrl: "https://placehold.co/600x400/0a192f/06b6d4?text=Matrix+2024",
            highlights: ["Massive Participation", "Integration Bee", "Treasure Hunt"]
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 pointer-events-none">
            <div className="max-w-7xl mx-auto pointer-events-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl font-bold text-center text-white mb-4">Our Activities</h1>
                    <p className="text-center text-cyan-100/70 mb-16 max-w-2xl mx-auto">
                        Explore our journey of events, workshops, and competitions.
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {events.map((event) => (
                        <motion.div
                            key={event.id}
                            variants={item}
                            whileHover={{ y: -10 }}
                            className="bg-slate-800/40 backdrop-blur-md rounded-xl shadow-xl border border-cyan-500/20 overflow-hidden cursor-pointer hover:shadow-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300"
                            onClick={() => setSelectedEvent(event)}
                        >
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={event.imageUrl}
                                    alt={event.title}
                                    className="w-full h-full object-cover transform hover:scale-105 transition duration-500 opacity-80 hover:opacity-100"
                                />
                            </div>
                            <div className="p-6">
                                <div className="text-sm font-semibold text-cyan-400 mb-2">{event.date}</div>
                                <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>
                                <p className="text-cyan-100/70 line-clamp-3 mb-4">{event.description}</p>
                                <div className="text-cyan-300 font-semibold text-sm flex items-center group-hover:text-cyan-200 transition-colors">
                                    View Details <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <EventModal
                isOpen={!!selectedEvent}
                onClose={() => setSelectedEvent(null)}
                event={selectedEvent}
            />
        </div>
    );
}
