import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const SceneProcess: React.FC<{ position?: [number, number, number] }> = ({
  position = [0, -72, -60],
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Group>(null);

  // 4 Sequential Process Platforms
  const platforms = [
    { id: '01', title: 'Audit', pos: [-4.2, -0.4, 1.6], active: true },
    { id: '02', title: 'Costing', pos: [-1.4, 0.1, 0.5], active: true },
    { id: '03', title: 'SOPs', pos: [1.4, 0.6, -0.6], active: true },
    { id: '04', title: 'Review', pos: [4.2, 1.1, -1.7], active: true },
  ];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (nodesRef.current) {
      nodesRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(t * 1.2 + i * 0.9) * 0.06;
      });
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Ground Guideway Plane */}
      <mesh position={[0, -2.2, 0]}>
        <boxGeometry args={[11.5, 0.08, 6.0]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
      </mesh>
      <lineSegments position={[0, -2.2, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(11.5, 0.08, 6.0)]} />
        <lineBasicMaterial color="#D5E0EC" />
      </lineSegments>

      {/* Thin Light Blue Step Connecting Beam */}
      <line>
        <bufferGeometry
          attach="geometry"
          {...new THREE.BufferGeometry().setFromPoints(
            platforms.map((p) => new THREE.Vector3(p.pos[0], p.pos[1] + 0.15, p.pos[2]))
          )}
        />
        <lineBasicMaterial attach="material" color="#2F7FD1" linewidth={2} />
      </line>

      {/* 4 Platforms */}
      {platforms.map((p, idx) => (
        <group key={`proc-plat-${idx}`} position={p.pos as [number, number, number]}>
          {/* Main platform slab */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.0, 0.14, 1.6]} />
            <meshStandardMaterial
              color="#F7FAFD"
              roughness={0.15}
            />
          </mesh>
          <lineSegments position={[0, 0, 0]}>
            <edgesGeometry args={[new THREE.BoxGeometry(2.0, 0.14, 1.6)]} />
            <lineBasicMaterial color="#0F1B2D" />
          </lineSegments>

          {/* Hairline inner border */}
          <lineSegments position={[0, 0.08, 0]}>
            <edgesGeometry args={[new THREE.PlaneGeometry(1.6, 1.2)]} />
            <lineBasicMaterial color="#D5E0EC" />
          </lineSegments>

          {/* Vertical datum pillar to ground */}
          <line>
            <bufferGeometry
              attach="geometry"
              {...new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, -2.2 - p.pos[1], 0),
              ])}
            />
            <lineBasicMaterial attach="material" color="#D5E0EC" transparent opacity={0.6} />
          </line>
        </group>
      ))}

      {/* Floating Active Node Indicators */}
      <group ref={nodesRef}>
        {platforms.map((p, idx) => (
          <group key={`proc-node-${idx}`} position={[p.pos[0], p.pos[1] + 0.45, p.pos[2]]}>
            <mesh>
              <octahedronGeometry args={[0.14, 0]} />
              <meshStandardMaterial color="#2F7FD1" roughness={0.1} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};

