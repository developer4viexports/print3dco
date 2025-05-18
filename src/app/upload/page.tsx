// src/app/upload/page.tsx
'use client';

import React, {
  FC,
  useState,
  useEffect,
  useMemo,
  ChangeEvent,
  FormEvent,
  useRef,
} from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Grid, Bounds } from '@react-three/drei';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

// --- Types ---
interface Dimensions {
  volume: number;
  area: number;
  length: number;
  width: number;
  height: number;
}
interface MaterialData {
  price: number;
  unit: 'g' | 'cm³';
  tech: string;
  density: number;
}
interface ModelProps {
  fileUrl: string;
  scale: number;
  colorHex: string;
  fileType: 'stl' | 'obj';
}

// --- Color palette ---
const COLOR_MAP: Record<string, string> = {
  black: '#000000',
  red: '#EF4444',
  green: '#10B981',
  blue: '#3B82F6',
  brown: '#A52A2A',
  gray: '#9CA3AF',
  yellow: '#F59E0B',
  purple: '#8B5CF6',
  orange: '#F97316',
};
const AVAILABLE_COLORS = Object.keys(COLOR_MAP);

const Upload3DModel: FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fileUrl, setFileUrl] = useState('');
  const [fileType, setFileType] = useState<'stl' | 'obj'>('stl');
  const [scale, setScale] = useState(0.1);
  const [quantity, setQuantity] = useState('1');
  const [material, setMaterial] = useState('PLA (Polylactic Acid)');
  const [finish, setFinish] = useState('None');
  const [unit, setUnit] = useState<'mm' | 'inch'>('mm');
  const [price, setPrice] = useState('₹0.00');
  const [dimensions, setDimensions] = useState<Dimensions>({
    volume: 0,
    area: 0,
    length: 0,
    width: 0,
    height: 0,
  });
  const [selectedColor, setSelectedColor] = useState('gray');
  const [showModal, setShowModal] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [personal, setPersonal] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  // memoized pricing tables
  const materialPrices = useMemo<Record<string, MaterialData>>(
    () => ({
      'PLA (Polylactic Acid)': {
        price: 1.2,
        unit: 'g',
        tech: 'FDM',
        density: 1.24,
      },
      'ABS (Acrylonitrile Butadiene Styrene)': {
        price: 1.1,
        unit: 'g',
        tech: 'FDM',
        density: 1.04,
      },
      'PETG (Polyethylene Terephthalate Glycol)': {
        price: 2.3,
        unit: 'g',
        tech: 'FDM',
        density: 1.27,
      },
      'Nylon (Polyamide)': {
        price: 3,
        unit: 'g',
        tech: 'FDM/SLS',
        density: 1.15,
      },
      'Resin (Photopolymer)': {
        price: 6,
        unit: 'cm³',
        tech: 'SLA/DLP/MSLA',
        density: 1.2,
      },
      'Metal (Stainless Steel, Aluminum, Titanium)': {
        price: 500,
        unit: 'g',
        tech: 'DMLS/SLM',
        density: 7.8,
      },
    }),
    []
  );

  const finishPrices = useMemo<Record<string, number>>(
    () => ({
      None: 1,
      Polished: 1.2,
      'Black dye': 1.1,
    }),
    []
  );

  // File upload & reset
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const ext =
      file.name.split('.').pop()?.toLowerCase() === 'obj' ? 'obj' : 'stl';
    setFileUrl(url);
    setFileType(ext);
    loadGeometry(url, ext);
    fileInputRef.current!.value = '';
  };
  const resetFile = () => {
    URL.revokeObjectURL(fileUrl);
    setFileUrl('');
    setDimensions({ volume: 0, area: 0, length: 0, width: 0, height: 0 });
  };

  // Geometry loading & measurement
  const loadGeometry = (url: string, type: 'stl' | 'obj') => {
    const loader = type === 'obj' ? new OBJLoader() : new STLLoader();
    loader.load(url, (data: any) => {
      let geometry: THREE.BufferGeometry;
      if (type === 'obj') {
        let geom: THREE.BufferGeometry | null = null;
        (data as THREE.Group).traverse((c) => {
          if ((c as THREE.Mesh).isMesh)
            geom = (c as THREE.Mesh).geometry as THREE.BufferGeometry;
        });
        if (!geom) return;
        geometry = geom;
      } else {
        geometry = data as THREE.BufferGeometry;
      }
      computeDimensions(geometry);
    });
  };

  const computeDimensions = (g: THREE.BufferGeometry) => {
    g.computeBoundingBox();
    const bb = g.boundingBox!;
    const length = parseFloat((bb.max.x - bb.min.x).toFixed(2));
    const width = parseFloat((bb.max.y - bb.min.y).toFixed(2));
    const height = parseFloat((bb.max.z - bb.min.z).toFixed(2));
    const volume = parseFloat(calculateVolume(g).toFixed(2));
    const area = parseFloat(calculateSurfaceArea(g).toFixed(2));
    setDimensions({ length, width, height, volume, area });
  };

  const calculateVolume = (g: THREE.BufferGeometry) => {
    const pos = g.attributes.position;
    let vol = 0;
    for (let i = 0; i < pos.count; i += 3) {
      const p1 = new THREE.Vector3().fromBufferAttribute(pos, i);
      const p2 = new THREE.Vector3().fromBufferAttribute(pos, i + 1);
      const p3 = new THREE.Vector3().fromBufferAttribute(pos, i + 2);
      vol += p1.dot(p2.cross(p3)) / 6;
    }
    return Math.abs(vol);
  };

  const calculateSurfaceArea = (g: THREE.BufferGeometry) => {
    const pos = g.attributes.position;
    let area = 0;
    for (let i = 0; i < pos.count; i += 3) {
      const p1 = new THREE.Vector3().fromBufferAttribute(pos, i);
      const p2 = new THREE.Vector3().fromBufferAttribute(pos, i + 1);
      const p3 = new THREE.Vector3().fromBufferAttribute(pos, i + 2);
      area +=
        p2
          .clone()
          .sub(p1)
          .cross(p3.clone().sub(p1))
          .length() / 2;
    }
    return area;
  };

  // Recalculate price
  useEffect(() => {
    const qty = parseInt(quantity, 10) || 1;
    const mat = materialPrices[material];
    const f = finishPrices[finish] || 1;
    const u = unit === 'inch' ? 25.4 : 1;
    let total = dimensions.volume * u * mat.price * f * qty;
    if (mat.unit === 'g') total *= mat.density;
    setPrice(`₹${total.toFixed(2)}`);
  }, [dimensions, material, finish, quantity, unit, materialPrices, finishPrices]);

  // Personal info handlers
  const handlePersonal = (e: ChangeEvent<HTMLInputElement>) => {
    setPersonal({ ...personal, [e.target.name]: e.target.value });
  };
  const submitOrder = (e: FormEvent) => {
    e.preventDefault();
    setOrdered(true);
  };

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-foreground)] flex flex-col lg:flex-row p-4 gap-4">
      {/* ===== Preview ===== */}
      <section className="flex-1 bg-[var(--color-foreground)]/10 p-6 rounded-lg border border-[var(--color-secondary)]/20 flex flex-col">
        <h2 className="text-2xl font-semibold mb-4">Upload & Preview</h2>
        <div className="flex-1 border-2 border-dashed border-[var(--color-secondary)]/20 rounded-lg relative">
          {!fileUrl ? (
            <label className="w-full h-full flex items-center justify-center cursor-pointer hover:border-[var(--color-secondary)] transition">
              <span>Click or drag STL/OBJ here</span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".stl,.obj"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </label>
          ) : (
            <>
              <button
                onClick={resetFile}
                className="absolute top-2 right-2 bg-[var(--color-primary)] text-[var(--color-background)] text-sm px-2 py-1 rounded"
              >
                Change File
              </button>
              <Canvas className="w-full h-full absolute inset-0">
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <Bounds fit clip margin={1.2}>
                  <Model
                    fileUrl={fileUrl}
                    scale={scale}
                    colorHex={COLOR_MAP[selectedColor]}
                    fileType={fileType}
                  />
                </Bounds>
                <OrbitControls />
                <Grid cellSize={1} sectionSize={10} infiniteGrid />
              </Canvas>
            </>
          )}
        </div>
      </section>

      {/* ===== Dimensions ===== */}
      <section className="w-full lg:w-80 bg-[var(--color-foreground)]/10 p-6 rounded-lg border border-[var(--color-secondary)]/20 space-y-4">
        <h3 className="text-xl font-semibold">Dimensions</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>Length:</div>
          <div>
            {dimensions.length} {unit}
          </div>
          <div>Width:</div>
          <div>
            {dimensions.width} {unit}
          </div>
          <div>Height:</div>
          <div>
            {dimensions.height} {unit}
          </div>
          <div>Volume:</div>
          <div>
            {dimensions.volume.toFixed(2)} {unit}³
          </div>
          <div>Area:</div>
          <div>
            {dimensions.area.toFixed(2)} {unit}²
          </div>
        </div>
      </section>

      {/* ===== Controls ===== */}
      <aside className="w-full lg:w-80 bg-[var(--color-foreground)]/10 p-6 rounded-lg border border-[var(--color-secondary)]/20 space-y-6">
        <h3 className="text-xl font-semibold">Customize</h3>
        <div className="space-y-4">
          {/* Scale */}
          <div>
            <span className="text-sm block mb-1">Scale</span>
            <input
              type="range"
              min={0.05}
              max={1}
              step={0.01}
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          {/* Quantity */}
          <div>
            <span className="text-sm block mb-1">Quantity</span>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-2 border border-[var(--color-secondary)]/20 rounded text-center bg-transparent"
            />
          </div>
          {/* Material */}
          <div>
            <span className="text-sm block mb-1">Material</span>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full p-2 border border-[var(--color-secondary)]/20 rounded bg-transparent"
            >
              {Object.keys(materialPrices).map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>
          {/* Finish */}
          <div>
            <span className="text-sm block mb-1">Finish</span>
            <select
              value={finish}
              onChange={(e) => setFinish(e.target.value)}
              className="w-full p-2 border border-[var(--color-secondary)]/20 rounded bg-transparent"
            >
              {Object.keys(finishPrices).map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>
          {/* Unit */}
          <div>
            <span className="text-sm block mb-1">Unit</span>
            <div className="flex space-x-2">
              {(['mm', 'inch'] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  className={`px-3 py-1 rounded ${unit === u
                      ? 'bg-[var(--color-secondary)] text-[var(--color-background)]'
                      : 'bg-transparent border border-[var(--color-secondary)]/20'
                    }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
          {/* Color */}
          <div>
            <span className="text-sm block mb-1">Color</span>
            <div className="grid grid-cols-5 gap-2">
              {AVAILABLE_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  style={{ backgroundColor: COLOR_MAP[c] }}
                  className={`w-8 h-8 rounded-full border-2 ${selectedColor === c
                      ? 'border-[var(--color-primary)]'
                      : 'border-[var(--color-secondary)]/20'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-[var(--color-secondary)]/20">
          <p className="text-sm mb-1">Estimated Cost</p>
          <p className="text-2xl font-bold text-[var(--color-secondary)]">
            {price}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="w-full mt-4 bg-[var(--color-primary)] text-[var(--color-background)] py-3 rounded-full font-medium hover:bg-[var(--color-primary)]/90 transition"
        >
          Make an Order
        </button>
      </aside>

      {/* ===== Order Modal ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-[var(--color-background)] text-[var(--color-foreground)] rounded-xl p-6 w-full max-w-md shadow-xl"
          >
            {ordered ? (
              <>
                <CheckCircleIcon className="h-12 w-12 text-[var(--color-secondary)] mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-center mb-2">
                  Order Placed!
                </h3>
                <p className="text-center text-[var(--color-foreground)]/80 mb-4">
                  Thank you, {personal.name}. Your order is being processed.
                </p>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setOrdered(false);
                  }}
                  className="mt-2 w-full py-2 bg-[var(--color-primary)] text-[var(--color-background)] rounded"
                >
                  Close
                </button>
              </>
            ) : (
              <form onSubmit={submitOrder} className="space-y-4">
                <h3 className="text-xl font-semibold mb-2">
                  Enter Your Details
                </h3>
                {(['name', 'email', 'address', 'phone'] as const).map((f) => (
                  <div key={f}>
                    <label
                      htmlFor={f}
                      className="block text-sm mb-1 capitalize"
                    >
                      {f}
                    </label>
                    <input
                      id={f}
                      name={f}
                      required
                      value={(personal as any)[f]}
                      onChange={handlePersonal}
                      className="w-full border border-[var(--color-secondary)]/20 rounded p-2 focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                  </div>
                ))}
                <div className="bg-[var(--color-foreground)]/5 p-4 rounded">
                  <p className="text-sm mb-1 font-medium">Order Summary:</p>
                  <ul className="text-sm space-y-1">
                    <li>Scale: {scale}</li>
                    <li>Quantity: {quantity}</li>
                    <li>Material: {material}</li>
                    <li>Finish: {finish}</li>
                    <li>Color: {selectedColor}</li>
                    <li>Price: {price}</li>
                  </ul>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-[var(--color-secondary)]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-background)] rounded"
                  >
                    Submit Order
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

// --- 3D Model renderer ---
const Model: FC<ModelProps> = ({ fileUrl, scale, colorHex, fileType }) => {
  const loaded = useLoader(
    fileType === 'obj' ? OBJLoader : STLLoader,
    fileUrl
  ) as any;
  if (fileType === 'obj') return <primitive object={loaded} scale={scale} />;
  return (
    <mesh geometry={loaded} scale={scale} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial
        color={colorHex}
        metalness={0.5}
        roughness={0.4}
      />
    </mesh>
  );
};

export default Upload3DModel;
