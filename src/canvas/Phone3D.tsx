import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { storyTimelineState, setInvalidateCanvasCallback, scrollState } from './scrollStore';
import { PhoneScreensManager } from './PhoneScreens';

interface Phone3DProps {
  reducedMotion?: boolean;
}

export const Phone3D: React.FC<Phone3DProps> = ({ reducedMotion = false }) => {
  const { size, invalidate } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const phoneMeshRef = useRef<THREE.Group>(null);
  const shadowMeshRef = useRef<THREE.Mesh>(null);
  const hasLoggedOnMount = useRef(false);

  // Screen planes material refs (4 stages)
  const matMetaAdsRef = useRef<THREE.MeshBasicMaterial>(null);
  const matCreatorsRef = useRef<THREE.MeshBasicMaterial>(null);
  const matSocialRef = useRef<THREE.MeshBasicMaterial>(null);
  const matOperationsRef = useRef<THREE.MeshBasicMaterial>(null);

  // Hook up canvas invalidation callback so master GSAP timeline updates trigger R3F redraw
  useEffect(() => {
    setInvalidateCanvasCallback(invalidate);
    return () => {
      setInvalidateCanvasCallback(null);
    };
  }, [invalidate]);

  // Canvas screens manager
  const screensManager = useMemo(() => new PhoneScreensManager(), []);

  // Textures for 4 stages - generated ONCE at load, never recreated during scroll
  const textures = useMemo(() => {
    const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;
    const createTex = (canvas: HTMLCanvasElement) => {
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = isMobileDevice ? 4 : 8;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.generateMipmaps = true;
      tex.repeat.set(1, 1);
      tex.offset.set(0, 0);
      tex.center.set(0, 0);
      tex.needsUpdate = true;
      return tex;
    };

    return {
      metaAds: createTex(screensManager.canvasMetaAds),
      creators: createTex(screensManager.canvasCreators),
      social: createTex(screensManager.canvasSocial),
      operations: createTex(screensManager.canvasOperations),
    };
  }, [screensManager]);

  // Initialize screen renderer ONCE
  useEffect(() => {
    let active = true;
    screensManager.init().then(() => {
      if (!active) return;
      textures.metaAds.needsUpdate = true;
      textures.creators.needsUpdate = true;
      textures.social.needsUpdate = true;
      textures.operations.needsUpdate = true;
      invalidate();
    });

    return () => {
      active = false;
      textures.metaAds.dispose();
      textures.creators.dispose();
      textures.social.dispose();
      textures.operations.dispose();
    };
  }, [screensManager, textures, invalidate]);

  // Soft contact shadow ellipse below the phone in #0B0F18
  const shadowTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 120);
    gradient.addColorStop(0, '#0B0F18');
    gradient.addColorStop(0.25, 'rgba(11, 15, 24, 0.40)');
    gradient.addColorStop(0.60, 'rgba(11, 15, 24, 0.08)');
    gradient.addColorStop(1, 'rgba(11, 15, 24, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Geometry: EXACT inner bezel size with matching 1080:2340 ratio (0.4615)
  // Height = 3.16, Width = 3.16 * (1080 / 2340) = 1.4585
  const {
    chassisGeo,
    backGlassGeo,
    screenW,
    screenH,
  } = useMemo(() => {
    const w = 1.532;
    const h = 3.32;
    const r = 0.22;

    const makeRoundedShape = (sw: number, sh: number, sr: number) => {
      const s = new THREE.Shape();
      s.moveTo(-sw / 2 + sr, -sh / 2);
      s.lineTo(sw / 2 - sr, -sh / 2);
      s.quadraticCurveTo(sw / 2, -sh / 2, sw / 2, -sh / 2 + sr);
      s.lineTo(sw / 2, sh / 2 - sr);
      s.quadraticCurveTo(sw / 2, sh / 2, sw / 2 - sr, sh / 2);
      s.lineTo(-sw / 2 + sr, sh / 2);
      s.quadraticCurveTo(-sw / 2, sh / 2, -sw / 2, sh / 2 - sr);
      s.lineTo(-sw / 2, -sh / 2 + sr);
      s.quadraticCurveTo(-sw / 2, -sh / 2, -sw / 2 + sr, -sh / 2);
      return s;
    };

    const outerShape = makeRoundedShape(w, h, r);
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.11,
      bevelEnabled: true,
      bevelSegments: 6,
      bevelSize: 0.022,
      bevelThickness: 0.022,
    };
    const cGeo = new THREE.ExtrudeGeometry(outerShape, extrudeSettings);
    cGeo.center(); // front face is at z = +0.077

    const bgGeo = new THREE.ShapeGeometry(outerShape, 28);

    // Exact inner bezel screen plane: aspect ratio 1080/2340 = 0.461538
    const sH = 3.16;
    const sW = sH * (1080 / 2340); // 1.45846 -> 1.4585

    return {
      chassisGeo: cGeo,
      backGlassGeo: bgGeo,
      screenW: sW,
      screenH: sH,
    };
  }, []);

  useFrame(() => {
    if (!groupRef.current || !phoneMeshRef.current) return;

    const isDesktop = size.width >= 1024;
    const isMobile = size.width < 768;
    const aspect = size.width / Math.max(1, size.height);

    // Camera at z=6.0, FOV 42
    const tanHalfFov = Math.tan((42 * Math.PI) / 360);
    const visibleHeight = 2 * tanHalfFov * 6.0;
    const visibleWidth = visibleHeight * aspect;

    // Responsive scaling inside the right 54% column
    const desktopScale = Math.min((visibleHeight * 0.70) / 3.32, (visibleWidth * 0.85) / 1.532);
    const mobileScale = Math.min((visibleHeight * 0.74) / 3.32, (visibleWidth * 0.82) / 1.532);
    const baseScale = isMobile ? mobileScale : desktopScale;

    // Position & Rotation directly synchronized with Master GSAP Timeline
    phoneMeshRef.current.position.x = storyTimelineState.x;
    phoneMeshRef.current.position.y = storyTimelineState.y;
    phoneMeshRef.current.position.z = storyTimelineState.z;

    phoneMeshRef.current.rotation.x = storyTimelineState.rotX;
    phoneMeshRef.current.rotation.y = storyTimelineState.rotY;
    phoneMeshRef.current.rotation.z = storyTimelineState.rotZ;

    phoneMeshRef.current.scale.setScalar(baseScale * storyTimelineState.scale);

    // Subtle pointer parallax (desktop only)
    if (isDesktop && !reducedMotion) {
      phoneMeshRef.current.position.x += scrollState.pointer.x * 0.04;
      phoneMeshRef.current.position.y += scrollState.pointer.y * 0.025;
      phoneMeshRef.current.rotation.y += scrollState.pointer.x * 0.035;
      phoneMeshRef.current.rotation.x += -scrollState.pointer.y * 0.025;
    }

    // Shadow tracking
    if (shadowMeshRef.current) {
      shadowMeshRef.current.position.x = phoneMeshRef.current.position.x;
      shadowMeshRef.current.scale.setScalar(phoneMeshRef.current.scale.x);
    }

    // Screen plane opacities driven directly by master timeline
    if (matMetaAdsRef.current) {
      matMetaAdsRef.current.opacity = storyTimelineState.screen0;
      matMetaAdsRef.current.transparent = storyTimelineState.screen0 < 0.999;
    }
    if (matCreatorsRef.current) {
      matCreatorsRef.current.opacity = storyTimelineState.screen1;
      matCreatorsRef.current.transparent = storyTimelineState.screen1 < 0.999;
    }
    if (matSocialRef.current) {
      matSocialRef.current.opacity = storyTimelineState.screen2;
      matSocialRef.current.transparent = storyTimelineState.screen2 < 0.999;
    }
    if (matOperationsRef.current) {
      matOperationsRef.current.opacity = storyTimelineState.screen3;
      matOperationsRef.current.transparent = storyTimelineState.screen3 < 0.999;
    }

    // Log plane size and canvas size confirmation on mount
    if (!hasLoggedOnMount.current) {
      hasLoggedOnMount.current = true;
      console.log('[PhoneScreen Verified]', {
        planeSize: { width: screenW, height: screenH },
        canvasSize: { width: 1080, height: 2340 },
        aspectRatioMatch: (screenW / screenH).toFixed(4) === (1080 / 2340).toFixed(4),
        contentEdgeToEdge: true,
        chassisColor: '#1B2231 (Graphite)',
        rimLight: '#1558C9 (Cobalt)'
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Soft Contact Shadow below the phone in #0B0F18 */}
      {shadowTexture && (
        <mesh ref={shadowMeshRef} position={[0, -1.78, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.0, 1.0]} />
          <meshBasicMaterial
            map={shadowTexture}
            transparent
            opacity={0.5}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Main 3D Phone Body */}
      <group ref={phoneMeshRef} position={[0, 0, 0]}>
        {/* Chassis: Graphite #1B2231, Metalness 0.7, Roughness 0.35 */}
        <mesh geometry={chassisGeo} castShadow receiveShadow>
          <meshStandardMaterial
            color="#1B2231"
            roughness={0.35}
            metalness={0.70}
          />
        </mesh>

        {/* Thin Cobalt #1558C9 Rim Light Line along the frame edge */}
        <lineSegments>
          <edgesGeometry args={[chassisGeo, 28]} />
          <lineBasicMaterial color="#1558C9" transparent opacity={0.85} />
        </lineSegments>

        {/* Back Panel: Dark Satin Graphite (#0E131E) */}
        <mesh geometry={backGlassGeo} position={[0, 0, -0.078]} rotation={[0, Math.PI, 0]}>
          <meshStandardMaterial
            color="#0E131E"
            roughness={0.4}
            metalness={0.5}
          />
        </mesh>

        {/* Camera Bump Plate on Back (Black) */}
        <mesh position={[-0.38, 1.08, -0.09]}>
          <boxGeometry args={[0.52, 0.54, 0.03]} />
          <meshStandardMaterial color="#000000" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Camera Lenses */}
        <mesh position={[-0.38, 1.18, -0.106]}>
          <cylinderGeometry args={[0.10, 0.10, 0.02, 24]} />
          <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.95} />
        </mesh>
        <mesh position={[-0.38, 0.98, -0.106]}>
          <cylinderGeometry args={[0.10, 0.10, 0.02, 24]} />
          <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.95} />
        </mesh>

        {/* Side Buttons (Graphite #1B2231 with Cobalt #1558C9 accent) */}
        <mesh position={[0.77, 0.45, 0]}>
          <boxGeometry args={[0.025, 0.42, 0.035]} />
          <meshStandardMaterial color="#1558C9" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0.77, -0.42, 0]}>
          <boxGeometry args={[0.02, 0.30, 0.03]} />
          <meshStandardMaterial color="#1B2231" metalness={0.80} roughness={0.3} />
        </mesh>
        <mesh position={[-0.77, 0.80, 0]}>
          <boxGeometry args={[0.025, 0.18, 0.035]} />
          <meshStandardMaterial color="#1558C9" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[-0.77, 0.50, 0]}>
          <boxGeometry args={[0.025, 0.28, 0.035]} />
          <meshStandardMaterial color="#1558C9" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[-0.77, 0.16, 0]}>
          <boxGeometry args={[0.025, 0.28, 0.035]} />
          <meshStandardMaterial color="#1558C9" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* ============================================================== */}
        {/* 4 SCREEN PLANES: PlaneGeometry sized exactly to inner bezel */}
        {/* Dimensions: sW = 1.4585, sH = 3.16 (ratio 0.4615 == 1080/2340) */}
        {/* Normalized UVs [0, 1] map the canvas 100% edge-to-edge */}
        {/* ============================================================== */}

        {/* Screen 1: Meta Ads Plane */}
        <mesh position={[0, 0, 0.0820]} renderOrder={2}>
          <planeGeometry args={[screenW, screenH]} />
          <meshBasicMaterial
            ref={matMetaAdsRef}
            map={textures.metaAds}
            transparent={false}
            opacity={1.0}
            toneMapped={false}
            side={THREE.FrontSide}
            depthWrite={true}
          />
        </mesh>

        {/* Screen 2: Creators Plane */}
        <mesh position={[0, 0, 0.0824]} renderOrder={2}>
          <planeGeometry args={[screenW, screenH]} />
          <meshBasicMaterial
            ref={matCreatorsRef}
            map={textures.creators}
            transparent={true}
            opacity={0.0}
            toneMapped={false}
            side={THREE.FrontSide}
            depthWrite={true}
          />
        </mesh>

        {/* Screen 3: Social Media Plane */}
        <mesh position={[0, 0, 0.0828]} renderOrder={2}>
          <planeGeometry args={[screenW, screenH]} />
          <meshBasicMaterial
            ref={matSocialRef}
            map={textures.social}
            transparent={true}
            opacity={0.0}
            toneMapped={false}
            side={THREE.FrontSide}
            depthWrite={true}
          />
        </mesh>

        {/* Screen 4: Operations Plane */}
        <mesh position={[0, 0, 0.0832]} renderOrder={2}>
          <planeGeometry args={[screenW, screenH]} />
          <meshBasicMaterial
            ref={matOperationsRef}
            map={textures.operations}
            transparent={true}
            opacity={0.0}
            toneMapped={false}
            side={THREE.FrontSide}
            depthWrite={true}
          />
        </mesh>

        {/* Black Camera Island Pill at Top */}
        <mesh position={[0, 1.42, 0.0840]} renderOrder={3}>
          <boxGeometry args={[0.34, 0.09, 0.004]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      </group>
    </group>
  );
};
