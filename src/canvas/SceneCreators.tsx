import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const SceneCreators: React.FC<{ position?: [number, number, number] }> = ({
  position = [0, -36, -30],
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const nodeGroupRef = useRef<THREE.Group>(null);

  // 3 Floating vertical creator content panels
  const panels = [
    { pos: [-2.6, 0.8, 1.2], size: [1.3, 2.2, 0.05], rotY: 0.18 },
    { pos: [0, 1.4, -0.4], size: [1.4, 2.4, 0.05], rotY: 0 },
    { pos: [2.6, 0.6, 1.0], size: [1.3, 2.2, 0.05], rotY: -0.18 },
  ];

  // Audience network nodes
  const networkNodes = [
    [-3.8, 2.8, -1.0],
    [-2.2, 3.4, 0.5],
    [-1.2, -0.8, 2.0],
    [1.5, -0.6, 2.2],
    [2.4, 3.2, 0.2],
    [3.6, 2.4, -1.2],
    [0.2, 3.6, -1.5],
  ];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (nodeGroupRef.current) {
      nodeGroupRef.current.position.y = Math.sin(t * 0.7) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Precision architectural foundation plane */}
      <mesh position={[0, -2.4, 0]}>
        <boxGeometry args={[7.2, 0.08, 4.8]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
      </mesh>
      <lineSegments position={[0, -2.4, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(7.2, 0.08, 4.8)]} />
        <lineBasicMaterial color="#D5E0EC" />
      </lineSegments>

      {/* Floating Neutral Content Panels */}
      {panels.map((p, i) => (
        <group key={`creator-panel-${i}`} position={p.pos as [number, number, number]} rotation={[0, p.rotY, 0]}>
          {/* Main Panel Slab */}
          <mesh>
            <boxGeometry args={p.size as [number, number, number]} />
            <meshStandardMaterial
              color="#F7FAFD"
              roughness={0.2}
              metalness={0.05}
            />
          </mesh>
          {/* Outer hairline border */}
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(p.size[0], p.size[1], p.size[2])]} />
            <lineBasicMaterial color="#0F1B2D" />
          </lineSegments>

          {/* Clean Inner Architectural Header Rule */}
          <mesh position={[0, p.size[1] * 0.35, 0.03]}>
            <planeGeometry args={[p.size[0] * 0.75, 0.03]} />
            <meshBasicMaterial color="#2F7FD1" />
          </mesh>

          {/* Internal Content Frame */}
          <mesh position={[0, -0.1, 0.027]}>
            <planeGeometry args={[p.size[0] * 0.8, p.size[1] * 0.65]} />
            <meshStandardMaterial color="#EEF4FA" roughness={0.5} />
          </mesh>
          <lineSegments position={[0, -0.1, 0.027]}>
            <edgesGeometry args={[new THREE.PlaneGeometry(p.size[0] * 0.8, p.size[1] * 0.65)]} />
            <lineBasicMaterial color="#D5E0EC" />
          </lineSegments>
        </group>
      ))}

      {/* Audience Network Nodes & Fine Intersecting Connection Lines */}
      <group ref={nodeGroupRef}>
        {networkNodes.map((pos, idx) => (
          <group key={`net-node-${idx}`} position={pos as [number, number, number]}>
            <mesh>
              <octahedronGeometry args={[0.09, 0]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? '#2F7FD1' : '#0F1B2D'}
                roughness={0.2}
              />
            </mesh>
            {/* Fine line connecting node to closest panel center */}
            <line>
              <bufferGeometry
                attach="geometry"
                {...new THREE.BufferGeometry().setFromPoints([
                  new THREE.Vector3(0, 0, 0),
                  new THREE.Vector3(
                    (idx < 3 ? -2.6 : idx > 4 ? 2.6 : 0) - pos[0],
                    1.0 - pos[1],
                    0 - pos[2]
                  ),
                ])}
              />
              <lineBasicMaterial attach="material" color="#D5E0EC" transparent opacity={0.6} />
            </line>
          </group>
        ))}
      </group>
    </group>
  );
};

