import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import { useRef } from 'react';
import { Group } from 'three';

function MorphFigure({ progress, reduced }: { progress: number; reduced: boolean }) {
  const group = useRef<Group>(null);

  useFrame((_state, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.y += delta * 0.25;
  });

  const femaleOpacity = Math.max(0, 1 - progress * 1.5);
  const bearOpacity = Math.min(1, progress * 1.5);

  return (
    <group ref={group}>
      <Float speed={reduced ? 0 : 1.2} floatIntensity={reduced ? 0 : 0.3}>
        <mesh position={[0, 0.8, 0]}>
          <capsuleGeometry args={[0.35, 1.1, 12, 18]} />
          <meshStandardMaterial color="#f3d3a3" transparent opacity={femaleOpacity} />
        </mesh>
        <mesh position={[0, 1.8, 0]}>
          <sphereGeometry args={[0.33, 24, 24]} />
          <meshStandardMaterial color="#ffd087" transparent opacity={femaleOpacity} />
        </mesh>
        <mesh position={[0, -0.35, 0]} scale={[1.3, 0.9, 0.9]}>
          <capsuleGeometry args={[0.45, 0.8, 8, 16]} />
          <meshStandardMaterial color="#4b3628" transparent opacity={bearOpacity} />
        </mesh>
        <mesh position={[0, 0.55, 0]} scale={[1.2, 1.3, 1]}>
          <sphereGeometry args={[0.55, 24, 24]} />
          <meshStandardMaterial color="#5a4030" transparent opacity={bearOpacity} />
        </mesh>
      </Float>
      {!reduced && <Sparkles count={80} scale={3} size={1.8} speed={0.4} color="#a9ffd0" />}
    </group>
  );
}

export function HeroScene({ progress, reduced }: { progress: number; reduced: boolean }) {
  return (
    <Canvas camera={{ position: [0, 1.6, 3.6], fov: 45 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 4, 2]} intensity={1.2} color="#d9ffe9" />
      <fog attach="fog" args={['#102319', 3, 8]} />
      <MorphFigure progress={progress} reduced={reduced} />
    </Canvas>
  );
}
