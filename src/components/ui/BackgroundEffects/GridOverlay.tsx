import React from "react";

export function GridOverlay() {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(217, 232, 226, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(217, 232, 226, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        // Fades out the grid near the edges and bottom to maintain premium focus
        maskImage: "radial-gradient(ellipse 70% 60% at 50% 10%, black 40%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 10%, black 40%, transparent 100%)",
      }}
      aria-hidden="true"
    />
  );
}

export default GridOverlay;
