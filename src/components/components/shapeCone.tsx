import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Shape2() {
  const coneRef = useRef<HTMLDivElement>(null);
  const volRef = useRef<HTMLDivElement>(null);
  const csaRef = useRef<HTMLDivElement>(null);
  const tsaRef = useRef<HTMLDivElement>(null);

  const burstRefs = [volRef, csaRef, tsaRef];

  useGSAP(() => {
    // Floating animation for cone
    gsap.to(coneRef.current, {
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
        const distance = gsap.utils.random(100, 120);

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;


      // Reset for repeat hovers
      gsap.set(ref.current, {
        x: 0,
        y: 0,
        opacity: 0,
        scale: 0.6,
      });

      // Burst outward
      gsap.to(ref.current, {
        x,
        y,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        delay: i * 0.05,
      });

      // Auto-vanish
      gsap.to(ref.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
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
        .cone-body {
          filter: drop-shadow(0 0 20px rgba(0, 220, 255, 0.35));
        }
      `}</style>

      {/* SVG Cone */}
      <div ref={coneRef} className="cone-body cursor-pointer">
        <svg width="160" height="180" viewBox="0 0 160 180" fill="none">
          {/* Base ellipse */}
          <ellipse
            cx="80"
            cy="150"
            rx="60"
            ry="14"
            fill="#38bdf8"
            opacity="0.45"
          />

          {/* Cone body */}
          <path
            d="M20 150 L80 20 L140 150 Z"
            fill="url(#coneGradient)"
          />

          {/* Side outline */}
          <path
            d="M20 150 L80 20 L140 150"
            stroke="#7dd3fc"
            strokeWidth="2"
            opacity="0.7"
          />

          <defs>
            <linearGradient id="coneGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Firecracker formulas */}
      <div
        ref={volRef}
        className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none"
      >
        Vol = ⅓πr²h
      </div>

      <div
        ref={csaRef}
        className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none"
      >
        CSA = πrl
      </div>

      <div
        ref={tsaRef}
        className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none"
      >
        TSA = πr(r + l)
      </div>
    </div>
  );
}
