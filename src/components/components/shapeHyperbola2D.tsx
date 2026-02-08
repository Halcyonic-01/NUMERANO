import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ShapeHyperbola2D() {
  const hyperbolaRef = useRef<HTMLDivElement>(null);

  const eqRef = useRef<HTMLDivElement>(null);
  const asymRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);

  const burstRefs = [eqRef, asymRef, focusRef];

  useGSAP(() => {
    // Floating animation
    gsap.to(hyperbolaRef.current, {
      y: -16,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Initial hidden state
    gsap.set(burstRefs.map(r => r.current), {
      opacity: 0,
      scale: 0.6,
    });
  }, []);

  const firecrackerBurst = () => {
    const baseAngle = Math.random() * Math.PI * 2;

    burstRefs.forEach((ref, i) => {
      const angle = baseAngle + i * (2 * Math.PI / burstRefs.length);
      const distance = gsap.utils.random(90, 120);

      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      gsap.set(ref.current, {
        x: 0,
        y: 0,
        opacity: 0,
        scale: 0.6,
      });

      gsap.to(ref.current, {
        x,
        y,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        delay: i * 0.05,
      });

      gsap.to(ref.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "power3.in",
        delay: 0.75 + i * 0.1,
      });
    });
  };

  return (
    <div
      className="relative inline-flex items-center justify-center select-none"
      onMouseEnter={firecrackerBurst}
    >
      {/* Scoped styles */}
      <style>{`
        .hyperbola2d-glow {
          filter: drop-shadow(0 0 18px rgba(0, 220, 255, 0.4));
        }
      `}</style>

      {/* SVG Hyperbola (2D) */}
      <div ref={hyperbolaRef} className="hyperbola2d-glow cursor-pointer">
        <svg width="180" height="140" viewBox="0 0 180 140">
          {/* Axes */}
          {/* Y-axis */}
          <line x1="90" y1="10" x2="90" y2="130" stroke="#7dd3fc" strokeWidth="2" />
          <text x="95" y="20" fill="#7dd3fc" fontSize="12">y</text>

          {/* X-axis */}
          <line x1="10" y1="70" x2="170" y2="70" stroke="#7dd3fc" strokeWidth="2" />
          <text x="170" y="65" fill="#7dd3fc" fontSize="12">x</text>

          {/* Asymptotes */}
          <line
            x1="10"
            y1="120"
            x2="170"
            y2="20"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            opacity="0.6"
          />
          <line
            x1="10"
            y1="20"
            x2="170"
            y2="120"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            opacity="0.6"
          />

          {/* Hyperbola branches */}
          <path
            d="M110 70
               C130 50, 150 30, 170 20"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="3"
          />

          <path
            d="M70 70
               C50 90, 30 110, 10 120"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="3"
          />

          {/* Foci */}
          <circle cx="120" cy="70" r="3.5" fill="#38bdf8" />
          <circle cx="60" cy="70" r="3.5" fill="#38bdf8" />
          <text x="124" y="65" fill="#38bdf8" fontSize="10">F</text>
          <text x="50" y="65" fill="#38bdf8" fontSize="10">F</text>
        </svg>
      </div>

      {/* Firecracker formulas */}
      <div
        ref={eqRef}
        className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none"
      >
        x²/a² − y²/b² = 1
      </div>

      <div
        ref={asymRef}
        className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none"
      >
        Asymptotes: y = ±(b/a)x
      </div>

      <div
        ref={focusRef}
        className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none"
      >
        Foci: (±√(a² + b²), 0)
      </div>
    </div>
  );
}
