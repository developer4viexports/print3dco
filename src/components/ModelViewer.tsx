// src/components/ModelViewer.tsx
'use client';

import React, { Suspense, Component, ReactNode } from 'react';
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
        <GLTFErrorBoundary>
          <Model url={modelUrl} />
        </GLTFErrorBoundary>
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

// Error boundary to catch GLTF loading errors
class GLTFErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error loading GLTF model:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <Placeholder />;
    }
    return this.props.children;
  }
}

function Model({ url }: { url: string }) {
  // Always call hooks unconditionally
  const { scene } = useGLTF(url, true);
  return <primitive object={scene} />;
}

// Preload to improve performance
useGLTF.preload('/models/gear.gltf');
