// Configurator panel for the 3D printing product page.
'use client';

import React from 'react';
import { ShoppingCartIcon, BoltIcon } from '@heroicons/react/24/outline';
import { MATERIALS, QUALITY, FINISHES, COLORS } from 'src/lib/pricing';
import { formatINR, formatWeight } from 'src/utils/formatters';

export interface ConfiguratorValue {
  material: string;
  color: string;
  quality: string;
  infill: number;
  finish: string;
  unit: 'mm' | 'inch';
  quantity: number;
}

interface Props {
  value: ConfiguratorValue;
  onChange: <K extends keyof ConfiguratorValue>(key: K, val: ConfiguratorValue[K]) => void;
  hasModel: boolean;
  weightGrams: number;
  unitPrice: number;
  total: number;
  onAddToCart: () => void;
  onBuyNow: () => void;
  added?: boolean;
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="block text-sm font-medium text-[var(--color-foreground)] mb-1.5">{children}</span>
);

export default function CustomizePanel({
  value,
  onChange,
  hasModel,
  weightGrams,
  unitPrice,
  total,
  onAddToCart,
  onBuyNow,
  added,
}: Props) {
  return (
    <div className="space-y-5">
      {/* Material */}
      <div>
        <Label>Material</Label>
        <select
          value={value.material}
          onChange={(e) => onChange('material', e.target.value)}
          className="field"
        >
          {Object.values(MATERIALS).map((m) => (
            <option key={m.key} value={m.key}>
              {m.name} — {m.tech}
            </option>
          ))}
        </select>
      </div>

      {/* Color */}
      <div>
        <Label>
          Color <span className="text-[var(--color-muted)] font-normal">({COLORS.length} options)</span>
        </Label>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c.key}
              type="button"
              title={c.name}
              onClick={() => onChange('color', c.key)}
              style={{ backgroundColor: c.hex }}
              className={`w-7 h-7 rounded-full border transition ${
                value.color === c.key
                  ? 'ring-2 ring-offset-2 ring-[var(--color-primary)] border-transparent'
                  : 'border-[var(--color-border)]'
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-[var(--color-muted)] mt-1.5">
          Selected: {COLORS.find((c) => c.key === value.color)?.name}
        </p>
      </div>

      {/* Quality */}
      <div>
        <Label>Print Quality</Label>
        <select
          value={value.quality}
          onChange={(e) => onChange('quality', e.target.value)}
          className="field"
        >
          {Object.entries(QUALITY).map(([key, q]) => (
            <option key={key} value={key}>
              {q.label}
            </option>
          ))}
        </select>
      </div>

      {/* Infill */}
      <div>
        <Label>
          Infill: <span className="text-[var(--color-primary)] font-semibold">{value.infill}%</span>
        </Label>
        <input
          type="range"
          min={10}
          max={100}
          step={5}
          value={value.infill}
          onChange={(e) => onChange('infill', parseInt(e.target.value, 10))}
          className="w-full accent-[var(--color-primary)]"
        />
        <div className="flex justify-between text-xs text-[var(--color-muted)]">
          <span>Lighter (10%)</span>
          <span>Solid (100%)</span>
        </div>
      </div>

      {/* Finish + Unit */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Finish</Label>
          <select
            value={value.finish}
            onChange={(e) => onChange('finish', e.target.value)}
            className="field"
          >
            {Object.entries(FINISHES).map(([key, f]) => (
              <option key={key} value={key}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label>Units</Label>
          <div className="flex gap-2">
            {(['mm', 'inch'] as const).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => onChange('unit', u)}
                className={`flex-1 py-2 rounded-lg border text-sm font-medium transition ${
                  value.unit === u
                    ? 'bg-[var(--color-primary)] text-white border-transparent'
                    : 'border-[var(--color-border)] text-[var(--color-foreground)]'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quantity */}
      <div>
        <Label>Quantity</Label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onChange('quantity', Math.max(1, value.quantity - 1))}
            className="w-10 h-10 rounded-lg border border-[var(--color-border)] text-lg"
          >
            −
          </button>
          <input
            type="number"
            min={1}
            value={value.quantity}
            onChange={(e) => onChange('quantity', Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="field text-center w-20"
          />
          <button
            type="button"
            onClick={() => onChange('quantity', value.quantity + 1)}
            className="w-10 h-10 rounded-lg border border-[var(--color-border)] text-lg"
          >
            +
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="rounded-xl bg-[var(--color-surface)] p-4 border border-[var(--color-border)]">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-[var(--color-muted)]">Estimated price</p>
            <p className="text-3xl font-extrabold text-[var(--color-primary)]">{formatINR(total)}</p>
          </div>
          <div className="text-right text-sm text-[var(--color-muted)]">
            <p>{formatINR(unitPrice)} / unit</p>
            <p>~{formatWeight(weightGrams)} / unit</p>
          </div>
        </div>
        {!hasModel && (
          <p className="text-xs text-[var(--color-muted)] mt-2">
            Upload a model to get an accurate volume-based price.
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onAddToCart}
          disabled={!hasModel}
          className="btn-outline flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCartIcon className="h-5 w-5" />
          {added ? 'Added!' : 'Add to Cart'}
        </button>
        <button
          type="button"
          onClick={onBuyNow}
          disabled={!hasModel}
          className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <BoltIcon className="h-5 w-5" />
          Buy Now
        </button>
      </div>
    </div>
  );
}
