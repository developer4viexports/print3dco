'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

interface ModelViewerProps {
  modelUrl?: string;
}

export default function ModelViewer({ modelUrl = '/models/gear.gltf' }: ModelViewerProps) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <Suspense fallback={<Placeholder />}>
        <Model url={modelUrl} />
      </Suspense>

      <OrbitControls enablePan enableZoom enableRotate />
    </Canvas>
  );
}

function Placeholder() {
  return (
    <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <meshStandardMaterial color="#888" />
    </mesh>
  );
}

function Model({ url }: { url: string }) {
  if (!url) {
    console.warn('Model URL is empty');
    return <Placeholder />;
  }
  try {
    const { scene } = useGLTF(url, true);
    return <primitive object={scene} />;
  } catch (error) {
    console.error(`Failed to load GLTF model at ${url}:`, error);
    return <Placeholder />;
  }
}

useGLTF.preload('/models/gear.gltf');
