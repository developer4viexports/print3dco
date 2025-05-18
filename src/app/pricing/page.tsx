// src/app/pricing/page.tsx
'use client';

import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const tiers = [
    {
        name: 'Starter',
        price: '₹499',
        frequency: 'per model',
        features: [
            'Basic FDM printing',
            'Standard PLA & ABS',
            '0.2 mm layer resolution',
            'Email support',
        ],
        highlighted: false,
    },
    {
        name: 'Professional',
        price: '₹1,199',
        frequency: 'per model',
        features: [
            'Premium SLA printing',
            'Wide material selection',
            '0.1 mm layer resolution',
            'Priority support',
            'Free 30 min design consult',
        ],
        highlighted: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        frequency: 'contact us',
        features: [
            'SLS & DMLS printing',
            'Engineering-grade polymers & metals',
            'Dedicated account manager',
            'Volume discounts',
            'On-site support',
        ],
        highlighted: false,
    },
];

export default function PricingPage() {
    return (
        <div className="bg-[var(--color-background)] text-[var(--color-foreground)]">
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-[var(--color-background)] py-24">
                {/* Decorative blobs */}
                <motion.div
                    className="absolute -top-20 -left-20 w-72 h-72 bg-[var(--color-background)] opacity-10 rounded-full filter blur-2xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 12, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -bottom-20 -right-20 w-96 h-96 bg-[var(--color-background)] opacity-10 rounded-full filter blur-3xl"
                    animate={{ scale: [1, 0.8, 1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <motion.h1
                        className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Our Pricing Plans
                    </motion.h1>
                    <motion.p
                        className="text-lg opacity-80"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Flexible options for hobbyists, professionals, and enterprise clients.
                    </motion.p>
                </div>
            </section>

            {/* Plans */}
            <section className="py-20 px-6 max-w-6xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-3">
                {tiers.map((tier) => (
                    <motion.div
                        key={tier.name}
                        className={`relative flex flex-col bg-[var(--color-background)] rounded-3xl border-t-4 shadow-lg overflow-hidden
              ${tier.highlighted ? 'border-[var(--color-primary)] shadow-2xl' : 'border-[var(--color-secondary)]'}`}
                        whileHover={{ y: -8, scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        {tier.highlighted && (
                            <span className="absolute top-0 right-0 bg-[var(--color-accent)] text-[var(--color-background)] text-xs font-bold px-3 py-1 rounded-bl-lg">
                                Most Popular
                            </span>
                        )}
                        <div className="p-8 flex-1 flex flex-col">
                            <h2 className="text-2xl font-semibold mb-2 text-center">{tier.name}</h2>
                            <div className="text-center mb-6">
                                <span className="text-4xl font-bold block">{tier.price}</span>
                                <span className="uppercase text-sm opacity-70">{tier.frequency}</span>
                            </div>
                            <ul className="flex-1 space-y-4 mb-6">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-start">
                                        <CheckIcon className="h-5 w-5 text-[var(--color-secondary)] mt-1 mr-2" />
                                        <span className="leading-relaxed">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <div>
                                <a
                                    href={tier.name === 'Enterprise' ? '/contact' : '/upload'}
                                    className={`block text-center py-3 rounded-full font-medium text-[var(--color-background)]
                    ${tier.highlighted ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-secondary)]'}
                    hover:opacity-90 transition`}
                                >
                                    {tier.name === 'Enterprise' ? 'Contact Us' : 'Get Started'}
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* FAQ */}
            <section className="bg-[var(--color-background)]/50 py-16">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-semibold text-center mb-8 text-[var(--color-foreground)]">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {[
                            {
                                q: 'Can I switch plans later?',
                                a: 'Yes! You can upgrade or downgrade anytime via your dashboard.',
                            },
                            {
                                q: 'Are there bulk discounts?',
                                a: 'Enterprise clients receive volume-based pricing and dedicated support.',
                            },
                            {
                                q: 'Which file formats are supported?',
                                a: 'STL, OBJ, STEP, and more — upload directly in our app.',
                            },
                        ].map(({ q, a }, idx) => (
                            <motion.div
                                key={idx}
                                className="p-4 bg-[var(--color-foreground)]/10 rounded-xl hover:bg-[var(--color-foreground)]/20 transition"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <p className="font-medium">{q}</p>
                                <p className="mt-1 text-[var(--color-foreground)]/80 leading-relaxed">{a}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
