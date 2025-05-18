// src/app/checkout/page.tsx
'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        postal: '',
        country: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // TODO: integrate payment gateway
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bg-[var(--color-background)] text-[var(--color-foreground)] min-h-screen flex items-center justify-center p-6">
                <div className="bg-[var(--color-foreground)]/10 p-8 rounded-2xl shadow-lg text-center max-w-md">
                    <h2 className="text-2xl font-semibold mb-4">Thank you for your order!</h2>
                    <p className="mb-6">We’ve received your payment and are processing your request. You’ll receive a confirmation email shortly.</p>
                    <Link
                        href="/"
                        className="inline-block mt-4 bg-[var(--color-primary)] text-[var(--color-background)] px-6 py-3 rounded-full hover:opacity-90 transition"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[var(--color-background)] text-[var(--color-foreground)] min-h-screen py-12 px-6">
            <div className="max-w-3xl mx-auto bg-[var(--color-foreground)]/10 p-8 rounded-2xl shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Checkout & Payment</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <fieldset className="space-y-4">
                        <legend className="text-xl font-semibold">Billing Details</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-1" htmlFor="name">Full Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-[var(--color-secondary)] rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1" htmlFor="email">Email Address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-[var(--color-secondary)] rounded"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm mb-1" htmlFor="address">Address</label>
                            <textarea
                                id="address"
                                name="address"
                                rows={2}
                                value={form.address}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-[var(--color-secondary)] rounded resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1" htmlFor="city">City</label>
                            <input
                                id="city"
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-[var(--color-secondary)] rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1" htmlFor="postal">Postal Code</label>
                            <input
                                id="postal"
                                name="postal"
                                value={form.postal}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-[var(--color-secondary)] rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1" htmlFor="country">Country</label>
                            <input
                                id="country"
                                name="country"
                                value={form.country}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-[var(--color-secondary)] rounded"
                            />
                        </div>
                    </fieldset>

                    <fieldset className="space-y-4">
                        <legend className="text-xl font-semibold">Payment Information</legend>
                        <div>
                            <label className="block text-sm mb-1" htmlFor="cardNumber">Card Number</label>
                            <input
                                id="cardNumber"
                                name="cardNumber"
                                value={form.cardNumber}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-[var(--color-secondary)] rounded"
                                placeholder="1234 5678 9012 3456"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-1" htmlFor="expiry">Expiry (MM/YY)</label>
                                <input
                                    id="expiry"
                                    name="expiry"
                                    value={form.expiry}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-[var(--color-secondary)] rounded"
                                    placeholder="MM/YY"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1" htmlFor="cvc">CVC</label>
                                <input
                                    id="cvc"
                                    name="cvc"
                                    value={form.cvc}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-[var(--color-secondary)] rounded"
                                    placeholder="123"
                                />
                            </div>
                        </div>
                    </fieldset>

                    <button
                        type="submit"
                        className="w-full bg-[var(--color-secondary)] text-[var(--color-background)] py-3 rounded-full font-medium hover:opacity-90 transition mt-4"
                    >
                        Pay & Confirm
                    </button>
                </form>
            </div>
        </div>
    );
}
