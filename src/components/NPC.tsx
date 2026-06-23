import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useRaycastVehicle, useBox } from '@react-three/cannon';
import { F1CarModel } from './F1CarModel';
import * as THREE from 'three';
import { WAYPOINTS } from '../constants/track';

export const NPC = ({ position, rotation, color = 'blue', waypointIndex = 0 }: { position: [number, number, number], rotation: [number, number, number], color?: string, waypointIndex?: number }) => {
  const currentWaypointIndex = useRef(waypointIndex);

  const chassisWidth = 1.5;
  const chassisHeight = 0.5;
  const chassisFront = 2;
  const chassisBack = 2;

  const [chassisBody, chassisApi] = useBox(() => ({
    allowSleep: false,
    args: [chassisWidth, chassisHeight, chassisFront + chassisBack],
    mass: 500,
    position,
    rotation,
  }));

  const wheelInfo = {
    radius: 0.4,
    directionLocal: [0, -1, 0],
    suspensionStiffness: 30,
    suspensionRestLength: 0.3,
    maxSuspensionForce: 100000,
    maxSuspensionTravel: 0.3,
    dampingRelaxation: 2.3,
    dampingCompression: 4.4,
    axleLocal: [-1, 0, 0],
    chassisConnectionPointLocal: [1, 0, 1],
    useCustomSlidingRotationalSpeed: true,
    customSlidingRotationalSpeed: -30,
    frictionSlip: 2,
  };

  const wheelInfos = [
    { ...wheelInfo, chassisConnectionPointLocal: [-1, 0, 1.5], isFrontWheel: true },
    { ...wheelInfo, chassisConnectionPointLocal: [1, 0, 1.5], isFrontWheel: true },
    { ...wheelInfo, chassisConnectionPointLocal: [-1, 0, -1.5], isFrontWheel: false },
    { ...wheelInfo, chassisConnectionPointLocal: [1, 0, -1.5], isFrontWheel: false },
  ];

  const wheels = [useRef<THREE.Group>(null), useRef<THREE.Group>(null), useRef<THREE.Group>(null), useRef<THREE.Group>(null)];

  const [vehicle, vehicleApi] = useRaycastVehicle(() => ({
    chassisBody,
    wheelInfos,
    wheels,
  }));

  useFrame(() => {
    if (!chassisBody.current) return;

    const pos = new THREE.Vector3();
    chassisBody.current.getWorldPosition(pos);

    const target = new THREE.Vector3(...WAYPOINTS[currentWaypointIndex.current]);
    const distance = pos.distanceTo(target);

    if (distance < 10) {
      currentWaypointIndex.current = (currentWaypointIndex.current + 1) % WAYPOINTS.length;
    }

    // AI Logic
    const direction = target.clone().sub(pos).normalize();
    const carDir = new THREE.Vector3(0, 0, -1).applyQuaternion(chassisBody.current.quaternion);

    const angle = carDir.angleTo(direction);
    const cross = new THREE.Vector3().crossVectors(carDir, direction);
    const steerDir = cross.y > 0 ? 1 : -1;

    const force = 1200;
    const steer = Math.min(angle, 0.5) * steerDir;

    vehicleApi.applyEngineForce(-force, 2);
    vehicleApi.applyEngineForce(-force, 3);
    vehicleApi.setSteeringValue(steer, 0);
    vehicleApi.setSteeringValue(steer, 1);
  });

  return (
    <group ref={vehicle as any}>
      <group ref={chassisBody as any}>
        <F1CarModel color={color} />
      </group>
      {wheels.map((ref, i) => (
        <group key={i} ref={ref as any}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.4, 0.4, 0.4, 16]} />
            <meshStandardMaterial color="black" />
          </mesh>
        </group>
      ))}
    </group>
  );
};
