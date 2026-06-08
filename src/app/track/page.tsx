// src/app/track/page.tsx — guest order lookup by order number.
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, TruckIcon } from '@heroicons/react/24/outline';
import { getOrder } from 'src/services/orderService';

export default function TrackPage() {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const num = orderNumber.trim();
    if (!num) return setError('Please enter your order number.');
    setError('');
    setLoading(true);
    try {
      const order = await getOrder(num);
      router.push(`/orders/${order.orderNumber}`);
    } catch {
      setError('No order found with that number. Please check and try again.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-[var(--color-surface)] min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card max-w-md w-full p-8 text-center"
      >
        <div className="h-14 w-14 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mx-auto mb-4">
          <TruckIcon className="h-7 w-7 text-[var(--color-primary)]" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--color-foreground)] mb-1">Track your order</h1>
        <p className="text-[var(--color-muted)] mb-6">Enter the order number from your confirmation (e.g. P3D-XXXXXX).</p>

        {error && <p className="text-sm text-[var(--color-primary)] mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 text-[var(--color-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="P3D-XXXXXX"
              className="field pl-10 text-center uppercase"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? 'Searching…' : 'Track Order'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
