import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { Sky } from '@react-three/drei';
import { Track } from './components/Track';
import { Car } from './components/Car';
import { NPC } from './components/NPC';
import { HUD } from './components/HUD';
import { useControls } from './hooks/useControls';
import './App.css';

function App() {
  const controls = useControls();

  return (
    <div className="game-container">
      <Canvas shadows camera={{ position: [60, 20, 60], fov: 50 }}>
        <Sky sunPosition={[100, 10, 100]} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 50, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />

        <Physics gravity={[0, -9.81, 0]}>
          <Suspense fallback={null}>
             <Track />
             <Car position={[50, 2, 0]} rotation={[0, 0, 0]} controls={controls} />
             <NPC position={[54, 2, -5]} rotation={[0, 0, 0]} color="blue" waypointIndex={0} />
             <NPC position={[46, 2, -10]} rotation={[0, 0, 0]} color="yellow" waypointIndex={0} />
          </Suspense>
        </Physics>
      </Canvas>
      <HUD controls={controls} />
    </div>
  );
}

export default App;
