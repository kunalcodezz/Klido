import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { SceneWorld } from './SceneWorld';
import saanjhCandles from '../assets/images/saanjh_luxury_candles_1793541111495.jpg';

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class CanvasErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[Klido Canvas ErrorBoundary] WebGL error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Clean static CSS phone mockup for Hero preview & fallback
export const StaticHeroPhone: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 pointer-events-none select-none">
      <div
        className="w-[280px] sm:w-[310px] md:w-[330px] h-[580px] sm:h-[630px] rounded-[36px] p-3 shadow-2xl relative"
        style={{
          backgroundColor: '#1B2231',
          border: '1.5px solid #1558C9',
          transform: 'rotateY(-18deg) rotateX(6deg)',
        }}
      >
        <div className="w-full h-full rounded-[28px] overflow-hidden bg-[#030407] border border-[#1558C9] relative flex flex-col justify-between p-4">
          {/* Dynamic Island */}
          <div className="w-24 h-5 bg-black rounded-full mx-auto" />

          {/* Ad Creative Image */}
          <div className="my-auto rounded-xl overflow-hidden border border-white/8 relative">
            <img
              src={saanjhCandles}
              alt="Ad Creative"
              width="320"
              height="320"
              loading="lazy"
              decoding="async"
              className="w-full h-[320px] object-cover"
            />
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#1558C9] text-[10px] font-bold text-white">
              PROFITABLE ACQUISITION
            </div>
            <div className="absolute bottom-2 left-2 text-[12px] font-semibold text-white">
              Ads that pay for themselves.
            </div>
          </div>

          {/* Footer strip */}
          <div className="px-3 py-2 rounded-lg bg-[#0B0F18] border border-[#1558C9] text-[11px] text-[#F4F6FA] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1558C9]" />
            <span>Weekly performance & ROAS audit</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SharedCanvas: React.FC = () => {
  const [webglSupported, setWebglSupported] = useState(true);
  const [isLowEndMobile, setIsLowEndMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
      }
    } catch {
      setWebglSupported(false);
    }

    // Low-end mobile device check: navigator.hardwareConcurrency <= 4 or deviceMemory <= 4
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const nav = navigator as Navigator & { deviceMemory?: number };
      const isLowSpec = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
                        (nav.deviceMemory && nav.deviceMemory <= 4);
      if (isLowSpec && window.innerWidth < 768) {
        setIsLowEndMobile(true);
      }
    }

    // Check prefers-reduced-motion
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', onChange);

    // Stop rendering when tab is hidden
    const onVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      mql.removeEventListener('change', onChange);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  if (!webglSupported || isLowEndMobile) {
    return <StaticHeroPhone />;
  }

  if (!isVisible) {
    return null;
  }

  return (
    <CanvasErrorBoundary fallback={<StaticHeroPhone />}>
      <div
        className="w-full h-full pointer-events-none overflow-hidden bg-transparent relative"
        aria-hidden="true"
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 42, near: 0.1, far: 100 }}
          dpr={typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : [1, 1.5]}
          frameloop="demand"
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener('webglcontextlost', (e) => {
              e.preventDefault();
              console.warn('[Klido WebGL] WebGL Context Lost. Preserving state.');
            });
          }}
          className="w-full h-full pointer-events-none bg-transparent"
        >
          <Suspense fallback={null}>
            <SceneWorld reducedMotion={prefersReducedMotion} />
          </Suspense>
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
};
