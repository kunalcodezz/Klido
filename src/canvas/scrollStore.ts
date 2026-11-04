// Lightweight scroll & pointer state store for 60-120fps 3D phone & camera rig

export interface StoryTimelineState {
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
  x: number;
  y: number;
  z: number;
  screen0: number;
  screen1: number;
  screen2: number;
  screen3: number;
}

// Master timeline animated proxy (strictly driven by GSAP timeline, read in useFrame)
export const storyTimelineState: StoryTimelineState = {
  rotX: 6 * (Math.PI / 180),
  rotY: -18 * (Math.PI / 180),
  rotZ: 0,
  scale: 1.0,
  x: 0,
  y: 0,
  z: 0,
  screen0: 1.0,
  screen1: 0.0,
  screen2: 0.0,
  screen3: 0.0,
};

// Callback to wake up R3F frameloop="demand"
export let invalidateCanvasCallback: (() => void) | null = null;
export const setInvalidateCanvasCallback = (fn: (() => void) | null) => {
  invalidateCanvasCallback = fn;
};

export interface ScrollState {
  progress: number;
  targetProgress: number;
  scrollY: number;
  totalScrollable: number;
  pointer: { x: number; y: number };
  storyProgress: number;
  targetStoryProgress: number;
  activeStage: number;
  hasScrolled: boolean;
  phoneRotY: number;
}

export const scrollState: ScrollState = {
  progress: 0,
  targetProgress: 0,
  scrollY: 0,
  totalScrollable: 1,
  pointer: { x: 0, y: 0 },
  storyProgress: 0,
  targetStoryProgress: 0,
  activeStage: 0,
  hasScrolled: false,
  phoneRotY: -0.314,
};

// Global scroll update called strictly by Lenis to maintain a single unified RAF ticker
export const updateScrollState = (scrollY: number) => {
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  scrollState.scrollY = scrollY;
  scrollState.totalScrollable = maxScroll;
  scrollState.targetProgress = Math.min(1, Math.max(0, scrollY / maxScroll));
  if (scrollY > 15 && !scrollState.hasScrolled) {
    scrollState.hasScrolled = true;
  }
};

export const updateStoryProgress = (progress: number) => {
  scrollState.targetStoryProgress = Math.min(1, Math.max(0, progress));
  scrollState.storyProgress = Math.min(1, Math.max(0, progress));
  if (progress > 0.01 && !scrollState.hasScrolled) {
    scrollState.hasScrolled = true;
  }
};

// Pointer listener for gentle mouse parallax (desktop fine-pointer only)
if (typeof window !== 'undefined') {
  const isFine = window.matchMedia('(pointer: fine)').matches;
  if (isFine) {
    window.addEventListener(
      'pointermove',
      (e) => {
        scrollState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        scrollState.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
      },
      { passive: true }
    );
  }
}
