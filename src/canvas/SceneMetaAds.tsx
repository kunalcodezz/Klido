import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const SceneMetaAds: React.FC<{ position?: [number, number, number] }> = ({
  position = [0, -18, -15],
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreNodeRef = useRef<THREE.Mesh>(null);

  // Creative frame positions funneling inward
  const frames = [
    { pos: [-3.2, 2.2, 2.5], size: [1.2, 1.8, 0.04], rot: [0, 0.25, 0] },
    { pos: [3.2, 2.0, 2.2], size: [1.2, 1.8, 0.04], rot: [0, -0.25, 0] },
    { pos: [-1.8, 3.2, -0.5], size: [1.1, 1.6, 0.04], rot: [0.1, 0.15, 0] },
    { pos: [1.8, 3.4, -0.8], size: [1.1, 1.6, 0.04], rot: [0.1, -0.15, 0] },
  ];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreNodeRef.current) {
      coreNodeRef.current.rotation.y = t * 0.4;
      coreNodeRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Lower Precision Foundation Slab */}
      <mesh position={[0, -2.4, 0]}>
        <boxGeometry args={[6.5, 0.1, 4.5]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
      </mesh>
      <lineSegments position={[0, -2.4, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(6.5, 0.1, 4.5)]} />
        <lineBasicMaterial color="#D5E0EC" />
      </lineSegments>

      {/* Structured Ad Creative Frames feeding inward */}
      {frames.map((frame, i) => (
        <group key={`ad-frame-${i}`} position={frame.pos as [number, number, number]} rotation={frame.rot as [number, number, number]}>
          {/* Frosted pale panel */}
          <mesh>
            <boxGeometry args={frame.size as [number, number, number]} />
            <meshStandardMaterial
              color="#F0F5FA"
              roughness={0.2}
              transparent
              opacity={0.85}
            />
          </mesh>
          {/* Clean hairline border */}
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(frame.size[0], frame.size[1], frame.size[2])]} />
            <lineBasicMaterial color="#0F1B2D" />
          </lineSegments>

          {/* Inner hairline border */}
          <lineSegments scale={[0.85, 0.85, 1]}>
            <edgesGeometry args={[new THREE.BoxGeometry(frame.size[0], frame.size[1], frame.size[2])]} />
            <lineBasicMaterial color="#D5E0EC" />
          </lineSegments>

          {/* Funnel line pointing to central node */}
          <line>
            <bufferGeometry
              attach="geometry"
              {...new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(-frame.pos[0] * 0.75, -frame.pos[1] * 0.75, -frame.pos[2] * 0.75),
              ])}
            />
            <lineBasicMaterial attach="material" color="#2F7FD1" transparent opacity={0.6} />
          </line>
        </group>
      ))}

      {/* Central Funnel Core Node */}
      <group position={[0, 0, 0]}>
        {/* Core Accent Diamond */}
        <mesh ref={coreNodeRef}>
          <octahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial color="#2F7FD1" roughness={0.15} metalness={0.2} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.OctahedronGeometry(0.35, 0)]} />
          <lineBasicMaterial color="#FFFFFF" />
        </lineSegments>

        {/* Orbiting concentric hairline rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.75, 0.76, 48]} />
          <meshBasicMaterial color="#2F7FD1" side={THREE.DoubleSide} transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0.4, 0]}>
          <ringGeometry args={[1.2, 1.21, 48]} />
          <meshBasicMaterial color="#D5E0EC" side={THREE.DoubleSide} transparent opacity={0.5} />
        </mesh>
      </group>
    </group>
  );
};

