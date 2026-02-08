import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ShapeParaboloid() {
  const paraboloidRef = useRef<HTMLDivElement>(null);

  const eqRef = useRef<HTMLDivElement>(null);
  const volRef = useRef<HTMLDivElement>(null);
  const saRef = useRef<HTMLDivElement>(null);

  const burstRefs = [eqRef, volRef, saRef];

  useGSAP(() => {
    // Floating animation
    gsap.to(paraboloidRef.current, {
      y: -18,
      duration: 3.5,
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
      const distance = gsap.utils.random(110, 140);

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
        .paraboloid-glow {
          filter: drop-shadow(0 0 22px rgba(0, 220, 255, 0.4));
        }
      `}</style>

      {/* SVG Paraboloid with Axes */}
      <div ref={paraboloidRef} className="paraboloid-glow cursor-pointer">
        <svg width="180" height="180" viewBox="0 0 180 180">
          {/* Z axis */}
          <line x1="90" y1="20" x2="90" y2="150" stroke="#7dd3fc" strokeWidth="2" />
          <text x="95" y="25" fill="#7dd3fc" fontSize="12">z</text>

          {/* X axis */}
          <line x1="30" y1="120" x2="150" y2="120" stroke="#7dd3fc" strokeWidth="2" />
          <text x="150" y="115" fill="#7dd3fc" fontSize="12">x</text>

          {/* Y axis (diagonal for 3D feel) */}
          <line x1="90" y1="120" x2="135" y2="155" stroke="#7dd3fc" strokeWidth="2" />
          <text x="140" y="160" fill="#7dd3fc" fontSize="12">y</text>

          {/* Paraboloid surface */}
          <path
            d="M60 120
               Q90 40 120 120"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
          />

          <path
            d="M45 120
               Q90 25 135 120"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="2"
            opacity="0.7"
          />

          {/* Base ellipse */}
          <ellipse
            cx="90"
            cy="120"
            rx="45"
            ry="12"
            fill="#0284c7"
            opacity="0.35"
          />
        </svg>
      </div>

      {/* Firecracker formulas */}
      <div
        ref={eqRef}
        className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none"
      >
        z = (x² + y²) / 4f
      </div>

      <div
        ref={volRef}
        className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none"
      >
        Vol = ½πr²h
      </div>

      <div
        ref={saRef}
        className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none"
      >
        Paraboloid
      </div>
    </div>
  );
}
