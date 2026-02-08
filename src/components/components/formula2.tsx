import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Formula2() {
  const coreRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const hamRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Subtle floating (quantum calm)
    gsap.to(coreRef.current, {
      y: -14,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Hidden annotations initially
    gsap.set([timeRef.current, waveRef.current, hamRef.current], {
      opacity: 0,
      scale: 0.85,
      filter: "blur(6px)",
    });
  }, []);

  const onEnter = () => {
    gsap.to(timeRef.current, {
      x: -160,
      y: -40,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.to(waveRef.current, {
      y: 120,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.to(hamRef.current, {
      x: 170,
      y: -30,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    gsap.to([timeRef.current, waveRef.current, hamRef.current], {
      x: 0,
      y: 0,
      opacity: 0,
      scale: 0.85,
      filter: "blur(6px)",
      duration: 0.5,
      ease: "power3.inOut",
    });
  };

  return (
    <div
      className="relative inline-flex items-center justify-center select-none"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Scoped styles */}
      <style>{`
        .quantum-glow {
          text-shadow:
            0 0 12px rgba(120, 220, 255, 0.35),
            0 0 30px rgba(80, 180, 255, 0.15);
        }
      `}</style>

      {/* Core Equation */}
      <div
        ref={coreRef}
        className="quantum-glow text-[1.6rem] md:text-[2.1rem] text-white font-semibold cursor-pointer text-center"
      >
        iħ ∂/∂t Ψ(r,t) = Ĥ Ψ(r,t)
      </div>

      {/* Conceptual Pop-outs */}
      <div
        ref={timeRef}
        className="absolute text-sm md:text-base text-cyan-300 font-medium"
      >
        Time Evolution
      </div>

      <div
        ref={waveRef}
        className="absolute text-sm md:text-base text-cyan-300 font-medium"
      >
        Wave Function
      </div>

      <div
        ref={hamRef}
        className="absolute text-sm md:text-base text-cyan-300 font-medium"
      >
        Hamiltonian Operator
      </div>
    </div>
  );
}
