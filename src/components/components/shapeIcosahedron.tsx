import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ShapeIcosahedron() {
  const icoRef = useRef<HTMLDivElement>(null);

  const faceRef = useRef<HTMLDivElement>(null);
  const edgeRef = useRef<HTMLDivElement>(null);
  const vertRef = useRef<HTMLDivElement>(null);

  const burstRefs = [faceRef, edgeRef, vertRef];

  useGSAP(() => {
    // Floating animation
    gsap.to(icoRef.current, {
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
        .ico-glow {
          filter: drop-shadow(0 0 26px rgba(0, 220, 255, 0.45));
        }
      `}</style>

      {/* SVG Icosahedron with axes */}
      <div ref={icoRef} className="ico-glow cursor-pointer">
        <svg width="220" height="220" viewBox="0 0 220 220">
          {/* Axes */}
          {/* Z */}
          <line x1="110" y1="15" x2="110" y2="205" stroke="#7dd3fc" strokeWidth="2" />
          <text x="115" y="22" fill="#7dd3fc" fontSize="12">z</text>

          {/* X */}
          <line x1="20" y1="110" x2="200" y2="110" stroke="#7dd3fc" strokeWidth="2" />
          <text x="200" y="105" fill="#7dd3fc" fontSize="12">x</text>

          {/* Y */}
          <line x1="110" y1="110" x2="165" y2="165" stroke="#7dd3fc" strokeWidth="2" />
          <text x="170" y="170" fill="#7dd3fc" fontSize="12">y</text>

          {/* Icosahedron faces (simplified 3D projection) */}
          {/* Top */}
          <polygon
            points="110,35 65,90 155,90"
            fill="#38bdf8"
            opacity="0.55"
          />

          {/* Upper ring */}
          <polygon points="65,90 110,35 35,110" fill="#0ea5e9" opacity="0.45" />
          <polygon points="110,35 155,90 185,110" fill="#0284c7" opacity="0.45" />
          <polygon points="155,90 110,145 185,110" fill="#0ea5e9" opacity="0.45" />
          <polygon points="110,145 65,90 35,110" fill="#0284c7" opacity="0.45" />

          {/* Bottom */}
          <polygon
            points="110,185 65,130 155,130"
            fill="#38bdf8"
            opacity="0.55"
          />

          {/* Wireframe edges */}
          <polyline
            points="110,35 65,90 35,110 65,130 110,185 155,130 185,110 155,90 110,35"
            fill="none"
            stroke="#7dd3fc"
            strokeWidth="2"
          />

          <line x1="65" y1="90" x2="155" y2="90" stroke="#7dd3fc" strokeWidth="2" />
          <line x1="65" y1="130" x2="155" y2="130" stroke="#7dd3fc" strokeWidth="2" />
        </svg>
      </div>

      {/* Firecracker facts */}
      <div ref={faceRef} className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none">
        Faces = 20
      </div>

      <div ref={edgeRef} className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none">
        Edges = 30
      </div>

      <div ref={vertRef} className="absolute text-sm md:text-base font-semibold text-cyan-300 pointer-events-none">
        Vertices = 12
      </div>
    </div>
  );
}
