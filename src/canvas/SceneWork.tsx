import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { scrollState } from './scrollStore';

import hashiImg from '../assets/images/hashi_ceramics_home_1793541111377.jpg';
import saanjhImg from '../assets/images/saanjh_luxury_candles_1793541111495.jpg';
import zegoreImg from '../assets/images/zegore_leather_accessories_1793541111684.jpg';
import ugcImg from '../assets/images/creator_ugc_lifestyle_1793541111707.jpg';

interface WorkFrameProps {
  imageSrc: string;
  position: [number, number, number];
  rotationY: number;
  label: string;
  targetId: string;
}

const WorkFrame: React.FC<WorkFrameProps> = ({
  imageSrc,
  position,
  rotationY,
  label,
  targetId,
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      imageSrc,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.generateMipmaps = true;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        setTexture(tex);
      },
      undefined,
      (err) => console.warn('Texture load warning:', err)
    );
  }, [imageSrc]);

  useFrame(() => {
    if (!meshRef.current) return;
    // Max 4 degrees tilt on hover (4 deg = ~0.07 rad)
    const targetRotX = hovered ? (scrollState.pointer.y * 0.07) : 0;
    const targetRotY = rotationY + (hovered ? (scrollState.pointer.x * 0.07) : 0);

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.08);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.08);
  });

  const handleClick = () => {
    const el = document.getElementById(targetId) || document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Outer Matte White Framing Slab */}
      <mesh>
        <boxGeometry args={[2.0, 2.5, 0.08]} />
        <meshStandardMaterial
          color="#FFFFFF"
          roughness={0.2}
        />
      </mesh>

      {/* Frame Hairline Outer Edge */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(2.0, 2.5, 0.08)]} />
        <lineBasicMaterial color={hovered ? '#2F7FD1' : '#0F1B2D'} />
      </lineSegments>

      {/* Project Real Client Image Face */}
      {texture ? (
        <mesh position={[0, 0.1, 0.045]}>
          <planeGeometry args={[1.76, 2.0]} />
          <meshBasicMaterial map={texture} />
        </mesh>
      ) : (
        <mesh position={[0, 0.1, 0.045]}>
          <planeGeometry args={[1.76, 2.0]} />
          <meshStandardMaterial color="#EEF4FA" roughness={0.3} />
        </mesh>
      )}

      {/* Thin Accent Indicator Under Image */}
      <mesh position={[0, -1.02, 0.046]}>
        <planeGeometry args={[1.5, 0.02]} />
        <meshBasicMaterial color={hovered ? '#2F7FD1' : '#D5E0EC'} />
      </mesh>
    </group>
  );
};

export const SceneWork: React.FC<{ position?: [number, number, number] }> = ({
  position = [0, -90, -75],
}) => {
  const groupRef = useRef<THREE.Group>(null);

  const workItems = [
    {
      img: hashiImg,
      pos: [-3.3, 0.4, 1.2] as [number, number, number],
      rotY: 0.18,
      label: 'HASHI',
      targetId: 'work',
    },
    {
      img: saanjhImg,
      pos: [-1.1, 0.8, -0.4] as [number, number, number],
      rotY: 0.06,
      label: 'SAANJH BY RIYA',
      targetId: 'work',
    },
    {
      img: zegoreImg,
      pos: [1.1, 0.5, -0.6] as [number, number, number],
      rotY: -0.06,
      label: 'ZEGORE',
      targetId: 'work',
    },
    {
      img: ugcImg,
      pos: [3.3, 0.2, 1.0] as [number, number, number],
      rotY: -0.18,
      label: 'CREATOR UGC',
      targetId: 'work',
    },
  ];

  return (
    <group ref={groupRef} position={position}>
      {/* Precision Gallery Floor Platform */}
      <mesh position={[0, -2.4, 0]}>
        <boxGeometry args={[9.5, 0.08, 5.5]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
      </mesh>
      <lineSegments position={[0, -2.4, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(9.5, 0.08, 5.5)]} />
        <lineBasicMaterial color="#D5E0EC" />
      </lineSegments>

      {/* Floating Gallery Picture Frames */}
      {workItems.map((item, idx) => (
        <WorkFrame
          key={`work-frame-${idx}`}
          imageSrc={item.img}
          position={item.pos}
          rotationY={item.rotY}
          label={item.label}
          targetId={item.targetId}
        />
      ))}
    </group>
  );
};

