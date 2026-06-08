// src/app/upload/page.tsx — robu.in-style "3D Printing Service" product page.
'use client';

import React, { FC, Suspense, useEffect, useMemo, useRef, useState, ChangeEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Grid, Bounds } from '@react-three/drei';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';
import {
  StarIcon,
  TruckIcon,
  ClockIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline';

import CustomizePanel, { ConfiguratorValue } from 'src/components/CustomizePanel';
import QuoteTable from 'src/components/QuoteTable';
import FeatureCard from 'src/components/FeatureCard';
import ProductReviews from 'src/components/ProductReviews';
import { calculateQuote, MATERIALS, COLOR_MAP, COLORS } from 'src/lib/pricing';
import { uploadModel } from 'src/services/modelService';
import { createQuote } from 'src/services/quoteService';
import { useCart } from 'src/hooks/useCart';
import { formatLength, formatVolumeCm3, formatWeight } from 'src/utils/formatters';
import type { Dimensions } from 'src/types';

// ---------- Geometry helpers (kept from original) ----------
function calculateVolume(g: THREE.BufferGeometry): number {
  const pos = g.attributes.position;
  let vol = 0;
  for (let i = 0; i < pos.count; i += 3) {
    const p1 = new THREE.Vector3().fromBufferAttribute(pos, i);
    const p2 = new THREE.Vector3().fromBufferAttribute(pos, i + 1);
    const p3 = new THREE.Vector3().fromBufferAttribute(pos, i + 2);
    vol += p1.dot(p2.cross(p3)) / 6;
  }
  return Math.abs(vol);
}

function calculateSurfaceArea(g: THREE.BufferGeometry): number {
  const pos = g.attributes.position;
  let area = 0;
  for (let i = 0; i < pos.count; i += 3) {
    const p1 = new THREE.Vector3().fromBufferAttribute(pos, i);
    const p2 = new THREE.Vector3().fromBufferAttribute(pos, i + 1);
    const p3 = new THREE.Vector3().fromBufferAttribute(pos, i + 2);
    area += p2.clone().sub(p1).cross(p3.clone().sub(p1)).length() / 2;
  }
  return area;
}

// Volume/area assume non-indexed triangle soup (positions in groups of 3).
// OBJ/STL loaders give non-indexed geometry, but normalize just in case.
function geometryStats(geo: THREE.BufferGeometry): { volume: number; area: number; triangles: number } {
  const g = geo.index ? geo.toNonIndexed() : geo;
  return {
    volume: calculateVolume(g),
    area: calculateSurfaceArea(g),
    triangles: Math.floor(g.attributes.position.count / 3),
  };
}

const round2 = (n: number) => parseFloat(n.toFixed(2));

// Approx. wall thickness for thin/open meshes (≈3 perimeters at a 0.4 mm nozzle).
const SHELL_THICKNESS_MM = 1.2;
// Below this fraction of the bounding box, the signed volume is unreliable
// (the mesh is open / non-watertight) — fall back to a shell estimate.
const MIN_SOLIDITY = 0.05;

// Pick the best material-volume estimate for pricing.
// Watertight solids → true signed volume. Thin/open shells (most scanned or
// CAD car/cover models) → surface area × wall thickness, capped at the box.
function materialVolume(meshVolume: number, area: number, bboxVolume: number): { volume: number; method: 'solid' | 'shell' } {
  const solidity = bboxVolume > 0 ? meshVolume / bboxVolume : 0;
  if (meshVolume > 0 && solidity >= MIN_SOLIDITY) {
    return { volume: meshVolume, method: 'solid' };
  }
  const shell = Math.min(area * SHELL_THICKNESS_MM, bboxVolume * 0.9);
  return { volume: shell, method: 'shell' };
}

// Analyze a loaded model into dimensions. Handles STL (single geometry) and
// OBJ (a group that may contain MANY meshes — all are aggregated).
function analyzeModel(data: THREE.BufferGeometry | THREE.Group, ext: 'stl' | 'obj'): Dimensions {
  console.groupCollapsed(`%c[upload] analyzing ${ext.toUpperCase()} model`, 'color:#2563EB;font-weight:bold');

  let meshVolume = 0;
  let area = 0;
  let triangles = 0;
  let meshCount = 0;
  const bbox = new THREE.Box3();

  if (ext === 'stl') {
    const g = data as THREE.BufferGeometry;
    const stats = geometryStats(g);
    meshVolume = stats.volume;
    area = stats.area;
    triangles = stats.triangles;
    meshCount = 1;
    g.computeBoundingBox();
    if (g.boundingBox) bbox.copy(g.boundingBox);
  } else {
    // OBJ: walk every mesh, sum volume + area, union the bounding box.
    const group = data as THREE.Group;
    group.updateMatrixWorld(true);
    group.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh || !mesh.geometry) return;
      meshCount += 1;
      const geo = (mesh.geometry as THREE.BufferGeometry).clone();
      geo.applyMatrix4(mesh.matrixWorld); // respect per-mesh transforms
      const stats = geometryStats(geo);
      meshVolume += stats.volume;
      area += stats.area;
      triangles += stats.triangles;
      geo.computeBoundingBox();
      if (geo.boundingBox) bbox.union(geo.boundingBox);
      console.log(`mesh #${meshCount} "${mesh.name || 'unnamed'}":`, { triangles: stats.triangles, volumeMm3: round2(stats.volume) });
      geo.dispose();
    });
  }

  const size = new THREE.Vector3();
  if (!bbox.isEmpty()) bbox.getSize(size);
  const bboxVolume = size.x * size.y * size.z;

  const { volume, method } = materialVolume(meshVolume, area, bboxVolume);

  const dims: Dimensions = {
    length: round2(size.x),
    width: round2(size.y),
    height: round2(size.z),
    volume: round2(volume),
    area: round2(area),
  };

  console.log(`meshes: ${meshCount}, triangles: ${triangles}`);
  console.log('mesh (signed) volume mm³:', round2(meshVolume), '| bbox volume mm³:', round2(bboxVolume));
  console.log(`material volume mm³: ${dims.volume} (method: ${method})`);
  console.log('dimensions (mm):', dims);
  if (meshCount === 0) console.warn('[upload] no meshes found — cannot compute details');
  if (method === 'shell') console.warn('[upload] mesh appears open/thin — used surface-area shell estimate for material volume');
  if (Math.max(size.x, size.y, size.z) < 5) console.warn('[upload] model is very small (<5 mm) — it may be modeled in cm/m/inch and need scaling before printing');
  console.groupEnd();
  return dims;
}

