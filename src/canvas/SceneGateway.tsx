import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

export const SceneGateway: React.FC<{ position?: [number, number, number] }> = ({
  position = [0, 0, 0],
}) => {
  const { size } = useThree();

  // Responsive scale: 1.0 on desktop, 0.38 on tablet, 0.30 on mobile
  const scale = useMemo(() => {
    if (size.width < 640) return 0.30;
    if (size.width < 1024) return 0.38;
    return 1.0;
  }, [size.width]);

  // Soft contact shadow texture generated on 2D canvas for realistic grounded depth
  const shadowTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 120);
    gradient.addColorStop(0, 'rgba(15, 27, 45, 0.24)');
    gradient.addColorStop(0.35, 'rgba(15, 27, 45, 0.12)');
    gradient.addColorStop(0.7, 'rgba(15, 27, 45, 0.03)');
    gradient.addColorStop(1, 'rgba(15, 27, 45, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // 8 purposeful, small precise nodes anchored at key geometric junctions
  const nodes: [number, number, number][] = useMemo(() => [
    [-1.9, 3.0, 0.2],   // top left pillar corner
    [1.9, 3.0, 0.2],    // top right pillar corner
    [-1.9, -2.2, 0.2],  // bottom left pillar corner
    [1.9, -2.2, 0.2],   // bottom right pillar corner
    [0, 3.0, 0.2],      // top lintel center
    [-3.2, 3.0, -1.2],  // left connecting line endpoint
    [3.2, 3.0, -1.2],   // right connecting line endpoint
    [0, -2.2, 0.9],     // base threshold center
  ], []);

  // A few thin connecting lines (architectural alignment rays)
  const connectingLines = useMemo(() => [
    // Top left extension
    [new THREE.Vector3(-1.9, 3.0, 0), new THREE.Vector3(-3.2, 3.0, -1.2)],
    // Top right extension
    [new THREE.Vector3(1.9, 3.0, 0), new THREE.Vector3(3.2, 3.0, -1.2)],
    // Bottom left guide
    [new THREE.Vector3(-1.9, -2.2, 0), new THREE.Vector3(-2.8, -2.2, 0.8)],
    // Bottom right guide
    [new THREE.Vector3(1.9, -2.2, 0), new THREE.Vector3(2.8, -2.2, 0.8)],
  ], []);

  return (
    <group position={position} scale={scale}>
      {/* Soft Contact Shadow under the portal */}
      {shadowTexture && (
        <mesh position={[0, -2.27, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[5.6, 3.2]} />
          <meshBasicMaterial
            map={shadowTexture}
            transparent
            opacity={0.8}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* A few thin connecting lines */}
      {connectingLines.map((pts, idx) => (
        <line key={`portal-guide-line-${idx}`}>
          <bufferGeometry
            attach="geometry"
            {...new THREE.BufferGeometry().setFromPoints(pts)}
          />
          <lineBasicMaterial
            attach="material"
            color="#D5E0EC"
            transparent
            opacity={0.65}
          />
        </line>
      ))}

      {/* Main Architectural Portal - Left Pillar (Matte White, Thin Navy Edge) */}
      <mesh position={[-1.9, 0.4, 0]}>
        <boxGeometry args={[0.24, 5.2, 0.35]} />
        <meshStandardMaterial
          color="#FFFFFF"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>
      <lineSegments position={[-1.9, 0.4, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.24, 5.2, 0.35)]} />
        <lineBasicMaterial color="#0F1B2D" />
      </lineSegments>

      {/* Main Architectural Portal - Right Pillar (Matte White, Thin Navy Edge) */}
      <mesh position={[1.9, 0.4, 0]}>
        <boxGeometry args={[0.24, 5.2, 0.35]} />
        <meshStandardMaterial
          color="#FFFFFF"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>
      <lineSegments position={[1.9, 0.4, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.24, 5.2, 0.35)]} />
        <lineBasicMaterial color="#0F1B2D" />
      </lineSegments>

      {/* Top Lintel Beam (Matte White, Thin Navy Edge) */}
      <mesh position={[0, 3.0, 0]}>
        <boxGeometry args={[4.04, 0.24, 0.35]} />
        <meshStandardMaterial
          color="#FFFFFF"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>
      <lineSegments position={[0, 3.0, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(4.04, 0.24, 0.35)]} />
        <lineBasicMaterial color="#0F1B2D" />
      </lineSegments>

      {/* Base Threshold Platform (Pale Blue #EEF4FA, Thin Navy Edge) */}
      <mesh position={[0, -2.2, 0]}>
        <boxGeometry args={[4.4, 0.14, 1.6]} />
        <meshStandardMaterial
          color="#EEF4FA"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>
      <lineSegments position={[0, -2.2, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(4.4, 0.14, 1.6)]} />
        <lineBasicMaterial color="#0F1B2D" />
      </lineSegments>

      {/* Inner Portal Inset Step (Pale Blue #EEF4FA, Thin Navy Edge) */}
      <mesh position={[0, 0.4, -0.12]}>
        <boxGeometry args={[3.56, 4.96, 0.08]} />
        <meshStandardMaterial
          color="#EEF4FA"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>
      <lineSegments position={[0, 0.4, -0.12]}>
        <edgesGeometry args={[new THREE.BoxGeometry(3.56, 4.96, 0.08)]} />
        <lineBasicMaterial color="#0F1B2D" />
      </lineSegments>

      {/* Exactly ONE #2F7FD1 Accent Line (Crisp Inner Edge) */}
      <lineSegments position={[0, 0.4, 0.08]}>
        <edgesGeometry args={[new THREE.BoxGeometry(3.56, 4.96, 0.02)]} />
        <lineBasicMaterial color="#2F7FD1" />
      </lineSegments>

      {/* 8 Small Precise Nodes */}
      {nodes.map((pos, idx) => (
        <mesh key={`portal-node-${idx}`} position={pos}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial
            color="#0F1B2D"
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
};
