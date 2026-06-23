import React from 'react';

export const F1CarModel = ({ color = 'red' }: { color?: string }) => {
  return (
    <group>
      {/* Main Chassis - Lower */}
      <mesh castShadow position={[0, 0.2, 0]}>
        <boxGeometry args={[1.2, 0.3, 4]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Main Chassis - Upper/Nose */}
      <mesh castShadow position={[0, 0.45, 0.5]}>
        <boxGeometry args={[0.8, 0.2, 2]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Sidepods */}
      <mesh castShadow position={[0.6, 0.35, -0.2]}>
        <boxGeometry args={[0.4, 0.4, 1.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh castShadow position={[-0.6, 0.35, -0.2]}>
        <boxGeometry args={[0.4, 0.4, 1.5]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Cockpit / Halo */}
      <mesh castShadow position={[0, 0.6, -0.2]}>
        <boxGeometry args={[0.6, 0.3, 0.8]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Front Wing Main */}
      <mesh castShadow position={[0, 0.15, 1.9]}>
        <boxGeometry args={[2.8, 0.05, 0.6]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Front Wing Endplates */}
      <mesh castShadow position={[1.35, 0.25, 1.9]}>
        <boxGeometry args={[0.05, 0.3, 0.6]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh castShadow position={[-1.35, 0.25, 1.9]}>
        <boxGeometry args={[0.05, 0.3, 0.6]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Rear Wing Main */}
      <mesh castShadow position={[0, 0.9, -1.8]}>
        <boxGeometry args={[2.2, 0.1, 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Rear Wing Endplates */}
      <mesh castShadow position={[1.05, 0.7, -1.8]}>
        <boxGeometry args={[0.05, 0.6, 0.8]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh castShadow position={[-1.05, 0.7, -1.8]}>
        <boxGeometry args={[0.05, 0.6, 0.8]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Rear Wing Supports */}
      <mesh castShadow position={[0, 0.5, -1.8]}>
        <boxGeometry args={[0.2, 0.6, 0.1]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Engine Intake (above cockpit) */}
      <mesh castShadow position={[0, 0.85, -0.6]}>
        <boxGeometry args={[0.4, 0.2, 0.4]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
};
