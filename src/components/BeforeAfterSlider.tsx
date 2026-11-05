import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronsLeftRight } from 'lucide-react';
import { BEFORE_AFTER_CATEGORIES, BeforeAfterCategory } from '../data/beforeAfterData';

const RESUME_DELAY_MS = 5000;
const HOVER_RESUME_DELAY_MS = 1000;

export const BeforeAfterSlider: React.FC = () => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isInteracting, setIsInteracting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const isHoveringRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const animStartTimeRef = useRef<number | null>(null);
  const animPhaseRef = useRef<number>(0);
  // Phase 0: 50 -> 100% (1400ms)
  // Phase 1: Hold at 100% (800ms)
  // Phase 2: 100 -> 0% (1800ms)
  // Phase 3: Hold at 0% (800ms)
  // Phase 4: 0 -> 50% (1000ms)
  // Phase 5: Switch category & pause (500ms)

  const currentCategory: BeforeAfterCategory = BEFORE_AFTER_CATEGORIES[currentCategoryIndex];

  // 1. Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // 2. Preload all 8 exact PNG images to ensure zero flicker
  useEffect(() => {
    BEFORE_AFTER_CATEGORIES.forEach((cat) => {
      const imgBefore = new Image();
      imgBefore.src = cat.before.image;
      const imgAfter = new Image();
      imgAfter.src = cat.after.image;
    });
  }, []);

  // Easing function (smooth cubic ease in-out)
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // 3. Automated slider animation loop (50 -> 100 -> 0 -> 50 -> next category)
  const runAutoAnimation = useCallback((timestamp: number) => {
    if (isDraggingRef.current || isInteracting || prefersReducedMotion) {
      animStartTimeRef.current = null;
      return;
    }

    if (!animStartTimeRef.current) {
      animStartTimeRef.current = timestamp;
      animPhaseRef.current = 0;
    }

    const elapsed = timestamp - animStartTimeRef.current;

    // Timeline definitions:
    const DURATION_TO_RIGHT = 1400; // 50% -> 100%
    const HOLD_AT_RIGHT = 800;      // hold at 100%
    const DURATION_TO_LEFT = 1800;  // 100% -> 0%
    const HOLD_AT_LEFT = 800;       // hold at 0%
    const DURATION_TO_CENTER = 1000;// 0% -> 50%
    const CATEGORY_PAUSE = 600;     // brief pause before next cycle

    const t1 = DURATION_TO_RIGHT;
    const t2 = t1 + HOLD_AT_RIGHT;
    const t3 = t2 + DURATION_TO_LEFT;
    const t4 = t3 + HOLD_AT_LEFT;
    const t5 = t4 + DURATION_TO_CENTER;
    const totalCycle = t5 + CATEGORY_PAUSE;

    if (elapsed < t1) {
      // Phase 1: 50% -> 100%
      const progress = elapsed / DURATION_TO_RIGHT;
      const eased = easeInOutCubic(progress);
      setSliderPos(50 + eased * 50);
    } else if (elapsed < t2) {
      // Phase 2: Hold at 100%
      setSliderPos(100);
    } else if (elapsed < t3) {
      // Phase 3: 100% -> 0%
      const progress = (elapsed - t2) / DURATION_TO_LEFT;
      const eased = easeInOutCubic(progress);
      setSliderPos(100 - eased * 100);
    } else if (elapsed < t4) {
      // Phase 4: Hold at 0%
      setSliderPos(0);
    } else if (elapsed < t5) {
      // Phase 5: 0% -> 50%
      const progress = (elapsed - t4) / DURATION_TO_CENTER;
      const eased = easeInOutCubic(progress);
      setSliderPos(eased * 50);
    } else if (elapsed < totalCycle) {
      // Hold at 50% while category switches
      setSliderPos(50);
    } else {
      // Cycle complete: switch to next category and reset start time
      setCurrentCategoryIndex((prev) => (prev + 1) % BEFORE_AFTER_CATEGORIES.length);
      setSliderPos(50);
      animStartTimeRef.current = timestamp;
    }

    animFrameRef.current = requestAnimationFrame(runAutoAnimation);
  }, [isInteracting, prefersReducedMotion]);

  // Start / restart auto animation loop
  useEffect(() => {
    if (isInteracting || prefersReducedMotion) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      return;
    }

    animStartTimeRef.current = null;
    animFrameRef.current = requestAnimationFrame(runAutoAnimation);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isInteracting, prefersReducedMotion, runAutoAnimation]);

  // 4. Tab Visibility Listener
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = null;
        }
      } else {
        if (!isInteracting && !prefersReducedMotion) {
          animStartTimeRef.current = null;
          animFrameRef.current = requestAnimationFrame(runAutoAnimation);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isInteracting, prefersReducedMotion, runAutoAnimation]);

  // 5. Category Selection
  const selectCategory = (index: number) => {
    setIsInteracting(true);
    setCurrentCategoryIndex(index);
    setSliderPos(50);

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
      animStartTimeRef.current = null;
    }, RESUME_DELAY_MS);
  };

  // 6. Pointer Dragging Handlers (Mouse & Touch)
  const calculatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPos(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    setIsInteracting(true);

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }

    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);
    calculatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    calculatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const target = e.currentTarget as HTMLElement;
    try {
      target.releasePointerCapture(e.pointerId);
    } catch {
      // Ignored if capture already released
    }

    // Wait exactly 5 seconds after user releases before resuming automated animation
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
      animStartTimeRef.current = null;
    }, RESUME_DELAY_MS);
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    setIsInteracting(true);
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    if (e.key === 'ArrowLeft') {
      setSliderPos((prev) => Math.max(prev - 5, 0));
    } else if (e.key === 'ArrowRight') {
      setSliderPos((prev) => Math.min(prev + 5, 100));
    }

    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
      animStartTimeRef.current = null;
    }, RESUME_DELAY_MS);
  };

  // 7b. Hover-to-control: cursor position controls divider on desktop
  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    setIsInteracting(true);

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    setSliderPos(x);
  }, []);

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    isDraggingRef.current = false;

    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
      animStartTimeRef.current = null;
    }, HOVER_RESUME_DELAY_MS);
  };

  return (
    <div className="w-full max-w-[620px] mx-auto select-none pointer-events-auto">
      {/* 1. Category Switcher Pills */}
      <div className="flex items-center justify-between gap-1.5 p-1 mb-3 rounded-xl bg-[#F3F6FF] border border-[#E5EAF5] overflow-x-auto no-scrollbar">
        {BEFORE_AFTER_CATEGORIES.map((cat, idx) => {
          const isActive = idx === currentCategoryIndex;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => selectCategory(idx)}
              className={`flex-1 py-1.5 px-3 rounded-lg text-[11px] sm:text-[12px] font-medium tracking-[0.02em] whitespace-nowrap transition-all duration-200 cursor-pointer relative ${
                isActive
                  ? 'text-white font-semibold bg-[#3D5AFE] shadow-sm shadow-[#3D5AFE]/25'
                  : 'text-[#64748B] hover:text-[#111827] hover:bg-white/80'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* 2. Main Comparison Panel */}
      <div
        className="relative rounded-2xl border border-[#E5EAF5] bg-white overflow-hidden shadow-sm"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Category Header Bar */}
        <div className="px-4 py-2.5 border-b border-[#E5EAF5] bg-[#F8FAFC] flex items-center justify-between text-[12px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3D5AFE] animate-pulse" />
            <span className="font-mono text-[#3D5AFE] uppercase tracking-wider font-semibold text-[11px]">
              {currentCategory.name}
            </span>
          </div>
          <span className="text-[#64748B] truncate max-w-[280px] text-right font-medium text-[11px] sm:text-[12px]">
            {currentCategory.tagline}
          </span>
        </div>

        {/* 3. Interactive / Auto-Animated Comparison Screen */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="slider"
          aria-label="Before and after image comparison slider"
          aria-valuenow={Math.round(sliderPos)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] overflow-hidden cursor-ew-resize touch-none focus:outline-none focus:ring-2 focus:ring-[#3D5AFE] bg-slate-950"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory.id}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Layer 1: AFTER Image (Base layer, visible on the RIGHT side of the divider from sliderPos to 100%) */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={currentCategory.after.image}
                  alt={`${currentCategory.name} - After`}
                  className="w-full h-full object-cover object-center select-none pointer-events-none"
                  draggable={false}
                />
              </div>

              {/* Layer 2: BEFORE Image (Top layer, visible on the LEFT side of the divider from 0% to sliderPos%) */}
              <div
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{
                  clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
                  WebkitClipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
                }}
              >
                <img
                  src={currentCategory.before.image}
                  alt={`${currentCategory.name} - Before`}
                  className="w-full h-full object-cover object-center select-none pointer-events-none"
                  draggable={false}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Single Dynamic Label — positioned over the dominant image */}
          {sliderPos > 50 ? (
            /* BEFORE label: dominant when divider is > 50% → more BEFORE visible on left side */
            <div className="absolute top-3 left-3 z-20 pointer-events-none transition-opacity duration-200">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#E5EAF5] shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span className="text-[10px] sm:text-[11px] font-mono tracking-wider font-semibold text-[#111827]">
                  BEFORE
                </span>
              </div>
            </div>
          ) : (
            /* AFTER label: dominant when divider is <= 50% → more AFTER visible on right side */
            <div className="absolute top-3 right-3 z-20 pointer-events-none transition-opacity duration-200">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#E5EAF5] shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3D5AFE]" />
                <span className="text-[10px] sm:text-[11px] font-mono tracking-wider font-semibold text-[#111827]">
                  AFTER (KLIDO)
                </span>
              </div>
            </div>
          )}

          {/* Draggable & Animated Vertical Divider Line */}
          <div
            className="absolute top-0 bottom-0 z-30 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            {/* 2px Vertical Line with soft glow */}
            <div className="absolute top-0 bottom-0 -left-[1px] w-[2px] bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />

            {/* Circular Draggable Handle */}
            <div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border-2 border-[#3D5AFE] shadow-[0_4px_16px_rgba(61,90,254,0.3)] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 text-[#3D5AFE]"
            >
              <ChevronsLeftRight className="w-5 h-5 text-[#3D5AFE]" strokeWidth={2.4} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
