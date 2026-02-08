import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ShapeDonut() {
  const torusRef = useRef<HTMLDivElement>(null);

  const eqRef = useRef<HTMLDivElement>(null);
  const volRef = useRef<HTMLDivElement>(null);
  const saRef = useRef<HTMLDivElement>(null);

  const burstRefs = [eqRef, volRef, saRef];

  useGSAP(() => {
    gsap.to(torusRef.current, {
      y: -18,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.set(burstRefs.map(r => r.current), {
      opacity: 0,
      scale: 0.6,
    });
  }, []);

  const firecrackerBurst = () => {
    const baseAngle = Math.random() * Math.PI * 2;

    burstRefs.forEach((ref, i) => {
      const angle = baseAngle + i * (2 * Math.PI / burstRefs.length);
      const distance = gsap.utils.random(110, 150);

      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      gsap.set(ref.current, { x: 0, y: 0, opacity: 0, scale: 0.6 });

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
      <style>{`
        .torus-glow {
          filter: drop-shadow(0 0 26px rgba(0, 220, 255, 0.45));
        }
      `}</style>

      {/* TRUE 3D SVG TORUS */}
      <div ref={torusRef} className="torus-glow cursor-pointer">
        <svg width="220" height="220" viewBox="0 0 220 220">
          <defs>
            {/* Main lighting gradient */}
            <radialGradient id="torusLight" cx="35%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#0369a1" />
            </radialGradient>

            {/* Inner shadow */}
            <radialGradient id="torusInner" cx="50%" cy="60%" r="50%">
              <stop offset="0%" stopColor="#061427" />
              <stop offset="100%" stopColor="#0284c7" />
            </radialGradient>
          </defs>

          {/* Z axis */}
          <line x1="110" y1="15" x2="110" y2="205" stroke="#7dd3fc" strokeWidth="2" />
          <text x="115" y="22" fill="#7dd3fc" fontSize="12">z</text>

          {/* X axis */}
          <line x1="20" y1="110" x2="200" y2="110" stroke="#7dd3fc" strokeWidth="2" />
          <text x="200" y="105" fill="#7dd3fc" fontSize="12">x</text>

          {/* Y axis */}
          <line x1="110" y1="110" x2="165" y2="165" stroke="#7dd3fc" strokeWidth="2" />
          <text x="170" y="170" fill="#7dd3fc" fontSize="12">y</text>

          {/* Back half (darker) */}
          <ellipse
            cx="110"
            cy="110"
            rx="75"
            ry="38"
            fill="none"
            stroke="#0284c7"
            strokeWidth="14"
            opacity="0.35"
          />

          {/* Inner hole */}
          <ellipse
            cx="110"
            cy="110"
            rx="32"
            ry="16"
            fill="url(#torusInner)"
          />

          {/* Front half (highlighted) */}
          <ellipse
            cx="110"
            cy="110"
            rx="75"
            ry="38"
            fill="none"
            stroke="url(#torusLight)"
            strokeWidth="14"
          />
        </svg>
      </div>

      {/* Firecracker formulas */}
      <div ref={eqRef} className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none">
        (R + r cos v)cos u
      </div>

      <div ref={volRef} className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none">
        Vol = 2π²Rr²
      </div>

      <div ref={saRef} className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none">
        S.Area = 4π²Rr
      </div>
    </div>
  );
}
