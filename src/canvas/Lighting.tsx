import React from 'react';

export const Lighting: React.FC = () => {
  return (
    <>
      {/* 1. Ambient Light */}
      <ambientLight color="#ffffff" intensity={0.7} />

      {/* 2. Key Studio Light: Neutral white from Top-Left */}
      <directionalLight
        position={[-6, 9, 7]}
        color="#ffffff"
        intensity={2.5}
      />

      {/* 3. Electric Cobalt (#1558C9) Rim Light from Behind-Right */}
      <directionalLight
        position={[8, 6, -6]}
        color="#1558C9"
        intensity={3.0}
      />

      {/* 4. Faint Cobalt Fill from the Left */}
      <directionalLight
        position={[-8, 0, 4]}
        color="#1558C9"
        intensity={0.8}
      />
    </>
  );
};