// Per-material surface look so switching material visibly changes the preview.
const MATERIAL_SURFACE: Record<string, { metalness: number; roughness: number }> = {
  PLA: { metalness: 0.1, roughness: 0.7 },
  ABS: { metalness: 0.1, roughness: 0.6 },
  PETG: { metalness: 0.25, roughness: 0.3 },
  NYLON: { metalness: 0.15, roughness: 0.65 },
  RESIN: { metalness: 0.35, roughness: 0.15 },
  TPU: { metalness: 0.1, roughness: 0.8 },
};

// ---------- 3D model renderer ----------
const Model: FC<{ fileUrl: string; colorHex: string; fileType: 'stl' | 'obj'; material: string }> = ({
  fileUrl,
  colorHex,
  fileType,
  material,
}) => {
  const surface = MATERIAL_SURFACE[material] ?? { metalness: 0.2, roughness: 0.6 };
  const loaded = useLoader(fileType === 'obj' ? OBJLoader : STLLoader, fileUrl) as
    | THREE.BufferGeometry
    | THREE.Group;

  // Recolor every mesh of an OBJ group so the selected color is reflected live.
  useEffect(() => {
    if (fileType !== 'obj') return;
    (loaded as THREE.Group).traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(colorHex),
        metalness: surface.metalness,
        roughness: surface.roughness,
      });
    });
  }, [loaded, colorHex, fileType, surface.metalness, surface.roughness]);

  if (fileType === 'obj') {
    return <primitive object={loaded as THREE.Group} />;
  }
  return (
    <mesh geometry={loaded as THREE.BufferGeometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color={colorHex} metalness={surface.metalness} roughness={surface.roughness} />
    </mesh>
  );
};

