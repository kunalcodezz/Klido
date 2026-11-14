import { useEffect, useRef } from 'react';

// Simplified continent landmass coordinates [lat, lon] in degrees
const CONTINENT_POINTS: [number, number][] = [
  // North America
  [55, -120], [50, -100], [45, -90], [40, -105], [35, -118], [30, -100], [25, -90],
  [45, -75], [40, -75], [32, -82], [58, -135], [65, -150], [60, -110], [52, -80],
  [48, -122], [37, -122], [34, -118], [28, -97], [29, -82], [42, -71], [44, -63],
  // South America
  [10, -75], [5, -70], [0, -60], [-5, -50], [-10, -40], [-15, -45], [-22, -43],
  [-23, -46], [-30, -50], [-35, -58], [-40, -65], [-50, -70], [-15, -75], [-5, -80],
  [5, -77], [-12, -77], [-25, -70], [-33, -71],
  // Europe
  [55, -3], [52, 0], [48, 2], [40, -4], [37, -6], [38, 24], [41, 12], [45, 9],
  [52, 13], [52, 21], [60, 11], [60, 25], [65, 14], [60, 30], [56, 37], [50, 30],
  // Africa
  [35, -5], [30, 31], [25, 33], [15, 39], [10, 45], [0, 42], [-5, 39], [-15, 35],
  [-25, 31], [-34, 18], [-33, 26], [-20, 15], [-10, 12], [5, 2], [5, -10], [15, -17],
  [25, -14], [30, -10], [35, 10], [20, 20], [0, 25], [-10, 25],
  // Asia
  [60, 60], [55, 75], [50, 90], [55, 110], [60, 130], [40, 116], [35, 105], [30, 120],
  [22, 114], [10, 106], [15, 100], [22, 90], [28, 85], [13, 80], [19, 73], [25, 70],
  [28, 77], [35, 52], [30, 48], [40, 45], [35, 139], [43, 142], [35, 128],
  // Australia & Oceania
  [-12, 132], [-15, 145], [-25, 150], [-35, 145], [-38, 145], [-32, 116], [-22, 114],
  [-18, 122], [-41, 174], [-37, 175]
];

// Major hub markers [lat, lon, label, isPrimary]
const HUB_MARKERS: [number, number, string, boolean][] = [
  [18.5204, 73.8567, 'Klido HQ (Pune/Mumbai)', true],
  [28.6139, 77.209, 'New Delhi', false],
  [12.9716, 77.5946, 'Bangalore', false],
  [51.5074, -0.1278, 'London', false],
  [40.7128, -74.006, 'New York', false],
  [1.3521, 103.8198, 'Singapore', false],
  [25.2048, 55.2708, 'Dubai', false],
];

