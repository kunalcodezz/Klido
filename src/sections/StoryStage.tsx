import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { storyTimelineState, invalidateCanvasCallback } from '../canvas/scrollStore';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SharedCanvas } from '../canvas/SharedCanvas';
import saanjhCandles from '../assets/images/saanjh_luxury_candles_1793541111495.jpg';

gsap.registerPlugin(ScrollTrigger);

interface StoryStageProps {
  onSelectService?: (serviceId: string) => void;
  onOpenContact?: () => void;
}

export const StoryStage: React.FC<StoryStageProps> = ({ onSelectService }) => {
  const storySectionRef = useRef<HTMLElement>(null);
  const pinnedStageRef = useRef<HTMLDivElement>(null);
  const stageBlockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressTextRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardGroupRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Stage content definitions with real facts & copy
  const stages = useMemo(() => [
    {
      id: 'meta-ads',
      num: '01',
      label: '01 / META ADS',
      headlinePrefix: 'Ads that pay for ',
      underlineWord: 'themselves',
      headlineSuffix: '.',
      priceValue: 7000,
      priceNote: 'Under ₹1L ad spend; 10% above.',
      badge: 'Paid Acquisition',
      desc: 'Build profitable advertising campaigns with strategic account setup, campaign structure, creatives and continuous algorithmic optimisation.',
      points: [
        'Account setup & tracking architecture',
        'Full campaign funnel structure',
        'High-converting ad creatives & hooks',
        'Weekly algorithmic optimisation',
      ],
      cards: [
        { label: 'AUDITED ROAS', value: 'ROAS 4.2x', note: 'Top 5% ad account scaling' },
        { label: 'ACQUISITION COST', value: 'CAC -32%', note: 'Audited CPA reduction' },
        { label: 'CLICK-THROUGH', value: 'CTR 3.8%', note: 'High converting hooks' },
      ],
    },
    {
      id: 'creators',
      num: '02',
      label: '02 / CREATORS',
      headlinePrefix: 'Creators. Campaigns. Real ',
      underlineWord: 'execution',
      headlineSuffix: '.',
      priceValue: 6000,
      priceNote: '10 barter collaborations managed every month.',
      badge: 'Creator Advocacy',
      desc: 'Niche creator vetting, visual briefs, product placements, and usage rights for high-converting ads without markup.',
      points: [
        'Niche creator discovery & audience vetting',
        'Outreach & barter negotiations',
        'Visual briefs & brand guidelines',
        '10 Barter creator placements per month',
      ],
      cards: [
        { label: 'MONTHLY UGC', value: '10 Barter Creators', note: 'Vetted niche placements' },
        { label: 'CREATOR CONVERSION', value: 'Engagement 6.4%', note: 'Organic audience resonance' },
        { label: 'TRANSPARENCY', value: 'Zero Markup', note: 'Whitelisted commercial rights' },
      ],
    },
    {
      id: 'social-media',
      num: '03',
      label: '03 / SOCIAL MEDIA',
      headlinePrefix: 'Consistent brand ',
      underlineWord: 'presence',
      headlineSuffix: '.',
      priceValue: 5000,
      priceNote: 'Content calendar & stories.',
      badge: 'Brand Presence',
      desc: 'End-to-end social media management with scheduled multi-format content calendars, daily stories, and community engagement.',
      points: [
        'Multi-format monthly content calendar',
        '15 Custom feed assets & carousel designs',
        'Daily active story sequences & polls',
        'Community moderation & brand voice',
      ],
      cards: [
        { label: 'CREATIVE PRODUCTION', value: '15 Feed Assets', note: 'Custom carousels & reels' },
        { label: 'STORY SEQUENCES', value: 'Daily Stories', note: 'Interactive polls & stickers' },
        { label: 'BRAND AUDIENCE', value: 'Community 12k', note: 'Moderated retention loop' },
      ],
    },
    {
      id: 'operations',
      num: '04',
      label: '04 / OPERATIONS',
      headlinePrefix: 'From a home business to an online ',
      underlineWord: 'brand',
      headlineSuffix: '.',
      priceValue: 7000,
      priceNote: 'Unit economics, SOPs, master P&L.',
      badge: 'Margin Defense',
      desc: 'Granular SKU unit economics, true landed margins, warehouse packing SOPs, inventory reorder thresholds, and master P&L modeling before scaling budget.',
      points: [
        'Granular SKU unit economics & landed margins',
        'Costing & master P&L modeling',
        'Standard Operating Procedures (SOPs)',
        'Returns & RTO reduction workflows',
      ],
      cards: [
        { label: 'FINANCIAL DEFENSE', value: 'Master P&L', note: 'Granular unit economics' },
        { label: 'LOGISTICS EFFICIENCY', value: 'RTO -18%', note: 'Automated NDR verification' },
        { label: 'FULFILLMENT', value: 'SOP Ready', note: '48h warehouse turnaround' },
      ],
    },
  ], []);

  // Screen resize & accessibility checks
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);

    checkViewport();
    window.addEventListener('resize', checkViewport, { passive: true });
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const visibleStages = isMobile
    ? [stages[0], stages[1], stages[3]] // 3 stages on mobile: Ads, Creators, Operations
    : stages;

  // Master ScrollTrigger and Single Master GSAP Timeline Setup
  useEffect(() => {
    if (reducedMotion) return;
    const section = storySectionRef.current;
    const pinnedStage = pinnedStageRef.current;
    if (!section || !pinnedStage) return;

    // Reset initial timeline state values
    storyTimelineState.rotX = 6 * (Math.PI / 180);
    storyTimelineState.rotY = -18 * (Math.PI / 180);
    storyTimelineState.rotZ = 0;
    storyTimelineState.scale = 1.0;
    storyTimelineState.x = 0;
    storyTimelineState.y = 0;
    storyTimelineState.z = 0;
    storyTimelineState.screen0 = 1.0;
    storyTimelineState.screen1 = 0.0;
    storyTimelineState.screen2 = 0.0;
    storyTimelineState.screen3 = 0.0;

    const splitInstances: SplitType[] = [];

    // Initialize SplitType on each block's headline with masked line wrappers
    stageBlockRefs.current.forEach((block) => {
      if (!block) return;
      const headline = block.querySelector<HTMLElement>('.stage-headline');
      if (headline) {
        const split = new SplitType(headline, { types: 'lines', lineClass: 'split-line' });
        splitInstances.push(split);
        if (split.lines) {
          split.lines.forEach((line) => {
            const mask = document.createElement('div');
            mask.style.overflow = 'hidden';
            mask.style.display = 'block';
            line.parentNode?.insertBefore(mask, line);
            mask.appendChild(line);
          });
        }
      }
    });

    const isMob = window.innerWidth < 768;

    // Build the ONE MASTER TIMELINE (strictly deterministic tweens, no callbacks)
    const masterTimeline = gsap.timeline({
      paused: true,
      defaults: { ease: 'power2.inOut' },
    });

    masterTimeline.eventCallback('onUpdate', () => {
      invalidateCanvasCallback?.();
    });

    if (!isMob) {
      // ==============================================================
      // DESKTOP: 4 Stages over duration = 4.2
      // ==============================================================

      // Set initial states:
      // Block 0 visible, 1/2/3 hidden
      stageBlockRefs.current.forEach((block, idx) => {
        if (!block) return;
        const underline = block.querySelector('.stage-underline');
        const headlineLines = block.querySelectorAll('.split-line');
        if (idx === 0) {
          gsap.set(block, { opacity: 1, y: 0, pointerEvents: 'auto' });
          if (underline) gsap.set(underline, { scaleX: 1 });
          if (headlineLines.length) gsap.set(headlineLines, { yPercent: 0 });
        } else {
          gsap.set(block, { opacity: 0, y: 24, pointerEvents: 'none' });
          if (underline) gsap.set(underline, { scaleX: 0 });
          if (headlineLines.length) gsap.set(headlineLines, { yPercent: 100 });
        }
      });

      // Progress bar initial states
      progressBarRefs.current.forEach((bar, idx) => {
        if (!bar) return;
        gsap.set(bar, {
          height: idx === 0 ? 36 : 24,
          backgroundColor: idx === 0 ? '#3D5AFE' : '#E5EAF5',
        });
      });
      progressTextRefs.current.forEach((txt, idx) => {
        if (!txt) return;
        gsap.set(txt, {
          color: idx === 0 ? '#3D5AFE' : '#94A3B8',
          fontWeight: idx === 0 ? '600' : '400',
        });
      });

      // Floating cards initial states
      cardGroupRefs.current.forEach((group, idx) => {
        if (!group) return;
        const leftCards = group.querySelectorAll('.card-left');
        const rightCards = group.querySelectorAll('.card-right');
        if (idx === 0) {
          gsap.set(group, { opacity: 1 });
          gsap.set(leftCards, { opacity: 1, x: 0 });
          gsap.set(rightCards, { opacity: 1, x: 0 });
        } else {
          gsap.set(group, { opacity: 0 });
          gsap.set(leftCards, { opacity: 0, x: 30 });
          gsap.set(rightCards, { opacity: 0, x: -30 });
        }
      });

      // ---- STAGE 1 (0.0 -> 1.0) ----
      // Phone rotates from -18deg to 0deg and settles
      masterTimeline.to(
        storyTimelineState,
        {
          rotX: 0,
          rotY: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        0.05
      );

      // Cards 0 retract before Stage 2
      if (cardGroupRefs.current[0]) {
        masterTimeline.to(
          cardGroupRefs.current[0],
          { opacity: 0, x: -20, duration: 0.3, ease: 'power2.in' },
          0.75
        );
      }

      // ---- TRANSITION 1 -> 2 (0.80 -> 1.30) ----
      // Block 0 exits
      if (stageBlockRefs.current[0]) {
        const u0 = stageBlockRefs.current[0].querySelector('.stage-underline');
        if (u0) masterTimeline.to(u0, { scaleX: 0, duration: 0.25 }, 0.80);
        masterTimeline.to(
          stageBlockRefs.current[0],
          { opacity: 0, y: -24, pointerEvents: 'none', duration: 0.35 },
          0.80
        );
      }
      // Block 1 enters (overlaps by 0.15s at 0.95)
      if (stageBlockRefs.current[1]) {
        const lines1 = stageBlockRefs.current[1].querySelectorAll('.split-line');
        const u1 = stageBlockRefs.current[1].querySelector('.stage-underline');
        masterTimeline.to(
          stageBlockRefs.current[1],
          { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.35 },
          0.95
        );
        if (lines1.length) {
          masterTimeline.to(lines1, { yPercent: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out' }, 0.98);
        }
        if (u1) {
          masterTimeline.to(u1, { scaleX: 1, duration: 0.35, ease: 'power2.out' }, 1.10);
        }
      }

      // Progress indicator 0 -> 1
      if (progressBarRefs.current[0]) {
        masterTimeline.to(progressBarRefs.current[0], { height: 24, backgroundColor: '#E5EAF5', duration: 0.3 }, 0.85);
      }
      if (progressBarRefs.current[1]) {
        masterTimeline.to(progressBarRefs.current[1], { height: 36, backgroundColor: '#3D5AFE', duration: 0.3 }, 0.85);
      }
      if (progressTextRefs.current[0]) {
        masterTimeline.to(progressTextRefs.current[0], { color: '#94A3B8', fontWeight: '400', duration: 0.3 }, 0.85);
      }
      if (progressTextRefs.current[1]) {
        masterTimeline.to(progressTextRefs.current[1], { color: '#3D5AFE', fontWeight: '600', duration: 0.3 }, 0.85);
      }

      // Phone turns 120deg on Y and settles front-facing
      masterTimeline.to(
        storyTimelineState,
        {
          rotY: 120 * (Math.PI / 180),
          duration: 0.25,
          ease: 'power2.in',
        },
        0.80
      );
      masterTimeline.to(
        storyTimelineState,
        {
          rotY: 0,
          duration: 0.30,
          ease: 'power2.out',
        },
        1.05
      );

      // Screen 0 -> Screen 1 cross-fade
      masterTimeline.to(storyTimelineState, { screen0: 0.0, screen1: 1.0, duration: 0.35 }, 0.90);

      // Cards 1 slide in
      if (cardGroupRefs.current[1]) {
        const left1 = cardGroupRefs.current[1].querySelectorAll('.card-left');
        const right1 = cardGroupRefs.current[1].querySelectorAll('.card-right');
        masterTimeline.to(cardGroupRefs.current[1], { opacity: 1, duration: 0.1 }, 1.05);
        masterTimeline.fromTo(left1, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }, 1.05);
        masterTimeline.fromTo(right1, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }, 1.05);
      }

      // Cards 1 retract before Stage 3
      if (cardGroupRefs.current[1]) {
        masterTimeline.to(
          cardGroupRefs.current[1],
          { opacity: 0, x: -20, duration: 0.3, ease: 'power2.in' },
          1.75
        );
      }

      // ---- TRANSITION 2 -> 3 (1.80 -> 2.30) ----
      // Block 1 exits
      if (stageBlockRefs.current[1]) {
        const u1 = stageBlockRefs.current[1].querySelector('.stage-underline');
        if (u1) masterTimeline.to(u1, { scaleX: 0, duration: 0.25 }, 1.80);
        masterTimeline.to(
          stageBlockRefs.current[1],
          { opacity: 0, y: -24, pointerEvents: 'none', duration: 0.35 },
          1.80
        );
      }
      // Block 2 enters
      if (stageBlockRefs.current[2]) {
        const lines2 = stageBlockRefs.current[2].querySelectorAll('.split-line');
        const u2 = stageBlockRefs.current[2].querySelector('.stage-underline');
        masterTimeline.to(
          stageBlockRefs.current[2],
          { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.35 },
          1.95
        );
        if (lines2.length) {
          masterTimeline.to(lines2, { yPercent: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out' }, 1.98);
        }
        if (u2) {
          masterTimeline.to(u2, { scaleX: 1, duration: 0.35, ease: 'power2.out' }, 2.10);
        }
      }

      // Progress indicator 1 -> 2
      if (progressBarRefs.current[1]) {
        masterTimeline.to(progressBarRefs.current[1], { height: 24, backgroundColor: '#E5EAF5', duration: 0.3 }, 1.85);
      }
      if (progressBarRefs.current[2]) {
        masterTimeline.to(progressBarRefs.current[2], { height: 36, backgroundColor: '#3D5AFE', duration: 0.3 }, 1.85);
      }
      if (progressTextRefs.current[1]) {
        masterTimeline.to(progressTextRefs.current[1], { color: '#94A3B8', fontWeight: '400', duration: 0.3 }, 1.85);
      }
      if (progressTextRefs.current[2]) {
        masterTimeline.to(progressTextRefs.current[2], { color: '#3D5AFE', fontWeight: '600', duration: 0.3 }, 1.85);
      }

      // Phone tilts (rotX -10deg, scale 1.1, z 0.25)
      masterTimeline.to(
        storyTimelineState,
        {
          rotX: -10 * (Math.PI / 180),
          scale: 1.10,
          z: 0.25,
          duration: 0.45,
          ease: 'power2.out',
        },
        1.85
      );

      // Screen 1 -> Screen 2 cross-fade
      masterTimeline.to(storyTimelineState, { screen1: 0.0, screen2: 1.0, duration: 0.35 }, 1.90);

      // Cards 2 slide in
      if (cardGroupRefs.current[2]) {
        const left2 = cardGroupRefs.current[2].querySelectorAll('.card-left');
        const right2 = cardGroupRefs.current[2].querySelectorAll('.card-right');
        masterTimeline.to(cardGroupRefs.current[2], { opacity: 1, duration: 0.1 }, 2.05);
        masterTimeline.fromTo(left2, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }, 2.05);
        masterTimeline.fromTo(right2, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }, 2.05);
      }

      // Cards 2 retract before Stage 4
      if (cardGroupRefs.current[2]) {
        masterTimeline.to(
          cardGroupRefs.current[2],
          { opacity: 0, x: -20, duration: 0.3, ease: 'power2.in' },
          2.75
        );
      }

      // ---- TRANSITION 3 -> 4 (2.80 -> 3.30) ----
      // Block 2 exits
      if (stageBlockRefs.current[2]) {
        const u2 = stageBlockRefs.current[2].querySelector('.stage-underline');
        if (u2) masterTimeline.to(u2, { scaleX: 0, duration: 0.25 }, 2.80);
        masterTimeline.to(
          stageBlockRefs.current[2],
          { opacity: 0, y: -24, pointerEvents: 'none', duration: 0.35 },
          2.80
        );
      }
      // Block 3 enters
      if (stageBlockRefs.current[3]) {
        const lines3 = stageBlockRefs.current[3].querySelectorAll('.split-line');
        const u3 = stageBlockRefs.current[3].querySelector('.stage-underline');
        masterTimeline.to(
          stageBlockRefs.current[3],
          { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.35 },
          2.95
        );
        if (lines3.length) {
          masterTimeline.to(lines3, { yPercent: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out' }, 2.98);
        }
        if (u3) {
          masterTimeline.to(u3, { scaleX: 1, duration: 0.35, ease: 'power2.out' }, 3.10);
        }
      }

      // Progress indicator 2 -> 3
      if (progressBarRefs.current[2]) {
        masterTimeline.to(progressBarRefs.current[2], { height: 24, backgroundColor: '#E5EAF5', duration: 0.3 }, 2.85);
      }
      if (progressBarRefs.current[3]) {
        masterTimeline.to(progressBarRefs.current[3], { height: 36, backgroundColor: '#3D5AFE', duration: 0.3 }, 2.85);
      }
      if (progressTextRefs.current[2]) {
        masterTimeline.to(progressTextRefs.current[2], { color: '#94A3B8', fontWeight: '400', duration: 0.3 }, 2.85);
      }
      if (progressTextRefs.current[3]) {
        masterTimeline.to(progressTextRefs.current[3], { color: '#3D5AFE', fontWeight: '600', duration: 0.3 }, 2.85);
      }

      // Phone straightens, shifts slightly left, scale 0.98
      masterTimeline.to(
        storyTimelineState,
        {
          rotX: 0,
          rotY: 0,
          scale: 0.98,
          z: 0,
          x: -0.08,
          duration: 0.45,
          ease: 'power2.out',
        },
        2.85
      );

      // Screen 2 -> Screen 3 cross-fade
      masterTimeline.to(storyTimelineState, { screen2: 0.0, screen3: 1.0, duration: 0.35 }, 2.90);

      // Cards 3 slide in
      if (cardGroupRefs.current[3]) {
        const left3 = cardGroupRefs.current[3].querySelectorAll('.card-left');
        const right3 = cardGroupRefs.current[3].querySelectorAll('.card-right');
        masterTimeline.to(cardGroupRefs.current[3], { opacity: 1, duration: 0.1 }, 3.05);
        masterTimeline.fromTo(left3, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }, 3.05);
        masterTimeline.fromTo(right3, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }, 3.05);
      }

      // ---- STAGE 4 HOLD (3.30 -> 4.20) ----
      // Stage 4 holds pose steadily until pin ends. No fade-out, no jump!
      masterTimeline.to({}, { duration: 0.9 }, 3.30);
    } else {
      // ==============================================================
      // MOBILE (<768px): 3 Stages over duration = 3.2
      // Stages: 0 (Meta Ads), 1 (Creators), 2 (Operations)
      // ==============================================================

      stageBlockRefs.current.forEach((block, idx) => {
        if (!block) return;
        const underline = block.querySelector('.stage-underline');
        const headlineLines = block.querySelectorAll('.split-line');
        if (idx === 0) {
          gsap.set(block, { opacity: 1, y: 0, pointerEvents: 'auto' });
          if (underline) gsap.set(underline, { scaleX: 1 });
          if (headlineLines.length) gsap.set(headlineLines, { yPercent: 0 });
        } else {
          gsap.set(block, { opacity: 0, y: 20, pointerEvents: 'none' });
          if (underline) gsap.set(underline, { scaleX: 0 });
          if (headlineLines.length) gsap.set(headlineLines, { yPercent: 100 });
        }
      });

      // Mobile STAGE 1 (0 -> 1.0)
      masterTimeline.to(storyTimelineState, { rotX: 0, rotY: 0, duration: 0.7, ease: 'power2.out' }, 0.05);

      // Mobile TRANSITION 1 -> 2 (0.80 -> 1.30)
      if (stageBlockRefs.current[0]) {
        const u0 = stageBlockRefs.current[0].querySelector('.stage-underline');
        if (u0) masterTimeline.to(u0, { scaleX: 0, duration: 0.25 }, 0.80);
        masterTimeline.to(stageBlockRefs.current[0], { opacity: 0, y: -20, pointerEvents: 'none', duration: 0.35 }, 0.80);
      }
      if (stageBlockRefs.current[1]) {
        const lines1 = stageBlockRefs.current[1].querySelectorAll('.split-line');
        const u1 = stageBlockRefs.current[1].querySelector('.stage-underline');
        masterTimeline.to(stageBlockRefs.current[1], { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.35 }, 0.95);
        if (lines1.length) masterTimeline.to(lines1, { yPercent: 0, duration: 0.45, stagger: 0.05 }, 0.98);
        if (u1) masterTimeline.to(u1, { scaleX: 1, duration: 0.35 }, 1.10);
      }
      // Gentle phone rotation on mobile (no 360 spin)
      masterTimeline.to(storyTimelineState, { rotY: 20 * (Math.PI / 180), duration: 0.25 }, 0.80);
      masterTimeline.to(storyTimelineState, { rotY: 0, duration: 0.25 }, 1.05);
      masterTimeline.to(storyTimelineState, { screen0: 0.0, screen1: 1.0, duration: 0.35 }, 0.90);

      // Mobile TRANSITION 2 -> 3 (1.80 -> 2.30)
      if (stageBlockRefs.current[1]) {
        const u1 = stageBlockRefs.current[1].querySelector('.stage-underline');
        if (u1) masterTimeline.to(u1, { scaleX: 0, duration: 0.25 }, 1.80);
        masterTimeline.to(stageBlockRefs.current[1], { opacity: 0, y: -20, pointerEvents: 'none', duration: 0.35 }, 1.80);
      }
      if (stageBlockRefs.current[2]) {
        const lines2 = stageBlockRefs.current[2].querySelectorAll('.split-line');
        const u2 = stageBlockRefs.current[2].querySelector('.stage-underline');
        masterTimeline.to(stageBlockRefs.current[2], { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.35 }, 1.95);
        if (lines2.length) masterTimeline.to(lines2, { yPercent: 0, duration: 0.45, stagger: 0.05 }, 1.98);
        if (u2) masterTimeline.to(u2, { scaleX: 1, duration: 0.35 }, 2.10);
      }
      masterTimeline.to(storyTimelineState, { rotX: 0, rotY: 0, duration: 0.35 }, 1.85);
      masterTimeline.to(storyTimelineState, { screen1: 0.0, screen3: 1.0, duration: 0.35 }, 1.90);

      // Mobile STAGE 3 HOLD (2.30 -> 3.20)
      masterTimeline.to({}, { duration: 0.9 }, 2.30);
    }

    // Single ScrollTrigger pinning the entire stage (text + phone + cards)
    const trigger = ScrollTrigger.create({
      trigger: section,
      pin: pinnedStage,
      pinSpacing: true,
      start: 'top top',
      end: isMob ? '+=300%' : '+=450%',
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      animation: masterTimeline,
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      trigger.kill();
      masterTimeline.kill();
      splitInstances.forEach((s) => s.revert());
    };
  }, [reducedMotion, isMobile]);

  // Jump to specific stage on progress bar click
  const jumpToStage = (stageIdx: number) => {
    if (!storySectionRef.current) return;
    const isMob = window.innerWidth < 768;
    const pinDistance = isMob ? window.innerHeight * 3 : window.innerHeight * 4.5;
    const progressTargets = isMob ? [0.05, 0.45, 0.85] : [0.06, 0.32, 0.58, 0.85];
    const targetProgress = progressTargets[stageIdx] ?? 0;
    const targetY = storySectionRef.current.offsetTop + targetProgress * pinDistance;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  // PREFERS-REDUCED-MOTION: Render clean stacked dark sections
  if (reducedMotion) {
    return (
      <section id="services" className="py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 space-y-16">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className="p-8 bg-white border border-[#E5EAF5] rounded-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xs"
            >
              <div className="lg:col-span-7">
                <span className="text-[12px] uppercase font-mono tracking-[0.08em] font-semibold text-[#3D5AFE] block mb-2">
                  {stage.label}
                </span>
                <h2 className="font-sans text-[36px] font-bold text-[#111827] mb-4">
                  {stage.headlinePrefix}
                  <span className="text-[#3D5AFE] underline decoration-[#C6F432] decoration-4">{stage.underlineWord}</span>
                  {stage.headlineSuffix}
                </h2>
                <p className="text-[16px] text-[#64748B] max-w-[60ch] mb-6">{stage.desc}</p>
                <div className="text-[24px] font-price text-[#111827] font-bold mb-4">
                  ₹{stage.priceValue.toLocaleString()} / mo
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {stage.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-[14px] text-[#111827]">
                      <CheckCircle2 className="w-4 h-4 text-[#3D5AFE] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 flex justify-center">
                <img
                  src={saanjhCandles}
                  alt="Service Creative Preview"
                  className="w-full max-w-[340px] h-[340px] object-cover rounded-2xl border border-[#E5EAF5] shadow-md"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={storySectionRef} className="relative w-full bg-[#F3F6FF]">
      {/* Anchor Targets for Navbar Links */}
      <div id="services" className="absolute top-0 w-full h-[100px] pointer-events-none scroll-mt-20" />
      <div id="work" className="absolute top-[26%] w-full h-[100px] pointer-events-none scroll-mt-20" />
      <div id="process" className="absolute top-[72%] w-full h-[100px] pointer-events-none scroll-mt-20" />

      {/* Pinned 100vh Stage Window (Text Column + Phone Canvas + Floating Cards pinned together) */}
      <div
        ref={pinnedStageRef}
        className="w-full h-screen overflow-hidden flex items-center relative z-20 bg-gradient-to-b from-white via-[#F3F6FF] to-white"
      >
        <div className="max-w-[1340px] w-full mx-auto px-6 sm:px-8 lg:px-12 h-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 relative">
          
          {/* Left-edge progress: 4 segments (01 to 04), animated via master timeline */}
          <div className="hidden lg:flex flex-col items-center gap-3 absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
            {stages.map((stage, idx) => (
              <button
                key={`seg-${stage.id}`}
                type="button"
                onClick={() => jumpToStage(idx)}
                className="group flex items-center gap-3 py-1.5 cursor-pointer focus:outline-none"
                aria-label={`Jump to stage ${stage.label}`}
              >
                <div
                  ref={(el) => {
                    progressBarRefs.current[idx] = el;
                  }}
                  className="w-[2.5px] rounded-full transition-all duration-200"
                  style={{
                    height: idx === 0 ? '36px' : '24px',
                    backgroundColor: idx === 0 ? '#3D5AFE' : '#E5EAF5',
                  }}
                />
                <span
                  ref={(el) => {
                    progressTextRefs.current[idx] = el;
                  }}
                  className="font-mono text-[11px] tracking-[0.08em] transition-colors duration-200"
                  style={{
                    color: idx === 0 ? '#3D5AFE' : '#94A3B8',
                    fontWeight: idx === 0 ? '600' : '400',
                  }}
                >
                  {stage.num}
                </span>
              </button>
            ))}
          </div>

          {/* Left Text Column: 46% width on desktop, strictly fixed in position while stages change */}
          <div
            className={`w-full lg:w-[46%] lg:pl-10 xl:pl-12 relative z-20 pointer-events-auto flex items-center ${
              isMobile
                ? 'order-2 h-[45vh] bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-[#E5EAF5] mt-2 overflow-y-auto shadow-sm'
                : 'h-[520px]'
            }`}
          >
            <div className="relative w-full h-full flex items-center">
              {visibleStages.map((stage, idx) => {
                const isInitial = idx === 0;

                return (
                  <div
                    key={`stage-block-${stage.id}`}
                    ref={(el) => {
                      stageBlockRefs.current[idx] = el;
                    }}
                    className="stage-block absolute inset-0 w-full flex flex-col justify-center select-none"
                    style={{
                      opacity: isInitial ? 1 : 0,
                      transform: isInitial ? 'translateY(0)' : 'translateY(24px)',
                      pointerEvents: isInitial ? 'auto' : 'none',
                    }}
                  >
                    {/* Top: 24px electric blue horizontal line + label + badge */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="stage-label-line inline-block w-6 h-[2px] bg-[#3D5AFE] origin-left rounded-full" />
                      <span className="stage-label-text text-[12px] uppercase font-mono tracking-[0.1em] font-bold text-[#3D5AFE]">
                        {stage.label}
                      </span>
                      <span className="text-[#64748B]/40">•</span>
                      <span className="text-[11px] uppercase tracking-[0.08em] text-[#64748B] font-semibold">
                        {stage.badge}
                      </span>
                    </div>

                    {/* Headline: Modern bold sans-serif with lime green underline highlight */}
                    <h2 className="stage-headline font-sans text-[32px] sm:text-[40px] lg:text-[44px] xl:text-[46px] font-bold text-[#111827] leading-[1.08] tracking-[-0.03em] mb-4">
                      {stage.headlinePrefix}
                      <span className="relative inline-block whitespace-nowrap">
                        {stage.underlineWord}
                        <span className="stage-underline absolute bottom-0 left-0 w-full h-[3px] bg-[#C6F432] origin-left scale-x-0 rounded-full" />
                      </span>
                      {stage.headlineSuffix}
                    </h2>

                    {/* Description: 16px text-[#64748B], max-w-[46ch], 1.6 line-height */}
                    <p className="stage-desc text-[15px] sm:text-[16px] leading-[1.65] text-[#64748B] max-w-[46ch] mb-5 font-normal">
                      {stage.desc}
                    </p>

                    {/* Divider: 1px border-[#E5EAF5] */}
                    <div className="w-full h-px bg-[#E5EAF5] mb-5" />

                    {/* 2x2 Feature list: wraps to 2 lines cleanly, no truncate, no nowrap, gap 16px */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                      {stage.points.map((pt, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#3D5AFE] shrink-0 mt-0.5" />
                          <span className="text-[14px] sm:text-[15px] leading-[1.4] text-[#111827] font-medium break-words">
                            {pt}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Divider: 1px border-[#E5EAF5] */}
                    <div className="w-full h-px bg-[#E5EAF5] mb-5" />

                    {/* Price row: font-price bold + "Select service" link aligned right */}
                    <div className="flex items-center justify-between gap-4 pt-1">
                      <div>
                        <div className="font-price text-[22px] sm:text-[24px] font-bold text-[#111827] flex items-baseline">
                          <span>₹{stage.priceValue.toLocaleString()}</span>
                          <span className="text-[#64748B] text-[14px] font-normal ml-1.5 font-sans">
                            / mo
                          </span>
                        </div>
                        <span className="text-[12px] text-[#64748B] block mt-0.5">{stage.priceNote}</span>
                      </div>

                      {/* Small text link "Select service" with arrow that slides 4px on hover */}
                      <button
                        type="button"
                        onClick={() => {
                          const el = document.getElementById('pricing');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                          if (onSelectService) {
                            onSelectService(stage.id);
                          }
                        }}
                        className="group/cta inline-flex items-center gap-2 text-[14px] font-semibold text-[#111827] hover:text-[#3D5AFE] transition-colors cursor-pointer py-2 self-center shrink-0"
                      >
                        <span>Select service</span>
                        <ArrowRight className="w-4 h-4 text-[#3D5AFE] transition-transform duration-200 ease-out group-hover/cta:translate-x-1" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: 54% width, houses 3D Phone Canvas & Floating HTML Cards */}
          <div
            className={`w-full lg:w-[54%] relative flex items-center justify-center overflow-hidden ${
              isMobile ? 'order-1 h-[48vh]' : 'h-full'
            }`}
          >
            {/* The 3D Canvas mounted directly inside the right column */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <SharedCanvas />
            </div>

            {/* Floating Glass Cards: Live ONLY inside right column, never touch left column (>=24px clearance) */}
            <div className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block">
              {stages.map((stage, idx) => (
                <div
                  key={`cards-${stage.id}`}
                  ref={(el) => {
                    cardGroupRefs.current[idx] = el;
                  }}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ opacity: idx === 0 ? 1 : 0 }}
                >
                  {/* Card 1: Top-Left of phone (at least 24px clearance from left column edge) */}
                  <div className="card-left absolute left-6 xl:left-8 top-[16%] xl:top-[18%] bg-white/95 backdrop-blur-md border border-[#E5EAF5] rounded-2xl p-3 sm:p-3.5 shadow-[0_12px_32px_rgba(0,0,0,0.06)] min-w-[155px] max-w-[200px]">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-[0.08em] text-[#64748B] font-semibold">
                        {stage.cards[0].label}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3D5AFE]" />
                    </div>
                    <div className="font-sans text-[16px] sm:text-[18px] font-bold text-[#111827] tracking-tight">
                      {stage.cards[0].value}
                    </div>
                    <div className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                      {stage.cards[0].note}
                    </div>
                  </div>

                  {/* Card 2: Bottom-Left of phone (at least 24px clearance from left column edge) */}
                  <div className="card-left absolute left-6 xl:left-8 bottom-[18%] xl:bottom-[20%] bg-white/95 backdrop-blur-md border border-[#E5EAF5] rounded-2xl p-3 sm:p-3.5 shadow-[0_12px_32px_rgba(0,0,0,0.06)] min-w-[155px] max-w-[200px]">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-[0.08em] text-[#64748B] font-semibold">
                        {stage.cards[1].label}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3D5AFE]" />
                    </div>
                    <div className="font-sans text-[16px] sm:text-[18px] font-bold text-[#111827] tracking-tight">
                      {stage.cards[1].value}
                    </div>
                    <div className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                      {stage.cards[1].note}
                    </div>
                  </div>

                  {/* Card 3: Right of phone (hidden under 1200px to keep exactly 2 cards on <1200px) */}
                  <div className="card-right hidden xl:flex flex-col absolute right-6 xl:right-8 top-[36%] xl:top-[38%] bg-white/95 backdrop-blur-md border border-[#E5EAF5] rounded-2xl p-3 sm:p-3.5 shadow-[0_12px_32px_rgba(0,0,0,0.06)] min-w-[155px] max-w-[200px]">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-[0.08em] text-[#64748B] font-semibold">
                        {stage.cards[2].label}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3D5AFE]" />
                    </div>
                    <div className="font-sans text-[16px] sm:text-[18px] font-bold text-[#111827] tracking-tight">
                      {stage.cards[2].value}
                    </div>
                    <div className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                      {stage.cards[2].note}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
