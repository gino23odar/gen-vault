import { Canvas } from '@react-three/fiber';
import { Billboard, Sparkles } from '@react-three/drei';
import type { Bird } from '../../types';

export function FieldScene({ birds, reduced }: { birds: Bird[]; reduced: boolean }) {
  return (
    <Canvas camera={{ position: [0, 2.4, 6], fov: 55 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 2]} intensity={1} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <circleGeometry args={[8, 48]} />
        <meshStandardMaterial color="#294235" />
      </mesh>
      {birds.slice(0, 12).map((bird, idx) => {
        const angle = (idx / Math.max(1, birds.length)) * Math.PI * 2;
        const radius = 2 + (idx % 4) * 0.8;
        return (
          <Billboard key={bird.id} position={[Math.cos(angle) * radius, 0.1 + (idx % 2) * 0.25, Math.sin(angle) * radius]}>
            <mesh>
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshStandardMaterial color={bird.isFavorite ? '#ffd86b' : '#9ff0c7'} emissive="#0f2" emissiveIntensity={0.2} />
            </mesh>
          </Billboard>
        );
      })}
      <mesh position={[2.6, -0.4, -1.1]} scale={[1.5, 1.1, 1.2]}>
        <sphereGeometry args={[0.8, 24, 24]} />
        <meshStandardMaterial color="#6b4d39" />
      </mesh>
      {!reduced && <Sparkles count={60} scale={10} size={2} speed={0.3} color="#a6ffd4" />}
    </Canvas>
  );
}
