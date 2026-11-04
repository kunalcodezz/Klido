import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const SceneOperations: React.FC<{ position?: [number, number, number] }> = ({
  position = [0, -54, -45],
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const midPlatformRef = useRef<THREE.Group>(null);
  const topPlatformRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (midPlatformRef.current) {
      midPlatformRef.current.position.y = 0.5 + Math.sin(t * 0.6) * 0.04;
    }
    if (topPlatformRef.current) {
      topPlatformRef.current.position.y = 1.6 + Math.cos(t * 0.6) * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Level 1: Broad Base Slabs — Unit Economics & SKU Foundations */}
      <mesh position={[0, -2.0, 0]}>
        <boxGeometry args={[6.8, 0.18, 5.0]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.15} />
      </mesh>
      <lineSegments position={[0, -2.0, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(6.8, 0.18, 5.0)]} />
        <lineBasicMaterial color="#0F1B2D" />
      </lineSegments>

      {/* Grid dividing lines on base slab */}
      {[-2, -1, 0, 1, 2].map((x) => (
        <line key={`base-grid-x-${x}`}>
          <bufferGeometry
            attach="geometry"
            {...new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(x * 1.2, -1.9, -2.2),
              new THREE.Vector3(x * 1.2, -1.9, 2.2),
            ])}
          />
          <lineBasicMaterial attach="material" color="#D5E0EC" />
        </line>
      ))}

      {/* Level 2: Precision Intermediate Platform — Standard Operating Procedures (SOPs) */}
      <group ref={midPlatformRef} position={[0, 0.5, 0]}>
        <mesh>
          <boxGeometry args={[4.6, 0.16, 3.4]} />
          <meshStandardMaterial color="#F4F8FC" roughness={0.2} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(4.6, 0.16, 3.4)]} />
          <lineBasicMaterial color="#D5E0EC" />
        </lineSegments>

        {/* 4 Corner Vertical Alignment Rods locking into Base */}
        {[
          [-2.0, -1.2, -1.5],
          [2.0, -1.2, -1.5],
          [-2.0, -1.2, 1.5],
          [2.0, -1.2, 1.5],
        ].map((rodPos, idx) => (
          <line key={`rod-${idx}`}>
            <bufferGeometry
              attach="geometry"
              {...new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(rodPos[0], 0, rodPos[2]),
                new THREE.Vector3(rodPos[0], -2.4, rodPos[2]),
              ])}
            />
            <lineBasicMaterial attach="material" color="#2F7FD1" transparent opacity={0.65} />
          </line>
        ))}
      </group>

      {/* Level 3: Master P&L Platform with Precision Datum Grid */}
      <group ref={topPlatformRef} position={[0, 1.6, 0]}>
        <mesh>
          <boxGeometry args={[2.8, 0.14, 2.2]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.15} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(2.8, 0.14, 2.2)]} />
          <lineBasicMaterial color="#2F7FD1" />
        </lineSegments>

        {/* Central Metric Node (Representing Protected Net Margin) */}
        <mesh position={[0, 0.35, 0]}>
          <octahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial color="#2F7FD1" roughness={0.1} metalness={0.2} />
        </mesh>
      </group>
    </group>
  );
};

