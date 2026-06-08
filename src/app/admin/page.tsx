// src/app/admin/page.tsx — admin orders dashboard (route guarded by middleware).
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { listMyOrders, updateOrderStatus } from 'src/services/orderService';
import { formatINR, formatDate } from 'src/utils/formatters';
import type { OrderDTO } from 'src/types';

const STATUSES = ['PROCESSING', 'PRINTING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

const STATUS_STYLES: Record<string, string> = {
  PROCESSING: 'bg-amber-100 text-amber-800',
  PRINTING: 'bg-blue-100 text-blue-800',
  SHIPPED: 'bg-indigo-100 text-indigo-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-700',
};

export default function AdminPage() {
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    listMyOrders()
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const onStatusChange = async (id: string, status: string) => {
    setSavingId(id);
    try {
      const updated = await updateOrderStatus(id, status);
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: updated.status } : o)));
    } catch {
      /* ignore — keep previous value */
    } finally {
      setSavingId(null);
    }
  };

  const stats = useMemo(() => {
    const revenue = orders.reduce((s, o) => s + o.total, 0);
    const pending = orders.filter((o) => o.status === 'PROCESSING' || o.status === 'PRINTING').length;
    return { count: orders.length, revenue, pending };
  }, [orders]);

  return (
    <div className="bg-[var(--color-surface)] min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
          <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Admin · Orders</h1>
          <Link href="/" className="text-sm text-[var(--color-primary)] hover:underline">← Back to site</Link>
        </div>

        {/* Stat cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="card p-5">
            <p className="text-sm text-[var(--color-muted)]">Total orders</p>
            <p className="text-2xl font-extrabold text-[var(--color-foreground)]">{stats.count}</p>
          </div>
          <div className="card p-5">
            <p className="text-sm text-[var(--color-muted)]">Revenue</p>
            <p className="text-2xl font-extrabold text-[var(--color-primary)]">{formatINR(stats.revenue)}</p>
          </div>
          <div className="card p-5">
            <p className="text-sm text-[var(--color-muted)]">In progress</p>
            <p className="text-2xl font-extrabold text-[var(--color-foreground)]">{stats.pending}</p>
          </div>
        </div>

        {loading ? (
          <p className="text-[var(--color-muted)]">Loading orders…</p>
        ) : orders.length === 0 ? (
          <div className="card p-10 text-center text-[var(--color-muted)]">No orders yet.</div>
        ) : (
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[var(--color-muted)] border-b border-[var(--color-border)]">
                  <th className="px-4 py-3 font-medium">Order</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Items</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface)]">
                    <td className="px-4 py-3">
                      <Link href={`/orders/${o.orderNumber}`} className="font-medium text-[var(--color-primary)] hover:underline">
                        {o.orderNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-[var(--color-foreground)]">{o.name}</p>
                      <p className="text-xs text-[var(--color-muted)]">{o.email}</p>
                    </td>
                    <td className="px-4 py-3 text-[var(--color-muted)]">{formatDate(o.createdAt)}</td>
                    <td className="px-4 py-3 text-[var(--color-muted)]">{o.items.length}</td>
                    <td className="px-4 py-3 font-semibold text-[var(--color-foreground)]">{formatINR(o.total)}</td>
                    <td className="px-4 py-3">
                      <select
                        value={o.status}
                        disabled={savingId === o.id}
                        onChange={(e) => onStatusChange(o.id, e.target.value)}
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold border-0 cursor-pointer ${STATUS_STYLES[o.status] ?? ''}`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
