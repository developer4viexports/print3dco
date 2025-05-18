// src/app/materials/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    CubeIcon,
    ShieldCheckIcon,
    SparklesIcon,
    AdjustmentsHorizontalIcon,
    Cog6ToothIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';

interface Material {
    name: string;
    description: string;
    density: string;
    icon: React.ReactNode;
}

const MATERIALS: Material[] = [
    {
        name: 'PLA (Polylactic Acid)',
        description: 'Biodegradable, easy-to-print thermoplastic with low warping—perfect for general prototypes.',
        density: '1.24 g/cm³',
        icon: <CubeIcon className="h-12 w-12 text-[var(--color-secondary)]" />,
    },
    {
        name: 'ABS (Acrylonitrile Butadiene Styrene)',
        description: 'Durable, heat-resistant polymer ideal for functional parts and enclosures.',
        density: '1.04 g/cm³',
        icon: <ShieldCheckIcon className="h-12 w-12 text-[var(--color-secondary)]" />,
    },
    {
        name: 'PETG (Polyethylene Terephthalate Glycol)',
        description: 'Strong, chemical-resistant, with a slight translucency—excellent for mechanical components.',
        density: '1.27 g/cm³',
        icon: <SparklesIcon className="h-12 w-12 text-[var(--color-secondary)]" />,
    },
    {
        name: 'Nylon (Polyamide)',
        description: 'Flexible under load, wear-resistant for gears and functional assemblies.',
        density: '1.15 g/cm³',
        icon: <AdjustmentsHorizontalIcon className="h-12 w-12 text-[var(--color-secondary)]" />,
    },
    {
        name: 'Resin (Photopolymer)',
        description: 'Ultra-fine detail and smooth finishes for SLA/DLP prints, ideal for jewelry and dental.',
        density: '1.20 g/cm³',
        icon: <AdjustmentsHorizontalIcon className="h-12 w-12 text-[var(--color-secondary)]" />,
    },
    {
        name: 'Metal (Stainless, Alumi, Titanium)',
        description: 'High-strength metal parts via DMLS/SLM—suitable for aerospace and medical.',
        density: '7.8 g/cm³',
        icon: <Cog6ToothIcon className="h-12 w-12 text-[var(--color-secondary)]" />,
    },
    {
        name: 'TPU (Flexible Polyurethane)',
        description: 'Elastic, impact-resistant elastomer for flexible prototypes and wearable parts.',
        density: '1.21 g/cm³',
        icon: <ShieldCheckIcon className="h-12 w-12 text-[var(--color-secondary)]" />,
    },
    {
        name: 'PEEK (Polyether Ether Ketone)',
        description: 'High-performance engineering polymer for extreme environments and chemical resistance.',
        density: '1.30 g/cm³',
        icon: <SparklesIcon className="h-12 w-12 text-[var(--color-secondary)]" />,
    },
];

export default function MaterialsPage() {
    return (
        <div className="bg-[var(--color-background)] text-[var(--color-foreground)]">
            {/* Hero Banner with Blurs */}
            <section className="relative overflow-hidden bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-[var(--color-background)] py-24">
                <motion.div
                    className="absolute -top-24 -left-24 w-72 h-72 bg-[var(--color-background)] opacity-10 rounded-full filter blur-3xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 12, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -bottom-24 -right-24 w-96 h-96 bg-[var(--color-background)] opacity-10 rounded-full filter blur-2xl"
                    animate={{ scale: [1, 0.8, 1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
                <div className="relative container mx-auto px-6 text-center">
                    <motion.h1
                        className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Our Materials
                    </motion.h1>
                    <motion.p
                        className="max-w-2xl mx-auto text-lg md:text-xl opacity-90"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Explore our versatile printing materials—from biodegradable PLA to high-strength metals and advanced polymers.
                    </motion.p>
                </div>
            </section>

            {/* Materials Grid */}
            <section className="relative py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
                    >
                        {MATERIALS.map((mat, idx) => (
                            <motion.div
                                key={idx}
                                className="group bg-[var(--color-background)] rounded-3xl p-8 border border-[var(--color-secondary)/20] shadow-md hover:shadow-2xl hover:border-[var(--color-secondary)] transform hover:-translate-y-2 transition duration-300"
                                variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                            >
                                <div className="mb-6 flex items-center justify-center h-20 w-20 bg-[var(--color-secondary)/10] rounded-full group-hover:bg-[var(--color-secondary)/20] transition">
                                    {mat.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-center mb-2 group-hover:text-[var(--color-secondary)] transition">
                                    {mat.name}
                                </h3>
                                <p className="text-[var(--color-foreground)/80] text-center mb-4 leading-relaxed">
                                    {mat.description}
                                </p>
                                <div className="text-center font-medium">
                                    Density: <span className="text-[var(--color-foreground)]">{mat.density}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-[var(--color-secondary)] text-[var(--color-background)] text-center">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Request Material Samples
                </motion.h2>
                <motion.p
                    className="max-w-xl mx-auto mb-6 opacity-80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Contact us to receive sample swatches or detailed technical data sheets for any of our materials.
                </motion.p>
                <Link
                    href="/contact"
                    className="inline-flex items-center px-8 py-4 bg-[var(--color-background)] hover:bg-[var(--color-background)/90] text-[var(--color-secondary)] font-semibold rounded-full shadow-lg transform transition hover:-translate-y-1"
                >
                    Get Samples
                    <ArrowRightIcon className="h-5 w-5 ml-2 animate-arrow-forward" />
                </Link>
            </section>
        </div>
    );
}
