// src/app/cart/page.tsx — cart backed by the shared Zustand store.
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import CartItem from 'src/components/CartItem';
import { useCart } from 'src/hooks/useCart';
import { shippingFor, COUPONS } from 'src/lib/pricing';
import { formatINR } from 'src/utils/formatters';

export default function CartPage() {
  const { items, updateQty, removeItem, clear, subtotal } = useCart();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');

  const applyCoupon = () => {
    const rate = COUPONS[coupon.trim().toUpperCase()] ?? 0;
    setDiscount(rate);
    setCouponMsg(rate > 0 ? `Coupon applied — ${rate * 100}% off!` : 'Invalid coupon code.');
  };

  const shipping = shippingFor(subtotal);
  const discountAmt = subtotal * discount;
  const total = subtotal + shipping - discountAmt;

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-foreground)] min-h-screen p-6">
      <header className="max-w-7xl mx-auto flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Your Cart</h1>
        {items.length > 0 && (
          <button onClick={clear} className="text-sm text-[var(--color-primary)] hover:underline">
            Clear Cart
          </button>
        )}
      </header>

      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-3">
        {/* Items */}
        <section className="lg:col-span-2 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 card">
              <p className="text-[var(--color-muted)] mb-3">Your cart is empty.</p>
              <Link href="/upload" className="btn-primary inline-block">
                Get an Instant Quote
              </Link>
            </div>
          ) : (
            <AnimatePresence>
              {items.map((item) => (
                <CartItem key={item.id} item={item} onQty={updateQty} onRemove={removeItem} />
              ))}
            </AnimatePresence>
          )}
        </section>

        {/* Summary */}
        <aside className="card p-6 flex flex-col space-y-4 h-fit">
          <h2 className="text-2xl font-semibold">Order Summary</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : formatINR(shipping)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[var(--color-success)]">
                <span>Discount ({discount * 100}%)</span>
                <span>-{formatINR(discountAmt)}</span>
              </div>
            )}
            <hr className="my-2 border-[var(--color-border)]" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--color-border)]">
            <label className="block text-sm mb-1" htmlFor="coupon">Coupon Code</label>
            <div className="flex space-x-2">
              <input
                id="coupon"
                type="text"
                placeholder="SAVE10 / SAVE20"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="field flex-1"
              />
              <button onClick={applyCoupon} className="btn-primary !px-4">
                Apply
              </button>
            </div>
            {couponMsg && (
              <p className={`text-xs mt-1 ${discount > 0 ? 'text-[var(--color-success)]' : 'text-[var(--color-primary)]'}`}>
                {couponMsg}
              </p>
            )}
          </div>

          <Link
            href="/checkout"
            className={`mt-auto block text-center btn-primary ${items.length === 0 ? 'pointer-events-none opacity-50' : ''}`}
          >
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
