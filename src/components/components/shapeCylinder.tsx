import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ShapeCylinder() {
  const cylinderRef = useRef<HTMLDivElement>(null);

  const volRef = useRef<HTMLDivElement>(null);
  const csaRef = useRef<HTMLDivElement>(null);
  const tsaRef = useRef<HTMLDivElement>(null);

  const burstRefs = [volRef, csaRef, tsaRef];

  useGSAP(() => {
    // Floating animation (existing)
    gsap.to(cylinderRef.current, {
      y: -18,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // ✅ Smooth clockwise 2D rotation (NEW)
    gsap.to(cylinderRef.current, {
      rotation: 360,        // rotateZ
      duration: 140,         // slow & elegant
      repeat: -1,
      ease: "linear",
    });

    // Initial hidden state
    gsap.set(burstRefs.map((r) => r.current), {
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

      // Reset
      gsap.set(ref.current, {
        x: 0,
        y: 0,
        opacity: 0,
        scale: 0.6,
      });

      // Burst
      gsap.to(ref.current, {
        x,
        y,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        delay: i * 0.05,
      });

      // Vanish
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
        .cylinder-glow {
          filter: drop-shadow(0 0 22px rgba(0, 220, 255, 0.4));
        }
      `}</style>

      {/* SVG Cylinder */}
      <div ref={cylinderRef} className="cylinder-glow cursor-pointer">
        <svg width="160" height="180" viewBox="0 0 160 180">
          {/* Top ellipse */}
          <ellipse
            cx="80"
            cy="35"
            rx="45"
            ry="14"
            fill="#38bdf8"
            opacity="0.9"
          />

          {/* Body */}
          <rect
            x="35"
            y="35"
            width="90"
            height="100"
            fill="#0ea5e9"
            opacity="0.85"
          />

          {/* Bottom ellipse */}
          <ellipse
            cx="80"
            cy="135"
            rx="45"
            ry="14"
            fill="#0284c7"
            opacity="0.85"
          />

          {/* Outline */}
          <ellipse
            cx="80"
            cy="35"
            rx="45"
            ry="14"
            fill="none"
            stroke="#7dd3fc"
            strokeWidth="2"
          />
          <ellipse
            cx="80"
            cy="135"
            rx="45"
            ry="14"
            fill="none"
            stroke="#7dd3fc"
            strokeWidth="2"
            opacity="0.5"
          />
          <line
            x1="35"
            y1="35"
            x2="35"
            y2="135"
            stroke="#7dd3fc"
            strokeWidth="2"
          />
          <line
            x1="125"
            y1="35"
            x2="125"
            y2="135"
            stroke="#7dd3fc"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Firecracker formulas */}
      <div
        ref={volRef}
        className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none"
      >
        Vol = πr²h
      </div>

      <div
        ref={csaRef}
        className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none"
      >
        CSA = 2πrh
      </div>

      <div
        ref={tsaRef}
        className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none"
      >
        TSA = 2πr(r + h)
      </div>
    </div>
  );
}
