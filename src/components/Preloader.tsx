import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setVisible(false);
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            onComplete?.();
          }, 200);
          return 100;
        }
        // Rapid acceleration
        const increment = Math.max(4, Math.floor(Math.random() * 20));
        return Math.min(100, prev + increment);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[100] bg-[#030407] flex flex-col items-center justify-center select-none"
        >
          {/* Top progress line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/8">
            <motion.div
              className="h-full bg-[#1558C9]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </div>

          {/* Centered Minimal Brand Monogram */}
          <div className="flex flex-col items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-14 h-14 border border-white/10 rounded-[12px] overflow-hidden shadow-xl"
            >
              <img
                src="/klido-logo.jpeg"
                alt="Klido Logo"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="flex items-center gap-3">
              <span className="font-serif text-[18px] text-[#F4F6FA] tracking-tight">Klido</span>
              <span className="text-white/20">•</span>
              <span className="font-mono text-[12px] text-[#9AA3B2] tabular-nums tracking-wider">
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
