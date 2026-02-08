import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ShapeCube() {
  const cubeWrapperRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  const volRef = useRef<HTMLDivElement>(null);
  const saRef = useRef<HTMLDivElement>(null);
  const faceRef = useRef<HTMLDivElement>(null);

  const burstRefs = [volRef, saRef, faceRef];

  useGSAP(() => {
    // Floating
    gsap.to(cubeWrapperRef.current, {
      y: -18,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // 3D rotation
    gsap.to(cubeRef.current, {
      rotateX: 360,
      rotateY: 360,
      duration: 70,
      repeat: -1,
      ease: "none",
    });

    // Initial burst hidden
    gsap.set(burstRefs.map((r) => r.current), {
      opacity: 0,
      scale: 0.6,
    });
  }, []);

  const firecrackerBurst = () => {
    const baseAngle = Math.random() * Math.PI * 2;

    burstRefs.forEach((ref, i) => {
      const angle = baseAngle + (i * 2 * Math.PI) / burstRefs.length;
      const distance = gsap.utils.random(90, 120);

      gsap.set(ref.current, {
        x: 0,
        y: 0,
        opacity: 0,
        scale: 0.6,
      });

      gsap.to(ref.current, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
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
      ref={cubeWrapperRef}
      className="relative w-[120px] h-[120px] flex items-center justify-center select-none"
      style={{ perspective: "800px" }}
      onMouseEnter={firecrackerBurst}
    >
      {/* Scoped styles */}
      <style>{`
        .cube {
          position: relative;
          width: 80px;
          height: 80px;
          transform-style: preserve-3d;
        }

        .face {
          position: absolute;
          width: 80px;
          height: 80px;
          background: rgba(14, 165, 233, 0.85);
          border: 2px solid #7dd3fc;
          box-shadow: 0 0 18px rgba(0, 220, 255, 0.35);
        }

        .front  { transform: translateZ(40px); }
        .back   { transform: rotateY(180deg) translateZ(40px); }
        .right  { transform: rotateY(90deg) translateZ(40px); }
        .left   { transform: rotateY(-90deg) translateZ(40px); }
        .top    { transform: rotateX(90deg) translateZ(40px); }
        .bottom { transform: rotateX(-90deg) translateZ(40px); }
      `}</style>

      {/* 3D Cube */}
      <div ref={cubeRef} className="cube cursor-pointer">
        <div className="face front" />
        <div className="face back" />
        <div className="face right" />
        <div className="face left" />
        <div className="face top" />
        <div className="face bottom" />
      </div>

      {/* Firecracker formulas */}
      <div
        ref={volRef}
        className="absolute text-sm font-semibold text-cyan-300 pointer-events-none"
      >
        Vol = a³
      </div>

      <div
        ref={saRef}
        className="absolute text-sm font-semibold text-cyan-300 pointer-events-none"
      >
        S.Area = 6a²
      </div>

      <div
        ref={faceRef}
        className="absolute text-sm font-semibold text-cyan-300 pointer-events-none"
      >
        Face = a²
      </div>
    </div>
  );
}
