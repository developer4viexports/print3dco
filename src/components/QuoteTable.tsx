// Cost breakdown table for the current quote, rendered with @tanstack/react-table.
'use client';

import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { MATERIALS, QUALITY, FINISHES } from 'src/lib/pricing';
import { formatINR, formatWeight } from 'src/utils/formatters';

interface Row {
  label: string;
  detail: string;
  value: string;
}

interface Props {
  material: string;
  quality: string;
  finish: string;
  infill: number;
  quantity: number;
  weightGrams: number;
  unitPrice: number;
  total: number;
}

const col = createColumnHelper<Row>();

export default function QuoteTable({
  material,
  quality,
  finish,
  infill,
  quantity,
  weightGrams,
  unitPrice,
  total,
}: Props) {
  const data = useMemo<Row[]>(() => {
    const mat = MATERIALS[material] ?? MATERIALS.PLA;
    const q = QUALITY[quality] ?? QUALITY['0.4mm'];
    const f = FINISHES[finish] ?? FINISHES.None;
    return [
      { label: 'Material', detail: `${mat.name} · ${formatINR(mat.price)}/g`, value: mat.tech },
      { label: 'Est. weight', detail: `at ${infill}% infill`, value: formatWeight(weightGrams) },
      { label: 'Quality', detail: q.label, value: `×${q.mult}` },
      { label: 'Finish', detail: f.label, value: `×${f.mult}` },
      { label: 'Unit price', detail: 'per piece', value: formatINR(unitPrice) },
      { label: 'Quantity', detail: 'pieces', value: `×${quantity}` },
    ];
  }, [material, quality, finish, infill, quantity, weightGrams, unitPrice]);

  const columns = useMemo(
    () => [
      col.accessor('label', { header: 'Item', cell: (c) => <span className="font-medium">{c.getValue()}</span> }),
      col.accessor('detail', { header: 'Detail', cell: (c) => <span className="text-[var(--color-muted)]">{c.getValue()}</span> }),
      col.accessor('value', { header: '', cell: (c) => <span className="text-right block">{c.getValue()}</span> }),
    ],
    []
  );

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="card overflow-hidden">
      <table className="w-full text-sm">
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-[var(--color-border)] last:border-0">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2.5">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          <tr className="bg-[var(--color-surface)] font-bold">
            <td className="px-4 py-3" colSpan={2}>
              Total
            </td>
            <td className="px-4 py-3 text-right text-[var(--color-primary)]">{formatINR(total)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
