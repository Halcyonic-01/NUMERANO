import { useMemo } from 'react';
import { motion } from 'framer-motion';
import NUMERANO from "./components/NUMERANO";

const HERO_FEATURES = [
  { color: 'cyan', label: 'Live Sessions' },
  { color: 'blue', label: 'Research Projects' },
  { color: 'purple', label: 'Math Competitions' },
] as const;


export default function HeroSection() {
  const particles = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 2,
    })), []
  );

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center">

      <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        <motion.div
          className="pointer-events-auto relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-full">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute w-[2px] h-[2px] bg-cyan-300/40 rounded-full"
                style={{
                  left: particle.left,
                  top: particle.top,
                  animation: `float ${particle.duration}s ease-in-out infinite`,
                  animationDelay: `${particle.delay}s`,
                }}
              />
            ))}
          </div>

          <div className="pointer-events-auto">
            <NUMERANO />
          </div>

          <motion.div
            className="relative mb-12 max-w-[700px] mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="mx-auto text-gray-200 text-[1.2rem] md:text-[1.4rem] font-light leading-relaxed text-center">
              By{" "}
              <span className="relative inline-block">
                <span className="text-cyan-300 font-semibold bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-3 py-1 rounded-lg border border-cyan-500/30">
                  Department of Mathematics
                </span>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
              </span>
              {" "}of Dayananda Sagar College of Engineering
            </p>

            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-400 flex-wrap">
              {HERO_FEATURES.map((feature, idx) => (
                <div key={feature.label} className="flex items-center gap-2">
                  {idx > 0 && <div className="w-1 h-1 bg-gray-600 rounded-full hidden sm:block" />}
                  <div className={`w-2 h-2 bg-${feature.color}-500 rounded-full animate-pulse`} />
                  <span>{feature.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
