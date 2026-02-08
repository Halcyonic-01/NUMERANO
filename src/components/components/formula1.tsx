import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Formula1() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const a2Ref = useRef<HTMLDivElement>(null);
  const b2Ref = useRef<HTMLDivElement>(null);
  const abRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Floating animation
    gsap.to(coreRef.current, {
      y: -18,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Initial hidden state
    gsap.set([a2Ref.current, b2Ref.current, abRef.current], {
      opacity: 0,
      scale: 0.6,
    });
  }, []);

  const handleEnter = () => {
    gsap.to(a2Ref.current, {
      x: -120,
      y: -70,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.to(b2Ref.current, {
      x: 120,
      y: -70,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.to(abRef.current, {
      y: 110,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    gsap.to([a2Ref.current, b2Ref.current, abRef.current], {
      x: 0,
      y: 0,
      opacity: 0,
      scale: 0.6,
      duration: 0.4,
      ease: "power3.inOut",
    });
  };

  return (
    <div
      ref={wrapperRef}
      className="relative inline-flex items-center justify-center select-none"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Scoped styles */}
      <style>{`
        .formula-glow {
          text-shadow: 0 0 18px rgba(0, 255, 255, 0.35);
        }
      `}</style>

      {/* Core formula */}
      <div
        ref={coreRef}
        className="formula-glow text-[3rem] md:text-[3.8rem] font-bold text-white cursor-pointer"
      >
        (a + b)²
      </div>

      {/* Expanded terms */}
      <div
        ref={a2Ref}
        className="absolute text-2xl font-semibold text-cyan-300"
      >
        a²
      </div>

      <div
        ref={b2Ref}
        className="absolute text-2xl font-semibold text-cyan-300"
      >
        + b²
      </div>

      <div
        ref={abRef}
        className="absolute text-2xl font-semibold text-cyan-300"
      >
        + 2ab
      </div>
    </div>
  );
}