export function InteractiveGlobe({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 1.1; // initial angle showing South Asia / Europe
    const tilt = 0.28; // fixed realistic axial tilt (~16 degrees)
    let isDragging = false;
    let lastMouseX = 0;
    let velocity = 0.0035; // auto-spin velocity

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastMouseX = e.clientX;
      canvas.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - lastMouseX;
      lastMouseX = e.clientX;
      velocity = deltaX * 0.005;
      rotation += velocity;
    };

    const handlePointerUp = (e: PointerEvent) => {
      isDragging = false;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        // ignore pointer capture errors if already released
      }
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointercancel', handlePointerUp);

    // Resize handling for Retina displays
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);

    // 3D Spherical Projection Helper
    const project = (latDeg: number, lonDeg: number, radius: number) => {
      const lat = (latDeg * Math.PI) / 180;
      const lon = (lonDeg * Math.PI) / 180 + rotation;

      // Base 3D coordinates on unit sphere
      const x0 = Math.cos(lat) * Math.sin(lon);
      const y0 = Math.sin(lat);
      const z0 = Math.cos(lat) * Math.cos(lon);

      // Rotate around X-axis by tilt
      const x1 = x0;
      const y1 = y0 * Math.cos(tilt) - z0 * Math.sin(tilt);
      const z1 = y0 * Math.sin(tilt) + z0 * Math.cos(tilt);

      return {
        x: x1 * radius,
        y: -y1 * radius, // Invert Y for canvas coordinate system
        z: z1,
        visible: z1 > -0.05,
      };
    };

    let pulseTime = 0;

    const render = () => {
      pulseTime += 0.04;
      if (!isDragging) {
        // Natural friction decay back to baseline auto-rotation
        velocity = velocity * 0.95 + 0.003 * 0.05;
        rotation += velocity;
      }

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const radius = Math.min(width, height) * 0.44;

      // 1. Globe Ambient Shadow & Base Gradient
      const baseGrad = ctx.createRadialGradient(
        cx - radius * 0.25,
        cy - radius * 0.25,
        radius * 0.1,
        cx,
        cy,
        radius
      );
      baseGrad.addColorStop(0, 'rgba(238, 243, 255, 0.45)');
      baseGrad.addColorStop(0.7, 'rgba(244, 247, 255, 0.35)');
      baseGrad.addColorStop(1, 'rgba(215, 228, 255, 0.2)');

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = baseGrad;
      ctx.fill();

      // Outer border circle
      ctx.strokeStyle = 'rgba(36, 87, 255, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 2. Longitude Meridians (every 30 degrees)
      ctx.lineWidth = 1;
      for (let lon = 0; lon < 360; lon += 30) {
        ctx.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 4) {
          const p = project(lat, lon, radius);
          if (p.visible) {
            const screenX = cx + p.x;
            const screenY = cy + p.y;
            if (first) {
              ctx.moveTo(screenX, screenY);
              first = false;
            } else {
              ctx.lineTo(screenX, screenY);
            }
          } else {
            first = true;
          }
        }
        ctx.strokeStyle = 'rgba(36, 87, 255, 0.22)';
        ctx.stroke();
      }

      // 3. Latitude Parallels (every 20 degrees)
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath();
        let first = true;
        for (let lon = 0; lon <= 360; lon += 4) {
          const p = project(lat, lon, radius);
          if (p.visible) {
            const screenX = cx + p.x;
            const screenY = cy + p.y;
            if (first) {
              ctx.moveTo(screenX, screenY);
              first = false;
            } else {
              ctx.lineTo(screenX, screenY);
            }
          } else {
            first = true;
          }
        }
        // Highlight Equator slightly stronger
        ctx.strokeStyle =
          lat === 0 ? 'rgba(36, 87, 255, 0.45)' : 'rgba(36, 87, 255, 0.18)';
        ctx.stroke();
      }

      // 4. Continent Landmass Points
      for (const [lat, lon] of CONTINENT_POINTS) {
        const p = project(lat, lon, radius);
        if (p.visible) {
          const alpha = Math.max(0.2, (p.z + 0.2) / 1.2);
          ctx.beginPath();
          ctx.arc(cx + p.x, cy + p.y, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(36, 87, 255, ${alpha * 0.75})`;
          ctx.fill();

          // Sub-cluster dots for geographic texture
          const pSub1 = project(lat + 2, lon + 3, radius);
          if (pSub1.visible) {
            ctx.beginPath();
            ctx.arc(cx + pSub1.x, cy + pSub1.y, 1.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(36, 87, 255, ${alpha * 0.45})`;
            ctx.fill();
          }
        }
      }

      // 5. Global Hub Markers
      for (const [lat, lon, , isPrimary] of HUB_MARKERS) {
        const p = project(lat, lon, radius);
        if (p.visible) {
          const screenX = cx + p.x;
          const screenY = cy + p.y;

          if (isPrimary) {
            // Pulsing Neon Lime Beacon for Klido HQ
            const pulseRadius = 4 + Math.sin(pulseTime) * 3;
            const pulseAlpha = 0.6 - Math.sin(pulseTime) * 0.3;

            ctx.beginPath();
            ctx.arc(screenX, screenY, pulseRadius + 3, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(214, 255, 0, ${pulseAlpha})`;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Inner solid lime dot
            ctx.beginPath();
            ctx.arc(screenX, screenY, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#D6FF00';
            ctx.fill();
            ctx.strokeStyle = '#0D1126';
            ctx.lineWidth = 1.2;
            ctx.stroke();
          } else {
            // Secondary partner hub dots
            ctx.beginPath();
            ctx.arc(screenX, screenY, 2.8, 0, Math.PI * 2);
            ctx.fillStyle = '#2457FF';
            ctx.fill();
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointercancel', handlePointerUp);
    };
  }, []);

  return (
    <div className={`relative touch-none select-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-grab active:cursor-grabbing"
        title="Interactive 3D Globe · Drag to spin"
      />
    </div>
  );
}
