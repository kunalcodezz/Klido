import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const SceneFinal: React.FC<{ position?: [number, number, number] }> = ({
  position = [0, -108, -90],
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Expansive Foundation Platform */}
      <mesh position={[0, -2.6, 0]}>
        <boxGeometry args={[12.0, 0.1, 7.0]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
      </mesh>
      <lineSegments position={[0, -2.6, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(12.0, 0.1, 7.0)]} />
        <lineBasicMaterial color="#D5E0EC" />
      </lineSegments>

      {/* Distant Monumental Architectural Gateway Structure */}
      <mesh position={[-3.8, 1.2, -2.5]}>
        <boxGeometry args={[0.3, 7.4, 0.4]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
      </mesh>
      <lineSegments position={[-3.8, 1.2, -2.5]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.3, 7.4, 0.4)]} />
        <lineBasicMaterial color="#D5E0EC" />
      </lineSegments>

      <mesh position={[3.8, 1.2, -2.5]}>
        <boxGeometry args={[0.3, 7.4, 0.4]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
      </mesh>
      <lineSegments position={[3.8, 1.2, -2.5]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.3, 7.4, 0.4)]} />
        <lineBasicMaterial color="#D5E0EC" />
      </lineSegments>

      {/* Top Lintel Beam */}
      <mesh position={[0, 4.8, -2.5]}>
        <boxGeometry args={[8.0, 0.3, 0.4]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
      </mesh>
      <lineSegments position={[0, 4.8, -2.5]}>
        <edgesGeometry args={[new THREE.BoxGeometry(8.0, 0.3, 0.4)]} />
        <lineBasicMaterial color="#0F1B2D" />
      </lineSegments>

      {/* Floating Quiet Datum Line */}
      <line>
        <bufferGeometry
          attach="geometry"
          {...new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-4.5, 0.2, -1.0),
            new THREE.Vector3(4.5, 0.2, -1.0),
          ])}
        />
        <lineBasicMaterial attach="material" color="#2F7FD1" transparent opacity={0.7} />
      </line>

      {/* Calm Settled Central Octahedron Node */}
      <mesh ref={coreRef} position={[0, 0.8, -1.0]}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color="#2F7FD1" roughness={0.2} metalness={0.1} />
      </mesh>
    </group>
  );
};

