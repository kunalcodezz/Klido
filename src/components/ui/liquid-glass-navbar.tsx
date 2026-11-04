import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  Home, 
  Layers, 
  Briefcase, 
  Tag,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface LiquidGlassNavbarProps {
  items?: NavItem[];
  activeId?: string;
  onItemClick?: (id: string, href: string) => void;
  className?: string;
}

export const MINIMALIST_NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home', icon: Home },
  { id: 'services', label: 'Services', href: '#services', icon: Layers },
  { id: 'work', label: 'Work', href: '#work', icon: Briefcase },
  { id: 'pricing', label: 'Pricing', href: '#pricing', icon: Tag },
  { id: 'faq', label: 'FAQ', href: '#faq', icon: HelpCircle },
  { id: 'contact', label: 'Contact', href: '#contact', icon: MessageSquare },
];

/**
 * Refined GLSL Shaders for WebGL Liquid Glass Waterline effect:
 * - Subtle and restrained luxury caustics specifically tuned for Klido's obsidian (#080B16) theme
 * - Damped traveling wave ripple physics on click
 * - Signed Distance Field (SDF) active bubble with spring interpolation
 * - Soft Blinn-Phong specular meniscus rim highlights
 */
const VERTEX_SHADER_SRC = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = (a_position + 1.0) * 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SRC = `
  precision highp float;
  varying vec2 v_uv;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_active_pos;      // UV center of active tab
  uniform vec2 u_active_size;     // UV size of active tab
  uniform vec2 u_ripple_pos;      // UV center of latest ripple click
  uniform float u_ripple_progress; // 0.0 to 1.0 (decay over time)
  uniform float u_motion_allowed; // 1.0 if motion allowed, 0.0 if reduced
  uniform vec2 u_pointer;         // mouse UV

  // Signed distance function for rounded box
  float sdRoundedBox(vec2 p, vec2 b, vec4 r) {
    r.xy = (p.x > 0.0) ? r.xy : r.zw;
    r.x  = (p.y > 0.0) ? r.x  : r.y;
    vec2 q = abs(p) - b + r.x;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r.x;
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 uv = (v_uv - 0.5) * aspect;

    // Outer capsule SDF
    vec2 boxHalf = vec2(0.5 * aspect.x - 0.035, 0.44);
    float dPill = sdRoundedBox(uv, boxHalf, vec4(0.44));

    // Active Indicator Bubble SDF
    vec2 activeCenter = (u_active_pos - 0.5) * aspect;
    vec2 activeHalf = (u_active_size * 0.5) * aspect;
    float dActive = sdRoundedBox(uv - activeCenter, activeHalf, vec4(activeHalf.y * 0.82));

    // Damped Fluid Water Ripple simulation (subtle and restrained)
    float ripple = 0.0;
    if (u_ripple_progress > 0.0 && u_motion_allowed > 0.5) {
      vec2 rPos = (u_ripple_pos - 0.5) * aspect;
      float dRipple = length(uv - rPos);
      float waveRadius = u_ripple_progress * 1.1;
      float waveDist = abs(dRipple - waveRadius);
      float decay = exp(-u_ripple_progress * 3.8) * exp(-dRipple * 3.2);
      ripple = sin(waveDist * 40.0 - u_time * 7.0) * decay * smoothstep(0.16, 0.0, waveDist) * 0.7;
    }

    // Subtle fluid caustics / meniscus shimmer
    float shimmer = 0.0;
    if (u_motion_allowed > 0.5) {
      shimmer = sin(uv.x * 16.0 + u_time * 1.2) * cos(uv.y * 12.0 - u_time * 0.9) * 0.02;
      shimmer += sin(length(uv - activeCenter) * 14.0 - u_time * 1.8) * 0.015;
    }

    // Combined normal estimation
    vec2 eps = vec2(0.005, 0.0);
    vec2 normal = normalize(vec2(
      sdRoundedBox((uv + eps.xy), boxHalf, vec4(0.44)) - sdRoundedBox((uv - eps.xy), boxHalf, vec4(0.44)),
      sdRoundedBox((uv + eps.yx), boxHalf, vec4(0.44)) - sdRoundedBox((uv - eps.yx), boxHalf, vec4(0.44))
    ) + vec2(ripple * 0.35 + shimmer));

    // Refraction & Specular Lighting
    vec3 lightDir = normalize(vec3(0.25, 0.85, 0.55));
    float diff = max(dot(normal, lightDir.xy), 0.0);
    float spec = pow(max(dot(reflect(-lightDir.xy, normal), vec2(0.0, 1.0)), 0.0), 22.0);

    // Rim highlight along capsule edges
    float rim = smoothstep(0.02, -0.01, dPill) * smoothstep(-0.05, 0.0, dPill);
    float activeRim = smoothstep(0.02, -0.01, dActive) * smoothstep(-0.035, 0.0, dActive);

    // Klido Colors: Deep Obsidian (#080B16), Lime Accent (#A6D936), Crisp White (#F5F6F2)
    vec3 baseGlass = vec3(0.045, 0.065, 0.11); // #0B101C
    vec3 limeGlow = vec3(0.65, 0.85, 0.21);   // #A6D936
    vec3 rimColor = vec3(0.96, 0.97, 0.95);   // #F5F6F2

    // Composite Color
    vec3 col = baseGlass;
    
    // Active bubble tint with restrained lime glow
    float activeMask = smoothstep(0.01, -0.01, dActive);
    col = mix(col, vec3(0.075, 0.11, 0.18) + limeGlow * 0.10, activeMask * 0.82);

    // Add restrained specular, rim, and ripple highlights
    col += rimColor * (rim * 0.28 + spec * 0.22);
    col += limeGlow * (activeRim * 0.45 + ripple * 0.45);

    // Alpha mask for rounded capsule boundary
    float alpha = smoothstep(0.015, -0.005, dPill) * 0.86;

    gl_FragColor = vec4(col, alpha);
  }
`;

