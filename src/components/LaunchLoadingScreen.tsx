import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface LaunchLoadingScreenProps {
  onComplete: () => void;
}

export const LaunchLoadingScreen: React.FC<LaunchLoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [waveOffset, setWaveOffset] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 3000; // Exactly 3.0 seconds duration as requested

    let animationFrameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min((elapsed / duration) * 100, 100);

      // Smooth custom fluid progression curve: gentle start, steady rush, crisp coalescence
      const t = rawProgress / 100;
      const eased = Math.min(
        100,
        t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      ) * 100;

      setProgress(eased);
      setWaveOffset(Math.sin(elapsed * 0.009) * 2.8);

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        const timeout = setTimeout(() => {
          onComplete();
        }, 280);
        return () => clearTimeout(timeout);
      }
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [onComplete]);

  // Dual-direction water filling calculations:
  // Fills simultaneously from Left (x: 0 -> 50.5) and Right (x: 100 -> 49.5) until they coalesce in the center
  const p = progress;
  const isFull = p >= 99.5;

  // Left water front moving from x=0 inward to x=50.5
  const leftX = (p / 100) * 51;
  // Right water front moving from x=100 inward to x=49.5
  const rightX = 100 - (p / 100) * 51;

  const leftFillPath = isFull
    ? 'M -5 -5 L 51 -5 L 51 105 L -5 105 Z'
    : `M -5 -5 L ${leftX} -5 Q ${leftX + waveOffset} 35, ${leftX} 50 T ${leftX - waveOffset * 0.7} 65 T ${leftX} 105 L -5 105 Z`;

  const rightFillPath = isFull
    ? 'M 49 -5 L 105 -5 L 105 105 L 49 105 Z'
    : `M 105 -5 L ${rightX} -5 Q ${rightX - waveOffset} 35, ${rightX} 50 T ${rightX + waveOffset * 0.7} 65 T ${rightX} 105 L 105 105 Z`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090B] select-none p-4"
    >
      {/* Central Hologram Hybit Logo Element - Prominently sized for mobile and desktop screens */}
      <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
        
        <svg
          viewBox="0 0 100 100"
          fill="none"
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Dual Left & Right Water Fill Clip Path */}
            <clipPath id="hybit-dual-water-fill">
              {isFull ? (
                <rect x="-5" y="-5" width="110" height="110" />
              ) : (
                <>
                  <path d={leftFillPath} />
                  <path d={rightFillPath} />
                </>
              )}
            </clipPath>
          </defs>

          {/* 1. LAYER 1: Base Hologram Wireframe of the Hybit Element (No Background) */}
          <g opacity="0.45">
            {/* Left Column Capsule Hologram Wireframe */}
            <rect
              x="23.5"
              y="32"
              width="12"
              height="36"
              rx="6"
              fill="rgba(255, 255, 255, 0.03)"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="1.8"
            />

            {/* Center Column Top Segment Hologram Wireframe */}
            <path
              d="M 44 47.2 L 44 25 A 6 6 0 0 1 56 25 L 56 47.2 Z"
              fill="rgba(255, 255, 255, 0.03)"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="1.8"
            />

            {/* Center Column Bottom Segment Hologram Wireframe */}
            <path
              d="M 44 52.8 L 56 52.8 L 56 75 A 6 6 0 0 1 44 75 Z"
              fill="rgba(255, 255, 255, 0.03)"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="1.8"
            />

            {/* Right Column Capsule Hologram Wireframe */}
            <rect
              x="64.5"
              y="32"
              width="12"
              height="36"
              rx="6"
              fill="rgba(255, 255, 255, 0.03)"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="1.8"
            />
          </g>

          {/* 2. LAYER 2: Pure White Water Filling the Logo from Left & Right Simultaneously */}
          <g clipPath="url(#hybit-dual-water-fill)">
            <g fill="#FFFFFF">
              {/* Left Column Capsule */}
              <rect x="23.5" y="32" width="12" height="36" rx="6" />

              {/* Center Column Top Segment */}
              <path d="M 44 47.2 L 44 25 A 6 6 0 0 1 56 25 L 56 47.2 Z" />

              {/* Center Column Bottom Segment */}
              <path d="M 44 52.8 L 56 52.8 L 56 75 A 6 6 0 0 1 44 75 Z" />

              {/* Right Column Capsule */}
              <rect x="64.5" y="32" width="12" height="36" rx="6" />
            </g>
          </g>

          {/* 3. LAYER 3: Dynamic Leading Fluid Wave Meniscus Lines from Both Sides */}
          {!isFull && p > 3 && (
            <>
              {/* Left wave front travelling rightward */}
              <path
                d={`M ${leftX} 20 Q ${leftX + waveOffset} 35, ${leftX} 50 T ${leftX - waveOffset * 0.7} 65 T ${leftX} 80`}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeOpacity="0.85"
                strokeLinecap="round"
              />

              {/* Right wave front travelling leftward */}
              <path
                d={`M ${rightX} 20 Q ${rightX - waveOffset} 35, ${rightX} 50 T ${rightX + waveOffset * 0.7} 65 T ${rightX} 80`}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeOpacity="0.85"
                strokeLinecap="round"
              />
            </>
          )}
        </svg>

      </div>
    </motion.div>
  );
};
