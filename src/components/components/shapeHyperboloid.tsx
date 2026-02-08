import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ShapeHyperboloid() {
  const hyperRef = useRef<HTMLDivElement>(null);

  const eqRef = useRef<HTMLDivElement>(null);
  const volRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);

  const burstRefs = [eqRef, volRef, typeRef];

  useGSAP(() => {
    // Floating animation
    gsap.to(hyperRef.current, {
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
        .hyperboloid-glow {
          filter: drop-shadow(0 0 22px rgba(0, 220, 255, 0.4));
        }
      `}</style>

      {/* SVG Hyperboloid with Axes */}
      <div ref={hyperRef} className="hyperboloid-glow cursor-pointer">
        <svg width="180" height="200" viewBox="0 0 180 200">
          {/* Z axis */}
          <line x1="90" y1="15" x2="90" y2="185" stroke="#7dd3fc" strokeWidth="2" />
          <text x="95" y="20" fill="#7dd3fc" fontSize="12">z</text>

          {/* X axis */}
          <line x1="25" y1="100" x2="155" y2="100" stroke="#7dd3fc" strokeWidth="2" />
          <text x="155" y="95" fill="#7dd3fc" fontSize="12">x</text>

          {/* Y axis (angled) */}
          <line x1="90" y1="100" x2="140" y2="150" stroke="#7dd3fc" strokeWidth="2" />
          <text x="145" y="155" fill="#7dd3fc" fontSize="12">y</text>

          {/* Hyperboloid curves (front) */}
          <path
            d="M55 40
               C90 80 90 120 55 160"
            stroke="#38bdf8"
            strokeWidth="3"
            fill="none"
          />

          <path
            d="M125 40
               C90 80 90 120 125 160"
            stroke="#38bdf8"
            strokeWidth="3"
            fill="none"
          />

          {/* Inner waist curve */}
          <ellipse
            cx="90"
            cy="100"
            rx="28"
            ry="10"
            stroke="#0ea5e9"
            strokeWidth="2"
            fill="none"
            opacity="0.8"
          />

          {/* Top & bottom guide ellipses */}
          <ellipse
            cx="90"
            cy="40"
            rx="40"
            ry="12"
            fill="#0284c7"
            opacity="0.25"
          />
          <ellipse
            cx="90"
            cy="160"
            rx="40"
            ry="12"
            fill="#0284c7"
            opacity="0.25"
          />
        </svg>
      </div>

      {/* Firecracker formulas */}
      <div
        ref={eqRef}
        className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none"
      >
        x²/a² + y²/b² − z²/c² = 1
      </div>

      <div
        ref={volRef}
        className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none"
      >
        Hyperboloid
      </div>

      <div
        ref={typeRef}
        className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none"
      >
        One Surface
      </div>
    </div>
  );
}
