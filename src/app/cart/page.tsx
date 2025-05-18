// src/app/cart/page.tsx
'use client';

import React, { useState, ChangeEvent, useEffect } from 'react';
import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface CartItem {
    id: string;
    name: string;
    qty: number;
    price: number; // per unit
    thumbnail: string;
}

export default function Page() {
    const [items, setItems] = useState<CartItem[]>(() => {
        // load from localStorage if exists
        if (typeof window === 'undefined') return [];
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [
            { id: '1', name: 'FDM Printed Gear (PLA)', qty: 2, price: 249.5, thumbnail: '/images/gear-thumb.png' },
            { id: '2', name: 'SLA Prototype Case', qty: 1, price: 799.0, thumbnail: '/images/case-thumb.png' },
        ];
    });
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);

    // persist cart
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const handleQtyChange = (id: string, e: ChangeEvent<HTMLInputElement>) => {
        const val = Math.max(1, parseInt(e.target.value, 10) || 1);
        setItems(items.map(item => item.id === id ? { ...item, qty: val } : item));
    };

    const adjustQty = (id: string, delta: number) => {
        setItems(items.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
    };

    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    const clearCart = () => setItems([]);

    const applyCoupon = () => {
        if (coupon.toUpperCase() === 'SAVE10') setDiscount(0.1);
        else if (coupon.toUpperCase() === 'SAVE20') setDiscount(0.2);
        else setDiscount(0);
    };

    const subtotal = items.reduce((sum, itm) => sum + itm.price * itm.qty, 0);
    const shipping = subtotal > 0 ? 49 : 0;
    const discountAmt = subtotal * discount;
    const total = subtotal + shipping - discountAmt;

    return (
        <div className="bg-[var(--color-background)] text-[var(--color-foreground)] min-h-screen p-6">
            <header className="max-w-7xl mx-auto flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold">Your Cart</h1>
                {items.length > 0 && (
                    <button
                        onClick={clearCart}
                        className="text-sm text-[var(--color-secondary)] hover:underline"
                    >
                        Clear Cart
                    </button>
                )}
            </header>

            <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-3">
                {/* Cart Items */}
                <section className="lg:col-span-2 space-y-4">
                    {items.length === 0 ? (
                        <div className="text-center py-12 opacity-70">
                            <p>Your cart is empty.</p>
                            <Link href="/services" className="text-[var(--color-primary)] hover:underline">
                                Continue Shopping →
                            </Link>
                        </div>
                    ) : (
                        <AnimatePresence>
                            {items.map(item => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 30 }}
                                    className="flex items-center bg-[var(--color-foreground)]/5 p-4 rounded-xl shadow-sm"
                                >
                                    <img
                                        src={item.thumbnail}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded-lg mr-4"
                                    />
                                    <div className="flex-1">
                                        <h2 className="font-semibold">{item.name}</h2>
                                        <p className="text-sm opacity-70">₹{item.price.toFixed(2)} each</p>
                                        <div className="mt-2 flex items-center space-x-2">
                                            <button
                                                onClick={() => adjustQty(item.id, -1)}
                                                className="px-2 py-1 bg-[var(--color-secondary)]/20 rounded"
                                                aria-label="Decrease quantity"
                                            >-</button>
                                            <input
                                                id={`qty-${item.id}`}
                                                type="number"
                                                min={1}
                                                value={item.qty}
                                                onChange={e => handleQtyChange(item.id, e)}
                                                className="w-16 p-1 border border-[var(--color-secondary)] rounded text-center"
                                            />
                                            <button
                                                onClick={() => adjustQty(item.id, 1)}
                                                className="px-2 py-1 bg-[var(--color-secondary)]/20 rounded"
                                                aria-label="Increase quantity"
                                            >+</button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end space-y-2">
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="p-1 rounded hover:bg-[var(--color-secondary)]/20 transition"
                                            aria-label="Remove item"
                                        >
                                            <TrashIcon className="h-5 w-5 text-[var(--color-secondary)]" />
                                        </button>
                                        <span className="font-semibold">₹{(item.price * item.qty).toFixed(2)}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </section>

                {/* Summary */}
                <aside className="bg-[var(--color-foreground)]/10 p-6 rounded-2xl shadow-md flex flex-col space-y-4">
                    <h2 className="text-2xl font-semibold mb-2">Order Summary</h2>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>₹{shipping.toFixed(2)}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between text-[var(--color-accent)]">
                                <span>Discount ({discount * 100}%)</span>
                                <span>-₹{discountAmt.toFixed(2)}</span>
                            </div>
                        )}
                        <hr className="my-2 border-[var(--color-secondary)]/30" />
                        <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-[var(--color-secondary)]/30">
                        <label className="block text-sm mb-1" htmlFor="coupon">Coupon Code</label>
                        <div className="flex space-x-2">
                            <input
                                id="coupon"
                                type="text"
                                placeholder="Enter code"
                                value={coupon}
                                onChange={e => setCoupon(e.target.value)}
                                className="flex-1 p-2 border border-[var(--color-secondary)] rounded"
                            />
                            <button
                                onClick={applyCoupon}
                                className="px-4 bg-[var(--color-primary)] text-[var(--color-background)] rounded hover:opacity-90 transition"
                            >
                                Apply
                            </button>
                        </div>
                    </div>

                    <Link
                        href="/checkout"
                        className="mt-auto block bg-[var(--color-primary)] text-[var(--color-background)] text-center py-3 rounded-full font-medium hover:opacity-90 transition"
                    >
                        Proceed to Checkout
                    </Link>
                </aside>
            </div>
        </div>
    );
}
