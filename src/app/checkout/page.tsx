// src/app/checkout/page.tsx — guest checkout with simulated payment.
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useCart } from 'src/hooks/useCart';
import { placeOrder } from 'src/services/orderService';
import { shippingFor, COUPONS } from 'src/lib/pricing';
import { formatINR } from 'src/utils/formatters';
import type { OrderDTO } from 'src/types';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal: string;
  country: string;
  coupon: string;
}

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { country: 'India' } });

  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState<OrderDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  const coupon = watch('coupon');
  const discountRate = (coupon && COUPONS[coupon.trim().toUpperCase()]) || 0;
  const shipping = shippingFor(subtotal);
  const discountAmt = subtotal * discountRate;
  const total = subtotal + shipping - discountAmt;

  const onSubmit = async (data: FormValues) => {
    if (items.length === 0) {
      setError('Your cart is empty.');
      return;
    }
    setPlacing(true);
    setError(null);
    try {
      // Simulated payment gateway delay (no real charge).
      await new Promise((r) => setTimeout(r, 1200));
      const placed = await placeOrder({
        customer: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          postal: data.postal,
          country: data.country,
        },
        items: items.map((it) => ({
          name: it.name,
          quantity: it.qty,
          unitPrice: it.unitPrice,
          config: {
            material: it.materialName,
            color: it.color,
            quality: it.quality,
            infill: it.infill,
            finish: it.finish,
            fileName: it.fileName,
            uploadId: it.uploadId,
          },
        })),
        coupon: data.coupon,
      });
      setOrder(placed);
      clear();
    } catch {
      setError('Could not place the order. Make sure the database is running, then try again.');
    } finally {
      setPlacing(false);
    }
  };

  if (order) {
    return (
      <div className="bg-[var(--color-background)] text-[var(--color-foreground)] min-h-screen flex items-center justify-center p-6">
        <div className="card p-8 text-center max-w-md">
          <CheckCircleIcon className="h-14 w-14 text-[var(--color-success)] mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Order placed!</h2>
          <p className="text-[var(--color-muted)] mb-4">
            Thank you, {order.name}. Your order has been received and is now being processed.
          </p>
          <div className="bg-[var(--color-surface)] rounded-lg p-4 mb-6">
            <p className="text-sm text-[var(--color-muted)]">Order number</p>
            <p className="text-xl font-bold text-[var(--color-primary)]">{order.orderNumber}</p>
            <p className="text-sm mt-2">Total paid: <strong>{formatINR(order.total)}</strong></p>
          </div>
          <div className="flex gap-3 justify-center">
            <Link href={`/orders/${order.orderNumber}`} className="btn-primary">Track Order</Link>
            <Link href="/upload" className="btn-outline">Print Another</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-foreground)] min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 card p-8 space-y-6">
          <h1 className="text-2xl font-bold">Checkout</h1>

          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold mb-2">Shipping details</legend>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1" htmlFor="name">Full Name *</label>
                <input id="name" className="field" {...register('name', { required: 'Name is required' })} />
                {errors.name && <p className="text-xs text-[var(--color-primary)] mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm mb-1" htmlFor="email">Email *</label>
                <input id="email" type="email" className="field"
                  {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } })} />
                {errors.email && <p className="text-xs text-[var(--color-primary)] mt-1">{errors.email.message}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="phone">Phone</label>
              <input id="phone" className="field" {...register('phone')} />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="address">Address *</label>
              <textarea id="address" rows={2} className="field resize-none" {...register('address', { required: 'Address is required' })} />
              {errors.address && <p className="text-xs text-[var(--color-primary)] mt-1">{errors.address.message}</p>}
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-1" htmlFor="city">City</label>
                <input id="city" className="field" {...register('city')} />
              </div>
              <div>
                <label className="block text-sm mb-1" htmlFor="postal">Postal Code</label>
                <input id="postal" className="field" {...register('postal')} />
              </div>
              <div>
                <label className="block text-sm mb-1" htmlFor="country">Country</label>
                <input id="country" className="field" {...register('country')} />
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-lg font-semibold mb-2">Payment</legend>
            <div className="flex items-start gap-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4">
              <LockClosedIcon className="h-5 w-5 text-[var(--color-success)] shrink-0 mt-0.5" />
              <p className="text-sm text-[var(--color-muted)]">
                <strong className="text-[var(--color-foreground)]">Demo payment</strong> — this is a simulated
                gateway for demonstration. No card details are collected and no real charge is made.
              </p>
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="coupon">Coupon (optional)</label>
              <input id="coupon" placeholder="SAVE10 / SAVE20" className="field" {...register('coupon')} />
            </div>
          </fieldset>

          {error && <p className="text-sm text-[var(--color-primary)]">{error}</p>}

          <button type="submit" disabled={placing || items.length === 0} className="btn-primary w-full disabled:opacity-50">
            {placing ? 'Processing payment…' : `Pay ${formatINR(total)} (Demo)`}
          </button>
        </form>

        {/* Summary */}
        <aside className="card p-6 h-fit space-y-3">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          {items.length === 0 ? (
            <p className="text-sm text-[var(--color-muted)]">
              Your cart is empty. <Link href="/upload" className="text-[var(--color-primary)]">Add a print →</Link>
            </p>
          ) : (
            <ul className="space-y-2 text-sm max-h-64 overflow-auto">
              {items.map((it) => (
                <li key={it.id} className="flex justify-between gap-2">
                  <span className="truncate">{it.name} ×{it.qty}</span>
                  <span className="shrink-0">{formatINR(it.unitPrice * it.qty)}</span>
                </li>
              ))}
            </ul>
          )}
          <hr className="border-[var(--color-border)]" />
          <div className="text-sm space-y-1">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : formatINR(shipping)}</span></div>
            {discountRate > 0 && (
              <div className="flex justify-between text-[var(--color-success)]"><span>Discount</span><span>-{formatINR(discountAmt)}</span></div>
            )}
            <div className="flex justify-between font-bold text-base pt-1"><span>Total</span><span>{formatINR(total)}</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}