export const LiquidGlassNavbar: React.FC<LiquidGlassNavbarProps> = ({
  items = MINIMALIST_NAV_ITEMS,
  activeId: externalActiveId,
  onItemClick,
  className = ''
}) => {
  const [internalActiveId, setInternalActiveId] = useState<string>(items[0]?.id || 'home');
  const activeId = externalActiveId !== undefined ? externalActiveId : internalActiveId;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);

  // Animation & Shader Uniforms state
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformsRef = useRef<{ [key: string]: WebGLUniformLocation | null }>({});
  const animationFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(performance.now());
  const rippleStartTimeRef = useRef<number>(0);
  const rippleCoordRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const isVisibleRef = useRef<boolean>(true);

  // Liquid Active Spring Interpolation (for smooth liquid transition)
  const currentActiveBounds = useRef<{ x: number; y: number; w: number; h: number }>({ x: 0.5, y: 0.5, w: 0.22, h: 0.72 });
  const targetActiveBounds = useRef<{ x: number; y: number; w: number; h: number }>({ x: 0.5, y: 0.5, w: 0.22, h: 0.72 });

  // Fallback CSS indicator position state
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  // Update target active bounds based on DOM element rect
  const updateActiveRect = useCallback(() => {
    const activeEl = tabRefs.current.get(activeId);
    const container = containerRef.current;
    if (!activeEl || !container) return;

    const cRect = container.getBoundingClientRect();
    const tRect = activeEl.getBoundingClientRect();

    if (cRect.width === 0 || cRect.height === 0) return;

    const left = tRect.left - cRect.left;
    const width = tRect.width;

    setIndicatorStyle({ left, width });

    const uvX = (left + width * 0.5) / cRect.width;
    const uvY = 0.5;
    const uvW = width / cRect.width;
    const uvH = tRect.height / cRect.height;

    targetActiveBounds.current = { x: uvX, y: uvY, w: uvW, h: uvH };
  }, [activeId]);

  useEffect(() => {
    updateActiveRect();
    const handleResize = () => updateActiveRect();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [updateActiveRect]);

  // WebGL Initialization & Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext('webgl', { 
        alpha: true, 
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch {
      gl = null;
    }

    if (!gl) {
      setWebGlSupported(false);
      return;
    }

    glRef.current = gl;

    // Compile Shaders
    const createShader = (type: number, src: string) => {
      if (!gl) return null;
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);

    if (!vertShader || !fragShader) {
      setWebGlSupported(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setWebGlSupported(false);
      return;
    }

    programRef.current = program;
    gl.useProgram(program);

    // Quad geometry (full-screen quad)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Uniform Locations
    uniformsRef.current = {
      u_resolution: gl.getUniformLocation(program, 'u_resolution'),
      u_time: gl.getUniformLocation(program, 'u_time'),
      u_active_pos: gl.getUniformLocation(program, 'u_active_pos'),
      u_active_size: gl.getUniformLocation(program, 'u_active_size'),
      u_ripple_pos: gl.getUniformLocation(program, 'u_ripple_pos'),
      u_ripple_progress: gl.getUniformLocation(program, 'u_ripple_progress'),
      u_motion_allowed: gl.getUniformLocation(program, 'u_motion_allowed'),
      u_pointer: gl.getUniformLocation(program, 'u_pointer'),
    };

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Visibility Observer
    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState !== 'hidden';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Resize Handler
    const updateCanvasSize = () => {
      if (!canvas || !container || !gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniformsRef.current.u_resolution, canvas.width, canvas.height);
    };

    updateCanvasSize();
    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(container);

    // Render loop
    const render = (time: number) => {
      if (!isVisibleRef.current) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      const elapsed = (time - startTimeRef.current) * 0.001;

      // Smooth liquid active bounds interpolation
      const cur = currentActiveBounds.current;
      const tar = targetActiveBounds.current;
      cur.x += (tar.x - cur.x) * 0.16;
      cur.y += (tar.y - cur.y) * 0.16;
      cur.w += (tar.w - cur.w) * 0.16;
      cur.h += (tar.h - cur.h) * 0.16;

      // Calculate Ripple Progress
      let rippleProgress = 0.0;
      if (rippleStartTimeRef.current > 0) {
        const rippleElapsed = (time - rippleStartTimeRef.current) * 0.001;
        if (rippleElapsed < 1.3) {
          rippleProgress = rippleElapsed / 1.3;
        } else {
          rippleStartTimeRef.current = 0;
        }
      }

      gl.useProgram(program);
      gl.uniform1f(uniformsRef.current.u_time, elapsed);
      gl.uniform2f(uniformsRef.current.u_active_pos, cur.x, cur.y);
      gl.uniform2f(uniformsRef.current.u_active_size, cur.w, cur.h);
      gl.uniform2f(uniformsRef.current.u_ripple_pos, rippleCoordRef.current.x, rippleCoordRef.current.y);
      gl.uniform1f(uniformsRef.current.u_ripple_progress, rippleProgress);
      gl.uniform1f(uniformsRef.current.u_motion_allowed, prefersReducedMotion ? 0.0 : 1.0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      resizeObserver.disconnect();
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
      }
    };
  }, []);

  // Trigger ripple on user click
  const triggerRippleAt = (clientX: number, clientY: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const uvX = (clientX - rect.left) / rect.width;
    const uvY = (clientY - rect.top) / rect.height;
    rippleCoordRef.current = { x: uvX, y: 1.0 - uvY };
    rippleStartTimeRef.current = performance.now();
  };

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault();
    triggerRippleAt(e.clientX, e.clientY);
    setInternalActiveId(item.id);

    if (onItemClick) {
      onItemClick(item.id, item.href);
    } else {
      const target = document.querySelector(item.href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const currentIndex = items.findIndex((item) => item.id === activeId);
    if (currentIndex === -1) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % items.length;
      const nextItem = items[nextIndex];
      setInternalActiveId(nextItem.id);
      tabRefs.current.get(nextItem.id)?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      const prevItem = items[prevIndex];
      setInternalActiveId(prevItem.id);
      tabRefs.current.get(prevItem.id)?.focus();
    }
  };

  return (
    <nav
      ref={containerRef}
      role="tablist"
      aria-label="Main navigation"
      onKeyDown={handleKeyDown}
      className={`relative inline-flex items-center p-1.5 rounded-full bg-[#080B16]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.55)] select-none transition-all ${className}`}
    >
      {/* WebGL Canvas Shaders for Real Waterline & Ripple Dynamics */}
      {webGlSupported && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full rounded-full pointer-events-none z-0"
        />
      )}

      {/* Fallback CSS Liquid Indicator (when WebGL is disabled or during initial layout) */}
      <div
        aria-hidden="true"
        style={{
          transform: `translateX(${indicatorStyle.left}px)`,
          width: `${indicatorStyle.width}px`,
        }}
        className="absolute top-1.5 bottom-1.5 left-0 rounded-full bg-[#141D30]/85 border border-[#A6D936]/30 shadow-[0_0_15px_rgba(166,217,54,0.18)] pointer-events-none transition-all duration-300 ease-out z-[1]"
      />

      {/* Navigation Tabs */}
      <div className="relative z-10 flex items-center gap-1 sm:gap-2">
        {items.map((item) => {
          const isActive = activeId === item.id;
          const Icon = item.icon;

          return (
            <a
              key={item.id}
              ref={(el) => {
                if (el) tabRefs.current.set(item.id, el);
                else tabRefs.current.delete(item.id);
              }}
              href={item.href}
              onClick={(e) => handleTabClick(e, item)}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A6D936] ${
                isActive
                  ? 'text-[#A6D936] font-semibold'
                  : 'text-[#A2A9B7] hover:text-[#F5F6F2]'
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  isActive ? 'scale-110 text-[#A6D936]' : 'group-hover:scale-105'
                }`}
              />
              <span className="inline">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};