const EMPTY_DIMS: Dimensions = { volume: 0, area: 0, length: 0, width: 0, height: 0 };

// How many millimetres one unit of the uploaded file represents.
type SourceUnit = 'mm' | 'cm' | 'm' | 'inch';
const UNIT_TO_MM: Record<SourceUnit, number> = { mm: 1, cm: 10, m: 1000, inch: 25.4 };

const ProductPage: FC = () => {
  const router = useRouter();
  const { addItem } = useCart();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState('');
  const [fileType, setFileType] = useState<'stl' | 'obj'>('stl');
  const [dimensions, setDimensions] = useState<Dimensions>(EMPTY_DIMS);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadId, setUploadId] = useState<string | undefined>(undefined);
  const [added, setAdded] = useState(false);

  // Source-units + scale so meter/inch/cm-authored models can be sized for print.
  const [srcUnit, setSrcUnit] = useState<SourceUnit>('mm');
  const [scalePct, setScalePct] = useState(100);

  const [cfg, setCfg] = useState<ConfiguratorValue>({
    material: 'PLA',
    color: 'white',
    quality: '0.4mm',
    infill: 20,
    finish: 'None',
    unit: 'mm',
    quantity: 1,
  });

  const onChange = <K extends keyof ConfiguratorValue>(key: K, val: ConfiguratorValue[K]) =>
    setCfg((c) => ({ ...c, [key]: val }));

  // Apply source-unit + scale to the raw measured geometry.
  const scaleFactor = UNIT_TO_MM[srcUnit] * (scalePct / 100);
  const scaledDims = useMemo<Dimensions>(
    () => ({
      length: parseFloat((dimensions.length * scaleFactor).toFixed(2)),
      width: parseFloat((dimensions.width * scaleFactor).toFixed(2)),
      height: parseFloat((dimensions.height * scaleFactor).toFixed(2)),
      area: parseFloat((dimensions.area * scaleFactor ** 2).toFixed(2)),
      volume: parseFloat((dimensions.volume * scaleFactor ** 3).toFixed(2)),
    }),
    [dimensions, scaleFactor]
  );

  const { unitPrice, total, weightGrams } = useMemo(
    () =>
      calculateQuote({
        volume: scaledDims.volume,
        material: cfg.material,
        quality: cfg.quality,
        infill: cfg.infill,
        finish: cfg.finish,
        quantity: cfg.quantity,
      }),
    [scaledDims.volume, cfg]
  );

  const hasModel = dimensions.volume > 0;

  // ---------- file handling ----------
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const ext = f.name.split('.').pop()?.toLowerCase() === 'obj' ? 'obj' : 'stl';
    const url = URL.createObjectURL(f);

    setFile(f);
    setFileUrl(url);
    setFileType(ext);
    setUploadId(undefined);
    setAnalyzing(true);
    if (fileInputRef.current) fileInputRef.current.value = '';

    console.log(`[upload] loading ${ext.toUpperCase()} file:`, f.name, `(${(f.size / 1024).toFixed(0)} KB)`);
    const loader = ext === 'obj' ? new OBJLoader() : new STLLoader();
    loader.load(
      url,
      (data) => {
        const dims = analyzeModel(data as THREE.BufferGeometry | THREE.Group, ext);
        if (dims.volume <= 0) {
          console.warn('[upload] model produced zero volume — details may be incomplete', dims);
        }
        setDimensions(dims);
        setAnalyzing(false);
        // Best-effort: persist the upload + geometry to the backend.
        uploadModel(f, dims)
          .then((res) => {
            console.log('[upload] saved to backend, uploadId:', res.id);
            setUploadId(res.id);
          })
          .catch((err) => {
            console.warn('[upload] backend save skipped (quoting still works locally):', err?.message || err);
          });
      },
      (progress) => {
        if (progress.total) {
          console.log(`[upload] loading… ${Math.round((progress.loaded / progress.total) * 100)}%`);
        }
      },
      (err) => {
        console.error('[upload] failed to load/parse model:', err);
        setAnalyzing(false);
      }
    );
  };

  const resetFile = () => {
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    setFile(null);
    setFileUrl('');
    setDimensions(EMPTY_DIMS);
    setUploadId(undefined);
  };

  // ---------- cart ----------
  const buildLine = () => {
    const mat = MATERIALS[cfg.material];
    return {
      name: file ? `3D Print — ${file.name}` : '3D Print',
      uploadId,
      fileName: file?.name,
      material: cfg.material,
      materialName: mat.name,
      color: cfg.color,
      colorHex: COLOR_MAP[cfg.color],
      quality: cfg.quality,
      infill: cfg.infill,
      finish: cfg.finish,
      unit: cfg.unit,
      dimensions: scaledDims,
      weightGrams,
      qty: cfg.quantity,
      unitPrice,
    };
  };

  const addToCart = () => {
    if (!hasModel) return;
    addItem(buildLine());
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
    // Best-effort persistence of the quote.
    createQuote({
      uploadId,
      volume: scaledDims.volume,
      material: cfg.material,
      color: cfg.color,
      quality: cfg.quality,
      infill: cfg.infill,
      finish: cfg.finish,
      unit: cfg.unit,
      quantity: cfg.quantity,
    }).catch(() => {});
  };

  const buyNow = () => {
    if (!hasModel) return;
    addItem(buildLine());
    router.push('/checkout');
  };

  const selectedColorName = COLORS.find((c) => c.key === cfg.color)?.name ?? cfg.color;

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-foreground)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-[var(--color-muted)] mb-6">
          <Link href="/" className="hover:text-[var(--color-primary)]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/services" className="hover:text-[var(--color-primary)]">3D Printer Parts</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--color-foreground)]">3D Printing Service</span>
        </nav>

        {/* Hero: viewer + summary */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: viewer / upload */}
          <div className="space-y-4">
            <div className="card relative aspect-square overflow-hidden">
              {!fileUrl ? (
                <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer text-center p-8 border-2 border-dashed border-[var(--color-border)] m-4 rounded-xl hover:border-[var(--color-primary)] transition">
                  <ArrowUpTrayIcon className="h-12 w-12 text-[var(--color-primary)] mb-3" />
                  <span className="font-semibold text-lg">Upload your 3D model</span>
                  <span className="text-sm text-[var(--color-muted)] mt-1">
                    Drag &amp; drop or click — STL / OBJ, up to 50 MB
                  </span>
                  <span className="mt-4 btn-primary !py-2 !px-5 text-sm">Choose File</span>
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
                    className="absolute top-3 right-3 z-10 bg-[var(--color-background)] border border-[var(--color-border)] text-sm px-3 py-1 rounded-full shadow"
                  >
                    Change File
                  </button>
                  {analyzing && (
                    <div className="absolute top-3 left-3 z-10 bg-[var(--color-primary)] text-white text-xs px-3 py-1 rounded-full animate-pulse">
                      Analyzing model…
                    </div>
                  )}
                  <Canvas camera={{ position: [3, 3, 3], fov: 45 }} className="!absolute inset-0">
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />
                    <Suspense fallback={null}>
                      <Bounds fit clip margin={1.2}>
                        <Model fileUrl={fileUrl} colorHex={COLOR_MAP[cfg.color]} fileType={fileType} material={cfg.material} />
                      </Bounds>
                    </Suspense>
                    <OrbitControls makeDefault />
                    <Grid cellSize={1} sectionSize={5} infiniteGrid fadeDistance={30} cellColor="#cbd5e1" sectionColor="#94a3b8" />
                  </Canvas>
                </>
              )}
            </div>

            {/* Dimensions strip */}
            {hasModel && (
              <>
                <div className="card p-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                  <div><span className="text-[var(--color-muted)]">Length</span><br />{formatLength(scaledDims.length, cfg.unit)}</div>
                  <div><span className="text-[var(--color-muted)]">Width</span><br />{formatLength(scaledDims.width, cfg.unit)}</div>
                  <div><span className="text-[var(--color-muted)]">Height</span><br />{formatLength(scaledDims.height, cfg.unit)}</div>
                  <div><span className="text-[var(--color-muted)]">Volume</span><br />{formatVolumeCm3(scaledDims.volume)}</div>
                  <div><span className="text-[var(--color-muted)]">Surface</span><br />{(scaledDims.area / 100).toFixed(2)} cm²</div>
                  <div><span className="text-[var(--color-muted)]">Est. weight</span><br />{formatWeight(weightGrams)}</div>
                </div>

                {/* Model size & units */}
                <div className="card p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Model size &amp; units</span>
                    {scalePct !== 100 || srcUnit !== 'mm' ? (
                      <button
                        onClick={() => { setSrcUnit('mm'); setScalePct(100); }}
                        className="text-xs text-[var(--color-primary)] hover:underline"
                      >
                        Reset
                      </button>
                    ) : null}
                  </div>

                  <div>
                    <span className="text-xs text-[var(--color-muted)] block mb-1">Interpret file units as</span>
                    <div className="flex gap-2">
                      {(['mm', 'cm', 'm', 'inch'] as SourceUnit[]).map((u) => (
                        <button
                          key={u}
                          onClick={() => setSrcUnit(u)}
                          className={`flex-1 py-1.5 rounded-lg border text-sm font-medium transition ${
                            srcUnit === u
                              ? 'bg-[var(--color-primary)] text-white border-transparent'
                              : 'border-[var(--color-border)] text-[var(--color-foreground)]'
                          }`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-[var(--color-muted)]">Scale</span>
                      <span className="text-xs font-semibold text-[var(--color-primary)]">{scalePct}%</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={500}
                      step={5}
                      value={scalePct}
                      onChange={(e) => setScalePct(parseInt(e.target.value, 10))}
                      className="w-full accent-[var(--color-primary)]"
                    />
                  </div>

                  {Math.max(scaledDims.length, scaledDims.width, scaledDims.height) < 5 && (
                    <p className="text-xs text-[var(--color-accent)]">
                      ⚠ This model is very small — if it should be larger, switch units to cm/m or increase the scale.
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Right: product summary + configurator */}
          <div>
            <h1 className="text-3xl font-extrabold mb-2">3D Printing Service</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-[var(--color-star)]">
                {[1, 2, 3, 4, 5].map((n) => <StarIcon key={n} className="h-5 w-5 fill-current" />)}
              </div>
              <span className="text-sm text-[var(--color-muted)]">(124 verified orders)</span>
            </div>

            <ul className="text-sm text-[var(--color-foreground)] space-y-1.5 mb-6">
              <li>✅ Instant volume-based quotation — no waiting</li>
              <li>✅ {COLORS.length}+ colors across PLA, ABS, PETG, Nylon, Resin &amp; TPU</li>
              <li>✅ Multicolor &amp; high-detail printing (down to 0.12 mm layers)</li>
              <li>✅ 1-business-day lead time · Free shipping over ₹499</li>
            </ul>

            <p className="text-xs text-[var(--color-muted)] mb-4">
              Currently selected: <span className="font-medium text-[var(--color-foreground)]">{MATERIALS[cfg.material].name}</span> · {selectedColorName}
            </p>

            <CustomizePanel
              value={cfg}
              onChange={onChange}
              hasModel={hasModel}
              weightGrams={weightGrams}
              unitPrice={unitPrice}
              total={total}
              onAddToCart={addToCart}
              onBuyNow={buyNow}
              added={added}
            />

            {/* Quote breakdown */}
            {hasModel && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold mb-2 text-[var(--color-muted)] uppercase tracking-wide">Quote breakdown</h3>
                <QuoteTable
                  material={cfg.material}
                  quality={cfg.quality}
                  finish={cfg.finish}
                  infill={cfg.infill}
                  quantity={cfg.quantity}
                  weightGrams={weightGrams}
                  unitPrice={unitPrice}
                  total={total}
                />
              </div>
            )}
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          <FeatureCard icon={<TruckIcon className="h-7 w-7" />} title="Free Shipping" description="On all orders over ₹499 across India." />
          <FeatureCard icon={<ClockIcon className="h-7 w-7" />} title="1-Day Lead Time" description="Most prints ship the next business day." />
          <FeatureCard icon={<ShieldCheckIcon className="h-7 w-7" />} title="IP Protection" description="Your designs stay private and secure." />
          <FeatureCard icon={<ChatBubbleLeftRightIcon className="h-7 w-7" />} title="Expert Support" description="Talk to our print engineers any time." />
        </div>

        {/* Tabs */}
        <div className="mt-14">
          <Tab.Group>
            <Tab.List className="flex gap-2 border-b border-[var(--color-border)]">
              {['Description', 'Specifications', 'Reviews'].map((t) => (
                <Tab
                  key={t}
                  className={({ selected }) =>
                    `px-5 py-3 text-sm font-semibold outline-none border-b-2 -mb-px transition ${
                      selected
                        ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                        : 'border-transparent text-[var(--color-muted)] hover:text-[var(--color-foreground)]'
                    }`
                  }
                >
                  {t}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="py-8">
              <Tab.Panel>
                <div className="prose max-w-none text-[var(--color-foreground)] space-y-4">
                  <p>
                    Upload your 3D model and get an <strong>instant, accurate quotation</strong> based on the
                    real volume of your part. Our FDM and resin printers deliver crisp, production-grade
                    parts in a wide range of engineering materials and {COLORS.length}+ colors.
                  </p>
                  <p>
                    Whether you&apos;re prototyping a new product, replacing a broken part, or producing a
                    small batch, Print3DCo handles it end-to-end: design check, printing, finishing and
                    fast doorstep delivery. Choose your material, color, infill and finish — the price
                    updates live as you configure.
                  </p>
                  <ul className="list-disc pl-6">
                    <li>Rapid prototyping &amp; full-scale production</li>
                    <li>Multicolor printing and post-processing (sanding, polishing, dyeing)</li>
                    <li>Strict quality control on every order</li>
                  </ul>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <table className="w-full text-sm card overflow-hidden">
                  <tbody>
                    {[
                      ['Technologies', 'FDM, SLA / DLP / MSLA, SLS'],
                      ['Materials', 'PLA, ABS, PETG, Nylon, Resin, TPU'],
                      ['Colors', `${COLORS.length}+ options`],
                      ['Layer heights', '0.12 mm – 0.30 mm'],
                      ['Max build volume', '300 × 300 × 400 mm'],
                      ['Dimensional tolerance', '± 0.3 mm or ± 0.5%'],
                      ['Infill range', '10% – 100%'],
                      ['Accepted files', 'STL, OBJ (up to 50 MB)'],
                      ['Lead time', '1 business day (typical)'],
                    ].map(([k, v]) => (
                      <tr key={k} className="border-b border-[var(--color-border)] last:border-0">
                        <td className="px-4 py-3 font-medium w-1/3">{k}</td>
                        <td className="px-4 py-3 text-[var(--color-muted)]">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Tab.Panel>
              <Tab.Panel>
                <ProductReviews />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>

        {/* Related */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold mb-6">You may also like</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { title: 'Browse Materials', desc: 'Compare PLA, ABS, PETG, Nylon, Resin & TPU.', href: '/materials' },
              { title: 'Our Services', desc: 'Prototyping, batch production & 3D modeling.', href: '/services' },
              { title: 'Pricing Plans', desc: 'Volume discounts for makers & businesses.', href: '/pricing' },
            ].map((r) => (
              <motion.div key={r.title} whileHover={{ y: -4 }} className="card p-6">
                <h3 className="font-semibold text-lg mb-1">{r.title}</h3>
                <p className="text-sm text-[var(--color-muted)] mb-4">{r.desc}</p>
                <Link href={r.href} className="text-[var(--color-primary)] font-medium hover:underline">
                  Explore →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
