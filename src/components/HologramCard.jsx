import React from 'react';

const HologramCard = ({ forceFallback = true }) => {
  return (
    <div
      role="img"
      aria-label="Hologram Fallback"
      className="flex h-full w-full items-center justify-center rounded-xl bg-[radial-gradient(circle_at_50%_40%,rgba(255,215,0,0.16),rgba(0,0,0,0.1)_60%)]"
    >
      <div className="animate-pulse rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/70">
        3D preview disabled
      </div>
    </div>
  );
};

export default HologramCard;
