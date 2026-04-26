'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';

function Crystal() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    
    // Smoothly follow mouse
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouse.x * 2, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouse.y * 2, 0.05);
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.5}>
        <octahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={1}
          roughness={0.0}
          thickness={1.5}
          ior={1.5}
          chromaticAberration={0.1}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#ffffff"
        />
      </mesh>
    </Float>
  );
}

function FloatingLights() {
  return (
    <group>
      <pointLight position={[10, 10, 10]} intensity={1} color="#4facfe" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#7b61ff" />
      <pointLight position={[0, 5, 5]} intensity={0.5} color="#f78da7" />
    </group>
  );
}

export default function PrismBackground() {
  return (
    <div className="absolute inset-0 z-0 bg-[#02040a]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={['#02040a']} />
        <Environment preset="city" />
        <FloatingLights />
        <Crystal />
        
        {/* Background Bokeh/Stars */}
        <mesh position={[0, 0, -5]} scale={20}>
          <planeGeometry />
          <meshBasicMaterial color="#050810" />
        </mesh>
      </Canvas>
    </div>
  );
}
