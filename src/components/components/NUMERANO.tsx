import { useEffect, useState } from "react";

type ImageTypewriterProps = {
  text: string;
  typingSpeed?: number;
  letterPath?: string;
};

const ImageTypewriter = ({
  text,
  typingSpeed = 140,
  letterPath = "/letters",
}: ImageTypewriterProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const t = setTimeout(() => setIndex((p) => p + 1), typingSpeed);
      return () => clearTimeout(t);
    }
  }, [index, text, typingSpeed]);

  return (
    <div className="flex items-center">
      {text.slice(0, index).split("").map((char, i) => (
        <img
          key={i}
          src={`${letterPath}/${char.toLowerCase()}.png`}
          alt={char}
          draggable={false}
          className="h-[4rem] md:h-[10rem] object-contain select-none"
          style={{
            marginLeft: i === 0 ? 0 : "-4.8rem",
            zIndex: 20,
            filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.45))",
          }}
        />
      ))}
    </div>
  );
};

export default function NUMERANO() {
  return (
    <div className="relative mb-16 flex justify-center">
      <div className="relative px-14 py-12">

        {/* ∞ Infinity (top) */}
        <img
          src="/infinity.png"
          alt="infinity"
          className="absolute left-1/2 -top-8 md:-top-3 w-10 md:w-14 -translate-x-1/2 z-10 opacity-90"
        />

        {/* BIG SIGMA (background, centered) */}
        <img
          src="/sigma.png"
          alt="Sigma"
          className="absolute left-1/2 top-1/2
            -translate-x-1/2 -translate-y-1/2
            w-[14rem] md:w-[20rem]
            opacity-90 z-0
            drop-shadow-[0_0_40px_rgba(59,130,246,0.45)]"
        />

        {/* NUMERANO text (front) */}
        <div className="relative z-20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center">
          <ImageTypewriter text="NUMERANO" />
        </div>

        {/* SINCE 2014 */}
        <div className="absolute left-1/2 top-full -mt-4 -translate-x-1/2 z-20">
          <span className="text-[0.7rem] md:text-sm tracking-[0.3em] font-semibold text-yellow-300">
            SINCE 2014
          </span>
        </div>

        {/* Divider */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="w-10 h-[1px] bg-cyan-400/40" />
          <span className="w-2 h-2 rounded-full bg-cyan-400/70" />
          <span className="w-10 h-[1px] bg-cyan-400/40" />
        </div>

        {/* Tagline */}
        <div className="absolute left-1/2 top-full mt-5 -translate-x-1/2 text-cyan-300/80  text-sm md:text-base font-mono flex justify-center gap-2">
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
  );
}

