import React from "react";

export function LightBeams() {
  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-[1]"
      aria-hidden="true"
    >
      {/* Laser-thin diagonal light beams simulating pipeline paths */}
      <div className="absolute top-0 left-[20%] w-[1px] h-[150%] bg-gradient-to-b from-transparent via-mystic-mint/30 to-transparent -rotate-45 origin-top animate-beam-1" />
      <div className="absolute top-0 left-[50%] w-[1px] h-[150%] bg-gradient-to-b from-transparent via-forsythia/20 to-transparent -rotate-45 origin-top animate-beam-2" />
      <div className="absolute top-0 left-[80%] w-[1px] h-[150%] bg-gradient-to-b from-transparent via-deep-saffron/15 to-transparent -rotate-45 origin-top animate-beam-3" />

      <style jsx global>{`
        @keyframes beamSweep {
          0% {
            transform: translateY(-100%) rotate(-45deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%) rotate(-45deg);
            opacity: 0;
          }
        }
        .animate-beam-1 {
          animation: beamSweep 12s infinite linear;
        }
        .animate-beam-2 {
          animation: beamSweep 16s infinite linear 2s;
        }
        .animate-beam-3 {
          animation: beamSweep 20s infinite linear 5s;
        }
      `}</style>
    </div>
  );
}

export default LightBeams;
