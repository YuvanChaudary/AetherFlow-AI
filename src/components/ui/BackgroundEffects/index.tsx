import React from "react";
import { NoiseOverlay } from "./NoiseOverlay";
import { GridOverlay } from "./GridOverlay";
import { AuroraGradient } from "./AuroraGradient";
import { LightBeams } from "./LightBeams";

/**
 * BackgroundEffects
 *
 * Consolidated parent wrapper component that overlays ambient gradients,
 * developer grids, diagonal laser beams, and noise textures.
 * Uses main-thread isolated styles to prevent layout blocking.
 */
export function BackgroundEffects() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden bg-oceanic-noir">
      <AuroraGradient />
      <GridOverlay />
      <LightBeams />
      <NoiseOverlay />
    </div>
  );
}

export default BackgroundEffects;
export { NoiseOverlay } from "./NoiseOverlay";
export { GridOverlay } from "./GridOverlay";
export { AuroraGradient } from "./AuroraGradient";
export { LightBeams } from "./LightBeams";
