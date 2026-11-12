import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const finishLoading = () => {
    setProgress(100);
    setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 180);
  };

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setVisible(false);
      onComplete?.();
      return;
    }

    // Play video if possible
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted in some environments; handled gracefully
      });
    }

    // Animate progress smoothly over the 2-second video duration
    const startTime = Date.now();
    const duration = 1950; // matches loading.mp4 duration (~1.97s)

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(currentProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        finishLoading();
      }
    }, 30);

    // Hard fallback timeout (2.4s max) to guarantee preloader never blocks
    const fallbackTimer = setTimeout(() => {
      clearInterval(interval);
      finishLoading();
    }, 2400);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            opacity: 0.95,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center select-none px-6"
        >
          {/* Top progress indicator line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#E5EAF5]">
            <motion.div
              className="h-full bg-[#3D5AFE]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.05 }}
            />
          </div>

          {/* Centered Loading Animation Video */}
          <div className="flex flex-col items-center justify-center max-w-[540px] w-full">
            <div className="w-full aspect-video flex items-center justify-center overflow-hidden rounded-2xl">
              <video
                ref={videoRef}
                src="/loading.mp4"
                autoPlay
                muted
                playsInline
                onEnded={finishLoading}
                className="w-full h-full object-contain pointer-events-none select-none"
              />
            </div>

            {/* Subtle Progress Label */}
            <div className="mt-4 flex items-center gap-3">
              <span className="font-sans font-semibold text-[13px] text-[#111827] tracking-tight">Klido</span>
              <span className="text-[#64748B]/40">•</span>
              <span className="font-mono text-[12px] text-[#64748B] tabular-nums tracking-wider font-medium">
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
