// src/app/demo/page.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Grid, Bounds } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

export default function DemoPage() {
    // Viewer state
    const [scale, setScale] = useState(0.2);
    const [color, setColor] = useState('#10B981');
    const [autoRotate, setAutoRotate] = useState(true);
    const [rotateSpeed, setRotateSpeed] = useState(2);
    const [showGrid, setShowGrid] = useState(true);
    const [wireframe, setWireframe] = useState(false);
    const [bgColor, setBgColor] = useState('var(--color-background)');

    return (
        <div className="bg-[var(--color-background)] text-[var(--color-foreground)] min-h-screen p-6">
            {/* Header */}
            <header className="max-w-7xl mx-auto text-center mb-8">
                <h1 className="text-4xl font-bold">Interactive 3D OBJ Demo</h1>
                <p className="text-[var(--color-foreground)]/70 mt-2">
                    Explore controls for scale, color, rotation, and rendering.
                </p>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Canvas */}
                <div
                    className="lg:col-span-2 rounded-lg overflow-hidden h-[600px]"
                    style={{ backgroundColor: bgColor }}
                >
                    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} intensity={1} />
                        <Bounds fit clip margin={1.2}>
                            <Model scale={scale} color={color} wireframe={wireframe} />
                        </Bounds>
                        <OrbitControls autoRotate={autoRotate} autoRotateSpeed={rotateSpeed} />
                        {showGrid && <Grid cellSize={1} sectionSize={10} infiniteGrid />}
                    </Canvas>
                </div>

                {/* Controls */}
                <aside className="space-y-6">
                    {/* Scale & Color */}
                    <div className="bg-[var(--color-foreground)]/10 p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">Appearance</h2>
                        <div className="mb-4">
                            <label className="block text-sm mb-1">Scale: {scale.toFixed(2)}</label>
                            <input
                                type="range"
                                min="0.05"
                                max="1"
                                step="0.01"
                                value={scale}
                                onChange={e => setScale(parseFloat(e.target.value))}
                                className="w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm mb-1">Color</label>
                            <input
                                type="color"
                                value={color}
                                onChange={e => setColor(e.target.value)}
                                className="w-10 h-10 p-0 border-0"
                            />
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                            <input
                                type="checkbox"
                                id="wireframe"
                                checked={wireframe}
                                onChange={e => setWireframe(e.target.checked)}
                                className="accent-[var(--color-primary)]"
                            />
                            <label htmlFor="wireframe" className="text-sm">Wireframe</label>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm mb-1">Background</label>
                            <input
                                type="color"
                                value={bgColor}
                                onChange={e => setBgColor(e.target.value)}
                                className="w-10 h-10 p-0 border-0"
                            />
                        </div>
                    </div>

                    {/* Rotation */}
                    <div className="bg-[var(--color-foreground)]/10 p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">Rotation</h2>
                        <div className="flex items-center space-x-2 mb-2">
                            <input
                                type="checkbox"
                                id="autoRotate"
                                checked={autoRotate}
                                onChange={e => setAutoRotate(e.target.checked)}
                                className="accent-[var(--color-primary)]"
                            />
                            <label htmlFor="autoRotate" className="text-sm">Auto Rotate</label>
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Speed: {rotateSpeed}</label>
                            <input
                                type="range"
                                min="0.1"
                                max="10"
                                step="0.1"
                                value={rotateSpeed}
                                onChange={e => setRotateSpeed(parseFloat(e.target.value))}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="bg-[var(--color-foreground)]/10 p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">Grid</h2>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="showGrid"
                                checked={showGrid}
                                onChange={e => setShowGrid(e.target.checked)}
                                className="accent-[var(--color-primary)]"
                            />
                            <label htmlFor="showGrid" className="text-sm">Show Grid</label>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

interface ModelProps {
    scale: number;
    color: string;
    wireframe: boolean;
}

const Model: React.FC<ModelProps> = ({ scale, color, wireframe }) => {
    const group = useLoader(OBJLoader, '/models/demo.obj');
    useEffect(() => {
        group.traverse((child: any) => {
            if (child.isMesh) {
                child.material.color.set(color);
                child.material.wireframe = wireframe;
            }
        });
    }, [color, wireframe, group]);

    return <primitive object={group} scale={scale} />;
};
