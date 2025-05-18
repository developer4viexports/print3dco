// src/components/ServicesSection.tsx
'use client';

import React, { FC, ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CubeIcon, SparklesIcon, Cog6ToothIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface Service {
    title: string;
    description: string;
    icon: ReactNode;
    link: string;
}

const SERVICES: Service[] = [
    {
        title: '3D Printing Services',
        description: 'High-precision FDM, SLA & SLS printing across 100+ materials.',
        icon: <CubeIcon className="h-16 w-16 text-[var(--color-secondary)]" />,
        link: '/services/printing',
    },
    {
        title: 'Design Consultation',
        description: 'Expert CAD optimization, file repair, and custom prototyping.',
        icon: <SparklesIcon className="h-16 w-16 text-[var(--color-secondary)]" />,
        link: '/services/design',
    },
    {
        title: 'Bulk Production',
        description: 'Batch scheduling, volume discounts & QA-grade inspections.',
        icon: <Cog6ToothIcon className="h-16 w-16 text-[var(--color-secondary)]" />,
        link: '/services/bulk',
    },
];

export const ServicesSection: FC = () => (
    <section className="relative py-24 bg-[var(--color-background)] overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-[var(--color-primary)] opacity-10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[var(--color-accent)] opacity-10 rounded-full filter blur-2xl"></div>

        <div className="relative max-w-7xl mx-auto px-6">
            <motion.h2
                className="text-4xl font-extrabold text-[var(--color-foreground)] text-center mb-16"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Our Advanced Services
            </motion.h2>

            <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {SERVICES.map((svc, idx) => (
                    <motion.div
                        key={svc.title}
                        className="group relative bg-[var(--color-background)] border border-[var(--color-secondary)/20] rounded-2xl p-8 shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: idx * 0.2 }}
                    >
                        <span className="absolute inset-x-0 top-0 h-1 bg-[var(--color-secondary)] group-hover:bg-[var(--color-primary)] transition"></span>
                        <div className="flex items-center justify-center h-20 w-20 bg-[var(--color-background)] border-2 border-[var(--color-secondary)/20] rounded-full mx-auto">
                            {svc.icon}
                        </div>
                        <h3 className="mt-6 text-xl font-semibold text-[var(--color-foreground)] text-center group-hover:text-[var(--color-secondary)] transition">
                            {svc.title}
                        </h3>
                        <p className="mt-4 text-[var(--color-foreground)/80] text-center leading-relaxed">
                            {svc.description}
                        </p>
                        <Link href={svc.link} className="mt-6 flex justify-center">
                            <motion.span
                                className="inline-flex items-center text-[var(--color-secondary)] font-medium hover:underline"
                                whileHover={{ x: 4 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                Learn More
                                <ArrowRightIcon className="h-5 w-5 ml-1 animate-arrow-forward" />
                            </motion.span>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);
