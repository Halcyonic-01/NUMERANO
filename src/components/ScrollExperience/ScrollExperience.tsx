import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Menu, X } from 'lucide-react';

import ParticleField from './ParticleField';
import FloatingShapes from './FloatingShapes';
import HeroSection from '../HeroSection'; // Original hero
import AboutSection from './sections/AboutSection';
import BrainBuffSection from './sections/BrainBuffSection';
import ActivitiesSection from './sections/ActivitiesSection';
import FAQSection from './sections/FAQSection';
import FeedbackSection from './sections/FeedbackSection';

// Section IDs for navigation
const SECTIONS = [
    { id: 'hero', name: 'Home' },
    { id: 'about', name: 'Who Are We' },
    { id: 'brainbuff', name: 'Brain Buff' },
    { id: 'activities', name: 'Activities' },
    { id: 'faq', name: 'FAQ' },
    { id: 'feedback', name: 'Feedback' },
];

export default function ScrollExperience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentSection, setCurrentSection] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isScrollingRef = useRef(false);
    const lastScrollTime = useRef<number>(0);
    const scrollThreshold = 300; // Minimum time between scrolls in ms

    // Navigate to section
    const navigateToSection = useCallback((direction: number) => {
        const now = Date.now();
        if (now - lastScrollTime.current < scrollThreshold) return;
        if (isScrollingRef.current) return;

        setCurrentSection(prev => {
            const nextSection = Math.max(0, Math.min(SECTIONS.length - 1, prev + direction));
            if (nextSection !== prev) {
                lastScrollTime.current = now;
                isScrollingRef.current = true;

                setTimeout(() => {
                    isScrollingRef.current = false;
                }, 500);

                return nextSection;
            }
            return prev;
        });
    }, []);

    // Navigate to specific section by index
    const goToSection = useCallback((index: number) => {
        if (isScrollingRef.current) return;
        isScrollingRef.current = true;
        setCurrentSection(index);
        setMobileMenuOpen(false);
        setTimeout(() => { isScrollingRef.current = false; }, 500);
    }, []);

    // Handle wheel events for section snapping
    const handleWheel = useCallback((e: WheelEvent) => {
        e.preventDefault();

        // Only trigger on significant scroll
        if (Math.abs(e.deltaY) < 20) return;

        const direction = e.deltaY > 0 ? 1 : -1;
        navigateToSection(direction);
    }, [navigateToSection]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        let direction = 0;
        if (e.key === 'ArrowDown' || e.key === 'PageDown') direction = 1;
        if (e.key === 'ArrowUp' || e.key === 'PageUp') direction = -1;

        if (direction !== 0) {
            e.preventDefault();
            navigateToSection(direction);
        }
    }, [navigateToSection]);

    // Handle touch events for mobile
    const touchStartRef = useRef<number>(0);

    const handleTouchStart = useCallback((e: TouchEvent) => {
        touchStartRef.current = e.touches[0].clientY;
    }, []);

    const handleTouchEnd = useCallback((e: TouchEvent) => {
        const touchEnd = e.changedTouches[0].clientY;
        const diff = touchStartRef.current - touchEnd;

        if (Math.abs(diff) > 50) {
            const direction = diff > 0 ? 1 : -1;
            navigateToSection(direction);
        }
    }, [navigateToSection]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('keydown', handleKeyDown);
        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            container.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, [handleWheel, handleKeyDown, handleTouchStart, handleTouchEnd]);

    // Update scroll progress for 3D effects
    useEffect(() => {
        setScrollProgress(currentSection / (SECTIONS.length - 1));
    }, [currentSection]);

    // Get section component
    const renderSection = (sectionIndex: number) => {
        const isActive = currentSection === sectionIndex;

        switch (sectionIndex) {
            case 0: return <HeroSection />;
            case 1: return <AboutSection isActive={isActive} />;
            case 2: return <BrainBuffSection isActive={isActive} />;
            case 3: return <ActivitiesSection isActive={isActive} />;
            case 4: return <FAQSection isActive={isActive} />;
            case 5: return <FeedbackSection isActive={isActive} />;
            default: return <HeroSection />;
        }
    };

    // Get particle color based on section
    const getParticleColor = () => {
        const colors = ['#22d3ee', '#3b82f6', '#8b5cf6', '#22d3ee', '#f59e0b', '#10b981', '#6366f1', '#ec4899'];
        return colors[currentSection] || '#22d3ee';
    };

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 bg-[#020617]"
        >
            {/* Top Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-cyan-500/20"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <button
                            onClick={() => goToSection(0)}
                            className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all"
                        >
                            NUMERANO
                        </button>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {SECTIONS.map((section, index) => (
                                <button
                                    key={section.id}
                                    onClick={() => goToSection(index)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentSection === index
                                            ? 'text-cyan-400 bg-cyan-500/10'
                                            : 'text-white/70 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {section.name}
                                </button>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-cyan-500/10"
                        >
                            <div className="px-4 py-3 space-y-1">
                                {SECTIONS.map((section, index) => (
                                    <button
                                        key={section.id}
                                        onClick={() => goToSection(index)}
                                        className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${currentSection === index
                                                ? 'text-cyan-400 bg-cyan-500/10'
                                                : 'text-white/70 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {section.name}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* 3D Background - only show for non-hero sections */}
            {currentSection > 0 && (
                <div className="absolute inset-0 -z-10">
                    <Canvas
                        camera={{ position: [0, 0, 5], fov: 75 }}
                        gl={{ antialias: true, alpha: true }}
                        style={{ background: 'transparent' }}
                    >
                        <Suspense fallback={null}>
                            <ambientLight intensity={0.4} />
                            <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />
                            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />

                            <ParticleField
                                color={getParticleColor()}
                                count={1500}
                                size={0.012}
                            />

                            <FloatingShapes scrollProgress={scrollProgress} />
                        </Suspense>
                    </Canvas>
                </div>
            )}

            {/* Gradient overlays - only for non-hero sections */}
            {currentSection > 0 && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900/80 pointer-events-none" />
            )}

            {/* Section Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSection}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative z-10 h-full pt-16"
                >
                    {renderSection(currentSection)}
                </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
                {SECTIONS.map((section, index) => (
                    <button
                        key={section.id}
                        onClick={() => goToSection(index)}
                        className="group relative flex items-center justify-end"
                    >
                        {/* Tooltip */}
                        <span className="absolute right-8 px-3 py-1 bg-slate-800/90 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {section.name}
                        </span>

                        {/* Dot */}
                        <motion.div
                            animate={{
                                scale: currentSection === index ? 1.2 : 1,
                                backgroundColor: currentSection === index ? '#22d3ee' : 'rgba(148, 163, 184, 0.5)'
                            }}
                            className="w-3 h-3 rounded-full transition-all duration-300"
                            style={{
                                boxShadow: currentSection === index ? '0 0 15px rgba(34, 211, 238, 0.6)' : 'none'
                            }}
                        />
                    </button>
                ))}
            </div>

            {/* Progress Bar - below navbar */}
            <motion.div
                className="fixed top-16 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 z-40"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentSection + 1) / SECTIONS.length) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            />

            {/* Section Counter */}
            <div className="fixed bottom-6 left-6 z-50 text-white/60 font-mono text-sm">
                <span className="text-cyan-400">{String(currentSection + 1).padStart(2, '0')}</span>
                <span className="mx-2">/</span>
                <span>{String(SECTIONS.length).padStart(2, '0')}</span>
            </div>
        </div>
    );
}
