// src/app/account/page.tsx — signed-in user's profile + order history.
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ClipboardDocumentListIcon, ArrowRightOnRectangleIcon, CubeIcon } from '@heroicons/react/24/outline';
import { useAuth } from 'src/hooks/useAuth';
import { listMyOrders } from 'src/services/orderService';
import { formatINR, formatDate } from 'src/utils/formatters';
import type { OrderDTO } from 'src/types';

const STATUS_STYLES: Record<string, string> = {
  PROCESSING: 'bg-amber-100 text-amber-800',
  PRINTING: 'bg-blue-100 text-blue-800',
  SHIPPED: 'bg-indigo-100 text-indigo-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-700',
};

export default function AccountPage() {
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth();
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) router.push('/login?redirect=/account');
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;
    listMyOrders()
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (authLoading || !user) {
    return <div className="min-h-screen bg-[var(--color-surface)]" />;
  }

  return (
    <div className="bg-[var(--color-surface)] min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Profile header */}
        <div className="card p-6 flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-2xl font-bold text-[var(--color-primary)]">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--color-foreground)]">{user.name}</h1>
              <p className="text-sm text-[var(--color-muted)]">{user.email}</p>
            </div>
          </div>
          <div className="flex gap-3">
            {user.role === 'ADMIN' && (
              <Link href="/admin" className="btn-outline !py-2 !px-4 text-sm">Admin Dashboard</Link>
            )}
            <button onClick={handleLogout} className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] font-medium">
              <ArrowRightOnRectangleIcon className="h-5 w-5" /> Sign Out
            </button>
          </div>
        </div>

        {/* Orders */}
        <h2 className="flex items-center gap-2 text-lg font-semibold text-[var(--color-foreground)] mb-4">
          <ClipboardDocumentListIcon className="h-6 w-6 text-[var(--color-primary)]" /> Order History
        </h2>

        {loading ? (
          <p className="text-[var(--color-muted)]">Loading orders…</p>
        ) : orders.length === 0 ? (
          <div className="card p-10 text-center">
            <CubeIcon className="h-12 w-12 text-[var(--color-muted)] mx-auto mb-3" />
            <p className="text-[var(--color-muted)] mb-4">You haven&apos;t placed any orders yet.</p>
            <Link href="/upload" className="btn-primary inline-block">Get an Instant Quote</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((o, i) => (
              <motion.div
                key={o.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link href={`/orders/${o.orderNumber}`} className="card p-5 flex items-center justify-between gap-4 hover:shadow-md transition block">
                  <div>
                    <p className="font-semibold text-[var(--color-foreground)]">{o.orderNumber}</p>
                    <p className="text-xs text-[var(--color-muted)]">
                      {formatDate(o.createdAt)} · {o.items.length} item{o.items.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[o.status] ?? 'bg-[var(--color-surface)] text-[var(--color-muted)]'}`}>
                      {o.status}
                    </span>
                    <span className="font-bold text-[var(--color-foreground)]">{formatINR(o.total)}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
