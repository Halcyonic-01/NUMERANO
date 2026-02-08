import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Shape1() {
  const sphereRef = useRef<HTMLDivElement>(null);
  const volRef = useRef<HTMLDivElement>(null);
  const saRef = useRef<HTMLDivElement>(null);
  const gcRef = useRef<HTMLDivElement>(null);

  const burstRefs = [volRef, saRef, gcRef];

  useGSAP(() => {
    // Floating animation (existing)
    gsap.to(sphereRef.current, {
      y: -18,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // ✅ Smooth clockwise 2D rotation (same as cylinder)
    gsap.to(sphereRef.current, {
      rotation: -360,   // rotateZ
      duration: 40,    // match cylinder speed
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

      // Burst out
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
        .sphere-glow {
          filter: drop-shadow(0 0 22px rgba(0, 220, 255, 0.4));
        }
      `}</style>

      {/* SVG Sphere */}
      <div ref={sphereRef} className="sphere-glow cursor-pointer">
        <svg width="160" height="160" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="60" fill="url(#sphereGradient)" />
          <circle cx="60" cy="55" r="18" fill="white" opacity="0.18" />
          <ellipse
            cx="80"
            cy="90"
            rx="55"
            ry="18"
            stroke="#7dd3fc"
            strokeWidth="2"
            opacity="0.35"
            fill="none"
          />
          <defs>
            <radialGradient id="sphereGradient" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#0369a1" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Firecracker formulas */}
      <div
        ref={volRef}
        className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none"
      >
        Vol = 4/3 πr³
      </div>

      <div
        ref={saRef}
        className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none"
      >
        S.Area = 4πr²
      </div>

      <div
        ref={gcRef}
        className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none"
      >
        G.Circle = πr²
      </div>
    </div>
  );
}
