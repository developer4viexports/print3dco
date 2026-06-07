// A single cart line row used by the cart page.
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrashIcon } from '@heroicons/react/24/outline';
import type { CartLine } from 'src/types';
import { formatINR, formatWeight } from 'src/utils/formatters';

interface Props {
  item: CartLine;
  onQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({ item, onQty, onRemove }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="card p-4 flex items-center gap-4"
    >
      {/* Color/thumbnail swatch */}
      <div
        className="w-16 h-16 rounded-lg border border-[var(--color-border)] shrink-0 flex items-center justify-center"
        style={{ backgroundColor: item.colorHex }}
      >
        <span className="text-[10px] text-black/50 font-medium">{item.material}</span>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-[var(--color-foreground)] truncate">{item.name}</h3>
        <p className="text-xs text-[var(--color-muted)]">
          {item.materialName} · {item.color} · {item.quality} · {item.infill}% infill · {item.finish}
        </p>
        <p className="text-xs text-[var(--color-muted)]">
          {formatINR(item.unitPrice)} each · ~{formatWeight(item.weightGrams)}/unit
        </p>
        <div className="mt-2 flex items-center gap-2">
          <button
            onClick={() => onQty(item.id, item.qty - 1)}
            className="px-2 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)]"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            type="number"
            min={1}
            value={item.qty}
            onChange={(e) => onQty(item.id, parseInt(e.target.value, 10) || 1)}
            className="w-14 p-1 border border-[var(--color-border)] rounded text-center bg-transparent"
          />
          <button
            onClick={() => onQty(item.id, item.qty + 1)}
            className="px-2 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)]"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <button
          onClick={() => onRemove(item.id)}
          className="p-1.5 rounded hover:bg-[var(--color-surface)] transition"
          aria-label="Remove item"
        >
          <TrashIcon className="h-5 w-5 text-[var(--color-primary)]" />
        </button>
        <span className="font-bold text-[var(--color-foreground)]">{formatINR(item.unitPrice * item.qty)}</span>
      </div>
    </motion.div>
  );
}
