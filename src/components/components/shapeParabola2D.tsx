import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ShapeParabola2D() {
  const parabolaRef = useRef<HTMLDivElement>(null);

  const eqRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);

  const burstRefs = [eqRef, areaRef, focusRef];

  useGSAP(() => {
    // Floating animation
    gsap.to(parabolaRef.current, {
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
        .parabola2d-glow {
          filter: drop-shadow(0 0 18px rgba(0, 220, 255, 0.4));
        }
      `}</style>

      {/* SVG Parabola (2D) */}
      <div ref={parabolaRef} className="parabola2d-glow cursor-pointer">
        <svg width="180" height="140" viewBox="0 0 180 140">
          {/* Axes */}
          {/* Y-axis */}
          <line x1="90" y1="10" x2="90" y2="120" stroke="#7dd3fc" strokeWidth="2" />
          <text x="95" y="20" fill="#7dd3fc" fontSize="12">y</text>

          {/* X-axis */}
          <line x1="20" y1="100" x2="160" y2="100" stroke="#7dd3fc" strokeWidth="2" />
          <text x="160" y="95" fill="#7dd3fc" fontSize="12">x</text>

          {/* Parabola curve */}
          <path
            d="M40 100
               Q90 20 140 100"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
          />

          {/* Focus point */}
          <circle cx="90" cy="60" r="4" fill="#0ea5e9" />
          <text x="98" y="62" fill="#0ea5e9" fontSize="11">F</text>
        </svg>
      </div>

      {/* Firecracker formulas */}
      <div
        ref={eqRef}
        className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none"
      >
        y = ax²
      </div>

      <div
        ref={areaRef}
        className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none"
      >
        Area = ab³/3
      </div>

      <div
        ref={focusRef}
        className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none"
      >
        Focus = (0, 1/4a)
      </div>
    </div>
  );
}
