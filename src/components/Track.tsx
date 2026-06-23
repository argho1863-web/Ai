import React from 'react';
import { usePlane } from '@react-three/cannon';
import * as THREE from 'three';

export const Track = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    type: 'Static',
  }));

  // Create a simple oval track geometry
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(50, 0, 0),
    new THREE.Vector3(45, 0, 20),
    new THREE.Vector3(30, 0, 40),
    new THREE.Vector3(0, 0, 50),
    new THREE.Vector3(-30, 0, 40),
    new THREE.Vector3(-45, 0, 20),
    new THREE.Vector3(-50, 0, 0),
    new THREE.Vector3(-45, 0, -20),
    new THREE.Vector3(-30, 0, -40),
    new THREE.Vector3(0, 0, -50),
    new THREE.Vector3(30, 0, -40),
    new THREE.Vector3(45, 0, -20),
  ], true);

  // const points = curve.getPoints(100);
  // const trackGeometry = new THREE.TubeGeometry(curve, 100, 6, 8, true);

  return (
    <>
      {/* Ground */}
      <mesh ref={ref as any} receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>

      {/* Track Surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
         <ringGeometry args={[44, 56, 64]} />
         <meshStandardMaterial color="#333" />
      </mesh>

      {/* Starting Line */}
      <mesh position={[50, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 2]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </>
  );
};
