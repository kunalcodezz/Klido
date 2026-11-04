import React from 'react';
import { Lighting } from './Lighting';
import { CameraRig } from './CameraRig';
import { Phone3D } from './Phone3D';

interface SceneWorldProps {
  reducedMotion?: boolean;
}

export const SceneWorld: React.FC<SceneWorldProps> = ({ reducedMotion = false }) => {
  return (
    <>
      {/* Studio Lighting with reactive key light */}
      <Lighting />

      {/* Atmospheric Fog matching Midnight Black */}
      <fog attach="fog" args={['#030407', 14, 80]} />

      {/* Camera Rig */}
      <CameraRig reducedMotion={reducedMotion} />

      {/* 3D Phone Model & Cinematic Sequence */}
      <Phone3D reducedMotion={reducedMotion} />
    </>
  );
};
