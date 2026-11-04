import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { scrollState } from './scrollStore';

interface CameraRigProps {
  reducedMotion?: boolean;
}

export const CameraRig: React.FC<CameraRigProps> = ({ reducedMotion = false }) => {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // Track raw progress for pull-back intro
  const hasStartedRef = useRef(false);

  useFrame((_, delta) => {
    if (reducedMotion) {
      camera.position.set(0, 0, 6.0);
      camera.lookAt(0, 0, 0);
      return;
    }

    const prog = scrollState.storyProgress || 0;

    // --- CINEMATIC Z LOGIC ---
    // Before first scroll (prog < 0.02): camera at z=6.5 (pulled back for reveal)
    // Eases to z=6.0 as scroll starts (0.02 → 0.10)
    // Stage 3 gentle push-in (45% to 70%): z eases to ~5.55 and back
    let targetZ = 6.0;

    if (prog < 0.02) {
      // Cinematic opening: camera slightly further back
      targetZ = 6.5;
      hasStartedRef.current = false;
    } else if (prog < 0.10) {
      // Ease to normal z as scroll starts
      const p = (prog - 0.02) / 0.08;
      const smoothP = 1 - Math.pow(1 - p, 3); // ease-out cubic
      targetZ = THREE.MathUtils.lerp(6.5, 6.0, smoothP);
      hasStartedRef.current = true;
    } else if (prog >= 0.45 && prog <= 0.70) {
      // Stage 3 Camera Push-in (Social media — zooms in slightly)
      const p = (prog - 0.45) / (0.70 - 0.45);
      const pushFactor = Math.sin(p * Math.PI);
      targetZ = 6.0 - pushFactor * 0.45;
    }

    // Subtle pointer parallax (desktop only)
    const targetX = scrollState.pointer.x * 0.10;
    const targetY = scrollState.pointer.y * 0.08;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.08);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06);

    currentLookAt.current.set(0, 0, 0);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
