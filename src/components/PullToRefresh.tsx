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
  const [waveOffset, setWaveOffset] = useState(0);

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

  const MAX_PULL = 90;
  const THRESHOLD = 60;

  const triggerRefreshAnimation = useCallback(() => {
    setIsRefreshing(true);
    isRefreshingRef.current = true;
    setPullY(THRESHOLD);
    pullYRef.current = THRESHOLD;

    const startTime = performance.now();
    const duration = 1100; // 1.1s natural water fill meeting in center

    const step = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(100, (elapsed / duration) * 100);
      const t = rawProgress / 100;
      // Smooth fluid cubic easing
      const eased = Math.min(100, t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2) * 100;

      setProgress(eased);
      setWaveOffset(Math.sin(elapsed * 0.015) * 2.2);

      if (elapsed < duration) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setProgress(100);
        // Execute refresh handler
        Promise.resolve(onRefreshRef.current())
          .catch(() => {})
          .finally(() => {
            // Briefly linger at 100% full, then smoothly retract
            setTimeout(() => {
              setIsRefreshing(false);
              isRefreshingRef.current = false;
              setPullY(0);
              pullYRef.current = 0;
              setProgress(0);
            }, 200);
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

      // If user is mostly swiping horizontally, cancel PTR
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

        // Preview fill ratio as user pulls down (0% -> 50%)
        const pullRatio = Math.min(1, damped / THRESHOLD);
        setProgress(pullRatio * 50);
        setWaveOffset(Math.sin(damped * 0.1) * 1.2);
      } else if (diffY <= 0) {
        startYRef.current = null;
        isPullingRef.current = false;
        pullYRef.current = 0;
        setPullY(0);
        setProgress(0);
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
      if (diffY > 10 && getScrollTop() <= 2) {
        isPullingRef.current = true;
        const damped = Math.min(MAX_PULL, diffY * 0.42);
        pullYRef.current = damped;
        setPullY(damped);

        const pullRatio = Math.min(1, damped / THRESHOLD);
        setProgress(pullRatio * 50);
        setWaveOffset(Math.sin(damped * 0.1) * 1.2);
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
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
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
    : `M -5 -5 L 105 -5 L 105 ${topY} Q 75 ${topY + waveOffset}, 50 ${topY} T 0 ${topY - waveOffset * 0.7} L -5 ${topY} Z`;

  const bottomFillPath = isFull
    ? 'M -5 49 L 105 49 L 105 105 L -5 105 Z'
    : `M -5 105 L 105 105 L 105 ${bottomY} Q 75 ${bottomY - waveOffset}, 50 ${bottomY} T 0 ${bottomY + waveOffset * 0.7} L -5 ${bottomY} Z`;

  const isVisible = pullY > 0 || isRefreshing;
  const opacity = Math.min(1, Math.max(0, (pullY - 10) / 30));

  return (
    <div className="relative w-full min-h-screen">
      {/* 
        CLEAN, NATURAL FLOATING HYBIT LOGO ICON:
        - NO Card, NO Box, NO Background container
        - NO excessive glow / halo lighting: 100% natural, crisp matte wireframe
        - Smooth water filling meeting in center
      */}
      {isVisible && (
        <div
          className="fixed left-0 right-0 z-50 flex items-center justify-center pointer-events-none select-none"
          style={{
            top: `${Math.max(12, pullY * 0.75)}px`,
            opacity: isRefreshing ? 1 : opacity,
            transform: `scale(${Math.min(1, 0.78 + (pullY / THRESHOLD) * 0.22)})`,
            transition: isPullingRef.current
              ? 'none'
              : 'top 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease, transform 0.25s ease',
          }}
        >
          {/* Natural Hybit Logo Element - Clean, crisp, no artificial backlight */}
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              className="w-full h-full select-none"
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

              {/* 1. LAYER 1: Natural Base Wireframe of Hybit Element (No glowing bloom) */}
              <g opacity="0.35">
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

              {/* 3. LAYER 3: Natural Leading Fluid Wave Meniscus Lines from Top and Bottom */}
              {!isFull && p > 3 && (
                <>
                  {/* Top wave meniscus moving downward toward center */}
                  <path
                    d={`M 22 ${topY} Q 50 ${topY + waveOffset * 0.9}, 78 ${topY}`}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeOpacity="0.9"
                    strokeLinecap="round"
                  />

                  {/* Bottom wave meniscus moving upward toward center */}
                  <path
                    d={`M 22 ${bottomY} Q 50 ${bottomY - waveOffset * 0.9}, 78 ${bottomY}`}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeOpacity="0.9"
                    strokeLinecap="round"
                  />
                </>
              )}
            </svg>
          </div>
        </div>
      )}

      {/* Main Content with smooth pull translation */}
      <div
        style={{
          transform: pullY > 0 ? `translateY(${pullY * 0.38}px)` : 'none',
          transition: isPullingRef.current
            ? 'none'
            : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {children}
      </div>
    </div>
  );
};
