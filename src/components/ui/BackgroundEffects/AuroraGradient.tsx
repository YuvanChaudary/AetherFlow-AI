import React from "react";

export function AuroraGradient() {
  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* Layered brand glows with heavy blur filters */}
      <div className="absolute top-[-10%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-nocturnal-expedition/20 blur-[120px] animate-aurora-slow" />
      <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-deep-saffron/8 blur-[100px] animate-aurora-medium" />
      <div className="absolute top-[-20%] left-[45%] translate-x-[-50%] w-[60vw] h-[30vw] rounded-full bg-forsythia/6 blur-[140px]" />

      {/* CSS Animation Keyframes Injector */}
      <style jsx global>{`
        @keyframes auroraSlow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(4vw, 2vh) scale(1.05);
          }
          66% {
            transform: translate(-2vw, -3vh) scale(0.95);
          }
        }
        @keyframes auroraMedium {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-3vw, 4vh) scale(1.1);
          }
        }
        .animate-aurora-slow {
          animation: auroraSlow 25s infinite ease-in-out;
        }
        .animate-aurora-medium {
          animation: auroraMedium 18s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default AuroraGradient;
