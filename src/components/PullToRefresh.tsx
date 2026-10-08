import React, { useState, useEffect, useRef, useCallback } from 'react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void> | void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  children,
  disabled = false,
}) => {
  // Pull distance state in px (0 -> MAX_PULL)
  const [pullY, setPullY] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [progress, setProgress] = useState(0); // 0 -> 100

  const startYRef = useRef<number | null>(null);
  const startXRef = useRef<number | null>(null);
  const isPullingRef = useRef(false);
  const pullYRef = useRef(0);
  const isRefreshingRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);
  const onRefreshRef = useRef(onRefresh);

  useEffect(() => {
    onRefreshRef.current = onRefresh;
  }, [onRefresh]);

  useEffect(() => {
    isRefreshingRef.current = isRefreshing;
  }, [isRefreshing]);

  const MAX_PULL = 95;
  const THRESHOLD = 65;

  const triggerRefreshAnimation = useCallback(() => {
    setIsRefreshing(true);
    isRefreshingRef.current = true;
    setPullY(THRESHOLD);
    pullYRef.current = THRESHOLD;
    window.dispatchEvent(new CustomEvent('hybit:ptr-refreshing', { detail: { threshold: THRESHOLD } }));

    const startTime = performance.now();
    const duration = 1100; // 1.1s natural water fill meeting in center

    const step = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(100, (elapsed / duration) * 100);
      const t = rawProgress / 100;
      // Smooth fluid cubic easing
      const eased = Math.min(100, t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2) * 100;

      setProgress(eased);

      if (elapsed < duration) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setProgress(100);
        // Dispatch refreshing-complete event right as refresh finishes and curtain prepares to retract
        window.dispatchEvent(new CustomEvent('hybit:ptr-completing'));

        // Execute refresh handler
        Promise.resolve(onRefreshRef.current())
          .catch(() => {})
          .finally(() => {
            // Briefly linger at 100% full, then smoothly retract black wave
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('hybit:ptr-retracting'));
              setIsRefreshing(false);
              isRefreshingRef.current = false;
              setPullY(0);
              pullYRef.current = 0;
              setProgress(0);
              // Dispatch reset event
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent('hybit:ptr-reset'));
              }, 450);
            }, 220);
          });
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, []);

  // Native event listeners on window to capture top pull
  useEffect(() => {
    const getScrollTop = () => {
      return (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      );
    };

    const onTouchStart = (e: TouchEvent) => {
      if (disabled || isRefreshingRef.current) return;
      if (getScrollTop() <= 2) {
        startYRef.current = e.touches[0].clientY;
        startXRef.current = e.touches[0].clientX;
        isPullingRef.current = false;
      } else {
        startYRef.current = null;
        startXRef.current = null;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (startYRef.current === null || isRefreshingRef.current || disabled) return;

      const currentY = e.touches[0].clientY;
      const currentX = e.touches[0].clientX;
      const diffY = currentY - startYRef.current;
      const diffX = Math.abs(currentX - (startXRef.current || currentX));

      // If user is swiping horizontally, cancel PTR
      if (!isPullingRef.current && diffX > Math.abs(diffY)) {
        startYRef.current = null;
        return;
      }

      if (diffY > 0 && getScrollTop() <= 2) {
        if (e.cancelable) {
          e.preventDefault();
        }
        isPullingRef.current = true;

        // Damped rubber-band pull
        const damped = Math.min(MAX_PULL, diffY * 0.42);
        pullYRef.current = damped;
        setPullY(damped);
        window.dispatchEvent(new CustomEvent('hybit:ptr-pull', { detail: { pullY: damped, ratio: damped / THRESHOLD } }));

        // Preview fill ratio as user pulls down (0% -> 50%)
        const pullRatio = Math.min(1, damped / THRESHOLD);
        setProgress(pullRatio * 50);
      } else if (diffY <= 0) {
        startYRef.current = null;
        isPullingRef.current = false;
        pullYRef.current = 0;
        setPullY(0);
        setProgress(0);
        window.dispatchEvent(new CustomEvent('hybit:ptr-pull', { detail: { pullY: 0, ratio: 0 } }));
      }
    };

    const onTouchEnd = () => {
      if (!isPullingRef.current || startYRef.current === null) {
        startYRef.current = null;
        isPullingRef.current = false;
        return;
      }

      startYRef.current = null;
      isPullingRef.current = false;

      if (pullYRef.current >= THRESHOLD && !isRefreshingRef.current) {
        triggerRefreshAnimation();
      } else {
        // Smoothly snap back
        pullYRef.current = 0;
        setPullY(0);
        setProgress(0);
        window.dispatchEvent(new CustomEvent('hybit:ptr-pull', { detail: { pullY: 0, ratio: 0 } }));
      }
    };

    // Also support mouse drag for easy desktop browser testing
    const onMouseDown = (e: MouseEvent) => {
      if (disabled || isRefreshingRef.current) return;
      if (getScrollTop() <= 2) {
        startYRef.current = e.clientY;
        startXRef.current = e.clientX;
        isPullingRef.current = false;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (startYRef.current === null || isRefreshingRef.current || disabled) return;
      if (e.buttons !== 1) {
        startYRef.current = null;
        return;
      }

      const diffY = e.clientY - startYRef.current;
      if (diffY > 8 && getScrollTop() <= 2) {
        isPullingRef.current = true;
        const damped = Math.min(MAX_PULL, diffY * 0.42);
        pullYRef.current = damped;
        setPullY(damped);
        window.dispatchEvent(new CustomEvent('hybit:ptr-pull', { detail: { pullY: damped, ratio: damped / THRESHOLD } }));

        const pullRatio = Math.min(1, damped / THRESHOLD);
        setProgress(pullRatio * 50);
      }
    };

    const onMouseUp = () => {
      if (!isPullingRef.current || startYRef.current === null) {
        startYRef.current = null;
        isPullingRef.current = false;
        return;
      }

      startYRef.current = null;
      isPullingRef.current = false;

      if (pullYRef.current >= THRESHOLD && !isRefreshingRef.current) {
        triggerRefreshAnimation();
      } else {
        pullYRef.current = 0;
        setPullY(0);
        setProgress(0);
        window.dispatchEvent(new CustomEvent('hybit:ptr-pull', { detail: { pullY: 0, ratio: 0 } }));
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchcancel', onTouchEnd);

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);

      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [disabled, triggerRefreshAnimation]);

  // Calculations for TOP & BOTTOM water filling meeting in the center:
  // progress goes from 0 to 100.
  // At progress = 0: topY = 0, bottomY = 100
  // At progress = 100: topY = 50.5, bottomY = 49.5 (meets at center y = 50)
  const p = progress;
  const isFull = p >= 99.5;

  const topY = (p / 100) * 50.5;
  const bottomY = 100 - (p / 100) * 50.5;

  const topFillPath = isFull
    ? 'M -5 -5 L 105 -5 L 105 51 L -5 51 Z'
    : `M -5 -5 L 105 -5 L 105 ${topY} L -5 ${topY} Z`;

  const bottomFillPath = isFull
    ? 'M -5 49 L 105 49 L 105 105 L -5 105 Z'
    : `M -5 105 L 105 105 L 105 ${bottomY} L -5 ${bottomY} Z`;

  const isVisible = pullY > 0 || isRefreshing;
  const opacity = Math.min(1, Math.max(0, (pullY - 10) / 30));

  // Natural dynamic scale calculation:
  // - Starts compact at the top when pulling begins (scale ~0.55)
  // - Grows naturally as user pulls down towards threshold (scale ~0.9)
  // - In refresh state at the center of the black curtain, reaches clear centerpiece size (~1.15) without glow, bloom, or artificial lighting
  const pullRatio = Math.min(1, pullY / THRESHOLD);
  const logoScale = isRefreshing
    ? 1.15
    : Math.min(0.9, 0.55 + pullRatio * 0.35);

  // Height of black wave curtain
  const curtainHeight = isRefreshing
    ? '100vh'
    : `${Math.max(0, pullY * 1.65 + 30)}px`;

  return (
    <div className="relative w-full min-h-screen">
      <style>{`
        @keyframes ptrWaveFlow {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-25%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes ptrWaveFlowAlt {
          0% { transform: translate3d(-25%, 0, 0); }
          50% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-25%, 0, 0); }
        }
        .animate-ptrWaveFlow {
          animation: ptrWaveFlow 8s ease-in-out infinite;
        }
        .animate-ptrWaveFlowAlt {
          animation: ptrWaveFlowAlt 5.5s ease-in-out infinite;
        }
      `}</style>

      {/* 
        EFEK GAYA GELOMBANG HITAM (BLACK WAVE EFFECT):
        - Conceals Hybit screen as user pulls down from top
        - Features dynamic fluid wave crests in obsidian and dark graphite
        - Envelops view during refresh while water filling animation executes in center
        - Seamlessly retracts upward upon completion
      */}
      <div
        className="fixed inset-x-0 top-0 pointer-events-none select-none z-40 overflow-hidden flex flex-col justify-between"
        style={{
          height: curtainHeight,
          opacity: isVisible ? 1 : 0,
          transform: !isRefreshing && pullY === 0 ? 'translate3d(0, -100%, 0)' : 'translate3d(0, 0, 0)',
          transition: isPullingRef.current
            ? 'none'
            : 'height 0.42s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
        }}
      >
        {/* Solid Black Obsidian Mask Body */}
        <div className="absolute inset-0 bg-[#09090B]" />

        {/* Central Logo Container within Black Wave Area */}
        <div
          className="relative z-10 w-full flex-1 flex flex-col items-center justify-center pointer-events-none px-4"
          style={{
            paddingTop: isRefreshing ? '0' : '6px',
            transition: isPullingRef.current ? 'none' : 'padding-top 0.4s ease',
          }}
        >
          {/* Natural Hybit Logo Element - Clean vector without luminous bloom or lighting color */}
          <div
            className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center"
            style={{
              transform: `scale(${logoScale})`,
              transition: isPullingRef.current
                ? 'none'
                : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <svg
              viewBox="0 0 100 100"
              fill="none"
              className="w-full h-full select-none relative z-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Dual Top & Bottom Water Fill Clip Path */}
                <clipPath id="hybit-ptr-vertical-water-fill">
                  {isFull ? (
                    <rect x="-5" y="-5" width="110" height="110" />
                  ) : (
                    <>
                      <path d={topFillPath} />
                      <path d={bottomFillPath} />
                    </>
                  )}
                </clipPath>
              </defs>

              {/* 1. LAYER 1: Natural Base Wireframe of Hybit Element */}
              <g opacity="0.38">
                {/* Left Column Capsule */}
                <rect
                  x="23.5"
                  y="32"
                  width="12"
                  height="36"
                  rx="6"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                />

                {/* Center Column Top Segment */}
                <path
                  d="M 44 47.2 L 44 25 A 6 6 0 0 1 56 25 L 56 47.2 Z"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                />

                {/* Center Column Bottom Segment */}
                <path
                  d="M 44 52.8 L 56 52.8 L 56 75 A 6 6 0 0 1 44 75 Z"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                />

                {/* Right Column Capsule */}
                <rect
                  x="64.5"
                  y="32"
                  width="12"
                  height="36"
                  rx="6"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                />
              </g>

              {/* 2. LAYER 2: Pure White Water Filling from Top and Bottom Meeting in Center */}
              <g clipPath="url(#hybit-ptr-vertical-water-fill)">
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
            </svg>
          </div>
        </div>

        {/* Dynamic Black Waves along the bottom edge of the black curtain */}
        <div className="relative w-full h-14 sm:h-20 overflow-hidden shrink-0 pointer-events-none -mt-1">
          {/* Wave 1: Rolling charcoal fluid wave */}
          <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 w-[200%] h-full pointer-events-none animate-ptrWaveFlow opacity-75"
          >
            <path
              d="M 0 0 L 1440 0 L 1440 50 Q 1260 15 1080 50 T 720 50 T 360 50 T 0 50 Z"
              fill="#14141C"
            />
            <path
              d="M 0 50 Q 180 85 360 50 T 720 50 T 1080 50 T 1440 50"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
            />
          </svg>

          {/* Wave 2: Deep Obsidian Crest Wave matching the #09090B background */}
          <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 w-[200%] h-full pointer-events-none animate-ptrWaveFlowAlt"
          >
            <path
              d="M 0 0 L 1440 0 L 1440 35 Q 1260 75 1080 35 T 720 35 T 360 35 T 0 35 Z"
              fill="#09090B"
            />
            <path
              d="M 0 35 Q 180 -5 360 35 T 720 35 T 1080 35 T 1440 35"
              fill="none"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>

      {/* 
        HYBIT VIEWPORT CONTENT:
        - Physically moves down following the user's pull down motion ('tampilan Hybit juga mengikuti nya bergerak')
        - Dimmed and veiled beneath the black wave curtain ('sembunyikan tampilan nya dengan efek gaya gelombang hitam')
        - Smoothly springs back to origin upon refresh completion
      */}
      <div
        className="w-full"
        style={{
          transform: `translate3d(0, ${isRefreshing ? 60 : pullY}px, 0)`,
          opacity: isRefreshing ? 0.08 : Math.max(0.2, 1 - (pullY / 130)),
          filter: isRefreshing ? 'blur(4px)' : pullY > 15 ? `blur(${Math.min(3, (pullY - 15) / 25)}px)` : 'none',
          transition: isPullingRef.current
            ? 'none'
            : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, filter 0.35s ease',
        }}
      >
        {children}
      </div>
    </div>
  );
};
