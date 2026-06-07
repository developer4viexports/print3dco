// src/app/orders/[id]/page.tsx — guest order status / tracking page.
'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useOrderStatus } from 'src/hooks/useOrderStatus';
import { formatINR, formatDate } from 'src/utils/formatters';

const STAGES = ['PROCESSING', 'PRINTING', 'SHIPPED', 'DELIVERED'];

export default function OrderStatusPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { order, loading, error } = useOrderStatus(id);

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-foreground)] min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm text-[var(--color-primary)] hover:underline">← Back to home</Link>

        {loading && <p className="mt-8 text-[var(--color-muted)]">Loading order…</p>}
        {error && (
          <div className="mt-8 card p-8 text-center">
            <p className="text-[var(--color-muted)]">{error}</p>
          </div>
        )}

        {order && (
          <div className="mt-6 space-y-6">
            <div className="card p-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h1 className="text-2xl font-bold">Order {order.orderNumber}</h1>
                  <p className="text-sm text-[var(--color-muted)]">Placed {formatDate(order.createdAt)}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-[var(--color-surface)] border border-[var(--color-border)]">
                  {order.status}
                </span>
              </div>

              {/* Progress */}
              <div className="flex items-center justify-between mt-6">
                {STAGES.map((stage, i) => {
                  const reached = STAGES.indexOf(order.status) >= i;
                  return (
                    <React.Fragment key={stage}>
                      <div className="flex flex-col items-center gap-1">
                        <CheckCircleIcon className={`h-7 w-7 ${reached ? 'text-[var(--color-success)]' : 'text-[var(--color-border)]'}`} />
                        <span className="text-[10px] sm:text-xs text-[var(--color-muted)]">{stage}</span>
                      </div>
                      {i < STAGES.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-1 ${STAGES.indexOf(order.status) > i ? 'bg-[var(--color-success)]' : 'bg-[var(--color-border)]'}`} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Items */}
            <div className="card p-6">
              <h2 className="font-semibold mb-3">Items</h2>
              <ul className="divide-y divide-[var(--color-border)]">
                {order.items.map((it) => (
                  <li key={it.id} className="py-3 flex justify-between gap-2 text-sm">
                    <div>
                      <p className="font-medium">{it.name} ×{it.quantity}</p>
                      <p className="text-xs text-[var(--color-muted)]">
                        {Object.entries(it.config)
                          .filter(([, v]) => v)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(' · ')}
                      </p>
                    </div>
                    <span className="shrink-0 font-medium">{formatINR(it.unitPrice * it.quantity)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Totals + shipping */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="card p-6 text-sm space-y-1">
                <h2 className="font-semibold mb-2">Payment</h2>
                <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(order.subtotal)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{order.shipping === 0 ? 'FREE' : formatINR(order.shipping)}</span></div>
                {order.discount > 0 && <div className="flex justify-between text-[var(--color-success)]"><span>Discount</span><span>-{formatINR(order.discount)}</span></div>}
                <div className="flex justify-between font-bold pt-1"><span>Total</span><span>{formatINR(order.total)}</span></div>
                {order.paymentRef && <p className="text-xs text-[var(--color-muted)] pt-2">Ref: {order.paymentRef}</p>}
              </div>
              <div className="card p-6 text-sm">
                <h2 className="font-semibold mb-2">Ship to</h2>
                <p>{order.name}</p>
                <p className="text-[var(--color-muted)]">{order.address}</p>
                <p className="text-[var(--color-muted)]">
                  {[order.city, order.postal, order.country].filter(Boolean).join(', ')}
                </p>
                <p className="text-[var(--color-muted)] mt-1">{order.email}</p>
                {order.phone && <p className="text-[var(--color-muted)]">{order.phone}</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
