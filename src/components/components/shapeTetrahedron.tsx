import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ShapeTetrahedron() {
  const tetRef = useRef<HTMLDivElement>(null);

  const faceRef = useRef<HTMLDivElement>(null);
  const edgeRef = useRef<HTMLDivElement>(null);
  const vertRef = useRef<HTMLDivElement>(null);

  const burstRefs = [faceRef, edgeRef, vertRef];

  useGSAP(() => {
    // Floating animation
    gsap.to(tetRef.current, {
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
      {/* Scoped styles */}
      <style>{`
        .tet-glow {
          filter: drop-shadow(0 0 26px rgba(0, 220, 255, 0.45));
        }
      `}</style>

      {/* SVG Tetrahedron with axes */}
      <div ref={tetRef} className="tet-glow cursor-pointer">
        <svg width="220" height="220" viewBox="0 0 220 220">
          {/* Axes */}
          {/* Z */}
          <line x1="110" y1="20" x2="110" y2="200" stroke="#7dd3fc" strokeWidth="2" />
          <text x="115" y="25" fill="#7dd3fc" fontSize="12">z</text>

          {/* X */}
          <line x1="20" y1="150" x2="200" y2="150" stroke="#7dd3fc" strokeWidth="2" />
          <text x="200" y="145" fill="#7dd3fc" fontSize="12">x</text>

          {/* Y */}
          <line x1="110" y1="150" x2="165" y2="185" stroke="#7dd3fc" strokeWidth="2" />
          <text x="170" y="190" fill="#7dd3fc" fontSize="12">y</text>

          {/* Faces */}
          {/* Front face */}
          <polygon
            points="110,40 60,150 160,150"
            fill="#38bdf8"
            opacity="0.55"
          />

          {/* Left face */}
          <polygon
            points="110,40 60,150 110,150"
            fill="#0ea5e9"
            opacity="0.45"
          />

          {/* Right face */}
          <polygon
            points="110,40 160,150 110,150"
            fill="#0284c7"
            opacity="0.45"
          />

          {/* Bottom face (suggested) */}
          <polygon
            points="60,150 160,150 110,190"
            fill="#0369a1"
            opacity="0.35"
          />

          {/* Wireframe */}
          <polyline
            points="110,40 60,150 160,150 110,40"
            fill="none"
            stroke="#7dd3fc"
            strokeWidth="2"
          />
          <line x1="60" y1="150" x2="110" y2="190" stroke="#7dd3fc" strokeWidth="2" />
          <line x1="160" y1="150" x2="110" y2="190" stroke="#7dd3fc" strokeWidth="2" />
        </svg>
      </div>

      {/* Firecracker facts */}
        <div
        ref={faceRef}
        className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none"
        >
        Surface Area = √3 a²
        </div>

        <div
        ref={edgeRef}
        className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none"
        >
        Volume = a³ / (6√2)
        </div>

        <div
        ref={vertRef}
        className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none"
        >
        Height = √(2/3) a
        </div>

    </div>
  );
}
