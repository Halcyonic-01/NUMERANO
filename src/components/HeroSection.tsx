import Formula1 from "./components/formula1";
import Formula2 from "./components/formula2";
import ShapeSphere from "./components/shapeSphere";
import ShapeCone from "./components/shapeCone";
import ShapeCube from "./components/shapeCube";
import ShapeCylinder from "./components/shapeCylinder";
import ShapeDonut from "./components/shapeDonut";
import ShapeHyperboloid from "./components/shapeHyperboloid";
import ShapeIcosahedron from "./components/shapeIcosahedron";
import ShapeOctahedron from "./components/shapeOctahedron";
import ShapeParaboloid from "./components/shapeParaboloid";
import ShapeTetrahedron from "./components/shapeTetrahedron";
import ShapeHelicoid from "./components/shapeHelicoid";
import ShapeParabola2D from "./components/shapeParabola2D";
import ShapeHyperbola2D from "./components/shapeHyperbola2D";
import ShapeEllipse2D from "./components/shapeEllipse2D";
import { useEffect, useState } from "react";

type ShapeItem = {
  Component: () => React.JSX.Element;
  style: React.CSSProperties;
};

// Typewriter Animation Component
const TypewriterAnimation = ({ text, typingSpeed = 150 }: { text: string; typingSpeed?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showSigma, setShowSigma] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      // Typing complete - fade out sigma after delay
      const sigmaTimeout = setTimeout(() => {
        setShowSigma(false);
        setIsTypingComplete(true);
      }, 500);
      
      // Blink cursor after typing complete
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      
      return () => {
        clearTimeout(sigmaTimeout);
        clearInterval(cursorInterval);
      };
    }
  }, [currentIndex, text, typingSpeed]);

  return (
    <div>
    <div className="relative inline-flex items-center">
      {/* Sigma symbol with equals sign - fades out after typing */}      
      <span className="relative inline-block">
        {displayText}
        <span 
          className={`absolute -right-4 top-0 h-full w-[3px] bg-gradient-to-b from-cyan-400 to-blue-400 transition-opacity duration-300 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
        />
      </span>
    </div>
    </div>
  );
};

export default function HeroSection() {
  const shapes: ShapeItem[] = [
    // { Component: ShapeParaboloid, style: { left: "22%", top: "10%", transform: "rotate(-30deg) scale(0.75)" } },
    // { Component: ShapeHyperboloid, style: { left: "68%", top: "72%", transform: "rotate(28deg) scale(0.9)" } },

    // Top band
    { Component: ShapeCube, style: { left: "8%", top: "12%", transform: "rotate(18deg) scale(0.8)" } },
    { Component: ShapeCylinder, style: { left: "28%", top: "8%", transform: "rotate(-22deg) scale(0.7)" } },
    { Component: ShapeParaboloid, style: { left: "52%", top: "10%", transform: "rotate(-30deg) scale(0.75)" } },
    { Component: ShapeDonut, style: { left: "75%", top: "14%", transform: "rotate(15deg) scale(0.8)" } },

    // Upper-middle band
    { Component: ShapeHyperboloid, style: { left: "12%", top: "32%", transform: "rotate(28deg) scale(0.9)" } },
    { Component: ShapeSphere, style: { left: "35%", top: "28%", transform: "rotate(-20deg) scale(0.75)" } },
    { Component: ShapeOctahedron, style: { left: "65%", top: "30%", transform: "rotate(35deg) scale(0.8)" } },
    { Component: ShapeCone, style: { left: "85%", top: "34%", transform: "rotate(-25deg) scale(0.7)" } },

    // Lower-middle band
    { Component: ShapeTetrahedron, style: { left: "18%", top: "55%", transform: "rotate(-35deg) scale(0.85)" } },
    { Component: ShapeIcosahedron, style: { left: "42%", top: "58%", transform: "rotate(18deg) scale(0.75)" } },
    { Component: ShapeCube, style: { left: "70%", top: "56%", transform: "rotate(-12deg) scale(0.8)" } },

    // left-middle band
    { Component: ShapeEllipse2D, style: { left: "3%", top: "80%", transform: "rotate(30deg) scale(0.8)" } },
    { Component: ShapeEllipse2D, style: { left: "28%", top: "68%", transform: "rotate(-15deg) scale(0.75)" } },
    { Component: ShapeParabola2D, style: { left: "50%", top: "72%", transform: "rotate(20deg) scale(0.8)" } },
    { Component: ShapeParabola2D, style: { left: "80%", top: "68%", transform: "rotate(-22deg) scale(0.75)" } },

    // right-most band
    { Component: ShapeHyperbola2D, style: { left: "88%", top: "50%", transform: "rotate(25deg) scale(0.8)" } },

    // left-most band
    { Component: ShapeHyperbola2D, style: { left: "2%", top: "40%", transform: "rotate(-30deg) scale(0.75)" } },
    { Component: ShapeHelicoid, style: { left: "1%", top: "60%", transform: "rotate(30deg) scale(0.8)" } },


    // Bottom band
    { Component: ShapeCylinder, style: { left: "14%", top: "79%", transform: "rotate(22deg) scale(0.75)" } },
    { Component: ShapeDonut, style: { left: "32%", top: "78%", transform: "rotate(-28deg) scale(0.8)" } },
    { Component: ShapeSphere, style: { left: "60%", top: "80%", transform: "rotate(30deg) scale(0.75)" } },
    { Component: ShapeCone, style: { left: "85%", top: "82%", transform: "rotate(18deg) scale(0.7)" } },
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Scoped styles */}
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .hero-bg {
          background-size: 300% 300%;
          animation: gradientMove 14s ease infinite;
        }

        .vignette {
          background: radial-gradient(
            ellipse at center,
            rgba(0,0,0,0) 0%,
            rgba(0,0,0,0.55) 100%
          );
        }

        .shape {
          position: absolute;
          transform-origin: center;
          opacity: 0.75;
          z-index: 20;
          pointer-events: auto;
        }

        .shape:hover {
          opacity: 1;
          filter: drop-shadow(0 0 10px rgba(0, 220, 255, 0.5));
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 hero-bg bg-gradient-to-br from-[#071a2c] via-[#0b3c5d] to-[#061427]" />
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* SHAPES (rendered via map) */}
      {shapes.map(({ Component, style }, index) => (
        <div key={index} className="shape" style={style}>
          <Component />
        </div>
      ))}

        {/* CENTER CONTENT */}
        <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-4 pointer-events-none">
            <div className="pointer-events-auto relative">
                {/* Animated floating particles */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                {[...Array(8)].map((_, i) => (
                    <div
                    key={i}
                    className="absolute w-[2px] h-[2px] bg-cyan-300/40 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 2}s`,
                    }}
                    />
                ))}
                </div>

                {/* Refined Title Block */}
                <div className="relative mb-10 flex justify-center">
                  {/* Subtle mathematical grid */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none">
                    <svg width="420" height="120" viewBox="0 0 420 120">
                      <defs>
                        <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                          <path
                            d="M 24 0 L 0 0 0 24"
                            fill="none"
                            stroke="#7dd3fc"
                            strokeWidth="0.5"
                          />
                        </pattern>
                      </defs>
                      <rect width="420" height="120" fill="url(#grid)" />
                    </svg>
                  </div>

                  {/* Title container */}
                  <div className="relative px-10 py-7 rounded-2xl border border-cyan-500/25 bg-gradient-to-b from-cyan-900/10 to-transparent backdrop-blur-sm">

                    {/* Corner mathematical symbols (colored, subtle) */}
                <span className="absolute -top-3 -left-3 w-7 h-7 rounded-full 
                  bg-gradient-to-br from-cyan-400/25 to-cyan-600/10 
                  text-cyan-300 flex items-center justify-center text-sm font-semibold
                  ring-1 ring-cyan-400/30
                  shadow-[0_0_12px_rgba(34,211,238,0.35)]">
                  ∑
                </span>

                <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full 
                  bg-gradient-to-br from-blue-400/25 to-blue-600/10 
                  text-blue-300 flex items-center justify-center text-sm font-semibold
                  ring-1 ring-blue-400/30
                  shadow-[0_0_12px_rgba(59,130,246,0.35)]">
                  ∫
                </span>

                <span className="absolute -bottom-3 -left-3 w-7 h-7 rounded-full 
                  bg-gradient-to-br from-purple-400/25 to-purple-600/10 
                  text-purple-300 flex items-center justify-center text-sm font-semibold
                  ring-1 ring-purple-400/30
                  shadow-[0_0_12px_rgba(168,85,247,0.35)]">
                  π
                </span>

                <span className="absolute -bottom-3 -right-3 w-7 h-7 rounded-full 
                  bg-gradient-to-br from-cyan-300/25 to-cyan-500/10 
                  text-cyan-200 flex items-center justify-center text-sm font-semibold
                  ring-1 ring-cyan-300/30
                  shadow-[0_0_12px_rgba(34,211,238,0.35)]">
                  ∞
                </span>


                    {/* Title */}
                    <h1 className="relative text-[4rem] md:text-[6rem] font-bold tracking-tight text-center">
                      {/* Soft outer glow (reduced blur) */}
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-cyan-400/20 blur-xl -z-10" />

                      {/* Main text (sharp) */}
                      <span
                        className="relative bg-gradient-to-r text-white from-white via-cyan-100 to-white bg-clip-text text-transparent"
                        style={{ textShadow: "0 2px 10px rgba(0,0,0,0.35)" }}
                      >
                        <TypewriterAnimation text="NUMERANO" typingSpeed={140} />
                      </span>
                    </h1>

                    {/* Divider */}
                    <div className="mt-3 flex items-center justify-center gap-3">
                      <span className="w-10 h-[1px] bg-cyan-400/40" />
                      <span className="w-2 h-2 rounded-full bg-cyan-400/70" />
                      <span className="w-10 h-[1px] bg-cyan-400/40" />
                    </div>

                    {/* Definition-style equation */}
                    <div className="mt-4 text-cyan-300/80 text-sm md:text-base font-mono flex justify-center gap-2">
                      <span>Innovate</span>
                      <span className="text-white/60">|</span>
                      <span className="text-white">Explore</span>
                      <span className="text-white/60">|</span>
                      <span>Create</span>
                      <span className="text-white/60">|</span>
                      <span className="text-white">Integrate</span>
                    </div>
                  </div>
                </div>


                {/* Subtitle with enhanced typography */}
                <div className="relative mb-12 max-w-[700px]">
                <p className="text-gray-200 text-[1.2rem] md:text-[1.4rem] font-light leading-relaxed">
                    The{" "}
                    <span className="relative">
                    <span className="text-cyan-300 font-semibold bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-3 py-1 rounded-lg border border-cyan-500/30">
                        Mathematics Club
                    </span>
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                    </span>
                    of Dayananda Sagar College of Engineering
                </p>
                <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                    <span>Live Sessions</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-600 rounded-full" />
                    <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <span>Research Projects</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-600 rounded-full" />
                    <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                    <span>Math Competitions</span>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </section>
  );
}
