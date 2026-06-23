import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useRaycastVehicle, useBox, type WheelInfoOptions } from '@react-three/cannon';
import { F1CarModel } from './F1CarModel';
import * as THREE from 'three';

export const Car = ({ position = [50, 2, 0], rotation = [0, Math.PI, 0], controls }: { position?: [number, number, number], rotation?: [number, number, number], controls: any }) => {
  const { camera } = useThree();

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

  const wheelInfo: WheelInfoOptions = {
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

  const wheelInfos: WheelInfoOptions[] = [
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
    const { forward, backward, left, right, brake, reset } = controls;

    const force = 1500;
    const steer = 0.5;

    vehicleApi.applyEngineForce(forward ? -force : backward ? force : 0, 2);
    vehicleApi.applyEngineForce(forward ? -force : backward ? force : 0, 3);

    vehicleApi.setSteeringValue(left ? steer : right ? -steer : 0, 0);
    vehicleApi.setSteeringValue(left ? steer : right ? -steer : 0, 1);

    vehicleApi.setBrake(brake ? 50 : 0, 0);
    vehicleApi.setBrake(brake ? 50 : 0, 1);
    vehicleApi.setBrake(brake ? 50 : 0, 2);
    vehicleApi.setBrake(brake ? 50 : 0, 3);

    if (reset) {
        chassisApi.position.set(...position);
        chassisApi.velocity.set(0, 0, 0);
        chassisApi.angularVelocity.set(0, 0, 0);
        chassisApi.rotation.set(...rotation);
    }

    // Camera follow
    if (chassisBody.current) {
        const pos = new THREE.Vector3();
        chassisBody.current.getWorldPosition(pos);

        const dir = new THREE.Vector3(0, 0, -1);
        dir.applyQuaternion(chassisBody.current.quaternion);

        const cameraPos = pos.clone().add(dir.clone().multiplyScalar(-10)).add(new THREE.Vector3(0, 5, 0));
        camera.position.lerp(cameraPos, 0.1);
        camera.lookAt(pos);
    }
  });

  return (
    <group ref={vehicle as any}>
      <group ref={chassisBody as any}>
        <F1CarModel />
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
