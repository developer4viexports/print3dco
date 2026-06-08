// src/components/ModelViewer.tsx
// A lightweight, dependency-free 3D showpiece for the hero/demo.
// Renders a procedural, slowly auto-rotating mesh — no external model file
// (the old /models/gear.gltf was empty and crashed the GLTF loader).
'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

type Shape = 'knot' | 'gear' | 'ico';

function SpinningMesh({ shape = 'knot' }: { shape?: Shape }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.4;
      ref.current.rotation.x += delta * 0.12;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={ref} castShadow>
        {shape === 'knot' && <torusKnotGeometry args={[1, 0.32, 180, 32]} />}
        {shape === 'gear' && <torusGeometry args={[1, 0.42, 16, 48]} />}
        {shape === 'ico' && <icosahedronGeometry args={[1.3, 0]} />}
        <meshStandardMaterial color="#2563EB" metalness={0.55} roughness={0.25} />
      </mesh>
    </Float>
  );
}

export default function ModelViewer({ shape = 'knot' }: { shape?: Shape }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, -3, -5]} intensity={0.4} color="#38BDF8" />
      <SpinningMesh shape={shape} />
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.6} />
    </Canvas>
  );
}
